import { motion } from 'framer-motion';
import { Users, Zap, Settings, Shuffle, Flame } from 'lucide-react';

export default function AdminOverviewTab({ statCards, setActiveTab }) {
    const actions = [
        { label: 'Settings', icon: Settings, tab: 'settings', color: 'blue' },
        { label: 'Players', icon: Users, tab: 'players', color: 'emerald' },
        { label: 'Draw', icon: Shuffle, tab: 'season', color: 'amber' },
        { label: 'Reset', icon: Flame, tab: 'danger', color: 'rose' },
    ];

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((card, i) => (
                    <motion.div key={card.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                        className="bg-slate-900/60 border border-white/[0.06] rounded-2xl p-5 relative overflow-hidden group hover:border-white/[0.1] transition-all">
                        <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-[50px] pointer-events-none ${card.bg} opacity-60`} />
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 border ${card.bg} ${card.border}`}>
                            <card.icon className={`w-5 h-5 ${card.color}`} />
                        </div>
                        <p className="text-2xl font-outfit font-black text-white mb-0.5">{card.value}</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{card.label}</p>
                    </motion.div>
                ))}
            </div>
            <div className="bg-slate-900/60 border border-white/[0.06] rounded-2xl p-6">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" /> Quick Actions
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {actions.map(a => (
                        <button key={a.tab} onClick={() => setActiveTab(a.tab)}
                            className="flex flex-col items-center gap-3 p-5 rounded-xl bg-slate-950/40 border border-white/[0.06] hover:border-white/[0.12] transition-all group/a">
                            <a.icon className={`w-6 h-6 text-${a.color}-400 group-hover/a:scale-110 transition-transform`} />
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{a.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
