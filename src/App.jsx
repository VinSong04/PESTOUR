import { useState, useEffect, lazy, Suspense } from 'react';
import useTournamentData from './hooks/useTournamentData';
import MainLayout from './layouts/MainLayout';
import PageFallback from './components/ui/PageFallback';

// Lazy-loaded page components (code-split)
const HomePage = lazy(() => import('./pages/HomePage'));
const StandingsPage = lazy(() => import('./pages/StandingsPage'));
const MatchesPage = lazy(() => import('./pages/MatchesPage'));
const RulesPage = lazy(() => import('./pages/RulesPage'));
const KnockoutPage = lazy(() => import('./pages/KnockoutPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const VotingPage = lazy(() => import('./pages/VotingPage'));

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

    const {
        data,
        activeData,
        updateData,
        loading,
        isAdmin,
        setIsAdmin,
        effectiveIsAdmin,
        selectedSeason,
        setSelectedSeason,
        seasons,
        isCurrentSeason,
        isLightMode,
        setIsLightMode,
        isVotingLocked,
        setShowLogin,
        standingsData,
    } = useTournamentData();

    if (loading) {
        return (
            <div className="min-h-screen bg-[#060a13] flex items-center justify-center flex-col gap-5">
                <div className="relative">
                    <div className="w-14 h-14 border-2 border-cyan-500/15 border-t-cyan-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center font-outfit font-black text-[10px] text-cyan-400/60">GO</div>
                </div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.4em] text-slate-600 animate-pulse">Loading Systems</p>
            </div>
        );
    }

    if (!activeData) {
        return (
            <div className="min-h-screen bg-[#060a13] flex items-center justify-center flex-col gap-5 text-center px-4">
                <div className="w-16 h-16 border border-rose-500/30 bg-rose-500/10 text-rose-500 rounded-2xl flex items-center justify-center mb-2">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                </div>
                <h1 className="text-2xl font-outfit font-black text-white tracking-widest uppercase">Cannot Connect to Backend</h1>
                <p className="text-sm text-slate-400 max-w-md">The Laravel API is currently unreachable or the database is empty. Please ensure the backend server is running on localhost:8000 and the database is seeded.</p>
                <div className="mt-8 text-[10px] font-semibold text-slate-600 tracking-[0.2em] uppercase">Run <span className="text-cyan-400">./setup.sh</span> and <span className="text-cyan-400">php artisan serve</span></div>
            </div>
        );
    }

    const navProps = {
        currentPage,
        setCurrentPage,
        isAdmin,
        isLightMode,
        setIsLightMode,
        selectedSeason,
        setSelectedSeason,
        seasons,
        tournamentStarted: activeData.settings.tournamentStarted,
        votingEnabled: activeData.settings.votingEnabled,
        lastUpdated: activeData.lastUpdated,
    };

    return (
        <MainLayout showNavbar={!isVotingLocked} navProps={navProps}>
            <Suspense fallback={<PageFallback />}>
                {isVotingLocked ? (
                    <VotingPage data={activeData} onAdminAccess={() => {
                        setCurrentPage('admin');
                        setShowLogin(true);
                    }} />
                ) : (
                    <>
                        {currentPage === 'home' && <HomePage data={activeData} setCurrentPage={setCurrentPage} isAdmin={effectiveIsAdmin} />}
                        {currentPage === 'register' && <RegisterPage isAdmin={effectiveIsAdmin} isOpen={activeData.settings.registrationOpen} />}
                        {currentPage === 'standings' && (activeData.settings.tournamentStarted || isAdmin) && <StandingsPage standingsData={standingsData} bracketData={activeData.bracket} />}
                        {currentPage === 'matches' && (activeData.settings.tournamentStarted || isAdmin) && <MatchesPage data={activeData} updateData={updateData} isAdmin={effectiveIsAdmin} />}
                        {currentPage === 'voting' && <VotingPage data={activeData} />}
                        {currentPage === 'rules' && <RulesPage />}
                        {currentPage === 'knockout' && (activeData.settings.tournamentStarted || isAdmin) && (
                            <KnockoutPage
                                data={activeData}
                                updateData={updateData}
                                standingsData={standingsData}
                                isAdmin={effectiveIsAdmin}
                            />
                        )}
                        {currentPage === 'admin' && isCurrentSeason && (
                            <AdminPage
                                data={data}
                                updateData={updateData}
                                isAdmin={isAdmin}
                                setIsAdmin={setIsAdmin}
                            />
                        )}
                    </>
                )}
            </Suspense>
        </MainLayout>
    );
}
