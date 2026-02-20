import React, { useState, useEffect, useMemo } from 'react';
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInAnonymously,
    signInWithCustomToken,
    onAuthStateChanged
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    setDoc,
    onSnapshot
} from 'firebase/firestore';
import { CircleDashed } from 'lucide-react';

// Utils & Initial Data
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
    const [user, setUser] = useState(null);
    const [db, setDb] = useState(null);
    const [appId, setAppId] = useState('default-pes-app');
    const [data, setData] = useState(INITIAL_DATA);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState('home');
    const [isAdmin, setIsAdmin] = useState(false);

    // 1. Firebase Initialization
    useEffect(() => {
        try {
            if (typeof window !== 'undefined' && window.__firebase_config) {
                const config = JSON.parse(window.__firebase_config);
                const app = initializeApp(config);
                const auth = getAuth(app);
                const firestore = getFirestore(app);
                setDb(firestore);

                if (window.__app_id) setAppId(window.__app_id);

                const initAuth = async () => {
                    try {
                        if (window.__initial_auth_token) {
                            await signInWithCustomToken(auth, window.__initial_auth_token);
                        } else {
                            await signInAnonymously(auth);
                        }
                    } catch (e) {
                        console.error("Auth error:", e);
                    }
                };
                initAuth();

                const unsub = onAuthStateChanged(auth, (usr) => {
                    setUser(usr);
                });
                return () => unsub();
            } else {
                // Run without Firebase locally if not set (for demo/dev purposes)
                setLoading(false);
            }
        } catch (e) {
            console.error("Firebase setup error", e);
            setLoading(false);
        }
    }, []);

    // 2. Data Fetching
    useEffect(() => {
        if (!user || !db) return;

        const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'tournament', 'main');

        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                setData(docSnap.data());
            } else {
                setDoc(docRef, INITIAL_DATA);
                setData(INITIAL_DATA);
            }
            setLoading(false);
        }, (error) => {
            console.error("Firestore sync error:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user, db, appId]);

    // 3. Update Handler
    const updateData = async (newData) => {
        setData(newData); // Optimistic UI update
        if (db && user) {
            try {
                const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'tournament', 'main');
                await setDoc(docRef, newData);
            } catch (e) {
                console.error("Error saving data:", e);
            }
        }
    };

    const standingsData = useMemo(() => calculateStandings(data.players, data.matches), [data.players, data.matches]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center text-emerald-400 flex-col gap-4">
                <CircleDashed className="w-12 h-12 animate-spin" />
                <p className="font-mono uppercase tracking-widest text-sm">Loading Tournament Data...</p>
            </div>
        );
    }

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
                {currentPage === 'knockout' && isAdmin && <KnockoutView data={data} updateData={updateData} standingsData={standingsData} isAdmin={isAdmin} />}
                {currentPage === 'admin' && <AdminView data={data} updateData={updateData} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />}
            </main>
        </div>
    );
}
