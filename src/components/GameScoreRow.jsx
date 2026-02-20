import React from 'react';

export default function GameScoreRow({ game, label, match, p1Name, p2Name, onChange, isAdmin }) {
    const p1Score = match[game].p1;
    const p2Score = match[game].p2;
    const isComplete = p1Score !== null && p2Score !== null;
    const p1Wins = isComplete && p1Score > p2Score;
    const p2Wins = isComplete && p2Score > p1Score;

    return (
        <div className="flex items-center justify-between text-sm bg-[#0a0b10] rounded-xl p-3 border border-[#1E2738] shadow-inner transition-colors hover:border-[#334155]/50">
            <div className={`flex-1 text-right pr-4 font-black tracking-wide truncate ${p1Wins ? 'text-[#10B981]' : p2Wins ? 'text-[#64748B]' : 'text-[#E2E8F0]'}`}>
                {p1Name}
            </div>

            <div className="flex items-center gap-3">
                <ScoreInput val={p1Score} onChange={(v) => onChange(match.id, game, 'p1', v)} disabled={!isAdmin} />
                <span className="text-[#64748B] text-[10px] font-black uppercase tracking-widest bg-[#131722] px-2 py-1 rounded-md border border-[#222B3D]">{label}</span>
                <ScoreInput val={p2Score} onChange={(v) => onChange(match.id, game, 'p2', v)} disabled={!isAdmin} />
            </div>

            <div className={`flex-1 pl-4 font-black tracking-wide truncate ${p2Wins ? 'text-[#10B981]' : p1Wins ? 'text-[#64748B]' : 'text-[#E2E8F0]'}`}>
                {p2Name}
            </div>
        </div>
    );
}

function ScoreInput({ val, onChange, disabled }) {
    if (disabled) {
        return (
            <div className={`w-9 h-9 flex items-center justify-center rounded-lg font-black text-lg ${val !== null ? 'bg-[#1E2738] text-white border border-[#334155] shadow-md' : 'bg-transparent text-[#475569] border border-dashed border-[#334155]'}`}>
                {val !== null ? val : '-'}
            </div>
        );
    }
    return (
        <input
            type="number"
            min="0"
            value={val === null ? '' : val}
            onChange={(e) => onChange(e.target.value)}
            className="w-10 h-10 text-center bg-[#131722] border border-[#334155] text-white font-black text-lg focus:border-[#4770FF] focus:ring-2 focus:ring-[#4770FF]/50 outline-none hide-arrows transition-all rounded-lg shadow-inner"
        />
    );
}
