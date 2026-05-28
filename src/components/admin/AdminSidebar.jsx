import { motion } from 'framer-motion';
import { ShieldCheck, BarChart3, Settings, Users, Trophy, ThumbsUp, Flame, UserPlus, Gamepad2, X, Menu, Image } from 'lucide-react';

const ADMIN_TABS = [
    { id: 'overview', label: 'Overview', icon: BarChart3, color: 'blue' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'cyan' },
    { id: 'players', label: 'Players', icon: Users, color: 'emerald' },
    { id: 'matches', label: 'Matches', icon: Gamepad2, color: 'purple' },
    { id: 'roster', label: 'Registrations', icon: UserPlus, color: 'amber' },
    { id: 'season', label: 'Season', icon: Trophy, color: 'blue' },
    { id: 'poster', label: 'Poster', icon: Image, color: 'pink' },
    { id: 'voting', label: 'Voting', icon: ThumbsUp, color: 'indigo' },
    { id: 'danger', label: 'Danger Zone', icon: Flame, color: 'rose' },
];

const colorMap = {
    blue: { active: 'bg-blue-500/15 text-blue-400 border-blue-500/30', icon: 'text-blue-400', dot: 'bg-blue-400' },
    cyan: { active: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30', icon: 'text-cyan-400', dot: 'bg-cyan-400' },
    emerald: { active: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30', icon: 'text-emerald-400', dot: 'bg-emerald-400' },
    purple: { active: 'bg-purple-500/15 text-purple-400 border-purple-500/30', icon: 'text-purple-400', dot: 'bg-purple-400' },
    amber: { active: 'bg-amber-500/15 text-amber-400 border-amber-500/30', icon: 'text-amber-400', dot: 'bg-amber-400' },
    indigo: { active: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30', icon: 'text-indigo-400', dot: 'bg-indigo-400' },
    rose: { active: 'bg-rose-500/15 text-rose-400 border-rose-500/30', icon: 'text-rose-400', dot: 'bg-rose-400' },
    pink: { active: 'bg-pink-500/15 text-pink-400 border-pink-500/30', icon: 'text-pink-400', dot: 'bg-pink-400' },
};

export default function AdminSidebar({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen, seasonLabel }) {
    return (
        <>
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Mobile toggle */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="fixed top-4 left-4 z-50 lg:hidden p-3 bg-slate-900/90 border border-white/10 rounded-2xl text-white backdrop-blur-xl shadow-xl"
            >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 h-full w-[280px] bg-[#080c16]/95 backdrop-blur-2xl border-r border-white/[0.06] z-40 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen`}>
                {/* Logo area */}
                <div className="p-6 pb-4 border-b border-white/[0.06]">
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <ShieldCheck className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-lg font-outfit font-black text-white tracking-wider uppercase">Admin</h2>
                            <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">{seasonLabel}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3 px-1">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                        <span className="text-[9px] font-black text-emerald-400 tracking-[0.2em] uppercase">Live Sync</span>
                    </div>
                </div>

                {/* Nav items */}
                <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 no-scrollbar">
                    {ADMIN_TABS.map(tab => {
                        const isActive = activeTab === tab.id;
                        const colors = colorMap[tab.color];
                        const TabIcon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold tracking-wide transition-all relative group ${isActive ? `${colors.active} border` : 'text-slate-400 hover:text-white hover:bg-white/[0.04] border border-transparent'}`}
                            >
                                {isActive && (
                                    <motion.div layoutId="adminSidebarActive" className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-current" />
                                )}
                                <TabIcon className={`w-[18px] h-[18px] ${isActive ? colors.icon : 'text-slate-500 group-hover:text-slate-300'} transition-colors`} />
                                <span>{tab.label}</span>
                                {tab.id === 'danger' && <span className="w-2 h-2 rounded-full bg-rose-500 ml-auto shadow-[0_0_8px_rgba(244,63,94,0.6)]" />}
                            </button>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-white/[0.06]">
                    <p className="text-[9px] text-slate-600 font-bold tracking-widest uppercase text-center">PES TOUR • Admin v2</p>
                </div>
            </aside>
        </>
    );
}
