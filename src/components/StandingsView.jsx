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
                            let leftBorder = "border-l-4 border-l-transparent";
                            if (!isBestThird) {
                                if (idx < 2) leftBorder = "border-l-4 border-l-[#10B981]";
                                else if (idx === 2) leftBorder = "border-l-4 border-l-[#F59E0B]";
                            } else {
                                if (idx < 2) leftBorder = "border-l-4 border-l-[#10B981]";
                                else leftBorder = "border-l-4 border-l-[#EF4444]";
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

    const bracket = bracketData && bracketData.length > 0 ? processBracket(bracketData) : [];
    const qfs = bracket.filter(m => m.id.startsWith('QF'));
    const sfs = bracket.filter(m => m.id.startsWith('SF'));
    const finalMatch = bracket.find(m => m.id.startsWith('F'));

    return (
        <div className="space-y-12">
            <div className="grid lg:grid-cols-2 gap-8">
                {renderTable(standingsData.groups.A, "GROUP A", false, "bg-[#3B82F6]")}
                {renderTable(standingsData.groups.B, "GROUP B", false, "bg-[#F59E0B]")}
                {renderTable(standingsData.groups.C, "GROUP C", false, "bg-[#10B981]")}
            </div>

            {/* Knockout Bracket on Standings Page */}
            {bracket.length > 0 && (
                <div className="mt-16 pt-12 border-t border-[#1E2738]">
                    <h2 className="text-2xl font-black flex items-center gap-3 mb-10 text-[#F8FAFC]">
                        <Trophy className="text-[#FBBF24] w-7 h-7" /> KNOCKOUT BRACKET
                    </h2>

                    <div className="flex flex-col lg:flex-row justify-between items-center lg:items-center w-full min-w-max overflow-x-auto gap-12 py-16 pb-24 px-8 min-h-[700px] relative mt-12 bg-[#080b12] rounded-3xl border border-[#1E2738] shadow-2xl">
                        {/* QF Left Column (QF-1, QF-2) */}
                        <div className="flex flex-col justify-around w-full lg:w-80 shrink-0 space-y-24 z-10">
                            {qfs.filter(m => m.id === 'QF-1' || m.id === 'QF-2').map((match, idx) => (
                                <BracketMatchBox key={match.id} match={match} title={`Quarterfinal ${idx + 1}`} isAdmin={false} hideGames={true} />
                            ))}
                        </div>

                        {/* SF-1 */}
                        {sfs.filter(m => m.id === 'SF-1').length > 0 && (
                            <div className="flex flex-col justify-center w-full lg:w-80 shrink-0 z-10 relative px-4">
                                {sfs.filter(m => m.id === 'SF-1').map(match => (
                                    <BracketMatchBox key={match.id} match={match} title="Semifinal 1" isAdmin={false} hideGames={true} />
                                ))}
                            </div>
                        )}

                        {/* Championship + Grand Final (Center) */}
                        {finalMatch && (
                            <div className="flex flex-col justify-center w-full lg:w-96 shrink-0 z-20 px-4 md:scale-110 transition-transform duration-500 hover:scale-110">
                                <div className="text-center mb-8 relative">
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#FBBF24] opacity-[0.05] blur-[80px] rounded-full pointer-events-none"></div>
                                    <Trophy className="mx-auto text-[#FBBF24] w-16 h-16 mb-4 drop-shadow-[0_0_20px_rgba(251,191,36,0.6)]" />
                                    <h3 className="font-black text-2xl text-white tracking-[0.2em] uppercase drop-shadow-md">Championship</h3>
                                    <p className="text-xs text-[#FBBF24] font-bold tracking-widest mt-2 uppercase">Best of 3 Series</p>
                                </div>
                                <div className="shadow-[0_0_50px_rgba(251,191,36,0.15)] rounded-2xl">
                                    <BracketMatchBox match={finalMatch} title="Grand Final" isAdmin={false} hideGames={true} />
                                </div>
                            </div>
                        )}

                        {/* SF-2 */}
                        {sfs.filter(m => m.id === 'SF-2').length > 0 && (
                            <div className="flex flex-col justify-center w-full lg:w-80 shrink-0 z-10 relative px-4">
                                {sfs.filter(m => m.id === 'SF-2').map(match => (
                                    <BracketMatchBox key={match.id} match={match} title="Semifinal 2" isAdmin={false} hideGames={true} />
                                ))}
                            </div>
                        )}

                        {/* QF Right Column (QF-3, QF-4) */}
                        <div className="flex flex-col justify-around w-full lg:w-80 shrink-0 space-y-24 z-10">
                            {qfs.filter(m => m.id === 'QF-3' || m.id === 'QF-4').map((match, idx) => (
                                <BracketMatchBox key={match.id} match={match} title={`Quarterfinal ${idx + 3}`} isAdmin={false} hideGames={true} />
                            ))}
                        </div>

                        {/* Background Effects */}
                        <div className="absolute inset-0 z-0 bg-center bg-no-repeat bg-contain opacity-[0.02] pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}></div>
                        <div className="absolute top-0 left-0 w-96 h-96 bg-[#C084FC] opacity-[0.05] rounded-full blur-[120px] pointer-events-none"></div>
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#10B981] opacity-[0.05] rounded-full blur-[120px] pointer-events-none"></div>
                    </div>
                </div>
            )}
        </div>
    );
}