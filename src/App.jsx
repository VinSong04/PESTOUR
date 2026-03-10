import { useState, useEffect } from 'react';
import { db, auth } from './firebase';
import { ref, onValue, set } from 'firebase/database';
import { INITIAL_DATA } from './utils/initialData';
import { calculateStandings } from './utils/logic';

// Components
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import StandingsView from './components/StandingsView';
import MatchesView from './components/MatchesView';
import RulesView from './components/RulesView';
import KnockoutView from './components/KnockoutView';
import AdminView from './components/AdminView';
import RegisterView from './components/RegisterView';

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

        import('firebase/auth').then(({ onAuthStateChanged, signInAnonymously }) => {
            unsubscribeAuth = onAuthStateChanged(auth, (user) => {
                if (user) {
                    setIsAdmin(!user.isAnonymous);
                } else {
                    setIsAdmin(false);
                    signInAnonymously(auth).catch(console.error);
                }
            });
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
                setData(val);
            } else {
                // Initialize if empty
                set(dbRef, INITIAL_DATA);
                setData(INITIAL_DATA);
            }
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
            await set(dbRef, newData);
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    if (loading || !data) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center text-emerald-400 flex-col gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 animate-spin">
                    <circle cx="12" cy="12" r="10" strokeDasharray="6 4" />
                </svg>
                <p className="font-mono uppercase tracking-widest text-sm">Loading Tournament Data...</p>
            </div>
        );
    }

    const history = data.history || {};
    const seasons = ['CURRENT', ...Object.keys(history).sort().reverse()];

    const displayData = selectedSeason === 'CURRENT' ? data : history[selectedSeason];
    const activeData = displayData || data; // fallback 
    const isCurrentSeason = selectedSeason === 'CURRENT';
    const effectiveIsAdmin = isAdmin && isCurrentSeason;

    const standingsData = calculateStandings(activeData.players, activeData.matches);

    return (
        <div className="min-h-screen font-sans selection:bg-blue-500/30">
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
            />

            <main className="max-w-7xl mx-auto px-4 md:px-6 pb-24 pt-28 md:pt-32">
                {currentPage === 'home' && <HomeView data={activeData} setCurrentPage={setCurrentPage} isAdmin={effectiveIsAdmin} />}
                {currentPage === 'register' && <RegisterView isAdmin={effectiveIsAdmin} isOpen={activeData.settings.registrationOpen} />}
                {currentPage === 'standings' && (activeData.settings.tournamentStarted || isAdmin) && <StandingsView standingsData={standingsData} bracketData={activeData.bracket} />}
                {currentPage === 'matches' && (activeData.settings.tournamentStarted || isAdmin) && <MatchesView data={activeData} updateData={updateData} isAdmin={effectiveIsAdmin} />}
                {currentPage === 'rules' && <RulesView />}
                {currentPage === 'knockout' && isAdmin && (
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
            </main>

        </div>
    );
}
