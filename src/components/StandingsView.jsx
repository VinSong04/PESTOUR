import React from 'react';
import { BarChart3, ShieldCheck, Trophy, Flame } from 'lucide-react';
import BracketMatchBox from './BracketMatchBox';
import PlayerAvatar from './PlayerAvatar';
import { processBracket } from '../utils/logic';

export default function StandingsView({ standingsData, bracketData }) {
    const renderTable = (players, title, isBestThird = false, dotColor = "bg-blue-500") => (
        <div className="bg-[#131722] border border-[#222B3D] rounded-xl overflow-hidden shadow-xl animate-in fade-in zoom-in-95 duration-500">
            <div className="p-4 border-b border-[#1E2738] flex items-center">
                <div className={`w-3 h-3 rounded-full ${dotColor} mr-3 shadow-[0_0_8px_currentColor]`}></div>
                <h3 className="font-black text-lg tracking-wider text-[#E2E8F0] uppercase">{title}</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                    <thead className="text-xs text-[#8B9BB4] uppercase bg-[#181D2B] border-b border-[#222B3D]">
                        <tr>
                            <th className="px-4 py-3 font-semibold w-12 text-center border-l-4 border-transparent">#</th>
                            <th className="px-4 py-3 font-semibold">PLAYER</th>
                            <th className="px-3 py-3 font-semibold text-center">MP</th>
                            <th className="px-3 py-3 font-semibold text-center">W-L</th>
                            <th className="px-3 py-3 font-semibold text-center">GF</th>
                            <th className="px-3 py-3 font-semibold text-center">GA</th>
                            <th className="px-3 py-3 font-semibold text-center">GD</th>
                            <th className="px-4 py-3 font-black text-white text-center">PTS</th>
                        </tr>
                    </thead>
                    <tbody className="bg-[#0a0b10]/50 divide-y divide-[#1E2738]">
                        {players.map((p, idx) => {
                            // Left border logic
                            let leftBorder = "border-l-4 border-l-transparent";
                            if (!isBestThird) {
                                if (idx < 2) leftBorder = "border-l-4 border-l-[#10B981]"; // Top 2
                                else if (idx === 2) leftBorder = "border-l-4 border-l-[#F59E0B]"; // 3rd Place
                            } else {
                                if (idx < 2) leftBorder = "border-l-4 border-l-[#10B981]"; // Top 2 of 3rd place
                                else leftBorder = "border-l-4 border-l-[#EF4444]"; // Eliminated
                            }

                            return (
                                <tr key={p.id} className="hover:bg-[#1A2234] transition-colors group">
                                    <td className={`px-4 py-4 font-bold text-[#8B9BB4] text-center ${leftBorder}`}>{idx + 1}</td>
                                    <td className="px-4 py-4 min-w-[200px]">
                                        <div className="flex items-center gap-3">
                                            <PlayerAvatar name={p.name} className="w-8 h-8 text-xs" />
                                            <div className="flex flex-col">
                                                <span className="font-bold text-[#E2E8F0] text-[15px]">{p.name}</span>
                                                {isBestThird && (
                                                    <span className="text-[10px] text-[#64748B] font-bold tracking-widest uppercase mt-0.5">
                                                        GROUP {p.group}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-3 py-4 text-center text-[#94A3B8] font-medium">{p.played}</td>
                                    <td className="px-3 py-4 text-center text-[#94A3B8] font-medium whitespace-nowrap">{p.w}-{p.l}</td>
                                    <td className="px-3 py-4 text-center text-[#94A3B8] font-mono">{p.gf}</td>
                                    <td className="px-3 py-4 text-center text-[#94A3B8] font-mono">{p.ga}</td>
                                    <td className={`px-3 py-4 text-center font-mono font-medium ${p.gd > 0 ? 'text-[#10B981]' : p.gd < 0 ? 'text-[#EF4444]' : 'text-[#94A3B8]'}`}>
                                        {p.gd > 0 ? `+${p.gd}` : p.gd}
                                    </td>
                                    <td className="px-4 py-4 text-center font-black text-[#6384FF] text-lg">{p.pts}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="space-y-12">
            <div className="grid lg:grid-cols-2 gap-8">
                {renderTable(standingsData.groups.A, "GROUP A", false, "bg-[#3B82F6]")}
                {renderTable(standingsData.groups.B, "GROUP B", false, "bg-[#F59E0B]")}
                {renderTable(standingsData.groups.C, "GROUP C", false, "bg-[#10B981]")}
                {renderTable(standingsData.thirds, "BEST THIRD-PLACE", true, "bg-[#A855F7]")}
            </div>

            <div className="mt-16 border-t border-[#1E2738] pt-12">
                <h2 className="text-2xl font-black flex items-center gap-3 mb-6 text-[#E2E8F0] tracking-tight">
                    <ShieldCheck className="text-[#C084FC] w-7 h-7" /> QUALIFIED 8 (SEEDING)
                </h2>
                <div className="bg-[#131722] border border-[#2B2144] rounded-xl overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.05)]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-[#1A1829] text-[#C084FC] text-xs uppercase font-bold border-b border-[#2B2144]">
                                <tr>
                                    <th className="px-6 py-4">Seed</th>
                                    <th className="px-6 py-4">Player</th>
                                    <th className="px-6 py-4 text-center">Path</th>
                                    <th className="px-6 py-4 text-center">PTS</th>
                                    <th className="px-6 py-4 text-center">GD</th>
                                    <th className="px-6 py-4 text-center">GF</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1E2738]">
                                {standingsData.qualified.map((p, idx) => (
                                    <tr key={p.id} className="hover:bg-[#1A2234] transition-colors">
                                        <td className="px-6 py-4 font-black text-lg text-[#64748B]">#{idx + 1}</td>
                                        <td className="px-6 py-4 font-bold text-base text-[#F8FAFC]">
                                            <div className="flex items-center gap-3">
                                                <PlayerAvatar name={p.name} className="w-7 h-7 text-[10px]" />
                                                {p.name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`text-[11px] font-bold px-3 py-1.5 rounded-md border ${p.seedType.includes('1') ? 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20 shadow-[0_0_10px_rgba(245,158,11,0.2)]' :
                                                p.seedType.includes('2') ? 'bg-[#94A3B8]/10 text-[#CBD5E1] border-[#94A3B8]/20' :
                                                    'bg-[#3B82F6]/10 text-[#60A5FA] border-[#3B82F6]/20 shadow-[0_0_10px_rgba(59,130,246,0.2)]'
                                                }`}>
                                                {p.seedType}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center font-black text-[#E2E8F0] text-base">{p.pts}</td>
                                        <td className="px-6 py-4 text-center font-mono font-medium text-[#94A3B8]">{p.gd > 0 ? `+${p.gd}` : p.gd}</td>
                                        <td className="px-6 py-4 text-center font-mono font-medium text-[#94A3B8]">{p.gf}</td>
                                    </tr>
                                ))}
                                {standingsData.qualified.length === 0 && (
                                    <tr><td colSpan="6" className="text-center py-12 text-[#64748B] font-medium">No matches played yet. Waiting for group stage results.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Knockout Bracket on Standings Page */}
            {bracketData && bracketData.length > 0 && (
                <div className="mt-16 pt-12 border-t border-[#1E2738]">
                    <h2 className="text-2xl font-black flex items-center gap-3 mb-10 text-[#F8FAFC]">
                        <Trophy className="text-[#FBBF24] w-7 h-7" /> KNOCKOUT BRACKET
                    </h2>
                    <div className="space-y-16">
                        {/* Quarterfinals */}
                        <div>
                            <h3 className="text-sm font-black tracking-widest uppercase mb-6 text-[#C084FC] flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#C084FC] shadow-[0_0_8px_currentColor]"></span> Quarterfinals
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                {processBracket(bracketData).filter(m => m.id.startsWith('QF')).map((match, idx) => (
                                    <BracketMatchBox key={match.id} match={match} title={`Quarterfinal ${idx + 1}`} isAdmin={false} />
                                ))}
                            </div>
                        </div>

                        {/* Semifinals */}
                        {processBracket(bracketData).filter(m => m.id.startsWith('SF')).length > 0 && (
                            <div>
                                <h3 className="text-sm font-black tracking-widest uppercase mb-6 text-[#F97316] flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[#F97316] shadow-[0_0_8px_currentColor]"></span> Semifinals
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {processBracket(bracketData).filter(m => m.id.startsWith('SF')).map((match, idx) => (
                                        <BracketMatchBox key={match.id} match={match} title={`Semifinal ${idx + 1}`} isAdmin={false} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Grand Final */}
                        {processBracket(bracketData).find(m => m.id.startsWith('F')) && (
                            <div>
                                <h3 className="text-sm font-black tracking-widest uppercase mb-6 text-[#FBBF24] flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[#FBBF24] shadow-[0_0_8px_currentColor]"></span> Grand Final
                                </h3>
                                <div className="flex justify-center">
                                    <div className="w-full max-w-lg">
                                        <BracketMatchBox
                                            match={processBracket(bracketData).find(m => m.id.startsWith('F'))}
                                            title="Grand Final"
                                            isAdmin={false}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
