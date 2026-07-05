import { useState, useMemo, useCallback } from 'react';
import { Trophy, Zap, Trash2, CheckCircle2, CircleDashed, Crown, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateStandings, processBracket, getBracketMatchWinner, getSeriesResult } from '../../utils/logic';
import GameScoreRow from '../ui/GameScoreRow';
import PlayerAvatar from '../ui/PlayerAvatar';

export default function AdminKnockoutTab({ data, updateData }) {
    const [toast, setToast] = useState(null);

    const standingsData = useMemo(
        () => calculateStandings(data.players || [], data.matches || []),
        [data.players, data.matches]
    );

    const bracket = useMemo(
        () => data.bracket && data.bracket.length > 0 ? processBracket(data.bracket) : [],
        [data.bracket]
    );

    const showToast = (msg, type = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    // Bracket generation is now handled via the public Knockout page using the Spin Wheel.

    const handleClearBracket = () => {
        if (!window.confirm('Clear the entire knockout bracket? This cannot be undone.')) return;
        updateData({ ...data, bracket: [] });
        showToast('Bracket cleared.');
    };

    const handleScoreChange = useCallback((matchId, gameIndex, playerKey, val) => {
        const numVal = val === '' ? null : parseInt(val, 10);
        let newBracket = (data.bracket || []).map(m => {
            if (m.id === matchId) return { ...m, [gameIndex]: { ...m[gameIndex], [playerKey]: numVal } };
            return m;
        });
        newBracket = processBracket(newBracket);
        updateData({ ...data, bracket: newBracket });
    }, [data, updateData]);

    const togglePlayed = useCallback((matchId) => {
        let newBracket = (data.bracket || []).map(m => {
            if (m.id === matchId) return { ...m, played: !m.played };
            return m;
        });
        newBracket = processBracket(newBracket);
        updateData({ ...data, bracket: newBracket });
    }, [data, updateData]);

    // Check if enough qualified players
    const qualifiedCount = standingsData.qualified?.length || 0;
    const hasEnoughPlayers = qualifiedCount >= 8;

    // Find the champion
    const finalMatch = bracket.find(m => m.id === 'F-1');
    const champion = finalMatch ? getBracketMatchWinner(finalMatch) : null;

    // Round labels
    const roundOrder = ['PO', 'QF', 'SF', 'F'];
    const roundLabels = { PO: 'Playoffs', QF: 'Quarterfinals', SF: 'Semifinals', F: 'Grand Final' };
    const roundColors = {
        PO: { bg: 'bg-teal-500/8', border: 'border-teal-500/15', text: 'text-teal-400', accent: 'from-teal-500 to-emerald-500' },
        QF: { bg: 'bg-purple-500/8', border: 'border-purple-500/15', text: 'text-purple-400', accent: 'from-purple-500 to-indigo-500' },
        SF: { bg: 'bg-amber-500/8', border: 'border-amber-500/15', text: 'text-amber-400', accent: 'from-amber-500 to-orange-500' },
        F:  { bg: 'bg-yellow-500/8', border: 'border-yellow-500/15', text: 'text-yellow-400', accent: 'from-yellow-400 to-amber-500' },
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
        >
            {/* Toast */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl font-bold text-sm tracking-wider uppercase shadow-2xl border ${
                            toast.type === 'error'
                                ? 'bg-rose-500/20 border-rose-500/30 text-rose-300'
                                : 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300'
                        }`}
                    >
                        {toast.msg}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div className="glass-card p-5 sm:p-6 rounded-2xl relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-xl font-outfit font-bold flex items-center gap-3 text-white tracking-wide uppercase">
                            <div className="p-2.5 bg-amber-500/8 rounded-xl border border-amber-500/10">
                                <Trophy className="text-amber-400 w-5 h-5" />
                            </div>
                            Knockout Management
                        </h2>
                        <p className="text-xs font-medium text-slate-500 mt-1.5 ml-1">
                            {bracket.length > 0
                                ? `${bracket.filter(m => m.played).length}/${bracket.length} matches completed`
                                : 'Bracket empty. Go to the public Knockout page to spin the draw!'
                            }
                        </p>
                    </div>

                    <div className="flex gap-2.5 w-full md:w-auto">
                        {bracket.length > 0 && (
                            <button
                                onClick={handleClearBracket}
                                className="flex-1 md:flex-none px-4 py-2.5 bg-white/[0.03] hover:bg-rose-500/8 text-rose-400 rounded-xl text-[11px] font-semibold tracking-wider uppercase border border-white/[0.04] hover:border-rose-500/15 transition-all flex items-center justify-center gap-2"
                            >
                                <Trash2 className="w-3.5 h-3.5" /> Clear
                            </button>
                        )}
                        {bracket.length === 0 && (
                            <div className="flex-1 md:flex-none px-5 py-2.5 bg-amber-500/10 text-amber-400 rounded-xl text-[11px] font-bold tracking-wider uppercase border border-amber-500/20 flex items-center justify-center gap-2">
                                <Sparkles className="w-3.5 h-3.5" /> Use Public Page to Draw
                            </div>
                        )}
                    </div>
                </div>

                {!hasEnoughPlayers && (
                    <div className="mt-4 px-4 py-3 bg-amber-500/[0.06] border border-amber-500/10 rounded-xl text-amber-300/70 text-xs font-medium relative z-10">
                        ⚠️ Need at least 8 qualified players. Currently: {qualifiedCount}. Complete more group stage matches first.
                    </div>
                )}
            </div>

            {/* Champion Banner */}
            <AnimatePresence>
                {champion && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card rounded-2xl overflow-hidden relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-amber-500/10 pointer-events-none" />
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
                        <div className="p-8 flex flex-col items-center gap-5 relative z-10">
                            <motion.div
                                animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                            >
                                <Trophy className="w-16 h-16 text-amber-400 drop-shadow-[0_0_20px_rgba(251,191,36,0.4)]" />
                            </motion.div>
                            <div className="text-center">
                                <p className="text-[10px] font-bold text-amber-400/60 tracking-[0.3em] uppercase mb-2">🏆 Tournament Champion</p>
                                <div className="flex items-center gap-4">
                                    <PlayerAvatar name={champion.name} logo={champion.logo} className="w-14 h-14 text-lg rounded-xl border-2 border-amber-400/30 shadow-[0_0_20px_rgba(251,191,36,0.2)]" />
                                    <h3 className="text-3xl font-outfit font-black text-white tracking-wider uppercase">{champion.name}</h3>
                                </div>
                            </div>
                            <Sparkles className="w-5 h-5 text-amber-400/40 absolute top-4 right-6" />
                            <Sparkles className="w-4 h-4 text-amber-400/30 absolute bottom-6 left-8" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bracket Matches by Round */}
            {bracket.length > 0 && (
                <div className="space-y-6">
                    {roundOrder.map(round => {
                        const roundMatches = bracket.filter(m => m.round === round || m.id.startsWith(round === 'F' ? 'F-' : `${round}-`));
                        if (roundMatches.length === 0) return null;
                        const colors = roundColors[round];

                        return (
                            <div key={round} className="glass-card rounded-2xl overflow-hidden">
                                {/* Round header */}
                                <div className={`px-5 py-3.5 border-b border-white/[0.04] flex items-center gap-3 ${colors.bg}`}>
                                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${colors.accent}`} />
                                    <h3 className={`font-outfit font-bold text-sm tracking-wider uppercase ${colors.text}`}>
                                        {roundLabels[round]}
                                    </h3>
                                    <span className="text-[10px] text-slate-600 font-semibold ml-auto tracking-wider uppercase">
                                        {roundMatches.filter(m => m.played).length}/{roundMatches.length} done
                                    </span>
                                </div>

                                {/* Match cards */}
                                <div className="divide-y divide-white/[0.03]">
                                    {roundMatches.map(match => {
                                        const isTbd = match.p1Id === null || match.p2Id === null;
                                        const res = getSeriesResult(match);
                                        const g1 = match.g1 || {};
                                        const g2 = match.g2 || {};
                                        const g3 = match.g3 || {};
                                        const g1Played = g1.p1 !== undefined && g1.p1 !== null && g1.p2 !== undefined && g1.p2 !== null;
                                        const g2Played = g2.p1 !== undefined && g2.p1 !== null && g2.p2 !== undefined && g2.p2 !== null;
                                        let needG3 = false;
                                        if (g1Played && g2Played) {
                                            let t1 = (g1.p1 > g1.p2 ? 1 : 0) + (g2.p1 > g2.p2 ? 1 : 0);
                                            let t2 = (g1.p2 > g1.p1 ? 1 : 0) + (g2.p2 > g2.p1 ? 1 : 0);
                                            if (t1 === 1 && t2 === 1) needG3 = true;
                                        }

                                        return (
                                            <div key={match.id} className={`p-5 ${isTbd ? 'opacity-40' : 'hover:bg-white/[0.01]'} transition-colors`}>
                                                {/* Match header */}
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-[9px] font-bold text-slate-600 bg-white/[0.03] px-2.5 py-1 rounded-md tracking-widest uppercase border border-white/[0.04]">{match.id}</span>
                                                        {match.played && (
                                                            <span className="text-[8px] text-emerald-400/70 font-bold tracking-wider uppercase flex items-center gap-1">
                                                                <CheckCircle2 className="w-3 h-3" /> Completed
                                                            </span>
                                                        )}
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        {/* Series score */}
                                                        <div className="flex items-center gap-2 bg-white/[0.03] px-3 py-1.5 rounded-lg border border-white/[0.04]">
                                                            <span className={`text-lg font-outfit font-bold ${res.p1Wins > res.p2Wins ? 'text-cyan-400' : 'text-white/40'}`}>{res.p1Wins}</span>
                                                            <span className="text-slate-800 font-bold text-sm">:</span>
                                                            <span className={`text-lg font-outfit font-bold ${res.p2Wins > res.p1Wins ? 'text-purple-400' : 'text-white/40'}`}>{res.p2Wins}</span>
                                                        </div>

                                                        {/* Toggle played */}
                                                        {!isTbd && (
                                                            <button
                                                                onClick={() => togglePlayed(match.id)}
                                                                className={`p-2 rounded-lg border transition-all ${match.played
                                                                    ? 'bg-emerald-500/8 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/15'
                                                                    : 'bg-white/[0.03] border-white/[0.06] text-slate-500 hover:text-white'
                                                                }`}
                                                            >
                                                                {match.played ? <CheckCircle2 className="w-4 h-4" /> : <CircleDashed className="w-4 h-4" />}
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Players */}
                                                <div className="flex justify-between items-center px-1 mb-4">
                                                    <div className="flex items-center gap-3 w-[42%] min-w-0">
                                                        <PlayerAvatar name={match.p1Name} logo={match.p1Logo} className={`w-10 h-10 text-[10px] rounded-lg border ${res.p1Wins > res.p2Wins ? 'border-cyan-400/25' : 'border-white/[0.04]'}`} />
                                                        <div className="flex flex-col min-w-0">
                                                            <span className={`font-outfit font-bold text-sm truncate ${res.p1Wins > res.p2Wins ? 'text-white' : 'text-slate-400'}`}>{match.p1Name || 'TBD'}</span>
                                                            {res.p1Wins > res.p2Wins && match.played && <span className="text-[7px] font-bold text-amber-400/60 tracking-wider">WINNER</span>}
                                                        </div>
                                                    </div>
                                                    <span className="text-[9px] font-bold text-slate-700 tracking-[0.2em] uppercase">VS</span>
                                                    <div className="flex items-center justify-end gap-3 w-[42%] text-right min-w-0">
                                                        <div className="flex flex-col items-end min-w-0">
                                                            <span className={`font-outfit font-bold text-sm truncate ${res.p2Wins > res.p1Wins ? 'text-white' : 'text-slate-400'}`}>{match.p2Name || 'TBD'}</span>
                                                            {res.p2Wins > res.p1Wins && match.played && <span className="text-[7px] font-bold text-amber-400/60 tracking-wider">WINNER</span>}
                                                        </div>
                                                        <PlayerAvatar name={match.p2Name} logo={match.p2Logo} className={`w-10 h-10 text-[10px] rounded-lg border ${res.p2Wins > res.p1Wins ? 'border-purple-400/25' : 'border-white/[0.04]'}`} />
                                                    </div>
                                                </div>

                                                {/* Game scores (editable) */}
                                                {!isTbd && (
                                                    <div className="space-y-1.5 pt-3 border-t border-white/[0.03]">
                                                        <GameScoreRow game="g1" label="G1" match={match} p1Name="" p2Name="" onChange={handleScoreChange} isAdmin={true} />
                                                        <GameScoreRow game="g2" label="G2" match={match} p1Name="" p2Name="" onChange={handleScoreChange} isAdmin={true} />
                                                        {(needG3 || (g3.p1 !== undefined && g3.p1 !== null)) && (
                                                            <GameScoreRow game="g3" label="G3" match={match} p1Name="" p2Name="" onChange={handleScoreChange} isAdmin={true} />
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Empty state */}
            {bracket.length === 0 && (
                <div className="glass-card rounded-2xl p-12 flex flex-col items-center justify-center text-center">
                    <div className="p-5 rounded-2xl bg-white/[0.02] mb-5 border border-white/[0.04]">
                        <Trophy className="w-10 h-10 text-slate-600" />
                    </div>
                    <p className="font-outfit font-bold text-lg text-slate-400">No bracket generated</p>
                    <p className="text-xs mt-2 text-slate-600 font-medium max-w-sm">
                        {hasEnoughPlayers
                            ? 'Click "Generate from Standings" to auto-seed the quarterfinals from group results.'
                            : 'Complete the group stage matches first to qualify 8 players.'
                        }
                    </p>
                </div>
            )}

            {/* Seedings Preview */}
            {bracket.length === 0 && hasEnoughPlayers && (
                <div className="glass-card rounded-2xl overflow-hidden">
                    <div className="px-5 py-3.5 border-b border-white/[0.04] bg-cyan-500/[0.04]">
                        <h3 className="font-outfit font-bold text-sm tracking-wider text-cyan-400 uppercase flex items-center gap-2">
                            <Crown className="w-4 h-4" /> Seeding Preview
                        </h3>
                    </div>
                    <div className="p-5 grid sm:grid-cols-2 gap-3">
                        {['A', 'B', 'C', 'D'].map(g => {
                            const group = standingsData.groups[g];
                            if (!group || group.length < 2) return null;
                            return (
                                <div key={g} className="bg-white/[0.02] rounded-xl p-4 border border-white/[0.04]">
                                    <p className="text-[9px] font-bold text-slate-600 tracking-[0.15em] uppercase mb-3">Group {g}</p>
                                    {[0, 1].map(i => (
                                        <div key={i} className="flex items-center gap-2.5 mb-2 last:mb-0">
                                            <span className={`text-[9px] font-bold ${i === 0 ? 'text-emerald-400' : 'text-cyan-400'} w-4`}>{i + 1}</span>
                                            <PlayerAvatar name={group[i].name} logo={group[i].logo} className="w-7 h-7 text-[8px] rounded-md" />
                                            <span className="text-sm font-semibold text-slate-300 truncate">{group[i].name}</span>
                                            <span className="text-[10px] text-slate-600 ml-auto font-mono">{group[i].pts}pts</span>
                                        </div>
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </motion.div>
    );
}
