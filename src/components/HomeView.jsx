import { BarChart3, Gamepad2, Trophy, UserPlus, Sparkles, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from '../assets/pallet.jpg';

export default function HomeView({ data, setCurrentPage, isAdmin }) {
    const isLive = data.settings.tournamentStarted || isAdmin;
    const playedMatches = data.matches.filter(m => m.played).length;
    const totalMatches = data.matches.length;
    const bracketPlayed = (data.bracket || []).filter(m => m.played).length;
    const bracketTotal = 7; // QFs + SFs + Final
    const allPlayed = playedMatches + bracketPlayed;
    const allTotal = totalMatches + bracketTotal;
    const progressPercent = allTotal === 0 ? 0 : Math.round((allPlayed / allTotal) * 100);
    const remaining = allTotal - allPlayed;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0, scale: 0.95 },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: { type: "spring", stiffness: 100, damping: 15 }
        }
    };

    return (
        <motion.div
            className="space-y-8 w-full max-w-5xl mx-auto flex flex-col justify-center mt-2 pb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Hero Section */}
            <motion.div
                variants={itemVariants}
                className="relative overflow-hidden rounded-[40px] bg-gradient-to-b from-[#0A0D14]/90 to-[#0A0D14] border border-white/5 py-20 px-8 sm:px-16 text-center shadow-2xl backdrop-blur-xl flex flex-col items-center group"
            >
                {/* Dynamic Background Glows */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none group-hover:bg-blue-600/30 transition-all duration-700"></div>
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-600/20 blur-[100px] rounded-full mix-blend-screen pointer-events-none group-hover:bg-purple-600/30 transition-all duration-700"></div>

                {/* Subtle Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-20"></div>

                <div className="relative z-10 flex flex-col items-center w-full">
                    {/* Season Badge */}
                    <motion.div
                        variants={itemVariants}
                        className="mb-10 px-5 py-2 rounded-full bg-white/5 border border-white/10 flex items-center gap-3 backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.05)]"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3B82F6]"
                        />
                        <span className="text-xs font-black tracking-[0.2em] uppercase text-blue-200/80">
                            {data.settings.season} SEASON
                        </span>
                        <Sparkles className="w-3.5 h-3.5 text-blue-400/70" />
                    </motion.div>

                    {/* Enhanced Logo */}
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.05, rotate: [-1, 1, -1] }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="mb-10 inline-flex items-center justify-center rounded-[2rem] bg-gradient-to-br from-blue-600 to-indigo-800 p-1 overflow-hidden shadow-[0_0_60px_rgba(79,70,229,0.5)] group relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>
                        <div className="w-full h-full bg-slate-950 rounded-[1.8rem] flex items-center justify-center relative overflow-hidden backdrop-blur-xl">
                            <img src={logo} alt="PES TOUR Logo" className="w-[320px] h-auto object-contain relative z-10 group-hover:scale-105 transition-transform duration-500 rounded-[1.8rem]" />
                        </div>
                    </motion.div>

                    {/* Typography */}
                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl sm:text-7xl font-outfit font-black tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-100 via-white to-blue-200 drop-shadow-sm uppercase w-full"
                    >
                        {data.settings.name}
                    </motion.h1>
                    <motion.p
                        variants={itemVariants}
                        className="text-blue-200/60 text-lg sm:text-2xl font-medium mb-14 tracking-wide w-full max-w-2xl px-4"
                    >
                        {data.settings.tagline}
                    </motion.p>

                    {/* Action Buttons */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row items-center gap-5 w-full justify-center max-w-[720px] mx-auto"
                    >
                        <motion.button
                            whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(245,158,11,0.4)" }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setCurrentPage('register')}
                            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-3 py-4 px-8 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-black tracking-wide transition-all border border-amber-400/30 text-base shadow-lg overflow-hidden relative group"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-700 ease-in-out"></div>
                            <UserPlus className="w-5 h-5 relative z-10" />
                            <span className="relative z-10">Register Now</span>
                        </motion.button>

                        {isLive ? (
                            <>
                                <motion.button
                                    whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(99,102,241,0.4)" }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setCurrentPage('standings')}
                                    className="w-full sm:w-auto flex-1 flex items-center justify-center gap-3 py-4 px-8 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-black tracking-wide transition-all border border-indigo-400/30 text-base shadow-lg overflow-hidden relative group"
                                >
                                    <div className="absolute inset-0 bg-white/20 translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-700 ease-in-out"></div>
                                    <BarChart3 className="w-5 h-5 relative z-10" />
                                    <span className="relative z-10">Standings</span>
                                    <ChevronRight className="w-4 h-4 opacity-70" />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.03, backgroundColor: "rgba(30,41,59,0.9)" }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setCurrentPage('matches')}
                                    className="w-full sm:w-auto flex-1 flex items-center justify-center gap-3 py-4 px-8 rounded-2xl bg-slate-800/80 backdrop-blur-md border border-slate-700 text-slate-200 font-black tracking-wide transition-all shadow-lg text-base hover:text-white"
                                >
                                    <Gamepad2 className="w-5 h-5" />
                                    <span>Schedule</span>
                                </motion.button>
                            </>
                        ) : (
                            <motion.button
                                whileHover={{ scale: 1.03, backgroundColor: "rgba(30,41,59,0.9)" }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setCurrentPage('rules')}
                                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-3 py-4 px-8 rounded-2xl bg-slate-800/80 backdrop-blur-md border border-slate-700 text-slate-200 font-black tracking-wide transition-all shadow-lg text-base hover:text-white"
                            >
                                <Gamepad2 className="w-5 h-5" />
                                <span>Info & Rules</span>
                            </motion.button>
                        )}
                    </motion.div>
                </div>
            </motion.div>

            {/* Tournament Progress Section */}
            {isLive && (
                <motion.div
                    variants={itemVariants}
                    className="bg-[#0A0D14]/80 backdrop-blur-xl rounded-[32px] border border-white/5 p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col justify-center group"
                >
                    <div className="absolute -top-32 -right-32 w-96 h-96 bg-sky-500/10 blur-[100px] pointer-events-none rounded-full group-hover:bg-sky-500/20 transition-all duration-700"></div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 relative z-10">
                        <div className="flex items-center gap-4">
                            <motion.div
                                animate={{ rotate: [0, 5, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                className="p-3 bg-amber-500/10 rounded-2xl border border-amber-500/20"
                            >
                                <Trophy className="w-8 h-8 text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.6)]" />
                            </motion.div>
                            <div>
                                <h2 className="text-slate-100 font-black tracking-wide text-2xl">Tournament Progress</h2>
                                <p className="text-slate-400 text-sm font-medium mt-1">Live tracking of all matches</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                                </span>
                                <span className="text-[11px] font-black text-emerald-400 tracking-widest uppercase">Live Sync</span>
                            </div>
                            <div className="flex-1 sm:flex-none text-center px-5 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs font-black text-blue-400 tracking-widest uppercase shadow-inner">
                                {progressPercent}% Complete
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 pt-4">
                        <div className="w-full h-4 bg-slate-900 rounded-full overflow-hidden border border-slate-800 shadow-inner mb-6 relative">
                            {/* Animated Background For Progress */}
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progressPercent}%` }}
                                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                                className="h-full rounded-full relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 via-sky-400 to-indigo-500"></div>
                                {/* Shimmer Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]"></div>
                            </motion.div>
                        </div>
                        <div className="flex justify-between items-center px-2">
                            <span className="text-slate-400 text-sm font-bold flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                                {allPlayed} of {allTotal} matches played
                            </span>
                            <span className="text-slate-500 text-sm font-medium flex items-center gap-2">
                                {remaining} remaining
                                <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                            </span>
                        </div>
                    </div>
                </motion.div>
            )}
            <style jsx>{`
                @keyframes shimmer {
                    100% {
                        transform: translateX(100%);
                    }
                }
            `}</style>
        </motion.div>
    );
}
