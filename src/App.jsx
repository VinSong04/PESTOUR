import { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { db, auth } from './firebase';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { ref, onValue, set } from 'firebase/database';
import { INITIAL_DATA } from './utils/initialData';
import { calculateStandings } from './utils/logic';

// Components (eagerly loaded — always visible)
import Navbar from './components/Navbar';

// Lazy-loaded page components (code-split)
const HomeView = lazy(() => import('./components/HomeView'));
const StandingsView = lazy(() => import('./components/StandingsView'));
const MatchesView = lazy(() => import('./components/MatchesView'));
const RulesView = lazy(() => import('./components/RulesView'));
const KnockoutView = lazy(() => import('./components/KnockoutView'));
const AdminView = lazy(() => import('./components/AdminView'));
const RegisterView = lazy(() => import('./components/RegisterView'));
const VotingView = lazy(() => import('./components/VotingView'));

const PageFallback = () => (
    <div className="flex items-center justify-center py-32 text-slate-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 animate-spin opacity-40">
            <circle cx="12" cy="12" r="10" strokeDasharray="6 4" />
        </svg>
    </div>
);

export default function App() {
    const getInitialPage = () => {
        const hash = window.location.hash.replace('#', '');
        return hash || 'home';
    };

    const [currentPage, setCurrentPage] = useState(getInitialPage);

    // Sync URL hash with page state
    useEffect(() => {
        const handleHash = () => {
            const hash = window.location.hash.replace('#', '');
            if (hash) setCurrentPage(hash);
        };
        window.addEventListener('hashchange', handleHash);
        return () => window.removeEventListener('hashchange', handleHash);
    }, []);

    // Update hash when page changes (clear hash for non-admin pages)
    useEffect(() => {
        if (currentPage === 'admin') {
            window.location.hash = 'admin';
        } else {
            if (window.location.hash) window.history.replaceState(null, '', window.location.pathname);
        }
    }, [currentPage]);
    const [data, setData] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [authInitialized, setAuthInitialized] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [selectedSeason, setSelectedSeason] = useState('CURRENT');
    const [isLightMode, setIsLightMode] = useState(() => {
        return localStorage.getItem('theme') === 'light';
    });

    useEffect(() => {
        if (isLightMode) {
            document.documentElement.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
        }
    }, [isLightMode]);

    // Initial Auth and Data Sync
    useEffect(() => {
        let unsubscribeDb;
        let unsubscribeAuth;

        unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user && !user.isAnonymous) {
                // Ensure it's the admin account
                setIsAdmin(user.email === 'admin@pestour.com' || user.email === 'admin@admin.com'); // added a backup admin email just in case
            } else {
                setIsAdmin(false);
                if (!user) signInAnonymously(auth).catch(console.error);
            }
            setAuthInitialized(true);
        });

        const dbRef = ref(db, 'tournament');

        // Listen for real-time updates
        unsubscribeDb = onValue(dbRef, (snapshot) => {
            const val = snapshot.val();
            if (val) {
                // Firebase natively drops empty arrays so we must ensure they are restored
                val.players = val.players || [];
                val.matches = val.matches || [];
                val.bracket = val.bracket || [];
                // Ensure voting defaults exist
                if (!val.settings.votingTitle) val.settings.votingTitle = INITIAL_DATA.settings.votingTitle;
                if (!val.settings.votingOptions) val.settings.votingOptions = INITIAL_DATA.settings.votingOptions;
                setData(val);
            } else {
                // Initialize if empty. We wrap in try-catch in case write permissions are disabled for guests.
                try {
                    set(dbRef, INITIAL_DATA);
                } catch (e) { console.error("Could not write initial data", e); }
                setData(INITIAL_DATA);
            }
            setLoading(false);
        }, (error) => {
            console.error("Firebase DB Error:", error);
            // Fallback so it doesn't hang infinitely
            setData(INITIAL_DATA);
            setLoading(false);
        });

        return () => {
            if (unsubscribeDb) unsubscribeDb();
            if (unsubscribeAuth) unsubscribeAuth();
        };
    }, []);

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

    const isVotingLocked = activeData?.settings?.votingEnabled && !isAdmin && !(showLogin && currentPage === 'admin');

    if (loading || !data || !authInitialized) {
        return (
            <div className="min-h-screen bg-[#020617] flex items-center justify-center text-blue-400 flex-col gap-6">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin shadow-[0_0_15px_rgba(59,130,246,0.3)]"></div>
                    <div className="absolute inset-0 flex items-center justify-center font-outfit font-black text-xs">GO</div>
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-200/30 animate-pulse">Initializing Systems</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen font-sans selection:bg-blue-500/30">
            {!isVotingLocked && (
                <Navbar
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    isAdmin={isAdmin}
                    isLightMode={isLightMode}
                    setIsLightMode={setIsLightMode}
                    selectedSeason={selectedSeason}
                    setSelectedSeason={setSelectedSeason}
                    seasons={seasons}
                    tournamentStarted={activeData.settings.tournamentStarted}
                    votingEnabled={activeData.settings.votingEnabled}
                    lastUpdated={activeData.lastUpdated}
                />
            )}

            <main className="max-w-7xl mx-auto px-4 md:px-6 pb-24 pt-28 md:pt-32">
                <Suspense fallback={<PageFallback />}>
                    {isVotingLocked ? (
                        <VotingView data={activeData} onAdminAccess={() => {
                            setCurrentPage('admin');
                            setShowLogin(true);
                        }} />
                    ) : (
                        <>
                            {currentPage === 'home' && <HomeView data={activeData} setCurrentPage={setCurrentPage} isAdmin={effectiveIsAdmin} />}
                            {currentPage === 'register' && <RegisterView isAdmin={effectiveIsAdmin} isOpen={activeData.settings.registrationOpen} />}
                            {currentPage === 'standings' && (activeData.settings.tournamentStarted || isAdmin) && <StandingsView standingsData={standingsData} bracketData={activeData.bracket} />}
                            {currentPage === 'matches' && (activeData.settings.tournamentStarted || isAdmin) && <MatchesView data={activeData} updateData={updateData} isAdmin={effectiveIsAdmin} />}
                            {currentPage === 'voting' && <VotingView data={activeData} />}
                            {currentPage === 'rules' && <RulesView />}
                            {currentPage === 'knockout' && (activeData.settings.tournamentStarted || isAdmin) && (
                                <KnockoutView
                                    data={activeData}
                                    updateData={updateData}
                                    standingsData={standingsData}
                                    isAdmin={effectiveIsAdmin}
                                />
                            )}
                            {currentPage === 'admin' && isCurrentSeason && (
                                <AdminView
                                    data={data}
                                    updateData={updateData}
                                    isAdmin={isAdmin}
                                    setIsAdmin={setIsAdmin}
                                />
                            )}
                        </>
                    )}
                </Suspense>
            </main>

        </div>
    );
}
