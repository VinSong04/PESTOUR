import React, { useState } from 'react';
import { Gamepad2, CheckCircle2, CircleDashed, Info, ChevronDown, ChevronUp } from 'lucide-react';
import GameScoreRow from './GameScoreRow';
import PlayerAvatar from './PlayerAvatar';
import { getSeriesResult, processBracket } from '../utils/logic';

export default function MatchesView({ data, updateData, isAdmin }) {
    const [groupFilter, setGroupFilter] = useState('ALL');
    const [statusFilter, setStatusFilter] = useState('UPCOMING');
    const [expandedGames, setExpandedGames] = useState({});

    const toggleGames = (matchId) => {
        setExpandedGames(prev => ({ ...prev, [matchId]: !prev[matchId] }));
    };

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

    const getPlayerName = (playerId) => {
        return data.players.find(p => p.id === playerId)?.name || playerId;
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-[#0f141e] p-6 rounded-2xl border border-[#222B3D] shadow-xl">
                <h2 className="text-3xl font-black flex items-center gap-3 text-[#E2E8F0] tracking-wider uppercase">
                    <Gamepad2 className="text-[#10B981] w-8 h-8 drop-shadow-[0_0_12px_rgba(16,185,129,0.3)]" />
                    SCHEDULE
                </h2>
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    {/* Status Filter */}
                    <div className="flex bg-[#0a0b10] p-1.5 rounded-xl w-full sm:w-auto border border-[#1E2738] shadow-inner">
                        <button
                            onClick={() => setStatusFilter('UPCOMING')}
                            className={`flex-1 sm:flex-none px-6 py-2.5 text-xs tracking-widest uppercase font-black rounded-lg transition-all ${statusFilter === 'UPCOMING' ? 'bg-[#10B981] text-white shadow-lg shadow-[#10B981]/20' : 'text-[#64748B] hover:text-[#94A3B8]'}`}
                        >Upcoming</button>
                        <button
                            onClick={() => setStatusFilter('PLAYED')}
                            className={`flex-1 sm:flex-none px-6 py-2.5 text-xs tracking-widest uppercase font-black rounded-lg transition-all ${statusFilter === 'PLAYED' ? 'bg-[#3B82F6] text-white shadow-lg shadow-[#3B82F6]/20' : 'text-[#64748B] hover:text-[#94A3B8]'}`}
                        >Played</button>
                    </div>

                    {/* Group Filter */}
                    <div className="flex bg-[#0a0b10] p-1.5 rounded-xl w-full sm:w-auto border border-[#1E2738] shadow-inner">
                        {['ALL', 'A', 'B', 'C', 'KNOCKOUT'].map(g => (
                            <button
                                key={g}
                                onClick={() => setGroupFilter(g)}
                                className={`flex-1 sm:flex-none px-5 py-2.5 text-xs tracking-widest uppercase font-black rounded-lg transition-all ${groupFilter === g ? 'bg-[#334155] text-white shadow' : 'text-[#64748B] hover:text-[#94A3B8]'}`}
                            >
                                {g === 'ALL' ? 'ALL' : g === 'KNOCKOUT' ? 'KNOCKOUT' : `GR.${g}`}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Viewer Mode Banner */}
            {!isAdmin && (
                <div className="bg-[#4770FF]/10 border border-[#4770FF]/20 text-[#6384FF] p-4 rounded-xl text-sm font-bold flex items-center gap-3 shadow-[0_4px_20px_rgba(71,112,255,0.05)]">
                    <Info className="w-5 h-5 flex-shrink-0" /> You are in view-only spectator mode. Admin login is required to input live match scores.
                </div>
            )}

            {/* Match Cards */}
            <div className="flex flex-col gap-4 w-full max-w-5xl mx-auto">
                {filtered.length === 0 ? (
                    <div className="py-20 text-center text-[#64748B] bg-[#0f141e] rounded-2xl border border-dashed border-[#334155] flex flex-col items-center">
                        <Gamepad2 className="w-12 h-12 mb-4 opacity-20" />
                        <p className="font-bold text-lg">No {statusFilter.toLowerCase()} matches found for this filter.</p>
                    </div>
                ) : filtered.map(match => {
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
                        <div key={match.id} className={`relative flex flex-col overflow-hidden w-full border border-[#1E2738]/60 transition-all duration-300 rounded-[20px] ${match.played ? 'bg-[#10141D]' : 'bg-[#0B0F19]/90 hover:bg-[#0B0F19] hover:border-[#334155]/60'}`}>
                            {/* Main Card */}
                            <div className="flex flex-col items-center w-full px-4 sm:px-8 py-6 relative z-10">
                                {/* Match Header */}
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="text-[10px] sm:text-[11px] font-black tracking-[0.2em] text-[#8B9BB4] flex items-center gap-2 sm:gap-4 uppercase">
                                        <span className="text-[#6384FF]">{label}</span>
                                        <span className="w-1 h-1 rounded-full bg-[#334155]"></span>
                                        <span>MATCH {match.id.replace(/\D/g, '') || match.id}</span>
                                        <span className="w-1 h-1 rounded-full bg-[#334155]"></span>
                                        <span className="text-[#10B981]">BO3</span>
                                        {match.played && (
                                            <>
                                                <span className="w-1 h-1 rounded-full bg-[#334155]"></span>
                                                <span className="text-[#10B981] flex items-center gap-1">
                                                    <CheckCircle2 className="w-3 h-3" /> OFFICIAL
                                                </span>
                                            </>
                                        )}
                                    </span>
                                </div>

                                {/* Players Row */}
                                <div className="flex justify-between items-center w-full">
                                    <div className="flex items-center gap-3 sm:gap-6 w-[40%] justify-start">
                                        <PlayerAvatar name={p1Name} className="w-12 h-12 sm:w-20 sm:h-20 text-xs sm:text-lg shrink-0 drop-shadow-xl" />
                                        <span className="font-black text-lg sm:text-3xl text-[#F8FAFC] truncate tracking-wide" title={p1Name}>{p1Name}</span>
                                    </div>

                                    <div className="flex flex-col items-center justify-center w-[20%]">
                                        {(match.played || res.p1Wins > 0 || res.p2Wins > 0) ? (
                                            <div className="text-3xl sm:text-5xl font-black tracking-widest text-white drop-shadow-[0_2px_15px_rgba(255,255,255,0.1)]">
                                                {res.p1Wins} <span className="text-[#475569] mx-2 sm:mx-4">-</span> {res.p2Wins}
                                            </div>
                                        ) : (
                                            <span className="text-sm sm:text-2xl font-black tracking-[0.3em] text-[#475569] uppercase italic opacity-70">VS</span>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-end gap-3 sm:gap-6 w-[40%]">
                                        <span className="font-black text-lg sm:text-3xl text-[#F8FAFC] truncate text-right tracking-wide" title={p2Name}>{p2Name}</span>
                                        <PlayerAvatar name={p2Name} className="w-12 h-12 sm:w-20 sm:h-20 text-xs sm:text-lg shrink-0 drop-shadow-xl" />
                                    </div>
                                </div>
                            </div>

                            {/* Expandable Game Details */}
                            {(isAdmin || match.played) && (
                                <div className="w-full bg-[#0a0b10]/80 border-t border-[#1E2738]/50 p-4 sm:p-6 flex flex-col items-center">
                                    <div className="flex justify-center items-center gap-4 mb-4">
                                        {isAdmin && (
                                            <button
                                                onClick={() => togglePlayed(match.id)}
                                                className={`px-6 py-2 rounded-xl border flex items-center gap-2 text-[10px] sm:text-xs uppercase font-black tracking-widest transition-all ${match.played ? 'bg-[#10B981]/10 border-[#10B981]/30 text-[#10B981] hover:bg-[#10B981]/20' : 'bg-[#1E293B]/70 border-[#334155]/80 text-[#94A3B8] hover:bg-[#334155] hover:text-white shadow-md'}`}
                                            >
                                                {match.played ? <CheckCircle2 className="w-4 h-4" /> : <CircleDashed className="w-4 h-4" />}
                                                <span>{match.played ? 'MARK UNOFFICIAL' : 'MARK DONE'}</span>
                                            </button>
                                        )}
                                        <button
                                            onClick={() => toggleGames(match.id)}
                                            className="px-6 py-2 rounded-xl border bg-[#1E293B]/70 border-[#334155]/80 text-[#94A3B8] hover:bg-[#334155] hover:text-white transition-all shadow-md flex items-center gap-2 text-[10px] sm:text-xs uppercase font-black tracking-widest"
                                        >
                                            <span>{expandedGames[match.id] ? 'HIDE GAMES' : 'SHOW GAMES'}</span>
                                            {expandedGames[match.id] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                        </button>
                                    </div>

                                    <div className={`w-full max-w-3xl mx-auto space-y-3 transition-all duration-500 overflow-hidden ${expandedGames[match.id] ? 'opacity-100 max-h-[500px] mt-2' : 'opacity-0 max-h-0 pointer-events-none m-0'}`}>
                                        <GameScoreRow game="g1" label="G1" match={match} p1Name="" p2Name="" onChange={handleScoreChange} isAdmin={isAdmin} />
                                        <GameScoreRow game="g2" label="G2" match={match} p1Name="" p2Name="" onChange={handleScoreChange} isAdmin={isAdmin} />
                                        {(needG3 || (g3.p1 !== undefined && g3.p1 !== null) || isAdmin) && (
                                            <div className={`transition-all duration-700 overflow-hidden ${needG3 || (g3.p1 !== undefined && g3.p1 !== null) || isAdmin ? 'opacity-100 max-h-32 mt-3' : 'opacity-0 max-h-0'}`}>
                                                <GameScoreRow game="g3" label="G3" match={match} p1Name="" p2Name="" onChange={handleScoreChange} isAdmin={isAdmin} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}