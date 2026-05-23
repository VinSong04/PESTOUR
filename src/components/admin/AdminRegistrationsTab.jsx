import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Search, CheckCircle2, DollarSign, Trash2, Clock, CreditCard, QrCode, ImageIcon, X } from 'lucide-react';
import PlayerAvatar from '../ui/PlayerAvatar';

export default function AdminRegistrationsTab({ registrations, onApprove, onConfirmPayment, onDelete }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedReceipt, setSelectedReceipt] = useState(null);

    const filtered = useMemo(() => {
        return registrations.filter(r => {
            if (statusFilter !== 'all' && r.status !== statusFilter) return false;
            if (searchQuery.trim()) {
                const q = searchQuery.toLowerCase();
                return (r.name?.toLowerCase().includes(q)) || (r.teamName?.toLowerCase().includes(q)) || (r.baseTeam?.toLowerCase().includes(q)) || (r.tran_id?.toLowerCase().includes(q));
            }
            return true;
        });
    }, [registrations, statusFilter, searchQuery]);

    const statusCfg = {
        payment_pending: { label: 'Pending', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', icon: Clock },
        pending_verification: { label: 'Verify Payment', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: Clock },
        paid: { label: 'Paid', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', icon: DollarSign },
        approved: { label: 'Approved', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: CheckCircle2 },
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <UserPlus className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white">Registrations</h3>
                    <p className="text-xs text-slate-500">{registrations.length} total</p>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input type="text" placeholder="Search..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-900/60 border border-white/[0.06] text-white rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-amber-500/40" />
                </div>
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                    {['all', 'payment_pending', 'pending_verification', 'paid', 'approved'].map(s => (
                        <button key={s} onClick={() => setStatusFilter(s)}
                            className={`px-3 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all ${statusFilter === s ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' : 'bg-slate-900/60 text-slate-500 border border-white/[0.06]'}`}>
                            {s.replace('_', ' ')}
                        </button>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 max-h-[600px] overflow-y-auto no-scrollbar">
                {filtered.length === 0 ? (
                    <div className="lg:col-span-2 py-16 text-center bg-slate-900/40 rounded-2xl border border-white/[0.04]">
                        <UserPlus className="w-10 h-10 text-slate-700 mx-auto mb-3" />
                        <p className="text-slate-500 text-sm font-bold">No registrations found</p>
                    </div>
                ) : filtered.map(reg => {
                    const sc = statusCfg[reg.status] || statusCfg.payment_pending;
                    const Icon = sc.icon;
                    return (
                        <div key={reg.id} className="flex flex-col p-4 rounded-xl bg-slate-900/60 border border-white/[0.06] hover:border-white/[0.12] transition-all gap-3">
                            <div className="flex items-center gap-3">
                                <PlayerAvatar name={reg.name} logo={reg.baseTeam || reg.logo} className="w-10 h-10 text-sm rounded-xl" />
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-white text-sm truncate">{reg.name}</p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <p className="text-[10px] text-slate-500 font-medium">{reg.teamName || reg.baseTeam}</p>
                                        {reg.paymentMethod && (
                                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-[8px] font-bold text-slate-500 uppercase">
                                                {reg.paymentMethod === 'bakong' ? <><QrCode className="w-2.5 h-2.5" />KHQR</> : reg.paymentMethod === 'aba_khqr' ? <><CreditCard className="w-2.5 h-2.5" />ABA KHQR</> : <><CreditCard className="w-2.5 h-2.5" />PayWay</>}
                                            </span>
                                        )}
                                    </div>
                                    {reg.paymentScreenshot && (
                                        <div className="mt-2">
                                            <button 
                                                onClick={() => setSelectedReceipt(reg)}
                                                className="inline-flex items-center gap-1.5 text-[9px] font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1.5 rounded-lg border border-cyan-500/20 hover:bg-cyan-500/20 transition-all uppercase tracking-widest cursor-pointer shadow-sm"
                                            >
                                                <ImageIcon className="w-3.5 h-3.5" /> View Receipt
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
                                <span className={`inline-flex items-center gap-1 text-[9px] font-bold px-2.5 py-1 rounded-lg ${sc.bg} ${sc.border} border ${sc.color} uppercase tracking-wider`}>
                                    <Icon className="w-3 h-3" />{sc.label}
                                </span>
                                <div className="flex gap-1.5">
                                    {(reg.status === 'payment_pending' || reg.status === 'pending_verification') && (
                                        <button onClick={() => onConfirmPayment(reg.id)} className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/20" title="Confirm Payment">
                                            <DollarSign className="w-3.5 h-3.5" />
                                        </button>
                                    )}
                                    {reg.status === 'paid' && (
                                        <button onClick={() => onApprove(reg.id)} className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20" title="Approve">
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                        </button>
                                    )}
                                    <button onClick={() => onDelete(reg.id)} className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20" title="Delete">
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Receipt Modal Popup */}
            <AnimatePresence>
                {selectedReceipt && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-[#060a13]/90 backdrop-blur-md"
                            onClick={() => setSelectedReceipt(null)}
                        />
                        
                        {/* Modal Card */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            transition={{ type: 'spring', stiffness: 350, damping: 26 }}
                            className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden z-10"
                        >
                            {/* Decorative blur */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none mix-blend-screen opacity-50" />
                            
                            <div className="relative z-10 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-outfit font-black text-white uppercase tracking-wider">
                                            Payment Receipt
                                        </h3>
                                        <p className="text-xs text-slate-400 font-medium">
                                            Player: <strong className="text-white">{selectedReceipt.name}</strong> • {selectedReceipt.teamName || selectedReceipt.baseTeam}
                                        </p>
                                    </div>
                                    <button 
                                        onClick={() => setSelectedReceipt(null)}
                                        className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/[0.03] border border-white/[0.06] text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                                
                                {/* Receipt Image Display */}
                                <div className="relative w-full aspect-[3/4] sm:aspect-square bg-slate-950 rounded-2xl overflow-hidden border border-white/[0.06] flex items-center justify-center">
                                    <img 
                                        src={selectedReceipt.paymentScreenshot} 
                                        alt={`Payment receipt for ${selectedReceipt.name}`} 
                                        className="max-h-full max-w-full object-contain"
                                    />
                                </div>
                                
                                {/* Footer Actions */}
                                <div className="flex gap-3">
                                    <button 
                                        onClick={() => setSelectedReceipt(null)}
                                        className="flex-1 py-3.5 px-4 rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-400 font-bold hover:text-white transition-all text-xs uppercase tracking-wider border border-white/[0.04]"
                                    >
                                        Close
                                    </button>
                                    {(selectedReceipt.status === 'payment_pending' || selectedReceipt.status === 'pending_verification') && (
                                        <button 
                                            onClick={() => {
                                                onConfirmPayment(selectedReceipt.id);
                                                setSelectedReceipt(null);
                                            }}
                                            className="flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-bold transition-all text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] flex items-center justify-center gap-1.5"
                                        >
                                            <DollarSign className="w-3.5 h-3.5" /> Confirm Payment
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
