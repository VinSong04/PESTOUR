import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Search, CheckCircle2, Edit3, Save, X, Filter } from 'lucide-react';
import PlayerAvatar from '../ui/PlayerAvatar';

function getPlayerName(id, players) {
    const p = players.find(pl => pl.id === id);
    return p ? p.name || id : id;
}

function getPlayerLogo(id, players) {
    const p = players.find(pl => pl.id === id);
    return p ? p.logo : '';
}

export default function AdminMatchesTab({ data, updateData }) {
    const { matches, players, bracket } = data;
    const [searchQuery, setSearchQuery] = useState('');
    const [groupFilter, setGroupFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [editingMatch, setEditingMatch] = useState(null);
    const [editScores, setEditScores] = useState(null);

    const groups = useMemo(() => [...new Set(matches.map(m => m.groupId))].filter(Boolean).sort(), [matches]);

    const filtered = useMemo(() => {
        return matches.filter(m => {
            if (groupFilter !== 'all' && m.groupId !== groupFilter) return false;
            if (statusFilter === 'played' && !m.played) return false;
            if (statusFilter === 'upcoming' && m.played) return false;
            if (searchQuery.trim()) {
                const q = searchQuery.toLowerCase();
                const p1 = getPlayerName(m.p1Id, players).toLowerCase();
                const p2 = getPlayerName(m.p2Id, players).toLowerCase();
                if (!p1.includes(q) && !p2.includes(q) && !m.id.toLowerCase().includes(q)) return false;
            }
            return true;
        });
    }, [matches, groupFilter, statusFilter, searchQuery, players]);

    const startEdit = (m) => {
        setEditingMatch(m.id);
        setEditScores({
            g1: { p1: m.g1?.p1 ?? '', p2: m.g1?.p2 ?? '' },
            g2: { p1: m.g2?.p1 ?? '', p2: m.g2?.p2 ?? '' },
            g3: { p1: m.g3?.p1 ?? '', p2: m.g3?.p2 ?? '' },
            played: m.played,
        });
    };

    const saveMatch = (matchId) => {
        const toNum = v => (v === '' || v === null || v === undefined) ? null : Number(v);
        const newMatches = matches.map(m => {
            if (m.id !== matchId) return m;
            return {
                ...m,
                g1: { p1: toNum(editScores.g1.p1), p2: toNum(editScores.g1.p2) },
                g2: { p1: toNum(editScores.g2.p1), p2: toNum(editScores.g2.p2) },
                g3: { p1: toNum(editScores.g3.p1), p2: toNum(editScores.g3.p2) },
                played: editScores.played,
            };
        });
        updateData({ ...data, matches: newMatches });
        setEditingMatch(null);
    };

    const togglePlayed = (matchId) => {
        const newMatches = matches.map(m => m.id === matchId ? { ...m, played: !m.played } : m);
        updateData({ ...data, matches: newMatches });
    };

    const ScoreInput = ({ value, onChange }) => (
        <input type="number" value={value ?? ''} onChange={e => onChange(e.target.value)}
            className="w-10 h-8 bg-slate-950 border border-white/10 rounded-lg text-center text-white text-sm font-bold focus:outline-none focus:border-purple-500/40 hide-arrows" />
    );

    const getMatchScore = (m) => {
        if (!m.played) return null;
        let p1w = 0, p2w = 0;
        [m.g1, m.g2, m.g3].forEach(g => {
            if (g?.p1 != null && g?.p2 != null) {
                if (g.p1 > g.p2) p1w++;
                else if (g.p2 > g.p1) p2w++;
            }
        });
        return { p1w, p2w };
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <Gamepad2 className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white">Match Management</h3>
                    <p className="text-xs text-slate-500">{matches.filter(m => m.played).length}/{matches.length} played</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input type="text" placeholder="Search matches..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-900/60 border border-white/[0.06] text-white rounded-xl pl-10 pr-4 py-2.5 text-sm focus:border-purple-500/40 outline-none" />
                </div>
                <div className="flex gap-2 overflow-x-auto no-scrollbar shrink-0">
                    <select value={groupFilter} onChange={e => setGroupFilter(e.target.value)}
                        className="bg-slate-900/60 border border-white/[0.06] text-white rounded-xl px-3 py-2.5 text-sm font-medium outline-none">
                        <option value="all">All Groups</option>
                        {groups.map(g => <option key={g} value={g}>Group {g}</option>)}
                    </select>
                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                        className="bg-slate-900/60 border border-white/[0.06] text-white rounded-xl px-3 py-2.5 text-sm font-medium outline-none">
                        <option value="all">All Status</option>
                        <option value="played">Played</option>
                        <option value="upcoming">Upcoming</option>
                    </select>
                </div>
            </div>

            {/* Match List */}
            <div className="space-y-2">
                {filtered.length === 0 ? (
                    <div className="py-16 text-center bg-slate-900/40 rounded-2xl border border-white/[0.04]">
                        <Gamepad2 className="w-10 h-10 text-slate-700 mx-auto mb-3" />
                        <p className="text-slate-500 text-sm font-bold">No matches found</p>
                    </div>
                ) : filtered.map(m => {
                    const p1Name = getPlayerName(m.p1Id, players);
                    const p2Name = getPlayerName(m.p2Id, players);
                    const score = getMatchScore(m);
                    const isEditing = editingMatch === m.id;

                    return (
                        <div key={m.id} className={`bg-slate-900/60 border rounded-xl px-4 py-3 transition-all ${isEditing ? 'border-purple-500/30 bg-purple-500/[0.03]' : 'border-white/[0.06] hover:border-white/[0.1]'}`}>
                            {isEditing ? (
                                /* Edit Mode */
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">{m.id} • Group {m.groupId}{m.schedule ? ` • ${m.schedule}` : ''}</span>
                                        <div className="flex gap-2">
                                            <button onClick={() => saveMatch(m.id)} className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg hover:bg-emerald-500/20 border border-emerald-500/20">
                                                <Save className="w-3.5 h-3.5" />
                                            </button>
                                            <button onClick={() => setEditingMatch(null)} className="p-1.5 bg-slate-800 text-slate-400 rounded-lg hover:bg-slate-700">
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between gap-3">
                                        <span className="text-sm font-bold text-white truncate flex-1">{p1Name}</span>
                                        <span className="text-[10px] text-slate-500 font-bold">VS</span>
                                        <span className="text-sm font-bold text-white truncate flex-1 text-right">{p2Name}</span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-3">
                                        {['g1', 'g2', 'g3'].map((g, i) => (
                                            <div key={g} className="bg-slate-950/50 rounded-lg p-2">
                                                <p className="text-[9px] font-bold text-slate-600 text-center mb-1.5 uppercase tracking-widest">Game {i + 1}</p>
                                                <div className="flex items-center justify-center gap-2">
                                                    <ScoreInput value={editScores[g].p1} onChange={v => setEditScores({...editScores, [g]: {...editScores[g], p1: v}})} />
                                                    <span className="text-slate-600 text-xs">:</span>
                                                    <ScoreInput value={editScores[g].p2} onChange={v => setEditScores({...editScores, [g]: {...editScores[g], p2: v}})} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" checked={editScores.played} onChange={e => setEditScores({...editScores, played: e.target.checked})}
                                            className="w-4 h-4 rounded bg-slate-800 border-white/10 text-purple-500 focus:ring-purple-500/30" />
                                        <span className="text-xs font-bold text-slate-400">Mark as played</span>
                                    </label>
                                </div>
                            ) : (
                                /* View Mode */
                                <div className="flex items-center gap-3">
                                    <span className="text-[9px] font-bold text-slate-600 w-12 shrink-0 tracking-wider uppercase">{m.id}</span>
                                    {m.schedule && (
                                        <span className="text-[9px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/10 uppercase tracking-wider shrink-0">{m.schedule}</span>
                                    )}
                                    <div className="flex-1 flex items-center gap-2 min-w-0">
                                        <PlayerAvatar name={p1Name} logo={getPlayerLogo(m.p1Id, players)} className="w-7 h-7 text-[8px] rounded-lg" />
                                        <span className="text-sm font-bold text-white truncate">{p1Name}</span>
                                    </div>
                                    <div className="shrink-0 text-center min-w-[60px]">
                                        {m.played && score ? (
                                            <span className="text-sm font-black text-white">{score.p1w} - {score.p2w}</span>
                                        ) : (
                                            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">vs</span>
                                        )}
                                    </div>
                                    <div className="flex-1 flex items-center gap-2 justify-end min-w-0">
                                        <span className="text-sm font-bold text-white truncate text-right">{p2Name}</span>
                                        <PlayerAvatar name={p2Name} logo={getPlayerLogo(m.p2Id, players)} className="w-7 h-7 text-[8px] rounded-lg" />
                                    </div>
                                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                                        <button onClick={() => togglePlayed(m.id)} title={m.played ? 'Mark upcoming' : 'Mark played'}
                                            className={`p-1.5 rounded-lg transition-all ${m.played ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800/50 text-slate-600 border border-white/[0.06] hover:text-slate-400'}`}>
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                        </button>
                                        <button onClick={() => startEdit(m)} className="p-1.5 bg-slate-800/50 text-slate-500 hover:text-purple-400 rounded-lg border border-white/[0.06] hover:border-purple-500/20 transition-all" title="Edit scores">
                                            <Edit3 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
}
