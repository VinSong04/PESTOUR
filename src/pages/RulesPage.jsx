import { BookOpen, Gamepad2, BarChart3, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { staggerContainer as containerVariants, springItem as itemVariants } from '../constants/animations';

export default function RulesView() {
    const BulletItem = ({ children }) => (
        <li className="flex gap-3.5 items-start">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/60 mt-2 shrink-0"></span>
            <span className="text-slate-300 font-medium text-[15px] leading-relaxed">{children}</span>
        </li>
    );

    return (
        <motion.div
            className="max-w-4xl mx-auto space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >

            {/* Header */}
            <motion.div variants={itemVariants} className="text-center space-y-5 mb-12 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-500/6 blur-[80px] rounded-full pointer-events-none"></div>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center justify-center p-4 rounded-2xl bg-purple-500/8 border border-purple-500/10 text-purple-400 mb-2 relative z-10"
                >
                    <BookOpen className="w-10 h-10" />
                </motion.div>
                <h2 className="text-4xl font-outfit font-black tracking-tighter text-white uppercase relative z-10">
                    Official Rules
                </h2>
                <p className="text-slate-500 text-base sm:text-lg max-w-xl mx-auto font-medium relative z-10">
                    Review the format, scoring system, and qualification criteria for the Pallet PES Tour.
                </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-5">
                {/* Match Format */}
                <motion.div variants={itemVariants} className="glass-card-hover p-7 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-emerald-500/10 transition-all duration-700"></div>

                    <h3 className="text-lg font-outfit font-bold text-white mb-6 flex items-center gap-3 uppercase tracking-wider relative z-10">
                        <div className="p-2 rounded-xl bg-emerald-500/8 text-emerald-400 border border-emerald-500/10">
                            <Gamepad2 className="w-5 h-5" />
                        </div>
                        Match Format
                    </h3>
                    <div className="space-y-4 relative z-10">
                        <p className="font-medium text-slate-200 text-[15px]">Every matchup is a <strong className="text-white bg-white/[0.06] px-2 py-0.5 rounded-md border border-white/[0.06]">Best-of-3 series</strong>. The first player to win 2 games wins the series.</p>
                        <ul className="space-y-3 pt-1">
                            <BulletItem>Each &quot;game&quot; is a full eFootball match.</BulletItem>
                            <BulletItem>The series ends immediately if a player wins the first 2 games (2-0).</BulletItem>
                            <BulletItem>Game 3 is only played if the series is tied 1-1.</BulletItem>
                            <BulletItem>Goals from all games count towards overall Goal Difference.</BulletItem>
                        </ul>
                    </div>
                </motion.div>

                {/* Points System */}
                <motion.div variants={itemVariants} className="glass-card-hover p-7 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-amber-500/10 transition-all duration-700"></div>

                    <h3 className="text-lg font-outfit font-bold text-white mb-6 flex items-center gap-3 uppercase tracking-wider relative z-10">
                        <div className="p-2 rounded-xl bg-amber-500/8 text-amber-400 border border-amber-500/10">
                            <BarChart3 className="w-5 h-5" />
                        </div>
                        Points System
                    </h3>
                    <div className="bg-white/[0.02] rounded-xl border border-white/[0.04] p-1 mt-2 relative z-10">
                        <ul className="divide-y divide-white/[0.03]">
                            <li className="flex justify-between items-center p-4 hover:bg-white/[0.02] rounded-lg transition-colors">
                                <span className="text-slate-200 font-medium flex items-center gap-2 text-sm">Win Series <strong className="text-emerald-400 bg-emerald-500/8 border border-emerald-500/10 px-2 py-0.5 rounded-md text-xs">2 - 0</strong></span>
                                <span className="text-emerald-400 font-outfit font-bold tracking-wider text-sm">+3 PTS</span>
                            </li>
                            <li className="flex justify-between items-center p-4 hover:bg-white/[0.02] rounded-lg transition-colors">
                                <span className="text-slate-200 font-medium flex items-center gap-2 text-sm">Win Series <strong className="text-emerald-400 bg-emerald-500/8 border border-emerald-500/10 px-2 py-0.5 rounded-md text-xs">2 - 1</strong></span>
                                <span className="text-emerald-400 font-outfit font-bold tracking-wider text-sm">+2 PTS</span>
                            </li>
                            <li className="flex justify-between items-center p-4 bg-white/[0.01] rounded-lg">
                                <span className="text-slate-400 font-medium flex items-center gap-2 text-sm">Lose Series <strong className="text-amber-400 bg-white/[0.03] px-2 py-0.5 rounded-md border border-white/[0.05] text-xs">1 - 2</strong></span>
                                <span className="text-amber-400 font-outfit font-bold tracking-wider text-sm">+1 PTS</span>
                            </li>
                            <li className="flex justify-between items-center p-4 opacity-60">
                                <span className="text-slate-500 font-medium flex items-center gap-2 text-sm">Lose Series <strong className="text-slate-600 bg-white/[0.02] px-2 py-0.5 rounded-md border border-white/[0.03] text-xs">0 - 2</strong></span>
                                <span className="text-slate-600 font-outfit font-bold tracking-wider text-sm">0 PTS</span>
                            </li>
                        </ul>
                    </div>
                </motion.div>

                {/* Qualification & Tiebreakers */}
                <motion.div variants={itemVariants} className="md:col-span-2 glass-card-hover p-7 sm:p-10 rounded-3xl relative overflow-hidden group mt-2">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-cyan-500/10 transition-all duration-700"></div>

                    <h3 className="text-xl font-outfit font-bold text-white mb-8 flex items-center gap-3 uppercase tracking-wider relative z-10">
                        <div className="p-2.5 rounded-xl bg-cyan-500/8 text-cyan-400 border border-cyan-500/10">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        Qualification & Tiebreakers
                    </h3>

                    <div className="grid md:grid-cols-2 gap-10 relative z-10">
                        <div className="space-y-5">
                            <p className="font-semibold text-slate-200 text-lg border-b border-white/[0.04] pb-3">
                                <span className="text-cyan-400 font-outfit">8 out of 12</span> players advance:
                            </p>
                            <ul className="space-y-3.5 text-slate-300">
                                <li className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.03] transition-colors">
                                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-outfit font-bold text-lg flex-shrink-0">1</div>
                                    <p className="text-base">The <strong className="text-white text-lg">Top 2</strong> <br /><span className="text-xs text-slate-500">from each group automatically qualify.</span></p>
                                </li>
                                <li className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.03] transition-colors">
                                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center font-outfit font-bold text-lg flex-shrink-0">2</div>
                                    <p className="text-base">The <strong className="text-white text-lg">Best 2 Third</strong> <br /><span className="text-xs text-slate-500">place finishers across all groups advance.</span></p>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-5 md:border-l md:border-white/[0.04] md:pl-10">
                            <p className="font-semibold text-slate-200 text-lg border-b border-white/[0.04] pb-3">
                                Tiebreaker Order:
                            </p>
                            <ol className="space-y-2.5 pt-1">
                                <li className="flex items-center gap-4 text-slate-200 p-3 rounded-lg hover:bg-white/[0.02] transition-colors">
                                    <span className="text-slate-600 font-outfit font-bold text-base">1</span>
                                    <span className="font-outfit font-bold text-white uppercase tracking-[0.15em] text-sm">Total Points (PTS)</span>
                                </li>
                                <li className="flex items-center gap-4 text-slate-500 p-3 rounded-lg hover:bg-white/[0.02] transition-colors">
                                    <span className="text-slate-700 font-outfit font-bold text-base">2</span>
                                    <span className="font-semibold tracking-wide text-sm">Goal Difference (GD)</span>
                                </li>
                                <li className="flex items-center gap-4 text-slate-500 p-3 rounded-lg hover:bg-white/[0.02] transition-colors">
                                    <span className="text-slate-700 font-outfit font-bold text-base">3</span>
                                    <span className="font-semibold tracking-wide text-sm">Goals For (GF)</span>
                                </li>
                                <li className="flex items-center gap-4 text-slate-500 p-3 rounded-lg hover:bg-white/[0.02] transition-colors">
                                    <span className="text-slate-700 font-outfit font-bold text-base">4</span>
                                    <span className="font-semibold tracking-wide text-sm">Alphabetical Order</span>
                                </li>
                            </ol>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
