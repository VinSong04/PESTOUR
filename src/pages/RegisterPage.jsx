import { useState, useEffect, useRef, useMemo } from 'react';
import { db } from '../firebase';
import { ref, push, serverTimestamp, get, update } from 'firebase/database';
import { UserPlus, Sparkles, ShieldAlert, Trophy, Star, QrCode, CreditCard, ChevronDown, Search, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import Swal from 'sweetalert2';
import { staggerContainer as containerVariants, springItem as itemVariants } from '../constants/animations';
import { swalDarkTheme } from '../utils/swalTheme';
import useRegistrations from '../hooks/useRegistrations';
import { processPaywayPayment, getPaymentParams } from '../services/payment_service/payment_handler';
import { generateTournamentPayment } from '../services/payment_service/bakong_khqr_handler';
import BakongPaymentModal from '../components/payment/BakongPaymentModal';
import { COUNTRIES, COUNTRY_CODES, getFlagUrl } from '../constants/countries';

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
export default function RegisterView({ isOpen = true }) {
    const registrations = useRegistrations();

    const [name, setName] = useState('');
    const [teamName, setTeamName] = useState('');
    const [baseTeam, setBaseTeam] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('bakong'); // 'bakong' | 'payway'

    // Bakong KHQR modal state
    const [showBakongModal, setShowBakongModal] = useState(false);
    const [bakongPaymentData, setBakongPaymentData] = useState(null);
    const [pendingPlayerName, setPendingPlayerName] = useState('');

    // Handle incoming redirect from PayWay (Webhook simulation)
    useEffect(() => {
        const { tran_id, status } = getPaymentParams();

        if (tran_id && status === 'success') {
            const verifyPayment = async () => {
                try {
                    const registrationsRef = ref(db, 'registrations');
                    const snapshot = await get(registrationsRef);
                    if (snapshot.exists()) {
                        let userKey = null;
                        snapshot.forEach(child => {
                            if (child.val().tran_id === tran_id) {
                                userKey = child.key;
                            }
                        });

                        if (userKey) {
                            const userRef = ref(db, `registrations/${userKey}`);
                            await update(userRef, { status: 'paid' });

                            Swal.fire({
                                ...swalDarkTheme,
                                title: 'Payment Successful!',
                                text: 'Your transaction was completed and your registration is confirmed.',
                                icon: 'success'
                            });

                            // Clean up URL
                            if (window.location.hash.includes('?')) {
                                window.location.hash = window.location.hash.split('?')[0];
                            } else {
                                window.history.replaceState({}, document.title, window.location.pathname);
                            }
                        }
                    }
                } catch (error) {
                    console.error("Error verifying payment", error);
                }
            };
            verifyPayment();
        }
    }, []);

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

        const nameExists = registrations.some(
            reg => reg.name.toLowerCase() === name.trim().toLowerCase()
        );

        if (nameExists) {
            Swal.fire({ ...swalDarkTheme, title: 'Name Taken!', text: 'This player name is already registered by someone else!', icon: 'warning' });
            return;
        }

        const teamExists = registrations.some(
            reg => reg.teamName?.toLowerCase() === teamName.trim().toLowerCase()
        );

        if (teamExists) {
            Swal.fire({ ...swalDarkTheme, title: 'Team Name Taken!', text: `"${teamName.trim()}" is already used by another player! Choose a different team name.`, icon: 'warning' });
            return;
        }

        setIsSubmitting(true);
        try {
            const tran_id = "PES_" + Date.now();
            const registrationsRef = ref(db, 'registrations');

            // 1. Create DB entry in payment_pending state
            await push(registrationsRef, {
                name: name.trim(),
                teamName: teamName.trim(),
                baseTeam: baseTeam.trim(),
                timestamp: serverTimestamp(),
                tran_id: tran_id,
                status: 'payment_pending',
                paymentMethod: paymentMethod,
            });

            if (paymentMethod === 'bakong') {
                // --- Bakong KHQR Flow ---
                const paymentData = generateTournamentPayment({ name: name.trim() }, tran_id);
                setBakongPaymentData(paymentData);
                setPendingPlayerName(name.trim());
                setShowBakongModal(true);

                setName('');
                setTeamName('');
                setBaseTeam('');
            } else {
                // --- ABA PayWay Flow (existing) ---
                Swal.fire({
                    ...swalDarkTheme,
                    title: 'Registration Initiated!',
                    text: 'Redirecting to ABA PayWay securely...',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });

                setTimeout(async () => {
                    await processPaywayPayment({ name: name.trim() }, tran_id);
                }, 2000);

                setName('');
                setTeamName('');
                setBaseTeam('');
            }
        } catch (error) {
            Swal.fire({ ...swalDarkTheme, title: 'Error', text: 'Registration failed. Please try again.', icon: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Bakong payment callbacks
    const handleBakongSuccess = async () => {
        // Payment has been verified by the Admin (or via integration in the future)!
        setShowBakongModal(false);
        Swal.fire({
            ...swalDarkTheme,
            title: 'Payment Successful! 🎉',
            text: 'Your registration is confirmed. Welcome to PES TOUR!',
            icon: 'success',
        });
    };

    const handleBakongExpired = () => {
        Swal.fire({
            ...swalDarkTheme,
            title: 'QR Code Expired',
            text: 'The QR code has expired. Please try registering again.',
            icon: 'warning',
        });
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

                                {/* Payment Method Selector */}
                                <div className="space-y-2.5">
                                    <label className={labelCls}>
                                        Payment Method
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {/* Bakong KHQR Option */}
                                        <button
                                            type="button"
                                            onClick={() => setPaymentMethod('bakong')}
                                            className={`relative p-4 rounded-xl border transition-all duration-300 text-left group ${paymentMethod === 'bakong'
                                                ? 'bg-cyan-500/[0.06] border-cyan-500/25 shadow-[0_0_20px_rgba(6,182,212,0.06)]'
                                                : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.1]'
                                                }`}
                                        >
                                            <div className="flex items-center gap-2.5 mb-2">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${paymentMethod === 'bakong'
                                                    ? 'bg-cyan-500/15 border border-cyan-500/20'
                                                    : 'bg-white/[0.04] border border-white/[0.06]'
                                                    }`}>
                                                    <QrCode className={`w-4 h-4 ${paymentMethod === 'bakong' ? 'text-cyan-400' : 'text-slate-500'}`} />
                                                </div>
                                                {paymentMethod === 'bakong' && (
                                                    <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.5)] ml-auto" />
                                                )}
                                            </div>
                                            <p className={`text-xs font-bold ${paymentMethod === 'bakong' ? 'text-white' : 'text-slate-400'}`}>Bakong KHQR</p>
                                            <p className="text-[9px] font-medium text-slate-600 mt-0.5">Scan QR with any bank app</p>
                                        </button>

                                        {/* ABA PayWay Option */}
                                        <button
                                            type="button"
                                            onClick={() => setPaymentMethod('payway')}
                                            className={`relative p-4 rounded-xl border transition-all duration-300 text-left group ${paymentMethod === 'payway'
                                                ? 'bg-blue-500/[0.06] border-blue-500/25 shadow-[0_0_20px_rgba(59,130,246,0.06)]'
                                                : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.1]'
                                                }`}
                                        >
                                            <div className="flex items-center gap-2.5 mb-2">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${paymentMethod === 'payway'
                                                    ? 'bg-blue-500/15 border border-blue-500/20'
                                                    : 'bg-white/[0.04] border border-white/[0.06]'
                                                    }`}>
                                                    <CreditCard className={`w-4 h-4 ${paymentMethod === 'payway' ? 'text-blue-400' : 'text-slate-500'}`} />
                                                </div>
                                                {paymentMethod === 'payway' && (
                                                    <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_6px_rgba(59,130,246,0.5)] ml-auto" />
                                                )}
                                            </div>
                                            <p className={`text-xs font-bold ${paymentMethod === 'payway' ? 'text-white' : 'text-slate-400'}`}>ABA PayWay</p>
                                            <p className="text-[9px] font-medium text-slate-600 mt-0.5">Redirect to ABA checkout</p>
                                        </button>
                                    </div>
                                </div>

                                {/* Submit */}
                                <motion.button
                                    whileHover={!isSubmitting ? { scale: 1.01 } : {}}
                                    whileTap={!isSubmitting ? { scale: 0.99 } : {}}
                                    type="submit" disabled={isSubmitting}
                                    className={`w-full py-5 px-8 rounded-2xl font-outfit font-bold tracking-wider uppercase transition-all text-[15px] relative overflow-hidden ${isSubmitting
                                        ? 'bg-white/[0.03] text-slate-600 cursor-not-allowed'
                                        : paymentMethod === 'bakong'
                                            ? 'bg-gradient-to-r from-cyan-500 to-teal-600 text-white shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:shadow-[0_0_50px_rgba(6,182,212,0.25)]'
                                            : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:shadow-[0_0_50px_rgba(59,130,246,0.25)]'
                                        }`}>
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                        {paymentMethod === 'bakong' ? <QrCode className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                                        {isSubmitting
                                            ? 'Processing...'
                                            : paymentMethod === 'bakong'
                                                ? 'Pay $2.00 via KHQR'
                                                : 'Pay $2.00 via ABA'
                                        }
                                    </span>
                                    {!isSubmitting && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] animate-[shimmer_3s_infinite]"></div>}
                                </motion.button>

                                <p className="text-center text-[10px] font-medium text-slate-600 tracking-wider uppercase mt-4 flex items-center justify-center gap-2">
                                    <Trophy className="w-3.5 h-3.5 text-amber-500/40" />
                                    Your registration will be reviewed by an admin
                                </p>
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

            {/* Bakong KHQR Payment Modal — uses real-time Firebase listener internally */}
            <BakongPaymentModal
                isOpen={showBakongModal}
                onClose={() => setShowBakongModal(false)}
                onPaymentSuccess={handleBakongSuccess}
                onPaymentExpired={handleBakongExpired}
                qrString={bakongPaymentData?.khqrString || ''}
                amount={bakongPaymentData?.amount || '2.00'}
                currency={bakongPaymentData?.currency || 'USD'}
                transactionRef={bakongPaymentData?.transactionRef || ''}
                playerName={pendingPlayerName}
            />
        </motion.div>
    );
}
