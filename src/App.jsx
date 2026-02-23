import React, { useState, useEffect, useMemo } from 'react';
import { db, initAuth } from './firebase';
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

export default function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [data, setData] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    // Initial Auth and Data Sync
    useEffect(() => {
        const setup = async () => {
            await initAuth();
            const dbRef = ref(db, 'tournament');

            // Listen for real-time updates
            const unsubscribe = onValue(dbRef, (snapshot) => {
                const val = snapshot.val();
                if (val) {
                    setData(val);
                } else {
                    // Initialize if empty
                    set(dbRef, INITIAL_DATA);
                    setData(INITIAL_DATA);
                }
                setLoading(false);
            });

            return () => unsubscribe();
        };

        setup();
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

    const standingsData = calculateStandings(data.players, data.matches);

    return (
        <div className="min-h-screen font-sans selection:bg-blue-500/30">
            <Navbar
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                isAdmin={isAdmin}
            />

            <main className="max-w-6xl mx-auto p-4 md:p-6 pb-24">
                {currentPage === 'home' && <HomeView data={data} setCurrentPage={setCurrentPage} />}
                {currentPage === 'standings' && <StandingsView standingsData={standingsData} bracketData={data.bracket} />}
                {currentPage === 'matches' && <MatchesView data={data} updateData={updateData} isAdmin={isAdmin} />}
                {currentPage === 'rules' && <RulesView />}
                {currentPage === 'knockout' && isAdmin && (
                    <KnockoutView
                        data={data}
                        updateData={updateData}
                        standingsData={standingsData}
                        isAdmin={isAdmin}
                    />
                )}
                {currentPage === 'admin' && (
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
