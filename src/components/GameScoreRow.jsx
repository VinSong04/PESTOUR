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
        <div className="flex items-center justify-between text-sm bg-slate-900/40 backdrop-blur-md rounded-2xl p-4 border border-white/5 shadow-inner transition-all hover:bg-slate-900/60 hover:border-white/10 group/row">
            {p1Name && (
                <div className={`flex-1 text-right pr-6 font-outfit font-black tracking-wide truncate transition-colors ${p1Wins ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]' : p2Wins ? 'text-slate-600' : 'text-slate-300 group-hover/row:text-white'}`}>
                    {p1Name}
                </div>
            )}

            <div className="flex items-center gap-4 mx-auto">
                <div className="relative">
                    <ScoreInput val={p1Score} onChange={(v) => onChange(match.id, game, 'p1', v)} disabled={!isAdmin} isWinner={p1Wins} />
                    {p1Wins && <div className="absolute -top-1 -left-1 w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]"></div>}
                </div>

                <div className="flex flex-col items-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 bg-slate-950/50 px-3 py-1 rounded-full border border-white/5 shadow-inner min-w-[40px] text-center">
                        {label}
                    </span>
                    <AnimatePresence>
                        {isComplete && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="h-1 w-1 rounded-full bg-blue-500/50 mt-1"
                            />
                        )}
                    </AnimatePresence>
                </div>

                <div className="relative">
                    <ScoreInput val={p2Score} onChange={(v) => onChange(match.id, game, 'p2', v)} disabled={!isAdmin} isWinner={p2Wins} />
                    {p2Wins && <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]"></div>}
                </div>
            </div>

            {p2Name && (
                <div className={`flex-1 pl-6 font-outfit font-black tracking-wide truncate transition-colors ${p2Wins ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]' : p1Wins ? 'text-slate-600' : 'text-slate-300 group-hover/row:text-white'}`}>
                    {p2Name}
                </div>
            )}
        </div>
    );
})

function ScoreInput({ val, onChange, disabled, isWinner }) {
    const hasValue = val !== null && val !== undefined;
    
    if (disabled) {
        return (
            <div className={`w-12 h-12 flex items-center justify-center rounded-xl font-outfit font-black text-xl transition-all ${
                hasValue 
                    ? isWinner 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                        : 'bg-slate-800/80 text-white border border-white/5 shadow-lg'
                    : 'bg-slate-950/30 text-slate-700 border border-dashed border-white/5'
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
            className={`w-12 h-12 text-center bg-slate-950/50 border rounded-xl font-outfit font-black text-xl focus:ring-2 outline-none transition-all hide-arrows placeholder:text-slate-800 shadow-inner ${
                hasValue 
                    ? isWinner 
                        ? 'border-emerald-500/50 text-emerald-400 ring-emerald-500/20' 
                        : 'border-white/20 text-white focus:border-blue-500/50 ring-blue-500/20'
                    : 'border-white/5 text-slate-500 focus:border-blue-500/30'
            }`}
        />
    );
}
