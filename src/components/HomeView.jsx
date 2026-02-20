import React from 'react';
import { Trophy, ChevronDown } from 'lucide-react';
import logo from '../assets/pallet.jpg';

export default function HomeView({ data, setCurrentPage }) {
    const playedMatches = data.matches.filter(m => m.played).length;
    const totalMatches = data.matches.length;
    const progressPercent = totalMatches === 0 ? 0 : Math.round((playedMatches / totalMatches) * 100);

    return (
        <div className="space-y-8 animate-in fade-in duration-500 min-h-[80vh] flex flex-col justify-center">
            {/* Hero */}
            <div className="relative overflow-hidden rounded-3xl bg-[#0f141e] border border-[#222B3D] p-8 sm:p-14 text-center shadow-[0_0_50px_rgba(20,30,50,0.7)] group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] transition-opacity group-hover:opacity-[0.05] pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#4770FF] opacity-[0.03] blur-[120px] pointer-events-none rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C084FC] opacity-[0.03] blur-[120px] pointer-events-none rounded-full"></div>

                <div className="relative z-10 flex flex-col items-center">
                    <div className="inline-block w-32 h-32 rounded-full overflow-hidden border-2 border-[#334155]/50 mb-6 shadow-[0_0_30px_rgba(71,112,255,0.2)] bg-[#0a0b10]">
                        <img src={logo} alt="Pallet Logo" className="w-full h-full object-cover p-2" />
                    </div>
                    <h1 className="text-5xl sm:text-7xl font-black tracking-tighter mb-4 text-[#E2E8F0] drop-shadow-md">
                        {data.settings.name}
                    </h1>
                    <p className="text-xl sm:text-2xl text-[#64748B] font-medium mb-10 tracking-wide">
                        {data.settings.season} <span className="mx-2">•</span> <span className="text-[#10B981] font-bold drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">{data.settings.tagline}</span>
                    </p>

                    <div className="w-full max-w-lg bg-[#0a0b10] rounded-full p-2 border border-[#1E2738] shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
                        <div className="relative h-4 w-full bg-[#1A2234] rounded-full overflow-hidden">
                            <div
                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#4770FF] via-[#7B52FF] to-[#10B981] transition-all duration-1000 ease-out shadow-[0_0_10px_currentColor]"
                                style={{ width: `${progressPercent}%` }}
                            ></div>
                        </div>
                    </div>
                    <p className="mt-5 text-xs text-[#8B9BB4] font-black tracking-[0.2em] uppercase">
                        GROUP STAGE PROGRESS: {progressPercent}% / {playedMatches} OF {totalMatches} MATCHES COMPLETED
                    </p>
                </div>
            </div>

            {/* Jump to Standings Button */}
            <div className="flex justify-center pt-8">
                <button
                    onClick={() => setCurrentPage('standings')}
                    className="group flex flex-col items-center gap-3 text-[#64748B] hover:text-[#C084FC] transition-all duration-300"
                >
                    <span className="text-xs font-black tracking-[0.2em] uppercase drop-shadow-md">View Standings & Bracket</span>
                    <div className="p-3.5 rounded-full bg-[#0f141e] border border-[#222B3D] group-hover:border-[#C084FC]/40 group-hover:bg-[#C084FC]/10 shadow-lg transition-all animate-bounce mt-2 group-hover:shadow-[0_0_20px_rgba(192,132,252,0.2)]">
                        <ChevronDown className="w-5 h-5" />
                    </div>
                </button>
            </div>
        </div>
    );
}
