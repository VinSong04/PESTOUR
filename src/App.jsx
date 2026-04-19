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
