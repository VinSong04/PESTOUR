import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Image, Download, RefreshCw, Palette } from 'lucide-react';
import { renderClassicPoster, renderNeonPoster } from '../../utils/posterGenerator';
import palletLogo from '../../assets/pallet.jpg';

const POSTER_TYPES = [
    { id: 'schedule', label: 'Schedule', emoji: '⚽' },
    { id: 'results', label: 'Results', emoji: '🏆' },
    { id: 'standings', label: 'Standings', emoji: '📊' },
];

const THEMES = [
    { id: 'classic', label: 'Classic', color: '#8b2525' },
    { id: 'neon', label: 'Neon', color: '#00d4ff' },
];

const CANVAS_W = 1080;
const CANVAS_H = 1920;

export default function AdminPosterTab({ data, settings }) {
    const canvasRef = useRef(null);
    const [posterType, setPosterType] = useState('schedule');
    const [theme, setTheme] = useState('neon');
    const [generating, setGenerating] = useState(false);
    const [generated, setGenerated] = useState(false);
    const [config, setConfig] = useState({
        posterTitle: settings?.tournamentName || 'PES TOUR',
        posterSubtitle: settings?.season || 'Season 1',
        posterFooter: '⚽ PES TOUR — Legends Start Here',
        posterAccent: '#e63946',
        posterDate: new Date().toISOString().split('T')[0],
        posterMatchTime: 'WEEKEND PLAYED',
    });

    const logoRef = useRef(null);

    const handleGenerate = useCallback(async () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        setGenerating(true);
        setGenerated(false);

        // Compute dynamic height to fit all elements
        let dynamicH = 1920;
        if (posterType === 'schedule') {
            const count = data.matches.filter(m => !m.played).length;
            dynamicH = Math.max(1200, 320 + count * 175);
        } else if (posterType === 'results') {
            const count = data.matches.filter(m => m.played).length;
            dynamicH = Math.max(1200, 320 + count * 175);
        } else if (posterType === 'standings') {
            const groups = {};
            data.players.filter(p => p.group).forEach(p => {
                if (!groups[p.group]) groups[p.group] = [];
                groups[p.group].push(p);
            });
            const groupKeys = Object.keys(groups);
            let estimatedH = 320;
            groupKeys.forEach(gKey => {
                const pCount = groups[gKey].length;
                estimatedH += 60 + 35 + 40 + pCount * 46 + 30;
            });
            dynamicH = Math.max(1200, estimatedH);
        }

        const ctx = canvas.getContext('2d');
        canvas.width = CANVAS_W;
        canvas.height = dynamicH;

        // Load logo
        let logo = logoRef.current;
        if (!logo) {
            try {
                const img = new window.Image();
                img.crossOrigin = 'anonymous';
                await new Promise((resolve, reject) => {
                    img.onload = resolve;
                    img.onerror = reject;
                    img.src = palletLogo;
                    setTimeout(reject, 3000);
                });
                logoRef.current = img;
                logo = img;
            } catch {
                logo = null;
            }
        }

        try {
            if (theme === 'classic') {
                await renderClassicPoster(ctx, CANVAS_W, dynamicH, logo, posterType, data, config);
            } else {
                await renderNeonPoster(ctx, CANVAS_W, dynamicH, logo, posterType, data, config);
            }
            setGenerated(true);
        } catch (err) {
            console.error('Poster generation failed:', err);
        }
        setGenerating(false);
    }, [posterType, theme, data, config]);

    const handleDownload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const link = document.createElement('a');
        link.download = `pestour_${posterType}_${theme}_${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
            {/* Header */}
            <div className="bg-slate-900/60 border border-white/[0.06] rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-5">
                    <div className="w-11 h-11 rounded-[14px] bg-gradient-to-br from-pink-500/20 to-rose-500/10 border border-pink-500/30 flex items-center justify-center">
                        <Image size={20} className="text-pink-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-outfit font-black text-white tracking-tight">Poster Generator</h3>
                        <p className="text-[11px] text-slate-500 font-medium">Generate match posters for sharing</p>
                    </div>
                </div>

                {/* Type Selector */}
                <div className="mb-4">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">Poster Type</label>
                    <div className="flex gap-2">
                        {POSTER_TYPES.map(t => (
                            <button key={t.id} onClick={() => setPosterType(t.id)}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all border ${
                                    posterType === t.id
                                        ? 'bg-white/[0.08] border-white/[0.15] text-white'
                                        : 'bg-slate-950/40 border-white/[0.04] text-slate-500 hover:text-slate-300 hover:border-white/[0.08]'
                                }`}>
                                <span>{t.emoji}</span>
                                <span>{t.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Theme Selector */}
                <div className="mb-4">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">Theme</label>
                    <div className="flex gap-2">
                        {THEMES.map(t => (
                            <button key={t.id} onClick={() => setTheme(t.id)}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all border ${
                                    theme === t.id
                                        ? 'bg-white/[0.08] border-white/[0.15] text-white'
                                        : 'bg-slate-950/40 border-white/[0.04] text-slate-500 hover:text-slate-300 hover:border-white/[0.08]'
                                }`}>
                                <Palette size={14} style={{ color: t.color }} />
                                <span>{t.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Config Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Title</label>
                        <input type="text" value={config.posterTitle}
                            onChange={e => setConfig(c => ({ ...c, posterTitle: e.target.value }))}
                            className="w-full bg-slate-950/50 border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white font-bold placeholder:text-slate-600 focus:outline-none focus:border-white/[0.15] transition-colors" />
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Subtitle</label>
                        <input type="text" value={config.posterSubtitle}
                            onChange={e => setConfig(c => ({ ...c, posterSubtitle: e.target.value }))}
                            className="w-full bg-slate-950/50 border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white font-bold placeholder:text-slate-600 focus:outline-none focus:border-white/[0.15] transition-colors" />
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Footer</label>
                        <input type="text" value={config.posterFooter}
                            onChange={e => setConfig(c => ({ ...c, posterFooter: e.target.value }))}
                            className="w-full bg-slate-950/50 border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white font-bold placeholder:text-slate-600 focus:outline-none focus:border-white/[0.15] transition-colors" />
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Poster Date</label>
                        <input type="date" value={config.posterDate}
                            onChange={e => setConfig(c => ({ ...c, posterDate: e.target.value }))}
                            className="w-full bg-slate-950/50 border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white font-bold focus:outline-none focus:border-white/[0.15] transition-colors" />
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Match Time / Slot</label>
                        <input type="text" value={config.posterMatchTime || ''}
                            onChange={e => setConfig(c => ({ ...c, posterMatchTime: e.target.value }))}
                            className="w-full bg-slate-950/50 border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white font-bold placeholder:text-slate-600 focus:outline-none focus:border-white/[0.15] transition-colors" />
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Accent Color</label>
                        <div className="flex items-center gap-2">
                            <input type="color" value={config.posterAccent}
                                onChange={e => setConfig(c => ({ ...c, posterAccent: e.target.value }))}
                                className="w-10 h-10 rounded-lg border border-white/[0.08] bg-transparent cursor-pointer" />
                            <input type="text" value={config.posterAccent}
                                onChange={e => setConfig(c => ({ ...c, posterAccent: e.target.value }))}
                                className="flex-1 bg-slate-950/50 border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white font-mono font-bold focus:outline-none focus:border-white/[0.15] transition-colors" />
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <button onClick={handleGenerate} disabled={generating}
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm uppercase tracking-widest transition-all border disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                            background: generating ? '#1e293b' : 'linear-gradient(135deg, #ec4899, #f43f5e)',
                            borderColor: generating ? 'rgba(255,255,255,0.06)' : 'rgba(236,72,153,0.4)',
                            color: generating ? '#64748b' : '#fff',
                            boxShadow: generating ? 'none' : '0 0 25px rgba(236,72,153,0.2)',
                        }}>
                        <RefreshCw size={16} className={generating ? 'animate-spin' : ''} />
                        {generating ? 'Generating...' : 'Generate Poster'}
                    </button>
                    {generated && (
                        <motion.button initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                            onClick={handleDownload}
                            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-widest bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25 transition-all">
                            <Download size={16} />
                            Download
                        </motion.button>
                    )}
                </div>
            </div>

            {/* Preview */}
            <div className="bg-slate-900/60 border border-white/[0.06] rounded-2xl p-5">
                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Preview</h4>
                <div className="relative rounded-xl overflow-hidden border border-white/[0.06] bg-slate-950/80"
                    style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    <canvas ref={canvasRef} width={CANVAS_W} height={CANVAS_H}
                        style={{ width: '100%', height: 'auto', display: 'block' }} />
                    {!generated && !generating && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600">
                            <Image size={48} className="mb-3 opacity-30" />
                            <p className="text-sm font-bold uppercase tracking-widest">Click Generate to preview</p>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
