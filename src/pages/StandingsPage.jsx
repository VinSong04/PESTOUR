import { useMemo } from 'react';
import { Trophy, Crown, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';
import BracketMatchBox from '../components/ui/BracketMatchBox';
import BracketConnectors from '../components/ui/BracketConnectors';
import PlayerAvatar from '../components/ui/PlayerAvatar';
import { processBracket } from '../utils/logic';
import { motion } from 'framer-motion';
import { staggerContainer as containerVariants, springItem as itemVariants } from '../constants/animations';

export default function StandingsView({ standingsData, bracketData }) {
    const renderTable = (players, title, isBestThird = false, accentColor = "cyan") => {
        const colorMap = {
            cyan: { dot: "bg-cyan-400", dotGlow: "shadow-[0_0_8px_rgba(34,211,238,0.5)]", headerBg: "bg-cyan-500/[0.04]" },
            amber: { dot: "bg-amber-400", dotGlow: "shadow-[0_0_8px_rgba(251,191,36,0.5)]", headerBg: "bg-amber-500/[0.04]" },
            emerald: { dot: "bg-emerald-400", dotGlow: "shadow-[0_0_8px_rgba(52,211,153,0.5)]", headerBg: "bg-emerald-500/[0.04]" },
            rose: { dot: "bg-rose-400", dotGlow: "shadow-[0_0_8px_rgba(251,113,133,0.5)]", headerBg: "bg-rose-500/[0.04]" },
            purple: { dot: "bg-purple-400", dotGlow: "shadow-[0_0_8px_rgba(192,132,252,0.5)]", headerBg: "bg-purple-500/[0.04]" },
        };
        const colors = colorMap[accentColor] || colorMap.cyan;

        return (
            <motion.div variants={itemVariants} className="glass-card rounded-2xl overflow-hidden group">
                {/* Header */}
                <div className={`p-4 px-5 border-b border-white/[0.04] flex items-center gap-3 ${colors.headerBg}`}>
                    <div className={`w-2 h-2 rounded-full ${colors.dot} ${colors.dotGlow}`}></div>
                    <h3 className="font-outfit font-bold text-sm tracking-wider text-slate-200 uppercase">{title}</h3>
                </div>

                {/* Table */}
                <div className="overflow-x-auto relative z-10">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead className="text-[10px] text-slate-500 font-semibold uppercase bg-white/[0.01] border-b border-white/[0.03]">
                            <tr>
                                <th className="px-4 py-3 font-semibold w-10 text-center border-l-[3px] border-transparent">#</th>
                                <th className="px-4 py-3 font-semibold tracking-wider">PLAYER</th>
                                <th className="px-2.5 py-3 font-semibold text-center">MP</th>
                                <th className="px-2.5 py-3 font-semibold text-center">W-L</th>
                                <th className="px-2.5 py-3 font-semibold text-center hidden sm:table-cell">GF</th>
                                <th className="px-2.5 py-3 font-semibold text-center hidden sm:table-cell">GA</th>
                                <th className="px-2.5 py-3 font-semibold text-center hidden sm:table-cell">GD</th>
                                <th className="px-4 py-3 font-bold text-slate-300 text-center tracking-wider">PTS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.03]">
                            {players.map((p, idx) => {
                                let leftBorder = "border-l-[3px] border-l-transparent";
                                let rowBg = "hover:bg-white/[0.02]";

                                if (!isBestThird) {
                                    if (idx < 2) {
                                        leftBorder = "border-l-[3px] border-l-emerald-500/60";
                                        rowBg = "bg-gradient-to-r from-emerald-500/[0.02] to-transparent hover:from-emerald-500/[0.04]";
                                    } else if (idx === 2) {
                                        leftBorder = "border-l-[3px] border-l-amber-500/60";
                                        rowBg = "bg-gradient-to-r from-amber-500/[0.01] to-transparent hover:from-amber-500/[0.03]";
                                    } else {
                                        rowBg = "bg-gradient-to-r from-rose-500/[0.005] to-transparent hover:from-rose-500/[0.02]";
                                    }
                                } else {
                                    if (idx < 2) {
                                        leftBorder = "border-l-[3px] border-l-emerald-500/60";
                                        rowBg = "bg-gradient-to-r from-emerald-500/[0.02] to-transparent hover:from-emerald-500/[0.04]";
                                    } else {
                                        leftBorder = "border-l-[3px] border-l-rose-500/60";
                                        rowBg = "bg-gradient-to-r from-rose-500/[0.01] to-transparent hover:from-rose-500/[0.03]";
                                    }
                                }

                                return (
                                    <tr key={p.id} className={`transition-colors group/row ${rowBg}`}>
                                        <td className={`px-4 py-3.5 font-bold text-slate-500 text-center ${leftBorder} font-mono text-xs`}>{idx + 1}</td>
                                        <td className="px-4 py-3.5 min-w-[140px] sm:min-w-[180px]">
                                            <div className="flex items-center gap-3">
                                                <PlayerAvatar name={p.name} logo={p.logo} className="w-8 h-8 text-[10px]" />
                                                <div className="flex flex-col">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-semibold text-slate-200 text-[14px] group-hover/row:text-white transition-colors leading-tight">{p.name}</span>
                                                        {!isBestThird && (
                                                            idx < 2 ? (
                                                                <span className="text-[8px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider scale-90 origin-left animate-pulse">Q</span>
                                                            ) : idx === 2 ? (
                                                                <span className="text-[8px] font-extrabold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-wider scale-90 origin-left">PO</span>
                                                            ) : (
                                                                <span className="text-[8px] font-extrabold px-1.5 py-0.5 rounded bg-white/[0.02] text-slate-500 border border-white/[0.04] uppercase tracking-wider scale-90 origin-left">ELIM</span>
                                                            )
                                                        )}
                                                        {isBestThird && (
                                                            idx < 2 ? (
                                                                <span className="text-[8px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider scale-90 origin-left animate-pulse">Q</span>
                                                            ) : (
                                                                <span className="text-[8px] font-extrabold px-1.5 py-0.5 rounded bg-white/[0.02] text-slate-500 border border-white/[0.04] uppercase tracking-wider scale-90 origin-left">ELIM</span>
                                                            )
                                                        )}
                                                    </div>
                                                    {isBestThird && (
                                                        <span className="text-[9px] text-slate-600 font-semibold tracking-wider uppercase mt-0.5">
                                                            GROUP {p.group}
                                                        </span>
                                                    )}
                                                </div>
                                                {idx === 0 && !isBestThird && (
                                                    <Crown className="w-3.5 h-3.5 text-amber-400/50 ml-auto" />
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-2.5 py-3.5 text-center text-slate-500 font-medium text-xs">{p.played}</td>
                                        <td className="px-2.5 py-3.5 text-center text-slate-500 font-medium text-xs whitespace-nowrap">{p.w}-{p.l}</td>
                                        <td className="px-2.5 py-3.5 text-center text-slate-500 font-mono text-xs hidden sm:table-cell">{p.gf}</td>
                                        <td className="px-2.5 py-3.5 text-center text-slate-500 font-mono text-xs hidden sm:table-cell">{p.ga}</td>
                                        <td className={`px-2.5 py-3.5 text-center font-mono text-xs font-semibold hidden sm:table-cell ${p.gd > 0 ? 'text-emerald-400' : p.gd < 0 ? 'text-rose-400' : 'text-slate-500'}`}>
                                            {p.gd > 0 ? `+${p.gd}` : p.gd}
                                        </td>
                                        <td className="px-4 py-3.5 text-center font-bold text-cyan-400 text-base font-outfit">{p.pts}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        );
    };

    const bracket = useMemo(
        () => bracketData && bracketData.length > 0 ? processBracket(bracketData) : [],
        [bracketData]
    );
    const qfs = useMemo(() => bracket.filter(m => m.id.startsWith('QF')), [bracket]);
    const sfs = useMemo(() => bracket.filter(m => m.id.startsWith('SF')), [bracket]);
    const finalMatch = useMemo(() => bracket.find(m => m.id.startsWith('F')), [bracket]);

    const accentColors = ["cyan", "amber", "emerald", "rose", "purple", "cyan"];

    return (
        <motion.div
            className="space-y-12"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="grid lg:grid-cols-2 gap-5 mt-4">
                {Object.keys(standingsData.groups).sort().map((grp, idx) => (
                    <div key={grp} className="min-w-0">{renderTable(standingsData.groups[grp], `GROUP ${grp}`, false, accentColors[idx % accentColors.length])}</div>
                ))}
            </div>

            {/* Best Third Standings & Legend */}
            <div className="grid lg:grid-cols-3 gap-5 items-start">
                <div className="lg:col-span-2">
                    {standingsData.thirds && standingsData.thirds.length > 0 && (
                        renderTable(standingsData.thirds, "Best Third Place Rankings", true, "amber")
                    )}
                </div>
                <div className="glass-card rounded-2xl p-5 space-y-4 self-stretch flex flex-col justify-center">
                    <h4 className="font-outfit font-bold text-xs tracking-wider text-slate-400 uppercase">Standings Legend</h4>
                    <div className="space-y-3.5">
                        <div className="flex items-center gap-3">
                            <span className="w-6 h-6 flex items-center justify-center rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-extrabold uppercase animate-pulse">Q</span>
                            <div className="text-xs">
                                <span className="font-bold text-slate-300 block">Qualified</span>
                                <span className="text-slate-500 text-[10px]">Top 2 advance to Knockout</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-6 h-6 flex items-center justify-center rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[9px] font-extrabold uppercase">PO</span>
                            <div className="text-xs">
                                <span className="font-bold text-slate-300 block">Playoff / Wildcard</span>
                                <span className="text-slate-500 text-[10px]">Best thirds qualify/playoff</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-6 h-6 flex items-center justify-center rounded bg-white/[0.02] text-slate-500 border border-white/[0.04] text-[9px] font-extrabold uppercase">ELIM</span>
                            <div className="text-xs">
                                <span className="font-bold text-slate-300 block">Eliminated</span>
                                <span className="text-slate-500 text-[10px]">Does not advance to next stage</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Knockout Bracket */}
            {bracket.length > 0 && (
                <motion.div variants={itemVariants} className="mt-20 pt-16 border-t border-white/[0.04]">
                    <h2 className="text-2xl font-outfit font-bold flex items-center justify-center sm:justify-start gap-4 mb-12 text-white">
                        <div className="p-3 bg-amber-500/8 rounded-xl border border-amber-500/10">
                            <Trophy className="text-amber-400 w-6 h-6" />
                        </div>
                        <span>KNOCKOUT BRACKET</span>
                    </h2>

                    <div className="flex flex-col lg:flex-row justify-between items-center lg:items-center w-full min-w-max overflow-x-auto gap-10 py-16 pb-24 px-8 min-h-[600px] relative glass-card rounded-3xl">
                        {/* Background Effects */}
                        <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none rounded-3xl"></div>
                        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-purple-500/6 rounded-full blur-[120px] pointer-events-none"></div>
                        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/6 rounded-full blur-[120px] pointer-events-none"></div>

                        <BracketConnectors bracketData={bracket} />

                        {/* QF Left */}
                        <div className="flex flex-col justify-around w-full lg:w-80 shrink-0 space-y-20 z-10">
                            {qfs.filter(m => m.id === 'QF-1' || m.id === 'QF-2').map((match, idx) => (
                                <BracketMatchBox key={match.id} match={match} title={`Quarterfinal ${idx + 1}`} isAdmin={false} hideGames={true} />
                            ))}
                        </div>

                        {/* SF-1 */}
                        {sfs.filter(m => m.id === 'SF-1').length > 0 && (
                            <div className="flex flex-col justify-center w-full lg:w-80 shrink-0 z-10 px-4">
                                {sfs.filter(m => m.id === 'SF-1').map(match => (
                                    <BracketMatchBox key={match.id} match={match} title="Semifinal 1" isAdmin={false} hideGames={true} />
                                ))}
                            </div>
                        )}

                        {/* Final */}
                        {finalMatch && (
                            <div className="flex flex-col justify-center w-full lg:w-96 shrink-0 z-20 px-4 md:scale-110">
                                <motion.div
                                    className="text-center mb-8 relative"
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                >
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-amber-500/8 blur-[80px] rounded-full pointer-events-none"></div>
                                    <Trophy className="mx-auto text-amber-400 w-16 h-16 mb-5" />
                                    <h3 className="font-outfit font-black text-2xl text-white tracking-[0.2em] uppercase">Championship</h3>
                                    <p className="text-xs text-amber-400/70 font-semibold tracking-widest mt-2 uppercase">Best of 3 Series</p>
                                </motion.div>
                                <div className="glow-ring-gold rounded-2xl">
                                    <BracketMatchBox match={finalMatch} title="Grand Final" isAdmin={false} hideGames={true} />
                                </div>
                            </div>
                        )}

                        {/* SF-2 */}
                        {sfs.filter(m => m.id === 'SF-2').length > 0 && (
                            <div className="flex flex-col justify-center w-full lg:w-80 shrink-0 z-10 px-4">
                                {sfs.filter(m => m.id === 'SF-2').map(match => (
                                    <BracketMatchBox key={match.id} match={match} title="Semifinal 2" isAdmin={false} hideGames={true} />
                                ))}
                            </div>
                        )}

                        {/* QF Right */}
                        <div className="flex flex-col justify-around w-full lg:w-80 shrink-0 space-y-20 z-10">
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