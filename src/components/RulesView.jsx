import React from 'react';
import { BookOpen, Gamepad2, BarChart3, ShieldCheck } from 'lucide-react';

export default function RulesView() {
    return (
        <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in zoom-in-95 duration-500">

            {/* Header */}
            <div className="text-center space-y-4 mb-12">
                <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-[#C084FC]/10 border border-[#C084FC]/20 text-[#C084FC] mb-2 shadow-[0_0_30px_rgba(192,132,252,0.15)]">
                    <BookOpen className="w-10 h-10" />
                </div>
                <h2 className="text-4xl font-black tracking-tight text-[#E2E8F0] uppercase">
                    Tournament Official Rules
                </h2>
                <p className="text-[#8B9BB4] text-lg max-w-2xl mx-auto">
                    Please review the format, scoring system, and qualification criteria for the Pallet PES Tour.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Match Format */}
                <div className="bg-[#131722] p-8 rounded-2xl border border-[#222B3D] shadow-xl hover:border-[#334155] transition-colors relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#10B981] opacity-[0.03] rounded-full blur-[40px] group-hover:opacity-[0.06] transition-opacity"></div>
                    <h3 className="text-xl font-black text-[#E2E8F0] mb-6 flex items-center gap-3 uppercase tracking-wider">
                        <div className="p-2 rounded-xl bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">
                            <Gamepad2 className="w-6 h-6" />
                        </div>
                        Match Format
                    </h3>
                    <div className="space-y-4 text-[#94A3B8]">
                        <p className="font-medium text-[#CBD5E1]">Every matchup is a <strong className="text-white">Best-of-3 series</strong>. The first player to win 2 games wins the series.</p>
                        <ul className="space-y-3">
                            <li className="flex gap-3">
                                <span className="text-[#10B981] font-bold mt-0.5">•</span>
                                <span>Each "game" is a full eFootball match.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-[#10B981] font-bold mt-0.5">•</span>
                                <span>The series ends immediately if a player wins the first 2 games (2-0).</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-[#10B981] font-bold mt-0.5">•</span>
                                <span>Game 3 is only played if the series is tied 1-1.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-[#10B981] font-bold mt-0.5">•</span>
                                <span>Goals from all games count towards overall Goal Difference.</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Points System */}
                <div className="bg-[#131722] p-8 rounded-2xl border border-[#222B3D] shadow-xl hover:border-[#334155] transition-colors relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#F59E0B] opacity-[0.03] rounded-full blur-[40px] group-hover:opacity-[0.06] transition-opacity"></div>
                    <h3 className="text-xl font-black text-[#E2E8F0] mb-6 flex items-center gap-3 uppercase tracking-wider">
                        <div className="p-2 rounded-xl bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20">
                            <BarChart3 className="w-6 h-6" />
                        </div>
                        Points System
                    </h3>
                    <div className="bg-[#0a0b10] rounded-xl border border-[#1E2738] p-2 mt-2">
                        <ul className="divide-y divide-[#1E2738]">
                            <li className="flex justify-between items-center p-4">
                                <span className="text-[#E2E8F0] font-medium">Win Series <strong className="text-white bg-[#334155] px-2 py-0.5 rounded ml-2">2 - 0</strong></span>
                                <span className="text-[#10B981] font-black tracking-widest">+3 PTS</span>
                            </li>
                            <li className="flex justify-between items-center p-4">
                                <span className="text-[#E2E8F0] font-medium">Win Series <strong className="text-white bg-[#334155] px-2 py-0.5 rounded ml-2">2 - 1</strong></span>
                                <span className="text-[#10B981] font-black tracking-widest">+2 PTS</span>
                            </li>
                            <li className="flex justify-between items-center p-4 bg-[#1A2234]">
                                <span className="text-[#E2E8F0] font-medium">Lose Series <strong className="text-[#94A3B8] bg-[#0a0b10] px-2 py-0.5 rounded ml-2 border border-[#334155]">1 - 2</strong></span>
                                <span className="text-[#F59E0B] font-black tracking-widest">+1 PTS</span>
                            </li>
                            <li className="flex justify-between items-center p-4 opacity-75">
                                <span className="text-[#94A3B8] font-medium">Lose Series <strong className="text-[#64748B] bg-[#0a0b10] px-2 py-0.5 rounded ml-2 border border-[#1E2738]">0 - 2</strong></span>
                                <span className="text-[#64748B] font-black tracking-widest">0 PTS</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Qualification & Tiebreakers */}
                <div className="md:col-span-2 bg-[#131722] p-8 rounded-2xl border border-[#222B3D] shadow-xl hover:border-[#334155] transition-colors relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#6384FF] opacity-[0.03] rounded-full blur-[60px] group-hover:opacity-[0.05] transition-opacity"></div>
                    <h3 className="text-xl font-black text-[#E2E8F0] mb-6 flex items-center gap-3 uppercase tracking-wider">
                        <div className="p-2 rounded-xl bg-[#6384FF]/10 text-[#6384FF] border border-[#6384FF]/20">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        Qualification & Tiebreakers
                    </h3>

                    <div className="grid md:grid-cols-2 gap-8 pt-2">
                        <div className="space-y-4">
                            <p className="font-bold text-[#E2E8F0] text-lg border-b border-[#222B3D] pb-3">
                                <span className="text-[#6384FF]">8 out of 12</span> players advance to the Knockout Stage:
                            </p>
                            <ul className="space-y-4 text-[#94A3B8]">
                                <li className="flex items-start gap-4 p-4 rounded-xl bg-[#0a0b10] border border-[#1E2738]">
                                    <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/20 text-[#60A5FA] flex items-center justify-center font-black flex-shrink-0">1</div>
                                    <p>The <strong className="text-white">Top 2</strong> from each group automatically qualify.</p>
                                </li>
                                <li className="flex items-start gap-4 p-4 rounded-xl bg-[#0a0b10] border border-[#1E2738]">
                                    <div className="w-8 h-8 rounded-lg bg-[#A855F7]/20 text-[#C084FC] flex items-center justify-center font-black flex-shrink-0">2</div>
                                    <p>The <strong className="text-white">Best 2 Third-Place</strong> finishers across all groups also advance.</p>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-4 md:border-l md:border-[#1E2738] md:pl-8">
                            <p className="font-bold text-[#E2E8F0] text-lg border-b border-[#222B3D] pb-3">
                                Tiebreaker Order:
                            </p>
                            <ol className="space-y-3">
                                <li className="flex items-center gap-3 text-[#CBD5E1]">
                                    <span className="text-[#64748B] font-mono font-bold">1.</span>
                                    <span className="font-bold text-white uppercase tracking-widest text-sm">Total Points (PTS)</span>
                                </li>
                                <li className="flex items-center gap-3 text-[#94A3B8]">
                                    <span className="text-[#64748B] font-mono font-bold">2.</span>
                                    <span>Goal Difference (GD)</span>
                                </li>
                                <li className="flex items-center gap-3 text-[#94A3B8]">
                                    <span className="text-[#64748B] font-mono font-bold">3.</span>
                                    <span>Goals For (GF)</span>
                                </li>
                                <li className="flex items-center gap-3 text-[#94A3B8]">
                                    <span className="text-[#64748B] font-mono font-bold">4.</span>
                                    <span>Alphabetical Order</span>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
