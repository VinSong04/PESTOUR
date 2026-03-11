import { useState, useMemo, useCallback } from 'react';
import { Gamepad2, CheckCircle2, CircleDashed, Info, ChevronDown, ChevronUp } from 'lucide-react';
import GameScoreRow from './GameScoreRow';
import PlayerAvatar from './PlayerAvatar';
import { getSeriesResult, processBracket } from '../utils/logic';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer as containerVariants, springItemScale as cardVariants } from '../constants/animations';

export default function MatchesView({ data, updateData, isAdmin }) {
    const [groupFilter, setGroupFilter] = useState('ALL');
    const [statusFilter, setStatusFilter] = useState('UPCOMING');
    const [expandedGames, setExpandedGames] = useState({});

    // Build player lookup maps once (O(1) lookup instead of O(n) per match)
    const playerMap = useMemo(() => {
        const nameMap = new Map();
        const logoMap = new Map();
        data.players.forEach(p => {
            nameMap.set(p.id, p.name || p.id);
            logoMap.set(p.id, p.logo || '');
        });
        return { nameMap, logoMap };
    }, [data.players]);

    const toggleGames = useCallback((matchId) => {
        setExpandedGames(prev => ({ ...prev, [matchId]: !prev[matchId] }));
    }, []);

    const bracketMatches = (data.bracket || []).filter(m => m.p1Id && m.p2Id);
    const allMatches = [...data.matches, ...bracketMatches];

    const filtered = (groupFilter === 'ALL'
        ? allMatches
        : groupFilter === 'KNOCKOUT'
            ? bracketMatches
            : data.matches.filter(m => m.groupId === groupFilter)
    ).filter(m => statusFilter === 'UPCOMING' ? !m.played : m.played);

    const handleScoreChange = (matchId, game, player, value) => {
        if (!isAdmin) return;
        const v = value === '' ? null : parseInt(value, 10);

        if (matchId.startsWith('QF') || matchId.startsWith('SF') || matchId.startsWith('F')) {
            let updated = (data.bracket || []).map(m =>
                m.id === matchId ? { ...m, [game]: { ...(m[game] || {}), [player]: v } } : m
            );
            updated = processBracket(updated);
            updateData({ ...data, bracket: updated });
        } else {
            const updated = data.matches.map(m =>
                m.id === matchId ? { ...m, [game]: { ...(m[game] || {}), [player]: v } } : m
            );
            updateData({ ...data, matches: updated });
        }
    };

    const togglePlayed = (matchId) => {
        if (!isAdmin) return;

        if (matchId.startsWith('QF') || matchId.startsWith('SF') || matchId.startsWith('F')) {
            let updated = (data.bracket || []).map(m =>
                m.id === matchId ? { ...m, played: !m.played } : m
            );
            updated = processBracket(updated);
            updateData({ ...data, bracket: updated });
        } else {
            const updated = data.matches.map(m =>
                m.id === matchId ? { ...m, played: !m.played } : m
            );
            updateData({ ...data, matches: updated });
        }
    };

    const getPlayerName = useCallback((playerId) => {
        return playerMap.nameMap.get(playerId) || playerId;
    }, [playerMap]);
    const getPlayerLogo = useCallback((playerId) => {
        return playerMap.logoMap.get(playerId) || '';
    }, [playerMap]);

    return (
        <motion.div
            className="space-y-8 w-full max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Header */}
            <motion.div variants={cardVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-[#0f141e]/80 backdrop-blur-xl p-6 rounded-[24px] border border-white/10 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-emerald-500/20 transition-all duration-700"></div>

                <h2 className="text-3xl font-outfit font-black flex items-center gap-4 text-white tracking-wider uppercase drop-shadow-md relative z-10">
                    <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                        <Gamepad2 className="text-emerald-400 w-8 h-8 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                    </div>
                    SCHEDULE
                </h2>
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto relative z-10">
                    {/* Status Filter */}
                    <div className="flex bg-slate-900/80 backdrop-blur-md p-1.5 rounded-2xl w-full sm:w-auto border border-white/5 shadow-inner">
                        <button
                            onClick={() => setStatusFilter('UPCOMING')}
                            className={`flex-1 sm:flex-none px-6 py-2.5 text-xs font-outfit tracking-[0.2em] uppercase font-black rounded-xl transition-all ${statusFilter === 'UPCOMING' ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'text-slate-400 hover:text-white'}`}
                        >Upcoming</button>
                        <button
                            onClick={() => setStatusFilter('PLAYED')}
                            className={`flex-1 sm:flex-none px-6 py-2.5 text-xs font-outfit tracking-[0.2em] uppercase font-black rounded-xl transition-all ${statusFilter === 'PLAYED' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'text-slate-400 hover:text-white'}`}
                        >Played</button>
                    </div>

                    {/* Group Filter */}
                    <div className="flex bg-slate-900/80 backdrop-blur-md p-1.5 rounded-2xl w-full sm:w-auto border border-white/5 shadow-inner overflow-x-auto no-scrollbar">
                        {['ALL', ...[...new Set(data.matches.map(m => m.groupId))].filter(Boolean).sort(), 'KNOCKOUT'].map(g => (
                            <button
                                key={g}
                                onClick={() => setGroupFilter(g)}
                                className={`flex-1 sm:flex-none px-5 py-2.5 text-xs font-outfit tracking-[0.1em] uppercase font-bold rounded-xl transition-all whitespace-nowrap ${groupFilter === g ? 'bg-white/10 text-white shadow-sm border border-white/10' : 'text-slate-400 hover:text-white'}`}
                            >
                                {g === 'ALL' ? 'ALL' : g === 'KNOCKOUT' ? 'KNOCKOUT' : `GR.${g}`}
                            </button>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Viewer Mode Banner */}
            {!isAdmin && (
                <motion.div variants={cardVariants} className="bg-blue-600/10 backdrop-blur-md border border-blue-500/20 text-blue-300 p-4 rounded-2xl text-sm font-bold flex items-center gap-3 shadow-[0_0_20px_rgba(37,99,235,0.15)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/20 blur-[50px]"></div>
                    <Info className="w-5 h-5 flex-shrink-0 relative z-10" />
                    <span className="relative z-10 font-outfit">You are in view-only spectator mode. Admin login is required to input live match scores.</span>
                </motion.div>
            )}

            {/* Match Cards */}
            <motion.div variants={containerVariants} className="flex flex-col gap-6 w-full relative z-10">
                <AnimatePresence mode="popLayout">
                    {filtered.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="py-24 text-center text-slate-500 bg-slate-900/50 backdrop-blur-md rounded-3xl border border-dashed border-white/10 flex flex-col items-center"
                        >
                            <Gamepad2 className="w-16 h-16 mb-6 opacity-20" />
                            <p className="font-outfit font-black tracking-wide text-xl text-slate-400">No {statusFilter.toLowerCase()} matches found.</p>
                            <p className="text-sm font-medium mt-2">Try changing your filters above.</p>
                        </motion.div>
                    ) : filtered.map((match, i) => {
                        const p1Name = getPlayerName(match.p1Id);
                        const p2Name = getPlayerName(match.p2Id);
                        const res = getSeriesResult(match);
                        const g1 = match.g1 || {};
                        const g2 = match.g2 || {};
                        const g3 = match.g3 || {};
                        const g1Played = g1.p1 !== undefined && g1.p1 !== null && g1.p2 !== undefined && g1.p2 !== null;
                        const g2Played = g2.p1 !== undefined && g2.p1 !== null && g2.p2 !== undefined && g2.p2 !== null;
                        let needG3 = false;
                        if (g1Played && g2Played) {
                            let tempP1W = (g1.p1 > g1.p2 ? 1 : 0) + (g2.p1 > g2.p2 ? 1 : 0);
                            let tempP2W = (g1.p2 > g1.p1 ? 1 : 0) + (g2.p2 > g2.p1 ? 1 : 0);
                            if (tempP1W === 1 && tempP2W === 1) needG3 = true;
                        }

                        const label = match.id.startsWith('QF') ? 'QUARTERFINAL'
                            : match.id.startsWith('SF') ? 'SEMIFINAL'
                                : match.id.startsWith('F') ? 'GRAND FINAL'
                                    : `GROUP ${match.groupId}`;

                        return (
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                                key={match.id}
                                className={`relative flex flex-col overflow-hidden w-full border backdrop-blur-xl transition-all duration-300 rounded-[28px] group ${match.played ? 'bg-slate-900/80 border-white/5 shadow-lg' : 'bg-slate-800/60 hover:bg-slate-800/80 border-white/10 hover:border-blue-500/30 shadow-xl'}`}
                            >
                                {/* Gradient Hover Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                                {/* Main Card */}
                                <div className="flex flex-col items-center w-full px-4 sm:px-8 py-8 relative z-10">
                                    {/* Match Header */}
                                    <div className="flex items-center gap-3 mb-8 w-full justify-center">
                                        <div className="px-4 py-1.5 rounded-full bg-slate-950/50 border border-white/5 backdrop-blur-md shadow-inner">
                                            <span className="text-[10px] sm:text-[11px] font-outfit font-black tracking-[0.25em] flex items-center gap-2 sm:gap-4 uppercase">
                                                <span className={`${match.played ? 'text-slate-400' : 'text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]'}`}>{label}</span>
                                                <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                                                <span className="text-slate-300">MATCH {match.id.replace(/\D/g, '') || match.id}</span>
                                                <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                                                <span className={`${match.played ? 'text-slate-400' : 'text-emerald-400'}`}>BO3</span>
                                                {match.played && (
                                                    <>
                                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                                                        <span className="text-emerald-500 flex items-center gap-1.5 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">
                                                            <CheckCircle2 className="w-3.5 h-3.5" /> OFFICIAL
                                                        </span>
                                                    </>
                                                )}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Players Row */}
                                    <div className="flex justify-between items-center w-full max-w-4xl mx-auto">
                                        <div className="flex items-center gap-3 sm:gap-6 w-[40%] justify-start">
                                            <motion.div whileHover={{ scale: 1.1, rotate: -5 }} className="relative shrink-0">
                                                <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent blur-xl rounded-full ${res.p1Wins > res.p2Wins ? 'opacity-100' : 'opacity-0'}`}></div>
                                                <PlayerAvatar name={p1Name} logo={getPlayerLogo(match.p1Id)} className="relative w-16 h-16 sm:w-24 sm:h-24 text-sm sm:text-xl drop-shadow-2xl border-2 border-white/5" />
                                            </motion.div>
                                            <span className={`font-outfit font-black text-xl sm:text-4xl truncate tracking-tight transition-colors ${res.p1Wins > res.p2Wins ? 'text-white' : 'text-slate-300 group-hover:text-white'}`} title={p1Name}>{p1Name}</span>
                                        </div>

                                        <div className="flex flex-col items-center justify-center w-[20%] z-20">
                                            {(match.played || res.p1Wins > 0 || res.p2Wins > 0) ? (
                                                <div className="flex items-center gap-4 bg-slate-950/80 px-6 py-3 rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                                                    <span className={`text-4xl sm:text-6xl font-outfit font-black tracking-tighter ${res.p1Wins > res.p2Wins ? 'text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]' : 'text-white'}`}>{res.p1Wins}</span>
                                                    <span className="text-slate-600 font-black text-xl">-</span>
                                                    <span className={`text-4xl sm:text-6xl font-outfit font-black tracking-tighter ${res.p2Wins > res.p1Wins ? 'text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]' : 'text-white'}`}>{res.p2Wins}</span>
                                                </div>
                                            ) : (
                                                <span className="text-sm sm:text-2xl font-outfit font-black tracking-[0.4em] text-slate-500 uppercase italic">VS</span>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-end gap-3 sm:gap-6 w-[40%] text-right">
                                            <span className={`font-outfit font-black text-xl sm:text-4xl truncate tracking-tight transition-colors ${res.p2Wins > res.p1Wins ? 'text-white' : 'text-slate-300 group-hover:text-white'}`} title={p2Name}>{p2Name}</span>
                                            <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="relative shrink-0">
                                                <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent blur-xl rounded-full ${res.p2Wins > res.p1Wins ? 'opacity-100' : 'opacity-0'}`}></div>
                                                <PlayerAvatar name={p2Name} logo={getPlayerLogo(match.p2Id)} className="relative w-16 h-16 sm:w-24 sm:h-24 text-sm sm:text-xl drop-shadow-2xl border-2 border-white/5" />
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>

                                {/* Expandable Game Details */}
                                {(isAdmin || match.played) && (
                                    <div className="w-full bg-slate-950/60 backdrop-blur-xl border-t border-white/5 p-4 sm:p-6 flex flex-col items-center relative z-20">
                                        <div className="flex justify-center items-center gap-4 mb-4">
                                            {isAdmin && (
                                                <button
                                                    onClick={() => togglePlayed(match.id)}
                                                    className={`px-6 py-2.5 rounded-xl border flex items-center gap-2 text-[10px] sm:text-xs uppercase font-outfit font-black tracking-[0.15em] transition-all shadow-lg ${match.played ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20' : 'bg-slate-800 border-white/10 text-slate-300 hover:bg-slate-700 hover:text-white'}`}
                                                >
                                                    {match.played ? <CheckCircle2 className="w-4 h-4" /> : <CircleDashed className="w-4 h-4" />}
                                                    <span>{match.played ? 'MARK UNOFFICIAL' : 'MARK DONE'}</span>
                                                </button>
                                            )}
                                            <button
                                                onClick={() => toggleGames(match.id)}
                                                className={`px-6 py-2.5 rounded-xl border flex items-center gap-2 text-[10px] sm:text-xs uppercase font-outfit font-black tracking-[0.15em] transition-all shadow-lg ${expandedGames[match.id] ? 'bg-blue-600/20 border-blue-500/30 text-blue-300 hover:bg-blue-600/30' : 'bg-slate-800 border-white/10 text-slate-300 hover:bg-slate-700 hover:text-white'}`}
                                            >
                                                <span>{expandedGames[match.id] ? 'HIDE GAMES' : 'SHOW GAMES'}</span>
                                                <motion.div animate={{ rotate: expandedGames[match.id] ? 180 : 0 }}>
                                                    <ChevronDown className="w-4 h-4" />
                                                </motion.div>
                                            </button>
                                        </div>

                                        <AnimatePresence>
                                            {expandedGames[match.id] && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="w-full max-w-3xl mx-auto overflow-hidden text-slate-300"
                                                >
                                                    <div className="space-y-3 pt-4 pb-2">
                                                        <GameScoreRow game="g1" label="G1" match={match} p1Name="" p2Name="" onChange={handleScoreChange} isAdmin={isAdmin} />
                                                        <GameScoreRow game="g2" label="G2" match={match} p1Name="" p2Name="" onChange={handleScoreChange} isAdmin={isAdmin} />
                                                        <AnimatePresence>
                                                            {(needG3 || (g3.p1 !== undefined && g3.p1 !== null) || isAdmin) && (
                                                                <motion.div
                                                                    initial={{ opacity: 0, height: 0 }}
                                                                    animate={{ opacity: 1, height: 'auto' }}
                                                                    exit={{ opacity: 0, height: 0 }}
                                                                    className="overflow-hidden overflow-visible!"
                                                                >
                                                                    <GameScoreRow game="g3" label="G3" match={match} p1Name="" p2Name="" onChange={handleScoreChange} isAdmin={isAdmin} />
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
}