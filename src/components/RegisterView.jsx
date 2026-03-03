import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, onValue, push, serverTimestamp, remove, update } from 'firebase/database';
import { UserPlus, Sparkles, CheckCircle2, ShieldAlert, Trash2, CheckCircle, Trophy, Users, Zap, Star, DollarSign, Upload, X } from 'lucide-react';
import PlayerAvatar from './PlayerAvatar';

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

    const handleDelete = async (id) => {
        if (!window.confirm("Remove this player?")) return;
        try { await remove(ref(db, `registrations/${id}`)); } catch (e) { console.error(e); }
    };

    const handleApprove = async (id) => {
        try { await update(ref(db, `registrations/${id}`), { status: 'approved' }); } catch (e) { console.error(e); }
    };

    const approvedCount = registrations.filter(r => r.status === 'approved').length;
    const slotsLeft = Math.max(0, 12 - approvedCount);

    return (
        <div className="space-y-8 animate-in fade-in duration-500 w-full max-w-5xl mx-auto flex flex-col justify-center mt-2 pb-12">

            {/* ===== HERO BANNER ===== */}
            <div className="relative overflow-hidden rounded-[32px] bg-[#0A0D14] border border-[#1E2738]/60 shadow-[0_0_60px_rgba(0,0,0,0.5)]">
                {/* Animated background effects */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-[-50%] left-[-20%] w-[600px] h-[600px] bg-[#6384FF] opacity-[0.04] blur-[150px] rounded-full animate-pulse"></div>
                    <div className="absolute bottom-[-40%] right-[-10%] w-[500px] h-[500px] bg-[#C084FC] opacity-[0.04] blur-[120px] rounded-full"></div>
                    <div className="absolute top-[20%] right-[30%] w-[300px] h-[300px] bg-[#F59E0B] opacity-[0.02] blur-[100px] rounded-full"></div>
                    {/* Grid pattern overlay */}
                    <div className="absolute inset-0 opacity-[0.03]" style={{
                        backgroundImage: 'linear-gradient(rgba(99,132,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,132,255,0.3) 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}></div>
                </div>

                <div className="relative z-10 py-16 px-8 sm:px-16 text-center flex flex-col items-center">
                    {/* Badge */}
                    <div className="mb-8 px-5 py-2 rounded-full bg-gradient-to-r from-[#131C32] to-[#1a2340] border border-[#2D3A5D]/60 flex items-center gap-2.5 shadow-[0_0_20px_rgba(99,132,255,0.08)]">
                        <div className="w-2 h-2 rounded-full bg-[#F59E0B] shadow-[0_0_10px_#F59E0B] animate-pulse"></div>
                        <span className="text-[11px] font-black tracking-[0.2em] uppercase text-[#F59E0B]">Registration Open</span>
                    </div>

                    {/* Icon */}
                    <div className="mb-8 relative">
                        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#6384FF]/20 to-[#C084FC]/20 border border-[#6384FF]/20 flex items-center justify-center shadow-[0_0_40px_rgba(99,132,255,0.15)]">
                            <UserPlus className="w-12 h-12 text-[#A5B4FC] drop-shadow-[0_0_20px_rgba(165,180,252,0.5)]" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#F59E0B] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                            <Star className="w-4 h-4 text-white" />
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl sm:text-6xl font-black tracking-tighter mb-4 uppercase">
                        <span className="bg-gradient-to-r from-[#A5B4FC] via-[#C084FC] to-[#F0ABFC] bg-clip-text text-transparent drop-shadow-md">
                            Join The Battle
                        </span>
                    </h1>
                    <p className="text-[#8B9BB4] text-lg sm:text-xl font-medium mb-10 tracking-wide max-w-lg">
                        Secure your spot in the ultimate eFootball showdown. Register now and claim your place.
                    </p>

                    {/* Stats Row - Admin Only */}
                    {isAdmin && (
                        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                            <div className="flex items-center gap-2.5 px-5 py-3 bg-[#131A2B]/80 backdrop-blur-sm border border-[#222B3D] rounded-2xl">
                                <div className="w-9 h-9 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center border border-[#F59E0B]/20">
                                    <Users className="w-4 h-4 text-[#F59E0B]" />
                                </div>
                                <div className="text-left">
                                    <p className="text-xl font-black text-[#F8FAFC] leading-none">{registrations.length}</p>
                                    <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Registered</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2.5 px-5 py-3 bg-[#131A2B]/80 backdrop-blur-sm border border-[#222B3D] rounded-2xl">
                                <div className="w-9 h-9 rounded-xl bg-[#10B981]/10 flex items-center justify-center border border-[#10B981]/20">
                                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                                </div>
                                <div className="text-left">
                                    <p className="text-xl font-black text-[#F8FAFC] leading-none">{approvedCount}</p>
                                    <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Approved</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2.5 px-5 py-3 bg-[#131A2B]/80 backdrop-blur-sm border border-[#222B3D] rounded-2xl">
                                <div className="w-9 h-9 rounded-xl bg-[#EF4444]/10 flex items-center justify-center border border-[#EF4444]/20">
                                    <Zap className="w-4 h-4 text-[#EF4444]" />
                                </div>
                                <div className="text-left">
                                    <p className="text-xl font-black text-[#F8FAFC] leading-none">{slotsLeft}</p>
                                    <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Slots Left</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ===== MAIN CONTENT ===== */}
            <div className={`grid grid-cols-1 ${isAdmin ? 'lg:grid-cols-2' : ''} gap-8`}>

                {/* ===== REGISTRATION FORM ===== */}
                <div className="bg-[#0A0D14] rounded-[28px] border border-[#1E2738]/60 shadow-[0_0_40px_rgba(0,0,0,0.3)] relative overflow-hidden">
                    {/* Glow accents */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#6384FF]/40 to-transparent"></div>
                    <div className="absolute top-1/2 left-[-100px] w-64 h-64 bg-[#C084FC] opacity-[0.02] blur-[80px] pointer-events-none rounded-full"></div>

                    <div className="p-8 sm:p-10">
                        {/* Form Header */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#C084FC]/20 to-[#6384FF]/20 border border-[#C084FC]/20 flex items-center justify-center shadow-inner">
                                <Sparkles className="w-6 h-6 text-[#C084FC]" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-[#E2E8F0] tracking-tight">Enter the Arena</h2>
                                <p className="text-xs font-bold text-[#64748B] tracking-wide">Fill in your details to register</p>
                            </div>
                        </div>

                        {successMessage && (
                            <div className="mb-6 p-5 rounded-2xl bg-emerald-500/8 border border-emerald-500/20 flex items-center gap-3 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent"></div>
                                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0 relative z-10">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                </div>
                                <p className="text-sm font-bold text-emerald-400 relative z-10">{successMessage}</p>
                            </div>
                        )}

                        {errorMessage && (
                            <div className="mb-6 p-5 rounded-2xl bg-rose-500/8 border border-rose-500/20 flex items-center gap-3 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-rose-500/5 to-transparent"></div>
                                <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center flex-shrink-0 relative z-10">
                                    <ShieldAlert className="w-5 h-5 text-rose-400" />
                                </div>
                                <p className="text-sm font-bold text-rose-400 relative z-10">{errorMessage}</p>
                            </div>
                        )}

                        {isOpen ? (
                            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                {/* Player Name */}
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-[#8B9BB4] uppercase tracking-[0.15em] ml-1 flex items-center gap-1.5">
                                        Player Name <span className="text-rose-400">*</span>
                                    </label>
                                    <div className="relative group">
                                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                                            placeholder="e.g. K-Vinn"
                                            className="w-full bg-[#131A2B] border-2 border-[#222B3D] text-[#E2E8F0] px-5 py-4 rounded-2xl outline-none focus:border-[#6384FF]/60 focus:ring-2 focus:ring-[#6384FF]/20 transition-all font-bold placeholder:text-[#334155] text-lg" />
                                    </div>
                                </div>

                                {/* Team / Clan */}
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-[#8B9BB4] uppercase tracking-[0.15em] ml-1 flex items-center gap-1.5">
                                        Team / Clan <span className="text-rose-400">*</span>
                                    </label>
                                    <div className="relative group">
                                        <input type="text" value={team} onChange={(e) => setTeam(e.target.value)}
                                            placeholder="e.g. Team Liquid"
                                            className="w-full bg-[#131A2B] border-2 border-[#222B3D] text-[#E2E8F0] px-5 py-4 rounded-2xl outline-none focus:border-[#6384FF]/60 focus:ring-2 focus:ring-[#6384FF]/20 transition-all font-bold placeholder:text-[#334155] text-lg" />
                                    </div>
                                </div>

                                {/* Base Team Logo Upload */}
                                <div className="space-y-3">
                                    <label className="text-xs font-black text-[#8B9BB4] uppercase tracking-[0.15em] ml-1 flex items-center gap-1.5">
                                        <Upload className="w-3.5 h-3.5" /> Base Team Logo <span className="text-rose-400">*</span>
                                    </label>
                                    <p className="text-[10px] text-[#475569] font-bold ml-1 -mt-1">PNG or JPG, transparent background recommended</p>

                                    {logoPreview ? (
                                        <div className="flex items-center gap-4 p-4 bg-[#131A2B] border-2 border-[#6384FF]/30 rounded-2xl">
                                            <div className="w-16 h-16 rounded-xl bg-[#0A0D14] border border-[#222B3D] flex items-center justify-center overflow-hidden flex-shrink-0 shadow-inner">
                                                <img src={logoPreview} alt="Logo" className="w-14 h-14 object-contain" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-bold text-[#A5B4FC]">Logo uploaded</p>
                                                <p className="text-[10px] text-[#64748B] font-bold">Click below to change</p>
                                            </div>
                                            <button type="button" onClick={() => { setLogoPreview(null); setLogoBase64(''); }}
                                                className="w-8 h-8 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 flex items-center justify-center text-rose-400 transition-all">
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="flex flex-col items-center justify-center gap-3 p-8 bg-[#131A2B] border-2 border-dashed border-[#222B3D] hover:border-[#6384FF]/40 rounded-2xl cursor-pointer transition-all group">
                                            <div className="w-14 h-14 rounded-2xl bg-[#6384FF]/10 flex items-center justify-center border border-[#6384FF]/20 group-hover:scale-110 transition-transform">
                                                <Upload className="w-6 h-6 text-[#6384FF]" />
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm font-bold text-[#8B9BB4] group-hover:text-[#A5B4FC] transition-colors">Click to upload logo</p>
                                                <p className="text-[10px] text-[#475569] font-bold mt-0.5">.PNG or .JPG • Max 2MB</p>
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
                                <div className="bg-[#131A2B] border-2 border-[#F59E0B]/20 rounded-2xl p-5 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-11 h-11 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center border border-[#F59E0B]/20 flex-shrink-0">
                                            <DollarSign className="w-5 h-5 text-[#F59E0B]" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-[#E2E8F0]">Registration Fee: <span className="text-[#F59E0B]">$2.00</span></p>
                                            <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Pay to admin before submitting</p>
                                        </div>
                                    </div>
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all flex-shrink-0 ${paidConfirm ? 'bg-[#F59E0B] border-[#F59E0B]' : 'border-[#334155] group-hover:border-[#F59E0B]/50'
                                            }`} onClick={() => setPaidConfirm(!paidConfirm)}>
                                            {paidConfirm && <CheckCircle2 className="w-4 h-4 text-[#0A0D14]" />}
                                        </div>
                                        <span className="text-xs font-bold text-[#8B9BB4]" onClick={() => setPaidConfirm(!paidConfirm)}>I confirm that I have paid the <strong className="text-[#F59E0B]">$2</strong> registration fee</span>
                                    </label>
                                </div>

                                <button type="submit" disabled={isSubmitting}
                                    className={`w-full py-5 px-6 rounded-2xl font-black tracking-widest uppercase transition-all text-lg relative overflow-hidden group ${isSubmitting
                                        ? 'bg-[#1E2738] text-[#475569] cursor-not-allowed'
                                        : 'bg-gradient-to-r from-[#8B78FF] via-[#6384FF] to-[#38BDF8] hover:from-[#7863FF] hover:via-[#4A6BFF] hover:to-[#0EA5E9] text-white border border-[#8B78FF]/30 shadow-[0_0_30px_rgba(99,132,255,0.25)] hover:shadow-[0_0_50px_rgba(99,132,255,0.4)]'
                                        }`}>
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                        <UserPlus className="w-5 h-5" />
                                        {isSubmitting ? 'Submitting...' : 'Register Now — $2'}
                                    </span>
                                    {!isSubmitting && <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>}
                                </button>

                                <p className="text-center text-[10px] font-bold text-[#475569] tracking-wider uppercase mt-4">
                                    <Trophy className="w-3 h-3 inline mr-1 -mt-0.5" />
                                    Your registration will be reviewed by an admin
                                </p>
                            </form>
                        ) : (
                            <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-[#1E2738]/50 rounded-2xl bg-[#0a0b10]/50 relative z-10 text-center">
                                <div className="w-20 h-20 rounded-full bg-rose-500/10 flex items-center justify-center mb-5 border border-rose-500/20 shadow-[0_0_30px_rgba(239,68,68,0.1)]">
                                    <ShieldAlert className="w-10 h-10 text-rose-400" />
                                </div>
                                <h3 className="text-[#E2E8F0] font-black text-2xl mb-3 tracking-tight">Registration Closed</h3>
                                <p className="text-[#8B9BB4] font-medium text-sm max-w-sm">We are not accepting new players at this time. Check back later for the next season!</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
