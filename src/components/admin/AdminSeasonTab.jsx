import { motion } from 'framer-motion';
import { Trophy, Zap, Users, AlertTriangle } from 'lucide-react';

export default function AdminSeasonTab({ approvedCount, onDrawGroups }) {
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-slate-900/60 border border-white/[0.06] rounded-2xl p-6 sm:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />
                <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                            <Trophy className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">Tournament Group Draw</h3>
                            <p className="text-xs text-slate-500">Randomly assign players into groups</p>
                        </div>
                    </div>
                    <p className="text-slate-400 text-sm">
                        Distribute <strong className="text-blue-400">{approvedCount} approved players</strong> into balanced groups with auto-generated round-robin matches.
                    </p>
                    <div className="flex items-start gap-3 p-4 bg-amber-500/5 border border-amber-500/15 rounded-xl">
                        <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                        <span className="text-amber-400 text-xs font-medium leading-relaxed">
                            This will overwrite all existing groups, matches, and knockout brackets.
                        </span>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="text-center">
                            <div className="w-20 h-20 rounded-full border-2 border-blue-500/20 bg-slate-950/50 flex flex-col items-center justify-center">
                                <span className="text-3xl font-black text-white">{approvedCount}</span>
                                <Users className="w-4 h-4 text-blue-400 mt-0.5" />
                            </div>
                            <p className="text-[9px] text-slate-500 font-bold mt-2 uppercase tracking-widest">Ready</p>
                        </div>
                        <motion.button
                            whileHover={approvedCount >= 2 ? { scale: 1.02 } : {}}
                            whileTap={approvedCount >= 2 ? { scale: 0.98 } : {}}
                            onClick={onDrawGroups} disabled={approvedCount < 2}
                            className={`flex-1 py-4 rounded-xl font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition-all ${approvedCount >= 2 ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'bg-slate-900 text-slate-600 cursor-not-allowed border border-white/[0.06]'}`}>
                            <Zap className="w-5 h-5" /> Generate Groups
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
