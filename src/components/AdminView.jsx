import { useState, useEffect } from 'react';
import { ShieldCheck, LogOut, Settings, Flame, RefreshCw, Users, CheckCircle2, Lock, Shuffle, Zap, BarChart3, UserPlus, Trophy, Trash2 } from 'lucide-react';
import { INITIAL_DATA, INITIAL_MATCHES } from '../utils/initialData';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { ref, onValue, remove, update } from 'firebase/database';
import PlayerAvatar from './PlayerAvatar';

const TABS = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'roster', label: 'Roster', icon: Users },
    { id: 'season', label: 'Season', icon: Trophy },
    { id: 'danger', label: 'Danger', icon: Flame },
];

export default function AdminView({ data, updateData, isAdmin, setIsAdmin }) {
    const [email, setEmail] = useState('');
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
        if (approvedPlayers.length < 12) {
            alert(`Need 12 approved players. Currently: ${approvedPlayers.length}`);
            return;
        }
        if (!window.confirm('Randomly assign 12 players into Groups A, B, C and reset matches?')) return;

        const shuffled = [...approvedPlayers].sort(() => Math.random() - 0.5);
        const groups = ['A', 'B', 'C'];
        const newPlayers = [];
        groups.forEach((g, gi) => {
            for (let i = 0; i < 4; i++) {
                const player = shuffled[gi * 4 + i];
                newPlayers.push({ group: g, id: `${g}${i + 1}`, name: player.name, logo: player.logo || '' });
            }
        });
        updateData({ ...data, players: newPlayers, matches: INITIAL_MATCHES, bracket: [] });
        alert('Groups drawn successfully!');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setPassError(false);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setIsAdmin(true);
            setPassword('');
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

    // ---------- LOGIN SCREEN ----------
    if (!isAdmin) {
        return (
            <div className="max-w-md mx-auto mt-20 p-8 bg-[#131722] border border-[#222B3D] rounded-2xl shadow-[0_0_50px_rgba(20,30,50,0.5)] animate-in zoom-in-95 duration-500">
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-[#C084FC]/10 rounded-full flex items-center justify-center border border-[#C084FC]/20 shadow-[0_0_30px_rgba(192,132,252,0.15)]">
                        <Lock className="w-10 h-10 text-[#C084FC]" />
                    </div>
                </div>
                <h2 className="text-3xl font-black text-center mb-2 text-[#E2E8F0] tracking-tight">Admin Portal</h2>
                <p className="text-[#8B9BB4] text-center text-sm mb-8 font-medium">Authentication required to manage tournament.</p>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-4">
                        <input type="email" placeholder="Admin Email" value={email} onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#0a0b10] border border-[#1E2738] rounded-xl px-5 py-4 focus:outline-none focus:border-[#C084FC] focus:ring-1 focus:ring-[#C084FC] text-center text-lg text-white placeholder-[#475569] shadow-inner transition-colors font-mono" required />
                        <input type="password" placeholder="Admin Password" value={password} onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#0a0b10] border border-[#1E2738] rounded-xl px-5 py-4 focus:outline-none focus:border-[#C084FC] focus:ring-1 focus:ring-[#C084FC] text-center text-lg text-white placeholder-[#475569] shadow-inner transition-colors font-mono" required />
                        {passError && <p className="text-[#EF4444] text-xs mt-3 text-center font-bold tracking-widest uppercase animate-pulse">Invalid credentials</p>}
                    </div>
                    <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-[#C084FC] to-[#9333EA] hover:from-[#A855F7] hover:to-[#7E22CE] text-white font-black tracking-widest uppercase py-4 rounded-xl shadow-[0_0_20px_rgba(192,132,252,0.3)] transition-all disabled:opacity-50">
                        {isLoading ? 'Authenticating...' : 'Unlock Dashboard'}
                    </button>
                </form>
            </div>
        );
    }

    // ---------- STAT CARDS ----------
    const playedMatches = data.matches.filter(m => m.played).length;
    const totalMatches = data.matches.length;
    const filledPlayers = data.players.filter(p => p.name && p.name.trim()).length;

    const statCards = [
        { label: 'Registrations', value: totalRegistrations, icon: UserPlus, color: '#F59E0B', bg: 'rgba(245,158,11,0.08)' },
        { label: 'Approved', value: approvedPlayers.length, icon: CheckCircle2, color: '#10B981', bg: 'rgba(16,185,129,0.08)' },
        { label: 'Roster Filled', value: `${filledPlayers}/12`, icon: Users, color: '#6384FF', bg: 'rgba(99,132,255,0.08)' },
        { label: 'Matches Played', value: `${playedMatches}/${totalMatches}`, icon: Zap, color: '#C084FC', bg: 'rgba(192,132,252,0.08)' },
    ];

    // ---------- DASHBOARD ----------
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-[#C084FC]/10 via-[#6384FF]/5 to-[#10B981]/10 p-6 rounded-2xl border border-[#C084FC]/20 shadow-[0_0_40px_rgba(192,132,252,0.08)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 bg-[#C084FC] opacity-[0.04] rounded-full blur-[60px] pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#10B981] opacity-[0.03] rounded-full blur-[50px] pointer-events-none"></div>

                <div className="flex items-center gap-6 w-full sm:w-auto relative z-10">
                    <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-[#0a0b10]/80 hover:bg-rose-950/40 border border-rose-500/20 hover:border-rose-500/50 text-rose-400 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all shadow-lg shrink-0">
                        <LogOut className="w-3.5 h-3.5" /> Logout
                    </button>

                    <div className="relative">
                        <h2 className="text-2xl font-black flex items-center gap-3 text-[#E2E8F0] tracking-tight">
                            <ShieldCheck className="text-[#A5B4FC] w-7 h-7" /> Admin Dashboard
                        </h2>
                        <div className="flex items-center gap-3 mt-1 underline-offset-4 decoration-[#C084FC]/30 underline decoration-2">
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse shadow-[0_0_6px_#10B981]"></div>
                                <span className="text-[9px] font-black text-[#10B981] tracking-widest uppercase mt-0.5">LIVE SYNC</span>
                            </div>
                            <span className="text-[#475569]">•</span>
                            <span className="text-[10px] font-bold text-[#8B9BB4] uppercase tracking-wider">{data.settings.season}</span>
                        </div>
                    </div>
                </div>

                <div className="relative z-10">
                    <span className={`text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-xl border ${data.settings.tournamentStarted ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                        {data.settings.tournamentStarted ? 'Tournament LIVE' : 'Pre-Season Mode'}
                    </span>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-1 bg-[#0a0b10] p-1.5 rounded-2xl border border-[#1E2738] overflow-x-auto no-scrollbar">
                {TABS.map(tab => {
                    const isActive = activeTab === tab.id;
                    const TabIcon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all text-sm font-bold tracking-wide whitespace-nowrap ${isActive
                                ? 'bg-[#18233C] text-[#A5B4FC] shadow-[inset_0_1px_rgba(165,180,252,0.15)] border border-[#2D3A5D]/50'
                                : 'text-[#64748B] hover:text-[#94A3B8] hover:bg-[#131722] border border-transparent'
                                }`}
                        >
                            <TabIcon className="w-4 h-4" />
                            {tab.label}
                            {tab.id === 'danger' && <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] ml-1"></span>}
                        </button>
                    );
                })}
            </div>

            {/* ===== OVERVIEW TAB ===== */}
            {activeTab === 'overview' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                    {/* Stat Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {statCards.map(card => (
                            <div key={card.label} className="bg-[#131722] border border-[#222B3D] rounded-2xl p-5 relative overflow-hidden group hover:border-[#334155] transition-all">
                                <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-[40px] pointer-events-none opacity-30" style={{ background: card.color }}></div>
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 border" style={{ background: card.bg, borderColor: card.color + '30' }}>
                                    <card.icon className="w-5 h-5" style={{ color: card.color }} />
                                </div>
                                <p className="text-2xl font-black text-[#F8FAFC] tracking-tight">{card.value}</p>
                                <p className="text-xs font-bold text-[#64748B] uppercase tracking-widest mt-1">{card.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-[#131722] border border-[#222B3D] rounded-2xl p-6">
                        <h3 className="text-sm font-black text-[#64748B] uppercase tracking-widest mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <button onClick={() => setActiveTab('settings')} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#0a0b10] border border-[#1E2738] hover:border-[#3B82F6]/50 hover:bg-[#131A2B] transition-all group">
                                <Settings className="w-5 h-5 text-[#3B82F6] group-hover:scale-110 transition-transform" />
                                <span className="text-xs font-bold text-[#8B9BB4]">Edit Settings</span>
                            </button>
                            <button onClick={() => setActiveTab('roster')} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#0a0b10] border border-[#1E2738] hover:border-[#10B981]/50 hover:bg-[#131A2B] transition-all group">
                                <Users className="w-5 h-5 text-[#10B981] group-hover:scale-110 transition-transform" />
                                <span className="text-xs font-bold text-[#8B9BB4]">Edit Roster</span>
                            </button>
                            <button onClick={() => setActiveTab('season')} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#0a0b10] border border-[#1E2738] hover:border-[#F59E0B]/50 hover:bg-[#131A2B] transition-all group">
                                <Shuffle className="w-5 h-5 text-[#F59E0B] group-hover:scale-110 transition-transform" />
                                <span className="text-xs font-bold text-[#8B9BB4]">Draw Groups</span>
                            </button>
                            <button onClick={() => setActiveTab('danger')} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#0a0b10] border border-[#1E2738] hover:border-[#EF4444]/50 hover:bg-[#131A2B] transition-all group">
                                <Flame className="w-5 h-5 text-[#EF4444] group-hover:scale-110 transition-transform" />
                                <span className="text-xs font-bold text-[#8B9BB4]">Reset</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== SETTINGS TAB ===== */}
            {activeTab === 'settings' && (
                <div className="bg-[#131722] border border-[#222B3D] rounded-2xl p-8 shadow-xl animate-in fade-in duration-300">
                    <h3 className="text-xl font-black mb-8 flex items-center gap-3 text-[#E2E8F0] uppercase tracking-wider">
                        <div className="p-2 rounded-xl bg-[#3B82F6]/10 text-[#60A5FA] border border-[#3B82F6]/20">
                            <Settings className="w-5 h-5" />
                        </div>
                        Tournament Settings
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-5">
                            <div>
                                <label className="block text-xs text-[#64748B] font-black mb-2 uppercase tracking-widest">Tournament Name</label>
                                <input value={settings.name} onChange={e => setSettings({ ...settings, name: e.target.value })}
                                    className="w-full bg-[#0a0b10] border border-[#1E2738] text-[#E2E8F0] rounded-xl px-4 py-3 focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] outline-none shadow-inner transition-all font-medium" />
                            </div>
                            <div>
                                <label className="block text-xs text-[#64748B] font-black mb-2 uppercase tracking-widest">Season</label>
                                <input value={settings.season} onChange={e => setSettings({ ...settings, season: e.target.value })}
                                    className="w-full bg-[#0a0b10] border border-[#1E2738] text-[#E2E8F0] rounded-xl px-4 py-3 focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] outline-none shadow-inner transition-all font-medium" />
                            </div>
                            <div>
                                <label className="block text-xs text-[#64748B] font-black mb-2 uppercase tracking-widest">Tagline</label>
                                <input value={settings.tagline} onChange={e => setSettings({ ...settings, tagline: e.target.value })}
                                    className="w-full bg-[#0a0b10] border border-[#1E2738] text-[#E2E8F0] rounded-xl px-4 py-3 focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] outline-none shadow-inner transition-all font-medium" />
                            </div>
                        </div>
                        <div className="space-y-5">
                            <h4 className="text-xs text-[#64748B] font-black uppercase tracking-widest">Status Controls</h4>
                            <label className="flex items-center justify-between p-5 bg-[#0a0b10] border border-[#1E2738] rounded-xl cursor-pointer hover:border-[#3B82F6]/50 transition-all">
                                <div>
                                    <span className="text-sm font-bold text-[#E2E8F0] block">Registration Open</span>
                                    <span className="text-xs text-[#64748B]">Allow new players to sign up</span>
                                </div>
                                <div className={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer ${settings.registrationOpen ? 'bg-[#3B82F6]' : 'bg-[#1E2738]'}`}
                                    onClick={() => setSettings({ ...settings, registrationOpen: !settings.registrationOpen })}>
                                    <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${settings.registrationOpen ? 'translate-x-5' : 'translate-x-0'}`}></div>
                                </div>
                            </label>
                            <label className="flex items-center justify-between p-5 bg-[#0a0b10] border border-[#1E2738] rounded-xl cursor-pointer hover:border-[#10B981]/50 transition-all">
                                <div>
                                    <span className="text-sm font-bold text-[#E2E8F0] block">Tournament LIVE</span>
                                    <span className="text-xs text-[#64748B]">Show standings & schedule to everyone</span>
                                </div>
                                <div className={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer ${settings.tournamentStarted ? 'bg-[#10B981]' : 'bg-[#1E2738]'}`}
                                    onClick={() => setSettings({ ...settings, tournamentStarted: !settings.tournamentStarted })}>
                                    <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${settings.tournamentStarted ? 'translate-x-5' : 'translate-x-0'}`}></div>
                                </div>
                            </label>
                        </div>
                    </div>
                    <button onClick={handleSaveSettings} disabled={isSavedSettings}
                        className={`w-full mt-8 py-4 rounded-xl font-black tracking-widest uppercase border transition-all text-lg ${isSavedSettings ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-[#3B82F6]/10 hover:bg-[#3B82F6]/20 text-[#60A5FA] border-[#3B82F6]/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]'}`}>
                        {isSavedSettings ? '✓ Settings Saved!' : 'Save Settings'}
                    </button>
                </div>
            )}

            {/* ===== ROSTER TAB ===== */}
            {activeTab === 'roster' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                    {/* Management List */}
                    <div className="bg-[#131722] border border-[#222B3D] rounded-2xl p-8 shadow-xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-black flex items-center gap-3 text-[#E2E8F0] uppercase tracking-wider">
                                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                    <UserPlus className="w-5 h-5" />
                                </div>
                                Manage Registrations
                                <span className="bg-[#131C32] border border-[#2D3A5D]/50 text-[#A5B4FC] text-[10px] py-1 px-2.5 rounded-full font-black">
                                    {registrations.length}
                                </span>
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2 no-scrollbar">
                            {registrations.length === 0 ? (
                                <div className="lg:col-span-2 py-10 text-center border-2 border-dashed border-[#1E2738] rounded-xl text-[#475569] font-bold uppercase tracking-widest text-xs">
                                    No registrations found
                                </div>
                            ) : (
                                registrations.map(reg => (
                                    <div key={reg.id} className="flex items-center justify-between p-4 rounded-xl bg-[#0a0b10] border border-[#1E2738] hover:border-[#334155] transition-all group">
                                        <div className="flex items-center gap-4">
                                            <PlayerAvatar name={reg.name} logo={reg.logo} className="w-10 h-10 text-xs" />
                                            <div>
                                                <p className="font-black text-[#F8FAFC] tracking-wide text-sm">{reg.name}</p>
                                                <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">{reg.team}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {reg.status !== 'approved' ? (
                                                <button onClick={() => handleApproveReg(reg.id)} className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white transition-all border border-emerald-500/20" title="Approve">
                                                    <CheckCircle2 className="w-4 h-4" />
                                                </button>
                                            ) : (
                                                <span className="text-[9px] font-black text-emerald-400 px-2 py-1 bg-emerald-500/10 rounded border border-emerald-500/20 uppercase tracking-widest mr-1">Approved</span>
                                            )}
                                            <button onClick={() => handleDeleteReg(reg.id)} className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white transition-all border border-rose-500/20" title="Delete">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="bg-[#131722] border border-[#222B3D] rounded-2xl p-8 shadow-xl">
                        <h3 className="text-xl font-black flex items-center gap-3 text-[#E2E8F0] uppercase tracking-wider">
                            <div className="p-2 rounded-xl bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">
                                <Users className="w-5 h-5" />
                            </div>
                            Tournament Roster
                        </h3>
                        <button onClick={handleSavePlayers} disabled={isSavedPlayers}
                            className={`px-6 py-3 rounded-xl text-sm font-black tracking-widest uppercase transition-all flex items-center gap-2 ${isSavedPlayers ? 'bg-emerald-600 text-white/90' : 'bg-[#10B981] hover:bg-[#059669] text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]'}`}>
                            <CheckCircle2 className="w-4 h-4" /> {isSavedPlayers ? 'Roster Saved!' : 'Save Roster'}
                        </button>
                    </div>
                    <div className="bg-[#131722] border border-[#222B3D] rounded-2xl p-8 shadow-xl mt-6">
                        <div className="grid md:grid-cols-3 gap-6">
                            {['A', 'B', 'C'].map(grp => (
                                <div key={grp} className="bg-[#0a0b10] p-5 rounded-2xl border border-[#1E2738] shadow-inner">
                                    <h4 className="font-black text-center text-[#64748B] mb-5 uppercase tracking-[0.2em]">Group {grp}</h4>
                                    <div className="space-y-3">
                                        {players.filter(p => p.group === grp).map(p => (
                                            <div key={p.id} className="group flex items-center gap-3 bg-[#131722] p-2 rounded-lg border border-[#222B3D] hover:border-[#334155] transition-all">
                                                <PlayerAvatar name={p.name} logo={p.logo} className="w-8 h-8 text-[10px]" />
                                                <input value={p.name} onChange={e => handlePlayerChange(p.id, e.target.value)}
                                                    className="flex-1 bg-transparent border-none text-[#E2E8F0] px-2 py-1 text-sm focus:outline-none font-bold placeholder-[#475569]"
                                                    placeholder={`Player ${p.id}`} />
                                                <button onClick={() => handleClearPlayer(p.id)} className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-rose-500/10 text-rose-400 rounded transition-all" title="Clear Slot">
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ===== SEASON TOOLS TAB ===== */}
            {activeTab === 'season' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                    {/* Group Draw */}
                    <div className="bg-[#131722] border border-[#10B981]/20 rounded-2xl p-8 shadow-[0_0_30px_rgba(16,185,129,0.05)] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-[#10B981] opacity-[0.03] rounded-full blur-[50px] pointer-events-none"></div>
                        <h3 className="text-xl font-black mb-4 flex items-center gap-3 text-[#10B981] uppercase tracking-wider relative z-10">
                            <div className="p-2 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20">
                                <Shuffle className="w-5 h-5" />
                            </div>
                            Group Draw
                        </h3>
                        <p className="text-[#94A3B8] font-medium leading-relaxed mb-4 relative z-10">
                            Randomly assign <strong className="text-white">12 approved</strong> registrations into Groups A, B, C. This also resets all match scores.
                        </p>
                        <div className="flex items-center gap-3 mb-6 relative z-10">
                            <div className={`px-3 py-1.5 rounded-full text-xs font-black tracking-widest uppercase ${approvedPlayers.length >= 12 ? 'bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20' : 'bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20'}`}>
                                {approvedPlayers.length} / 12 Approved
                            </div>
                        </div>
                        <button onClick={handleDrawGroups} disabled={approvedPlayers.length < 12}
                            className={`w-full py-4 rounded-xl font-black uppercase tracking-widest border transition-all flex items-center justify-center gap-3 relative z-10 ${approvedPlayers.length >= 12 ? 'bg-[#10B981]/10 hover:bg-[#10B981] text-[#10B981] hover:text-white border-[#10B981]/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]' : 'bg-[#1E2738] text-[#475569] border-[#222B3D] cursor-not-allowed'}`}>
                            <Shuffle className="w-5 h-5" /> Draw Groups Randomly
                        </button>
                    </div>
                </div>
            )}

            {/* ===== DANGER TAB ===== */}
            {activeTab === 'danger' && (
                <div className="bg-[#131722] border border-[#EF4444]/20 rounded-2xl p-8 shadow-[0_0_30px_rgba(239,68,68,0.05)] relative overflow-hidden animate-in fade-in duration-300">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#EF4444] opacity-[0.03] rounded-full blur-[60px] pointer-events-none"></div>
                    <h3 className="text-2xl font-black mb-6 flex items-center gap-3 text-[#EF4444] uppercase tracking-wider relative z-10">
                        <div className="p-2 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/20">
                            <Flame className="w-6 h-6" />
                        </div>
                        Danger Zone
                    </h3>
                    <div className="bg-[#EF4444]/5 border border-[#EF4444]/10 rounded-xl p-6 mb-8 relative z-10">
                        <p className="text-[#94A3B8] font-medium leading-relaxed">
                            Resetting the tournament will <strong className="text-[#EF4444]">permanently wipe</strong> the active season&apos;s scores, matches, bracket, and roster.
                            Archived seasons in history are kept safe. <strong className="text-white">This cannot be undone.</strong>
                        </p>
                    </div>
                    <button onClick={handleReset} className="w-full py-4 bg-[#EF4444]/10 hover:bg-[#EF4444] text-[#EF4444] hover:text-white rounded-xl font-black uppercase tracking-widest border border-[#EF4444]/30 transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(239,68,68,0.1)] hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] relative z-10 text-lg">
                        <RefreshCw className="w-5 h-5" /> Factory Reset Season
                    </button>
                </div>
            )}
        </div>
    );
}
