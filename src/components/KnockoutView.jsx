import { useState, useEffect, useMemo, useCallback } from 'react';
import { Trophy, XCircle, CircleDashed, Info, Lock } from 'lucide-react';
import BracketMatchBox from './BracketMatchBox';
import { processBracket } from '../utils/logic';
import { createEmptyGame } from '../utils/matchFactory';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer as containerVariants, springItem as itemVariants } from '../constants/animations';

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
        }, 4000); // 4s animation
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-md"
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-[32px] w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row shadow-2xl relative"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-[32px] pointer-events-none"></div>

                {/* Left: Wheel */}
                <div className="flex-1 p-8 sm:p-12 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/5 bg-slate-950/50 relative z-10">
                    <div className="relative w-64 h-64 sm:w-80 sm:h-80 mb-10">
                        {/* Pointer */}
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-l-[18px] border-r-[18px] border-t-[30px] border-l-transparent border-r-transparent border-t-white drop-shadow-[0_0_15px_rgba(255,255,255,0.7)]"></div>

                        {/* Wheel */}
                        <div
                            className="w-full h-full rounded-full border-[6px] border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden relative"
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
                                        className="absolute top-1/2 left-1/2 origin-left font-outfit font-black text-white tracking-wider text-sm whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                                        style={{
                                            transform: `translate(0, -50%) rotate(${rotate}deg) translateX(50px)`
                                        }}
                                    >
                                        {p.name}
                                    </div>
                                );
                            })}
                        </div>
                        {/* Center Cap */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-slate-900 border-[6px] border-slate-800 rounded-full z-10 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] flex items-center justify-center">
                            <Trophy className="w-6 h-6 text-amber-500 opacity-50" />
                        </div>
                    </div>

                    <div className="text-center h-12 mb-4">
                        <p className={`font-outfit font-black tracking-widest text-sm uppercase ${isSpinning ? 'text-amber-400 animate-pulse drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]' : 'text-slate-400'}`}>{spinMessage}</p>
                    </div>

                    <div className="flex gap-4 mt-4 w-full justify-center">
                        <button
                            onClick={() => spin('p1')}
                            disabled={isSpinning || currentMatch.p1 !== null || available.length === 0}
                            className="flex-1 max-w-[150px] py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-600 rounded-2xl font-outfit font-black uppercase tracking-wider transition-all shadow-lg disabled:shadow-none"
                        >
                            Draw Home
                        </button>
                        <button
                            onClick={() => spin('p2')}
                            disabled={isSpinning || currentMatch.p1 === null || available.length === 0}
                            className="flex-1 max-w-[150px] py-4 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-600 rounded-2xl font-outfit font-black uppercase tracking-wider transition-all shadow-lg disabled:shadow-none"
                        >
                            Draw Away
                        </button>
                    </div>
                </div>

                {/* Right: Panel */}
                <div className="flex-1 p-8 sm:p-10 flex flex-col relative z-10">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-2xl font-outfit font-black text-white tracking-widest uppercase">Draw Status</h3>
                        <button onClick={onClose} className="p-2 hover:bg-rose-500/20 rounded-full text-slate-400 hover:text-rose-400 transition-colors">
                            <XCircle className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="bg-slate-950/80 rounded-2xl p-5 border border-white/5 mb-8 shadow-inner">
                        <h4 className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mb-3">Current Matchup</h4>
                        <div className="flex items-center justify-between font-outfit font-black text-xl">
                            <span className={currentMatch.p1 ? "text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]" : "text-slate-700"}>{currentMatch.p1 ? currentMatch.p1.name : '???'}</span>
                            <span className="text-slate-700 mx-4 text-sm font-black">VS</span>
                            <span className={currentMatch.p2 ? "text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" : "text-slate-700"}>{currentMatch.p2 ? currentMatch.p2.name : '???'}</span>
                        </div>
                    </div>

                    <div className="flex-1">
                        <h4 className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mb-4">Generated Matches</h4>
                        <div className="space-y-3">
                            <AnimatePresence>
                                {drawnMatches.map((m, i) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        key={i}
                                        className="flex justify-between items-center p-4 bg-slate-900/60 rounded-xl border border-white/5 hover:border-white/10 transition-colors"
                                    >
                                        <div className="px-2 py-1 bg-slate-800 rounded font-outfit font-black text-[10px] text-slate-400 tracking-wider mr-4">
                                            M{i + 1}
                                        </div>
                                        <span className="flex-1 text-right font-outfit font-bold text-blue-300">{m.p1Name}</span>
                                        <span className="mx-4 text-[10px] font-black text-slate-600 uppercase">vs</span>
                                        <span className="flex-1 font-outfit font-bold text-purple-300">{m.p2Name}</span>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {drawnMatches.length === 0 && (
                                <div className="text-center py-10 border border-dashed border-slate-800 rounded-xl">
                                    <CircleDashed className="w-8 h-8 mx-auto text-slate-700 mb-2 opacity-50" />
                                    <p className="text-slate-500 font-medium text-sm">No matches drawn yet.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={() => onComplete(drawnMatches)}
                        disabled={drawnMatches.length < 4}
                        className="mt-8 w-full py-5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-600 rounded-2xl font-outfit font-black tracking-[0.2em] uppercase transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] disabled:shadow-none"
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
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-slate-900/80 backdrop-blur-xl p-6 sm:p-8 rounded-[32px] border border-white/5 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-amber-500/10 transition-all duration-700 mix-blend-screen"></div>

                <div className="relative z-10">
                    <h2 className="text-3xl font-outfit font-black flex items-center gap-4 text-white tracking-wider uppercase drop-shadow-md">
                        <div className="p-3 bg-amber-500/10 rounded-2xl border border-amber-500/20 shadow-inner">
                            <Trophy className="text-amber-400 w-8 h-8 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
                        </div>
                        {isAdmin ? (
                            <>
                                Knockout Draw <span className="text-amber-500/50 text-xl ml-2 tracking-widest">(Admin)</span>
                            </>
                        ) : 'Knockout Bracket'}
                    </h2>
                    <p className="text-sm font-medium text-slate-400 mt-3 ml-1">
                        {isAdmin ? 'Manage and draw the knockout bracket here.' : 'View the tournament\'s final knockout stage.'}
                    </p>
                </div>

                {isAdmin ? (
                    <div className="flex gap-3 relative z-10 w-full md:w-auto mt-4 md:mt-0">
                        <button
                            onClick={clearBracket}
                            disabled={bracketState.length === 0}
                            className="flex-1 md:flex-none px-6 py-3.5 bg-slate-950/50 hover:bg-rose-500/10 text-rose-400 rounded-xl text-xs font-outfit font-black tracking-[0.1em] uppercase border border-white/5 hover:border-rose-500/30 transition-all disabled:opacity-50 flex items-center justify-center gap-3 backdrop-blur-md"
                        >
                            <XCircle className="w-4 h-4" /> Clear
                        </button>
                        <button
                            onClick={() => setSpinnerOpen(true)}
                            disabled={standingsData.qualified.length < 8 || qfs.length >= 4}
                            className="flex-1 md:flex-none px-6 py-3.5 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white rounded-xl text-xs font-outfit font-black tracking-[0.15em] uppercase shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-3 relative overflow-hidden group/btn"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                <CircleDashed className="w-4 h-4 group-hover/btn:animate-spin" />
                                Spin Draw
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 pointer-events-none"></div>
                        </button>
                    </div>
                ) : (
                    <div className="bg-slate-950/50 px-4 py-2.5 rounded-xl border border-white/5 text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-3 relative z-10 backdrop-blur-md">
                        <Lock className="w-4 h-4 text-slate-600" /> Admin required for draw
                    </div>
                )}
            </motion.div>

            {standingsData.qualified.length < 8 && bracketState.length === 0 && (
                <motion.div variants={itemVariants} className="bg-amber-500/10 backdrop-blur-md border border-amber-500/20 text-amber-300 p-8 rounded-3xl text-center shadow-[0_0_30px_rgba(251,191,36,0.1)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/20 blur-[60px] pointer-events-none mix-blend-screen"></div>
                    <Info className="w-10 h-10 mx-auto mb-4 opacity-80 text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)] relative z-10" />
                    <p className="font-outfit font-black text-2xl tracking-wide relative z-10 text-white">Group Stage Incomplete</p>
                    <p className="text-sm mt-2 opacity-80 font-medium relative z-10">Finish the group stage matches to generate the top 8 qualified players.</p>
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
                        className="mt-16 pt-12 border-t border-white/10"
                    >
                        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-center w-full min-w-max overflow-x-auto gap-12 py-20 pb-28 px-8 min-h-[700px] relative bg-[#080b12]/90 backdrop-blur-xl rounded-[40px] border border-white/5 shadow-2xl">
                            {/* Background Effects */}
                            <div className="absolute inset-0 z-0 bg-center bg-no-repeat bg-[length:120%_auto] opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')" }}></div>
                            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>
                            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>

                            {/* Decorative Grid */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

                            {/* QF Left Column */}
                            <div className="flex flex-col justify-around w-full lg:w-80 shrink-0 space-y-24 z-10">
                                {qfs.filter(m => m.id === 'QF-1' || m.id === 'QF-2').map((match, idx) => (
                                    <BracketMatchBox
                                        key={match.id} match={match} title={`Quarterfinal ${idx + 1}`}
                                        isAdmin={isAdmin} togglePlayed={togglePlayed} handleScoreChange={handleScoreChange}
                                    />
                                ))}
                            </div>

                            {/* SF-1 */}
                            {sfs.filter(m => m.id === 'SF-1').length > 0 && (
                                <div className="flex flex-col justify-center w-full lg:w-80 shrink-0 z-10 relative px-4">
                                    {sfs.filter(m => m.id === 'SF-1').map(match => (
                                        <BracketMatchBox
                                            key={match.id} match={match} title="Semifinal 1"
                                            isAdmin={isAdmin} togglePlayed={togglePlayed} handleScoreChange={handleScoreChange}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Championship + Grand Final (Center) */}
                            {finalMatch && (
                                <div className="flex flex-col justify-center w-full lg:w-96 shrink-0 z-20 px-4 md:scale-110">
                                    <motion.div
                                        className="text-center mb-8 relative"
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                    >
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen"></div>
                                        <Trophy className="mx-auto text-amber-400 w-20 h-20 mb-6 drop-shadow-[0_0_30px_rgba(251,191,36,0.8)]" />
                                        <h3 className="font-outfit font-black text-3xl text-white tracking-[0.25em] uppercase drop-shadow-lg">Championship</h3>
                                        <p className="text-sm text-amber-400 font-bold tracking-widest mt-3 uppercase">Best of 3 Series</p>
                                    </motion.div>
                                    <div className="shadow-[0_0_60px_rgba(251,191,36,0.2)] rounded-3xl backdrop-blur-md">
                                        <BracketMatchBox
                                            match={finalMatch} title="Grand Final"
                                            isAdmin={isAdmin} togglePlayed={togglePlayed} handleScoreChange={handleScoreChange}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* SF-2 */}
                            {sfs.filter(m => m.id === 'SF-2').length > 0 && (
                                <div className="flex flex-col justify-center w-full lg:w-80 shrink-0 z-10 relative px-4">
                                    {sfs.filter(m => m.id === 'SF-2').map(match => (
                                        <BracketMatchBox
                                            key={match.id} match={match} title="Semifinal 2"
                                            isAdmin={isAdmin} togglePlayed={togglePlayed} handleScoreChange={handleScoreChange}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* QF Right Column */}
                            <div className="flex flex-col justify-around w-full lg:w-80 shrink-0 space-y-24 z-10">
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
                            className="h-72 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[32px] bg-slate-900/40 backdrop-blur-md mt-12"
                        >
                            <div className="p-5 rounded-3xl bg-slate-800/50 mb-6 shadow-inner border border-white/5">
                                <Trophy className="w-12 h-12 text-slate-500 opacity-60" />
                            </div>
                            <p className="font-outfit font-black text-2xl text-slate-300 tracking-wide">No draw generated yet.</p>
                            {isAdmin && <p className="text-sm mt-3 text-slate-500 font-bold">Click &quot;Spin Draw&quot; to generate matchups.</p>}
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
