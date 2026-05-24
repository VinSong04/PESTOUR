import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, RotateCcw, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';
import { createEmptyMatch } from '../../utils/matchFactory';
import { createBall, stepPhysics, drawBalls } from './LotteryPhysics';
import { getFlagUrl } from '../../constants/countries';

const GROUP_CFG = {
    A: { label: 'Group A', color: '#22d3ee', bg: 'rgba(34,211,238,0.08)', border: 'rgba(34,211,238,0.25)', glow: 'rgba(34,211,238,0.4)' },
    B: { label: 'Group B', color: '#c084fc', bg: 'rgba(192,132,252,0.08)', border: 'rgba(192,132,252,0.25)', glow: 'rgba(192,132,252,0.4)' },
    C: { label: 'Group C', color: '#4ade80', bg: 'rgba(74,222,128,0.08)', border: 'rgba(74,222,128,0.25)', glow: 'rgba(74,222,128,0.4)' },
    D: { label: 'Group D', color: '#facc15', bg: 'rgba(250,204,21,0.08)', border: 'rgba(250,204,21,0.25)', glow: 'rgba(250,204,21,0.4)' },
};
const GROUP_KEYS = ['A', 'B', 'C', 'D'];
const MAX_PER_GROUP = 5;

export default function AdminSeasonTab({ approvedPlayers, currentPlayers, onDrawGroups, updateData, data }) {
    const canvasRef = useRef(null);
    const ballsRef = useRef([]);
    const animRef = useRef(null);
    const timeRef = useRef(0);

    const [groups, setGroups] = useState({ A: [], B: [], C: [], D: [] });
    const [drawing, setDrawing] = useState(false);
    const [complete, setComplete] = useState(false);
    const [flashGroup, setFlashGroup] = useState(null);

    const totalAssigned = Object.values(groups).flat().length;
    const totalPlayers = approvedPlayers?.length || 0;

    // Initialize balls
    const initBalls = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas || !approvedPlayers?.length) return;
        const W = canvas.width, H = canvas.height;
        ballsRef.current = approvedPlayers.map((p, i) => createBall(p, W, H, i, approvedPlayers.length));
        setGroups({ A: [], B: [], C: [], D: [] });
        setComplete(false);
        setDrawing(false);
        setFlashGroup(null);
    }, [approvedPlayers]);

    useEffect(() => { initBalls(); }, [initBalls]);

    // Animation loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const loop = () => {
            timeRef.current += 16;
            stepPhysics(ballsRef.current, canvas.width, canvas.height);
            drawBalls(ctx, ballsRef.current, canvas.width, canvas.height, timeRef.current);
            animRef.current = requestAnimationFrame(loop);
        };
        animRef.current = requestAnimationFrame(loop);
        return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
    }, []);

    // Canvas resize
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const container = canvas.parentElement;
        const resize = () => {
            const w = container.clientWidth;
            const h = Math.min(420, Math.max(300, w * 0.45));
            canvas.width = w; canvas.height = h;
        };
        resize();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    // Draw one ball
    const handleDraw = useCallback(() => {
        if (drawing || complete) return;
        const remaining = ballsRef.current.filter(b => !b.removed);
        if (remaining.length === 0) return;

        // Pick random ball
        const pick = remaining[Math.floor(Math.random() * remaining.length)];
        pick.selected = true;
        setDrawing(true);

        // Pick random available group
        const available = GROUP_KEYS.filter(k => groups[k].length < MAX_PER_GROUP);
        if (available.length === 0) return;
        const targetGroup = available[Math.floor(Math.random() * available.length)];

        // Phase 1: Glow for 1.2s
        setTimeout(() => {
            // Phase 2: Fly ball to center then fade out over 0.8s
            const canvas = canvasRef.current;
            if (canvas) {
                const cx = canvas.width / 2, cy = canvas.height / 2;
                const flySteps = 40;
                let step = 0;
                const startX = pick.x, startY = pick.y;
                const flyInterval = setInterval(() => {
                    step++;
                    const t = step / flySteps;
                    const ease = t * t * (3 - 2 * t); // smoothstep
                    // Curved arc via control point
                    const cpx = (startX + cx) / 2 + (Math.random() - 0.5) * 60;
                    const cpy = Math.min(startY, cy) - 80;
                    pick.x = (1 - ease) * (1 - ease) * startX + 2 * (1 - ease) * ease * cpx + ease * ease * cx;
                    pick.y = (1 - ease) * (1 - ease) * startY + 2 * (1 - ease) * ease * cpy + ease * ease * cy;
                    pick.vx = 0; pick.vy = 0;

                    if (step >= flySteps) {
                        clearInterval(flyInterval);
                        pick.removed = true;
                        pick.selected = false;

                        // Add to group
                        const player = approvedPlayers.find(p => p.id === pick.id);
                        setGroups(prev => {
                            const newGroups = { ...prev, [targetGroup]: [...prev[targetGroup], player] };
                            const newTotal = Object.values(newGroups).flat().length;
                            if (newTotal >= totalPlayers) {
                                setTimeout(() => setComplete(true), 600);
                            }
                            return newGroups;
                        });
                        setFlashGroup(targetGroup);
                        setTimeout(() => setFlashGroup(null), 700);
                        setDrawing(false);
                    }
                }, 20);
            }
        }, 1200);
    }, [drawing, complete, groups, approvedPlayers, totalPlayers]);

    // Save to Firebase
    const handleSave = () => {
        if (!window.confirm('Save this draw? This will generate round-robin matches and overwrite the current bracket.')) return;
        const newPlayers = [];
        const newMatches = [];
        Object.entries(groups).forEach(([gLetter, gPlayers]) => {
            gPlayers.forEach((p, i) => {
                const newId = `${gLetter}${i + 1}`;
                newPlayers.push({ group: gLetter, id: newId, name: p.name, logo: p.baseTeam || p.logo || '' });
            });
            const gp = newPlayers.filter(p => p.group === gLetter);
            for (let i = 0; i < gp.length; i++)
                for (let j = i + 1; j < gp.length; j++)
                    newMatches.push(createEmptyMatch(`M-${gLetter}${i + 1}-${j + 1}`, gLetter, gp[i].id, gp[j].id));
        });
        updateData({ ...data, players: newPlayers, matches: newMatches, bracket: [] });
    };

    const handleReset = () => { initBalls(); };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
            {/* Header */}
            <div style={{ background: 'rgba(8,12,24,0.9)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 14, background: 'linear-gradient(135deg, rgba(250,204,21,0.2), rgba(234,179,8,0.05))', border: '1px solid rgba(250,204,21,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Trophy size={22} color="#facc15" />
                    </div>
                    <div>
                        <h3 style={{ fontSize: 20, fontWeight: 900, color: '#fff', fontFamily: '"Outfit",sans-serif', letterSpacing: '-0.02em' }}>Lottery Draw</h3>
                        <p style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>{totalPlayers} players • {totalAssigned} assigned</p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                    <button onClick={handleReset} style={{ padding: '10px 20px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: '#94a3b8', fontWeight: 800, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
                        onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.06)'}
                        onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.03)'}>
                        <RotateCcw size={14} /> Reset
                    </button>
                    <button onClick={handleDraw} disabled={drawing || complete || totalPlayers === 0}
                        style={{ padding: '10px 28px', borderRadius: 12, background: drawing || complete || totalPlayers === 0 ? '#1e293b' : 'linear-gradient(135deg, #f59e0b, #d97706)', border: 'none', color: drawing || complete ? '#475569' : '#fff', fontWeight: 900, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: drawing || complete || totalPlayers === 0 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: drawing || complete ? 'none' : '0 0 25px rgba(245,158,11,0.3)', transition: 'all 0.2s' }}>
                        <Sparkles size={16} /> {drawing ? 'Drawing...' : complete ? 'Complete' : 'Draw'}
                    </button>
                </div>
            </div>

            {/* Progress Bar */}
            <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 10, height: 6, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.04)' }}>
                <motion.div animate={{ width: `${totalPlayers > 0 ? (totalAssigned / totalPlayers) * 100 : 0}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    style={{ height: '100%', borderRadius: 10, background: 'linear-gradient(90deg, #f59e0b, #eab308, #facc15)' }} />
            </div>

            {/* Canvas Chamber */}
            <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', background: '#080c18' }}>
                <canvas ref={canvasRef} style={{ display: 'block', width: '100%' }} />
                {totalPlayers === 0 && (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#334155', fontSize: 14, fontWeight: 600 }}>
                        No approved players to draw
                    </div>
                )}
            </div>

            {/* Completion Banner */}
            <AnimatePresence>
                {complete && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                        style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(5,150,105,0.08))', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 16, padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <CheckCircle2 size={22} color="#10b981" />
                            <div>
                                <p style={{ color: '#fff', fontWeight: 800, fontSize: 15 }}>Draw Complete!</p>
                                <p style={{ color: '#6ee7b7', fontSize: 11, fontWeight: 500 }}>All {totalPlayers} players have been assigned to groups.</p>
                            </div>
                        </div>
                        <button onClick={handleSave}
                            style={{ padding: '12px 28px', borderRadius: 14, background: 'linear-gradient(135deg, #10b981, #059669)', border: '1px solid rgba(16,185,129,0.5)', color: '#fff', fontWeight: 900, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', boxShadow: '0 0 30px rgba(16,185,129,0.3)' }}>
                            Save &amp; Generate Matches
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Group Panels */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                {GROUP_KEYS.map(gk => {
                    const cfg = GROUP_CFG[gk];
                    const players = groups[gk];
                    const isFull = players.length >= MAX_PER_GROUP;
                    const isFlashing = flashGroup === gk;
                    return (
                        <motion.div key={gk}
                            animate={isFlashing ? { boxShadow: `0 0 40px ${cfg.glow}, inset 0 0 30px ${cfg.bg}` } : { boxShadow: 'none' }}
                            transition={{ duration: 0.4 }}
                            style={{ background: cfg.bg, border: `1px solid ${isFlashing ? cfg.color : cfg.border}`, borderRadius: 18, padding: 0, overflow: 'hidden', transition: 'border-color 0.3s' }}>
                            {/* Group header */}
                            <div style={{ padding: '14px 18px', borderBottom: `1px solid ${cfg.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(0,0,0,0.3)', border: `1px solid ${cfg.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: cfg.color, fontWeight: 900, fontSize: 13 }}>
                                        {gk}
                                    </div>
                                    <span style={{ color: '#fff', fontWeight: 700, fontSize: 13 }}>{cfg.label}</span>
                                </div>
                                <span style={{ color: isFull ? cfg.color : '#64748b', fontWeight: 800, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.15em', background: isFull ? `${cfg.bg}` : 'transparent', padding: '3px 8px', borderRadius: 6, border: isFull ? `1px solid ${cfg.border}` : 'none' }}>
                                    {isFull ? 'FULL' : `${players.length}/${MAX_PER_GROUP}`}
                                </span>
                            </div>
                            {/* Player list */}
                            <div style={{ padding: '8px 10px', minHeight: 140 }}>
                                <AnimatePresence>
                                    {players.length === 0 ? (
                                        <div style={{ height: 130, display: 'flex', alignItems: 'center', justifyContent: 'center', color: cfg.color, opacity: 0.2, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                                            Awaiting Draw
                                        </div>
                                    ) : players.map((p, idx) => {
                                        const flagUrl = getFlagUrl(p.baseTeam || p.logo || '');
                                        return (
                                            <motion.div key={p.id}
                                                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                                transition={{ duration: 0.4, delay: 0.05 }}
                                                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', marginBottom: 4, borderRadius: 10, background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.03)' }}>
                                                <span style={{ color: cfg.color, fontWeight: 900, fontSize: 11, minWidth: 18 }}>{idx + 1}</span>
                                                {flagUrl ? (
                                                    <img src={flagUrl} alt="" style={{ width: 22, height: 16, borderRadius: 2, objectFit: 'cover', border: '1px solid rgba(255,255,255,0.1)' }} />
                                                ) : (
                                                    <div style={{ width: 22, height: 16, borderRadius: 2, background: 'rgba(255,255,255,0.05)' }} />
                                                )}
                                                <span style={{ color: '#fff', fontWeight: 700, fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</span>
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Warning Footer */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 18px', background: 'rgba(245,158,11,0.04)', border: '1px solid rgba(245,158,11,0.12)', borderRadius: 14 }}>
                <AlertTriangle size={16} color="rgba(245,158,11,0.7)" />
                <span style={{ fontSize: 11, color: 'rgba(245,158,11,0.7)', fontWeight: 600 }}>Saving the draw will overwrite all existing groups, matches, and knockout brackets.</span>
            </div>
        </motion.div>
    );
}
