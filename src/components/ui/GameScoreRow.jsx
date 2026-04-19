import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default memo(function GameScoreRow({ game, label, match, p1Name, p2Name, onChange, isAdmin }) {
    if (!match) return null;
    const gameData = match[game] || { p1: null, p2: null };
    const p1Score = gameData.p1;
    const p2Score = gameData.p2;
    const isComplete = p1Score !== null && p1Score !== undefined && p2Score !== null && p2Score !== undefined;
    const p1Wins = isComplete && p1Score > p2Score;
    const p2Wins = isComplete && p2Score > p1Score;

    return (
        <div className="flex items-center justify-between text-sm bg-white/[0.02] backdrop-blur-sm rounded-xl p-4 border border-white/[0.03] transition-all duration-500 hover:bg-white/[0.03] hover:border-white/[0.05] group/row relative overflow-hidden">

            {p1Name && (
                <div className={`flex-1 text-right pr-6 font-outfit font-bold tracking-tight truncate transition-all duration-500 ${p1Wins ? 'text-cyan-400 scale-105' : p2Wins ? 'text-slate-700' : 'text-slate-400 group-hover/row:text-slate-200'}`}>
                    {p1Name}
                </div>
            )}

            <div className="flex items-center gap-4 mx-auto relative z-10">
                <div className="relative">
                    <ScoreInput val={p1Score} onChange={(v) => onChange(match.id, game, 'p1', v)} disabled={!isAdmin} isWinner={p1Wins} isLoser={p2Wins} />
                    {p1Wins && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)] border border-white/20"></motion.div>
                    )}
                </div>

                <div className="flex flex-col items-center min-w-[45px]">
                    <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-slate-600 bg-white/[0.03] px-3 py-1 rounded-md border border-white/[0.04]">
                        {label}
                    </span>
                    <AnimatePresence>
                        {isComplete && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className={`h-0.5 w-6 rounded-full mt-1.5 ${p1Wins ? 'bg-cyan-500/30' : p2Wins ? 'bg-purple-500/30' : 'bg-slate-700/20'}`}
                            />
                        )}
                    </AnimatePresence>
                </div>

                <div className="relative">
                    <ScoreInput val={p2Score} onChange={(v) => onChange(match.id, game, 'p2', v)} disabled={!isAdmin} isWinner={p2Wins} isLoser={p1Wins} />
                    {p2Wins && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)] border border-white/20"></motion.div>
                    )}
                </div>
            </div>

            {p2Name && (
                <div className={`flex-1 pl-6 font-outfit font-bold tracking-tight truncate transition-all duration-500 ${p2Wins ? 'text-purple-400 scale-105' : p1Wins ? 'text-slate-700' : 'text-slate-400 group-hover/row:text-slate-200'}`}>
                    {p2Name}
                </div>
            )}
        </div>
    );
})

function ScoreInput({ val, onChange, disabled, isWinner, isLoser }) {
    const hasValue = val !== null && val !== undefined;

    const baseClasses = "w-12 h-12 flex items-center justify-center rounded-xl font-outfit font-bold text-xl transition-all duration-300 border";

    if (disabled) {
        return (
            <div className={`${baseClasses} ${hasValue
                ? isWinner
                    ? 'bg-cyan-500/8 text-cyan-400 border-cyan-500/20'
                    : isLoser
                        ? 'bg-white/[0.01] text-slate-600 border-white/[0.03]'
                        : 'bg-white/[0.03] text-white border-white/[0.06]'
                : 'bg-white/[0.01] text-slate-800 border-dashed border-white/[0.04]'
                }`}>
                {hasValue ? val : '-'}
            </div>
        );
    }

    return (
        <input
            type="number"
            min="0"
            value={hasValue ? val : ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="-"
            className={`${baseClasses} text-center bg-white/[0.02] outline-none hide-arrows placeholder:text-slate-800 ${hasValue
                ? isWinner
                    ? 'border-cyan-500/30 text-cyan-400 ring-2 ring-cyan-500/8'
                    : isLoser
                        ? 'border-white/[0.05] text-slate-500 opacity-60'
                        : 'border-white/[0.08] text-white focus:border-cyan-500/30 focus:ring-2 focus:ring-cyan-500/8'
                : 'border-white/[0.04] text-slate-500 focus:border-cyan-500/25 focus:ring-2 focus:ring-cyan-500/8'
                }`}
        />
    );
}
