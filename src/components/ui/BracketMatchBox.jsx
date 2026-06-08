import { CheckCircle2, CircleDashed } from 'lucide-react';
import GameScoreRow from './GameScoreRow';
import PlayerAvatar from './PlayerAvatar';
import { getSeriesResult } from '../../utils/logic';

import { memo } from 'react';

export default memo(function BracketMatchBox({ match, title, isAdmin, togglePlayed, handleScoreChange, hideGames = false }) {
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

    const isTbd = match.p1Id === null || match.p2Id === null;

    // Theme colors
    let roundColorClass = 'from-purple-500/60 via-indigo-500/60 to-cyan-500/60';
    let titleColorClass = 'text-purple-400';
    if (match.id.startsWith('SF')) {
        roundColorClass = 'from-orange-500/60 via-amber-500/60 to-yellow-500/60';
        titleColorClass = 'text-amber-400';
    } else if (match.id.startsWith('F')) {
        roundColorClass = 'from-yellow-400/60 via-amber-500/60 to-orange-600/60';
        titleColorClass = 'text-amber-500';
    }

    return (
        <div className={`relative glass-card ${isTbd ? 'opacity-50' : 'hover:border-cyan-500/10 hover-lift'} rounded-2xl overflow-hidden transition-all duration-500 group`}>
            {/* Left accent strip */}
            <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${roundColorClass} opacity-70`}></div>

            <div className="p-5 pl-7">
                {/* Header */}
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/[0.03]">
                    <div className="flex flex-col gap-0.5">
                        <span className={`text-[9px] font-bold uppercase tracking-[0.2em] ${titleColorClass}`}>{title}</span>
                        <span className="text-[8px] font-medium text-slate-600 tracking-wider uppercase">{match.id}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-white/[0.03] px-3 py-1.5 rounded-lg border border-white/[0.04]">
                            <span className={`text-xl font-outfit font-bold tracking-tight ${res.p1Wins > res.p2Wins ? 'text-cyan-400' : 'text-white'}`}>{res.p1Wins}</span>
                            <span className="text-slate-800 font-bold text-sm">:</span>
                            <span className={`text-xl font-outfit font-bold tracking-tight ${res.p2Wins > res.p1Wins ? 'text-purple-400' : 'text-white'}`}>{res.p2Wins}</span>
                        </div>

                        {isAdmin && !isTbd && togglePlayed && (
                            <button onClick={() => togglePlayed(match.id)} className={`p-2 rounded-lg border transition-all ${match.played ? 'bg-emerald-500/8 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/15' : 'bg-white/[0.03] border-white/[0.06] text-slate-500 hover:text-white'}`}>
                                {match.played ? <CheckCircle2 className="w-4 h-4" /> : <CircleDashed className="w-4 h-4" />}
                            </button>
                        )}
                        {!isAdmin && match.played && !isTbd && (
                            <span className="text-[8px] text-emerald-400/60 font-semibold tracking-wider uppercase border border-emerald-500/10 bg-emerald-500/[0.04] px-2.5 py-1.5 rounded-md flex items-center gap-1.5">
                                <CheckCircle2 className="w-3 h-3" /> DONE
                            </span>
                        )}
                    </div>
                </div>

                {/* Players */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center px-0.5">
                        <div className="flex items-center gap-3 w-[43%] min-w-0">
                            <PlayerAvatar name={match.p1Name} logo={match.p1Logo} className={`w-9 h-9 text-[9px] rounded-lg border transition-all duration-500 ${res.p1Wins > res.p2Wins ? 'border-cyan-400/25 shadow-[0_0_10px_rgba(34,211,238,0.1)]' : 'border-white/[0.04]'}`} />
                            <div className="flex flex-col min-w-0">
                                <span className={`font-outfit font-bold text-[12px] leading-tight transition-all duration-500 truncate ${res.p1Wins > res.p2Wins ? 'text-white' : 'text-slate-500'}`} title={match.p1Name}>{match.p1Name || 'TBD'}</span>
                                {res.p1Wins > res.p2Wins && <span className="text-[7px] font-bold text-amber-400/60 tracking-wider flex items-center gap-0.5">🏆 WINNER</span>}
                            </div>
                        </div>
                        <span className="text-[8px] font-bold tracking-[0.3em] text-slate-700 uppercase italic opacity-40">VS</span>
                        <div className="flex items-center justify-end gap-3 w-[43%] text-right min-w-0">
                            <div className="flex flex-col items-end min-w-0">
                                <span className={`font-outfit font-bold text-[12px] leading-tight transition-all duration-500 truncate ${res.p2Wins > res.p1Wins ? 'text-white' : 'text-slate-500'}`} title={match.p2Name}>{match.p2Name || 'TBD'}</span>
                                {res.p2Wins > res.p1Wins && <span className="text-[7px] font-bold text-amber-400/60 tracking-wider flex items-center gap-0.5 justify-end">WINNER 🏆</span>}
                            </div>
                            <PlayerAvatar name={match.p2Name} logo={match.p2Logo} className={`w-9 h-9 text-[9px] rounded-lg border transition-all duration-500 ${res.p2Wins > res.p1Wins ? 'border-purple-400/25 shadow-[0_0_10px_rgba(168,85,247,0.1)]' : 'border-white/[0.04]'}`} />
                        </div>
                    </div>

                    {/* Game scores */}
                    {!hideGames && (
                        <div className="space-y-1.5 pt-2 border-t border-white/[0.03]">
                            <GameScoreRow game="g1" label="G1" match={match} p1Name={""} p2Name={""} onChange={handleScoreChange} isAdmin={isAdmin && !isTbd} />
                            <GameScoreRow game="g2" label="G2" match={match} p1Name={""} p2Name={""} onChange={handleScoreChange} isAdmin={isAdmin && !isTbd} />
                            {(needG3 || (g3.p1 !== undefined && g3.p1 !== null) || isAdmin) && (
                                <div className="transition-all duration-500">
                                    <GameScoreRow game="g3" label="G3" match={match} p1Name={""} p2Name={""} onChange={handleScoreChange} isAdmin={isAdmin && !isTbd} />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});
