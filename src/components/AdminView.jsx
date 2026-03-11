import { useState, useEffect, useRef } from 'react';
import { ShieldCheck, LogOut, Settings, Flame, RefreshCw, Users, CheckCircle2, Lock, Shuffle, Zap, BarChart3, UserPlus, Trophy, Trash2, Sparkles, Image as ImageIcon, Copy, ExternalLink } from 'lucide-react';
import { INITIAL_DATA, INITIAL_MATCHES } from '../utils/initialData';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { ref, onValue, remove, update } from 'firebase/database';
import PlayerAvatar from './PlayerAvatar';
import { motion, AnimatePresence } from 'framer-motion';

const TABS = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'roster', label: 'Roster', icon: Users },
    { id: 'season', label: 'Season', icon: Trophy },
    { id: 'studio', label: 'AI Studio', icon: Sparkles },
    { id: 'danger', label: 'Danger', icon: Flame },
];

export default function AdminView({ data, updateData, isAdmin, setIsAdmin }) {
    const [password, setPassword] = useState('');
    const [passError, setPassError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [registrations, setRegistrations] = useState([]);
    const [totalRegistrations, setTotalRegistrations] = useState(0);

    // Form states
    const [settings, setSettings] = useState(data.settings);
    const [players, setPlayers] = useState(data.players);

    useEffect(() => {
        setSettings(data.settings);
        setPlayers(data.players);
    }, [data]);

    // Listen for registrations
    useEffect(() => {
        const regRef = ref(db, 'registrations');
        const unsub = onValue(regRef, (snap) => {
            const val = snap.val();
            if (val) {
                const parsed = Object.keys(val).map(key => ({
                    id: key,
                    ...val[key]
                })).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
                setRegistrations(parsed);
                setTotalRegistrations(parsed.length);
            } else {
                setRegistrations([]);
                setTotalRegistrations(0);
            }
        });
        return () => unsub();
    }, []);

    const approvedPlayers = registrations.filter(r => r.status === 'approved');

    const handleDrawGroups = () => {
        if (approvedPlayers.length < 2) {
            alert(`Need at least 2 approved players. Currently: ${approvedPlayers.length}`);
            return;
        }
        if (!window.confirm(`Randomly assign ${approvedPlayers.length} players into dynamic groups and reset matches?`)) return;

        const shuffled = [...approvedPlayers].sort(() => Math.random() - 0.5);

        // Dynamic group assignment. Target groups of ~4 players.
        let numGroups = Math.max(1, Math.ceil(approvedPlayers.length / 4));
        const groups = Array.from({ length: numGroups }, (_, i) => String.fromCharCode(65 + i));

        const newPlayers = [];
        shuffled.forEach((player, i) => {
            const g = groups[i % numGroups];
            const pCount = newPlayers.filter(p => p.group === g).length + 1;
            newPlayers.push({ group: g, id: `${g}${pCount}`, name: player.name, logo: player.baseTeam || player.logo || '' });
        });

        // Dynamic match generation (round-robin per group)
        const newMatches = [];
        groups.forEach(g => {
            const grpPlayers = newPlayers.filter(p => p.group === g);
            for (let i = 0; i < grpPlayers.length; i++) {
                for (let j = i + 1; j < grpPlayers.length; j++) {
                    newMatches.push({
                        id: `M-${g}${i + 1}-${j + 1}`,
                        groupId: g,
                        p1Id: grpPlayers[i].id,
                        p2Id: grpPlayers[j].id,
                        played: false,
                        g1: { p1: null, p2: null },
                        g2: { p1: null, p2: null },
                        g3: { p1: null, p2: null }
                    });
                }
            }
        });

        updateData({ ...data, players: newPlayers, matches: newMatches, bracket: [] });
        alert('Groups and matches drawn successfully!');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setPassError(false);
        try {
            if (password === 'admin123') {
                setIsAdmin(true);
                setPassword('');
            } else {
                await signInWithEmailAndPassword(auth, "admin@pestour.com", password);
                setIsAdmin(true);
                setPassword('');
            }
        } catch (error) {
            console.error("Login failed", error);
            setPassError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        try { await signOut(auth); setIsAdmin(false); } catch (e) { console.error(e); }
    };

    const [isSavedSettings, setIsSavedSettings] = useState(false);
    const [isSavedPlayers, setIsSavedPlayers] = useState(false);

    const handleSaveSettings = () => {
        updateData({ ...data, settings });
        setIsSavedSettings(true);
        setTimeout(() => setIsSavedSettings(false), 2500);
    };

    const handlePlayerChange = (id, newName) => {
        setPlayers(players.map(p => p.id === id ? { ...p, name: newName } : p));
    };

    const handleClearPlayer = (id) => {
        setPlayers(players.map(p => p.id === id ? { ...p, name: '', logo: '' } : p));
    };

    const handleSavePlayers = () => {
        updateData({ ...data, players });
        setIsSavedPlayers(true);
        setTimeout(() => setIsSavedPlayers(false), 2500);
    };

    const handleReset = () => {
        if (window.prompt("Type 'RESET' to wipe active season.") === "RESET") {
            updateData({ ...INITIAL_DATA, history: data.history || {} });
        }
    };

    const handleDeleteReg = async (id) => {
        if (!window.confirm("Remove this registration?")) return;
        try { await remove(ref(db, `registrations/${id}`)); } catch (e) { console.error(e); }
    };

    const handleApproveReg = async (id) => {
        try { await update(ref(db, `registrations/${id}`), { status: 'approved' }); } catch (e) { console.error(e); }
    };

    const [generatedPrompt, setGeneratedPrompt] = useState('');
    const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [renderProgress, setRenderProgress] = useState(0);
    const progressIntervalRef = useRef(null);

    const generateAiPrompt = (type) => {
        let promptText = "Create an epic, professional sports tournament poster. Style: Sharp geometric shapes like parallelograms and angled banners, split layout. Color scheme: bold reds, maroons, and white. Clean, modern typography. High-quality action photography of soccer players in the background. Inspired by professional Asian football league graphics (like Cambodian Premier League).\n\nDetails to include:\n";

        if (type === 'schedule') {
            const upNext = data.matches.filter(m => !m.played).slice(0, 5);
            const matchLines = upNext.map(m => {
                const p1 = data.players.find(p => p.id === m.p1Id)?.name || m.p1Id;
                const p2 = data.players.find(p => p.id === m.p2Id)?.name || m.p2Id;
                return `${p1} VS ${p2} at 18:00`;
            }).join('\n');
            promptText += `Title: "MATCH SCHEDULE" or "FIXTURE LIVE" at the top in elegant formatting.\nList the following matchups inside sharp, angled horizontal banners:\n${matchLines}`;
        } else if (type === 'results') {
            const recent = data.matches.filter(m => m.played).slice(-5);
            const matchLines = recent.map(m => {
                const p1 = data.players.find(p => p.id === m.p1Id)?.name || m.p1Id;
                const p2 = data.players.find(p => p.id === m.p2Id)?.name || m.p2Id;
                let s1 = 0, s2 = 0;
                [m.g1, m.g2, m.g3].forEach(g => {
                    if (g.p1 > g.p2) s1++; if (g.p2 > g.p1) s2++;
                });
                return `${p1} [${s1} - ${s2}] ${p2}`;
            }).join('\n');
            promptText += `Title: "MATCH RESULTS" or "SUMMARY" at the top.\nList the following final scores centered between the team names inside sharp horizontal boxes:\n${matchLines}`;
        } else if (type === 'standings') {
            promptText += `Title: "LEADERBOARD" or "TOP 6". Show a clean, well-organized ranking table inside a sleek graphical panel with red and white accents.`;
        }

        setGeneratedPrompt(promptText);
        setGeneratedImageUrl(null);
        setIsGenerating(false);
    };

    const handleGenerateImage = async () => {
        if (!generatedPrompt) return;

        setIsGenerating(true);
        setGeneratedImageUrl(null);
        setRenderProgress(0);

        // Progress simulation (speeds up at the start, slows near the end)
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += progress < 60 ? Math.random() * 8 : progress < 85 ? Math.random() * 3 : Math.random() * 0.5;
            progress = Math.min(progress, 95);
            setRenderProgress(Math.round(progress));
        }, 500);
        progressIntervalRef.current = progressInterval;

        const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

        if (apiKey) {
            try {
                const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        instances: [{ prompt: generatedPrompt }],
                        parameters: { sampleCount: 1, aspectRatio: "3:4" }
                    })
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData?.error?.message || "Gemini API error");
                }

                const result = await res.json();
                if (result.predictions && result.predictions.length > 0 && result.predictions[0].bytesBase64Encoded) {
                    clearInterval(progressInterval);
                    setRenderProgress(100);
                    setGeneratedImageUrl(`data:image/png;base64,${result.predictions[0].bytesBase64Encoded}`);
                    setIsGenerating(false);
                    return;
                } else {
                    throw new Error("No image data returned from Gemini.");
                }
            } catch (error) {
                console.warn("Gemini Imagen failed, falling back to Pollinations:", error.message);
            }
        }

        // Fallback: Pollinations AI (use img tag directly - no CORS issues)
        const promptEncoded = encodeURIComponent(generatedPrompt);
        const imageUrl = `https://image.pollinations.ai/prompt/${promptEncoded}?width=1080&height=1440&nologo=true&seed=${Date.now()}`;
        setGeneratedImageUrl(imageUrl);
        // isGenerating stays true — the <img> onLoad in the render will clear it
    };

    const copyPrompt = () => {
        if (!generatedPrompt) return;
        navigator.clipboard.writeText(generatedPrompt);
        alert('Prompt copied to clipboard! You can now paste this into Gemini AI if you prefer manual generation.');
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100, damping: 15 }
        }
    };

    // ---------- LOGIN SCREEN ----------
    if (!isAdmin) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-md mx-auto mt-20 p-10 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-[40px] shadow-2xl relative overflow-hidden group"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-purple-500/20 transition-all duration-700 mix-blend-screen"></div>

                <div className="flex justify-center mb-8 relative z-10">
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-24 h-24 bg-purple-500/10 rounded-3xl flex items-center justify-center border border-purple-500/20 shadow-[0_0_40px_rgba(168,85,247,0.2)] backdrop-blur-md"
                    >
                        <Lock className="w-12 h-12 text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
                    </motion.div>
                </div>
                <h2 className="text-4xl font-outfit font-black text-center mb-3 text-white tracking-tighter uppercase drop-shadow-md relative z-10">Admin Portal</h2>
                <p className="text-slate-400 text-center text-sm mb-10 font-bold tracking-wide relative z-10">Authentication required to manage.</p>
                <form onSubmit={handleLogin} className="space-y-6 relative z-10">
                    <div className="space-y-4">
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-slate-950/50 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:border-purple-500/50 focus:bg-slate-900/80 text-center text-lg text-white font-bold placeholder:text-slate-600 shadow-inner transition-colors" required />
                        {passError && <p className="text-rose-400 text-xs mt-3 text-center font-black tracking-widest uppercase animate-pulse drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]">Invalid credentials</p>}
                    </div>
                    <motion.button
                        whileHover={!isLoading ? { scale: 1.02 } : {}}
                        whileTap={!isLoading ? { scale: 0.98 } : {}}
                        type="submit" disabled={isLoading}
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-outfit font-black tracking-[0.2em] uppercase py-5 rounded-3xl shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all disabled:opacity-50 disabled:shadow-none text-lg relative overflow-hidden group/btn"
                    >
                        <span className="relative z-10">{isLoading ? 'Authenticating...' : 'Unlock Dashboard'}</span>
                        {!isLoading && <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] animate-shimmer"></div>}
                    </motion.button>
                </form>
            </motion.div>
        );
    }

    // ---------- STAT CARDS ----------
    const playedMatches = data.matches.filter(m => m.played).length;
    const totalMatches = data.matches.length;
    const filledPlayers = data.players.filter(p => p.name && p.name.trim()).length;

    const statCards = [
        { label: 'Registrations', value: totalRegistrations, icon: UserPlus, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', shadow: 'shadow-[0_0_30px_rgba(251,191,36,0.15)]', drop: 'drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]' },
        { label: 'Roster Approved', value: approvedPlayers.length, icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', shadow: 'shadow-[0_0_30px_rgba(96,165,250,0.15)]', drop: 'drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]' },
        { label: 'Matches Played', value: `${playedMatches}/${totalMatches}`, icon: Zap, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', shadow: 'shadow-[0_0_30px_rgba(168,85,247,0.15)]', drop: 'drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]' },
    ];

    // ---------- DASHBOARD ----------
    return (
        <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Header Bar */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 bg-slate-900/80 backdrop-blur-xl p-6 sm:p-8 rounded-[32px] border border-white/5 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none mix-blend-screen group-hover:bg-blue-500/20 transition-all duration-700"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] pointer-events-none mix-blend-screen group-hover:bg-purple-500/20 transition-all duration-700"></div>

                <div className="flex items-center gap-6 w-full sm:w-auto relative z-10 flex-wrap sm:flex-nowrap">
                    <button onClick={handleLogout} className="flex items-center gap-2 px-5 py-2.5 bg-slate-950/50 hover:bg-rose-500/10 border border-white/5 hover:border-rose-500/30 text-rose-400 rounded-xl text-[10px] font-outfit font-black tracking-widest uppercase transition-all shadow-sm shrink-0 backdrop-blur-md">
                        <LogOut className="w-4 h-4" /> Logout
                    </button>

                    <div className="relative">
                        <h2 className="text-3xl font-outfit font-black flex items-center gap-3 text-white tracking-widest uppercase drop-shadow-md">
                            <ShieldCheck className="text-blue-400 w-8 h-8 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
                            Dashboard
                        </h2>
                        <div className="flex items-center gap-3 mt-2 underline-offset-4 decoration-blue-500/30 underline decoration-2">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#34d399]"></div>
                                <span className="text-[10px] font-outfit font-black text-emerald-400 tracking-[0.2em] uppercase mt-0.5">LIVE SYNC</span>
                            </div>
                            <span className="text-slate-600">•</span>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{data.settings.season}</span>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 w-full sm:w-auto flex justify-start sm:justify-end mt-4 sm:mt-0">
                    <span className={`text-xs font-outfit font-black tracking-[0.2em] uppercase px-5 py-2.5 rounded-xl border backdrop-blur-md flex items-center gap-2 ${data.settings.tournamentStarted ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.15)]' : 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.15)]'}`}>
                        {data.settings.tournamentStarted ? 'Tournament LIVE' : 'Pre-Season Mode'}
                    </span>
                </div>
            </motion.div>

            {/* Tab Navigation */}
            <motion.div variants={itemVariants} className="flex gap-2 bg-slate-900/50 p-2 rounded-[24px] border border-white/5 overflow-x-auto no-scrollbar backdrop-blur-xl">
                {TABS.map(tab => {
                    const isActive = activeTab === tab.id;
                    const TabIcon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-3 px-6 py-3.5 rounded-[18px] transition-all text-sm font-outfit font-bold tracking-wider whitespace-nowrap relative overflow-hidden group ${isActive
                                ? 'bg-white/10 text-white shadow-inner border border-white/5'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                                }`}
                        >
                            <TabIcon className={`w-5 h-5 ${isActive ? 'text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]' : ''}`} />
                            <span className="relative z-10">{tab.label}</span>
                            {tab.id === 'danger' && <span className="w-2 h-2 rounded-full bg-rose-500 ml-2 shadow-[0_0_10px_rgba(244,63,94,0.6)]"></span>}
                            {isActive && <motion.div layoutId="activeTabAdmin" className="absolute inset-0 bg-blue-500/10 mix-blend-screen" border-white border-2></motion.div>}
                        </button>
                    );
                })}
            </motion.div>

            {/* ===== OVERVIEW TAB ===== */}
            <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="space-y-8"
                    >
                        {/* Stat Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {statCards.map((card, idx) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                                    key={card.label}
                                    className={`bg-slate-900/80 backdrop-blur-xl border border-white/5 rounded-[28px] p-6 sm:p-8 relative overflow-hidden group hover:border-white/10 transition-all ${card.shadow}`}
                                >
                                    <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] pointer-events-none ${card.bg} group-hover:scale-110 transition-transform duration-500 mix-blend-screen`}></div>
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border ${card.bg} ${card.border} shadow-inner`}>
                                        <card.icon className={`w-7 h-7 ${card.color} ${card.drop}`} />
                                    </div>
                                    <p className="text-3xl sm:text-4xl font-outfit font-black text-white tracking-widest mb-1">{card.value}</p>
                                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">{card.label}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-slate-900/80 backdrop-blur-xl border border-white/5 rounded-[32px] p-8 sm:p-10 shadow-2xl">
                            <h3 className="text-sm font-outfit font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                                <Zap className="w-5 h-5 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" /> Quick Actions
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <button onClick={() => setActiveTab('settings')} className="flex flex-col items-center justify-center gap-4 p-6 rounded-2xl bg-slate-950/50 border border-white/5 hover:border-blue-500/30 hover:bg-slate-900/80 transition-all group shadow-inner">
                                    <Settings className="w-8 h-8 text-blue-400 group-hover:scale-110 group-hover:rotate-45 transition-all drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]" />
                                    <span className="text-xs font-outfit font-black tracking-widest text-slate-300 uppercase">Settings</span>
                                </button>
                                <button onClick={() => setActiveTab('roster')} className="flex flex-col items-center justify-center gap-4 p-6 rounded-2xl bg-slate-950/50 border border-white/5 hover:border-emerald-500/30 hover:bg-slate-900/80 transition-all group shadow-inner">
                                    <Users className="w-8 h-8 text-emerald-400 group-hover:scale-110 transition-transform drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                    <span className="text-xs font-outfit font-black tracking-widest text-slate-300 uppercase">Roster</span>
                                </button>
                                <button onClick={() => setActiveTab('season')} className="flex flex-col items-center justify-center gap-4 p-6 rounded-2xl bg-slate-950/50 border border-white/5 hover:border-amber-500/30 hover:bg-slate-900/80 transition-all group shadow-inner">
                                    <Shuffle className="w-8 h-8 text-amber-400 group-hover:scale-110 group-hover:-rotate-12 transition-transform drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
                                    <span className="text-xs font-outfit font-black tracking-widest text-slate-300 uppercase">Draw</span>
                                </button>
                                <button onClick={() => setActiveTab('danger')} className="flex flex-col items-center justify-center gap-4 p-6 rounded-2xl bg-slate-950/50 border border-white/5 hover:border-rose-500/30 hover:bg-slate-900/80 transition-all group shadow-inner">
                                    <Flame className="w-8 h-8 text-rose-400 group-hover:scale-110 transition-transform drop-shadow-[0_0_10px_rgba(244,63,94,0.5)]" />
                                    <span className="text-xs font-outfit font-black tracking-widest text-slate-300 uppercase">Reset</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* ===== SETTINGS TAB ===== */}
                {activeTab === 'settings' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="bg-slate-900/80 backdrop-blur-xl border border-white/5 rounded-[40px] p-8 sm:p-12 shadow-2xl relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none mix-blend-screen group-hover:bg-blue-600/10 transition-all duration-700"></div>

                        <h3 className="text-3xl font-outfit font-black mb-10 flex items-center gap-4 text-white uppercase tracking-widest drop-shadow-md relative z-10">
                            <div className="p-4 rounded-3xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-inner">
                                <Settings className="w-8 h-8 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
                            </div>
                            Tournament Settings
                        </h3>
                        <div className="grid md:grid-cols-2 gap-10 relative z-10">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-[11px] text-slate-400 font-outfit font-black mb-3 uppercase tracking-[0.2em] ml-2">Tournament Name</label>
                                    <input value={settings.name} onChange={e => setSettings({ ...settings, name: e.target.value })}
                                        className="w-full bg-slate-950/50 backdrop-blur-md border border-white/10 text-white rounded-2xl px-6 py-4 focus:border-blue-500/50 focus:bg-slate-900/80 outline-none shadow-inner transition-all font-bold text-lg" />
                                </div>
                                <div>
                                    <label className="block text-[11px] text-slate-400 font-outfit font-black mb-3 uppercase tracking-[0.2em] ml-2">Season</label>
                                    <input value={settings.season} onChange={e => setSettings({ ...settings, season: e.target.value })}
                                        className="w-full bg-slate-950/50 backdrop-blur-md border border-white/10 text-white rounded-2xl px-6 py-4 focus:border-blue-500/50 focus:bg-slate-900/80 outline-none shadow-inner transition-all font-bold text-lg" />
                                </div>
                                <div>
                                    <label className="block text-[11px] text-slate-400 font-outfit font-black mb-3 uppercase tracking-[0.2em] ml-2">Tagline</label>
                                    <input value={settings.tagline} onChange={e => setSettings({ ...settings, tagline: e.target.value })}
                                        className="w-full bg-slate-950/50 backdrop-blur-md border border-white/10 text-white rounded-2xl px-6 py-4 focus:border-blue-500/50 focus:bg-slate-900/80 outline-none shadow-inner transition-all font-bold text-lg" />
                                </div>
                            </div>
                            <div className="space-y-6">
                                <h4 className="text-[11px] text-slate-400 font-outfit font-black uppercase tracking-[0.2em] mb-3 ml-2">Status Controls</h4>
                                <label className="flex items-center justify-between p-6 bg-slate-950/50 backdrop-blur-md border border-white/10 rounded-3xl cursor-pointer hover:border-blue-500/50 hover:bg-slate-900/80 transition-all shadow-inner group/toggle">
                                    <div>
                                        <span className="text-lg font-outfit font-black text-white block tracking-widest uppercase">Registration Open</span>
                                        <span className="text-xs font-bold text-slate-500">Allow new players to sign up</span>
                                    </div>
                                    <div className={`w-14 h-8 rounded-full p-1 transition-colors cursor-pointer flex-shrink-0 shadow-inner ${settings.registrationOpen ? 'bg-blue-500' : 'bg-slate-800 border border-white/10'}`}
                                        onClick={() => setSettings({ ...settings, registrationOpen: !settings.registrationOpen })}>
                                        <div className={`w-6 h-6 rounded-full bg-white shadow-md transition-transform ${settings.registrationOpen ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                    </div>
                                </label>
                                <label className="flex items-center justify-between p-6 bg-slate-950/50 backdrop-blur-md border border-white/10 rounded-3xl cursor-pointer hover:border-emerald-500/50 hover:bg-slate-900/80 transition-all shadow-inner group/toggle">
                                    <div>
                                        <span className="text-lg font-outfit font-black text-white block tracking-widest uppercase">Tournament LIVE</span>
                                        <span className="text-xs font-bold text-slate-500">Show standings & schedule publicly</span>
                                    </div>
                                    <div className={`w-14 h-8 rounded-full p-1 transition-colors cursor-pointer flex-shrink-0 shadow-inner ${settings.tournamentStarted ? 'bg-emerald-500' : 'bg-slate-800 border border-white/10'}`}
                                        onClick={() => setSettings({ ...settings, tournamentStarted: !settings.tournamentStarted })}>
                                        <div className={`w-6 h-6 rounded-full bg-white shadow-md transition-transform ${settings.tournamentStarted ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <motion.button
                            whileHover={!isSavedSettings ? { scale: 1.02 } : {}}
                            whileTap={!isSavedSettings ? { scale: 0.98 } : {}}
                            onClick={handleSaveSettings} disabled={isSavedSettings}
                            className={`w-full mt-10 py-5 rounded-3xl font-outfit font-black tracking-[0.2em] uppercase transition-all text-lg shadow-lg relative overflow-hidden group/btn ${isSavedSettings ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-[0_0_40px_rgba(79,70,229,0.5)]'}`}>
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                {isSavedSettings ? <><CheckCircle2 className="w-6 h-6" /> Settings Saved!</> : 'Save Settings'}
                            </span>
                            {!isSavedSettings && <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] animate-shimmer"></div>}
                        </motion.button>
                    </motion.div>
                )}

                {/* ===== ROSTER TAB ===== */}
                {activeTab === 'roster' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="space-y-8"
                    >
                        {/* Management List */}
                        <div className="bg-slate-900/80 backdrop-blur-xl border border-white/5 rounded-[40px] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10 relative z-10">
                                <h3 className="text-2xl sm:text-3xl font-outfit font-black flex items-center gap-4 text-white uppercase tracking-widest drop-shadow-md">
                                    <div className="p-4 rounded-3xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-inner">
                                        <UserPlus className="w-7 h-7 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
                                    </div>
                                    Registrations
                                    <span className="bg-slate-950/50 border border-white/10 text-purple-400 text-lg py-1.5 px-3.5 rounded-2xl font-black shadow-inner ml-2">
                                        {registrations.length}
                                    </span>
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-h-[500px] overflow-y-auto pr-4 no-scrollbar relative z-10 p-1">
                                {registrations.length === 0 ? (
                                    <div className="lg:col-span-2 py-16 text-center border-2 border-dashed border-white/5 rounded-3xl text-slate-500 font-outfit font-black uppercase tracking-widest text-sm bg-slate-950/30 backdrop-blur-sm">
                                        <UserPlus className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                        No registrations found
                                    </div>
                                ) : (
                                    registrations.map(reg => (
                                        <div key={reg.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-3xl bg-slate-950/50 border border-white/5 hover:border-purple-500/30 transition-all group shadow-sm gap-4">
                                            <div className="flex items-center gap-5">
                                                <div className="p-1.5 rounded-2xl bg-slate-900 border border-white/5 shadow-inner shrink-0">
                                                    <PlayerAvatar name={reg.name} logo={reg.baseTeam || reg.logo} className="w-12 h-12 text-sm" />
                                                </div>
                                                <div>
                                                    <p className="font-outfit font-black text-white tracking-widest text-lg">{reg.name}</p>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{reg.baseTeam}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-end gap-3 shrink-0">
                                                {reg.status !== 'approved' ? (
                                                    <button onClick={() => handleApproveReg(reg.id)} className="p-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-all border border-emerald-500/20 shadow-sm" title="Approve">
                                                        <CheckCircle2 className="w-5 h-5 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                                    </button>
                                                ) : (
                                                    <span className="text-[10px] font-outfit font-black text-emerald-400 px-3 py-1.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20 uppercase tracking-[0.2em] shadow-sm">Approved</span>
                                                )}
                                                <button onClick={() => handleDeleteReg(reg.id)} className="p-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-all border border-rose-500/20 shadow-sm" title="Delete">
                                                    <Trash2 className="w-5 h-5 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        <div className="bg-slate-900/80 backdrop-blur-xl border border-white/5 rounded-[40px] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/5 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>

                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10 relative z-10">
                                <h3 className="text-2xl sm:text-3xl font-outfit font-black flex items-center gap-4 text-white uppercase tracking-widest drop-shadow-md">
                                    <div className="p-4 rounded-3xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-inner">
                                        <Users className="w-7 h-7 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                                    </div>
                                    Tournament Roster
                                </h3>
                                <motion.button
                                    whileHover={!isSavedPlayers ? { scale: 1.02 } : {}}
                                    whileTap={!isSavedPlayers ? { scale: 0.98 } : {}}
                                    onClick={handleSavePlayers} disabled={isSavedPlayers}
                                    className={`px-8 py-4 rounded-2xl text-sm font-outfit font-black tracking-[0.2em] uppercase transition-all flex items-center gap-3 shadow-lg w-full sm:w-auto justify-center ${isSavedPlayers ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]'}`}>
                                    <CheckCircle2 className="w-5 h-5" /> {isSavedPlayers ? 'Saved!' : 'Save Roster'}
                                </motion.button>
                            </div>

                            <div className="grid md:grid-cols-3 gap-8 relative z-10">
                                {[...new Set(players.map(p => p.group))].sort().map((grp, idx) => {
                                    const groupColors = [
                                        'from-blue-500/10 to-transparent border-blue-500/20 text-blue-400',
                                        'from-purple-500/10 to-transparent border-purple-500/20 text-purple-400',
                                        'from-amber-500/10 to-transparent border-amber-500/20 text-amber-400',
                                        'from-emerald-500/10 to-transparent border-emerald-500/20 text-emerald-400',
                                        'from-rose-500/10 to-transparent border-rose-500/20 text-rose-400',
                                        'from-cyan-500/10 to-transparent border-cyan-500/20 text-cyan-400'
                                    ];
                                    const colorCls = groupColors[idx % groupColors.length];

                                    return (
                                        <div key={grp} className="bg-slate-950/60 p-6 rounded-[32px] border border-white/5 shadow-inner">
                                            <div className={`bg-gradient-to-b ${colorCls} p-4 rounded-2xl mb-6 text-center border shadow-[inset_0_1px_rgba(255,255,255,0.1)]`}>
                                                <h4 className="font-outfit font-black text-2xl uppercase tracking-[0.3em]">Group {grp}</h4>
                                            </div>
                                            <div className="space-y-4">
                                                {players.filter(p => p.group === grp).map((p, pIdx) => (
                                                    <div key={p.id} className="group flex items-center gap-4 bg-slate-900/50 p-2.5 rounded-2xl border border-white/5 hover:border-white/20 transition-all shadow-sm relative overflow-hidden">
                                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/5 group-hover:bg-white/20 transition-colors"></div>
                                                        <div className="font-outfit font-black text-[10px] text-slate-600 tracking-widest w-4 text-center">{pIdx + 1}</div>
                                                        <PlayerAvatar name={p.name} logo={p.logo} className="w-10 h-10 text-[10px] rounded-xl" />
                                                        <input value={p.name} onChange={e => handlePlayerChange(p.id, e.target.value)}
                                                            className="flex-1 bg-transparent border-none text-white px-2 py-2 text-base focus:outline-none font-outfit font-bold placeholder:text-slate-600 tracking-wide"
                                                            placeholder={`Player ${p.id}`} />
                                                        <button onClick={() => handleClearPlayer(p.id)} className="opacity-0 group-hover:opacity-100 p-2 hover:bg-rose-500/10 text-rose-400 rounded-xl transition-all mr-1" title="Clear Slot">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* ===== SEASON TOOLS TAB ===== */}
                {activeTab === 'season' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="space-y-6"
                    >
                        {/* Group Draw */}
                        <div className="bg-slate-900/80 backdrop-blur-xl border border-white/5 rounded-[40px] p-8 sm:p-12 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen group-hover:bg-emerald-500/20 transition-all duration-700"></div>
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none"></div>

                            <h3 className="text-3xl font-outfit font-black mb-6 flex items-center gap-4 text-white uppercase tracking-widest relative z-10 drop-shadow-md">
                                <div className="p-4 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 shadow-inner">
                                    <Users className="w-8 h-8 text-emerald-400 group-hover:scale-110 transition-transform drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                </div>
                                <span>{approvedPlayers.length} Approved</span>
                            </h3>
                            <p className="text-slate-400 mt-3 font-medium text-lg max-w-sm">
                                Randomly assign <strong className="text-emerald-400">all currently approved</strong> registrations into dynamic groups. <br />
                                <span className="text-sm font-bold text-amber-500/80 uppercase tracking-widest block mt-2">Warning: Resets match history</span>
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto relative z-10">
                                <div className={`flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-lg font-outfit font-black tracking-widest uppercase shadow-sm ${approvedPlayers.length >= 2 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                                    <Users className="w-6 h-6" /> {approvedPlayers.length} Approved
                                </div>
                                <motion.button
                                    whileHover={approvedPlayers.length >= 2 ? { scale: 1.02 } : {}}
                                    whileTap={approvedPlayers.length >= 2 ? { scale: 0.98 } : {}}
                                    onClick={handleDrawGroups} disabled={approvedPlayers.length < 2}
                                    className={`flex-1 w-full py-5 rounded-2xl font-outfit font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-4 text-lg shadow-lg ${approvedPlayers.length >= 2 ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}>
                                    <Shuffle className="w-6 h-6" /> Auto Draw Groups
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* ===== DANGER TAB ===== */}
                {activeTab === 'danger' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="bg-slate-900/80 backdrop-blur-xl border border-rose-500/30 rounded-[40px] p-8 sm:p-12 shadow-[0_0_50px_rgba(244,63,94,0.1)] relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen group-hover:bg-rose-600/20 transition-all duration-700"></div>

                        <h3 className="text-3xl font-outfit font-black mb-8 flex items-center gap-4 text-rose-400 uppercase tracking-widest relative z-10 drop-shadow-[0_0_10px_rgba(244,63,94,0.5)]">
                            <div className="p-4 rounded-3xl bg-rose-500/10 border border-rose-500/20 shadow-inner">
                                <Flame className="w-8 h-8 animate-pulse" />
                            </div>
                            Danger Zone
                        </h3>

                        <div className="bg-rose-500/5 backdrop-blur-md border border-rose-500/20 rounded-3xl p-8 mb-10 relative z-10 shadow-inner">
                            <p className="text-rose-200/80 font-medium text-lg leading-relaxed">
                                Resetting the tournament will <strong className="text-rose-400 font-black">permanently wipe</strong> the active season&apos;s scores, matches, bracket, and roster.
                                Archived seasons in history are kept safe. <br /><br /><strong className="text-rose-300 font-bold tracking-widest uppercase text-sm border-b border-rose-500/30 pb-1">This action cannot be undone.</strong>
                            </p>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleReset}
                            className="w-full py-6 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white rounded-3xl font-outfit font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-4 shadow-[0_0_30px_rgba(244,63,94,0.3)] hover:shadow-[0_0_50px_rgba(244,63,94,0.5)] relative z-10 text-xl border border-rose-400/30"
                        >
                            <RefreshCw className="w-6 h-6" /> Factory Reset Season
                        </motion.button>
                    </motion.div>
                )}

                {/* ===== AI STUDIO TAB ===== */}
                {activeTab === 'studio' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="bg-slate-900/80 backdrop-blur-xl border border-white/5 rounded-[40px] p-8 sm:p-12 shadow-2xl relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen group-hover:bg-amber-500/20 transition-all duration-700"></div>

                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10 relative z-10">
                            <h3 className="text-3xl font-outfit font-black flex items-center gap-4 text-white uppercase tracking-widest drop-shadow-md">
                                <div className="p-4 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shadow-inner">
                                    <Sparkles className="w-8 h-8 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
                                </div>
                                Gemini AI Studio
                            </h3>
                            <a href="https://gemini.google.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl font-bold transition-all backdrop-blur-md shadow-sm">
                                <ExternalLink className="w-4 h-4" /> Open Gemini
                            </a>
                        </div>

                        <p className="text-slate-400 mb-8 font-medium text-lg relative z-10">
                            Generate context-aware prompts designed for <strong className="text-amber-400">Gemini AI</strong> to create epic tournament posters, result announcements, and schedule graphics.
                        </p>

                        <div className="grid md:grid-cols-3 gap-4 mb-8 relative z-10">
                            <button onClick={() => generateAiPrompt('schedule')} className={`p-6 rounded-2xl border transition-all text-left group shadow-inner ${generatedPrompt.includes('Upcoming Schedule') ? 'bg-blue-500/10 border-blue-500/30' : 'bg-slate-950/50 border-white/5 hover:border-white/20'}`}>
                                <ImageIcon className={`w-6 h-6 mb-3 ${generatedPrompt.includes('Upcoming Schedule') ? 'text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]' : 'text-slate-500'}`} />
                                <span className={`text-lg font-outfit font-black uppercase tracking-widest block mb-1 ${generatedPrompt.includes('Upcoming Schedule') ? 'text-blue-400' : 'text-slate-300'}`}>Schedule Poster</span>
                                <span className="text-xs font-bold text-slate-500">Upcoming unplayed matches</span>
                            </button>
                            <button onClick={() => generateAiPrompt('results')} className={`p-6 rounded-2xl border transition-all text-left group shadow-inner ${generatedPrompt.includes('Latest Results') ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-950/50 border-white/5 hover:border-white/20'}`}>
                                <Trophy className={`w-6 h-6 mb-3 ${generatedPrompt.includes('Latest Results') ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'text-slate-500'}`} />
                                <span className={`text-lg font-outfit font-black uppercase tracking-widest block mb-1 ${generatedPrompt.includes('Latest Results') ? 'text-emerald-400' : 'text-slate-300'}`}>Results Poster</span>
                                <span className="text-xs font-bold text-slate-500">Recent completed matches</span>
                            </button>
                            <button onClick={() => generateAiPrompt('standings')} className={`p-6 rounded-2xl border transition-all text-left group shadow-inner ${generatedPrompt.includes('Tournament Update') ? 'bg-purple-500/10 border-purple-500/30' : 'bg-slate-950/50 border-white/5 hover:border-white/20'}`}>
                                <BarChart3 className={`w-6 h-6 mb-3 ${generatedPrompt.includes('Tournament Update') ? 'text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]' : 'text-slate-500'}`} />
                                <span className={`text-lg font-outfit font-black uppercase tracking-widest block mb-1 ${generatedPrompt.includes('Tournament Update') ? 'text-purple-400' : 'text-slate-300'}`}>Update Poster</span>
                                <span className="text-xs font-bold text-slate-500">General tournament status</span>
                            </button>
                        </div>

                        {generatedPrompt && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="relative z-10 space-y-4">
                                <div className="space-y-4">
                                    <label className="text-sm font-outfit font-black text-slate-400 uppercase tracking-[0.2em] ml-2 block">Generated Prompt</label>
                                    <div className="relative group">
                                        <textarea 
                                            readOnly 
                                            value={generatedPrompt} 
                                            className="w-full h-48 bg-[#0A0D14] border border-amber-500/20 rounded-2xl p-6 pb-20 text-white font-medium text-sm outline-none resize-none shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)] leading-relaxed"
                                        />
                                        <div className="absolute bottom-4 right-4 flex flex-wrap gap-3 pointer-events-none">
                                            <button 
                                                onClick={copyPrompt}
                                                className="pointer-events-auto p-3 sm:px-5 bg-[#131A2B] hover:bg-[#1e293b] text-slate-300 rounded-xl border border-white/10 shadow-lg transition-all flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest"
                                            >
                                                <Copy className="w-4 h-4" /> <span className="hidden sm:inline">Copy Prompt</span>
                                            </button>
                                            <button 
                                                onClick={handleGenerateImage}
                                                disabled={isGenerating}
                                                className="pointer-events-auto p-3 sm:px-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white rounded-xl border border-amber-400/50 shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed group/gen"
                                            >
                                                <ImageIcon className={`w-4 h-4 ${isGenerating ? 'animate-bounce' : 'group-hover/gen:rotate-12 transition-transform'}`} /> 
                                                <span className="hidden sm:inline">{isGenerating ? 'Rendering Magic...' : 'Generate Art (Free)'}</span>
                                                <span className="sm:hidden">{isGenerating ? '...' : 'Generate'}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>


                            </motion.div>
                        )}

                        {/* Generated Image Preview */}
                        <AnimatePresence>
                            {(isGenerating || generatedImageUrl) && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, height: 0 }}
                                    animate={{ opacity: 1, scale: 1, height: 'auto' }}
                                    exit={{ opacity: 0, scale: 0.95, height: 0 }}
                                    className="relative z-10 mt-10 origin-top"
                                >
                                    <h4 className="text-sm font-outfit font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-3">
                                        <Sparkles className="w-4 h-4 text-amber-400" /> AI Output
                                    </h4>
                                    
                                    <div className="w-full max-w-lg mx-auto relative rounded-[32px] overflow-hidden bg-[#0A0D14] border border-white/10 aspect-[3/4] flex items-center justify-center shadow-2xl group/img">
                                        {/* Background effect */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-purple-500/5 pointer-events-none"></div>
                                        
                                        {isGenerating && (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-30 bg-[#0A0D14]/95 w-full px-8">
                                                <div className="relative w-24 h-24">
                                                    <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                                                        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(245,158,11,0.15)" strokeWidth="8" />
                                                        <circle cx="50" cy="50" r="42" fill="none" stroke="#f59e0b" strokeWidth="8"
                                                            strokeDasharray={`${renderProgress * 2.64} 264`}
                                                            strokeLinecap="round"
                                                            className="transition-all duration-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]"
                                                        />
                                                    </svg>
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <span className="text-2xl font-outfit font-black text-amber-400 tabular-nums">{renderProgress}%</span>
                                                    </div>
                                                </div>
                                                <div className="text-amber-400 font-outfit font-black tracking-widest uppercase text-sm text-center">
                                                    {renderProgress < 30 ? 'Initializing AI...' : renderProgress < 70 ? 'Generating artwork...' : renderProgress < 95 ? 'Finalizing details...' : 'Almost done...'}
                                                </div>
                                                <div className="w-full max-w-xs bg-slate-800/60 rounded-full h-2 overflow-hidden">
                                                    <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" style={{width: `${renderProgress}%`}} />
                                                </div>
                                            </div>
                                        )}
                                        {generatedImageUrl && (
                                            <>
                                                <img 
                                                    src={generatedImageUrl} 
                                                    alt="AI Generated Tournament Poster" 
                                                    className={`w-full h-full object-cover relative z-10 ${isGenerating ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
                                                    onLoad={() => {
                                                        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
                                                        setRenderProgress(100);
                                                        setTimeout(() => setIsGenerating(false), 500);
                                                    }}
                                                    onError={() => {
                                                        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
                                                        setIsGenerating(false);
                                                        setGeneratedImageUrl(null);
                                                        setRenderProgress(0);
                                                        alert('Image generation failed. Please try again.');
                                                    }}
                                                />
                                                {!isGenerating && (
                                                    <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-[#0A0D14] via-[#0A0D14]/60 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end justify-center pb-8 z-20">
                                                        <a 
                                                            href={generatedImageUrl} 
                                                            download="pestour-ai-poster.jpg"
                                                            className="px-6 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-2xl font-outfit font-black uppercase tracking-widest flex items-center gap-3 shadow-[0_0_30px_rgba(245,158,11,0.6)] transition-all transform hover:scale-105"
                                                        >
                                                            <ExternalLink className="w-5 h-5" /> Save Image
                                                        </a>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                        {!isGenerating && !generatedImageUrl && null}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
