import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, onValue, push, serverTimestamp, remove, update } from 'firebase/database';
import { UserPlus, Sparkles, CheckCircle2, ShieldAlert, Trash2, CheckCircle } from 'lucide-react';

export default function RegisterView({ isAdmin, isOpen = true }) {
    const [registrations, setRegistrations] = useState([]);
    const [name, setName] = useState('');
    const [team, setTeam] = useState('');
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

        // Check if name already exists
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
                team: team.trim() || 'Free Agent',
                timestamp: serverTimestamp(),
                status: 'pending'
            });

            setSuccessMessage('Successfully registered! Waiting for admin approval.');
            setName('');
            setTeam('');

            // Clear success message after 5 seconds
            setTimeout(() => setSuccessMessage(''), 5000);
        } catch (error) {
            console.error("Registration error:", error);
            setErrorMessage('Registration failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to remove this player?")) return;
        try {
            await remove(ref(db, `registrations/${id}`));
        } catch (error) {
            console.error("Error deleting registration:", error);
        }
    };

    const handleApprove = async (id) => {
        try {
            await update(ref(db, `registrations/${id}`), {
                status: 'approved'
            });
        } catch (error) {
            console.error("Error approving registration:", error);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 w-full max-w-5xl mx-auto flex flex-col justify-center mt-2 pb-12">
            {/* Header Area */}
            <div className="relative overflow-hidden rounded-[32px] bg-[#0A0D14] border border-[#1E2738]/60 p-8 sm:p-12 text-center shadow-[0_0_50px_rgba(0,0,0,0.4)] flex flex-col items-center">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#6384FF] opacity-[0.03] blur-[100px] pointer-events-none rounded-full"></div>

                <div className="relative z-10">
                    <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-[#131C32] border border-[#2D3A5D]/50 shadow-inner mb-6">
                        <UserPlus className="w-8 h-8 text-[#A5B4FC] drop-shadow-[0_0_15px_rgba(165,180,252,0.5)]" />
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tighter mb-4 text-[#F8FAFC] drop-shadow-md uppercase">
                        Season Registration
                    </h1>
                    <p className="text-[#8B9BB4] font-medium tracking-wide max-w-lg mx-auto">
                        Secure your spot in the upcoming tournament. Only the best compete here.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Registration Form */}
                <div className="bg-[#0A0D14] rounded-[24px] border border-[#1E2738]/60 p-6 sm:p-8 shadow-[0_0_40px_rgba(0,0,0,0.3)] relative overflow-hidden h-fit">
                    <div className="absolute top-1/2 left-[-100px] w-64 h-64 bg-[#C084FC] opacity-[0.02] blur-[80px] pointer-events-none rounded-full"></div>

                    <h2 className="text-2xl font-black text-[#E2E8F0] tracking-wide mb-6 flex items-center gap-2 relative z-10">
                        <Sparkles className="w-5 h-5 text-[#C084FC]" /> Join the Roster
                    </h2>

                    {successMessage && (
                        <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3 text-emerald-400 font-medium relative z-10">
                            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                            <p className="text-sm">{successMessage}</p>
                        </div>
                    )}

                    {errorMessage && (
                        <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-3 text-rose-400 font-medium relative z-10">
                            <ShieldAlert className="w-5 h-5 flex-shrink-0" />
                            <p className="text-sm">{errorMessage}</p>
                        </div>
                    )}

                    {isOpen ? (
                        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-[#8B9BB4] uppercase tracking-wider ml-1">In-Game Name <span className="text-rose-400">*</span></label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. MasterPlayer88"
                                    className="w-full bg-[#131A2B] border border-[#222B3D] text-[#E2E8F0] px-4 py-3.5 rounded-xl outline-none focus:border-[#6384FF]/50 focus:ring-1 focus:ring-[#6384FF]/50 transition-all font-medium placeholder:text-[#475569]"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-[#8B9BB4] uppercase tracking-wider ml-1">Team / Clan (Optional)</label>
                                <input
                                    type="text"
                                    value={team}
                                    onChange={(e) => setTeam(e.target.value)}
                                    placeholder="e.g. Team Liquid"
                                    className="w-full bg-[#131A2B] border border-[#222B3D] text-[#E2E8F0] px-4 py-3.5 rounded-xl outline-none focus:border-[#6384FF]/50 focus:ring-1 focus:ring-[#6384FF]/50 transition-all font-medium placeholder:text-[#475569]"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-4 px-6 rounded-xl font-black tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(99,132,255,0.15)] mt-4 ${isSubmitting
                                    ? 'bg-[#1E2738] text-[#475569] cursor-not-allowed'
                                    : 'bg-gradient-to-r from-[#8B78FF] to-[#6384FF] hover:from-[#7863FF] hover:to-[#4A6BFF] text-white border border-[#8B78FF]/30 hover:shadow-[0_0_30px_rgba(99,132,255,0.3)]'
                                    }`}
                            >
                                {isSubmitting ? 'Registering...' : 'Register Now'}
                            </button>
                        </form>
                    ) : (
                        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-[#1E2738]/50 rounded-xl bg-[#0a0b10]/50 relative z-10 text-center h-[280px]">
                            <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center mb-4 border border-rose-500/20">
                                <ShieldAlert className="w-8 h-8 text-rose-400" />
                            </div>
                            <h3 className="text-[#E2E8F0] font-black text-xl mb-2 tracking-wide">Registration Closed</h3>
                            <p className="text-[#8B9BB4] font-medium text-sm">We are not accepting any new players at this time. Please check back later for the next season!</p>
                        </div>
                    )}
                </div>

                {/* Registered Players List */}
                <div className="bg-[#0A0D14] rounded-[24px] border border-[#1E2738]/60 p-6 sm:p-8 shadow-[0_0_40px_rgba(0,0,0,0.3)] flex flex-col h-[500px]">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-black text-[#E2E8F0] tracking-wide relative flex items-center gap-3">
                            Registered Players
                            <span className="bg-[#131C32] border border-[#2D3A5D]/50 text-[#A5B4FC] text-xs py-1 px-2.5 rounded-full font-bold">
                                {registrations.length}
                            </span>
                        </h2>
                    </div>

                    <div className="flex-1 overflow-y-auto no-scrollbar pr-2 space-y-3">
                        {registrations.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-[#1E2738] rounded-xl">
                                <div className="w-12 h-12 rounded-full bg-[#131A2B] flex items-center justify-center mb-3">
                                    <UserPlus className="w-5 h-5 text-[#475569]" />
                                </div>
                                <p className="text-[#8B9BB4] font-medium">No players registered yet.</p>
                                <p className="text-[#475569] text-xs mt-1">Be the first to join the tournament.</p>
                            </div>
                        ) : (
                            registrations.map((reg, index) => (
                                <div key={reg.id} className="group flex items-center justify-between p-4 rounded-xl bg-[#131A2B] border border-[#222B3D] hover:border-[#2D3A5D] hover:bg-[#18233C] transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-[#0A0D14] border border-[#2D3A5D]/50 flex items-center justify-center text-[#A5B4FC] font-black text-sm shadow-inner overflow-hidden">
                                            {reg.name.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="text-[#F8FAFC] font-bold text-sm tracking-wide group-hover:text-[#A5B4FC] transition-colors">{reg.name}</p>
                                            <p className="text-[#475569] text-xs font-semibold">{reg.team}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded border ${reg.status === 'approved'
                                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                            : 'bg-[#F59E0B]/10 border-[#F59E0B]/20 text-[#F59E0B]'
                                            }`}>
                                            {reg.status || 'Pending'}
                                        </span>
                                        {isAdmin && (
                                            <>
                                                {reg.status !== 'approved' && (
                                                    <button
                                                        onClick={() => handleApprove(reg.id)}
                                                        className="text-emerald-400/50 hover:text-emerald-400 hover:bg-emerald-400/10 p-1.5 rounded transition-all opacity-0 group-hover:opacity-100"
                                                        title="Approve"
                                                    >
                                                        <CheckCircle className="w-4 h-4" />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(reg.id)}
                                                    className="text-rose-400/50 hover:text-rose-400 hover:bg-rose-400/10 p-1.5 rounded transition-all opacity-0 group-hover:opacity-100"
                                                    title="Remove"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
