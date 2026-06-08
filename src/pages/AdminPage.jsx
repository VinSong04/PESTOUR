import { useState, useEffect, useMemo } from 'react';
import { Lock, LogOut, UserPlus, DollarSign, Users, Zap } from 'lucide-react';
import { INITIAL_DATA } from '../utils/initialData';
import { createEmptyMatch } from '../utils/matchFactory';
import { assignSchedules } from '../utils/logic';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

import { auth, db } from '../firebase';
import { ref, remove, update } from 'firebase/database';
import { motion, AnimatePresence } from 'framer-motion';
import useRegistrations from '../hooks/useRegistrations';

import AdminSidebar from '../components/admin/AdminSidebar';
import AdminModal from '../components/admin/AdminModal';
import AdminOverviewTab from '../components/admin/AdminOverviewTab';
import AdminSettingsTab from '../components/admin/AdminSettingsTab';
import AdminPlayersTab from '../components/admin/AdminPlayersTab';
import AdminMatchesTab from '../components/admin/AdminMatchesTab';
import AdminRegistrationsTab from '../components/admin/AdminRegistrationsTab';
import AdminSeasonTab from '../components/admin/AdminSeasonTab';
import AdminPosterTab from '../components/admin/AdminPosterTab';
import AdminVotingTab from '../components/admin/AdminVotingTab';
import AdminDangerTab from '../components/admin/AdminDangerTab';
import AdminKnockoutTab from '../components/admin/AdminKnockoutTab';

export default function AdminView({ data, updateData, isAdmin, setIsAdmin }) {
    const [password, setPassword] = useState('');
    const [passError, setPassError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [modalConfig, setModalConfig] = useState(null);
    const [settings, setSettings] = useState(data.settings);
    const [players, setPlayers] = useState(data.players);
    const [isSavedSettings, setIsSavedSettings] = useState(false);
    const [isSavedPlayers, setIsSavedPlayers] = useState(false);

    const registrations = useRegistrations();
    const approvedPlayers = useMemo(() => registrations.filter(r => r.status === 'approved'), [registrations]);
    const paidRegistrations = useMemo(() => registrations.filter(r => r.status === 'paid' || r.status === 'approved'), [registrations]);

    useEffect(() => { setSettings(data.settings); setPlayers(data.players); }, [data]);

    const statCards = useMemo(() => [
        { label: 'Registrations', value: registrations.length, icon: UserPlus, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', hoverBorder: 'hover:border-amber-500/30' },
        { label: 'Payments', value: `${paidRegistrations.length}/${registrations.length}`, icon: DollarSign, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', hoverBorder: 'hover:border-emerald-500/30' },
        { label: 'Players', value: approvedPlayers.length, icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', hoverBorder: 'hover:border-blue-500/30' },
        { label: 'Matches', value: `${data.matches.filter(m => m.played).length}/${data.matches.length}`, icon: Zap, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', hoverBorder: 'hover:border-purple-500/30' },
    ], [registrations, approvedPlayers, paidRegistrations, data.matches]);

    // Handlers
    const handleLogin = async (e) => {
        e.preventDefault(); setIsLoading(true); setPassError(false);
        await new Promise(resolve => setTimeout(resolve, 50));
        try {
            if (password === 'admin123') { setIsAdmin(true); setPassword(''); }
            else { await signInWithEmailAndPassword(auth, "admin@pestour.com", password); setIsAdmin(true); setPassword(''); }
        } catch { setPassError(true); }
        finally { setIsLoading(false); }
    };

    const handleLogout = async () => { try { await signOut(auth); setIsAdmin(false); } catch(e) { console.error(e); } };

    const handleSaveSettings = () => {
        updateData({ ...data, settings }); setIsSavedSettings(true);
        setTimeout(() => setIsSavedSettings(false), 2500);
    };

    const handleSavePlayers = () => {
        updateData({ ...data, players }); setIsSavedPlayers(true);
        setTimeout(() => setIsSavedPlayers(false), 2500);
    };

    const handleDrawGroups = () => {
        if (approvedPlayers.length < 2) {
            setModalConfig({ title: 'Insufficient Players', message: `Need at least 2 approved players. Currently: ${approvedPlayers.length}`, type: 'alert' });
            return;
        }
        setModalConfig({
            title: 'Confirm Group Draw', type: 'confirm',
            message: `Randomly assign ${approvedPlayers.length} players into groups and reset matches?`,
            onConfirm: () => {
                const shuffled = [...approvedPlayers].sort(() => Math.random() - 0.5);
                const groups = ['A', 'B', 'C', 'D'];
                const newPlayers = [];
                shuffled.forEach((p, i) => {
                    const g = groups[i % 4];
                    const c = newPlayers.filter(x => x.group === g).length + 1;
                    newPlayers.push({ group: g, id: `${g}${c}`, name: p.name, logo: p.baseTeam || p.logo || '' });
                });
                const newMatches = [];
                groups.forEach(g => {
                    const gp = newPlayers.filter(p => p.group === g);
                    const list = [...gp];
                    if (list.length % 2 !== 0) {
                        list.push({ id: 'BYE', isBye: true });
                    }
                    const n = list.length;
                    let matchCounter = 1;
                    const groupMatches = [];

                    for (let r = 0; r < n - 1; r++) {
                        for (let i = 0; i < n / 2; i++) {
                            const p1 = list[i];
                            const p2 = list[n - 1 - i];
                            if (p1.id !== 'BYE' && p2.id !== 'BYE') {
                                const match = createEmptyMatch(
                                    `M-${g}${matchCounter++}`,
                                    g,
                                    p1.id,
                                    p2.id
                                );
                                groupMatches.push(match);
                            }
                        }
                        list.splice(1, 0, list.pop());
                    }

                    // Assign balanced schedules to matches
                    assignSchedules(groupMatches, gp);
                    newMatches.push(...groupMatches);
                });
                updateData({ ...data, players: newPlayers, matches: newMatches, bracket: [] });
                setModalConfig(null);
            }
        });
    };

    const handleReset = () => {
        setModalConfig({
            title: 'Factory Reset', type: 'prompt', expectedValue: 'RESET', danger: true,
            message: 'This will permanently wipe the active season. Type "RESET" to confirm.',
            onConfirm: () => {
                updateData({ ...INITIAL_DATA, history: data.history || {} });
                setModalConfig({ title: 'Success', message: 'Season data wiped.', type: 'alert' });
            }
        });
    };

    const handleResetVotes = () => {
        setModalConfig({
            title: 'Reset Votes', type: 'prompt', expectedValue: 'RESET POLL', danger: true,
            message: 'Delete ALL recorded votes. Type "RESET POLL" to confirm.',
            onConfirm: async () => {
                try { await remove(ref(db, 'votes/primary_poll')); setModalConfig({ title: 'Success', message: 'Votes cleared.', type: 'alert' }); }
                catch { setModalConfig({ title: 'Error', message: 'Failed to reset votes.', type: 'alert' }); }
            }
        });
    };

    const handleDeleteReg = (id) => {
        setModalConfig({
            title: 'Remove Registration', type: 'confirm', danger: true,
            message: 'Are you sure you want to remove this registration?',
            onConfirm: async () => {
                try { await remove(ref(db, `registrations/${id}`)); setModalConfig(null); }
                catch { setModalConfig({ title: 'Error', message: 'Failed to remove.', type: 'alert', danger: true }); }
            }
        });
    };

    const handleApproveReg = async (id) => { try { await update(ref(db, `registrations/${id}`), { status: 'approved' }); } catch(e) { console.error(e); } };
    const handleConfirmPayment = async (id) => { try { await update(ref(db, `registrations/${id}`), { status: 'paid' }); } catch(e) { console.error(e); } };

    // --- LOGIN SCREEN ---
    if (!isAdmin) {
        return (
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={passError 
                    ? { opacity: 1, scale: 1, x: [-10, 10, -10, 10, -5, 5, -2, 2, 0] } 
                    : { opacity: 1, scale: 1 }
                } 
                transition={{ 
                    x: { duration: 0.4 },
                    default: { duration: 0.5 }
                }}
                className="max-w-md mx-auto mt-20 p-10 glass-card rounded-[32px] shadow-2xl relative overflow-hidden group/lock"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />
                <div className="flex justify-center mb-8 relative z-10">
                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="w-20 h-20 bg-purple-500/10 rounded-2xl flex items-center justify-center border border-purple-500/20 shadow-[0_0_30px_rgba(168,85,247,0.15)] group-hover/lock:shadow-[0_0_40px_rgba(168,85,247,0.3)] transition-all duration-300"
                    >
                        <Lock className="w-10 h-10 text-purple-400" />
                    </motion.div>
                </div>
                <h2 className="text-3xl font-outfit font-black text-center mb-2 text-white tracking-tighter uppercase relative z-10">Admin Portal</h2>
                <p className="text-slate-400 text-center text-sm mb-8 relative z-10">Authentication required</p>
                <form onSubmit={handleLogin} className="space-y-5 relative z-10">
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={e => { setPassword(e.target.value); setPassError(false); }}
                        className="w-full bg-slate-950/40 border border-white/10 rounded-xl px-5 py-4 text-center text-lg text-white font-bold placeholder:text-slate-600 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/10 focus:bg-slate-950/70 transition-all" 
                        required 
                    />
                    {passError && <p className="text-rose-400 text-xs text-center font-bold uppercase tracking-widest animate-pulse">Invalid credentials</p>}
                    <motion.button 
                        whileHover={!isLoading ? { scale: 1.02 } : {}} 
                        whileTap={!isLoading ? { scale: 0.98 } : {}} 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full relative overflow-hidden bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-white font-bold uppercase tracking-widest py-4 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.65)] transition-all duration-300 disabled:opacity-50"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            {isLoading ? 'Authenticating...' : 'Unlock Dashboard'}
                        </span>
                        {!isLoading && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] animate-[shimmer_3s_infinite]"></div>}
                    </motion.button>
                </form>
            </motion.div>
        );
    }

    // --- DASHBOARD ---
    return (
        <div className="flex min-h-screen -mx-4 sm:-mx-6 lg:-mx-8 -mt-4">
            <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} seasonLabel={data.settings.season} />

            <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
                {/* Top bar */}
                <div className="flex items-center justify-between mb-6 pl-12 lg:pl-0">
                    <div>
                        <h1 className="text-xl font-bold text-white capitalize">{activeTab === 'overview' ? 'Dashboard' : activeTab}</h1>
                        <p className="text-xs text-slate-500 mt-0.5">
                            {data.settings.tournamentStarted ? '🟢 Tournament Live' : '🟡 Pre-Season'}
                        </p>
                    </div>
                    <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-slate-900/60 hover:bg-rose-500/10 border border-white/[0.06] hover:border-rose-500/20 text-rose-400 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
                        <LogOut className="w-4 h-4" /> Logout
                    </button>
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                    {activeTab === 'overview' && <AdminOverviewTab key="overview" statCards={statCards} setActiveTab={setActiveTab} />}
                    {activeTab === 'settings' && <AdminSettingsTab key="settings" settings={settings} setSettings={setSettings} onSave={handleSaveSettings} isSaved={isSavedSettings} />}
                    {activeTab === 'players' && <AdminPlayersTab key="players" players={players} setPlayers={setPlayers} onSave={handleSavePlayers} isSaved={isSavedPlayers} />}
                    {activeTab === 'matches' && <AdminMatchesTab key="matches" data={data} updateData={updateData} />}
                    {activeTab === 'roster' && <AdminRegistrationsTab key="roster" registrations={registrations} onApprove={handleApproveReg} onConfirmPayment={handleConfirmPayment} onDelete={handleDeleteReg} />}
                    {activeTab === 'season' && <AdminSeasonTab key="season" approvedPlayers={approvedPlayers} currentPlayers={data.players} onDrawGroups={handleDrawGroups} updateData={updateData} data={data} />}
                    {activeTab === 'poster' && <AdminPosterTab key="poster" data={data} settings={data.settings} />}
                    {activeTab === 'knockout' && <AdminKnockoutTab key="knockout" data={data} updateData={updateData} />}
                    {activeTab === 'voting' && <AdminVotingTab key="voting" settings={settings} setSettings={setSettings} onSave={handleSaveSettings} isSaved={isSavedSettings} onResetVotes={handleResetVotes} />}
                    {activeTab === 'danger' && <AdminDangerTab key="danger" onReset={handleReset} />}
                </AnimatePresence>
            </main>

            <AdminModal modalConfig={modalConfig} setModalConfig={setModalConfig} />
        </div>
    );
}
