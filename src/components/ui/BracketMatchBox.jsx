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
    let roundColorClass = 'from-slate-500/60 to-slate-700/60';
    let titleColorClass = 'text-slate-400';
    let textAccent = 'text-cyan-400';
    let borderAccent = 'border-cyan-400/50';
    if (match.id.startsWith('PO')) {
        roundColorClass = 'from-yellow-500/60 via-amber-500/60 to-orange-500/60';
        titleColorClass = 'text-yellow-400';
        textAccent = 'text-yellow-400';
        borderAccent = 'border-yellow-400/50';
    } else if (match.id.startsWith('QF')) {
        roundColorClass = 'from-blue-500/60 via-cyan-500/60 to-sky-500/60';
        titleColorClass = 'text-blue-400';
        textAccent = 'text-blue-400';
        borderAccent = 'border-blue-400/50';
    } else if (match.id.startsWith('SF')) {
        roundColorClass = 'from-purple-500/60 via-fuchsia-500/60 to-pink-500/60';
        titleColorClass = 'text-purple-400';
        textAccent = 'text-purple-400';
        borderAccent = 'border-purple-400/50';
    } else if (match.id.startsWith('F')) {
        roundColorClass = 'from-green-500/60 via-emerald-500/60 to-teal-500/60';
        titleColorClass = 'text-green-400';
        textAccent = 'text-green-400';
        borderAccent = 'border-green-400/50';
    }

    const p1IsAQ = match.id.startsWith('QF');

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
                {/* Players */}
                <div className="space-y-3">
                    {/* HOME ROW */}
                    <div className="flex items-center justify-between px-0.5">
                        <div className="flex items-center gap-3 min-w-0">
                            <PlayerAvatar name={match.p1Name} logo={match.p1Logo} className={`w-9 h-9 text-[9px] rounded-lg border transition-all duration-500 ${res.p1Wins > res.p2Wins ? `${borderAccent} shadow-[0_0_15px_rgba(255,255,255,0.1)]` : 'border-white/[0.04]'}`} />
                            <div className="flex flex-col min-w-0">
                                <div className="flex items-center gap-1.5">
                                    <span className={`font-outfit font-bold text-[13px] leading-tight transition-all duration-500 truncate ${!match.p1Id ? 'text-slate-500 italic font-medium' : (res.p1Wins > res.p2Wins ? textAccent : 'text-slate-300')}`} title={match.p1Name}>
                                        {!match.p1Id && (match.p1Name === 'TBD' || match.p1Name === 'N/A' || match.p1Name.startsWith('TBD')) ? (
                                            <span className="flex items-center gap-2">
                                                <div className="h-3.5 w-24 bg-slate-700/50 animate-pulse rounded-md"></div>
                                                <span className="text-[9px] uppercase tracking-wider opacity-60">waiting</span>
                                            </span>
                                        ) : match.p1Name || 'waiting...'}
                                    </span>
                                    {p1IsAQ && match.p1Id && !match.p1Name.startsWith('Winner') && (
                                        <span className="text-amber-400 text-[10px] shrink-0 drop-shadow-md">👑</span>
                                    )}
                                </div>
                                {res.p1Wins > res.p2Wins && <span className={`text-[7px] font-bold ${textAccent} tracking-wider flex items-center gap-0.5 opacity-80 mt-0.5`}>🏆 WINNER</span>}
                            </div>
                        </div>
                        <div className={`text-xl font-outfit font-black tracking-tight ${res.p1Wins > res.p2Wins ? 'text-cyan-400 drop-shadow-md' : 'text-slate-500'}`}>
                            {res.p1Wins}
                        </div>
                    </div>

                    {/* AWAY ROW */}
                    <div className="flex items-center justify-between px-0.5 pt-3 border-t border-white/[0.03]">
                        <div className="flex items-center gap-3 min-w-0">
                            <PlayerAvatar name={match.p2Name} logo={match.p2Logo} className={`w-9 h-9 text-[9px] rounded-lg border transition-all duration-500 ${res.p2Wins > res.p1Wins ? `${borderAccent} shadow-[0_0_15px_rgba(255,255,255,0.1)]` : 'border-white/[0.04]'}`} />
                            <div className="flex flex-col min-w-0">
                                <div className="flex items-center gap-1.5">
                                    <span className={`font-outfit font-bold text-[13px] leading-tight transition-all duration-500 truncate ${!match.p2Id ? 'text-slate-500 italic font-medium' : (res.p2Wins > res.p1Wins ? textAccent : 'text-slate-300')}`} title={match.p2Name}>
                                        {!match.p2Id && (match.p2Name === 'TBD' || match.p2Name === 'N/A' || match.p2Name.startsWith('TBD')) ? (
                                            <span className="flex items-center gap-2">
                                                <div className="h-3.5 w-24 bg-slate-700/50 animate-pulse rounded-md"></div>
                                                <span className="text-[9px] uppercase tracking-wider opacity-60">waiting</span>
                                            </span>
                                        ) : match.p2Name || 'waiting...'}
                                    </span>
                                </div>
                                {res.p2Wins > res.p1Wins && <span className={`text-[7px] font-bold ${textAccent} tracking-wider flex items-center gap-0.5 opacity-80 mt-0.5`}>🏆 WINNER</span>}
                            </div>
                        </div>
                        <div className={`text-xl font-outfit font-black tracking-tight ${res.p2Wins > res.p1Wins ? 'text-purple-400 drop-shadow-md' : 'text-slate-500'}`}>
                            {res.p2Wins}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});
