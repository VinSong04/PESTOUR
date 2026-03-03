import React, { useState, useEffect } from 'react';
import { Home, BarChart3, Gamepad2, Trophy, Settings, BookOpen, ShieldCheck, Sun, Moon, UserPlus } from 'lucide-react';
import logo from '../assets/pallet.jpg';

export default function Navbar({ currentPage, setCurrentPage, isAdmin, isLightMode, setIsLightMode, selectedSeason, setSelectedSeason, seasons, tournamentStarted }) {
    const [showNavbar, setShowNavbar] = useState(true);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 60) {
                setShowNavbar(false);
            } else {
                setShowNavbar(true);
            }
            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { id: 'home', icon: Home, label: 'Home' },
        { id: 'register', icon: UserPlus, label: 'Register' },
    ];

    if (tournamentStarted || isAdmin) {
        navItems.push({ id: 'standings', icon: BarChart3, label: 'Standings' });
        navItems.push({ id: 'matches', icon: Gamepad2, label: 'Schedule' });
    }

    navItems.push({ id: 'rules', icon: BookOpen, label: 'Rules' });



    // Admin is accessed via URL hash (#admin) — no nav button needed

    return (
        <nav className={`sticky top-0 z-50 bg-[#0a0b10]/95 backdrop-blur-md border-b border-slate-800 transition-transform duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}>
            <div className="max-w-7xl mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
                    <div className="w-10 h-10 flex-shrink-0">
                        <img src={logo} alt="Pallet Logo" className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(71,112,255,0.4)]" />
                    </div>
                    <span className="font-black text-2xl tracking-tighter text-[#A1B1DA] hidden sm:block font-sans" style={{ textShadow: "0 0 10px rgba(161,177,218,0.3)" }}>
                        PES TOUR
                    </span>
                </div>

                <div className="flex space-x-1 overflow-x-auto no-scrollbar ml-auto mr-8">
                    {navItems.map(item => {
                        const isActive = currentPage === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setCurrentPage(item.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-bold tracking-wide ${isActive
                                    ? 'bg-[#18233C] text-[#6384FF] shadow-[inset_0_1px_rgba(100,130,255,0.2)]'
                                    : 'text-[#8B9BB4] hover:text-[#C5D3EB] hover:bg-[#151D2E]'
                                    }`}
                            >
                                <item.icon className="w-4 h-4" />
                                <span className="hidden md:inline">{item.label}</span>
                            </button>
                        )
                    })}
                </div>

                <div className="flex items-center gap-4">
                    {seasons && seasons.length > 1 && (
                        <select
                            value={selectedSeason}
                            onChange={(e) => setSelectedSeason(e.target.value)}
                            className="bg-[#18233C] text-[#C5D3EB] text-xs font-bold px-3 py-1.5 rounded-lg border border-[#222B3D] hover:border-[#6384FF]/50 focus:border-[#6384FF] outline-none transition-colors shadow-inner"
                        >
                            {seasons.map(s => (
                                <option key={s} value={s}>{s === 'CURRENT' ? 'Active Season' : s}</option>
                            ))}
                        </select>
                    )}
                    <button
                        onClick={() => setIsLightMode(prev => !prev)}
                        className={`transition-colors p-2 rounded-lg ${isLightMode ? 'text-amber-500 bg-amber-500/10 hover:bg-amber-500/20' : 'text-[#8B9BB4] hover:text-white hover:bg-[#1E2738]'}`}
                    >
                        {isLightMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                    </button>
                </div>
            </div>
        </nav>
    );
}
