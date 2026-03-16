import { CheckCircle2, CircleDashed } from 'lucide-react';
import GameScoreRow from './GameScoreRow';
import PlayerAvatar from './PlayerAvatar';
import { getSeriesResult } from '../utils/logic';

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

    // Theme colors based on round
    let roundColorClass = 'from-[#C084FC] to-[#8B5CF6]';
    let titleColorClass = 'text-[#C084FC]';
    if (match.id.startsWith('SF')) {
        roundColorClass = 'from-[#F97316] to-[#F59E0B]';
        titleColorClass = 'text-[#F97316]';
    } else if (match.id.startsWith('F')) {
        roundColorClass = 'from-[#FACC15] to-[#F59E0B]';
        titleColorClass = 'text-[#FACC15]';
    }

    return (
        <div className={`relative bg-slate-900/60 backdrop-blur-xl border ${isTbd ? 'border-white/5 opacity-60' : 'border-white/10 hover:border-blue-500/30'} rounded-[24px] overflow-hidden shadow-2xl transition-all duration-500 group`}>
            {/* Round left border strip */}
            <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${roundColorClass} shadow-[0_0_15px_currentColor] opacity-80`}></div>

            <div className="p-6 pl-8">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
                    <span className={`text-[10px] font-black uppercase tracking-[0.25em] ${titleColorClass} drop-shadow-[0_0_8px_currentColor]`}>{title}</span>

                    <div className="flex items-center gap-4">
                        <div className="text-2xl font-outfit font-black tracking-widest text-white drop-shadow-lg">
                            {res.p1Wins} <span className="text-slate-600 mx-1">:</span> {res.p2Wins}
                        </div>

                        {isAdmin && !isTbd && togglePlayed && (
                            <button onClick={() => togglePlayed(match.id)} className={`p-2 rounded-xl border transition-all ${match.played ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-slate-800 border-white/10 text-slate-400 hover:bg-slate-700 hover:text-white'}`}>
                                {match.played ? <CheckCircle2 className="w-4 h-4" /> : <CircleDashed className="w-4 h-4" />}
                            </button>
                        )}
                        {!isAdmin && match.played && !isTbd && (
                            <span className="text-[9px] text-emerald-400 font-black tracking-widest uppercase border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Done
                            </span>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center px-1 mb-4">
                        <div className="flex items-center gap-3 w-[45%]">
                            <PlayerAvatar name={match.p1Name} logo={match.p1Logo} className="w-8 h-8 text-[10px] rounded-lg border border-white/5 shadow-md" />
                            <span className={`font-outfit font-black text-sm transition-colors truncate ${res.p1Wins > res.p2Wins ? 'text-white' : 'text-slate-400'}`} title={match.p1Name}>{match.p1Name || 'TBD'}</span>
                        </div>
                        <span className="text-[9px] font-black tracking-[0.3em] text-slate-700 uppercase italic">VS</span>
                        <div className="flex items-center justify-end gap-3 w-[45%] text-right">
                            <span className={`font-outfit font-black text-sm transition-colors truncate ${res.p2Wins > res.p1Wins ? 'text-white' : 'text-slate-400'}`} title={match.p2Name}>{match.p2Name || 'TBD'}</span>
                            <PlayerAvatar name={match.p2Name} logo={match.p2Logo} className="w-8 h-8 text-[10px] rounded-lg border border-white/5 shadow-md" />
                        </div>
                    </div>

                    {!hideGames && (
                        <div className="space-y-2 pt-2 border-t border-white/5">
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
