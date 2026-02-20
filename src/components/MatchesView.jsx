import React, { useState } from 'react';
import { Gamepad2, Info, CheckCircle2, CircleDashed } from 'lucide-react';
import GameScoreRow from './GameScoreRow';
import PlayerAvatar from './PlayerAvatar';
import { getSeriesResult } from '../utils/logic';

export default function MatchesView({ data, updateData, isAdmin }) {
    const [filter, setFilter] = useState('ALL');
    const [statusFilter, setStatusFilter] = useState('UPCOMING');

    const groupFiltered = filter === 'ALL'
        ? data.matches
        : data.matches.filter(m => m.groupId === filter);

    const filteredMatches = groupFiltered.filter(m => statusFilter === 'UPCOMING' ? !m.played : m.played);

    const handleScoreChange = (matchId, gameIndex, playerKey, val) => {
        if (!isAdmin) return;
        const numVal = val === '' ? null : parseInt(val, 10);

        const newMatches = data.matches.map(m => {
            if (m.id === matchId) {
                return {
                    ...m,
                    [gameIndex]: { ...m[gameIndex], [playerKey]: numVal }
                };
            }
            return m;
        });
        updateData({ ...data, matches: newMatches });
    };

    const togglePlayed = (matchId) => {
        if (!isAdmin) return;
        const newMatches = data.matches.map(m => {
            if (m.id === matchId) return { ...m, played: !m.played };
            return m;
        });
        updateData({ ...data, matches: newMatches });
    };

    const getPlayerName = (id) => data.players.find(p => p.id === id)?.name || id;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-[#0f141e] p-6 rounded-2xl border border-[#222B3D] shadow-xl">
                <h2 className="text-3xl font-black flex items-center gap-3 text-[#E2E8F0]">
                    <Gamepad2 className="text-[#10B981] w-8 h-8 drop-shadow-[0_0_12px_rgba(16,185,129,0.3)]" />
                    MATCH RESULTS
                </h2>

                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    {/* Status Filter */}
                    <div className="flex bg-[#0a0b10] p-1.5 rounded-xl w-full sm:w-auto border border-[#1E2738] shadow-inner">
                        <button
                            onClick={() => setStatusFilter('UPCOMING')}
                            className={`flex-1 sm:flex-none px-6 py-2.5 text-xs tracking-widest uppercase font-black rounded-lg transition-all ${statusFilter === 'UPCOMING' ? 'bg-[#10B981] text-white shadow-lg shadow-[#10B981]/20' : 'text-[#64748B] hover:text-[#94A3B8]'}`}
                        >
                            Upcoming
                        </button>
                        <button
                            onClick={() => setStatusFilter('PLAYED')}
                            className={`flex-1 sm:flex-none px-6 py-2.5 text-xs tracking-widest uppercase font-black rounded-lg transition-all ${statusFilter === 'PLAYED' ? 'bg-[#3B82F6] text-white shadow-lg shadow-[#3B82F6]/20' : 'text-[#64748B] hover:text-[#94A3B8]'}`}
                        >
                            Played
                        </button>
                    </div>

                    {/* Group Filter */}
                    <div className="flex bg-[#0a0b10] p-1.5 rounded-xl w-full sm:w-auto border border-[#1E2738] shadow-inner">
                        {['ALL', 'A', 'B', 'C'].map(grp => (
                            <button
                                key={grp}
                                onClick={() => setFilter(grp)}
                                className={`flex-1 sm:flex-none px-5 py-2.5 text-xs tracking-widest uppercase font-black rounded-lg transition-all ${filter === grp ? 'bg-[#334155] text-white shadow' : 'text-[#64748B] hover:text-[#94A3B8]'}`}
                            >
                                {grp === 'ALL' ? 'ALL' : `GR.${grp}`}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {!isAdmin && (
                <div className="bg-[#4770FF]/10 border border-[#4770FF]/20 text-[#6384FF] p-4 rounded-xl text-sm font-bold flex items-center gap-3 shadow-[0_4px_20px_rgba(71,112,255,0.05)]">
                    <Info className="w-5 h-5 flex-shrink-0" /> You are in view-only spectator mode. Admin login is required to input live match scores.
                </div>
            )}

            <div className="grid lg:grid-cols-2 gap-6">
                {filteredMatches.length === 0 ? (
                    <div className="col-span-full py-20 text-center text-[#64748B] bg-[#0f141e] rounded-2xl border border-dashed border-[#334155] flex flex-col items-center">
                        <Gamepad2 className="w-12 h-12 mb-4 opacity-20" />
                        <p className="font-bold text-lg">No {statusFilter.toLowerCase()} matches found for this filter.</p>
                    </div>
                ) : (
                    filteredMatches.map(match => {
                        const p1Name = getPlayerName(match.p1Id);
                        const p2Name = getPlayerName(match.p2Id);
                        const res = getSeriesResult(match);
                        const g1Played = match.g1.p1 !== null && match.g1.p2 !== null;
                        const g2Played = match.g2.p1 !== null && match.g2.p2 !== null;
                        let needG3 = false;

                        if (g1Played && g2Played) {
                            let tempP1W = (match.g1.p1 > match.g1.p2 ? 1 : 0) + (match.g2.p1 > match.g2.p2 ? 1 : 0);
                            let tempP2W = (match.g1.p2 > match.g1.p1 ? 1 : 0) + (match.g2.p2 > match.g2.p1 ? 1 : 0);
                            if (tempP1W === 1 && tempP2W === 1) needG3 = true;
                        }

                        return (
                            <div key={match.id} className={`border rounded-2xl p-6 transition-all duration-300 ${match.played ? 'bg-[#131722] border-[#222B3D] shadow-lg' : 'bg-[#0f141e]/50 border-[#1E2738]/50 opacity-90 hover:opacity-100 hover:border-[#334155]'}`}>
                                <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#1E2738]">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-black tracking-widest bg-[#0a0b10] border border-[#222B3D] px-3 py-1.5 rounded-md text-[#94A3B8] shadow-inner">{match.id}</span>
                                        <span className="text-[11px] font-black tracking-widest text-[#6384FF] uppercase bg-[#6384FF]/10 px-2 py-1 rounded">Group {match.groupId}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-2xl font-black tracking-widest text-white drop-shadow-md">
                                            {res.p1Wins} <span className="text-[#64748B] mx-1">-</span> {res.p2Wins}
                                        </div>
                                        {isAdmin && (
                                            <button
                                                onClick={() => togglePlayed(match.id)}
                                                className={`p-2 rounded-lg border flex items-center gap-2 text-[10px] uppercase font-black tracking-widest transition-all ${match.played ? 'bg-[#10B981]/20 border-[#10B981]/50 text-[#10B981] hover:bg-[#10B981]/30' : 'bg-[#1E293B] border-[#334155] text-[#94A3B8] hover:bg-[#334155] hover:text-white shadow-md'}`}
                                            >
                                                {match.played ? <CheckCircle2 className="w-4 h-4" /> : <CircleDashed className="w-4 h-4" />}
                                                <span className="hidden sm:inline">{match.played ? 'OFFICIAL' : 'MARK DONE'}</span>
                                            </button>
                                        )}
                                        {!isAdmin && match.played && <span className="text-[10px] tracking-widest text-[#10B981] font-black border border-[#10B981]/30 bg-[#10B981]/10 px-3 py-2 rounded-lg flex items-center gap-1.5 uppercase shadow-[0_0_15px_rgba(16,185,129,0.1)]"><CheckCircle2 className="w-3.5 h-3.5" /> Official</span>}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center px-2 mb-2">
                                        <div className="flex items-center gap-2 w-1/3">
                                            <PlayerAvatar name={p1Name} className="w-7 h-7 text-[10px] rounded-sm" />
                                            <span className="font-bold text-sm text-[#E2E8F0] truncate" title={p1Name}>{p1Name}</span>
                                        </div>
                                        <span className="text-[10px] font-black tracking-widest text-[#64748B] uppercase">VS</span>
                                        <div className="flex items-center justify-end gap-2 w-1/3">
                                            <span className="font-bold text-sm text-[#E2E8F0] truncate text-right" title={p2Name}>{p2Name}</span>
                                            <PlayerAvatar name={p2Name} className="w-7 h-7 text-[10px] rounded-sm" />
                                        </div>
                                    </div>

                                    <GameScoreRow game="g1" label="G1" match={match} p1Name={""} p2Name={""} onChange={handleScoreChange} isAdmin={isAdmin} />
                                    <GameScoreRow game="g2" label="G2" match={match} p1Name={""} p2Name={""} onChange={handleScoreChange} isAdmin={isAdmin} />
                                    {(needG3 || (match.g3.p1 !== null) || isAdmin) && (
                                        <div className={`transition-all duration-700 overflow-hidden ${needG3 || match.g3.p1 !== null || isAdmin ? 'opacity-100 max-h-32 mt-4' : 'opacity-0 max-h-0'}`}>
                                            <GameScoreRow game="g3" label="G3" match={match} p1Name={""} p2Name={""} onChange={handleScoreChange} isAdmin={isAdmin} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
