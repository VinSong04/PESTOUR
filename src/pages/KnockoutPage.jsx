import { useState, useEffect, useMemo, useCallback } from 'react';
import { Trophy, XCircle, CircleDashed, Info, Lock, Zap, Shield, Swords } from 'lucide-react';
import BracketMatchBox from '../components/ui/BracketMatchBox';
import BracketConnectors from '../components/ui/BracketConnectors';
import PlayerAvatar from '../components/ui/PlayerAvatar';
import { processBracket, getBracketMatchWinner, categorizeQualified, generateSkeletonBracket } from '../utils/logic';
import { createEmptyGame } from '../utils/matchFactory';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer as containerVariants, springItem as itemVariants } from '../constants/animations';

// ─── 4-Phase Wheel Draw Modal ───────────────────────────────────────────────
function WheelModal({ standingsData, onClose, onComplete, initialPhase = 'po', existingBracket = [] }) {
    const { aq, po } = useMemo(() => categorizeQualified(standingsData), [standingsData]);

    // Phase: 'po' | 'qf' | 'sf' | 'final'
    const [phase, setPhase] = useState(initialPhase);

    // ── PO phase state ──
    const [poPool, setPoPool] = useState(() => [...po]);
    const [poCurrentHome, setPoCurrentHome] = useState(null);
    const [poMatches, setPoMatches] = useState([]);

    // ── QF phase state ──
    // AQ players are auto-seeded as HOME. Spin assigns which PO slot goes to which QF.
    const [qfPoSlotPool, setQfPoSlotPool] = useState(() => [1, 2, 3, 4]); // PO-1..PO-4
    const [qfMatches, setQfMatches] = useState([]);
    // Map QF index → which AQ player (shuffle the aq pool for assignment order)
    const [aqPool, setAqPool] = useState(() => [...aq]);

    // ── SF phase state ──
    const [sfPool, setSfPool] = useState([]);
    const [sfCurrentHome, setSfCurrentHome] = useState(null);
    const [sfMatches, setSfMatches] = useState([]);

    // ── Final phase state ──
    const [finalPool, setFinalPool] = useState([]);
    const [finalCurrentHome, setFinalCurrentHome] = useState(null);
    const [finalMatch, setFinalMatch] = useState(null);

    // ── Wheel state ──
    const [rotation, setRotation] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const [spinMessage, setSpinMessage] = useState('Ready to draw Playoff matches.');

    const colors = ['#22d3ee', '#3b82f6', '#34d399', '#fbbf24', '#a78bfa', '#f472b6', '#14b8a6', '#f97316'];

    // ── Current pool based on phase ──
    const currentPool = useMemo(() => {
        if (phase === 'po') return poPool;
        if (phase === 'qf') return qfPoSlotPool.map(s => ({ id: `PO-${s}`, name: `PO-${s} Winner` }));
        if (phase === 'sf') return sfPool;
        if (phase === 'final') return finalPool;
        return [];
    }, [phase, poPool, qfPoSlotPool, sfPool, finalPool]);

    const getColorForId = (id) => {
        if (!id) return colors[0];
        if (phase === 'po') {
            const idx = po.findIndex(p => p.id === id);
            return colors[idx !== -1 ? idx % colors.length : 0];
        }
        if (phase === 'qf') {
            const idx = parseInt(id.replace('PO-', '')) - 1;
            return colors[(idx >= 0 ? idx : 0) % colors.length];
        }
        let hash = 0;
        for (let i = 0; i < id.length; i++) {
            hash = id.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    };

    // ── Conic gradient for the wheel ──
    const getConicGradient = () => {
        if (currentPool.length === 0) return 'conic-gradient(#1e293b 0deg, #1e293b 360deg)';
        const sliceAngle = 360 / currentPool.length;
        let parts = [];
        for (let i = 0; i < currentPool.length; i++) {
            const start = (i * sliceAngle).toFixed(2);
            const end = ((i + 1) * sliceAngle).toFixed(2);
            const color = getColorForId(currentPool[i].id);
            parts.push(`${color} ${start}deg, ${color} ${end}deg`);
        }
        return `conic-gradient(${parts.join(', ')})`;
    };

    // ── Phase auto-transition ──
    // Removed auto-transition from PO to QF to allow manual confirmation


    useEffect(() => {
        if (phase === 'qf' && qfMatches.length === 4) {
            const timer = setTimeout(() => {
                setSpinMessage('✅ QF seeding complete! Draw SF after QF matches are played.');
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [phase, qfMatches.length]);

    // ── Core spin function ──
    const spin = (type, isRespin = false) => {
        if (isSpinning || currentPool.length === 0) return;
        setIsSpinning(true);

        const label = type === 'home' ? 'Home' : (type === 'away' ? 'Away' : 'Draw');
        setSpinMessage(isRespin ? `Re-spinning for ${label}...` : `Spinning for ${label}...`);

        let pool = [...currentPool];
        let validPool = pool;
        
        if (isRespin && phase === 'po' && poCurrentHome) {
            validPool = pool.filter(p => p.group !== poCurrentHome.group);
            if (validPool.length === 0) validPool = pool;
        }

        const selected = validPool[Math.floor(Math.random() * validPool.length)];
        const targetIndex = pool.findIndex(p => p.id === selected.id);

        const sliceAngle = 360 / pool.length;
        const targetAngle = 360 - (targetIndex * sliceAngle + sliceAngle / 2);
        const spins = 5 * 360;
        const finalRotation = rotation + spins + (targetAngle - (rotation % 360));
        setRotation(finalRotation);

        setTimeout(() => {
            setIsSpinning(false);

            if (phase === 'po') {
                if (type === 'home') {
                    setPoCurrentHome(selected);
                    setPoPool(prev => prev.filter(p => p.id !== selected.id));
                    setSpinMessage(`🏠 Home locked: ${selected.name} (Group ${selected.group})`);
                } else {
                    // Clash detection
                    if (poCurrentHome.group === selected.group) {
                        setSpinMessage(`⚠️ Group Clash! (${selected.group}) Please draw AWAY again.`);
                        return;
                    }
                    
                    const matchNum = poMatches.length + 1;
                    const newMatch = {
                        id: `PO-${matchNum}`,
                        round: 'PO',
                        p1Id: poCurrentHome.id,
                        p1Name: poCurrentHome.name,
                        p1Logo: poCurrentHome.logo || '',
                        p2Id: selected.id,
                        p2Name: selected.name,
                        p2Logo: selected.logo || '',
                        played: false,
                        g1: createEmptyGame(), g2: createEmptyGame(), g3: createEmptyGame()
                    };
                    setPoMatches(prev => [...prev, newMatch]);
                    setPoPool(prev => prev.filter(p => p.id !== selected.id));
                    setPoCurrentHome(null);
                    setSpinMessage(`✅ PO-${matchNum}: ${poCurrentHome.name} vs ${selected.name}`);
                }
            } else if (phase === 'qf') {
                // AQ auto-seeded as HOME, spin assigns which PO slot → AWAY
                const qfNum = qfMatches.length + 1;
                const aqPlayer = aqPool[0]; // Take next AQ player in order
                const poSlotNum = selected.id.replace('PO-', '');
                const newMatch = {
                    id: `QF-${qfNum}`,
                    round: 'QF',
                    p1Id: aqPlayer?.id || null,
                    p1Name: aqPlayer?.name || 'TBD',
                    p1Logo: aqPlayer?.logo || '',
                    p2Id: null,
                    p2Name: `Winner of PO-${poSlotNum}`,
                    p2Logo: '',
                    poSource: `PO-${poSlotNum}`,
                    played: false,
                    g1: createEmptyGame(), g2: createEmptyGame(), g3: createEmptyGame()
                };
                setQfMatches(prev => [...prev, newMatch]);
                setQfPoSlotPool(prev => prev.filter(s => s !== parseInt(poSlotNum)));
                setAqPool(prev => prev.slice(1));
                setSpinMessage(`✅ QF-${qfNum}: ${aqPlayer?.name || '?'} 👑 vs Winner of PO-${poSlotNum}`);
            } else if (phase === 'sf') {
                if (type === 'home') {
                    setSfCurrentHome(selected);
                    setSfPool(prev => prev.filter(p => p.id !== selected.id));
                    setSpinMessage(`🏠 Home locked: ${selected.name}`);
                } else {
                    const sfNum = sfMatches.length + 1;
                    const newMatch = {
                        id: `SF-${sfNum}`,
                        round: 'SF',
                        p1Id: sfCurrentHome.id,
                        p1Name: sfCurrentHome.name,
                        p1Logo: sfCurrentHome.logo || '',
                        p2Id: selected.id,
                        p2Name: selected.name,
                        p2Logo: selected.logo || '',
                        played: false,
                        g1: createEmptyGame(), g2: createEmptyGame(), g3: createEmptyGame()
                    };
                    setSfMatches(prev => [...prev, newMatch]);
                    setSfPool(prev => prev.filter(p => p.id !== selected.id));
                    setSfCurrentHome(null);
                    setSpinMessage(`✅ SF-${sfNum}: ${sfCurrentHome.name} vs ${selected.name}`);
                }
            } else if (phase === 'final') {
                if (type === 'home') {
                    setFinalCurrentHome(selected);
                    setFinalPool(prev => prev.filter(p => p.id !== selected.id));
                    setSpinMessage(`🏠 Home locked: ${selected.name}`);
                } else {
                    const newMatch = {
                        id: 'F-1',
                        round: 'F',
                        p1Id: finalCurrentHome.id,
                        p1Name: finalCurrentHome.name,
                        p1Logo: finalCurrentHome.logo || '',
                        p2Id: selected.id,
                        p2Name: selected.name,
                        p2Logo: selected.logo || '',
                        played: false,
                        g1: createEmptyGame(), g2: createEmptyGame(), g3: createEmptyGame()
                    };
                    setFinalMatch(newMatch);
                    setFinalPool(prev => prev.filter(p => p.id !== selected.id));
                    setFinalCurrentHome(null);
                    setSpinMessage(`✅ FINAL: ${finalCurrentHome.name} vs ${selected.name}`);
                }
            }
        }, 4000);
    };

    // ── Phase config ──
    const phaseConfig = {
        po: { label: 'PLAYOFF DRAW', icon: <Swords className="w-3.5 h-3.5" />, color: 'teal', desc: 'Random cross-group pairings (Rank 2 & 3)' },
        qf: { label: 'QUARTERFINAL SEEDING', icon: <Shield className="w-3.5 h-3.5" />, color: 'purple', desc: 'AQ players seeded HOME, spin for AWAY' },
        sf: { label: 'SEMIFINAL DRAW', icon: <Swords className="w-3.5 h-3.5" />, color: 'amber', desc: 'Draw HOME & AWAY from QF winners' },
        final: { label: 'GRAND FINAL DRAW', icon: <Trophy className="w-3.5 h-3.5" />, color: 'emerald', desc: 'Draw HOME & AWAY from SF winners' },
    };
    const pc = phaseConfig[phase];

    const phaseColorMap = {
        teal: { badge: 'bg-teal-500/8 border-teal-500/15 text-teal-400', progress: 'bg-teal-500', progressBg: 'bg-teal-500/20', matchCard: 'bg-teal-500/[0.04] border-teal-500/10 hover:border-teal-500/20', tag: 'bg-teal-500/10 text-teal-400' },
        purple: { badge: 'bg-purple-500/8 border-purple-500/15 text-purple-400', progress: 'bg-purple-500', progressBg: 'bg-purple-500/20', matchCard: 'bg-purple-500/[0.04] border-purple-500/10 hover:border-purple-500/20', tag: 'bg-purple-500/10 text-purple-400' },
        amber: { badge: 'bg-amber-500/8 border-amber-500/15 text-amber-400', progress: 'bg-amber-500', progressBg: 'bg-amber-500/20', matchCard: 'bg-amber-500/[0.04] border-amber-500/10 hover:border-amber-500/20', tag: 'bg-amber-500/10 text-amber-400' },
        emerald: { badge: 'bg-emerald-500/8 border-emerald-500/15 text-emerald-400', progress: 'bg-emerald-500', progressBg: 'bg-emerald-500/20', matchCard: 'bg-emerald-500/[0.04] border-emerald-500/10 hover:border-emerald-500/20', tag: 'bg-emerald-500/10 text-emerald-400' },
    };
    const pcColors = phaseColorMap[pc.color];

    // ── Completion checks ──
    const poComplete = poMatches.length === 4;
    const qfComplete = qfMatches.length === 4;
    const sfComplete = sfMatches.length === 2;
    const finalComplete = finalMatch !== null;

    const allDrawsDone = phase === 'po' ? poComplete
        : phase === 'qf' ? (poComplete && qfComplete)
        : phase === 'sf' ? (poComplete && qfComplete && sfComplete)
        : (poComplete && qfComplete && sfComplete && finalComplete);

    // Total draws for current phase
    const phaseDrawCount = phase === 'po' ? poMatches.length
        : phase === 'qf' ? qfMatches.length
        : phase === 'sf' ? sfMatches.length
        : (finalMatch ? 1 : 0);
    const phaseDrawTotal = phase === 'po' ? 4 : phase === 'qf' ? 4 : phase === 'sf' ? 2 : 1;

    // ── Current home pick (for PO/SF/Final) ──
    const currentHomePick = phase === 'po' ? poCurrentHome : phase === 'sf' ? sfCurrentHome : phase === 'final' ? finalCurrentHome : null;

    // ── Draw buttons logic ──
    const renderDrawButtons = () => {
        if (phase === 'po') {
            if (poMatches.length >= 4) {
                return (
                    <button
                        onClick={() => {
                            setPhase('qf');
                            setRotation(0);
                            setSpinMessage('Ready to seed Quarterfinals.');
                        }}
                        className="flex-1 max-w-[220px] py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white rounded-xl font-outfit font-bold uppercase tracking-wider text-xs transition-all shadow-lg shadow-amber-500/20"
                    >
                        Next: Quarterfinal Draw
                    </button>
                );
            }

            const homeDisabled = isSpinning || poCurrentHome !== null || poPool.length === 0 || poMatches.length >= 4;
            const awayDisabled = isSpinning || poCurrentHome === null || poPool.length === 0;
            return (
                <>
                    <button
                        onClick={() => spin('home')}
                        disabled={homeDisabled}
                        className="flex-1 max-w-[140px] py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-600 rounded-xl font-outfit font-bold uppercase tracking-wider text-xs transition-all"
                    >
                        Draw Home
                    </button>
                    <button
                        onClick={() => spin('away')}
                        disabled={awayDisabled}
                        className="flex-1 max-w-[140px] py-3 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-600 rounded-xl font-outfit font-bold uppercase tracking-wider text-xs transition-all"
                    >
                        Draw Away
                    </button>
                </>
            );
        }
        if (phase === 'qf') {
            return (
                <button
                    onClick={() => spin('draw')}
                    disabled={isSpinning || qfMatches.length >= 4 || qfPoSlotPool.length === 0 || aqPool.length === 0}
                    className="flex-1 max-w-[200px] py-3 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-600 rounded-xl font-outfit font-bold uppercase tracking-wider text-xs transition-all"
                >
                    Draw QF Away
                </button>
            );
        }
        if (phase === 'sf' || phase === 'final') {
            const homeDisabled = isSpinning || currentHomePick !== null || currentPool.length === 0
                || (phase === 'sf' && sfMatches.length >= 2)
                || (phase === 'final' && finalMatch !== null);
            const awayDisabled = isSpinning || currentHomePick === null || currentPool.length === 0;
            return (
                <>
                    <button
                        onClick={() => spin('home')}
                        disabled={homeDisabled}
                        className="flex-1 max-w-[140px] py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-600 rounded-xl font-outfit font-bold uppercase tracking-wider text-xs transition-all"
                    >
                        Draw Home
                    </button>
                    <button
                        onClick={() => spin('away')}
                        disabled={awayDisabled}
                        className="flex-1 max-w-[140px] py-3 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-600 rounded-xl font-outfit font-bold uppercase tracking-wider text-xs transition-all"
                    >
                        Draw Away
                    </button>
                </>
            );
        }
        return null;
    };

    // ── All matches for the current phase ──
    const currentPhaseMatches = phase === 'po' ? poMatches
        : phase === 'qf' ? qfMatches
        : phase === 'sf' ? sfMatches
        : (finalMatch ? [finalMatch] : []);

    // ── Confirm ──
    const handleConfirm = () => {
        const allMatches = [...poMatches, ...qfMatches, ...sfMatches];
        if (finalMatch) allMatches.push(finalMatch);
        onComplete(allMatches);
    };

    // ── Wheel icon ──
    const wheelIcon = phase === 'po' || phase === 'sf'
        ? <Swords className="w-4 h-4 text-teal-500/40" />
        : phase === 'final'
            ? <Trophy className="w-4 h-4 text-amber-500/40" />
            : <Shield className="w-4 h-4 text-purple-500/40" />;

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
                className="glass-card rounded-3xl w-full max-w-5xl max-h-[92vh] overflow-y-auto flex flex-col md:flex-row relative"
            >
                {/* Left: Wheel */}
                <div className="flex-1 p-6 sm:p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/[0.04] bg-white/[0.01] relative z-10">
                    {/* Phase Indicator */}
                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-[0.15em] mb-3 ${pcColors.badge}`}>
                        {pc.icon}
                        {pc.label}
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium mb-5 tracking-wider">
                        {pc.desc}
                    </p>

                    {/* Wheel */}
                    <div className="relative w-56 h-56 sm:w-64 sm:h-64 mb-6">
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-l-[12px] border-r-[12px] border-t-[22px] border-l-transparent border-r-transparent border-t-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                        <div
                            className="w-full h-full rounded-full border-4 border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.6)] overflow-hidden relative"
                            style={{
                                background: getConicGradient(),
                                transform: `rotate(${rotation}deg)`,
                                transition: 'transform 4s cubic-bezier(0.2, 0.8, 0.2, 1)'
                            }}
                        >
                            {currentPool.map((p, i) => {
                                const sliceAngle = 360 / currentPool.length;
                                // conic-gradient 0deg is at 12 o'clock, but transform rotate 0deg is at 3 o'clock (90deg offset)
                                const rotate = i * sliceAngle + sliceAngle / 2 - 90;
                                return (
                                    <div
                                        key={p.id}
                                        className="absolute top-1/2 left-1/2 origin-left font-outfit font-bold text-white tracking-wider text-[10px] whitespace-nowrap drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
                                        style={{ transform: `translate(0, -50%) rotate(${rotate}deg) translateX(40px)` }}
                                    >
                                        {p.name}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#060a13] border-4 border-white/10 rounded-full z-10 flex items-center justify-center">
                            {wheelIcon}
                        </div>
                    </div>

                    {/* Spin Message */}
                    <div className="text-center h-10 mb-2 px-4">
                        <p className={`font-outfit font-bold tracking-wider text-xs uppercase ${isSpinning ? 'text-amber-400 animate-pulse' : 'text-slate-500'}`}>
                            {spinMessage}
                        </p>
                    </div>

                    {/* Draw Buttons */}
                    <div className="flex gap-3 mt-2 w-full justify-center">
                        {renderDrawButtons()}
                    </div>

                    {/* Current Home Pick Preview (SF/Final only) */}
                    {currentHomePick && (
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 bg-white/[0.02] rounded-xl p-3 border border-white/[0.04] w-full max-w-xs"
                        >
                            <p className="text-[9px] text-slate-600 font-semibold uppercase tracking-[0.15em] mb-1.5 text-center">Current Pick</p>
                            <div className="flex items-center justify-center gap-3 font-outfit font-bold">
                                <span className="text-cyan-400 text-sm">{currentHomePick.name}</span>
                                <span className="text-slate-700 text-[10px]">VS</span>
                                <span className="text-slate-700 text-sm">???</span>
                            </div>
                        </motion.div>
                    )}

                    {/* QF AQ Preview: Show next AQ to be seeded */}
                    {phase === 'qf' && aqPool.length > 0 && !isSpinning && (
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 bg-white/[0.02] rounded-xl p-3 border border-white/[0.04] w-full max-w-xs"
                        >
                            <p className="text-[9px] text-slate-600 font-semibold uppercase tracking-[0.15em] mb-1.5 text-center">Next AQ (Auto-Seeded HOME)</p>
                            <div className="flex items-center justify-center gap-2 font-outfit font-bold">
                                <PlayerAvatar name={aqPool[0].name} logo={aqPool[0].logo} className="w-7 h-7 text-[8px] rounded-md shrink-0" />
                                <span className="text-cyan-400 text-sm">{aqPool[0].name}</span>
                                <span className="text-amber-400 text-xs">👑</span>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Right: Draw Status Panel */}
                <div className="flex-1 p-6 sm:p-7 flex flex-col relative z-10 min-w-0">
                    <div className="flex justify-between items-center mb-5">
                        <h3 className="text-lg font-outfit font-bold text-white tracking-wider uppercase">Draw Status</h3>
                        <button onClick={onClose} className="p-1.5 hover:bg-rose-500/10 rounded-lg text-slate-500 hover:text-rose-400 transition-colors">
                            <XCircle className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Phase Progress Tabs */}
                    <div className="flex gap-1 mb-4 bg-white/[0.02] p-1 rounded-xl border border-white/[0.04]">
                        {[
                            { id: 'po', label: 'PO', count: poMatches.length, total: 4, done: poComplete },
                            { id: 'qf', label: 'QF', count: qfMatches.length, total: 4, done: qfComplete },
                            { id: 'sf', label: 'SF', count: sfMatches.length, total: 2, done: sfComplete },
                            { id: 'final', label: 'FIN', count: finalMatch ? 1 : 0, total: 1, done: finalComplete },
                        ].map(tab => (
                            <div
                                key={tab.id}
                                className={`flex-1 py-1.5 text-center rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all ${
                                    phase === tab.id
                                        ? 'bg-white/[0.06] text-white border border-white/[0.08]'
                                        : tab.done
                                            ? 'text-emerald-400/60'
                                            : 'text-slate-700'
                                }`}
                            >
                                {tab.label} {tab.count}/{tab.total}
                                {tab.done && ' ✓'}
                            </div>
                        ))}
                    </div>

                    {/* Phase progress bar */}
                    <div className={`h-1.5 rounded-full ${pcColors.progressBg} overflow-hidden mb-5`}>
                        <div className={`h-full rounded-full ${pcColors.progress} transition-all duration-500`} style={{ width: `${(phaseDrawCount / phaseDrawTotal) * 100}%` }} />
                    </div>

                    {/* Drawn Matches List */}
                    <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                        {currentPhaseMatches.length > 0 ? (
                            <AnimatePresence>
                                {currentPhaseMatches.map((m) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: -15 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        key={m.id}
                                        className={`flex items-center gap-2.5 p-3 rounded-xl border mb-1.5 transition-colors ${pcColors.matchCard}`}
                                    >
                                        <span className={`px-2 py-0.5 rounded font-outfit font-bold text-[9px] tracking-wider shrink-0 ${pcColors.tag}`}>{m.id}</span>
                                        <div className="flex-1 flex items-center gap-1.5 min-w-0">
                                            <PlayerAvatar name={m.p1Name} logo={m.p1Logo} className="w-6 h-6 text-[8px] rounded-md shrink-0" />
                                            <span className="font-outfit font-semibold text-cyan-300 text-xs truncate">{m.p1Name}</span>
                                            {m.round === 'QF' && m.p1Name && !m.p1Name.startsWith('TBD') && (
                                                <span className="text-amber-400 text-[9px] shrink-0">👑</span>
                                            )}
                                        </div>
                                        <span className="text-[9px] font-bold text-slate-700 uppercase shrink-0">vs</span>
                                        <div className="flex-1 flex items-center gap-1.5 justify-end min-w-0">
                                            <span className="font-outfit font-semibold text-purple-300 text-xs truncate text-right">{m.p2Name}</span>
                                            <PlayerAvatar name={m.p2Name} logo={m.p2Logo} className="w-6 h-6 text-[8px] rounded-md shrink-0" />
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        ) : (
                            <div className="text-center py-8 border border-dashed border-white/[0.04] rounded-xl">
                                <CircleDashed className="w-7 h-7 mx-auto text-slate-700 mb-2" />
                                <p className="text-slate-600 font-medium text-xs">No matches drawn yet.</p>
                                <p className="text-slate-700 text-[10px] mt-1">Spin the wheel to start the {pc.label.toLowerCase()}.</p>
                            </div>
                        )}
                    </div>

                    {/* Confirm Button */}
                    <button
                        onClick={handleConfirm}
                        disabled={!allDrawsDone}
                        className={`mt-5 w-full py-4 rounded-xl font-outfit font-bold tracking-wider uppercase transition-all text-sm ${
                            allDrawsDone
                                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-lg shadow-emerald-500/20'
                                : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                        }`}
                    >
                        {allDrawsDone ? '✓ Confirm & Save Draw' : `${phaseDrawTotal - phaseDrawCount} draws remaining in ${pc.label}`}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function KnockoutView({ data, updateData, standingsData, isAdmin }) {
    const [bracketState, setBracketState] = useState(data.bracket || []);
    const [activeRoundTab, setActiveRoundTab] = useState('po');
    const [spinnerOpen, setSpinnerOpen] = useState(false);
    const [spinnerPhase, setSpinnerPhase] = useState('po');

    useEffect(() => {
        if (data.bracket && data.bracket.length > 0) {
            setBracketState(processBracket(data.bracket));
        } else {
            setBracketState([]);
        }
    }, [data.bracket]);

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

    const displayBracket = bracketState.length > 0 ? bracketState : generateSkeletonBracket();

    const pos = useMemo(() => displayBracket.filter(m => m.id.startsWith('PO')), [displayBracket]);
    const qfs = useMemo(() => displayBracket.filter(m => m.id.startsWith('QF')), [displayBracket]);
    const sfs = useMemo(() => displayBracket.filter(m => m.id.startsWith('SF')), [displayBracket]);
    const finalMatch = useMemo(() => displayBracket.find(m => m.id.startsWith('F')), [displayBracket]);

    const actualPos = useMemo(() => bracketState.filter(m => m.id.startsWith('PO')), [bracketState]);
    const actualQfs = useMemo(() => bracketState.filter(m => m.id.startsWith('QF')), [bracketState]);
    const actualSfs = useMemo(() => bracketState.filter(m => m.id.startsWith('SF')), [bracketState]);
    const actualFinal = useMemo(() => bracketState.find(m => m.id.startsWith('F')), [bracketState]);

    const qfsAllPlayed = actualQfs.length === 4 && actualQfs.every(m => m.played);
    const sfsAllPlayed = actualSfs.length === 2 && actualSfs.every(m => m.played);

    const canDrawPOQF = actualPos.length === 0 && actualQfs.length === 0;
    const canDrawSF = qfsAllPlayed && actualSfs.length === 0;
    const canDrawFinal = sfsAllPlayed && !actualFinal;

    const champion = useMemo(() => {
        return finalMatch ? getBracketMatchWinner(finalMatch) : null;
    }, [finalMatch]);

    const handleDrawComplete = (newMatches) => {
        try {
            const fullBracket = processBracket(newMatches);
            setBracketState(fullBracket);
            updateData({ ...data, bracket: fullBracket });
            setSpinnerOpen(false);
        } catch (err) {
            alert(err.message);
        }
    };

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
                        {canDrawPOQF ? (
                            <button
                                onClick={() => { setSpinnerPhase('po'); setSpinnerOpen(true); }}
                                disabled={standingsData.qualified.length < 8}
                                className="flex-1 md:flex-none px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white rounded-xl text-[11px] font-bold tracking-wider uppercase transition-all disabled:opacity-40 flex items-center justify-center gap-2 relative overflow-hidden shadow-lg shadow-amber-500/20"
                            >
                                <Zap className="w-3.5 h-3.5" /> Draw PO & QF
                            </button>
                        ) : canDrawSF ? (
                            <button
                                onClick={() => { setSpinnerPhase('sf'); setSpinnerOpen(true); }}
                                className="flex-1 md:flex-none px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white rounded-xl text-[11px] font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                            >
                                <Zap className="w-3.5 h-3.5" /> Draw Semifinals
                            </button>
                        ) : canDrawFinal ? (
                            <button
                                onClick={() => { setSpinnerPhase('final'); setSpinnerOpen(true); }}
                                className="flex-1 md:flex-none px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white rounded-xl text-[11px] font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                            >
                                <Zap className="w-3.5 h-3.5" /> Draw Final
                            </button>
                        ) : null}
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

            {/* Champion Celebration Banner */}
            <AnimatePresence>
                {champion && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="glass-card rounded-3xl overflow-hidden relative border border-amber-500/20 shadow-[0_0_50px_rgba(251,191,36,0.15)]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-amber-500/10 pointer-events-none" />
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
                        <div className="p-8 flex flex-col items-center gap-5 relative z-10">
                            <motion.div
                                animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                            >
                                <Trophy className="w-16 h-16 text-amber-400 drop-shadow-[0_0_20px_rgba(251,191,36,0.4)]" />
                            </motion.div>
                            <div className="text-center">
                                <p className="text-[10px] font-bold text-amber-400/60 tracking-[0.3em] uppercase mb-2">🏆 Tournament Champion 🏆</p>
                                <div className="flex items-center gap-4 justify-center">
                                    <PlayerAvatar name={champion.name} logo={champion.logo} className="w-14 h-14 text-lg rounded-xl border-2 border-amber-400/30 shadow-[0_0_20px_rgba(251,191,36,0.2)] font-outfit" />
                                    <h3 className="text-3xl font-outfit font-black text-white tracking-wider uppercase">{champion.name}</h3>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bracket Display */}
            <AnimatePresence mode="wait">
                <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, y: 20 }}
                    className="mt-12 pt-10 border-t border-white/[0.04] space-y-6"
                >
                    {bracketState.length === 0 && (
                        <div className="flex flex-col items-center justify-center mb-6 relative z-10 space-y-4">
                            <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-2">
                                <Info className="w-4 h-4" /> Bracket structure shown below. Draw not generated yet.
                            </div>
                        </div>
                    )}
                    
                    {/* Round Switcher for Mobile */}
                    <div className="flex lg:hidden bg-white/[0.03] p-1 rounded-xl border border-white/[0.04] mb-6 max-w-sm mx-auto relative z-10">
                        {[
                            ...(pos.length > 0 ? [{ id: 'po', label: 'Playoffs' }] : []),
                            { id: 'qf', label: 'Quarterfinals' },
                            { id: 'sf', label: 'Semifinals' },
                            { id: 'final', label: 'Grand Final' },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveRoundTab(tab.id)}
                                className={`flex-1 py-2 text-[10px] font-bold tracking-wider uppercase rounded-lg transition-all ${activeRoundTab === tab.id ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'text-slate-500 hover:text-white border border-transparent'}`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Desktop Bracket Tree (Left to Right) */}
                    <div className="hidden lg:flex flex-row items-center w-full min-w-max overflow-x-auto gap-12 py-16 pb-24 px-8 min-h-[600px] relative glass-card rounded-3xl">
                        <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none rounded-3xl"></div>
                        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-purple-500/6 rounded-full blur-[120px] pointer-events-none"></div>
                        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/6 rounded-full blur-[120px] pointer-events-none"></div>

                        <BracketConnectors bracketData={displayBracket} />

                        {/* Round 1: PO */}
                        {pos.length > 0 && (
                            <div className="flex flex-col justify-around w-80 shrink-0 space-y-12 z-10">
                                {pos.map((match, idx) => (
                                    <BracketMatchBox
                                        key={match.id} match={match} title={`Playoff ${idx + 1}`}
                                        isAdmin={isAdmin} togglePlayed={togglePlayed} handleScoreChange={handleScoreChange}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Round 2: QF */}
                        <div className="flex flex-col justify-around w-80 shrink-0 space-y-16 z-10">
                            {qfs.map((match, idx) => (
                                <BracketMatchBox
                                    key={match.id} match={match} title={`Quarterfinal ${idx + 1}`}
                                    isAdmin={isAdmin} togglePlayed={togglePlayed} handleScoreChange={handleScoreChange}
                                />
                            ))}
                        </div>

                        {/* Round 3: SF */}
                        <div className="flex flex-col justify-around w-80 shrink-0 space-y-32 z-10">
                            {sfs.map((match, idx) => (
                                <BracketMatchBox
                                    key={match.id} match={match} title={`Semifinal ${idx + 1}`}
                                    isAdmin={isAdmin} togglePlayed={togglePlayed} handleScoreChange={handleScoreChange}
                                />
                            ))}
                        </div>

                        {/* Round 4: Final */}
                        {finalMatch && (
                            <div className="flex flex-col justify-center w-96 shrink-0 z-20 px-4">
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
                    </div>

                    {/* Mobile Round Match List */}
                    <div className="flex flex-col lg:hidden w-full gap-6 p-5 sm:p-6 glass-card rounded-3xl relative overflow-hidden z-10">
                        <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none rounded-3xl"></div>
                        
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeRoundTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-6 z-10"
                            >
                                {activeRoundTab === 'po' && pos.length > 0 && (
                                    <>
                                        <h4 className="text-[10px] font-extrabold text-teal-400 uppercase tracking-widest text-center">Playoff Matchups</h4>
                                        <div className="space-y-6">
                                            {pos.map((match, idx) => (
                                                <BracketMatchBox
                                                    key={match.id} match={match} title={`Playoff ${idx + 1}`}
                                                    isAdmin={isAdmin} togglePlayed={togglePlayed} handleScoreChange={handleScoreChange}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}

                                {activeRoundTab === 'qf' && (
                                    <>
                                        <h4 className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest text-center">Quarterfinal Matchups</h4>
                                        <div className="space-y-6">
                                            {qfs.map((match, idx) => (
                                                <BracketMatchBox
                                                    key={match.id} match={match} title={`Quarterfinal ${idx + 1}`}
                                                    isAdmin={isAdmin} togglePlayed={togglePlayed} handleScoreChange={handleScoreChange}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                                
                                {activeRoundTab === 'sf' && (
                                    <>
                                        <h4 className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest text-center">Semifinal Matchups</h4>
                                        <div className="space-y-6">
                                            {sfs.length > 0 ? (
                                                sfs.map((match, idx) => (
                                                    <BracketMatchBox
                                                        key={match.id} match={match} title={`Semifinal ${idx + 1}`}
                                                        isAdmin={isAdmin} togglePlayed={togglePlayed} handleScoreChange={handleScoreChange}
                                                    />
                                                ))
                                            ) : (
                                                <p className="text-slate-500 text-xs text-center font-medium py-6">Semifinal matchups are not drawn yet.</p>
                                            )}
                                        </div>
                                    </>
                                )}
                                
                                {activeRoundTab === 'final' && (
                                    <>
                                        <h4 className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest text-center">Championship Series</h4>
                                        <div className="space-y-6">
                                            {finalMatch ? (
                                                <div className="glow-ring-gold rounded-2xl">
                                                    <BracketMatchBox
                                                        match={finalMatch} title="Grand Final"
                                                        isAdmin={isAdmin} togglePlayed={togglePlayed} handleScoreChange={handleScoreChange}
                                                    />
                                                </div>
                                            ) : (
                                                <p className="text-slate-500 text-xs text-center font-medium py-6">Grand Final matchup is not drawn yet.</p>
                                            )}
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Wheel Modal */}
            <AnimatePresence>
                {spinnerOpen && (
                    <WheelModal
                        standingsData={standingsData}
                        onClose={() => setSpinnerOpen(false)}
                        onComplete={handleDrawComplete}
                        initialPhase={spinnerPhase}
                        existingBracket={bracketState}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
}
