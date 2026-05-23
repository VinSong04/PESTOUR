import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Search, CheckCircle2, Trash2, Edit3, Save, X, ChevronDown } from 'lucide-react';
import PlayerAvatar from '../ui/PlayerAvatar';

export default function AdminPlayersTab({ players, setPlayers, onSave, isSaved }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [editingPlayer, setEditingPlayer] = useState(null);
    const [editForm, setEditForm] = useState({ name: '', logo: '', group: '' });

    const groups = useMemo(() => {
        const grpKeys = [...new Set(players.map(p => p.group))].filter(Boolean).sort();
        return grpKeys.map(g => ({ name: g, members: players.filter(p => p.group === g) }));
    }, [players]);

    const filteredGroups = useMemo(() => {
        if (!searchQuery.trim()) return groups;
        const q = searchQuery.toLowerCase();
        return groups.map(g => ({
            ...g,
            members: g.members.filter(p =>
                (p.name && p.name.toLowerCase().includes(q)) ||
                (p.logo && p.logo.toLowerCase().includes(q)) ||
                p.id.toLowerCase().includes(q)
            )
        })).filter(g => g.members.length > 0);
    }, [groups, searchQuery]);

    const startEdit = (p) => {
        setEditingPlayer(p.id);
        setEditForm({ name: p.name || '', logo: p.logo || '', group: p.group || '' });
    };

    const saveEdit = (id) => {
        setPlayers(players.map(p => p.id === id ? { ...p, name: editForm.name, logo: editForm.logo, group: editForm.group } : p));
        setEditingPlayer(null);
    };

    const clearPlayer = (id) => {
        setPlayers(players.map(p => p.id === id ? { ...p, name: '', logo: '' } : p));
    };

    const groupColors = ['blue', 'purple', 'amber', 'emerald', 'rose', 'cyan'];
    const colorClasses = {
        blue: { header: 'from-blue-500/15 to-blue-500/5 border-blue-500/20 text-blue-400', badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
        purple: { header: 'from-purple-500/15 to-purple-500/5 border-purple-500/20 text-purple-400', badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
        amber: { header: 'from-amber-500/15 to-amber-500/5 border-amber-500/20 text-amber-400', badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
        emerald: { header: 'from-emerald-500/15 to-emerald-500/5 border-emerald-500/20 text-emerald-400', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
        rose: { header: 'from-rose-500/15 to-rose-500/5 border-rose-500/20 text-rose-400', badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20' },
        cyan: { header: 'from-cyan-500/15 to-cyan-500/5 border-cyan-500/20 text-cyan-400', badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <Users className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">Player Management</h3>
                        <p className="text-xs text-slate-500">{players.filter(p => p.name).length} active players</p>
                    </div>
                </div>
                <motion.button
                    whileHover={!isSaved ? { scale: 1.02 } : {}} whileTap={!isSaved ? { scale: 0.98 } : {}}
                    onClick={onSave} disabled={isSaved}
                    className={`px-6 py-3 rounded-xl text-sm font-bold tracking-wide transition-all flex items-center gap-2 ${isSaved ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white'}`}>
                    <CheckCircle2 className="w-4 h-4" /> {isSaved ? 'Saved!' : 'Save All'}
                </motion.button>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                    type="text" placeholder="Search players by name, team, or ID..."
                    value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-900/60 border border-white/[0.06] text-white rounded-xl pl-11 pr-4 py-3 focus:border-emerald-500/40 outline-none text-sm font-medium"
                />
            </div>

            {/* Groups */}
            {filteredGroups.map((groupData, idx) => {
                const color = groupColors[idx % groupColors.length];
                const cc = colorClasses[color];

                return (
                    <div key={groupData.name} className="bg-slate-900/60 border border-white/[0.06] rounded-2xl overflow-hidden">
                        <div className={`bg-gradient-to-r ${cc.header} border-b px-5 py-3 flex items-center justify-between`}>
                            <h4 className="font-bold text-base tracking-wide uppercase">Group {groupData.name}</h4>
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${cc.badge} uppercase tracking-widest`}>
                                {groupData.members.filter(p => p.name).length}/{groupData.members.length}
                            </span>
                        </div>
                        <div className="divide-y divide-white/[0.04]">
                            {groupData.members.map(p => (
                                <div key={p.id} className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.02] transition-colors group">
                                    {editingPlayer === p.id ? (
                                        /* Edit Mode */
                                        <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                                            <PlayerAvatar name={editForm.name} logo={editForm.logo} className="w-10 h-10 text-[10px] rounded-xl shrink-0" />
                                            <input value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})}
                                                placeholder="Player name"
                                                className="flex-1 bg-slate-950/50 border border-white/10 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500/40" />
                                            <input value={editForm.logo} onChange={e => setEditForm({...editForm, logo: e.target.value})}
                                                placeholder="Team / Country code"
                                                className="w-full sm:w-40 bg-slate-950/50 border border-white/10 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500/40" />
                                            <div className="flex gap-2 shrink-0">
                                                <button onClick={() => saveEdit(p.id)} className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg hover:bg-emerald-500/20 transition-colors border border-emerald-500/20">
                                                    <Save className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => setEditingPlayer(null)} className="p-2 bg-slate-800 text-slate-400 rounded-lg hover:bg-slate-700 transition-colors">
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        /* View Mode */
                                        <>
                                            <span className="text-[10px] font-bold text-slate-600 w-6 text-center tracking-wider">{p.id}</span>
                                            <PlayerAvatar name={p.name} logo={p.logo} className="w-10 h-10 text-[10px] rounded-xl" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-bold text-white truncate">{p.name || <span className="text-slate-600 italic">Empty slot</span>}</p>
                                                {p.logo && <p className="text-[10px] text-slate-500 font-medium truncate">{p.logo}</p>}
                                            </div>
                                            <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                                <button onClick={() => startEdit(p)} className="p-2 hover:bg-blue-500/10 text-blue-400/60 hover:text-blue-400 rounded-lg transition-all" title="Edit">
                                                    <Edit3 className="w-3.5 h-3.5" />
                                                </button>
                                                <button onClick={() => clearPlayer(p.id)} className="p-2 hover:bg-rose-500/10 text-rose-400/60 hover:text-rose-400 rounded-lg transition-all" title="Clear">
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </motion.div>
    );
}
