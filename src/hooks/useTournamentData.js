import { useState, useEffect, useMemo } from 'react';
import { db, auth } from '../firebase';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { ref, onValue, set } from 'firebase/database';
import { INITIAL_DATA } from '../utils/initialData';
import { calculateStandings } from '../utils/logic';

/**
 * Custom hook that manages all core tournament state:
 * - Firebase auth (anonymous + admin detection)
 * - Real-time database sync
 * - Season / history selection
 * - Standings computation
 * - Theme persistence
 */
export default function useTournamentData() {
    const [data, setData] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [authInitialized, setAuthInitialized] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [selectedSeason, setSelectedSeason] = useState('CURRENT');
    const [isLightMode, setIsLightMode] = useState(() => {
        return localStorage.getItem('theme') === 'light';
    });

    // Theme persistence
    useEffect(() => {
        if (isLightMode) {
            document.documentElement.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
        }
    }, [isLightMode]);

    // Auth + Database subscription
    useEffect(() => {
        let unsubscribeDb;
        let unsubscribeAuth;

        // Safety timeout: if loading takes too long, force proceed with defaults
        const loadingTimeout = setTimeout(() => {
            if (!data) {
                console.warn('Loading timeout reached — using default data');
                setData(INITIAL_DATA);
            }
            setLoading(false);
            setAuthInitialized(true);
        }, 5000);

        unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user && !user.isAnonymous) {
                setIsAdmin(user.email === 'admin@pestour.com' || user.email === 'admin@admin.com');
            } else {
                setIsAdmin(false);
                if (!user) {
                    signInAnonymously(auth).catch((err) => {
                        console.error('Anonymous auth failed:', err);
                        // Still mark auth as initialized even on failure
                        setAuthInitialized(true);
                    });
                }
            }
            setAuthInitialized(true);
        });

        const dbRef = ref(db, 'tournament');

        unsubscribeDb = onValue(dbRef, (snapshot) => {
            const val = snapshot.val();
            if (val) {
                val.players = val.players || [];
                val.matches = val.matches || [];
                val.bracket = val.bracket || [];
                if (!val.settings.votingTitle) val.settings.votingTitle = INITIAL_DATA.settings.votingTitle;
                if (!val.settings.votingOptions) val.settings.votingOptions = INITIAL_DATA.settings.votingOptions;
                setData(val);
            } else {
                try {
                    set(dbRef, INITIAL_DATA);
                } catch (e) { console.error("Could not write initial data", e); }
                setData(INITIAL_DATA);
            }
            setLoading(false);
            clearTimeout(loadingTimeout);
        }, (error) => {
            console.error("Firebase DB Error:", error);
            setData(INITIAL_DATA);
            setLoading(false);
            clearTimeout(loadingTimeout);
        });

        return () => {
            clearTimeout(loadingTimeout);
            if (unsubscribeDb) unsubscribeDb();
            if (unsubscribeAuth) unsubscribeAuth();
        };
    }, []);

    // Data update helper
    const updateData = async (newData) => {
        const dbRef = ref(db, 'tournament');
        try {
            const dataToSave = {
                ...newData,
                lastUpdated: new Date().toISOString()
            };
            await set(dbRef, dataToSave);
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    // Derived state
    const history = data ? (data.history || {}) : {};
    const seasons = ['CURRENT', ...Object.keys(history).sort().reverse()];

    const displayData = selectedSeason === 'CURRENT' ? data : history[selectedSeason];
    const activeData = displayData || data;
    const isCurrentSeason = selectedSeason === 'CURRENT';
    const effectiveIsAdmin = isAdmin && isCurrentSeason;

    const standingsData = useMemo(
        () => activeData ? calculateStandings(activeData.players, activeData.matches) : null,
        [activeData]
    );

    const isVotingLocked = activeData?.settings?.votingEnabled && !isAdmin && !(showLogin && false);

    return {
        // Core data
        data,
        activeData,
        updateData,
        loading: loading || !data || !authInitialized,

        // Auth
        isAdmin,
        setIsAdmin,
        effectiveIsAdmin,

        // Season
        selectedSeason,
        setSelectedSeason,
        seasons,
        isCurrentSeason,

        // Theme
        isLightMode,
        setIsLightMode,

        // Voting
        isVotingLocked,
        showLogin,
        setShowLogin,

        // Standings
        standingsData,
    };
}
