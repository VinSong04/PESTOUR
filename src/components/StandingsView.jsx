import { Trophy } from 'lucide-react';
import BracketMatchBox from './BracketMatchBox';
import PlayerAvatar from './PlayerAvatar';
import { processBracket } from '../utils/logic';
import { motion } from 'framer-motion';

export default function StandingsView({ standingsData, bracketData }) {
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100, damping: 15 }
        }
    };

    const renderTable = (players, title, isBestThird = false, dotColor = "bg-blue-500") => (
        <motion.div variants={itemVariants} className="bg-[#131722]/80 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden shadow-2xl relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div className="p-5 border-b border-white/5 flex items-center bg-slate-900/50 backdrop-blur-md">
                <div className={`w-3 h-3 rounded-full ${dotColor} mr-3 shadow-[0_0_12px_currentColor]`}></div>
                <h3 className="font-outfit font-black text-xl tracking-wider text-slate-100 uppercase drop-shadow-sm">{title}</h3>
            </div>
            <div className="overflow-x-auto relative z-10">
                <table className="w-full text-sm text-left border-collapse">
                    <thead className="text-xs text-slate-400 font-outfit uppercase bg-slate-950/80 border-b border-white/5">
                        <tr>
                            <th className="px-4 py-4 font-bold w-12 text-center border-l-4 border-transparent">#</th>
                            <th className="px-4 py-4 font-bold tracking-wider">PLAYER</th>
                            <th className="px-3 py-4 font-bold text-center">MP</th>
                            <th className="px-3 py-4 font-bold text-center">W-L</th>
                            <th className="px-3 py-4 font-bold text-center">GF</th>
                            <th className="px-3 py-4 font-bold text-center">GA</th>
                            <th className="px-3 py-4 font-bold text-center">GD</th>
                            <th className="px-4 py-4 font-black text-white text-center tracking-wider">PTS</th>
                        </tr>
                    </thead>
                    <tbody className="bg-[#0a0b10]/40 divide-y divide-white/5">
                        {players.map((p, idx) => {
                            let leftBorder = "border-l-4 border-l-transparent";
                            if (!isBestThird) {
                                if (idx < 2) leftBorder = "border-l-4 border-l-emerald-500";
                                else if (idx === 2) leftBorder = "border-l-4 border-l-amber-500";
                            } else {
                                if (idx < 2) leftBorder = "border-l-4 border-l-emerald-500";
                                else leftBorder = "border-l-4 border-l-rose-500";
                            }

                            return (
                                <tr key={p.id} className="hover:bg-slate-800/50 transition-colors group/row">
                                    <td className={`px-4 py-4 font-black text-slate-400 text-center ${leftBorder} font-outfit`}>{idx + 1}</td>
                                    <td className="px-4 py-4 min-w-[200px]">
                                        <div className="flex items-center gap-3">
                                            <PlayerAvatar name={p.name} logo={p.logo} className="w-9 h-9 text-xs" />
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-200 text-[15px] group-hover/row:text-white transition-colors">{p.name}</span>
                                                {isBestThird && (
                                                    <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mt-0.5">
                                                        GROUP {p.group}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-3 py-4 text-center text-slate-400 font-medium">{p.played}</td>
                                    <td className="px-3 py-4 text-center text-slate-400 font-medium whitespace-nowrap">{p.w}-{p.l}</td>
                                    <td className="px-3 py-4 text-center text-slate-400 font-mono">{p.gf}</td>
                                    <td className="px-3 py-4 text-center text-slate-400 font-mono">{p.ga}</td>
                                    <td className={`px-3 py-4 text-center font-mono font-bold ${p.gd > 0 ? 'text-emerald-400' : p.gd < 0 ? 'text-rose-400' : 'text-slate-400'}`}>
                                        {p.gd > 0 ? `+${p.gd}` : p.gd}
                                    </td>
                                    <td className="px-4 py-4 text-center font-black text-blue-400 text-lg font-outfit drop-shadow-[0_0_8px_rgba(96,165,250,0.3)]">{p.pts}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );

    const bracket = bracketData && bracketData.length > 0 ? processBracket(bracketData) : [];
    const qfs = bracket.filter(m => m.id.startsWith('QF'));
    const sfs = bracket.filter(m => m.id.startsWith('SF'));
    const finalMatch = bracket.find(m => m.id.startsWith('F'));

    return (
        <motion.div
            className="space-y-16"
            initial="hidden"
            animate="visible"
            variants={{
                visible: { transition: { staggerChildren: 0.1 } }
            }}
        >
            <div className="grid lg:grid-cols-2 gap-8 mt-4">
                {renderTable(standingsData.groups.A, "GROUP A", false, "bg-blue-500")}
                {renderTable(standingsData.groups.B, "GROUP B", false, "bg-amber-500")}
                {renderTable(standingsData.groups.C, "GROUP C", false, "bg-emerald-500")}
            </div>

            {/* Knockout Bracket on Standings Page */}
            {bracket.length > 0 && (
                <motion.div variants={itemVariants} className="mt-20 pt-16 border-t border-white/10">
                    <h2 className="text-3xl font-outfit font-black flex items-center justify-center sm:justify-start gap-4 mb-12 text-white">
                        <div className="p-3 bg-amber-500/10 rounded-2xl border border-amber-500/20">
                            <Trophy className="text-amber-400 w-8 h-8 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
                        </div>
                        <span className="drop-shadow-md">KNOCKOUT BRACKET</span>
                    </h2>

                    <div className="flex flex-col lg:flex-row justify-between items-center lg:items-center w-full min-w-max overflow-x-auto gap-12 py-20 pb-28 px-8 min-h-[700px] relative bg-[#080b12]/90 backdrop-blur-xl rounded-[40px] border border-white/5 shadow-2xl">
                        {/* Background Effects */}
                        <div className="absolute inset-0 z-0 bg-center bg-no-repeat bg-[length:120%_auto] opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')" }}></div>
                        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>
                        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>

                        {/* Decorative Grid */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

                        {/* QF Left Column */}
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
                            <div className="flex flex-col justify-center w-full lg:w-96 shrink-0 z-20 px-4 md:scale-110">
                                <motion.div
                                    className="text-center mb-8 relative"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                >
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen"></div>
                                    <Trophy className="mx-auto text-amber-400 w-20 h-20 mb-6 drop-shadow-[0_0_30px_rgba(251,191,36,0.8)]" />
                                    <h3 className="font-outfit font-black text-3xl text-white tracking-[0.25em] uppercase drop-shadow-lg">Championship</h3>
                                    <p className="text-sm text-amber-400 font-bold tracking-widest mt-3 uppercase">Best of 3 Series</p>
                                </motion.div>
                                <div className="shadow-[0_0_60px_rgba(251,191,36,0.2)] rounded-3xl backdrop-blur-md">
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

                        {/* QF Right Column */}
                        <div className="flex flex-col justify-around w-full lg:w-80 shrink-0 space-y-24 z-10">
                            {qfs.filter(m => m.id === 'QF-3' || m.id === 'QF-4').map((match, idx) => (
                                <BracketMatchBox key={match.id} match={match} title={`Quarterfinal ${idx + 3}`} isAdmin={false} hideGames={true} />
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}