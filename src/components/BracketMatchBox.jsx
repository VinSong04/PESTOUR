import React from 'react';
import { CheckCircle2, CircleDashed } from 'lucide-react';
import GameScoreRow from './GameScoreRow';
import PlayerAvatar from './PlayerAvatar';
import { getSeriesResult } from '../utils/logic';

export default function BracketMatchBox({ match, title, isAdmin, togglePlayed, handleScoreChange }) {
    const res = getSeriesResult(match);
    const g1Played = match.g1.p1 !== null && match.g1.p2 !== null;
    const g2Played = match.g2.p1 !== null && match.g2.p2 !== null;
    let needG3 = false;

    if (g1Played && g2Played) {
        let tempP1W = (match.g1.p1 > match.g1.p2 ? 1 : 0) + (match.g2.p1 > match.g2.p2 ? 1 : 0);
        let tempP2W = (match.g1.p2 > match.g1.p1 ? 1 : 0) + (match.g2.p2 > match.g2.p1 ? 1 : 0);
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
        <div className={`relative bg-[#131722] border ${isTbd ? 'border-[#1E2738] opacity-70' : 'border-[#222B3D] hover:border-[#334155]'} rounded-2xl overflow-hidden shadow-xl transition-all duration-300 group`}>
            {/* Round left border strip */}
            <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${roundColorClass} shadow-[0_0_10px_currentColor]`}></div>

            <div className="p-5 pl-7">
                <div className="flex justify-between items-center mb-5 pb-3 border-b border-[#1E2738]">
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${titleColorClass}`}>{title}</span>

                    <div className="flex items-center gap-4">
                        <div className="text-xl font-black tracking-widest text-white drop-shadow-md">
                            {res.p1Wins} <span className="text-[#64748B] mx-1">-</span> {res.p2Wins}
                        </div>

                        {isAdmin && !isTbd && togglePlayed && (
                            <button onClick={() => togglePlayed(match.id)} className={`p-1.5 rounded-lg border transition-all ${match.played ? 'bg-[#10B981]/20 border-[#10B981]/50 text-[#10B981] shadow-[0_0_10px_rgba(16,185,129,0.2)]' : 'bg-[#1E2738] border-[#334155] text-[#94A3B8] hover:bg-[#334155] hover:text-white'}`}>
                                {match.played ? <CheckCircle2 className="w-4 h-4" /> : <CircleDashed className="w-4 h-4" />}
                            </button>
                        )}
                        {!isAdmin && match.played && !isTbd && (
                            <span className="text-[9px] text-[#10B981] font-black tracking-widest uppercase border border-[#10B981]/30 bg-[#10B981]/10 px-2.5 py-1.5 rounded flex items-center gap-1 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
                                <CheckCircle2 className="w-3 h-3" /> Done
                            </span>
                        )}
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between items-center px-1 mb-3">
                        <div className="flex items-center gap-2 w-2/5">
                            <PlayerAvatar name={match.p1Name} className="w-7 h-7 text-[10px] rounded-md" />
                            <span className="font-bold text-sm text-[#E2E8F0] truncate" title={match.p1Name}>{match.p1Name || 'TBD'}</span>
                        </div>
                        <span className="text-[10px] font-black tracking-widest text-[#64748B] uppercase">VS</span>
                        <div className="flex items-center justify-end gap-2 w-2/5">
                            <span className="font-bold text-sm text-[#E2E8F0] truncate text-right" title={match.p2Name}>{match.p2Name || 'TBD'}</span>
                            <PlayerAvatar name={match.p2Name} className="w-7 h-7 text-[10px] rounded-md" />
                        </div>
                    </div>

                    <GameScoreRow game="g1" label="G1" match={match} p1Name={""} p2Name={""} onChange={handleScoreChange} isAdmin={isAdmin && !isTbd} />
                    <GameScoreRow game="g2" label="G2" match={match} p1Name={""} p2Name={""} onChange={handleScoreChange} isAdmin={isAdmin && !isTbd} />
                    {(needG3 || match.g3.p1 !== null || (isAdmin && !isTbd)) && (
                        <div className={`transition-all duration-500 overflow-hidden ${needG3 || match.g3.p1 !== null || (isAdmin && !isTbd) ? 'opacity-100 max-h-32 mt-3 pt-3 border-t border-dashed border-[#1E2738]' : 'opacity-0 max-h-0'}`}>
                            <GameScoreRow game="g3" label="G3" match={match} p1Name={""} p2Name={""} onChange={handleScoreChange} isAdmin={isAdmin && !isTbd} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
