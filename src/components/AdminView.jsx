import React, { useState, useEffect } from 'react';
import { ShieldCheck, LogOut, Settings, Flame, RefreshCw, Users, CheckCircle2, Lock } from 'lucide-react';
import { INITIAL_DATA } from '../utils/initialData';

export default function AdminView({ data, updateData, isAdmin, setIsAdmin }) {
    const [password, setPassword] = useState('');
    const [passError, setPassError] = useState(false);

    // Form states
    const [settings, setSettings] = useState(data.settings);
    const [players, setPlayers] = useState(data.players);

    // Reset to prop data on load
    useEffect(() => {
        setSettings(data.settings);
        setPlayers(data.players);
    }, [data]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'admin') {
            setIsAdmin(true);
            setPassError(false);
            setPassword('');
        } else {
            setPassError(true);
        }
    };

    const handleSaveSettings = () => {
        updateData({ ...data, settings });
    };

    const handlePlayerChange = (id, newName) => {
        setPlayers(players.map(p => p.id === id ? { ...p, name: newName } : p));
    };

    const handleSavePlayers = () => {
        updateData({ ...data, players });
    };

    const handleReset = () => {
        if (window.prompt("DANGER! This will delete all scores and reset to template. Type 'RESET' to confirm.") === "RESET") {
            updateData(INITIAL_DATA);
        }
    };

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
                    <div>
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#0a0b10] border border-[#1E2738] rounded-xl px-5 py-4 focus:outline-none focus:border-[#C084FC] focus:ring-1 focus:ring-[#C084FC] text-center text-lg text-white placeholder-[#475569] shadow-inner transition-colors font-mono"
                        />
                        {passError && <p className="text-[#EF4444] text-xs mt-3 text-center font-bold tracking-widest uppercase animate-pulse">Incorrect password</p>}
                    </div>
                    <button type="submit" className="w-full bg-gradient-to-r from-[#C084FC] to-[#9333EA] hover:from-[#A855F7] hover:to-[#7E22CE] text-white font-black tracking-widest uppercase py-4 rounded-xl shadow-[0_0_20px_rgba(192,132,252,0.3)] transition-all">
                        Unlock Dashboard
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#C084FC]/10 p-6 rounded-2xl border border-[#C084FC]/30 shadow-[0_0_30px_rgba(192,132,252,0.1)] relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-64 h-64 bg-[#C084FC] opacity-[0.05] rounded-full blur-[60px] pointer-events-none"></div>
                <div className="relative z-10">
                    <h2 className="text-3xl font-black flex items-center gap-3 text-[#E2E8F0] tracking-tight">
                        <ShieldCheck className="text-[#C084FC] w-8 h-8" /> Control Panel
                    </h2>
                    <p className="text-sm text-[#C084FC]/70 mt-1 font-bold tracking-wide">Live synchronization is ACTIVE.</p>
                </div>
                <div className="relative z-10">
                    <button onClick={() => setIsAdmin(false)} className="flex items-center gap-2 px-5 py-2.5 bg-[#0a0b10]/50 hover:bg-[#1E2738] border border-[#C084FC]/20 hover:border-[#C084FC]/50 text-[#C084FC] rounded-xl text-sm font-black tracking-widest uppercase transition-all shadow-md">
                        <LogOut className="w-4 h-4" /> Lock
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Settings Form */}
                <div className="bg-[#131722] border border-[#222B3D] rounded-2xl p-8 shadow-xl">
                    <h3 className="text-xl font-black mb-6 flex items-center gap-3 text-[#E2E8F0] uppercase tracking-wider">
                        <div className="p-2 rounded-xl bg-[#3B82F6]/10 text-[#60A5FA] border border-[#3B82F6]/20">
                            <Settings className="w-5 h-5" />
                        </div>
                        Tournament Info
                    </h3>
                    <div className="space-y-5">
                        <div>
                            <label className="block text-xs text-[#64748B] font-black mb-2 uppercase tracking-widest">Tournament Name</label>
                            <input
                                value={settings.name}
                                onChange={e => setSettings({ ...settings, name: e.target.value })}
                                className="w-full bg-[#0a0b10] border border-[#1E2738] text-[#E2E8F0] rounded-xl px-4 py-3 focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] outline-none shadow-inner transition-all font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-[#64748B] font-black mb-2 uppercase tracking-widest">Season</label>
                            <input
                                value={settings.season}
                                onChange={e => setSettings({ ...settings, season: e.target.value })}
                                className="w-full bg-[#0a0b10] border border-[#1E2738] text-[#E2E8F0] rounded-xl px-4 py-3 focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] outline-none shadow-inner transition-all font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-[#64748B] font-black mb-2 uppercase tracking-widest">Tagline</label>
                            <input
                                value={settings.tagline}
                                onChange={e => setSettings({ ...settings, tagline: e.target.value })}
                                className="w-full bg-[#0a0b10] border border-[#1E2738] text-[#E2E8F0] rounded-xl px-4 py-3 focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] outline-none shadow-inner transition-all font-medium"
                            />
                        </div>
                        <button onClick={handleSaveSettings} className="w-full mt-4 py-3.5 bg-[#3B82F6]/10 hover:bg-[#3B82F6]/20 text-[#60A5FA] rounded-xl font-black tracking-widest uppercase border border-[#3B82F6]/30 transition-colors">
                            Save Info Updates
                        </button>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-[#131722] border border-[#EF4444]/20 rounded-2xl p-8 shadow-[0_0_30px_rgba(239,68,68,0.05)] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#EF4444] opacity-[0.03] rounded-full blur-[50px] pointer-events-none"></div>
                    <h3 className="text-xl font-black mb-6 flex items-center gap-3 text-[#EF4444] uppercase tracking-wider relative z-10">
                        <div className="p-2 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/20">
                            <Flame className="w-5 h-5" />
                        </div>
                        Danger Zone
                    </h3>
                    <p className="text-[#94A3B8] font-medium leading-relaxed mb-8 relative z-10">Resetting the tournament will permanently delete all scores, match histories, and knockout bracket data across all clients. <strong className="text-white">This cannot be undone.</strong></p>
                    <button onClick={handleReset} className="w-full py-4 bg-[#EF4444]/10 hover:bg-[#EF4444] text-[#EF4444] hover:text-white rounded-xl font-black uppercase tracking-widest border border-[#EF4444]/30 transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(239,68,68,0.1)] hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] relative z-10">
                        <RefreshCw className="w-5 h-5" /> Factory Reset
                    </button>
                </div>
            </div>

            {/* Players List */}
            <div className="bg-[#131722] border border-[#222B3D] rounded-2xl p-8 shadow-xl">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <h3 className="text-xl font-black flex items-center gap-3 text-[#E2E8F0] uppercase tracking-wider">
                        <div className="p-2 rounded-xl bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">
                            <Users className="w-5 h-5" />
                        </div>
                        Player Roster
                    </h3>
                    <button onClick={handleSavePlayers} className="px-6 py-3 bg-[#10B981] hover:bg-[#059669] text-white rounded-xl text-sm font-black tracking-widest uppercase shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> Save Roster Updates
                    </button>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {['A', 'B', 'C'].map(grp => (
                        <div key={grp} className="bg-[#0a0b10] p-5 rounded-2xl border border-[#1E2738] shadow-inner">
                            <h4 className="font-black text-center text-[#64748B] mb-5 uppercase tracking-[0.2em]">Group {grp}</h4>
                            <div className="space-y-3">
                                {players.filter(p => p.group === grp).map(p => (
                                    <div key={p.id} className="flex items-center gap-3 bg-[#131722] p-2 rounded-lg border border-[#222B3D]">
                                        <span className="text-[10px] font-black tracking-wider text-[#64748B] bg-[#1E2738] px-2 py-1 rounded w-8 text-center">{p.id}</span>
                                        <input
                                            value={p.name}
                                            onChange={e => handlePlayerChange(p.id, e.target.value)}
                                            className="flex-1 bg-transparent border-none text-[#E2E8F0] px-2 py-1 text-sm focus:outline-none font-bold placeholder-[#475569]"
                                            placeholder={`Player ${p.id}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
