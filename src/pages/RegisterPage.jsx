import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { db } from '../firebase';
import { ref, push, serverTimestamp, get, update } from 'firebase/database';
import { UserPlus, Sparkles, ShieldAlert, Trophy, Star, QrCode, CreditCard, ChevronDown, Search, X, Globe, Upload, ImageIcon, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CountdownTimer from '../components/ui/CountdownTimer';

import Swal from 'sweetalert2';
import { staggerContainer as containerVariants, springItem as itemVariants } from '../constants/animations';
import { swalDarkTheme } from '../utils/swalTheme';
import useRegistrations from '../hooks/useRegistrations';
import { COUNTRIES, COUNTRY_CODES, getFlagUrl } from '../constants/countries';
import paymentQrImage from '../assets/payment_aba.jpg';

/* ─── Searchable Country Select ─────────────────────────────────────── */
function CountrySelect({ value, onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const dropdownRef = useRef(null);
    const searchRef = useRef(null);

    const filtered = useMemo(() => {
        if (!search.trim()) return COUNTRIES;
        const q = search.toLowerCase();
        return COUNTRIES.filter(c => c.toLowerCase().includes(q));
    }, [search]);

    // Close on outside click
    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
                setSearch('');
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    // Focus search input when opened
    useEffect(() => {
        if (isOpen && searchRef.current) {
            setTimeout(() => searchRef.current?.focus(), 50);
        }
    }, [isOpen]);

    const selectedFlag = value ? getFlagUrl(value) : null;

    return (
        <div ref={dropdownRef} className="relative">
            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => { setIsOpen(!isOpen); setSearch(''); }}
                className={`w-full flex items-center gap-3 bg-white/[0.03] border text-left px-5 py-4 rounded-xl outline-none transition-all font-semibold text-[15px] ${isOpen
                    ? 'border-cyan-500/30 bg-white/[0.04] shadow-[0_0_20px_rgba(6,182,212,0.06)]'
                    : 'border-white/[0.06] hover:border-white/[0.1]'
                    }`}
            >
                {value ? (
                    <>
                        <img src={selectedFlag} alt="" className="w-7 h-5 rounded-[3px] object-cover shadow-sm border border-white/10 flex-shrink-0" />
                        <span className="text-white truncate flex-1">{value}</span>
                    </>
                ) : (
                    <>
                        <Globe className="w-5 h-5 text-slate-700 flex-shrink-0" />
                        <span className="text-slate-700 flex-1">Select a country...</span>
                    </>
                )}
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                        className="absolute z-50 w-full mt-2 rounded-xl border border-white/[0.08] bg-[#0c1424]/95 backdrop-blur-2xl shadow-2xl shadow-black/40 overflow-hidden"
                    >
                        {/* Search Bar */}
                        <div className="p-3 border-b border-white/[0.06]">
                            <div className="relative">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                                <input
                                    ref={searchRef}
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search country..."
                                    className="w-full pl-10 pr-9 py-3 bg-white/[0.04] border border-white/[0.06] rounded-lg text-sm text-white placeholder:text-slate-700 outline-none focus:border-cyan-500/25 transition-colors"
                                />
                                {search && (
                                    <button type="button" onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition-colors">
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Options List */}
                        <div className="max-h-64 overflow-y-auto overscroll-contain custom-select-scroll">
                            {filtered.length === 0 ? (
                                <div className="px-5 py-8 text-center text-slate-600 text-sm font-medium">
                                    No country found
                                </div>
                            ) : (
                                filtered.map((country) => {
                                    const flagUrl = getFlagUrl(country);
                                    const isSelected = value === country;
                                    return (
                                        <button
                                            type="button"
                                            key={country}
                                            onClick={() => { onChange(country); setIsOpen(false); setSearch(''); }}
                                            className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-all duration-150 ${isSelected
                                                ? 'bg-cyan-500/[0.08] border-l-2 border-cyan-400'
                                                : 'border-l-2 border-transparent hover:bg-white/[0.04]'
                                                }`}
                                        >
                                            {flagUrl ? (
                                                <img src={flagUrl} alt="" className="w-7 h-5 rounded-[3px] object-cover shadow-sm border border-white/10 flex-shrink-0" />
                                            ) : (
                                                <div className="w-7 h-5 rounded-[3px] bg-white/[0.06] flex-shrink-0" />
                                            )}
                                            <span className={`text-sm font-medium truncate ${isSelected ? 'text-cyan-300' : 'text-slate-300'}`}>
                                                {country}
                                            </span>
                                            {isSelected && (
                                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.5)] flex-shrink-0" />
                                            )}
                                        </button>
                                    );
                                })
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ─── Register Page ─────────────────────────────────────────────────── */
export default function RegisterView({ isAdmin, data }) {
    const settings = data?.settings || {};
    const isOpen = settings.registrationOpen;
    const registrations = useRegistrations();

    const [name, setName] = useState('');
    const [teamName, setTeamName] = useState('');
    const [baseTeam, setBaseTeam] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Screenshot upload state
    const [screenshot, setScreenshot] = useState(null); // { file, preview, base64 }
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    // Convert file to base64 for Firebase storage
    const processFile = useCallback((file) => {
        if (!file || !file.type.startsWith('image/')) {
            Swal.fire({ ...swalDarkTheme, title: 'Invalid File', text: 'Please upload an image file (JPG, PNG, etc.)', icon: 'warning' });
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            Swal.fire({ ...swalDarkTheme, title: 'File Too Large', text: 'Max file size is 5MB.', icon: 'warning' });
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            setScreenshot({ file, preview: URL.createObjectURL(file), base64: e.target.result });
        };
        reader.readAsDataURL(file);
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer?.files?.[0];
        if (file) processFile(file);
    }, [processFile]);

    const handleDragOver = useCallback((e) => { e.preventDefault(); setIsDragging(true); }, []);
    const handleDragLeave = useCallback(() => setIsDragging(false), []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            Swal.fire({ ...swalDarkTheme, title: 'Notice', text: 'In-Game Name is required.', icon: 'info' });
            return;
        }
        if (!teamName.trim()) {
            Swal.fire({ ...swalDarkTheme, title: 'Notice', text: 'Dream Team Name is required.', icon: 'info' });
            return;
        }
        if (!baseTeam.trim()) {
            Swal.fire({ ...swalDarkTheme, title: 'Notice', text: 'Base Team (Country) is required.', icon: 'info' });
            return;
        }
        if (!screenshot) {
            Swal.fire({ ...swalDarkTheme, title: 'Screenshot Required', text: 'Please upload your payment screenshot.', icon: 'info' });
            return;
        }

        const nameExists = registrations.some(reg => reg.name.toLowerCase() === name.trim().toLowerCase());
        if (nameExists) {
            Swal.fire({ ...swalDarkTheme, title: 'Name Taken!', text: 'This player name is already registered!', icon: 'warning' });
            return;
        }
        const teamExists = registrations.some(reg => reg.teamName?.toLowerCase() === teamName.trim().toLowerCase());
        if (teamExists) {
            Swal.fire({ ...swalDarkTheme, title: 'Team Name Taken!', text: `"${teamName.trim()}" is already used!`, icon: 'warning' });
            return;
        }

        setIsSubmitting(true);
        try {
            const tran_id = "PES_" + Date.now();
            await push(ref(db, 'registrations'), {
                name: name.trim(),
                teamName: teamName.trim(),
                baseTeam: baseTeam.trim(),
                timestamp: serverTimestamp(),
                tran_id,
                status: 'pending_verification',
                paymentMethod: 'aba_khqr',
                paymentScreenshot: screenshot.base64,
            });

            Swal.fire({
                ...swalDarkTheme,
                timer: undefined,
                timerProgressBar: false,
                title: 'Registration Submitted! 🎉',
                html: '<p style="color:#94a3b8; margin-bottom: 15px;">Your payment has been uploaded and is pending verification.</p><p style="color:#22d3ee; font-weight: bold;">Please join our official Telegram group to stay updated!</p>',
                icon: 'success',
                showCancelButton: false,
                showCloseButton: true,
                confirmButtonText: '<i class="fab fa-telegram"></i> Join Telegram Group',
                confirmButtonColor: '#0088cc'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.open('https://t.me/+Z1bA7PZXLoY0OGNl', '_blank');
                }
            });
            setName(''); setTeamName(''); setBaseTeam(''); setScreenshot(null);
        } catch (error) {
            Swal.fire({ ...swalDarkTheme, title: 'Error', text: 'Registration failed. Please try again.', icon: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Input field shared classes
    const inputCls = "w-full bg-white/[0.03] border border-white/[0.06] text-white px-5 py-4 rounded-xl outline-none focus:border-cyan-500/30 focus:bg-white/[0.04] transition-all font-semibold placeholder:text-slate-700 text-[15px]";
    const labelCls = "text-[10px] font-semibold text-slate-500 uppercase tracking-[0.15em] ml-1 flex items-center gap-1.5";

    return (
        <motion.div
            className="space-y-6 w-full max-w-5xl mx-auto flex flex-col justify-center mt-2 pb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >

            {/* Hero Banner */}
            <motion.div variants={itemVariants} className="relative overflow-hidden rounded-3xl glass-card group">
                <div className="absolute inset-0 mesh-gradient pointer-events-none"></div>
                <div className="absolute top-[-30%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/6 blur-[120px] rounded-full pointer-events-none group-hover:bg-cyan-500/10 transition-all duration-1000"></div>
                <div className="absolute bottom-[-30%] right-[-10%] w-[400px] h-[400px] bg-purple-500/6 blur-[100px] rounded-full pointer-events-none group-hover:bg-purple-500/10 transition-all duration-1000"></div>
                <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none"></div>

                <div className="relative z-10 py-16 px-8 sm:px-14 text-center flex flex-col items-center">
                    {/* Badge */}
                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        className="mb-7 px-4 py-1.5 rounded-full bg-amber-500/[0.06] border border-amber-500/10 flex items-center gap-2.5 backdrop-blur-sm"
                    >
                        <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)] animate-pulse"></div>
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-amber-300/80">Registration Open</span>
                    </motion.div>

                    {/* Icon */}
                    <motion.div whileHover={{ scale: 1.08 }} className="mb-7 relative">
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-white/[0.06] flex items-center justify-center">
                            <UserPlus className="w-11 h-11 text-white/80" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center shadow-lg border-2 border-[#060a13]">
                            <Star className="w-4 h-4 text-white" />
                        </div>
                    </motion.div>

                    {/* Title */}
                    <h1 className="text-4xl sm:text-5xl font-outfit font-black tracking-tighter mb-3 uppercase text-white leading-tight">
                        Dream Team Mode
                    </h1>

                    {isOpen && !settings.tournamentStarted && (
                        <div className="mb-8">
                            <CountdownTimer deadline={settings.registrationDeadline} />
                        </div>
                    )}

                    <p className="text-slate-400 text-base sm:text-lg font-medium mb-8 max-w-lg">
                        Build your ultimate squad and compete in the eFootball Dream Team showdown.
                    </p>
                </div>
            </motion.div>

            {/* Registration Form */}
            <div className="flex flex-col items-center w-full relative z-10">
                <motion.div variants={itemVariants} className="glass-card rounded-3xl relative group w-full max-w-2xl">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>

                    <div className="p-7 sm:p-10">
                        {/* Form Header */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-white/[0.06] flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-purple-400/80" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-outfit font-bold text-white">Enter the Arena</h2>
                                <p className="text-xs font-medium text-slate-500 mt-0.5">Fill in your details to register</p>
                            </div>
                        </div>

                        {isOpen ? (
                            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                {/* Player Name */}
                                <div className="space-y-2.5">
                                    <label className={labelCls}>
                                        Player Name <span className="text-rose-400">*</span>
                                    </label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                                        placeholder="e.g. Robert Lewandowski"
                                        className={inputCls} />
                                </div>

                                {/* Dream Team Name */}
                                <div className="space-y-2.5">
                                    <label className={labelCls}>
                                        Dream Team Name <span className="text-rose-400">*</span>
                                    </label>
                                    <input type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)}
                                        placeholder="e.g. RL9 FC"
                                        className={inputCls} />
                                </div>

                                {/* Country Select Dropdown */}
                                <div className="space-y-2.5">
                                    <label className={labelCls}>
                                        <Globe className="w-3.5 h-3.5 text-cyan-500/50" />
                                        Base Team (Country) <span className="text-rose-400">*</span>
                                    </label>
                                    <CountrySelect value={baseTeam} onChange={setBaseTeam} />
                                </div>

                                {/* ─── Step 1: ABA KHQR Payment ─── */}
                                <div className="space-y-3 pt-2">
                                    <label className={labelCls}>
                                        <QrCode className="w-3.5 h-3.5 text-cyan-500/50" />
                                        Step 1: Pay Entry Fee ({settings.entryFee || '$2.00'})
                                    </label>
                                    <div className="flex flex-col items-center p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                                        <img
                                            src={paymentQrImage}
                                            alt="ABA KHQR - VINSONG CHHORN"
                                            className="w-full max-w-[320px] rounded-xl border border-white/10 shadow-lg"
                                        />
                                        <p className="text-slate-400 text-sm text-center mt-4 font-medium leading-relaxed" style={{ fontFamily: '"Suwannaphum", "Outfit", sans-serif' }}>
                                            Scan this KHQR with your mobile banking app to pay the <strong className="text-amber-400">{settings.entryFee || '$2.00'}</strong> entry fee.
                                        </p>
                                    </div>
                                </div>

                                {/* ─── Step 2: Upload Payment Screenshot ─── */}
                                <div className="space-y-3">
                                    <label className={labelCls}>
                                        <Upload className="w-3.5 h-3.5 text-cyan-500/50" />
                                        Step 2: Upload Payment Screenshot <span className="text-rose-400">*</span>
                                    </label>

                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => { if (e.target.files?.[0]) processFile(e.target.files[0]); }}
                                    />

                                    {!screenshot ? (
                                        <div
                                            onClick={() => fileInputRef.current?.click()}
                                            onDrop={handleDrop}
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            className={`relative flex flex-col items-center justify-center p-10 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300 ${isDragging
                                                ? 'border-cyan-400/50 bg-cyan-500/[0.06] shadow-[0_0_30px_rgba(6,182,212,0.08)]'
                                                : 'border-white/[0.08] bg-white/[0.01] hover:border-white/[0.15] hover:bg-white/[0.02]'
                                                }`}
                                        >
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-colors ${isDragging ? 'bg-cyan-500/15 border border-cyan-500/20' : 'bg-white/[0.04] border border-white/[0.06]'
                                                }`}>
                                                <ImageIcon className={`w-7 h-7 ${isDragging ? 'text-cyan-400' : 'text-slate-600'}`} />
                                            </div>
                                            <p className="text-sm font-semibold text-slate-300 mb-1">Drop your transaction receipt here</p>
                                            <p className="text-xs text-slate-600">or click to browse (JPG, PNG — max 5MB)</p>
                                        </div>
                                    ) : (
                                        <div className="relative rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-4">
                                            <div className="flex items-center gap-4">
                                                <img src={screenshot.preview} alt="Payment screenshot" className="w-20 h-20 rounded-xl object-cover border border-white/10" />
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                                        <p className="text-sm font-semibold text-emerald-300 truncate">{screenshot.file.name}</p>
                                                    </div>
                                                    <p className="text-[11px] text-slate-500">{(screenshot.file.size / 1024).toFixed(1)} KB</p>
                                                </div>
                                                <button type="button" onClick={() => setScreenshot(null)}
                                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer shrink-0">
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Submit */}
                                <motion.button
                                    whileHover={!isSubmitting ? { scale: 1.01 } : {}}
                                    whileTap={!isSubmitting ? { scale: 0.99 } : {}}
                                    type="submit" disabled={isSubmitting}
                                    className={`w-full py-5 px-8 rounded-2xl font-outfit font-bold tracking-wider uppercase transition-all text-[15px] relative overflow-hidden ${isSubmitting
                                        ? 'bg-white/[0.03] text-slate-600 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-cyan-500 to-teal-600 text-white shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:shadow-[0_0_50px_rgba(6,182,212,0.25)]'
                                        }`}>
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                        <UserPlus className="w-5 h-5" />
                                        {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                                    </span>
                                    {!isSubmitting && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] animate-[shimmer_3s_infinite]"></div>}
                                </motion.button>

                                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/[0.04] border border-amber-500/10">
                                    <AlertCircle className="w-4 h-4 text-amber-400/70 shrink-0 mt-0.5" />
                                    <p className="text-[11px] font-medium text-amber-300/60 leading-relaxed">
                                        Note: Your registration status will remain <strong className="text-amber-300/80">pending</strong> until an admin manually verifies your transaction screenshot.
                                    </p>
                                </div>
                            </form>
                        ) : (
                            <div className="flex flex-col items-center justify-center p-10 border border-white/[0.04] rounded-2xl bg-white/[0.01] text-center">
                                <div className="w-20 h-20 rounded-2xl bg-rose-500/8 flex items-center justify-center mb-5 border border-rose-500/10">
                                    <ShieldAlert className="w-10 h-10 text-rose-400" />
                                </div>
                                <h3 className="text-white font-outfit font-bold text-2xl mb-3">Registration Closed</h3>
                                <p className="text-slate-500 font-medium text-sm max-w-sm">We are not accepting new players at this time. Check back later for the next season!</p>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>

        </motion.div>
    );
}
