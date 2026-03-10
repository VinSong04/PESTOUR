import { BookOpen, Gamepad2, BarChart3, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RulesView() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100, damping: 15 }
        }
    };

    return (
        <motion.div
            className="max-w-4xl mx-auto space-y-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >

            {/* Header */}
            <motion.div variants={itemVariants} className="text-center space-y-6 mb-16 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none mix-blend-screen"></div>
                <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="inline-flex items-center justify-center p-5 rounded-3xl bg-purple-500/10 border border-purple-500/20 text-purple-400 mb-2 shadow-[0_0_40px_rgba(168,85,247,0.2)] backdrop-blur-md relative z-10"
                >
                    <BookOpen className="w-12 h-12" />
                </motion.div>
                <h2 className="text-5xl font-outfit font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-indigo-100 uppercase relative z-10 drop-shadow-sm">
                    Official Rules
                </h2>
                <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto font-medium relative z-10">
                    Review the format, scoring system, and qualification criteria for the Pallet PES Tour.
                </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Match Format */}
                <motion.div variants={itemVariants} className="bg-slate-900/80 backdrop-blur-xl p-8 rounded-[32px] border border-white/5 shadow-2xl hover:border-emerald-500/30 transition-all relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-[60px] group-hover:bg-emerald-500/20 transition-all duration-700 pointer-events-none mix-blend-screen"></div>
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

                    <h3 className="text-2xl font-outfit font-black text-white mb-8 flex items-center gap-4 uppercase tracking-wider relative z-10">
                        <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-inner">
                            <Gamepad2 className="w-6 h-6" />
                        </div>
                        Match Format
                    </h3>
                    <div className="space-y-5 text-slate-300 relative z-10">
                        <p className="font-medium text-slate-200">Every matchup is a <strong className="text-white bg-slate-800 px-2 py-1 rounded-lg border border-slate-700">Best-of-3 series</strong>. The first player to win 2 games wins the series.</p>
                        <ul className="space-y-4 pt-2">
                            <li className="flex gap-4 items-start">
                                <span className="text-emerald-400 font-bold mt-1 shadow-[0_0_8px_rgba(16,185,129,0.5)] bg-emerald-500/20 rounded-full w-2 h-2 shrink-0"></span>
                                <span>Each &quot;game&quot; is a full eFootball match.</span>
                            </li>
                            <li className="flex gap-4 items-start">
                                <span className="text-emerald-400 font-bold mt-1 shadow-[0_0_8px_rgba(16,185,129,0.5)] bg-emerald-500/20 rounded-full w-2 h-2 shrink-0"></span>
                                <span>The series ends immediately if a player wins the first 2 games (2-0).</span>
                            </li>
                            <li className="flex gap-4 items-start">
                                <span className="text-emerald-400 font-bold mt-1 shadow-[0_0_8px_rgba(16,185,129,0.5)] bg-emerald-500/20 rounded-full w-2 h-2 shrink-0"></span>
                                <span>Game 3 is only played if the series is tied 1-1.</span>
                            </li>
                            <li className="flex gap-4 items-start">
                                <span className="text-emerald-400 font-bold mt-1 shadow-[0_0_8px_rgba(16,185,129,0.5)] bg-emerald-500/20 rounded-full w-2 h-2 shrink-0"></span>
                                <span>Goals from all games count towards overall Goal Difference.</span>
                            </li>
                        </ul>
                    </div>
                </motion.div>

                {/* Points System */}
                <motion.div variants={itemVariants} className="bg-slate-900/80 backdrop-blur-xl p-8 rounded-[32px] border border-white/5 shadow-2xl hover:border-amber-500/30 transition-all relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-[60px] group-hover:bg-amber-500/20 transition-all duration-700 pointer-events-none mix-blend-screen"></div>
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

                    <h3 className="text-2xl font-outfit font-black text-white mb-8 flex items-center gap-4 uppercase tracking-wider relative z-10">
                        <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-inner">
                            <BarChart3 className="w-6 h-6" />
                        </div>
                        Points System
                    </h3>
                    <div className="bg-slate-950/80 rounded-2xl border border-white/5 p-2 mt-4 relative z-10 shadow-inner">
                        <ul className="divide-y divide-white/5">
                            <li className="flex justify-between items-center p-5 hover:bg-white/5 rounded-xl transition-colors">
                                <span className="text-slate-200 font-medium flex items-center gap-3">Win Series <strong className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-lg">2 - 0</strong></span>
                                <span className="text-emerald-400 font-outfit font-black tracking-[0.2em] drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">+3 PTS</span>
                            </li>
                            <li className="flex justify-between items-center p-5 hover:bg-white/5 rounded-xl transition-colors">
                                <span className="text-slate-200 font-medium flex items-center gap-3">Win Series <strong className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-lg">2 - 1</strong></span>
                                <span className="text-emerald-400 font-outfit font-black tracking-[0.2em]">+2 PTS</span>
                            </li>
                            <li className="flex justify-between items-center p-5 bg-slate-800/30 rounded-xl transition-colors">
                                <span className="text-slate-300 font-medium flex items-center gap-3">Lose Series <strong className="text-amber-400 bg-slate-900 px-3 py-1 rounded-lg border border-white/10">1 - 2</strong></span>
                                <span className="text-amber-400 font-outfit font-black tracking-[0.2em]">+1 PTS</span>
                            </li>
                            <li className="flex justify-between items-center p-5 opacity-70">
                                <span className="text-slate-400 font-medium flex items-center gap-3">Lose Series <strong className="text-slate-500 bg-slate-900 px-3 py-1 rounded-lg border border-white/5">0 - 2</strong></span>
                                <span className="text-slate-500 font-outfit font-black tracking-[0.2em]">0 PTS</span>
                            </li>
                        </ul>
                    </div>
                </motion.div>

                {/* Qualification & Tiebreakers */}
                <motion.div variants={itemVariants} className="md:col-span-2 bg-slate-900/80 backdrop-blur-xl p-8 sm:p-12 rounded-[40px] border border-white/5 shadow-2xl hover:border-blue-500/30 transition-all relative overflow-hidden group mt-4">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] group-hover:bg-blue-600/20 transition-all duration-700 pointer-events-none mix-blend-screen"></div>
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

                    <h3 className="text-2xl sm:text-3xl font-outfit font-black text-white mb-10 flex items-center gap-4 uppercase tracking-wider relative z-10">
                        <div className="p-4 rounded-3xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-inner">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        Qualification & Tiebreakers
                    </h3>

                    <div className="grid md:grid-cols-2 gap-12 relative z-10">
                        <div className="space-y-6">
                            <p className="font-bold text-slate-200 text-xl border-b border-white/10 pb-4">
                                <span className="text-blue-400 font-outfit tracking-wide drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]">8 out of 12</span> players advance:
                            </p>
                            <ul className="space-y-5 text-slate-300">
                                <li className="flex items-center gap-5 p-5 rounded-2xl bg-slate-950/50 border border-white/5 shadow-sm hover:bg-slate-800/50 transition-colors">
                                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-outfit font-black text-xl flex-shrink-0 shadow-inner">1</div>
                                    <p className="text-lg">The <strong className="text-white text-xl ml-1">Top 2</strong> <br /><span className="text-sm text-slate-500">from each group automatically qualify.</span></p>
                                </li>
                                <li className="flex items-center gap-5 p-5 rounded-2xl bg-slate-950/50 border border-white/5 shadow-sm hover:bg-slate-800/50 transition-colors">
                                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-outfit font-black text-xl flex-shrink-0 shadow-inner">2</div>
                                    <p className="text-lg">The <strong className="text-white text-xl ml-1">Best 2 Third</strong> <br /><span className="text-sm text-slate-500">place finishers across all groups advance.</span></p>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-6 md:border-l md:border-white/10 md:pl-10">
                            <p className="font-bold text-slate-200 text-xl border-b border-white/10 pb-4">
                                Tiebreaker Order:
                            </p>
                            <ol className="space-y-4 pt-2">
                                <li className="flex items-center gap-5 text-slate-200 p-3 rounded-xl hover:bg-white/5 transition-colors">
                                    <span className="text-slate-500 font-outfit font-black text-xl">1</span>
                                    <span className="font-outfit font-black text-white uppercase tracking-[0.2em]">Total Points (PTS)</span>
                                </li>
                                <li className="flex items-center gap-5 text-slate-400 p-3 rounded-xl hover:bg-white/5 transition-colors">
                                    <span className="text-slate-600 font-outfit font-black text-xl">2</span>
                                    <span className="font-bold tracking-wide">Goal Difference (GD)</span>
                                </li>
                                <li className="flex items-center gap-5 text-slate-400 p-3 rounded-xl hover:bg-white/5 transition-colors">
                                    <span className="text-slate-600 font-outfit font-black text-xl">3</span>
                                    <span className="font-bold tracking-wide">Goals For (GF)</span>
                                </li>
                                <li className="flex items-center gap-5 text-slate-400 p-3 rounded-xl hover:bg-white/5 transition-colors">
                                    <span className="text-slate-600 font-outfit font-black text-xl">4</span>
                                    <span className="font-bold tracking-wide">Alphabetical Order</span>
                                </li>
                            </ol>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
