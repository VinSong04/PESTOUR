import React, { useState, useEffect } from 'react';
import { Trophy, XCircle, CircleDashed, Info, Lock, Flame } from 'lucide-react';
import BracketMatchBox from './BracketMatchBox';
import { processBracket } from '../utils/logic';

// Complex Wheel Component directly defined here, or could be split further
function WheelModal({ qualifiedPlayers, onClose, onComplete }) {
    const [available, setAvailable] = useState([...qualifiedPlayers]);
    const [drawnMatches, setDrawnMatches] = useState([]);
    const [currentMatch, setCurrentMatch] = useState({ p1: null, p2: null });

    const [rotation, setRotation] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const [spinMessage, setSpinMessage] = useState("Ready to draw.");

    // Wheel Colors
    const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

    const getConicGradient = () => {
        if (available.length === 0) return 'conic-gradient(#334155 0deg, #334155 360deg)';
        const sliceAngle = 360 / available.length;
        let gradientParts = [];
        for (let i = 0; i < available.length; i++) {
            const start = i * sliceAngle;
            const end = (i + 1) * sliceAngle;
            gradientParts.push(`${colors[i % colors.length]} ${start}deg ${end}deg`);
        }
        return `conic-gradient(${gradientParts.join(', ')})`;
    };

    const spin = (type) => {
        if (isSpinning || available.length === 0) return;
        setIsSpinning(true);
        setSpinMessage(`Spinning for ${type === 'p1' ? 'Home' : 'Away'}...`);

        // Target index logic with constraint check
        let targetIndex = Math.floor(Math.random() * available.length);
        let selectedPlayer = available[targetIndex];

        if (type === 'p2' && currentMatch.p1) {
            // Check if we can avoid same group
            const possibleCrossGroup = available.filter(p => p.group !== currentMatch.p1.group);
            if (possibleCrossGroup.length > 0) {
                // We have options, pick one of them
                const forcedPick = possibleCrossGroup[Math.floor(Math.random() * possibleCrossGroup.length)];
                targetIndex = available.findIndex(p => p.id === forcedPick.id);
                selectedPlayer = forcedPick;
            } else {
                // Exception: only same group left
                setSpinMessage("No cross-group available — same group match allowed.");
            }
        }

        const sliceAngle = 360 / available.length;
        const targetAngle = 360 - (targetIndex * sliceAngle + sliceAngle / 2); // Center of slice
        const spins = 5 * 360; // 5 full rotations
        const finalRotation = rotation + spins + (targetAngle - (rotation % 360));

        setRotation(finalRotation);

        setTimeout(() => {
            setIsSpinning(false);

            if (type === 'p1') {
                setCurrentMatch({ p1: selectedPlayer, p2: null });
                setAvailable(available.filter(p => p.id !== selectedPlayer.id));
                setSpinMessage(`Home team selected: ${selectedPlayer.name}`);
            } else {
                const newMatch = {
                    id: `QF-${drawnMatches.length + 1}`,
                    p1Id: currentMatch.p1.id,
                    p1Name: currentMatch.p1.name,
                    p2Id: selectedPlayer.id,
                    p2Name: selectedPlayer.name,
                    played: false,
                    g1: { p1: null, p2: null }, g2: { p1: null, p2: null }, g3: { p1: null, p2: null }
                };
                setDrawnMatches([...drawnMatches, newMatch]);
                setCurrentMatch({ p1: null, p2: null });
                setAvailable(available.filter(p => p.id !== selectedPlayer.id));
                setSpinMessage(`Match drawn!`);
            }
        }, 4000); // 4s animation
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row shadow-2xl">

                {/* Left: Wheel */}
                <div className="flex-1 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-800 bg-slate-950/50">
                    <div className="relative w-64 h-64 sm:w-80 sm:h-80 mb-8">
                        {/* Pointer */}
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-l-[15px] border-r-[15px] border-t-[25px] border-l-transparent border-r-transparent border-t-white drop-shadow-md"></div>

                        {/* Wheel */}
                        <div
                            className="w-full h-full rounded-full border-4 border-slate-800 shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden relative"
                            style={{
                                background: getConicGradient(),
                                transform: `rotate(${rotation}deg)`,
                                transition: 'transform 4s cubic-bezier(0.2, 0.8, 0.2, 1)'
                            }}
                        >
                            {available.map((p, i) => {
                                const sliceAngle = 360 / available.length;
                                const rotate = i * sliceAngle + sliceAngle / 2;
                                return (
                                    <div
                                        key={p.id}
                                        className="absolute top-1/2 left-1/2 origin-left font-bold text-white tracking-wider text-sm whitespace-nowrap drop-shadow-md"
                                        style={{
                                            transform: `translate(0, -50%) rotate(${rotate}deg) translateX(40px)`
                                        }}
                                    >
                                        {p.name}
                                    </div>
                                );
                            })}
                        </div>
                        {/* Center Cap */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-slate-800 border-4 border-slate-700 rounded-full z-10 shadow-inner"></div>
                    </div>

                    <div className="text-center h-12">
                        <p className={`font-mono text-sm ${isSpinning ? 'text-amber-400 animate-pulse' : 'text-slate-400'}`}>{spinMessage}</p>
                    </div>

                    <div className="flex gap-4 mt-4 w-full justify-center">
                        <button
                            onClick={() => spin('p1')}
                            disabled={isSpinning || currentMatch.p1 !== null || available.length === 0}
                            className="flex-1 max-w-[150px] py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 rounded-xl font-bold transition-colors"
                        >
                            Spin for Home
                        </button>
                        <button
                            onClick={() => spin('p2')}
                            disabled={isSpinning || currentMatch.p1 === null || available.length === 0}
                            className="flex-1 max-w-[150px] py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-slate-800 disabled:text-slate-500 rounded-xl font-bold transition-colors"
                        >
                            Spin for Away
                        </button>
                    </div>
                </div>

                {/* Right: Panel */}
                <div className="flex-1 p-6 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-black">Live Draw Status</h3>
                        <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 transition-colors"><XCircle /></button>
                    </div>

                    <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 mb-6">
                        <h4 className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-2">Current Matchup</h4>
                        <div className="flex items-center justify-between font-bold text-lg">
                            <span className={currentMatch.p1 ? "text-blue-400" : "text-slate-600"}>{currentMatch.p1 ? currentMatch.p1.name : '???'}</span>
                            <span className="text-slate-700 mx-4">VS</span>
                            <span className={currentMatch.p2 ? "text-purple-400" : "text-slate-600"}>{currentMatch.p2 ? currentMatch.p2.name : '???'}</span>
                        </div>
                    </div>

                    <div className="flex-1">
                        <h4 className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-3">Generated Matches</h4>
                        <div className="space-y-2">
                            {drawnMatches.map((m, i) => (
                                <div key={i} className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                                    <span className="text-slate-400 text-sm font-mono mr-3">M{i + 1}</span>
                                    <span className="flex-1 text-right font-bold text-blue-300">{m.p1Name}</span>
                                    <span className="mx-3 text-xs text-slate-500">vs</span>
                                    <span className="flex-1 font-bold text-purple-300">{m.p2Name}</span>
                                </div>
                            ))}
                            {drawnMatches.length === 0 && <div className="text-center py-8 text-slate-600 text-sm italic">No matches drawn yet.</div>}
                        </div>
                    </div>

                    <button
                        onClick={() => onComplete(drawnMatches)}
                        disabled={drawnMatches.length < 4}
                        className="mt-6 w-full py-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 rounded-xl font-black tracking-widest uppercase transition-colors"
                    >
                        {drawnMatches.length < 4 ? `Draw ${4 - drawnMatches.length} More` : '✅ Confirm Draw'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function KnockoutView({ data, updateData, standingsData, isAdmin }) {
    const [spinnerOpen, setSpinnerOpen] = useState(false);
    const [bracketState, setBracketState] = useState(data.bracket || []);

    // Update effect if external data changes
    useEffect(() => {
        if (data.bracket && data.bracket.length > 0) {
            setBracketState(processBracket(data.bracket));
        } else {
            setBracketState([]);
        }
    }, [data.bracket]);

    const handleDrawComplete = (newMatches) => {
        const initialBracket = processBracket([...bracketState, ...newMatches]);
        setBracketState(initialBracket);
        updateData({ ...data, bracket: initialBracket });
        setSpinnerOpen(false);
    };

    const clearBracket = () => {
        if (window.confirm("Are you sure you want to clear the knockout bracket?")) {
            setBracketState([]);
            updateData({ ...data, bracket: [] });
        }
    };

    const handleScoreChange = (matchId, gameIndex, playerKey, val) => {
        if (!isAdmin) return;
        const numVal = val === '' ? null : parseInt(val, 10);
        let newBracket = bracketState.map(m => {
            if (m.id === matchId) return { ...m, [gameIndex]: { ...m[gameIndex], [playerKey]: numVal } };
            return m;
        });
        newBracket = processBracket(newBracket);
        setBracketState(newBracket);
        updateData({ ...data, bracket: newBracket });
    };

    const togglePlayed = (matchId) => {
        if (!isAdmin) return;
        let newBracket = bracketState.map(m => {
            if (m.id === matchId) return { ...m, played: !m.played };
            return m;
        });
        newBracket = processBracket(newBracket);
        setBracketState(newBracket);
        updateData({ ...data, bracket: newBracket });
    };

    const qfs = bracketState.filter(m => m.id.startsWith('QF'));
    const sfs = bracketState.filter(m => m.id.startsWith('SF'));
    const finalMatch = bracketState.find(m => m.id.startsWith('F'));

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
                <div>
                    <h2 className="text-2xl font-black flex items-center gap-2"><Trophy className="text-yellow-500" /> Knockout Draw (Admin)</h2>
                    <p className="text-sm text-slate-400 mt-1">Manage and draw the knockout bracket here.</p>
                </div>

                {isAdmin ? (
                    <div className="flex gap-2">
                        <button
                            onClick={clearBracket}
                            disabled={bracketState.length === 0}
                            className="px-4 py-2 bg-slate-800 hover:bg-red-900/50 text-red-400 rounded-lg text-sm font-bold border border-slate-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                            <XCircle className="w-4 h-4" /> Clear
                        </button>
                        <button
                            onClick={() => setSpinnerOpen(true)}
                            disabled={standingsData.qualified.length < 8 || qfs.length >= 4}
                            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-lg text-sm font-bold shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all disabled:opacity-50 flex items-center gap-2"
                        >
                            <CircleDashed className="w-4 h-4" />
                            Spin Draw
                        </button>
                    </div>
                ) : (
                    <div className="bg-slate-800/50 px-3 py-1.5 rounded border border-slate-700 text-xs text-slate-400 flex items-center gap-2">
                        <Lock className="w-3 h-3" /> Admin required for draw
                    </div>
                )}
            </div>

            {standingsData.qualified.length < 8 && bracketState.length === 0 && (
                <div className="bg-amber-900/20 border border-amber-500/30 text-amber-400 p-6 rounded-xl text-center">
                    <Info className="w-8 h-8 mx-auto mb-2 opacity-80" />
                    <p className="font-bold">Group Stage Incomplete</p>
                    <p className="text-sm mt-1 opacity-80">Finish the group stage matches to generate the top 8 qualified players.</p>
                </div>
            )}

            {/* Bracket Display */}
            {bracketState.length > 0 ? (
                <div className="space-y-12">
                    {/* Quarterfinals */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-purple-400 border-b border-purple-900/50 pb-2 flex items-center gap-2"><Trophy className="w-5 h-5" /> Quarterfinals</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            {qfs.map((match, idx) => (
                                <BracketMatchBox
                                    key={match.id} match={match} title={`Quarterfinal ${idx + 1}`}
                                    isAdmin={isAdmin} togglePlayed={togglePlayed} handleScoreChange={handleScoreChange}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Semifinals */}
                    {sfs.length > 0 && (
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-amber-400 border-b border-amber-900/50 pb-2 flex items-center gap-2"><Flame className="w-5 h-5" /> Semifinals</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                {sfs.map((match, idx) => (
                                    <BracketMatchBox
                                        key={match.id} match={match} title={`Semifinal ${idx + 1}`}
                                        isAdmin={isAdmin} togglePlayed={togglePlayed} handleScoreChange={handleScoreChange}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Grand Final */}
                    {finalMatch && (
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-yellow-400 border-b border-yellow-900/50 pb-2 flex items-center gap-2"><Trophy className="w-5 h-5" /> Grand Final</h3>
                            <div className="flex justify-center">
                                <div className="w-full max-w-lg">
                                    <BracketMatchBox
                                        match={finalMatch} title="Grand Final"
                                        isAdmin={isAdmin} togglePlayed={togglePlayed} handleScoreChange={handleScoreChange}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                standingsData.qualified.length >= 8 && (
                    <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-slate-800 rounded-2xl text-slate-500">
                        <Trophy className="w-12 h-12 mb-3 opacity-20" />
                        <p className="font-bold">No draw generated yet.</p>
                        {isAdmin && <p className="text-sm mt-1">Click "Spin Draw" to generate matchups.</p>}
                    </div>
                )
            )}

            {/* Wheel Modal */}
            {spinnerOpen && (
                <WheelModal
                    qualifiedPlayers={standingsData.qualified}
                    onClose={() => setSpinnerOpen(false)}
                    onComplete={handleDrawComplete}
                />
            )}
        </div>
    );
}
