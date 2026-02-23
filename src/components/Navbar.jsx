import React from 'react';
import { Home, BarChart3, Gamepad2, Trophy, Settings, BookOpen, ShieldCheck, Sun, Moon } from 'lucide-react';
import logo from '../assets/pallet.jpg';

export default function Navbar({ currentPage, setCurrentPage, isAdmin, isLightMode, setIsLightMode }) {
    const navItems = [
        { id: 'home', icon: Home, label: 'Home' },
        { id: 'standings', icon: BarChart3, label: 'Standings' },
        { id: 'matches', icon: Gamepad2, label: 'Schedule' },
        { id: 'rules', icon: BookOpen, label: 'Rules' },
    ];

    if (isAdmin) {
        navItems.push({ id: 'knockout', icon: Trophy, label: 'Knockout' });
    }

    navItems.push({ id: 'admin', icon: Settings, label: 'Admin' });

    return (
        <nav className="sticky top-0 z-50 bg-[#0a0b10]/95 backdrop-blur-md border-b border-slate-800">
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
                    {isAdmin && (
                        <span className="flex items-center gap-1 text-[#C084FC] bg-[#C084FC]/10 px-2.5 py-1 rounded-md border border-[#C084FC]/20 text-xs font-bold">
                            <ShieldCheck className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Admin</span>
                        </span>
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
