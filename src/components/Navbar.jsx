import { useState, useEffect } from 'react';
import { Home, BarChart3, Gamepad2, BookOpen, Sun, Moon, UserPlus, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/pallet.jpg';
export default function Navbar({ currentPage, setCurrentPage, isAdmin, isLightMode, setIsLightMode, selectedSeason, setSelectedSeason, seasons, tournamentStarted, lastUpdated }) {
    const [showNavbar, setShowNavbar] = useState(true);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrolled(currentScrollY > 20);

            if (currentScrollY > lastScrollY && currentScrollY > 60 && !isAdmin) {
                setShowNavbar(false);
            } else {
                setShowNavbar(true);
            }
            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isAdmin]);

    const navItems = [
        { id: 'home', icon: Home, label: 'Home' },
        { id: 'register', icon: UserPlus, label: 'Register' },
    ];

    if (tournamentStarted || isAdmin) {
        navItems.push({ id: 'standings', icon: BarChart3, label: 'Standings' });
        navItems.push({ id: 'matches', icon: Gamepad2, label: 'Schedule' });
    }

    navItems.push({ id: 'rules', icon: BookOpen, label: 'Rules' });

    return (
        <AnimatePresence>
            {showNavbar && (
                <motion.nav
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    exit={{ y: -100 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${scrolled ? 'bg-[#0a0b10]/80 backdrop-blur-xl border-b border-white/10 shadow-lg' : 'bg-transparent border-b border-transparent'} `}
                >
                    <div className="max-w-7xl mx-auto px-4 lg:px-6 h-20 flex items-center justify-between relative">
                        {/* Background subtle glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>

                        {/* Logo Area */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-4 cursor-pointer relative z-10"
                            onClick={() => setCurrentPage('home')}
                        >
                            <div className="h-12 w-auto flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-0.5 overflow-hidden shadow-[0_0_20px_rgba(99,102,241,0.4)] group relative flex items-center justify-center">
                                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity z-20"></div>
                                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center relative overflow-hidden">
                                    <img src={logo} alt="PES TOUR Logo" className="h-[44px] w-auto object-contain relative z-10 group-hover:scale-105 transition-transform duration-500 rounded-lg p-0.5" />
                                </div>
                            </div>
                            <span className="font-outfit font-black text-2xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-100 hidden sm:block p-1">
                                PES TOUR
                            </span>
                        </motion.div>

                        {/* Navigation Links */}
                        <div className="flex space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar ml-auto mr-4 sm:mr-8 relative z-10 items-center h-full">
                            {navItems.map(item => {
                                const isActive = currentPage === item.id;
                                return (
                                    <motion.button
                                        key={item.id}
                                        whileHover={{ y: -2 }}
                                        whileTap={{ y: 0 }}
                                        onClick={() => setCurrentPage(item.id)}
                                        className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all text-sm font-bold tracking-wide overflow-hidden ${isActive
                                            ? 'text-white'
                                            : 'text-slate-400 hover:text-white'
                                            }`}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute inset-0 bg-blue-600/20 border border-blue-500/30 rounded-xl"
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            />
                                        )}
                                        <item.icon className={`w-4 h-4 relative z-10 ${isActive ? 'text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]' : ''}`} />
                                        <span className="hidden md:inline relative z-10">{item.label}</span>
                                    </motion.button>
                                )
                            })}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-4 relative z-10">
                            {seasons && seasons.length > 1 && (
                                <select
                                    value={selectedSeason}
                                    onChange={(e) => setSelectedSeason(e.target.value)}
                                    className="bg-slate-800/80 backdrop-blur-md text-blue-200 text-xs font-bold px-4 py-2.5 rounded-xl border border-white/10 hover:border-blue-500/50 focus:border-blue-400 outline-none transition-all shadow-inner cursor-pointer"
                                >
                                    {seasons.map(s => (
                                        <option key={s} value={s} className="bg-slate-900">{s === 'CURRENT' ? 'Active Season' : s}</option>
                                    ))}
                                </select>
                            )}


                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 15 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsLightMode(prev => !prev)}
                                className={`transition-all p-2.5 rounded-xl border ${isLightMode ? 'text-amber-400 bg-amber-500/10 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'text-slate-400 border-white/10 bg-white/5 hover:text-white hover:bg-white/10'}`}
                            >
                                {isLightMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setCurrentPage('admin')}
                                className={`transition-all p-2.5 rounded-xl border ${currentPage === 'admin' ? 'text-rose-400 bg-rose-500/10 border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.2)]' : 'text-slate-400 border-white/10 bg-white/5 hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/20'}`}
                                title="Admin Panel"
                            >
                                <Lock className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    );
}
