import { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Lock, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getNavItems } from '../constants/navigation';
import logo from '../assets/pallet.jpg';

export default function Navbar({ currentPage, setCurrentPage, isAdmin, isLightMode, setIsLightMode, selectedSeason, setSelectedSeason, seasons, tournamentStarted, registrationOpen, votingEnabled }) {
    const [showNavbar, setShowNavbar] = useState(true);
    const [scrolled, setScrolled] = useState(false);
    const rafRef = useRef(null);

    useEffect(() => {
        let lastScrollY = window.scrollY;
        const handleScroll = () => {
            if (rafRef.current) return;
            rafRef.current = requestAnimationFrame(() => {
                const currentScrollY = window.scrollY;
                setScrolled(currentScrollY > 20);
                if (currentScrollY > lastScrollY && currentScrollY > 60 && !isAdmin) {
                    setShowNavbar(false);
                } else {
                    setShowNavbar(true);
                }
                lastScrollY = currentScrollY;
                rafRef.current = null;
            });
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [isAdmin]);

    const navItems = getNavItems({ tournamentStarted, isAdmin, votingEnabled, registrationOpen });

    const handleNav = (id) => {
        setCurrentPage(id);
    };

    return (
        <AnimatePresence>
            {showNavbar && (
                <>
                    <motion.nav
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    exit={{ y: -100 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                        ? 'bg-[#060a13]/85 backdrop-blur-2xl border-b border-white/[0.04] shadow-[0_4px_40px_rgba(0,0,0,0.4)]'
                        : 'bg-transparent border-b border-transparent'
                        }`}
                >
                    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 h-[72px] flex items-center justify-between relative gap-1 sm:gap-2">

                        {/* Logo */}
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="flex items-center gap-3.5 cursor-pointer relative z-10"
                            onClick={() => handleNav('home')}
                        >
                            <div className="h-10 sm:h-11 flex-shrink-0 rounded-xl overflow-hidden ring-1 ring-white/10 shadow-lg relative group bg-[#060a13] flex items-center">
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                                <img src={logo} alt="PES TOUR Logo" width="400" height="196" className="h-full w-auto object-contain relative px-2 py-1" />
                            </div>
                            <div className="hidden sm:flex flex-col">
                                <span className="font-outfit font-black text-lg tracking-tight text-white leading-none">
                                    PES TOUR
                                </span>
                                <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-cyan-400/60">
                                    Tournament
                                </span>
                            </div>
                        </motion.div>

                        {/* Desktop Nav Links */}
                        <div className="hidden lg:flex items-center gap-0.5 bg-white/[0.03] rounded-2xl p-1 border border-white/[0.04] mx-auto">
                            {navItems.map(item => {
                                const isActive = currentPage === item.id;
                                return (
                                    <motion.button
                                        key={item.id}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleNav(item.id)}
                                        className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all text-[13px] font-semibold tracking-wide whitespace-nowrap ${isActive
                                            ? 'text-white'
                                            : 'text-slate-400 hover:text-white'
                                            }`}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute inset-0 bg-white/[0.08] rounded-xl border border-white/[0.06]"
                                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                            />
                                        )}
                                        <item.icon className={`w-[15px] h-[15px] relative z-10 transition-colors ${isActive ? 'text-cyan-400' : ''}`} />
                                        <span className="relative z-10">{item.label}</span>
                                    </motion.button>
                                );
                            })}
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-1 sm:gap-2 relative z-10 shrink-0 ml-auto lg:ml-0">
                            {seasons && seasons.length > 1 && (
                                <div className="relative hidden sm:block">
                                    <select
                                        value={selectedSeason}
                                        onChange={(e) => setSelectedSeason(e.target.value)}
                                        className="appearance-none bg-white/[0.04] text-slate-300 text-xs font-semibold pl-3 pr-8 py-2 rounded-xl border border-white/[0.06] hover:border-cyan-500/20 focus:border-cyan-500/30 outline-none transition-all cursor-pointer"
                                    >
                                        {seasons.map(s => (
                                            <option key={s} value={s} className="bg-slate-900">{s === 'CURRENT' ? 'Active Season' : s}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="w-3 h-3 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                            )}

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsLightMode(prev => !prev)}
                                aria-label={isLightMode ? 'Switch to dark mode' : 'Switch to light mode'}
                                className={`p-1.5 sm:p-2 rounded-xl border transition-all ${isLightMode
                                    ? 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                                    : 'text-slate-500 border-white/[0.06] bg-white/[0.03] hover:text-white hover:bg-white/[0.06]'
                                    }`}
                            >
                                {isLightMode ? <Moon className="w-4 h-4" aria-hidden="true" /> : <Sun className="w-4 h-4" aria-hidden="true" />}
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleNav('admin')}
                                aria-label="Open admin panel"
                                className={`p-1.5 sm:p-2 rounded-xl border transition-all ${currentPage === 'admin'
                                    ? 'text-rose-400 bg-rose-500/10 border-rose-500/20'
                                    : 'text-slate-500 border-white/[0.06] bg-white/[0.03] hover:text-rose-400 hover:bg-rose-500/10'
                                    }`}
                            >
                                <Lock className="w-4 h-4" aria-hidden="true" />
                            </motion.button>
                        </div>
                    </div>
                </motion.nav>

                {/* Floating Bottom Nav for Mobile */}
                <motion.div
                    initial={{ y: 100, x: "-50%", opacity: 0 }}
                    animate={{ y: 0, x: "-50%", opacity: 1 }}
                    exit={{ y: 100, x: "-50%", opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="lg:hidden fixed bottom-6 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md"
                >
                    <div className="flex items-center justify-around bg-[#060a13]/85 backdrop-blur-2xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-2xl py-2 px-3">
                        {navItems.map(item => {
                            const isActive = currentPage === item.id;
                            return (
                                <motion.button
                                    key={item.id}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleNav(item.id)}
                                    aria-label={`Navigate to ${item.label}`}
                                    aria-current={isActive ? 'page' : undefined}
                                    className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${isActive
                                        ? 'text-cyan-400'
                                        : 'text-slate-400 hover:text-slate-200'
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTabMobile"
                                            className="absolute inset-0 bg-white/[0.06] rounded-xl border border-white/[0.04]"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    <item.icon className={`w-5 h-5 relative z-10 transition-colors ${isActive ? 'text-cyan-400' : ''}`} aria-hidden="true" />
                                    <span className="text-[9px] font-semibold mt-1 tracking-wide relative z-10">
                                        {item.label}
                                    </span>
                                </motion.button>
                            );
                        })}
                    </div>
                </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
