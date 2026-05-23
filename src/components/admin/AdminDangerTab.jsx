import { motion } from 'framer-motion';
import { Flame, RefreshCw } from 'lucide-react';

export default function AdminDangerTab({ onReset }) {
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-slate-900/60 border border-rose-500/20 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-72 h-72 bg-rose-500/8 rounded-full blur-[80px] pointer-events-none" />
                <div className="relative z-10 space-y-6">
                    <h3 className="text-xl font-bold flex items-center gap-3 text-rose-400">
                        <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20">
                            <Flame className="w-5 h-5 animate-pulse" />
                        </div>
                        Danger Zone
                    </h3>
                    <div className="bg-rose-500/5 border border-rose-500/15 rounded-xl p-5">
                        <p className="text-rose-200/80 text-sm leading-relaxed">
                            Resetting the tournament will <strong className="text-rose-400">permanently wipe</strong> the active season's scores, matches, bracket, and roster.
                            Archived seasons in history are kept safe.
                        </p>
                        <p className="text-rose-300 text-xs font-bold mt-3 uppercase tracking-widest">This action cannot be undone.</p>
                    </div>
                    <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={onReset}
                        className="w-full py-5 bg-gradient-to-r from-rose-600 to-red-600 text-white rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(244,63,94,0.2)] hover:shadow-[0_0_30px_rgba(244,63,94,0.4)] transition-all">
                        <RefreshCw className="w-5 h-5" /> Factory Reset Season
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}
