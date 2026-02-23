import React from 'react';
import { BarChart3, Gamepad2, Trophy } from 'lucide-react';
import logo from '../assets/pallet.jpg';

export default function HomeView({ data, setCurrentPage }) {
    const playedMatches = data.matches.filter(m => m.played).length;
    const totalMatches = data.matches.length;
    const bracketPlayed = (data.bracket || []).filter(m => m.played).length;
    const bracketTotal = 7; // QFs + SFs + Final
    const allPlayed = playedMatches + bracketPlayed;
    const allTotal = totalMatches + bracketTotal;
    const progressPercent = allTotal === 0 ? 0 : Math.round((allPlayed / allTotal) * 100);
    const remaining = allTotal - allPlayed;

    return (
        <div className="space-y-6 animate-in fade-in duration-500 w-full max-w-5xl mx-auto flex flex-col justify-center mt-2 pb-12">
            {/* Hero */}
            <div className="relative overflow-hidden rounded-[32px] bg-[#0A0D14] border border-[#1E2738]/60 py-16 px-8 sm:px-16 text-center shadow-[0_0_50px_rgba(0,0,0,0.4)] flex flex-col items-center">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-[#6384FF] opacity-[0.04] blur-[150px] pointer-events-none rounded-full"></div>
                <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-[#C084FC] opacity-[0.03] blur-[100px] pointer-events-none rounded-full"></div>

                <div className="relative z-10 flex flex-col items-center w-full">
                    {/* Season Badge */}
                    <div className="mb-10 px-4 py-1.5 rounded-full bg-[#131C32] border border-[#2D3A5D]/50 flex items-center gap-2 shadow-inner">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#60A5FA] shadow-[0_0_8px_#60A5FA]"></div>
                        <span className="text-[11px] font-black tracking-widest uppercase text-[#8B9BB4]">{data.settings.season}</span>
                    </div>

                    {/* Logo */}
                    <div className="mb-10 inline-block overflow-hidden shadow-[0_0_40px_rgba(253,224,71,0.05)] border-2 border-[#FDE047]/10 rounded-[20px] bg-[#111827]">
                        <img src={logo} alt="Pallet Logo" className="w-[300px] h-auto object-cover block" />
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl sm:text-6xl md:text-[64px] font-black tracking-tighter mb-4 text-[#A5B4FC] drop-shadow-md uppercase w-full">
                        {data.settings.name}
                    </h1>
                    <p className="text-[#8B9BB4] text-lg sm:text-xl font-medium mb-12 tracking-wide w-full max-w-lg">
                        {data.settings.tagline}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center max-w-[440px] mx-auto">
                        <button
                            onClick={() => setCurrentPage('standings')}
                            className="w-full sm:w-1/2 flex items-center justify-center gap-2 py-4 px-6 rounded-[20px] bg-gradient-to-r from-[#8B78FF] to-[#6384FF] hover:from-[#7863FF] hover:to-[#4A6BFF] text-white font-black tracking-wide transition-all shadow-[0_0_20px_rgba(99,132,255,0.25)] border border-[#8B78FF]/30 text-sm"
                        >
                            <BarChart3 className="w-4 h-4" /> View Standings
                        </button>
                        <button
                            onClick={() => setCurrentPage('matches')}
                            className="w-full sm:w-1/2 flex items-center justify-center gap-2 py-4 px-6 rounded-[20px] bg-[#131A2B] hover:bg-[#1E2738] border border-[#222B3D] text-[#E2E8F0] font-black tracking-wide transition-all shadow-md text-sm"
                        >
                            <Gamepad2 className="w-4 h-4" /> Enter Scores
                        </button>
                    </div>
                </div>
            </div>

            {/* Tournament Progress Section */}
            <div className="bg-[#0A0D14] rounded-[24px] border border-[#1E2738]/60 p-8 sm:p-10 shadow-[0_0_40px_rgba(0,0,0,0.3)] relative overflow-hidden flex flex-col justify-center">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#38BDF8] opacity-[0.02] blur-[80px] pointer-events-none rounded-full"></div>

                <div className="flex justify-between items-center mb-6 relative z-10">
                    <div className="flex items-center gap-3 mt-1">
                        <Trophy className="w-6 h-6 text-[#F59E0B] drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                        <h2 className="text-[#F8FAFC] font-black tracking-wide text-lg sm:text-xl">Tournament Progress</h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/20">
                            <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse shadow-[0_0_8px_#10B981]"></div>
                            <span className="text-[10px] font-black text-[#10B981] tracking-widest uppercase mt-0.5">LIVE SYNC</span>
                        </div>
                        <div className="px-3.5 py-1.5 rounded-full bg-[#131C32] border border-[#2D3A5D]/50 text-[10px] font-black text-[#8B78FF] tracking-widest uppercase mt-0.5">
                            {progressPercent}% Complete
                        </div>
                    </div>
                </div>

                <div className="relative z-10">
                    <div className="w-full h-3 md:h-3.5 bg-[#131A2B] rounded-full overflow-hidden border border-[#1E2738] shadow-inner mb-4">
                        <div
                            className="h-full bg-gradient-to-r from-[#2DD4BF] via-[#38BDF8] to-[#93A5FF] rounded-full transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(56,189,248,0.4)]"
                            style={{ width: `${progressPercent}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-between items-center px-1">
                        <span className="text-[#8B9BB4] text-xs font-bold">{allPlayed} of {allTotal} matches played</span>
                        <span className="text-[#475569] text-xs font-medium">{remaining} remaining</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
