import { useState, useMemo, useCallback } from 'react';
import { Gamepad2, CheckCircle2, CircleDashed, Info, ChevronDown, Trophy } from 'lucide-react';
import GameScoreRow from '../components/ui/GameScoreRow';
import PlayerAvatar from '../components/ui/PlayerAvatar';
import { getSeriesResult, processBracket } from '../utils/logic';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer as containerVariants, springItemScale as cardVariants } from '../constants/animations';

export default function MatchesView({ data, updateData, isAdmin }) {
    const [groupFilter, setGroupFilter] = useState('ALL');
    const [statusFilter, setStatusFilter] = useState('UPCOMING');
    const [weekFilter, setWeekFilter] = useState('ALL');
    const [expandedGames, setExpandedGames] = useState({});

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

    const availableWeeks = useMemo(() => {
        const weeks = new Set();
        data.matches.forEach(m => {
            if (m.schedule) {
                const matchWeek = m.schedule.match(/WEEK\s*(\d+)/i);
                if (matchWeek) {
                    weeks.add(matchWeek[1]);
                }
            }
        });
        return [...weeks].sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
    }, [data.matches]);

    const bracketMatches = (data.bracket || []).filter(m => m.p1Id && m.p2Id);
    const allMatches = [...data.matches, ...bracketMatches];

    const filtered = (groupFilter === 'ALL'
        ? allMatches
        : groupFilter === 'KNOCKOUT'
            ? bracketMatches
            : data.matches.filter(m => m.groupId === groupFilter)
    ).filter(m => statusFilter === 'UPCOMING' ? !m.played : m.played)
     .filter(m => {
         if (weekFilter === 'ALL') return true;
         if (m.id.startsWith('QF') || m.id.startsWith('SF') || m.id.startsWith('F')) return false;
         const matchWeek = m.schedule ? m.schedule.match(/WEEK\s*(\d+)/i) : null;
         const w = matchWeek ? matchWeek[1] : null;
         return w === weekFilter;
     });

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

    const getPlayerName = useCallback((playerId) => playerMap.nameMap.get(playerId) || playerId, [playerMap]);
    const getPlayerLogo = useCallback((playerId) => playerMap.logoMap.get(playerId) || '', [playerMap]);

    return (
        <motion.div
            className="space-y-5 w-full max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Header & Filters */}
            <motion.div variants={cardVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 glass-card p-5 rounded-2xl relative overflow-hidden group">
                <h2 className="text-2xl font-outfit font-bold flex items-center gap-3.5 text-white tracking-wide uppercase relative z-10">
                    <div className="p-2.5 bg-emerald-500/8 rounded-xl border border-emerald-500/10">
                        <Gamepad2 className="text-emerald-400 w-6 h-6" />
                    </div>
                    SCHEDULE
                </h2>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto relative z-10">
                    {/* Status Toggle */}
                    <div className="flex bg-white/[0.03] p-1 rounded-xl w-full sm:w-auto border border-white/[0.04]">
                        <button
                            onClick={() => setStatusFilter('UPCOMING')}
                            className={`flex-1 sm:flex-none px-5 py-2 text-[11px] font-semibold tracking-wider uppercase rounded-lg transition-all ${statusFilter === 'UPCOMING' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-500 hover:text-white border border-transparent'}`}
                        >Upcoming</button>
                        <button
                            onClick={() => setStatusFilter('PLAYED')}
                            className={`flex-1 sm:flex-none px-5 py-2 text-[11px] font-semibold tracking-wider uppercase rounded-lg transition-all ${statusFilter === 'PLAYED' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'text-slate-500 hover:text-white border border-transparent'}`}
                        >Played</button>
                    </div>

                    {/* Group Filter */}
                    <div className="flex bg-white/[0.03] p-1 rounded-xl w-full sm:w-auto border border-white/[0.04] overflow-x-auto no-scrollbar">
                        {['ALL', ...[...new Set(data.matches.map(m => m.groupId))].filter(Boolean).sort(), 'KNOCKOUT'].map(g => (
                            <button
                                key={g}
                                onClick={() => {
                                    setGroupFilter(g);
                                    if (g === 'KNOCKOUT') setWeekFilter('ALL');
                                }}
                                className={`flex-1 sm:flex-none px-4 py-2 text-[11px] font-semibold tracking-wider uppercase rounded-lg transition-all whitespace-nowrap ${groupFilter === g ? 'bg-white/[0.06] text-white border border-white/[0.06]' : 'text-slate-500 hover:text-white border border-transparent'}`}
                            >
                                {g === 'ALL' ? 'ALL' : g === 'KNOCKOUT' ? 'KO' : `G${g}`}
                            </button>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Week Filter Bar */}
            {groupFilter !== 'KNOCKOUT' && availableWeeks.length > 0 && (
                <motion.div
                    variants={cardVariants}
                    className="glass-card p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center gap-4 relative overflow-hidden group"
                >
                    <div className="absolute -inset-px bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                    
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em] sm:pl-1">
                        Filter by Week:
                    </span>
                    
                    <div className="flex flex-wrap gap-2 items-center">
                        <button
                            onClick={() => setWeekFilter('ALL')}
                            className={`px-4 py-2 text-xs font-bold tracking-wide uppercase rounded-xl transition-all duration-300 ${
                                weekFilter === 'ALL'
                                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.1)]'
                                    : 'text-slate-400 hover:text-white bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.05]'
                            }`}
                        >
                            All Weeks
                        </button>
                        {availableWeeks.map(w => (
                            <button
                                key={w}
                                onClick={() => setWeekFilter(w)}
                                className={`px-4 py-2 text-xs font-bold tracking-wide uppercase rounded-xl transition-all duration-300 ${
                                    weekFilter === w
                                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.1)]'
                                        : 'text-slate-400 hover:text-white bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.05]'
                                }`}
                            >
                                Week {w}
                            </button>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Viewer Banner */}
            {!isAdmin && (
                <motion.div variants={cardVariants} className="bg-cyan-500/[0.04] border border-cyan-500/10 text-cyan-300/80 p-3.5 rounded-xl text-xs font-medium flex items-center gap-3">
                    <Info className="w-4 h-4 flex-shrink-0 text-cyan-400/60" />
                    <span>You are in view-only mode. Admin login is required to edit scores.</span>
                </motion.div>
            )}

            {/* Match List */}
            <motion.div variants={containerVariants} className="flex flex-col gap-4 w-full relative z-10">
                <AnimatePresence mode="popLayout">
                    {filtered.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="py-20 text-center glass-card rounded-2xl border-dashed flex flex-col items-center"
                        >
                            <Gamepad2 className="w-12 h-12 mb-4 text-slate-700" />
                            <p className="font-outfit font-bold tracking-wide text-lg text-slate-400">No {statusFilter.toLowerCase()} matches found.</p>
                            <p className="text-xs font-medium mt-1.5 text-slate-600">Try changing your filters above.</p>
                        </motion.div>
                    ) : filtered.map((match) => {
                        const p1Name = getPlayerName(match.p1Id);
                        const p2Name = getPlayerName(match.p2Id);
                        const res = getSeriesResult(match);
                        const g1 = match.g1 || {};
                        const g2 = match.g2 || {};
                        const g3 = match.g3 || {};
                        const g1Played = g1.p1 !== undefined && g1.p1 !== null && g1.p2 !== undefined && g1.p2 !== null;
                        const g2Played = g2.p1 !== undefined && g2.p1 !== null && g2.p2 !== undefined && g2.p2 !== null;
                        const isLive = !match.played && (g1Played || g2Played);

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
                                className={`relative flex flex-col overflow-hidden w-full backdrop-blur-xl transition-all duration-500 rounded-2xl group ${match.played
                                    ? 'glass-card'
                                    : isLive
                                        ? 'bg-[#0c1220]/90 border border-cyan-500/15 shadow-[0_0_40px_rgba(34,211,238,0.04)]'
                                        : 'glass-card-hover'
                                    }`}
                            >
                                {isLive && (
                                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
                                )}

                                {/* Main Content */}
                                <div className="flex flex-col items-center w-full px-4 sm:px-8 py-8 relative z-10">
                                    {/* Match Pill */}
                                    <div className="flex items-center gap-3 mb-7">
                                        <div className="px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center gap-2.5">
                                            {isLive ? (
                                                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-cyan-500/10 rounded-md border border-cyan-500/15">
                                                    <span className="relative flex h-1.5 w-1.5">
                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60"></span>
                                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400"></span>
                                                    </span>
                                                    <span className="text-[9px] font-bold text-cyan-400 tracking-wider uppercase">LIVE</span>
                                                </div>
                                            ) : (
                                                <span className={`text-[10px] font-semibold tracking-wider uppercase ${match.played ? 'text-slate-500' : 'text-cyan-400/80'}`}>
                                                    {label}{match.schedule ? ` • ${match.schedule}` : ''}
                                                </span>
                                            )}
                                            <span className="w-0.5 h-0.5 rounded-full bg-slate-700"></span>
                                            <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase">M{match.id.replace(/\D/g, '') || match.id}</span>
                                            <span className="w-0.5 h-0.5 rounded-full bg-slate-700"></span>
                                            <span className="text-[10px] font-semibold text-emerald-500/60 tracking-wider uppercase">BO3</span>

                                            {match.played && (
                                                <>
                                                    <span className="w-0.5 h-0.5 rounded-full bg-slate-700"></span>
                                                    <span className="text-emerald-500/60 flex items-center gap-1.5 text-[10px] font-semibold tracking-wider uppercase">
                                                        <CheckCircle2 className="w-3 h-3" /> DONE
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/* Players Row */}
                                    <div className="flex justify-between items-center w-full max-w-4xl mx-auto">
                                        {/* P1 */}
                                        <div className="flex items-center gap-3 sm:gap-6 w-[40%] justify-start group/p1">
                                            <motion.div whileHover={{ scale: 1.08 }} className="relative shrink-0">
                                                <PlayerAvatar name={p1Name} logo={getPlayerLogo(match.p1Id)} className={`relative w-14 h-14 sm:w-24 sm:h-24 text-sm sm:text-xl border transition-all duration-500 ${res.p1Wins > res.p2Wins ? 'border-cyan-400/30 ring-2 ring-cyan-500/10' : 'border-white/[0.06] ring-2 ring-white/[0.03]'}`} />
                                                {res.p1Wins > res.p2Wins && match.played && (
                                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-2 -left-2 z-30 bg-amber-500 text-slate-900 p-1 rounded-md shadow-lg">
                                                        <Trophy className="w-3 h-3" />
                                                    </motion.div>
                                                )}
                                            </motion.div>
                                            <div className="flex flex-col min-w-0">
                                                <span className={`font-outfit font-bold text-lg sm:text-4xl truncate tracking-tight py-1 transition-all duration-500 ${res.p1Wins > res.p2Wins ? 'text-white' : 'text-slate-400 group-hover/p1:text-slate-200'}`} title={p1Name}>{p1Name}</span>
                                                {res.p1Wins > res.p2Wins && match.played && (
                                                    <span className="text-[9px] font-bold text-amber-400/60 tracking-[0.2em] uppercase mt-0.5">WINNER</span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Score / VS */}
                                        <div className="flex flex-col items-center justify-center w-[20%] z-20">
                                            {(match.played || res.p1Wins > 0 || res.p2Wins > 0) ? (
                                                <div className="flex flex-col items-center">
                                                    <div className="flex items-center gap-4 bg-white/[0.03] px-6 py-4 rounded-2xl border border-white/[0.06] backdrop-blur-md">
                                                        <span className={`text-4xl sm:text-6xl font-outfit font-black tracking-tighter transition-all duration-700 ${res.p1Wins > res.p2Wins ? 'text-cyan-400' : 'text-white'}`}>{res.p1Wins}</span>
                                                        <div className="flex flex-col items-center gap-0.5 opacity-20">
                                                            <div className="w-1 h-1 rounded-full bg-white"></div>
                                                            <div className="w-1 h-1 rounded-full bg-white"></div>
                                                        </div>
                                                        <span className={`text-4xl sm:text-6xl font-outfit font-black tracking-tighter transition-all duration-700 ${res.p2Wins > res.p1Wins ? 'text-purple-400' : 'text-white'}`}>{res.p2Wins}</span>
                                                    </div>
                                                    {isLive && (
                                                        <div className="mt-3">
                                                            <span className="text-[9px] font-semibold text-cyan-400/60 tracking-[0.3em] uppercase animate-pulse">In Progress</span>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="relative flex items-center justify-center group/vs">
                                                    <div className="px-5 py-2.5 border border-white/[0.04] rounded-xl bg-white/[0.02] backdrop-blur-sm">
                                                        <span className="text-lg sm:text-3xl font-outfit font-black tracking-[0.3em] text-slate-600 uppercase italic group-hover/vs:text-white transition-colors duration-500">VS</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* P2 */}
                                        <div className="flex items-center justify-end gap-3 sm:gap-6 w-[40%] text-right group/p2">
                                            <div className="flex flex-col items-end min-w-0">
                                                <span className={`font-outfit font-bold text-lg sm:text-4xl truncate tracking-tight py-1 transition-all duration-500 ${res.p2Wins > res.p1Wins ? 'text-white' : 'text-slate-400 group-hover/p2:text-slate-200'}`} title={p2Name}>{p2Name}</span>
                                                {res.p2Wins > res.p1Wins && match.played && (
                                                    <span className="text-[9px] font-bold text-amber-400/60 tracking-[0.2em] uppercase mt-0.5">WINNER</span>
                                                )}
                                            </div>
                                            <motion.div whileHover={{ scale: 1.08 }} className="relative shrink-0">
                                                <PlayerAvatar name={p2Name} logo={getPlayerLogo(match.p2Id)} className={`relative w-14 h-14 sm:w-24 sm:h-24 text-sm sm:text-xl border transition-all duration-500 ${res.p2Wins > res.p1Wins ? 'border-purple-400/30 ring-2 ring-purple-500/10' : 'border-white/[0.06] ring-2 ring-white/[0.03]'}`} />
                                                {res.p2Wins > res.p1Wins && match.played && (
                                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-2 -right-2 z-30 bg-amber-500 text-slate-900 p-1 rounded-md shadow-lg">
                                                        <Trophy className="w-3 h-3" />
                                                    </motion.div>
                                                )}
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>

                                {/* Game Details */}
                                {(isAdmin || match.played) && (
                                    <div className="w-full bg-white/[0.01] border-t border-white/[0.03] p-4 sm:p-5 flex flex-col items-center relative z-20">
                                        <div className="flex justify-center items-center gap-3 mb-3">
                                            {isAdmin && (
                                                <button
                                                    onClick={() => togglePlayed(match.id)}
                                                    className={`px-4 py-2 rounded-lg border flex items-center gap-2 text-[10px] uppercase font-semibold tracking-wider transition-all ${match.played ? 'bg-emerald-500/8 border-emerald-500/15 text-emerald-400 hover:bg-emerald-500/15' : 'bg-white/[0.03] border-white/[0.06] text-slate-400 hover:text-white'}`}
                                                >
                                                    {match.played ? <CheckCircle2 className="w-3.5 h-3.5" /> : <CircleDashed className="w-3.5 h-3.5" />}
                                                    <span>{match.played ? 'MARK UNOFFICIAL' : 'MARK DONE'}</span>
                                                </button>
                                            )}
                                            <button
                                                onClick={() => toggleGames(match.id)}
                                                className={`px-4 py-2 rounded-lg border flex items-center gap-2 text-[10px] uppercase font-semibold tracking-wider transition-all ${expandedGames[match.id] ? 'bg-cyan-500/8 border-cyan-500/15 text-cyan-400' : 'bg-white/[0.03] border-white/[0.06] text-slate-400 hover:text-white'}`}
                                            >
                                                <span>{expandedGames[match.id] ? 'HIDE GAMES' : 'SHOW GAMES'}</span>
                                                <motion.div animate={{ rotate: expandedGames[match.id] ? 180 : 0 }}>
                                                    <ChevronDown className="w-3.5 h-3.5" />
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
                                                    className="w-full max-w-2xl mx-auto overflow-hidden"
                                                >
                                                    <div className="space-y-2.5 pt-3 pb-2">
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