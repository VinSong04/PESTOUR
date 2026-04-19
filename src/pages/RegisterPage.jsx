import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, push, serverTimestamp, get, update } from 'firebase/database';
import { UserPlus, Sparkles, CheckCircle2, ShieldAlert, Trophy, Star, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { staggerContainer as containerVariants, springItem as itemVariants } from '../constants/animations';
import { swalDarkTheme } from '../utils/swalTheme';
import useRegistrations from '../hooks/useRegistrations';
import { processPaywayPayment, getPaymentParams } from '../services/payment_service/paywayService';

export default function RegisterView({ isAdmin, isOpen = true }) {
    const registrations = useRegistrations();

    const [name, setName] = useState('');
    const [teamName, setTeamName] = useState('');
    const [baseTeam, setBaseTeam] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

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
    }, [db]);

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
            Swal.fire({ ...swalDarkTheme, title: 'Notice', text: 'Base Team is required.', icon: 'info' });
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
            reg => reg.baseTeam?.toLowerCase() === teamName.trim().toLowerCase()
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
                status: 'payment_pending'
            });

            // 2. Alert the user that they are being redirected
            Swal.fire({
                ...swalDarkTheme,
                title: 'Registration Initiated!',
                text: 'Redirecting to ABA PayWay securely...',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });

            // 3. Initiate the payment flow wrapper
            setTimeout(async () => {
                await processPaywayPayment({ name: name.trim() }, tran_id);
                // processPaywayPayment automatically creates and submits a form to redirect
            }, 2000);

            setName('');
            setTeamName('');
            setBaseTeam('');
        } catch (error) {
            Swal.fire({ ...swalDarkTheme, title: 'Error', text: 'Registration failed. Please try again.', icon: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

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
                                    <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-[0.15em] ml-1 flex items-center gap-1.5">
                                        Player Name <span className="text-rose-400">*</span>
                                    </label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                                        placeholder="e.g. K-Vinn"
                                        className="w-full bg-white/[0.03] border border-white/[0.06] text-white px-5 py-4 rounded-xl outline-none focus:border-cyan-500/30 focus:bg-white/[0.04] transition-all font-semibold placeholder:text-slate-700 text-[15px]" />
                                </div>

                                {/* Dream Team Name */}
                                <div className="space-y-2.5">
                                    <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-[0.15em] ml-1 flex items-center gap-1.5">
                                        Dream Team Name <span className="text-rose-400">*</span>
                                    </label>
                                    <input type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)}
                                        placeholder="e.g. FC Legends, Galaxy XI"
                                        className="w-full bg-white/[0.03] border border-white/[0.06] text-white px-5 py-4 rounded-xl outline-none focus:border-cyan-500/30 focus:bg-white/[0.04] transition-all font-semibold placeholder:text-slate-700 text-[15px]" />
                                </div>

                                {/* Base Team Input */}
                                <div className="space-y-2.5">
                                    <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-[0.15em] ml-1 flex items-center gap-1.5">
                                        Base Team (Club / Country) <span className="text-rose-400">*</span>
                                    </label>
                                    <input type="text" value={baseTeam} onChange={(e) => setBaseTeam(e.target.value)}
                                        placeholder="e.g. Manchester United, Brazil"
                                        className="w-full bg-white/[0.03] border border-white/[0.06] text-white px-5 py-4 rounded-xl outline-none focus:border-cyan-500/30 focus:bg-white/[0.04] transition-all font-semibold placeholder:text-slate-700 text-[15px]" />
                                </div>

                                {/* Submit */}
                                <motion.button
                                    whileHover={!isSubmitting ? { scale: 1.01 } : {}}
                                    whileTap={!isSubmitting ? { scale: 0.99 } : {}}
                                    type="submit" disabled={isSubmitting}
                                    className={`w-full py-5 px-8 rounded-2xl font-outfit font-bold tracking-wider uppercase transition-all text-[15px] relative overflow-hidden ${isSubmitting
                                        ? 'bg-white/[0.03] text-slate-600 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_30px_rgba(34,211,238,0.15)] hover:shadow-[0_0_50px_rgba(34,211,238,0.25)]'
                                        }`}>
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                        <UserPlus className="w-5 h-5" />
                                        {isSubmitting ? 'Redirecting...' : 'Pay $2.00 & Register'}
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
        </motion.div>
    );
}
