import { useRef, useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, onValue, push, serverTimestamp } from 'firebase/database';
import { UserPlus, Sparkles, CheckCircle2, ShieldAlert, Trophy, Users, Zap, Star, DollarSign, Upload, X, Search, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';

export default function RegisterView({ isAdmin, isOpen = true }) {
    const [registrations, setRegistrations] = useState([]);
    const BASE_TEAMS = [
        'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Argentina', 'Armenia', 'Australia', 'Austria',
        'Azerbaijan', 'Bahrain', 'Bangladesh', 'Belarus', 'Belgium', 'Bhutan', 'Bolivia',
        'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'British Virgin Islands', 'Brunei Darussalam',
        'Bulgaria', 'Burkina Faso', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands',
        'Chad', 'Chile', 'China PR', 'Colombia', 'Comoros', 'Congo DR', 'Costa Rica', 'Cote d\'Ivoire',
        'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Dominican Republic', 'Ecuador', 'Egypt',
        'El Salvador', 'England', 'Equatorial Guinea', 'Estonia', 'Eswatini', 'Faroe Islands',
        'Finland', 'France', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Guam', 'Guinea',
        'Guyana', 'Honduras', 'Hong Kong (China)', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran',
        'Iraq', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Korea Republic',
        'Kosovo', 'Kuwait', 'Kyrgyz Republic', 'Laos', 'Latvia', 'Lebanon', 'Libya', 'Liechtenstein',
        'Lithuania', 'Luxembourg', 'Macau', 'Madagascar', 'Malaysia', 'Maldives', 'Mali', 'Malta',
        'Mauritius', 'Mexico', 'Moldova', 'Mongolia', 'Montenegro', 'Morocco', 'Myanmar', 'Nepal',
        'Netherlands', 'New Zealand', 'Nigeria', 'North Macedonia', 'Northern Ireland', 'Norway',
        'Oman', 'Pakistan', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland',
        'Portugal', 'Puerto Rico', 'Qatar', 'Republic of Ireland', 'Romania', 'Russia', 'San Marino',
        'Saudi Arabia', 'Scotland', 'Senegal', 'Serbia', 'Seychelles', 'Slovakia', 'Slovenia',
        'Somalia', 'South Africa', 'South Sudan', 'Spain', 'Sri Lanka', 'Sweden', 'Switzerland',
        'Syria', 'Tajikistan', 'Tanzania', 'Thailand', 'Trinidad and Tobago', 'Tunisia', 'Turkey',
        'Turks and Caicos Islands', 'UAE', 'USA', 'US Virgin Islands', 'Ukraine', 'Uruguay',
        'Uzbekistan', 'Venezuela', 'Vietnam', 'Wales', 'Zambia', 'Zimbabwe'
    ].sort();

    const [name, setName] = useState('');
    const [baseTeam, setBaseTeam] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const dropdownRef = useRef(null);
    const [paidConfirm, setPaidConfirm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const swalConfig = {
            background: '#131A2B',
            color: '#fff',
            backdrop: `rgba(10, 13, 20, 0.85)`,
            timer: 3500,
            timerProgressBar: true,
            showConfirmButton: true,
            customClass: {
                popup: 'border border-white/10 rounded-[32px] shadow-2xl',
                confirmButton: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-outfit font-black uppercase tracking-widest rounded-2xl px-10 py-4 transition-all outline-none focus:ring-4 focus:ring-blue-500/50',
                title: 'font-outfit font-black text-3xl tracking-wide',
                htmlContainer: 'font-medium text-slate-300 text-lg'
            },
            buttonsStyling: false
        };

        if (!name.trim()) {
            Swal.fire({ ...swalConfig, title: 'Notice', text: 'In-Game Name is required.', icon: 'info' });
            return;
        }
        if (!baseTeam.trim()) {
            Swal.fire({ ...swalConfig, title: 'Notice', text: 'Base Team (Country) is required.', icon: 'info' });
            return;
        }
        if (!paidConfirm) {
            Swal.fire({ ...swalConfig, title: 'Payment Required', text: 'Please confirm you have paid the registration fee before submitting.', icon: 'info' });
            return;
        }

        const nameExists = registrations.some(
            reg => reg.name.toLowerCase() === name.trim().toLowerCase()
        );

        if (nameExists) {
            Swal.fire({ ...swalConfig, title: 'Name Taken!', text: 'This player name is already registered by someone else!', icon: 'warning' });
            return;
        }

        const teamExists = registrations.some(
            reg => reg.baseTeam === baseTeam
        );

        if (teamExists) {
            Swal.fire({ ...swalConfig, title: 'Country Taken!', text: `${baseTeam} has already been claimed by another player! Please choose a different country.`, icon: 'warning' });
            return;
        }

        setIsSubmitting(true);
        try {
            const registrationsRef = ref(db, 'registrations');
            await push(registrationsRef, {
                name: name.trim(),
                baseTeam: baseTeam.trim(),
                timestamp: serverTimestamp(),
                status: 'pending'
            });

            Swal.fire({
                ...swalConfig,
                title: 'Registration Sent!',
                text: 'Your registration was successful. Please await admin approval.',
                icon: 'success'
            });
            setName('');
            setBaseTeam('');
            setPaidConfirm(false);
        } catch (error) {
            console.error("Registration error:", error);
            Swal.fire({ ...swalConfig, title: 'Error', text: 'Registration failed. Please try again.', icon: 'error' });
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

                                {/* Base Team */}
                                <div className="space-y-3" ref={dropdownRef}>
                                    <label className="text-xs font-outfit font-black text-slate-400 uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                                        Base Team (Country) <span className="text-rose-400">*</span>
                                    </label>
                                    <div className="relative group">
                                        <button
                                            type="button"
                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                            className={`w-full bg-[#131A2B]/50 backdrop-blur-md border ${isDropdownOpen ? 'border-blue-500/50 bg-[#131A2B]/80' : 'border-white/10'} text-white px-6 py-5 rounded-2xl flex items-center justify-between transition-all font-bold text-lg shadow-inner cursor-pointer text-left`}
                                        >
                                            <span className={baseTeam ? 'text-white' : 'text-[#334155]'}>
                                                {baseTeam || 'Select a Country'}
                                            </span>
                                            <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                        </button>

                                        {/* Dropdown Menu */}
                                        <AnimatePresence>
                                            {isDropdownOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute z-50 w-full mt-2 bg-[#0A0D14]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                                                >
                                                    <div className="p-3 border-b border-white/10 relative">
                                                        <Search className="w-5 h-5 text-slate-400 absolute left-6 top-1/2 -translate-y-1/2" />
                                                        <input
                                                            type="text"
                                                            placeholder="Search country..."
                                                            value={searchQuery}
                                                            onChange={(e) => setSearchQuery(e.target.value)}
                                                            className="w-full bg-[#131A2B] text-white pl-10 pr-4 py-3 rounded-xl outline-none border border-transparent focus:border-blue-500/30 transition-all text-sm font-bold placeholder:text-slate-500"
                                                            autoFocus
                                                        />
                                                    </div>
                                                    <div className="max-h-60 overflow-y-auto no-scrollbar py-2">
                                                        {BASE_TEAMS.filter(t => t.toLowerCase().includes(searchQuery.toLowerCase())).length > 0 ? (
                                                            BASE_TEAMS.filter(t => t.toLowerCase().includes(searchQuery.toLowerCase())).map(country => (
                                                                <button
                                                                    key={country}
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setBaseTeam(country);
                                                                        setIsDropdownOpen(false);
                                                                        setSearchQuery('');
                                                                    }}
                                                                    className={`w-full text-left px-5 py-3 hover:bg-blue-500/10 transition-colors font-bold ${baseTeam === country ? 'text-blue-400 bg-blue-500/5' : 'text-slate-300'}`}
                                                                >
                                                                    {country}
                                                                </button>
                                                            ))
                                                        ) : (
                                                            <div className="px-5 py-6 text-center text-slate-500 font-bold text-sm">
                                                                No countries found
                                                            </div>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
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
