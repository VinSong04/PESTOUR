import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, onValue, push, serverTimestamp } from 'firebase/database';
import { UserPlus, Sparkles, CheckCircle2, ShieldAlert, Trophy, Users, Zap, Star, DollarSign, Upload, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RegisterView({ isAdmin, isOpen = true }) {
    const [registrations, setRegistrations] = useState([]);
    const [name, setName] = useState('');
    const [team, setTeam] = useState('');
    const [logoPreview, setLogoPreview] = useState(null);
    const [logoBase64, setLogoBase64] = useState('');
    const [paidConfirm, setPaidConfirm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const registrationsRef = ref(db, 'registrations');
        const unsubscribe = onValue(registrationsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const parsedRegistrations = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                })).sort((a, b) => b.timestamp - a.timestamp);
                setRegistrations(parsedRegistrations);
            } else {
                setRegistrations([]);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (!name.trim()) {
            setErrorMessage('In-Game Name is required.');
            return;
        }
        if (!team.trim()) {
            setErrorMessage('Team / Clan name is required.');
            return;
        }
        if (!logoBase64) {
            setErrorMessage('Please upload your Base Team logo.');
            return;
        }
        if (!paidConfirm) {
            setErrorMessage('Please confirm you have paid the $2 registration fee.');
            return;
        }

        const exists = registrations.some(
            reg => reg.name.toLowerCase() === name.trim().toLowerCase()
        );

        if (exists) {
            setErrorMessage('This name is already registered!');
            return;
        }

        setIsSubmitting(true);
        try {
            const registrationsRef = ref(db, 'registrations');
            await push(registrationsRef, {
                name: name.trim(),
                team: team.trim(),
                logo: logoBase64,
                timestamp: serverTimestamp(),
                status: 'pending'
            });

            setSuccessMessage('Registration successful! Awaiting admin approval.');
            setName('');
            setTeam('');
            setLogoPreview(null);
            setLogoBase64('');
            setPaidConfirm(false);
            setTimeout(() => setSuccessMessage(''), 5000);
        } catch (error) {
            console.error("Registration error:", error);
            setErrorMessage('Registration failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const approvedCount = registrations.filter(r => r.status === 'approved').length;
    const slotsLeft = Math.max(0, 12 - approvedCount);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100, damping: 15 }
        }
    };

    return (
        <motion.div
            className="space-y-8 w-full max-w-5xl mx-auto flex flex-col justify-center mt-2 pb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >

            {/* ===== HERO BANNER ===== */}
            <motion.div variants={itemVariants} className="relative overflow-hidden rounded-[40px] bg-[#0A0D14]/80 backdrop-blur-xl border border-white/5 shadow-2xl group">
                {/* Animated background effects */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-50%] left-[-20%] w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full animate-pulse group-hover:bg-blue-500/20 transition-all duration-700 mix-blend-screen"></div>
                    <div className="absolute bottom-[-40%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 blur-[100px] rounded-full group-hover:bg-purple-500/20 transition-all duration-700 mix-blend-screen"></div>
                    {/* Grid pattern overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
                </div>

                <div className="relative z-10 py-20 px-8 sm:px-16 text-center flex flex-col items-center">
                    {/* Badge */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="mb-8 px-6 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center gap-3 shadow-[0_0_30px_rgba(245,158,11,0.15)] backdrop-blur-md"
                    >
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_12px_#FBBF24] animate-pulse"></div>
                        <span className="text-[11px] font-outfit font-black tracking-[0.25em] uppercase text-amber-400">Registration Open</span>
                    </motion.div>

                    {/* Icon */}
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="mb-8 relative"
                    >
                        <div className="w-28 h-28 rounded-[32px] bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center shadow-[0_0_50px_rgba(96,165,250,0.2)] backdrop-blur-md">
                            <UserPlus className="w-14 h-14 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]" />
                        </div>
                        <div className="absolute -top-3 -right-3 w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.6)] border-2 border-[#0A0D14]">
                            <Star className="w-5 h-5 text-white" />
                        </div>
                    </motion.div>

                    {/* Title */}
                    <h1 className="text-4xl sm:text-6xl font-outfit font-black tracking-tighter mb-4 uppercase drop-shadow-lg text-white">
                        Join The Battle
                    </h1>
                    <p className="text-slate-400 text-lg sm:text-2xl font-medium mb-12 tracking-wide max-w-2xl">
                        Secure your spot in the ultimate eFootball showdown. Register now and claim your place.
                    </p>

                    {/* Stats Row - Admin Only */}
                    {isAdmin && (
                        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-4">
                            <div className="flex items-center gap-4 px-6 py-4 bg-[#0A0D14]/50 backdrop-blur-xl border border-white/5 rounded-3xl shadow-lg hover:bg-[#0A0D14]/80 transition-colors">
                                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                                    <Users className="w-6 h-6 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
                                </div>
                                <div className="text-left">
                                    <p className="text-2xl font-outfit font-black text-white leading-none">{registrations.length}</p>
                                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-1">Registered</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 px-6 py-4 bg-[#0A0D14]/50 backdrop-blur-xl border border-white/5 rounded-3xl shadow-lg hover:bg-[#0A0D14]/80 transition-colors">
                                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                                    <CheckCircle2 className="w-6 h-6 text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                </div>
                                <div className="text-left">
                                    <p className="text-2xl font-outfit font-black text-white leading-none">{approvedCount}</p>
                                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-1">Approved</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 px-6 py-4 bg-[#0A0D14]/50 backdrop-blur-xl border border-white/5 rounded-3xl shadow-lg hover:bg-[#0A0D14]/80 transition-colors">
                                <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center border border-rose-500/20">
                                    <Zap className="w-6 h-6 text-rose-400 drop-shadow-[0_0_10px_rgba(244,63,94,0.5)]" />
                                </div>
                                <div className="text-left">
                                    <p className="text-2xl font-outfit font-black text-white leading-none">{slotsLeft}</p>
                                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-1">Slots Left</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* ===== MAIN CONTENT ===== */}
            <div className={`grid grid-cols-1 ${isAdmin ? 'lg:grid-cols-2' : ''} gap-8 relative z-10`}>

                {/* ===== REGISTRATION FORM ===== */}
                <motion.div variants={itemVariants} className="bg-[#0A0D14]/80 backdrop-blur-xl rounded-[40px] border border-white/5 shadow-2xl relative overflow-hidden group">
                    {/* Glow accents */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
                    <div className="absolute top-1/2 left-[-100px] w-96 h-96 bg-purple-500/5 blur-[100px] pointer-events-none rounded-full group-hover:bg-purple-500/10 transition-colors duration-700 mix-blend-screen"></div>

                    <div className="p-8 sm:p-12">
                        {/* Form Header */}
                        <div className="flex items-center gap-5 mb-10">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center shadow-inner">
                                <Sparkles className="w-7 h-7 text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-outfit font-black text-white tracking-tight">Enter the Arena</h2>
                                <p className="text-sm font-bold text-slate-400 tracking-wide mt-1">Fill in your details to register</p>
                            </div>
                        </div>

                        {successMessage && (
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-4 relative overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0 relative z-10">
                                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                                </div>
                                <p className="text-base font-bold text-emerald-400 relative z-10">{successMessage}</p>
                            </motion.div>
                        )}

                        {errorMessage && (
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-4 relative overflow-hidden shadow-[0_0_30px_rgba(244,63,94,0.15)]">
                                <div className="w-12 h-12 rounded-xl bg-rose-500/20 flex items-center justify-center flex-shrink-0 relative z-10">
                                    <ShieldAlert className="w-6 h-6 text-rose-400" />
                                </div>
                                <p className="text-base font-bold text-rose-400 relative z-10">{errorMessage}</p>
                            </motion.div>
                        )}

                        {isOpen ? (
                            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                                {/* Player Name */}
                                <div className="space-y-3">
                                    <label className="text-xs font-outfit font-black text-slate-400 uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                                        Player Name <span className="text-rose-400">*</span>
                                    </label>
                                    <div className="relative group">
                                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                                            placeholder="e.g. K-Vinn"
                                            className="w-full bg-[#131A2B]/50 backdrop-blur-md border border-white/10 text-white px-6 py-5 rounded-2xl outline-none focus:border-blue-500/50 focus:bg-[#131A2B]/80 transition-all font-bold placeholder:text-[#334155] text-lg shadow-inner" />
                                    </div>
                                </div>

                                {/* Team / Clan */}
                                <div className="space-y-3">
                                    <label className="text-xs font-outfit font-black text-slate-400 uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                                        Team / Clan <span className="text-rose-400">*</span>
                                    </label>
                                    <div className="relative group">
                                        <input type="text" value={team} onChange={(e) => setTeam(e.target.value)}
                                            placeholder="e.g. Team Liquid"
                                            className="w-full bg-[#131A2B]/50 backdrop-blur-md border border-white/10 text-white px-6 py-5 rounded-2xl outline-none focus:border-blue-500/50 focus:bg-[#131A2B]/80 transition-all font-bold placeholder:text-[#334155] text-lg shadow-inner" />
                                    </div>
                                </div>

                                {/* Base Team Logo Upload */}
                                <div className="space-y-4">
                                    <label className="text-xs font-outfit font-black text-slate-400 uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                                        <Upload className="w-4 h-4" /> Base Team Logo <span className="text-rose-400">*</span>
                                    </label>
                                    <p className="text-[11px] text-slate-500 font-bold ml-2 -mt-2">PNG or JPG, transparent background recommended</p>

                                    {logoPreview ? (
                                        <div className="flex items-center gap-5 p-5 bg-[#131A2B]/50 border border-blue-500/30 rounded-2xl backdrop-blur-md">
                                            <div className="w-20 h-20 rounded-2xl bg-[#0A0D14] border border-white/5 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-inner p-2">
                                                <img src={logoPreview} alt="Logo" className="w-full h-full object-contain" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-base font-bold text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]">Logo uploaded successfully</p>
                                                <p className="text-xs text-slate-500 font-bold mt-1">Click the X to remove</p>
                                            </div>
                                            <button type="button" onClick={() => { setLogoPreview(null); setLogoBase64(''); }}
                                                className="w-10 h-10 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 shadow-sm flex items-center justify-center text-rose-400 hover:text-rose-300 transition-all">
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="flex flex-col items-center justify-center gap-4 p-10 bg-[#131A2B]/30 border-2 border-dashed border-white/10 hover:border-blue-500/40 hover:bg-blue-500/5 rounded-3xl cursor-pointer transition-all group backdrop-blur-md">
                                            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform shadow-inner">
                                                <Upload className="w-7 h-7 text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]" />
                                            </div>
                                            <div className="text-center">
                                                <p className="text-base font-bold text-slate-400 group-hover:text-blue-300 transition-colors">Click to browse or drag and drop</p>
                                                <p className="text-xs text-slate-500 font-bold mt-2 uppercase tracking-wide">.PNG or .JPG • Max 2MB</p>
                                            </div>
                                            <input type="file" accept="image/png,image/jpeg,image/webp" className="hidden"
                                                onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    if (!file) return;
                                                    if (file.size > 2 * 1024 * 1024) {
                                                        setErrorMessage('Logo must be under 2MB');
                                                        return;
                                                    }
                                                    const reader = new FileReader();
                                                    reader.onload = (ev) => {
                                                        const img = new window.Image();
                                                        img.onload = () => {
                                                            const canvas = document.createElement('canvas');
                                                            canvas.width = 128;
                                                            canvas.height = 128;
                                                            const ctx = canvas.getContext('2d');
                                                            ctx.drawImage(img, 0, 0, 128, 128);
                                                            const resized = canvas.toDataURL('image/png', 0.8);
                                                            setLogoPreview(resized);
                                                            setLogoBase64(resized);
                                                        };
                                                        img.src = ev.target.result;
                                                    };
                                                    reader.readAsDataURL(file);
                                                    e.target.value = '';
                                                }}
                                            />
                                        </label>
                                    )}
                                </div>

                                {/* Registration Fee */}
                                <div className="bg-amber-500/5 border border-amber-500/20 rounded-3xl p-6 sm:p-8 space-y-6 shadow-inner backdrop-blur-md relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-[50px] mix-blend-screen pointer-events-none"></div>
                                    <div className="flex items-center gap-4 relative z-10">
                                        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center border border-amber-500/30 flex-shrink-0 shadow-sm">
                                            <DollarSign className="w-6 h-6 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                                        </div>
                                        <div>
                                            <p className="text-base font-outfit font-black text-white">Registration Fee: <span className="text-amber-400 ml-1 text-xl drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]">$2.00</span></p>
                                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">Pay to admin before submitting</p>
                                        </div>
                                    </div>
                                    <label className="flex items-center gap-4 cursor-pointer group relative z-10 bg-[#0A0D14]/40 p-4 rounded-2xl border border-white/5 hover:bg-[#0A0D14]/60 transition-colors">
                                        <div className={`w-7 h-7 rounded-xl border flex items-center justify-center transition-all flex-shrink-0 ${paidConfirm ? 'bg-amber-500 border-amber-500 text-[#0A0D14] shadow-[0_0_15px_rgba(251,191,36,0.6)]' : 'border-white/20 group-hover:border-amber-500/50'
                                            }`} onClick={() => setPaidConfirm(!paidConfirm)}>
                                            {paidConfirm && <CheckCircle2 className="w-5 h-5" />}
                                        </div>
                                        <span className="text-sm font-bold text-slate-300" onClick={() => setPaidConfirm(!paidConfirm)}>I confirm that I have paid the <strong className="text-amber-400">$2</strong> registration fee</span>
                                    </label>
                                </div>

                                <motion.button
                                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                                    type="submit" disabled={isSubmitting}
                                    className={`w-full py-6 px-8 rounded-3xl font-outfit font-black tracking-[0.2em] uppercase transition-all text-lg relative overflow-hidden group ${isSubmitting
                                        ? 'bg-[#131A2B] text-slate-500 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-[0_0_40px_rgba(79,70,229,0.4)] hover:shadow-[0_0_60px_rgba(79,70,229,0.6)]'
                                        }`}>
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                        <UserPlus className="w-6 h-6" />
                                        {isSubmitting ? 'Submitting...' : 'Register Now'}
                                    </span>
                                    {!isSubmitting && <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] animate-shimmer"></div>}
                                </motion.button>

                                <p className="text-center text-[11px] font-bold text-slate-500 tracking-widest uppercase mt-6 flex items-center justify-center gap-2">
                                    <Trophy className="w-4 h-4 text-amber-500/50" />
                                    Your registration will be reviewed by an admin
                                </p>
                            </form>
                        ) : (
                            <div className="flex flex-col items-center justify-center p-12 border border-white/5 rounded-3xl bg-[#0A0D14]/50 backdrop-blur-xl relative z-10 text-center shadow-inner">
                                <div className="w-24 h-24 rounded-[32px] bg-rose-500/10 flex items-center justify-center mb-6 border border-rose-500/20 shadow-[0_0_40px_rgba(244,63,94,0.15)]">
                                    <ShieldAlert className="w-12 h-12 text-rose-400 drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]" />
                                </div>
                                <h3 className="text-white font-outfit font-black text-3xl mb-4 tracking-tight">Registration Closed</h3>
                                <p className="text-slate-400 font-medium text-base max-w-sm">We are not accepting new players at this time. Check back later for the next season!</p>
                            </div>
                        )}
                    </div>
                </motion.div>

            </div>
        </motion.div>
    );
}
