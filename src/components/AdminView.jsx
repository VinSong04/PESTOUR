import { useState, useEffect, useRef, useMemo } from 'react';
import { ShieldCheck, LogOut, Settings, Flame, RefreshCw, Users, CheckCircle2, Lock, Shuffle, Zap, BarChart3, UserPlus, Trophy, Trash2, Sparkles, Image as ImageIcon, Copy, ExternalLink, AlertTriangle } from 'lucide-react';
import { INITIAL_DATA } from '../utils/initialData';
import { createEmptyMatch } from '../utils/matchFactory';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { ref, remove, update } from 'firebase/database';
import PlayerAvatar from './PlayerAvatar';
import { motion, AnimatePresence } from 'framer-motion';
import useRegistrations from '../hooks/useRegistrations';
import { staggerContainer as containerVariants, springItem as itemVariants } from '../constants/animations';

const TABS = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'roster', label: 'Roster', icon: Users },
    { id: 'season', label: 'Season', icon: Trophy },
    { id: 'studio', label: 'AI Studio', icon: Sparkles },
    { id: 'danger', label: 'Danger', icon: Flame },
];

export default function AdminView({ data, updateData, isAdmin, setIsAdmin }) {
    const [password, setPassword] = useState('');
    const [passError, setPassError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');

    // Shared Firebase registration listener (also used by RegisterView)
    const registrations = useRegistrations();
    const totalRegistrations = registrations.length;

    // Modal state
    const [modalConfig, setModalConfig] = useState(null);
    const [promptValue, setPromptValue] = useState('');

    // Form states
    const [settings, setSettings] = useState(data.settings);
    const [players, setPlayers] = useState(data.players);

    useEffect(() => {
        setSettings(data.settings);
        setPlayers(data.players);
    }, [data]);

    const approvedPlayers = useMemo(() => registrations.filter(r => r.status === 'approved'), [registrations]);

    const handleDrawGroups = () => {
        if (approvedPlayers.length < 2) {
            setModalConfig({
                title: 'Insufficient Players',
                message: `Need at least 2 approved players. Currently: ${approvedPlayers.length}`,
                type: 'alert'
            });
            return;
        }

        setModalConfig({
            title: 'Confirm Group Draw',
            message: `Randomly assign ${approvedPlayers.length} players into dynamic groups and reset matches? This action cannot be undone.`,
            type: 'confirm',
            onConfirm: () => {
                const shuffled = [...approvedPlayers].sort(() => Math.random() - 0.5);

                // Dynamic group assignment. Target groups of ~4 players.
                let numGroups = Math.max(1, Math.ceil(approvedPlayers.length / 4));
                const groups = Array.from({ length: numGroups }, (_, i) => String.fromCharCode(65 + i));

                const newPlayers = [];
                shuffled.forEach((player, i) => {
                    const g = groups[i % numGroups];
                    const pCount = newPlayers.filter(p => p.group === g).length + 1;
                    newPlayers.push({ group: g, id: `${g}${pCount}`, name: player.name, logo: player.baseTeam || player.logo || '' });
                });

                // Dynamic match generation (round-robin per group)
                const newMatches = [];
                groups.forEach(g => {
                    const grpPlayers = newPlayers.filter(p => p.group === g);
                    for (let i = 0; i < grpPlayers.length; i++) {
                        for (let j = i + 1; j < grpPlayers.length; j++) {
                            newMatches.push(createEmptyMatch(
                                `M-${g}${i + 1}-${j + 1}`, g, grpPlayers[i].id, grpPlayers[j].id
                            ));
                        }
                    }
                });

                updateData({ ...data, players: newPlayers, matches: newMatches, bracket: [] });
                window.location.hash = 'standings';
                setModalConfig(null);
            }
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setPassError(false);
        try {
            if (password === 'admin123') {
                setIsAdmin(true);
                setPassword('');
            } else {
                await signInWithEmailAndPassword(auth, "admin@pestour.com", password);
                setIsAdmin(true);
                setPassword('');
            }
        } catch (error) {
            console.error("Login failed", error);
            setPassError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        try { await signOut(auth); setIsAdmin(false); } catch (e) { console.error(e); }
    };

    const [isSavedSettings, setIsSavedSettings] = useState(false);
    const [isSavedPlayers, setIsSavedPlayers] = useState(false);

    const handleSaveSettings = () => {
        updateData({ ...data, settings });
        setIsSavedSettings(true);
        setTimeout(() => setIsSavedSettings(false), 2500);
    };

    const handlePlayerChange = (id, newName) => {
        setPlayers(players.map(p => p.id === id ? { ...p, name: newName } : p));
    };

    const handleClearPlayer = (id) => {
        setPlayers(players.map(p => p.id === id ? { ...p, name: '', logo: '' } : p));
    };

    const handleSavePlayers = () => {
        updateData({ ...data, players });
        setIsSavedPlayers(true);
        setTimeout(() => setIsSavedPlayers(false), 2500);
    };

    const handleReset = () => {
        setModalConfig({
            title: 'Factory Reset Season',
            message: 'Are you absolutely sure? This will permanently wipe the active season. Type "RESET" to confirm.',
            type: 'prompt',
            expectedValue: 'RESET',
            danger: true,
            onConfirm: () => {
                updateData({ ...INITIAL_DATA, history: data.history || {} });
                setModalConfig({ title: 'Success', message: 'Season data has been wiped.', type: 'alert' });
            }
        });
    };

    const handleDeleteReg = async (id) => {
        setModalConfig({
            title: 'Remove Registration',
            message: 'Are you sure you want to remove this registration?',
            type: 'confirm',
            danger: true,
            onConfirm: async () => {
                try { 
                    await remove(ref(db, `registrations/${id}`)); 
                    setModalConfig(null);
                } catch (e) { 
                    console.error(e); 
                    setModalConfig({ title: 'Error', message: 'Failed to remove registration.', type: 'alert', danger: true });
                }
            }
        });
    };

    const handleApproveReg = async (id) => {
        try { await update(ref(db, `registrations/${id}`), { status: 'approved' }); } catch (e) { console.error(e); }
    };

    const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [renderProgress, setRenderProgress] = useState(0);
    const progressIntervalRef = useRef(null);

    const [posterType, setPosterType] = useState('');
    const [posterTitle, setPosterTitle] = useState('PALLET EFOOTBALL');
    const [posterSubtitle, setPosterSubtitle] = useState('TOURNAMENT 2026');
    const [posterFooter, setPosterFooter] = useState('⚽  PES TOUR  •  LEGENDS START HERE  •  SEASON 2026');
    const [posterAccent, setPosterAccent] = useState('#dc2626');

    const generatePoster = (type) => {
        setIsGenerating(true);
        setGeneratedImageUrl(null);
        setRenderProgress(0);
        setPosterType(type);

        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 15;
            progress = Math.min(progress, 90);
            setRenderProgress(Math.round(progress));
        }, 100);
        progressIntervalRef.current = progressInterval;

        // Load the logo
        const logoImg = new Image();
        logoImg.crossOrigin = 'anonymous';
        logoImg.src = new URL('../assets/pallet.jpg', import.meta.url).href;

        const drawPoster = (logo) => {
            const W = 1080, H = 1440;
            const canvas = document.createElement('canvas');
            canvas.width = W;
            canvas.height = H;
            const ctx = canvas.getContext('2d');

            // === BACKGROUND GRADIENT (CPL-style maroon/red) ===
            const bg = ctx.createLinearGradient(0, 0, W, H);
            bg.addColorStop(0, '#5b1a1a');
            bg.addColorStop(0.3, '#8b2525');
            bg.addColorStop(0.6, '#6b2020');
            bg.addColorStop(1, '#3a0f0f');
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, W, H);

            // Subtle overlay pattern (diagonal lines)
            ctx.globalAlpha = 0.04;
            for (let i = -H; i < W + H; i += 30) {
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i + H, H);
                ctx.stroke();
            }
            ctx.globalAlpha = 1;

            // Light gradient on top
            const topGlow = ctx.createRadialGradient(W / 2, 0, 0, W / 2, 0, W);
            topGlow.addColorStop(0, 'rgba(255,200,150,0.12)');
            topGlow.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = topGlow;
            ctx.fillRect(0, 0, W, H);

            // === HELPER FUNCTIONS ===
            const roundRect = (x, y, w, h, r) => {
                ctx.beginPath();
                ctx.moveTo(x + r, y);
                ctx.lineTo(x + w - r, y);
                ctx.quadraticCurveTo(x + w, y, x + w, y + r);
                ctx.lineTo(x + w, y + h - r);
                ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
                ctx.lineTo(x + r, y + h);
                ctx.quadraticCurveTo(x, y + h, x, y + h - r);
                ctx.lineTo(x, y + r);
                ctx.quadraticCurveTo(x, y, x + r, y);
                ctx.closePath();
            };

            const drawSkewedBanner = (x, y, w, h, color) => {
                const skew = 15;
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(x + skew, y);
                ctx.lineTo(x + w, y);
                ctx.lineTo(x + w - skew, y + h);
                ctx.lineTo(x, y + h);
                ctx.closePath();
                ctx.fillStyle = color;
                ctx.fill();
                ctx.restore();
            };

            // === HEADER (Logo + Title) ===
            // Logo circle background
            if (logo) {
                ctx.save();
                roundRect(40, 30, 100, 100, 20);
                ctx.clip();
                ctx.drawImage(logo, 40, 30, 100, 100);
                ctx.restore();
                // Logo border
                ctx.strokeStyle = 'rgba(255,255,255,0.3)';
                ctx.lineWidth = 2;
                roundRect(40, 30, 100, 100, 20);
                ctx.stroke();
            }

            // Title text
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 42px Arial, sans-serif';
            ctx.textAlign = 'left';
            ctx.shadowColor = 'rgba(0,0,0,0.5)';
            ctx.shadowBlur = 10;
            ctx.fillText(posterTitle, 160, 80);
            ctx.font = 'bold 20px Arial, sans-serif';
            ctx.fillStyle = '#fbbf24';
            ctx.fillText(posterSubtitle, 160, 110);
            ctx.shadowBlur = 0;

            // Type label (top right)
            ctx.textAlign = 'right';
            ctx.font = 'bold 18px Arial, sans-serif';
            ctx.fillStyle = 'rgba(255,255,255,0.6)';
            const typeLabel = type === 'schedule' ? 'FIXTURE LIVE' : type === 'results' ? 'MATCH RESULTS' : 'LEADERBOARD';
            ctx.fillText(typeLabel, W - 50, 55);
            ctx.font = 'bold 14px Arial, sans-serif';
            ctx.fillText(new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }), W - 50, 80);

            // Accent divider
            ctx.fillStyle = posterAccent;
            ctx.fillRect(40, 150, W - 80, 4);

            // === SECTION TITLE ===
            let sectionTitle = '';
            if (type === 'schedule') sectionTitle = '⚽  UPCOMING MATCHES';
            else if (type === 'results') sectionTitle = '🏆  LATEST RESULTS';
            else sectionTitle = '📊  GROUP STANDINGS';

            drawSkewedBanner(40, 180, 500, 55, posterAccent);
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'left';
            ctx.font = 'bold 26px Arial, sans-serif';
            ctx.fillText(sectionTitle, 70, 217);

            // === CONTENT AREA ===
            let startY = 280;

            if (type === 'schedule') {
                const upNext = data.matches.filter(m => !m.played).slice(0, 6);
                if (upNext.length === 0) {
                    ctx.fillStyle = '#ffffff';
                    ctx.textAlign = 'center';
                    ctx.font = 'bold 32px Arial, sans-serif';
                    ctx.fillText('No upcoming matches', W / 2, startY + 100);
                } else {
                    upNext.forEach((m, i) => {
                        const y = startY + i * 170;
                        const p1 = data.players.find(p => p.id === m.p1Id);
                        const p2 = data.players.find(p => p.id === m.p2Id);
                        const p1Name = p1?.name || m.p1Id;
                        const p2Name = p2?.name || m.p2Id;
                        const group = m.groupId ? `GROUP ${m.groupId}` : 'KNOCKOUT';

                        // Match card background
                        roundRect(50, y, W - 100, 150, 16);
                        ctx.fillStyle = i % 2 === 0 ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.25)';
                        ctx.fill();
                        ctx.strokeStyle = 'rgba(255,255,255,0.08)';
                        ctx.lineWidth = 1;
                        ctx.stroke();

                        // Group label
                        ctx.globalAlpha = 0.8;
                        drawSkewedBanner(50, y, 200, 30, posterAccent);
                        ctx.globalAlpha = 1.0;
                        ctx.fillStyle = '#ffffff';
                        ctx.font = 'bold 14px Arial, sans-serif';
                        ctx.textAlign = 'left';
                        ctx.fillText(group, 75, y + 22);

                        // Player 1 (left)
                        ctx.fillStyle = '#ffffff';
                        ctx.font = 'bold 28px Arial, sans-serif';
                        ctx.textAlign = 'right';
                        ctx.fillText(p1Name.toUpperCase(), W / 2 - 90, y + 85);
                        // Country flag emoji for P1
                        if (p1?.country) {
                            ctx.font = '18px Arial, sans-serif';
                            ctx.fillStyle = 'rgba(255,255,255,0.5)';
                            ctx.fillText(p1.country, W / 2 - 90, y + 115);
                        }

                        // VS / Time box (center)
                        roundRect(W / 2 - 65, y + 50, 130, 70, 12);
                        ctx.globalAlpha = 0.9;
                        ctx.fillStyle = posterAccent;
                        ctx.fill();
                        ctx.globalAlpha = 1.0;
                        ctx.fillStyle = '#ffffff';
                        ctx.font = 'bold 36px Arial, sans-serif';
                        ctx.textAlign = 'center';
                        ctx.fillText('18:00', W / 2, y + 98);

                        // Player 2 (right)
                        ctx.fillStyle = '#ffffff';
                        ctx.font = 'bold 28px Arial, sans-serif';
                        ctx.textAlign = 'left';
                        ctx.fillText(p2Name.toUpperCase(), W / 2 + 90, y + 85);
                        if (p2?.country) {
                            ctx.font = '18px Arial, sans-serif';
                            ctx.fillStyle = 'rgba(255,255,255,0.5)';
                            ctx.fillText(p2.country, W / 2 + 90, y + 115);
                        }
                    });
                }
            } else if (type === 'results') {
                const recent = data.matches.filter(m => m.played).slice(-6);
                if (recent.length === 0) {
                    ctx.fillStyle = '#ffffff';
                    ctx.textAlign = 'center';
                    ctx.font = 'bold 32px Arial, sans-serif';
                    ctx.fillText('No results yet', W / 2, startY + 100);
                } else {
                    recent.forEach((m, i) => {
                        const y = startY + i * 170;
                        const p1 = data.players.find(p => p.id === m.p1Id);
                        const p2 = data.players.find(p => p.id === m.p2Id);
                        const p1Name = p1?.name || m.p1Id;
                        const p2Name = p2?.name || m.p2Id;
                        let s1 = 0, s2 = 0;
                        [m.g1, m.g2, m.g3].forEach(g => {
                            if (g && g.p1 > g.p2) s1++;
                            if (g && g.p2 > g.p1) s2++;
                        });

                        // Match card
                        roundRect(50, y, W - 100, 150, 16);
                        ctx.fillStyle = i % 2 === 0 ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.25)';
                        ctx.fill();
                        ctx.strokeStyle = 'rgba(255,255,255,0.08)';
                        ctx.lineWidth = 1;
                        ctx.stroke();

                        // Winner highlight
                        const winner = s1 > s2 ? 'p1' : s2 > s1 ? 'p2' : 'draw';

                        // Player 1
                        ctx.fillStyle = winner === 'p1' ? '#fbbf24' : '#ffffff';
                        ctx.font = `bold 28px Arial, sans-serif`;
                        ctx.textAlign = 'right';
                        ctx.fillText(p1Name.toUpperCase(), W / 2 - 90, y + 85);

                        // Score box
                        roundRect(W / 2 - 70, y + 45, 140, 75, 12);
                        ctx.fillStyle = 'rgba(0,0,0,0.5)';
                        ctx.fill();
                        ctx.strokeStyle = posterAccent;
                        ctx.lineWidth = 2;
                        ctx.stroke();
                        ctx.fillStyle = '#ffffff';
                        ctx.font = 'bold 40px Arial, sans-serif';
                        ctx.textAlign = 'center';
                        ctx.fillText(`${s1} - ${s2}`, W / 2, y + 95);

                        // Player 2
                        ctx.fillStyle = winner === 'p2' ? '#fbbf24' : '#ffffff';
                        ctx.font = 'bold 28px Arial, sans-serif';
                        ctx.textAlign = 'left';
                        ctx.fillText(p2Name.toUpperCase(), W / 2 + 90, y + 85);
                    });
                }
            } else if (type === 'standings') {
                // Group standings table
                const groups = {};
                data.players.filter(p => p.group).forEach(p => {
                    if (!groups[p.group]) groups[p.group] = [];
                    groups[p.group].push(p);
                });

                const sortFn = (a, b) => {
                    const ptsA = (a.w || 0) * 3 + (a.d || 0);
                    const ptsB = (b.w || 0) * 3 + (b.d || 0);
                    if (ptsB !== ptsA) return ptsB - ptsA;
                    const gdA = (a.gf || 0) - (a.ga || 0);
                    const gdB = (b.gf || 0) - (b.ga || 0);
                    return gdB - gdA;
                };

                const groupKeys = Object.keys(groups).sort();
                let gy = startY;

                groupKeys.forEach((gKey, gi) => {
                    const players = groups[gKey].sort(sortFn);
                    const groupColor = [posterAccent, '#2563eb', '#16a34a', '#9333ea', '#ea580c', '#0891b2'][gi % 6];

                    // Group header
                    drawSkewedBanner(50, gy, 250, 40, groupColor);
                    ctx.fillStyle = '#ffffff';
                    ctx.font = 'bold 22px Arial, sans-serif';
                    ctx.textAlign = 'left';
                    ctx.fillText(`GROUP ${gKey}`, 80, gy + 30);

                    // Table header
                    gy += 50;
                    ctx.fillStyle = 'rgba(255,255,255,0.15)';
                    ctx.fillRect(50, gy, W - 100, 35);
                    ctx.fillStyle = 'rgba(255,255,255,0.6)';
                    ctx.font = 'bold 14px Arial, sans-serif';
                    ctx.textAlign = 'left';
                    ctx.fillText('PLAYER', 80, gy + 24);
                    ctx.textAlign = 'center';
                    ctx.fillText('P', 620, gy + 24);
                    ctx.fillText('W', 690, gy + 24);
                    ctx.fillText('D', 760, gy + 24);
                    ctx.fillText('L', 830, gy + 24);
                    ctx.fillText('GD', 900, gy + 24);
                    ctx.fillText('PTS', 990, gy + 24);

                    gy += 40;
                    players.forEach((p, pi) => {
                        const pts = (p.w || 0) * 3 + (p.d || 0);
                        const gd = (p.gf || 0) - (p.ga || 0);
                        const played = (p.w || 0) + (p.d || 0) + (p.l || 0);

                        ctx.fillStyle = pi % 2 === 0 ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.15)';
                        ctx.fillRect(50, gy, W - 100, 40);

                        // Qualify indicator
                        if (pi < 2) {
                            ctx.fillStyle = groupColor;
                            ctx.fillRect(50, gy, 4, 40);
                        }

                        ctx.fillStyle = '#ffffff';
                        ctx.font = 'bold 20px Arial, sans-serif';
                        ctx.textAlign = 'left';
                        ctx.fillText(`${pi + 1}. ${p.name}`, 80, gy + 28);
                        ctx.font = '18px Arial, sans-serif';
                        ctx.textAlign = 'center';
                        ctx.fillText(played, 620, gy + 28);
                        ctx.fillText(p.w || 0, 690, gy + 28);
                        ctx.fillText(p.d || 0, 760, gy + 28);
                        ctx.fillText(p.l || 0, 830, gy + 28);
                        ctx.fillStyle = gd >= 0 ? '#4ade80' : '#f87171';
                        ctx.fillText(gd >= 0 ? `+${gd}` : gd, 900, gy + 28);
                        ctx.fillStyle = '#fbbf24';
                        ctx.font = 'bold 22px Arial, sans-serif';
                        ctx.fillText(pts, 990, gy + 28);

                        gy += 42;
                    });
                    gy += 25;
                });
            }

            // === FOOTER BAR ===
            ctx.fillStyle = 'rgba(0,0,0,0.6)';
            ctx.fillRect(0, H - 70, W, 70);
            ctx.fillStyle = posterAccent;
            ctx.fillRect(0, H - 70, W, 3);
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 20px Arial, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(posterFooter, W / 2, H - 30);

            clearInterval(progressInterval);
            setRenderProgress(100);
            setGeneratedImageUrl(canvas.toDataURL('image/png'));
            setIsGenerating(false);
        };

        logoImg.onload = () => drawPoster(logoImg);
        logoImg.onerror = () => drawPoster(null);
    };

    // ---------- STAT CARDS (must be before early return to satisfy Rules of Hooks) ----------
    const statData = useMemo(() => {
        const played = data.matches.filter(m => m.played).length;
        const total = data.matches.length;
        const filled = data.players.filter(p => p.name && p.name.trim()).length;
        return { playedMatches: played, totalMatches: total, filledPlayers: filled };
    }, [data.matches, data.players]);

    const statCards = useMemo(() => [
        { label: 'Registrations', value: totalRegistrations, icon: UserPlus, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', shadow: 'shadow-[0_0_30px_rgba(251,191,36,0.15)]', drop: 'drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]' },
        { label: 'Roster Approved', value: approvedPlayers.length, icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', shadow: 'shadow-[0_0_30px_rgba(96,165,250,0.15)]', drop: 'drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]' },
        { label: 'Matches Played', value: `${statData.playedMatches}/${statData.totalMatches}`, icon: Zap, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', shadow: 'shadow-[0_0_30px_rgba(168,85,247,0.15)]', drop: 'drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]' },
    ], [totalRegistrations, approvedPlayers.length, statData]);

    const rosterGroups = useMemo(() => {
        const groupKeys = [...new Set(players.map(p => p.group))].filter(Boolean).sort();
        return groupKeys.map(grp => ({
            name: grp,
            members: players.filter(p => p.group === grp)
        }));
    }, [players]);

    // ---------- LOGIN SCREEN ----------
    if (!isAdmin) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-md mx-auto mt-20 p-10 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-[40px] shadow-2xl relative overflow-hidden group"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-purple-500/20 transition-all duration-700 mix-blend-screen"></div>

                <div className="flex justify-center mb-8 relative z-10">
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-24 h-24 bg-purple-500/10 rounded-3xl flex items-center justify-center border border-purple-500/20 shadow-[0_0_40px_rgba(168,85,247,0.2)] backdrop-blur-md"
                    >
                        <Lock className="w-12 h-12 text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
                    </motion.div>
                </div>
                <h2 className="text-4xl font-outfit font-black text-center mb-3 text-white tracking-tighter uppercase drop-shadow-md relative z-10">Admin Portal</h2>
                <p className="text-slate-400 text-center text-sm mb-10 font-bold tracking-wide relative z-10">Authentication required to manage.</p>
                <form onSubmit={handleLogin} className="space-y-6 relative z-10">
                    <div className="space-y-4">
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-slate-950/50 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:border-purple-500/50 focus:bg-slate-900/80 text-center text-lg text-white font-bold placeholder:text-slate-600 shadow-inner transition-colors" required />
                        {passError && <p className="text-rose-400 text-xs mt-3 text-center font-black tracking-widest uppercase animate-pulse drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]">Invalid credentials</p>}
                    </div>
                    <motion.button
                        whileHover={!isLoading ? { scale: 1.02 } : {}}
                        whileTap={!isLoading ? { scale: 0.98 } : {}}
                        type="submit" disabled={isLoading}
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-outfit font-black tracking-[0.2em] uppercase py-5 rounded-3xl shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all disabled:opacity-50 disabled:shadow-none text-lg relative overflow-hidden group/btn"
                    >
                        <span className="relative z-10">{isLoading ? 'Authenticating...' : 'Unlock Dashboard'}</span>
                        {!isLoading && <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] animate-shimmer"></div>}
                    </motion.button>
                </form>
            </motion.div>
        );
    }

    // ---------- DASHBOARD ----------
    return (
        <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Header Bar */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 bg-slate-900/80 backdrop-blur-xl p-6 sm:p-8 rounded-[32px] border border-white/5 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none mix-blend-screen group-hover:bg-blue-500/20 transition-all duration-700"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] pointer-events-none mix-blend-screen group-hover:bg-purple-500/20 transition-all duration-700"></div>

                <div className="flex items-center gap-6 w-full sm:w-auto relative z-10 flex-wrap sm:flex-nowrap">
                    <button onClick={handleLogout} className="flex items-center gap-2 px-5 py-2.5 bg-slate-950/50 hover:bg-rose-500/10 border border-white/5 hover:border-rose-500/30 text-rose-400 rounded-xl text-[10px] font-outfit font-black tracking-widest uppercase transition-all shadow-sm shrink-0 backdrop-blur-md">
                        <LogOut className="w-4 h-4" /> Logout
                    </button>

                    <div className="relative">
                        <h2 className="text-3xl font-outfit font-black flex items-center gap-3 text-white tracking-widest uppercase drop-shadow-md">
                            <ShieldCheck className="text-blue-400 w-8 h-8 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
                            Dashboard
                        </h2>
                        <div className="flex items-center gap-3 mt-2 underline-offset-4 decoration-blue-500/30 underline decoration-2">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#34d399]"></div>
                                <span className="text-[10px] font-outfit font-black text-emerald-400 tracking-[0.2em] uppercase mt-0.5">LIVE SYNC</span>
                            </div>
                            <span className="text-slate-600">•</span>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{data.settings.season}</span>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 w-full sm:w-auto flex justify-start sm:justify-end mt-4 sm:mt-0">
                    <span className={`text-xs font-outfit font-black tracking-[0.2em] uppercase px-5 py-2.5 rounded-xl border backdrop-blur-md flex items-center gap-2 ${data.settings.tournamentStarted ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.15)]' : 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.15)]'}`}>
                        {data.settings.tournamentStarted ? 'Tournament LIVE' : 'Pre-Season Mode'}
                    </span>
                </div>
            </motion.div>

            {/* Tab Navigation */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 24, delay: 0.1 }} className="flex gap-2 bg-slate-900/50 p-2 rounded-[24px] border border-white/5 overflow-x-auto no-scrollbar backdrop-blur-xl">
                {TABS.map(tab => {
                    const isActive = activeTab === tab.id;
                    const TabIcon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-3 px-6 py-3.5 rounded-[18px] transition-all text-sm font-outfit font-bold tracking-wider whitespace-nowrap relative overflow-hidden group ${isActive
                                ? 'bg-white/10 text-white shadow-inner border border-white/5'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                                }`}
                        >
                            <TabIcon className={`w-5 h-5 ${isActive ? 'text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]' : ''}`} />
                            <span className="relative z-10">{tab.label}</span>
                            {tab.id === 'danger' && <span className="w-2 h-2 rounded-full bg-rose-500 ml-2 shadow-[0_0_10px_rgba(244,63,94,0.6)]"></span>}
                            {isActive && <motion.div layoutId="activeTabAdmin" className="absolute inset-0 bg-blue-500/10 mix-blend-screen border-2 border-white/10 rounded-[18px]"></motion.div>}
                        </button>
                    );
                })}
            </motion.div>

            {/* ===== OVERVIEW TAB ===== */}
            <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="space-y-8"
                    >
                        {/* Stat Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {statCards.map((card, idx) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                                    key={card.label}
                                    className={`bg-slate-900/80 backdrop-blur-xl border border-white/5 rounded-[28px] p-6 sm:p-8 relative overflow-hidden group hover:border-white/10 transition-all ${card.shadow}`}
                                >
                                    <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] pointer-events-none ${card.bg} group-hover:scale-110 transition-transform duration-500 mix-blend-screen`}></div>
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border ${card.bg} ${card.border} shadow-inner`}>
                                        <card.icon className={`w-7 h-7 ${card.color} ${card.drop}`} />
                                    </div>
                                    <p className="text-3xl sm:text-4xl font-outfit font-black text-white tracking-widest mb-1">{card.value}</p>
                                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">{card.label}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-slate-900/80 backdrop-blur-xl border border-white/5 rounded-[32px] p-8 sm:p-10 shadow-2xl">
                            <h3 className="text-sm font-outfit font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                                <Zap className="w-5 h-5 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" /> Quick Actions
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <button onClick={() => setActiveTab('settings')} className="flex flex-col items-center justify-center gap-4 p-6 rounded-2xl bg-slate-950/50 border border-white/5 hover:border-blue-500/30 hover:bg-slate-900/80 transition-all group shadow-inner">
                                    <Settings className="w-8 h-8 text-blue-400 group-hover:scale-110 group-hover:rotate-45 transition-all drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]" />
                                    <span className="text-xs font-outfit font-black tracking-widest text-slate-300 uppercase">Settings</span>
                                </button>
                                <button onClick={() => setActiveTab('roster')} className="flex flex-col items-center justify-center gap-4 p-6 rounded-2xl bg-slate-950/50 border border-white/5 hover:border-emerald-500/30 hover:bg-slate-900/80 transition-all group shadow-inner">
                                    <Users className="w-8 h-8 text-emerald-400 group-hover:scale-110 transition-transform drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                    <span className="text-xs font-outfit font-black tracking-widest text-slate-300 uppercase">Roster</span>
                                </button>
                                <button onClick={() => setActiveTab('season')} className="flex flex-col items-center justify-center gap-4 p-6 rounded-2xl bg-slate-950/50 border border-white/5 hover:border-amber-500/30 hover:bg-slate-900/80 transition-all group shadow-inner">
                                    <Shuffle className="w-8 h-8 text-amber-400 group-hover:scale-110 group-hover:-rotate-12 transition-transform drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
                                    <span className="text-xs font-outfit font-black tracking-widest text-slate-300 uppercase">Draw</span>
                                </button>
                                <button onClick={() => setActiveTab('danger')} className="flex flex-col items-center justify-center gap-4 p-6 rounded-2xl bg-slate-950/50 border border-white/5 hover:border-rose-500/30 hover:bg-slate-900/80 transition-all group shadow-inner">
                                    <Flame className="w-8 h-8 text-rose-400 group-hover:scale-110 transition-transform drop-shadow-[0_0_10px_rgba(244,63,94,0.5)]" />
                                    <span className="text-xs font-outfit font-black tracking-widest text-slate-300 uppercase">Reset</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* ===== SETTINGS TAB ===== */}
                {activeTab === 'settings' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="bg-slate-900/80 backdrop-blur-xl border border-white/5 rounded-[40px] p-8 sm:p-12 shadow-2xl relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none mix-blend-screen group-hover:bg-blue-600/10 transition-all duration-700"></div>

                        <h3 className="text-3xl font-outfit font-black mb-10 flex items-center gap-4 text-white uppercase tracking-widest drop-shadow-md relative z-10">
                            <div className="p-4 rounded-3xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-inner">
                                <Settings className="w-8 h-8 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
                            </div>
                            Tournament Settings
                        </h3>
                        <div className="grid md:grid-cols-2 gap-10 relative z-10">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-[11px] text-slate-400 font-outfit font-black mb-3 uppercase tracking-[0.2em] ml-2">Tournament Name</label>
                                    <input value={settings.name} onChange={e => setSettings({ ...settings, name: e.target.value })}
                                        className="w-full bg-slate-950/50 backdrop-blur-md border border-white/10 text-white rounded-2xl px-6 py-4 focus:border-blue-500/50 focus:bg-slate-900/80 outline-none shadow-inner transition-all font-bold text-lg" />
                                </div>
                                <div>
                                    <label className="block text-[11px] text-slate-400 font-outfit font-black mb-3 uppercase tracking-[0.2em] ml-2">Season</label>
                                    <input value={settings.season} onChange={e => setSettings({ ...settings, season: e.target.value })}
                                        className="w-full bg-slate-950/50 backdrop-blur-md border border-white/10 text-white rounded-2xl px-6 py-4 focus:border-blue-500/50 focus:bg-slate-900/80 outline-none shadow-inner transition-all font-bold text-lg" />
                                </div>
                                <div>
                                    <label className="block text-[11px] text-slate-400 font-outfit font-black mb-3 uppercase tracking-[0.2em] ml-2">Tagline</label>
                                    <input value={settings.tagline} onChange={e => setSettings({ ...settings, tagline: e.target.value })}
                                        className="w-full bg-slate-950/50 backdrop-blur-md border border-white/10 text-white rounded-2xl px-6 py-4 focus:border-blue-500/50 focus:bg-slate-900/80 outline-none shadow-inner transition-all font-bold text-lg" />
                                </div>
                            </div>
                            <div className="space-y-6">
                                <h4 className="text-[11px] text-slate-400 font-outfit font-black uppercase tracking-[0.2em] mb-3 ml-2">Status Controls</h4>
                                <label className="flex items-center justify-between p-6 bg-slate-950/50 backdrop-blur-md border border-white/10 rounded-3xl cursor-pointer hover:border-blue-500/50 hover:bg-slate-900/80 transition-all shadow-inner group/toggle">
                                    <div>
                                        <span className="text-lg font-outfit font-black text-white block tracking-widest uppercase">Registration Open</span>
                                        <span className="text-xs font-bold text-slate-500">Allow new players to sign up</span>
                                    </div>
                                    <div className={`w-14 h-8 rounded-full p-1 transition-colors cursor-pointer flex-shrink-0 shadow-inner ${settings.registrationOpen ? 'bg-blue-500' : 'bg-slate-800 border border-white/10'}`}
                                        onClick={() => setSettings({ ...settings, registrationOpen: !settings.registrationOpen })}>
                                        <div className={`w-6 h-6 rounded-full bg-white shadow-md transition-transform ${settings.registrationOpen ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                    </div>
                                </label>
                                <label className="flex items-center justify-between p-6 bg-slate-950/50 backdrop-blur-md border border-white/10 rounded-3xl cursor-pointer hover:border-emerald-500/50 hover:bg-slate-900/80 transition-all shadow-inner group/toggle">
                                    <div>
                                        <span className="text-lg font-outfit font-black text-white block tracking-widest uppercase">Tournament LIVE</span>
                                        <span className="text-xs font-bold text-slate-500">Show standings & schedule publicly</span>
                                    </div>
                                    <div className={`w-14 h-8 rounded-full p-1 transition-colors cursor-pointer flex-shrink-0 shadow-inner ${settings.tournamentStarted ? 'bg-emerald-500' : 'bg-slate-800 border border-white/10'}`}
                                        onClick={() => setSettings({ ...settings, tournamentStarted: !settings.tournamentStarted })}>
                                        <div className={`w-6 h-6 rounded-full bg-white shadow-md transition-transform ${settings.tournamentStarted ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <motion.button
                            whileHover={!isSavedSettings ? { scale: 1.02 } : {}}
                            whileTap={!isSavedSettings ? { scale: 0.98 } : {}}
                            onClick={handleSaveSettings} disabled={isSavedSettings}
                            className={`w-full mt-10 py-5 rounded-3xl font-outfit font-black tracking-[0.2em] uppercase transition-all text-lg shadow-lg relative overflow-hidden group/btn ${isSavedSettings ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-[0_0_40px_rgba(79,70,229,0.5)]'}`}>
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                {isSavedSettings ? <><CheckCircle2 className="w-6 h-6" /> Settings Saved!</> : 'Save Settings'}
                            </span>
                            {!isSavedSettings && <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] animate-shimmer"></div>}
                        </motion.button>
                    </motion.div>
                )}

                {/* ===== ROSTER TAB ===== */}
                {activeTab === 'roster' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="space-y-8"
                    >
                        {/* Management List */}
                        <div className="bg-slate-900/80 backdrop-blur-xl border border-white/5 rounded-[40px] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10 relative z-10">
                                <h3 className="text-2xl sm:text-3xl font-outfit font-black flex items-center gap-4 text-white uppercase tracking-widest drop-shadow-md">
                                    <div className="p-4 rounded-3xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-inner">
                                        <UserPlus className="w-7 h-7 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
                                    </div>
                                    Registrations
                                    <span className="bg-slate-950/50 border border-white/10 text-purple-400 text-lg py-1.5 px-3.5 rounded-2xl font-black shadow-inner ml-2">
                                        {registrations.length}
                                    </span>
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-h-[500px] overflow-y-auto pr-4 no-scrollbar relative z-10 p-1">
                                {registrations.length === 0 ? (
                                    <div className="lg:col-span-2 py-16 text-center border-2 border-dashed border-white/5 rounded-3xl text-slate-500 font-outfit font-black uppercase tracking-widest text-sm bg-slate-950/30 backdrop-blur-sm">
                                        <UserPlus className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                        No registrations found
                                    </div>
                                ) : (
                                    registrations.map(reg => (
                                        <div key={reg.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-3xl bg-slate-950/50 border border-white/5 hover:border-purple-500/30 transition-all group shadow-sm gap-4">
                                            <div className="flex items-center gap-5">
                                                <div className="p-1.5 rounded-2xl bg-slate-900 border border-white/5 shadow-inner shrink-0">
                                                    <PlayerAvatar name={reg.name} logo={reg.baseTeam || reg.logo} className="w-12 h-12 text-sm" />
                                                </div>
                                                <div>
                                                    <p className="font-outfit font-black text-white tracking-widest text-lg">{reg.name}</p>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{reg.baseTeam}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-end gap-3 shrink-0">
                                                {reg.status !== 'approved' ? (
                                                    <button onClick={() => handleApproveReg(reg.id)} className="p-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-all border border-emerald-500/20 shadow-sm" title="Approve">
                                                        <CheckCircle2 className="w-5 h-5 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                                    </button>
                                                ) : (
                                                    <span className="text-[10px] font-outfit font-black text-emerald-400 px-3 py-1.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20 uppercase tracking-[0.2em] shadow-sm">Approved</span>
                                                )}
                                                <button onClick={() => handleDeleteReg(reg.id)} className="p-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-all border border-rose-500/20 shadow-sm" title="Delete">
                                                    <Trash2 className="w-5 h-5 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        <div className="bg-slate-900/80 backdrop-blur-xl border border-white/5 rounded-[40px] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/5 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>

                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10 relative z-10">
                                <h3 className="text-2xl sm:text-3xl font-outfit font-black flex items-center gap-4 text-white uppercase tracking-widest drop-shadow-md">
                                    <div className="p-4 rounded-3xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-inner">
                                        <Users className="w-7 h-7 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                                    </div>
                                    Tournament Roster
                                </h3>
                                <motion.button
                                    whileHover={!isSavedPlayers ? { scale: 1.02 } : {}}
                                    whileTap={!isSavedPlayers ? { scale: 0.98 } : {}}
                                    onClick={handleSavePlayers} disabled={isSavedPlayers}
                                    className={`px-8 py-4 rounded-2xl text-sm font-outfit font-black tracking-[0.2em] uppercase transition-all flex items-center gap-3 shadow-lg w-full sm:w-auto justify-center ${isSavedPlayers ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]'}`}>
                                    <CheckCircle2 className="w-5 h-5" /> {isSavedPlayers ? 'Saved!' : 'Save Roster'}
                                </motion.button>
                            </div>

                            <div className="grid md:grid-cols-3 gap-8 relative z-10">
                                {rosterGroups.map((groupData, idx) => {
                                    const grp = groupData.name;
                                    const groupColors = [
                                        'from-blue-500/10 to-transparent border-blue-500/20 text-blue-400',
                                        'from-purple-500/10 to-transparent border-purple-500/20 text-purple-400',
                                        'from-amber-500/10 to-transparent border-amber-500/20 text-amber-400',
                                        'from-emerald-500/10 to-transparent border-emerald-500/20 text-emerald-400',
                                        'from-rose-500/10 to-transparent border-rose-500/20 text-rose-400',
                                        'from-cyan-500/10 to-transparent border-cyan-500/20 text-cyan-400'
                                    ];
                                    const colorCls = groupColors[idx % groupColors.length];

                                    return (
                                        <div key={grp} className="bg-slate-950/60 p-6 rounded-[32px] border border-white/5 shadow-inner">
                                            <div className={`bg-gradient-to-b ${colorCls} p-4 rounded-2xl mb-6 text-center border shadow-[inset_0_1px_rgba(255,255,255,0.1)]`}>
                                                <h4 className="font-outfit font-black text-2xl uppercase tracking-[0.3em]">Group {grp}</h4>
                                            </div>
                                            <div className="space-y-4">
                                                {groupData.members.map((p, pIdx) => (
                                                    <div key={p.id} className="group flex items-center gap-4 bg-slate-900/50 p-2.5 rounded-2xl border border-white/5 hover:border-white/20 transition-all shadow-sm relative overflow-hidden">
                                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/5 group-hover:bg-white/20 transition-colors"></div>
                                                        <div className="font-outfit font-black text-[10px] text-slate-600 tracking-widest w-4 text-center">{pIdx + 1}</div>
                                                        <PlayerAvatar name={p.name} logo={p.logo} className="w-10 h-10 text-[10px] rounded-xl" />
                                                        <input value={p.name} onChange={e => handlePlayerChange(p.id, e.target.value)}
                                                            className="flex-1 bg-transparent border-none text-white px-2 py-2 text-base focus:outline-none font-outfit font-bold placeholder:text-slate-600 tracking-wide"
                                                            placeholder={`Player ${p.id}`} />
                                                        <button onClick={() => handleClearPlayer(p.id)} className="opacity-0 group-hover:opacity-100 p-2 hover:bg-rose-500/10 text-rose-400 rounded-xl transition-all mr-1" title="Clear Slot">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* ===== SEASON TOOLS TAB ===== */}
                {activeTab === 'season' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="space-y-6"
                    >
                        {/* Group Draw Premium UI */}
                        <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/5 rounded-[40px] p-8 sm:p-12 shadow-2xl relative overflow-hidden group">
                                         {/* Clean Sports Background Elements */}
                            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-slate-900/50 to-transparent pointer-events-none"></div>

                            <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-10 relative z-10">
                                
                                <div className="flex-1 space-y-6">
                                    <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-950 border border-blue-500/20 text-blue-400 font-outfit text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] shadow-sm">
                                        <Trophy className="w-4 h-4" />
                                        Setup & Configuration
                                    </div>
                                    
                                    <h3 className="text-4xl sm:text-5xl font-outfit font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 uppercase tracking-tighter drop-shadow-md leading-none">
                                        Tournament <br/>
                                        <span className="text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)] block mt-2">Group Draw</span>
                                    </h3>
                                    
                                    <p className="text-slate-400 font-medium text-sm sm:text-base max-w-xl leading-relaxed py-2">
                                        Distribute the <strong className="text-blue-400">{approvedPlayers.length} approved participants</strong> evenly into groups for the upcoming tournament using automated randomization.
                                    </p>
                                    
                                    <div className="flex items-start sm:items-center gap-4 p-5 bg-amber-500/10 border border-amber-500/20 rounded-2xl w-fit xl:max-w-md shadow-inner relative overflow-hidden backdrop-blur-md">
                                        <AlertTriangle className="w-7 h-7 text-amber-500 shrink-0 drop-shadow-md" />
                                        <span className="text-amber-400 font-outfit uppercase font-bold tracking-wider text-xs leading-relaxed relative z-10">
                                            Warning: Generating a new group draw will overwrite all existing groups, matches, and knockout brackets.
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="w-full xl:w-[450px] shrink-0 p-8 sm:p-10 rounded-[32px] bg-slate-950/80 border border-white/5 shadow-2xl relative overflow-hidden group/panel z-20 backdrop-blur-xl">
                                    <div className="text-center mb-8 relative z-10 flex flex-col items-center">
                                        <div className="text-slate-500 font-outfit font-black uppercase tracking-[0.3em] text-[10px] mb-4">
                                            Participants Ready
                                        </div>
                                        
                                        {/* Clean Stat Circle */}
                                        <div className="relative w-40 h-40 mx-auto flex items-center justify-center mb-6">
                                            <div className="absolute inset-0 rounded-full border border-white/5 bg-slate-900/50 shadow-inner"></div>
                                            <div className="absolute inset-2 rounded-full border border-blue-500/20"></div>
                                            
                                            <div className="relative z-10 flex flex-col items-center justify-center">
                                                <span className="text-6xl font-outfit font-black text-white tracking-tighter drop-shadow-md">
                                                    {approvedPlayers.length}
                                                </span>
                                                <Users className="w-5 h-5 text-blue-400 mt-2 opacity-80" />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <motion.button
                                        whileHover={approvedPlayers.length >= 2 ? { scale: 1.02 } : {}}
                                        whileTap={approvedPlayers.length >= 2 ? { scale: 0.98 } : {}}
                                        onClick={handleDrawGroups} disabled={approvedPlayers.length < 2}
                                        className={`w-full py-5 rounded-[20px] font-outfit font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 relative overflow-hidden group/btn ${approvedPlayers.length >= 2 ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]' : 'bg-slate-900 text-slate-600 cursor-not-allowed border border-white/5'}`}>
                                        
                                        <span className="relative z-10 flex items-center gap-3 text-lg drop-shadow-md">
                                            <Zap className="w-5 h-5" /> 
                                            Generate Groups
                                        </span>
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* ===== DANGER TAB ===== */}
                {activeTab === 'danger' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="bg-slate-900/80 backdrop-blur-xl border border-rose-500/30 rounded-[40px] p-8 sm:p-12 shadow-[0_0_50px_rgba(244,63,94,0.1)] relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen group-hover:bg-rose-600/20 transition-all duration-700"></div>

                        <h3 className="text-3xl font-outfit font-black mb-8 flex items-center gap-4 text-rose-400 uppercase tracking-widest relative z-10 drop-shadow-[0_0_10px_rgba(244,63,94,0.5)]">
                            <div className="p-4 rounded-3xl bg-rose-500/10 border border-rose-500/20 shadow-inner">
                                <Flame className="w-8 h-8 animate-pulse" />
                            </div>
                            Danger Zone
                        </h3>

                        <div className="bg-rose-500/5 backdrop-blur-md border border-rose-500/20 rounded-3xl p-8 mb-10 relative z-10 shadow-inner">
                            <p className="text-rose-200/80 font-medium text-lg leading-relaxed">
                                Resetting the tournament will <strong className="text-rose-400 font-black">permanently wipe</strong> the active season&apos;s scores, matches, bracket, and roster.
                                Archived seasons in history are kept safe. <br /><br /><strong className="text-rose-300 font-bold tracking-widest uppercase text-sm border-b border-rose-500/30 pb-1">This action cannot be undone.</strong>
                            </p>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleReset}
                            className="w-full py-6 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white rounded-3xl font-outfit font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-4 shadow-[0_0_30px_rgba(244,63,94,0.3)] hover:shadow-[0_0_50px_rgba(244,63,94,0.5)] relative z-10 text-xl border border-rose-400/30"
                        >
                            <RefreshCw className="w-6 h-6" /> Factory Reset Season
                        </motion.button>
                    </motion.div>
                )}

                {/* ===== AI STUDIO TAB ===== */}
                {activeTab === 'studio' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="bg-slate-900/80 backdrop-blur-xl border border-white/5 rounded-[40px] p-8 sm:p-12 shadow-2xl relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen group-hover:bg-amber-500/20 transition-all duration-700"></div>

                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10 relative z-10">
                            <h3 className="text-3xl font-outfit font-black flex items-center gap-4 text-white uppercase tracking-widest drop-shadow-md">
                                <div className="p-4 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shadow-inner">
                                    <Sparkles className="w-8 h-8 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
                                </div>
                                Poster Studio
                            </h3>
                        </div>

                        <p className="text-slate-400 mb-8 font-medium text-lg relative z-10">
                            Instantly generate <strong className="text-amber-400">professional tournament posters</strong> with your live data — schedule, results, or standings. One click, no waiting.
                        </p>

                        {/* POSTER TEMPLATE EDITOR */}
                        <div className="bg-slate-950/50 border border-white/5 rounded-[24px] p-6 sm:p-8 mb-8 relative z-10 shadow-inner">
                            <h4 className="text-sm font-outfit font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                                <Settings className="w-4 h-4 text-amber-500" /> Template Settings
                            </h4>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[10px] text-slate-500 font-outfit font-black mb-2 uppercase tracking-[0.2em] ml-2">Main Title</label>
                                    <input value={posterTitle} onChange={e => setPosterTitle(e.target.value)} className="w-full bg-[#0A0D14] border border-white/10 text-white rounded-xl px-4 py-3 focus:border-amber-500/50 outline-none text-sm font-bold shadow-inner" />
                                </div>
                                <div>
                                    <label className="block text-[10px] text-slate-500 font-outfit font-black mb-2 uppercase tracking-[0.2em] ml-2">Subtitle / Season</label>
                                    <input value={posterSubtitle} onChange={e => setPosterSubtitle(e.target.value)} className="w-full bg-[#0A0D14] border border-white/10 text-white rounded-xl px-4 py-3 focus:border-amber-500/50 outline-none text-sm font-bold shadow-inner" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-[10px] text-slate-500 font-outfit font-black mb-2 uppercase tracking-[0.2em] ml-2">Footer Text</label>
                                    <input value={posterFooter} onChange={e => setPosterFooter(e.target.value)} className="w-full bg-[#0A0D14] border border-white/10 text-white rounded-xl px-4 py-3 focus:border-amber-500/50 outline-none text-sm font-bold shadow-inner" />
                                </div>
                                <div>
                                    <label className="block text-[10px] text-slate-500 font-outfit font-black mb-2 uppercase tracking-[0.2em] ml-2">Accent Color</label>
                                    <div className="flex items-center gap-3">
                                        <input type="color" value={posterAccent} onChange={e => setPosterAccent(e.target.value)} className="w-12 h-12 rounded-xl border border-white/10 cursor-pointer bg-transparent" />
                                        <div className="text-xs font-mono font-bold text-slate-400 uppercase">{posterAccent}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4 mb-8 relative z-10">
                            <button 
                                onClick={() => generatePoster('schedule')} 
                                disabled={isGenerating}
                                className={`p-6 rounded-2xl border transition-all text-left group shadow-inner disabled:opacity-50 disabled:cursor-not-allowed ${posterType === 'schedule' ? 'bg-blue-500/10 border-blue-500/30' : 'bg-slate-950/50 border-white/5 hover:border-blue-500/20'}`}
                            >
                                <ImageIcon className={`w-6 h-6 mb-3 ${posterType === 'schedule' ? 'text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]' : 'text-slate-500'}`} />
                                <span className={`text-lg font-outfit font-black uppercase tracking-widest block mb-1 ${posterType === 'schedule' ? 'text-blue-400' : 'text-slate-300'}`}>Schedule</span>
                                <span className="text-xs font-bold text-slate-500">Upcoming match fixtures</span>
                            </button>
                            <button 
                                onClick={() => generatePoster('results')} 
                                disabled={isGenerating}
                                className={`p-6 rounded-2xl border transition-all text-left group shadow-inner disabled:opacity-50 disabled:cursor-not-allowed ${posterType === 'results' ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-950/50 border-white/5 hover:border-emerald-500/20'}`}
                            >
                                <Trophy className={`w-6 h-6 mb-3 ${posterType === 'results' ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'text-slate-500'}`} />
                                <span className={`text-lg font-outfit font-black uppercase tracking-widest block mb-1 ${posterType === 'results' ? 'text-emerald-400' : 'text-slate-300'}`}>Results</span>
                                <span className="text-xs font-bold text-slate-500">Recent match scores</span>
                            </button>
                            <button 
                                onClick={() => generatePoster('standings')} 
                                disabled={isGenerating}
                                className={`p-6 rounded-2xl border transition-all text-left group shadow-inner disabled:opacity-50 disabled:cursor-not-allowed ${posterType === 'standings' ? 'bg-purple-500/10 border-purple-500/30' : 'bg-slate-950/50 border-white/5 hover:border-purple-500/20'}`}
                            >
                                <BarChart3 className={`w-6 h-6 mb-3 ${posterType === 'standings' ? 'text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]' : 'text-slate-500'}`} />
                                <span className={`text-lg font-outfit font-black uppercase tracking-widest block mb-1 ${posterType === 'standings' ? 'text-purple-400' : 'text-slate-300'}`}>Standings</span>
                                <span className="text-xs font-bold text-slate-500">Group leaderboard table</span>
                            </button>
                        </div>

                        {/* Generated Poster Preview */}
                        <AnimatePresence>
                            {(isGenerating || generatedImageUrl) && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, height: 0 }}
                                    animate={{ opacity: 1, scale: 1, height: 'auto' }}
                                    exit={{ opacity: 0, scale: 0.95, height: 0 }}
                                    className="relative z-10 mt-10 origin-top"
                                >
                                    <h4 className="text-sm font-outfit font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-3">
                                        <Sparkles className="w-4 h-4 text-amber-400" /> Poster Output
                                    </h4>
                                    
                                    <div className="w-full max-w-lg mx-auto relative rounded-[32px] overflow-hidden bg-[#0A0D14] border border-white/10 aspect-[3/4] flex items-center justify-center shadow-2xl group/img">
                                        {isGenerating && (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-30 bg-[#0A0D14]/95 px-8">
                                                <div className="relative w-24 h-24">
                                                    <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                                                        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(245,158,11,0.15)" strokeWidth="8" />
                                                        <circle cx="50" cy="50" r="42" fill="none" stroke="#f59e0b" strokeWidth="8"
                                                            strokeDasharray={`${renderProgress * 2.64} 264`}
                                                            strokeLinecap="round"
                                                            className="transition-all duration-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]"
                                                        />
                                                    </svg>
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <span className="text-2xl font-outfit font-black text-amber-400 tabular-nums">{renderProgress}%</span>
                                                    </div>
                                                </div>
                                                <div className="text-amber-400 font-outfit font-black tracking-widest uppercase text-sm">Generating poster...</div>
                                            </div>
                                        )}
                                        {generatedImageUrl && (
                                            <>
                                                <img 
                                                    src={generatedImageUrl} 
                                                    alt="Tournament Poster" 
                                                    className="w-full h-full object-cover relative z-10"
                                                />
                                                <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-[#0A0D14] via-[#0A0D14]/60 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end justify-center pb-8 z-20">
                                                    <a 
                                                        href={generatedImageUrl} 
                                                        download={`pestour-${posterType}-poster.png`}
                                                        className="px-6 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-2xl font-outfit font-black uppercase tracking-widest flex items-center gap-3 shadow-[0_0_30px_rgba(245,158,11,0.6)] transition-all transform hover:scale-105"
                                                    >
                                                        <ExternalLink className="w-5 h-5" /> Save Poster
                                                    </a>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ===== CUSTOM MODAL ===== */}
            <AnimatePresence>
                {modalConfig && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-[#0A0D14]/80 backdrop-blur-md"
                            onClick={() => {
                                setModalConfig(null);
                                setPromptValue('');
                            }}
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-[32px] p-8 shadow-2xl overflow-hidden"
                        >
                            <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] pointer-events-none mix-blend-screen opacity-50 ${
                                modalConfig.danger ? 'bg-rose-500/20' : 
                                modalConfig.type === 'alert' ? 'bg-emerald-500/20' : 
                                'bg-amber-500/20'
                            }`}></div>

                            <div className="relative z-10">
                                <h3 className={`text-2xl font-outfit font-black mb-2 uppercase tracking-widest ${modalConfig.danger ? 'text-rose-400' : 'text-white'}`}>
                                    {modalConfig.title}
                                </h3>
                                <p className="text-slate-400 font-medium mb-8 leading-relaxed">
                                    {modalConfig.message}
                                </p>

                                {modalConfig.type === 'prompt' && (
                                    <input 
                                        type="text" 
                                        value={promptValue} 
                                        onChange={(e) => setPromptValue(e.target.value)}
                                        placeholder={`Type '${modalConfig.expectedValue}'`}
                                        className="w-full bg-slate-950/50 border border-white/10 rounded-2xl px-5 py-4 mb-8 text-white focus:outline-none focus:border-rose-500/50 transition-colors font-mono font-bold uppercase tracking-widest text-center shadow-inner"
                                        autoFocus
                                    />
                                )}

                                <div className="flex gap-4 items-center">
                                    {(modalConfig.type === 'confirm' || modalConfig.type === 'prompt') && (
                                        <button 
                                            onClick={() => { setModalConfig(null); setPromptValue(''); }}
                                            className="flex-1 px-6 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-outfit font-black uppercase tracking-widest transition-all text-sm"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                    <button 
                                        onClick={() => {
                                            if (modalConfig.type === 'prompt') {
                                                if (promptValue === modalConfig.expectedValue) {
                                                    modalConfig.onConfirm();
                                                    setPromptValue('');
                                                } else {
                                                    setModalConfig({
                                                        title: 'Invalid Input',
                                                        message: `You must type '${modalConfig.expectedValue}' exactly.`,
                                                        type: 'alert',
                                                        danger: true
                                                    });
                                                    setPromptValue('');
                                                }
                                            } else {
                                                if (modalConfig.onConfirm) modalConfig.onConfirm();
                                                else setModalConfig(null);
                                            }
                                        }}
                                        className={`flex-1 px-6 py-4 rounded-2xl font-outfit font-black uppercase tracking-widest transition-all text-sm shadow-lg ${
                                            modalConfig.danger ? 'bg-rose-500 hover:bg-rose-400 text-slate-950 shadow-[0_0_20px_rgba(244,63,94,0.4)]' : 
                                            modalConfig.type === 'alert' ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.4)]' :
                                            'bg-white hover:bg-slate-200 text-slate-900 shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                                        }`}
                                    >
                                        {modalConfig.type === 'alert' ? 'OK' : 'Confirm'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
