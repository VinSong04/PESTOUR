import { useState, useEffect, useMemo, useCallback } from 'react';
import { authApi, tournamentApi, matchApi, standingsApi, playerApi } from '../services/api';

/**
 * useTournamentData — refactored to use the Laravel API backend.
 *
 * Replaces the old Firebase-based real-time sync with REST API polling.
 * Key changes:
 * - Auth uses Sanctum tokens instead of Firebase anonymous auth
 * - Data fetching uses the api.js service layer
 * - Standings come from the backend (auto-calculated by MatchObserver)
 * - Theme persistence remains client-side (localStorage)
 *
 * The hook preserves the same return shape so existing components
 * continue to work without modification.
 */

// Polling interval for live data (in ms)
const POLL_INTERVAL = 15000; // 15 seconds

export default function useTournamentData() {
    // ── Core State ─────────────────────────────────────
    const [tournaments, setTournaments] = useState([]);
    const [activeTournament, setActiveTournament] = useState(null);
    const [players, setPlayers] = useState([]);
    const [matches, setMatches] = useState([]);
    const [standingsData, setStandingsData] = useState(null);

    // ── Auth State ─────────────────────────────────────
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState(null);
    const [authInitialized, setAuthInitialized] = useState(false);

    // ── UI State ───────────────────────────────────────
    const [loading, setLoading] = useState(true);
    const [showLogin, setShowLogin] = useState(false);
    const [selectedSeason, setSelectedSeason] = useState('CURRENT');
    const [isLightMode, setIsLightMode] = useState(() => {
        return localStorage.getItem('theme') === 'light';
    });

    // ── Theme Persistence ──────────────────────────────
    useEffect(() => {
        if (isLightMode) {
            document.documentElement.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
        }
    }, [isLightMode]);

    // ── Auth Check ─────────────────────────────────────
    useEffect(() => {
        const checkAuth = async () => {
            if (authApi.isAuthenticated()) {
                try {
                    const userData = await authApi.me();
                    setUser(userData);
                    setIsAdmin(userData.is_admin || false);
                } catch {
                    // Token expired or invalid
                    setUser(null);
                    setIsAdmin(false);
                }
            }
            setAuthInitialized(true);
        };

        checkAuth();

        // Listen for unauthorized events from the API client
        const handleUnauth = () => {
            setUser(null);
            setIsAdmin(false);
        };
        window.addEventListener('auth:unauthorized', handleUnauth);
        return () => window.removeEventListener('auth:unauthorized', handleUnauth);
    }, []);

    // ── Data Fetching ──────────────────────────────────
    const fetchData = useCallback(async () => {
        try {
            // Fetch tournaments
            const tournamentsData = await tournamentApi.list();
            setTournaments(tournamentsData);

            // Find the active (ongoing) tournament, or fall back to the first one
            const ongoing = tournamentsData.find(t => t.status === 'ongoing');
            const active = ongoing || tournamentsData[0] || null;
            setActiveTournament(active);

            if (active) {
                // Fetch matches and standings for the active tournament
                const [matchesData, standingsResult] = await Promise.all([
                    matchApi.list({ tournament_id: active.id }),
                    standingsApi.live(active.id),
                ]);

                setMatches(matchesData);
                setStandingsData(standingsResult.standings || []);
            }

            // Fetch all active players
            const playersData = await playerApi.list(true);
            setPlayers(playersData);

        } catch (error) {
            console.error('Error fetching tournament data:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Initial fetch + polling
    useEffect(() => {
        fetchData();

        const interval = setInterval(fetchData, POLL_INTERVAL);
        return () => clearInterval(interval);
    }, [fetchData]);

    // ── Data Update Helper ─────────────────────────────
    // This replaces the Firebase `set()` call.
    // Components should now call specific API endpoints instead.
    const updateData = useCallback(async (action, payload) => {
        try {
            let result;

            switch (action) {
                case 'updateScore':
                    result = await matchApi.updateScore(
                        payload.matchId,
                        payload.homeScore,
                        payload.awayScore
                    );
                    break;

                case 'createMatch':
                    result = await matchApi.create(payload);
                    break;

                case 'updateMatch':
                    result = await matchApi.update(payload.id, payload);
                    break;

                case 'createPlayer':
                    result = await playerApi.create(payload);
                    break;

                case 'updatePlayer':
                    result = await playerApi.update(payload.id, payload);
                    break;

                case 'createTournament':
                    result = await tournamentApi.create(payload);
                    break;

                case 'updateTournament':
                    result = await tournamentApi.update(payload.id, payload);
                    break;

                default:
                    console.warn('Unknown updateData action:', action);
                    return;
            }

            // Refresh data after mutation
            await fetchData();
            return result;

        } catch (error) {
            console.error(`Error in updateData (${action}):`, error);
            throw error;
        }
    }, [fetchData]);

    // ── Login / Logout ─────────────────────────────────
    const login = useCallback(async (email, password) => {
        const result = await authApi.login(email, password);
        setUser(result.user);
        setIsAdmin(result.user.is_admin || false);
        return result;
    }, []);

    const logout = useCallback(async () => {
        await authApi.logout();
        setUser(null);
        setIsAdmin(false);
    }, []);

    // ── Derived State ──────────────────────────────────
    const seasons = useMemo(() => {
        const completedTournaments = tournaments
            .filter(t => t.status === 'completed')
            .map(t => t.name);
        return ['CURRENT', ...completedTournaments];
    }, [tournaments]);

    const isCurrentSeason = selectedSeason === 'CURRENT';
    const effectiveIsAdmin = isAdmin && isCurrentSeason;

    // Build a compatible data shape for existing components
    const activeData = useMemo(() => {
        if (!activeTournament) return null;

        return {
            settings: {
                name: activeTournament.name || 'PALLET EFOOTBALL',
                season: activeTournament.name,
                tournamentStarted: activeTournament.status !== 'upcoming',
                registrationOpen: activeTournament.status === 'upcoming',
                votingEnabled: false,
                votingStatus: 'starting',
                votingTitle: 'Most Valuable Player',
                votingOptions: [],
            },
            players: players.map(p => ({
                id: p.id,
                name: p.name,
                inGameName: p.in_game_name,
                teamName: p.team_name,
            })),
            matches: matches.map(m => ({
                id: m.id,
                tournamentId: m.tournament_id,
                homePlayer: m.home_player,
                awayPlayer: m.away_player,
                homeScore: m.home_score,
                awayScore: m.away_score,
                status: m.status,
                matchDate: m.match_date,
            })),
            bracket: [],
            lastUpdated: activeTournament.updated_at,
        };
    }, [activeTournament, players, matches]);

    const data = activeData;

    return {
        // Core data
        data,
        activeData,
        updateData,
        loading: loading || !authInitialized,

        // Auth
        isAdmin,
        setIsAdmin,
        effectiveIsAdmin,
        user,
        login,
        logout,

        // Season
        selectedSeason,
        setSelectedSeason,
        seasons,
        isCurrentSeason,

        // Theme
        isLightMode,
        setIsLightMode,

        // Voting (preserved interface)
        isVotingLocked: false,
        showLogin,
        setShowLogin,

        // Standings (now from backend)
        standingsData,

        // Tournament context
        activeTournament,
        tournaments,
        players,
        matches,

        // Refresh helper
        refreshData: fetchData,
    };
}
