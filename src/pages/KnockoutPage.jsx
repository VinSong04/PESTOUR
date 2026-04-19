import { useState, useEffect, useMemo, useCallback } from 'react';
import { Trophy, XCircle, CircleDashed, Info, Lock } from 'lucide-react';
import BracketMatchBox from '../components/ui/BracketMatchBox';
import { processBracket } from '../utils/logic';
import { createEmptyGame } from '../utils/matchFactory';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer as containerVariants, springItem as itemVariants } from '../constants/animations';

// Wheel Draw Modal
function WheelModal({ qualifiedPlayers, onClose, onComplete }) {
    const [available, setAvailable] = useState([...qualifiedPlayers]);
    const [drawnMatches, setDrawnMatches] = useState([]);
    const [currentMatch, setCurrentMatch] = useState({ p1: null, p2: null });

    const [rotation, setRotation] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const [spinMessage, setSpinMessage] = useState("Ready to draw.");

    const colors = ['#22d3ee', '#3b82f6', '#34d399', '#fbbf24', '#a78bfa', '#f472b6', '#14b8a6', '#f97316'];

    const getConicGradient = () => {
        if (available.length === 0) return 'conic-gradient(#1e293b 0deg, #1e293b 360deg)';
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

        let targetIndex = Math.floor(Math.random() * available.length);
        let selectedPlayer = available[targetIndex];

        if (type === 'p2' && currentMatch.p1) {
            const possibleCrossGroup = available.filter(p => p.group !== currentMatch.p1.group);
            if (possibleCrossGroup.length > 0) {
                const forcedPick = possibleCrossGroup[Math.floor(Math.random() * possibleCrossGroup.length)];
                targetIndex = available.findIndex(p => p.id === forcedPick.id);
                selectedPlayer = forcedPick;
            } else {
                setSpinMessage("No cross-group available — same group match allowed.");
            }
        }

        const sliceAngle = 360 / available.length;
        const targetAngle = 360 - (targetIndex * sliceAngle + sliceAngle / 2);
        const spins = 5 * 360;
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
                    p1Logo: currentMatch.p1.logo || '',
                    p2Id: selectedPlayer.id,
                    p2Name: selectedPlayer.name,
                    p2Logo: selectedPlayer.logo || '',
                    played: false,
                    g1: createEmptyGame(), g2: createEmptyGame(), g3: createEmptyGame()
                };
                setDrawnMatches([...drawnMatches, newMatch]);
                setCurrentMatch({ p1: null, p2: null });
                setAvailable(available.filter(p => p.id !== selectedPlayer.id));
                setSpinMessage(`Match drawn!`);
            }
        }, 4000);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-4 backdrop-blur-md"
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="glass-card rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row relative"
            >
                {/* Left: Wheel */}
                <div className="flex-1 p-8 sm:p-10 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/[0.04] bg-white/[0.01] relative z-10">
                    <div className="relative w-60 h-60 sm:w-72 sm:h-72 mb-8">
                        {/* Pointer */}
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-l-[14px] border-r-[14px] border-t-[24px] border-l-transparent border-r-transparent border-t-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>

                        {/* Wheel */}
                        <div
                            className="w-full h-full rounded-full border-4 border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.6)] overflow-hidden relative"
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
                                        className="absolute top-1/2 left-1/2 origin-left font-outfit font-bold text-white tracking-wider text-xs whitespace-nowrap drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
                                        style={{
                                            transform: `translate(0, -50%) rotate(${rotate}deg) translateX(45px)`
                                        }}
                                    >
                                        {p.name}
                                    </div>
                                );
                            })}
                        </div>
                        {/* Center */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-[#060a13] border-4 border-white/10 rounded-full z-10 flex items-center justify-center">
                            <Trophy className="w-5 h-5 text-amber-500/40" />
                        </div>
                    </div>

                    <div className="text-center h-10 mb-3">
                        <p className={`font-outfit font-bold tracking-wider text-xs uppercase ${isSpinning ? 'text-amber-400 animate-pulse' : 'text-slate-500'}`}>{spinMessage}</p>
                    </div>

                    <div className="flex gap-3 mt-3 w-full justify-center">
                        <button
                            onClick={() => spin('p1')}
                            disabled={isSpinning || currentMatch.p1 !== null || available.length === 0}
                            className="flex-1 max-w-[140px] py-3.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-600 rounded-xl font-outfit font-bold uppercase tracking-wider text-sm transition-all"
                        >
                            Draw Home
                        </button>
                        <button
                            onClick={() => spin('p2')}
                            disabled={isSpinning || currentMatch.p1 === null || available.length === 0}
                            className="flex-1 max-w-[140px] py-3.5 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-600 rounded-xl font-outfit font-bold uppercase tracking-wider text-sm transition-all"
                        >
                            Draw Away
                        </button>
                    </div>
                </div>

                {/* Right: Panel */}
                <div className="flex-1 p-7 sm:p-8 flex flex-col relative z-10">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-outfit font-bold text-white tracking-wider uppercase">Draw Status</h3>
                        <button onClick={onClose} className="p-1.5 hover:bg-rose-500/10 rounded-lg text-slate-500 hover:text-rose-400 transition-colors">
                            <XCircle className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="bg-white/[0.02] rounded-xl p-4 border border-white/[0.04] mb-6">
                        <h4 className="text-[9px] text-slate-600 font-semibold uppercase tracking-[0.15em] mb-2">Current Matchup</h4>
                        <div className="flex items-center justify-between font-outfit font-bold text-lg">
                            <span className={currentMatch.p1 ? "text-cyan-400" : "text-slate-700"}>{currentMatch.p1 ? currentMatch.p1.name : '???'}</span>
                            <span className="text-slate-700 mx-3 text-xs font-bold">VS</span>
                            <span className={currentMatch.p2 ? "text-purple-400" : "text-slate-700"}>{currentMatch.p2 ? currentMatch.p2.name : '???'}</span>
                        </div>
                    </div>

                    <div className="flex-1">
                        <h4 className="text-[9px] text-slate-600 font-semibold uppercase tracking-[0.15em] mb-3">Generated Matches</h4>
                        <div className="space-y-2">
                            <AnimatePresence>
                                {drawnMatches.map((m, i) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: -15 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        key={i}
                                        className="flex justify-between items-center p-3 bg-white/[0.02] rounded-lg border border-white/[0.04] hover:border-white/[0.06] transition-colors"
                                    >
                                        <div className="px-1.5 py-0.5 bg-white/[0.04] rounded font-outfit font-bold text-[9px] text-slate-500 tracking-wider mr-3">
                                            M{i + 1}
                                        </div>
                                        <span className="flex-1 text-right font-outfit font-semibold text-cyan-300 text-sm">{m.p1Name}</span>
                                        <span className="mx-3 text-[9px] font-bold text-slate-700 uppercase">vs</span>
                                        <span className="flex-1 font-outfit font-semibold text-purple-300 text-sm">{m.p2Name}</span>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {drawnMatches.length === 0 && (
                                <div className="text-center py-8 border border-dashed border-white/[0.04] rounded-xl">
                                    <CircleDashed className="w-7 h-7 mx-auto text-slate-700 mb-2" />
                                    <p className="text-slate-600 font-medium text-xs">No matches drawn yet.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={() => onComplete(drawnMatches)}
                        disabled={drawnMatches.length < 4}
                        className="mt-6 w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-600 rounded-xl font-outfit font-bold tracking-wider uppercase transition-all text-sm"
                    >
                        {drawnMatches.length < 4 ? `Draw ${4 - drawnMatches.length} More` : 'Confirm Draw'}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function KnockoutView({ data, updateData, standingsData, isAdmin }) {
    const [spinnerOpen, setSpinnerOpen] = useState(false);
    const [bracketState, setBracketState] = useState(data.bracket || []);

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

    const handleScoreChange = useCallback((matchId, gameIndex, playerKey, val) => {
        if (!isAdmin) return;
        const numVal = val === '' ? null : parseInt(val, 10);
        let newBracket = bracketState.map(m => {
            if (m.id === matchId) return { ...m, [gameIndex]: { ...m[gameIndex], [playerKey]: numVal } };
            return m;
        });
        newBracket = processBracket(newBracket);
        setBracketState(newBracket);
        updateData({ ...data, bracket: newBracket });
    }, [isAdmin, bracketState, data, updateData]);

    const togglePlayed = useCallback((matchId) => {
        if (!isAdmin) return;
        let newBracket = bracketState.map(m => {
            if (m.id === matchId) return { ...m, played: !m.played };
            return m;
        });
        newBracket = processBracket(newBracket);
        setBracketState(newBracket);
        updateData({ ...data, bracket: newBracket });
    }, [isAdmin, bracketState, data, updateData]);

    const qfs = useMemo(() => bracketState.filter(m => m.id.startsWith('QF')), [bracketState]);
    const sfs = useMemo(() => bracketState.filter(m => m.id.startsWith('SF')), [bracketState]);
    const finalMatch = useMemo(() => bracketState.find(m => m.id.startsWith('F')), [bracketState]);

    return (
        <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Header */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 glass-card p-5 sm:p-6 rounded-2xl relative overflow-hidden group">
                <div className="relative z-10">
                    <h2 className="text-2xl font-outfit font-bold flex items-center gap-3 text-white tracking-wide uppercase">
                        <div className="p-2.5 bg-amber-500/8 rounded-xl border border-amber-500/10">
                            <Trophy className="text-amber-400 w-6 h-6" />
                        </div>
                        {isAdmin ? (
                            <>Knockout Draw <span className="text-amber-500/40 text-base ml-1">(Admin)</span></>
                        ) : 'Knockout Bracket'}
                    </h2>
                    <p className="text-xs font-medium text-slate-500 mt-2 ml-1">
                        {isAdmin ? 'Manage and draw the knockout bracket.' : 'View the tournament\'s final knockout stage.'}
                    </p>
                </div>

                {isAdmin ? (
                    <div className="flex gap-2.5 relative z-10 w-full md:w-auto">
                        <button
                            onClick={clearBracket}
                            disabled={bracketState.length === 0}
                            className="flex-1 md:flex-none px-5 py-3 bg-white/[0.03] hover:bg-rose-500/8 text-rose-400 rounded-xl text-[11px] font-semibold tracking-wider uppercase border border-white/[0.04] hover:border-rose-500/15 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
                        >
                            <XCircle className="w-3.5 h-3.5" /> Clear
                        </button>
                        <button
                            onClick={() => setSpinnerOpen(true)}
                            disabled={standingsData.qualified.length < 8 || qfs.length >= 4}
                            className="flex-1 md:flex-none px-5 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-white rounded-xl text-[11px] font-bold tracking-wider uppercase transition-all disabled:opacity-40 flex items-center justify-center gap-2 relative overflow-hidden group/btn"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <CircleDashed className="w-3.5 h-3.5 group-hover/btn:animate-spin" />
                                Spin Draw
                            </span>
                        </button>
                    </div>
                ) : (
                    <div className="bg-white/[0.03] px-3.5 py-2 rounded-lg border border-white/[0.04] text-[10px] font-semibold uppercase tracking-wider text-slate-600 flex items-center gap-2 relative z-10">
                        <Lock className="w-3.5 h-3.5" /> Admin required
                    </div>
                )}
            </motion.div>

            {/* No qualified yet */}
            {standingsData.qualified.length < 8 && bracketState.length === 0 && (
                <motion.div variants={itemVariants} className="bg-amber-500/[0.04] border border-amber-500/10 text-amber-300/80 p-7 rounded-2xl text-center relative overflow-hidden">
                    <Info className="w-8 h-8 mx-auto mb-3 text-amber-400/60 relative z-10" />
                    <p className="font-outfit font-bold text-xl text-white relative z-10">Group Stage Incomplete</p>
                    <p className="text-xs mt-1.5 text-amber-300/50 relative z-10 font-medium">Finish the group stage matches to generate the top 8 qualified players.</p>
                </motion.div>
            )}

            {/* Bracket Display */}
            <AnimatePresence mode="wait">
                {bracketState.length > 0 ? (
                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, y: 20 }}
                        className="mt-12 pt-10 border-t border-white/[0.04]"
                    >
                        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-center w-full min-w-max overflow-x-auto gap-10 py-16 pb-24 px-8 min-h-[600px] relative glass-card rounded-3xl">
                            <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none rounded-3xl"></div>
                            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-purple-500/6 rounded-full blur-[120px] pointer-events-none"></div>
                            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/6 rounded-full blur-[120px] pointer-events-none"></div>

                            {/* QF Left */}
                            <div className="flex flex-col justify-around w-full lg:w-80 shrink-0 space-y-20 z-10">
                                {qfs.filter(m => m.id === 'QF-1' || m.id === 'QF-2').map((match, idx) => (
                                    <BracketMatchBox
                                        key={match.id} match={match} title={`Quarterfinal ${idx + 1}`}
                                        isAdmin={isAdmin} togglePlayed={togglePlayed} handleScoreChange={handleScoreChange}
                                    />
                                ))}
                            </div>

                            {/* SF-1 */}
                            {sfs.filter(m => m.id === 'SF-1').length > 0 && (
                                <div className="flex flex-col justify-center w-full lg:w-80 shrink-0 z-10 px-4">
                                    {sfs.filter(m => m.id === 'SF-1').map(match => (
                                        <BracketMatchBox
                                            key={match.id} match={match} title="Semifinal 1"
                                            isAdmin={isAdmin} togglePlayed={togglePlayed} handleScoreChange={handleScoreChange}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Final */}
                            {finalMatch && (
                                <div className="flex flex-col justify-center w-full lg:w-96 shrink-0 z-20 px-4 md:scale-110">
                                    <motion.div
                                        className="text-center mb-8 relative"
                                        animate={{ y: [0, -8, 0] }}
                                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                    >
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-amber-500/8 blur-[80px] rounded-full pointer-events-none"></div>
                                        <Trophy className="mx-auto text-amber-400 w-16 h-16 mb-5" />
                                        <h3 className="font-outfit font-black text-2xl text-white tracking-[0.2em] uppercase">Championship</h3>
                                        <p className="text-xs text-amber-400/70 font-semibold tracking-widest mt-2 uppercase">Best of 3 Series</p>
                                    </motion.div>
                                    <div className="glow-ring-gold rounded-2xl">
                                        <BracketMatchBox
                                            match={finalMatch} title="Grand Final"
                                            isAdmin={isAdmin} togglePlayed={togglePlayed} handleScoreChange={handleScoreChange}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* SF-2 */}
                            {sfs.filter(m => m.id === 'SF-2').length > 0 && (
                                <div className="flex flex-col justify-center w-full lg:w-80 shrink-0 z-10 px-4">
                                    {sfs.filter(m => m.id === 'SF-2').map(match => (
                                        <BracketMatchBox
                                            key={match.id} match={match} title="Semifinal 2"
                                            isAdmin={isAdmin} togglePlayed={togglePlayed} handleScoreChange={handleScoreChange}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* QF Right */}
                            <div className="flex flex-col justify-around w-full lg:w-80 shrink-0 space-y-20 z-10">
                                {qfs.filter(m => m.id === 'QF-3' || m.id === 'QF-4').map((match, idx) => (
                                    <BracketMatchBox
                                        key={match.id} match={match} title={`Quarterfinal ${idx + 3}`}
                                        isAdmin={isAdmin} togglePlayed={togglePlayed} handleScoreChange={handleScoreChange}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    standingsData.qualified.length >= 8 && (
                        <motion.div
                            variants={itemVariants}
                            className="h-64 flex flex-col items-center justify-center border border-dashed border-white/[0.04] rounded-2xl glass-card mt-10"
                        >
                            <div className="p-4 rounded-2xl bg-white/[0.02] mb-5 border border-white/[0.04]">
                                <Trophy className="w-10 h-10 text-slate-600" />
                            </div>
                            <p className="font-outfit font-bold text-xl text-slate-400">No draw generated yet.</p>
                            {isAdmin && <p className="text-xs mt-2 text-slate-600 font-medium">Click &quot;Spin Draw&quot; to generate matchups.</p>}
                        </motion.div>
                    )
                )}
            </AnimatePresence>

            {/* Wheel Modal */}
            <AnimatePresence>
                {spinnerOpen && (
                    <WheelModal
                        qualifiedPlayers={standingsData.qualified}
                        onClose={() => setSpinnerOpen(false)}
                        onComplete={handleDrawComplete}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
}
