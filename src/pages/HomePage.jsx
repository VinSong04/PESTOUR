import { BarChart3, Gamepad2, Trophy, UserPlus, Sparkles, ChevronRight, Zap, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from '../assets/pallet.jpg';
import { staggerContainerDelayed as containerVariants, springItemHero as itemVariants } from '../constants/animations';

export default function HomeView({ data, setCurrentPage, isAdmin }) {
    const isLive = data.settings.tournamentStarted || isAdmin;
    const playedMatches = data.matches.filter(m => m.played).length;
    const totalMatches = data.matches.length;
    const bracketPlayed = (data.bracket || []).filter(m => m.played).length;
    const bracketTotal = 7;
    const allPlayed = playedMatches + bracketPlayed;
    const allTotal = totalMatches + bracketTotal;
    const progressPercent = allTotal === 0 ? 0 : Math.round((allPlayed / allTotal) * 100);
    const remaining = allTotal - allPlayed;

    return (
        <motion.div
            className="space-y-6 w-full max-w-5xl mx-auto flex flex-col justify-center mt-2 pb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Hero Section */}
            <motion.div
                variants={itemVariants}
                className="relative overflow-hidden rounded-3xl glass-card py-20 px-8 sm:px-16 text-center flex flex-col items-center group"
            >
                {/* Animated Background Mesh */}
                <div className="absolute inset-0 mesh-gradient pointer-events-none"></div>
                <div className="absolute top-[-20%] left-[10%] w-[400px] h-[400px] bg-cyan-500/8 blur-[120px] rounded-full pointer-events-none group-hover:bg-cyan-500/12 transition-all duration-1000"></div>
                <div className="absolute bottom-[-20%] right-[10%] w-[350px] h-[350px] bg-purple-500/8 blur-[100px] rounded-full pointer-events-none group-hover:bg-purple-500/12 transition-all duration-1000"></div>

                {/* Dot Grid */}
                <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none"></div>

                <div className="relative z-10 flex flex-col items-center w-full">
                    {/* Season Badge */}
                    <motion.div
                        variants={itemVariants}
                        className="mb-10 px-4 py-1.5 rounded-full bg-cyan-500/[0.06] border border-cyan-500/[0.12] flex items-center gap-2.5 backdrop-blur-sm"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ repeat: Infinity, duration: 2.5 }}
                            className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                        />
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-cyan-300/80">
                            {data.settings.season} SEASON
                        </span>
                        <Sparkles className="w-3 h-3 text-cyan-400/50" />
                    </motion.div>

                    {/* Logo */}
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="mb-10 inline-flex items-center justify-center rounded-2xl p-[3px] overflow-hidden shadow-[0_0_60px_rgba(34,211,238,0.12)] relative bg-gradient-to-br from-cyan-500/30 to-purple-500/30 w-full max-w-[260px] sm:max-w-[340px]"
                    >
                        <div className="w-full bg-[#060a13] rounded-[14px] flex items-center justify-center relative overflow-hidden aspect-[2/1]">
                            <img src={logo} alt="PES TOUR Logo" className="w-full h-full object-contain relative z-10 group-hover:scale-[1.03] transition-transform duration-700 p-2" />
                        </div>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl sm:text-7xl font-outfit font-black tracking-tighter mb-5 text-white uppercase w-full leading-[0.95]"
                    >
                        {data.settings.name}
                    </motion.h1>
                    <motion.p
                        variants={itemVariants}
                        className="text-slate-400 text-lg sm:text-xl font-medium mb-14 tracking-wide w-full max-w-xl px-4"
                    >
                        {data.settings.tagline}
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row items-center gap-3.5 w-full justify-center max-w-[680px] mx-auto"
                    >
                        <motion.button
                            whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(34,211,238,0.15)" }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setCurrentPage('register')}
                            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-3 py-4 px-8 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold tracking-wide transition-all text-[15px] relative overflow-hidden group/btn"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000"></div>
                            <UserPlus className="w-[18px] h-[18px] relative z-10" />
                            <span className="relative z-10">Register Now</span>
                        </motion.button>

                        {isLive ? (
                            <>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setCurrentPage('standings')}
                                    className="w-full sm:w-auto flex-1 flex items-center justify-center gap-3 py-4 px-8 rounded-2xl bg-white/[0.05] backdrop-blur-sm border border-white/[0.08] text-white font-bold tracking-wide transition-all text-[15px] hover:bg-white/[0.08] hover:border-white/[0.12]"
                                >
                                    <BarChart3 className="w-[18px] h-[18px] text-cyan-400" />
                                    <span>Standings</span>
                                    <ChevronRight className="w-4 h-4 opacity-40" />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setCurrentPage('matches')}
                                    className="w-full sm:w-auto flex-1 flex items-center justify-center gap-3 py-4 px-8 rounded-2xl bg-white/[0.05] backdrop-blur-sm border border-white/[0.08] text-white font-bold tracking-wide transition-all text-[15px] hover:bg-white/[0.08] hover:border-white/[0.12]"
                                >
                                    <Gamepad2 className="w-[18px] h-[18px] text-purple-400" />
                                    <span>Schedule</span>
                                </motion.button>
                            </>
                        ) : (
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setCurrentPage('rules')}
                                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-3 py-4 px-8 rounded-2xl bg-white/[0.05] backdrop-blur-sm border border-white/[0.08] text-white font-bold tracking-wide transition-all text-[15px] hover:bg-white/[0.08] hover:border-white/[0.12]"
                            >
                                <Gamepad2 className="w-[18px] h-[18px] text-cyan-400" />
                                <span>Info & Rules</span>
                            </motion.button>
                        )}
                    </motion.div>
                </div>
            </motion.div>

            {/* Tournament Progress */}
            {isLive && (
                <motion.div
                    variants={itemVariants}
                    className="glass-card rounded-3xl p-8 sm:p-10 relative overflow-hidden group"
                >
                    <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-500/6 blur-[80px] pointer-events-none rounded-full group-hover:bg-cyan-500/10 transition-all duration-700"></div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 mb-8 relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-amber-500/8 rounded-2xl border border-amber-500/10">
                                <motion.div
                                    animate={{ rotate: [0, 5, -5, 0] }}
                                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                >
                                    <Trophy className="w-7 h-7 text-amber-400" />
                                </motion.div>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white tracking-wide">Tournament Progress</h2>
                                <p className="text-slate-500 text-xs font-medium mt-0.5">Live tracking of all matches</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2.5 w-full sm:w-auto">
                            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/8 border border-emerald-500/10">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                <span className="text-[10px] font-bold text-emerald-400 tracking-wider uppercase">Live</span>
                            </div>
                            <div className="flex-1 sm:flex-none text-center px-4 py-1.5 rounded-lg bg-cyan-500/8 border border-cyan-500/10 text-[11px] font-bold text-cyan-400 tracking-wider uppercase">
                                {progressPercent}% Complete
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 pt-2">
                        <div className="w-full h-2.5 bg-slate-900/80 rounded-full overflow-hidden border border-white/[0.04] mb-5">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progressPercent}%` }}
                                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                                className="h-full rounded-full relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]"></div>
                            </motion.div>
                        </div>
                        <div className="flex justify-between items-center px-1">
                            <span className="text-slate-500 text-xs font-medium flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                                {allPlayed} of {allTotal} matches played
                            </span>
                            <span className="text-slate-600 text-xs font-medium flex items-center gap-2">
                                {remaining} remaining
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                            </span>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Quick Stats row if live */}
            {isLive && (
                <motion.div variants={itemVariants} className="grid grid-cols-3 gap-3">
                    <div className="glass-card rounded-2xl p-5 text-center group hover:border-cyan-500/10 transition-all">
                        <TrendingUp className="w-5 h-5 text-cyan-400 mx-auto mb-2 opacity-60 group-hover:opacity-100 transition-opacity" />
                        <div className="text-2xl font-outfit font-black text-white">{data.players.length}</div>
                        <div className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mt-1">Players</div>
                    </div>
                    <div className="glass-card rounded-2xl p-5 text-center group hover:border-purple-500/10 transition-all">
                        <Gamepad2 className="w-5 h-5 text-purple-400 mx-auto mb-2 opacity-60 group-hover:opacity-100 transition-opacity" />
                        <div className="text-2xl font-outfit font-black text-white">{allPlayed}</div>
                        <div className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mt-1">Played</div>
                    </div>
                    <div className="glass-card rounded-2xl p-5 text-center group hover:border-amber-500/10 transition-all">
                        <Zap className="w-5 h-5 text-amber-400 mx-auto mb-2 opacity-60 group-hover:opacity-100 transition-opacity" />
                        <div className="text-2xl font-outfit font-black text-white">{remaining}</div>
                        <div className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mt-1">Remaining</div>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}
