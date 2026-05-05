import { useState, useEffect, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, CheckCircle2, AlertTriangle, Smartphone, RefreshCw, QrCode, ShieldCheck, Wifi } from 'lucide-react';
import usePaymentStatus from '../../hooks/usePaymentStatus';

// QR expiration time in seconds (5 minutes)
const QR_EXPIRATION_SECONDS = 300;

/**
 * BakongPaymentModal — Premium modal for displaying KHQR QR code.
 * Now uses real-time Firebase listener (usePaymentStatus) instead of polling.
 * When admin confirms payment from dashboard, this modal updates instantly.
 *
 * Props:
 * @param {boolean} isOpen - Whether the modal is visible
 * @param {function} onClose - Called when user closes the modal
 * @param {function} onPaymentSuccess - Called when payment is verified
 * @param {function} onPaymentExpired - Called when QR code expires
 * @param {string} qrString - The EMVCo KHQR string to encode
 * @param {string} amount - Display amount (e.g., "2.00")
 * @param {string} currency - Currency code (e.g., "USD")
 * @param {string} transactionRef - Transaction reference ID
 * @param {string} [playerName] - Player name for display
 */
export default function BakongPaymentModal({
    isOpen,
    onClose,
    onPaymentSuccess,
    onPaymentExpired,
    qrString,
    amount = '2.00',
    currency = 'USD',
    transactionRef = '',
    playerName = '',
}) {
    const [timeLeft, setTimeLeft] = useState(QR_EXPIRATION_SECONDS);
    const [paymentStatus, setPaymentStatus] = useState('pending'); // 'pending' | 'success' | 'expired'
    const timerRef = useRef(null);
    const successHandled = useRef(false);

    // Real-time Firebase listener — replaces the old polling approach
    const { isPaid } = usePaymentStatus(transactionRef, isOpen && paymentStatus !== 'success');

    // Format time as MM:SS
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    // React to real-time payment status changes
    useEffect(() => {
        if (isPaid && paymentStatus !== 'success' && !successHandled.current) {
            successHandled.current = true;
            setPaymentStatus('success');
            clearInterval(timerRef.current);
            setTimeout(() => onPaymentSuccess?.(), 1500);
        }
    }, [isPaid, paymentStatus, onPaymentSuccess]);

    // Countdown timer
    useEffect(() => {
        if (!isOpen || paymentStatus === 'success') return;

        setTimeLeft(QR_EXPIRATION_SECONDS);
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    setPaymentStatus('expired');
                    onPaymentExpired?.();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, [isOpen, paymentStatus, onPaymentExpired]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            clearInterval(timerRef.current);
        };
    }, []);

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setPaymentStatus('pending');
            setTimeLeft(QR_EXPIRATION_SECONDS);
            successHandled.current = false;
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const timerPercent = (timeLeft / QR_EXPIRATION_SECONDS) * 100;
    const isUrgent = timeLeft < 60;
    const currencySymbol = currency === 'KHR' ? '៛' : '$';

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
                >
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black/80 backdrop-blur-md" 
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="relative w-full max-w-md rounded-3xl overflow-hidden"
                        style={{
                            background: 'linear-gradient(145deg, rgba(15,20,35,0.98), rgba(8,12,24,0.98))',
                            border: '1px solid rgba(255,255,255,0.06)',
                            boxShadow: '0 0 80px rgba(6,182,212,0.08), 0 25px 50px rgba(0,0,0,0.5)',
                        }}
                    >
                        {/* Top gradient accent */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

                        {/* Glow effects */}
                        <div className="absolute top-[-40%] right-[-20%] w-[300px] h-[300px] bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />
                        <div className="absolute bottom-[-30%] left-[-15%] w-[250px] h-[250px] bg-purple-500/5 blur-[80px] rounded-full pointer-events-none" />

                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-5 right-5 z-50 w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/[0.08] transition-all"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="relative z-10 p-7 sm:p-8">

                            {/* Header */}
                            <div className="text-center mb-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/[0.06] border border-cyan-500/10 mb-4">
                                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_rgba(34,211,238,0.5)]" />
                                    <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-cyan-300/80">
                                        Bakong KHQR
                                    </span>
                                </div>
                                <h2 className="text-2xl font-outfit font-black text-white tracking-tight mb-1">
                                    ទូទាត់ប្រាក់
                                </h2>
                                <p className="text-xs font-medium text-slate-500">
                                    Scan to complete your payment
                                </p>
                            </div>

                            {/* Payment Amount */}
                            <div className="flex items-center justify-center gap-3 mb-6">
                                <div className="text-center">
                                    <span className="text-4xl font-outfit font-black text-white">
                                        {currencySymbol}{amount}
                                    </span>
                                    <span className="text-xs font-semibold text-slate-500 ml-2 uppercase">{currency}</span>
                                </div>
                            </div>

                            {/* QR Code Area */}
                            <div className="flex justify-center mb-5">
                                {paymentStatus === 'success' ? (
                                    <motion.div
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="w-[260px] h-[260px] rounded-2xl bg-emerald-500/[0.06] border-2 border-emerald-500/20 flex flex-col items-center justify-center gap-4"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', delay: 0.2 }}
                                        >
                                            <CheckCircle2 className="w-20 h-20 text-emerald-400" />
                                        </motion.div>
                                        <div className="text-center">
                                            <p className="text-lg font-outfit font-bold text-emerald-300">ជោគជ័យ!</p>
                                            <p className="text-xs text-emerald-400/60 font-medium">Payment Received</p>
                                        </div>
                                    </motion.div>
                                ) : paymentStatus === 'expired' ? (
                                    <div className="w-[260px] h-[260px] rounded-2xl bg-amber-500/[0.04] border-2 border-amber-500/15 flex flex-col items-center justify-center gap-4">
                                        <AlertTriangle className="w-16 h-16 text-amber-400/60" />
                                        <div className="text-center">
                                            <p className="text-sm font-outfit font-bold text-amber-300">QR Code Expired</p>
                                            <p className="text-xs text-amber-400/50 font-medium mt-1">Please generate a new one</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="relative group">
                                        {/* QR Container with Bakong-styled border */}
                                        <div
                                            className="relative rounded-2xl p-4 transition-all duration-500"
                                            style={{
                                                background: 'white',
                                                boxShadow: '0 0 40px rgba(6,182,212,0.06)',
                                            }}
                                        >
                                            <QRCodeSVG
                                                value={qrString}
                                                size={228}
                                                bgColor="#ffffff"
                                                fgColor="#0f1423"
                                                level="M"
                                                includeMargin={false}
                                                imageSettings={{
                                                    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%23ed1f2a'/%3E%3Ctext x='50' y='58' text-anchor='middle' fill='white' font-size='24' font-weight='bold' font-family='Arial'%3EBK%3C/text%3E%3C/svg%3E",
                                                    x: undefined,
                                                    y: undefined,
                                                    height: 36,
                                                    width: 36,
                                                    excavate: true,
                                                }}
                                            />
                                        </div>

                                        {/* Corner accents */}
                                        <div className="absolute -top-1 -left-1 w-5 h-5 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-lg" />
                                        <div className="absolute -top-1 -right-1 w-5 h-5 border-t-2 border-r-2 border-cyan-500/30 rounded-tr-lg" />
                                        <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-2 border-l-2 border-cyan-500/30 rounded-bl-lg" />
                                        <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-2 border-r-2 border-cyan-500/30 rounded-br-lg" />
                                    </div>
                                )}
                            </div>

                            {/* Timer Bar */}
                            {paymentStatus !== 'success' && paymentStatus !== 'expired' && (
                                <div className="mb-5">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-1.5">
                                            <Clock className={`w-3.5 h-3.5 ${isUrgent ? 'text-rose-400' : 'text-slate-500'}`} />
                                            <span className={`text-[10px] font-bold uppercase tracking-[0.15em] ${isUrgent ? 'text-rose-400' : 'text-slate-500'}`}>
                                                Time Remaining
                                            </span>
                                        </div>
                                        <span className={`text-sm font-outfit font-black tabular-nums ${isUrgent ? 'text-rose-400 animate-pulse' : 'text-white'}`}>
                                            {formatTime(timeLeft)}
                                        </span>
                                    </div>
                                    <div className="w-full h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                                        <motion.div
                                            className={`h-full rounded-full transition-colors duration-1000 ${isUrgent
                                                ? 'bg-gradient-to-r from-rose-500 to-amber-500'
                                                : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                                                }`}
                                            initial={{ width: '100%' }}
                                            animate={{ width: `${timerPercent}%` }}
                                            transition={{ duration: 0.5 }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Real-time Listening Indicator */}
                            {paymentStatus === 'pending' && (
                                <>
                                    <div className="flex items-center justify-center gap-2 mb-4 py-2 px-4 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/10">
                                        <Wifi className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                                        <span className="text-[10px] font-bold text-emerald-400/70 uppercase tracking-[0.15em]">
                                            Listening for payment confirmation...
                                        </span>
                                    </div>

                                    {/* Instructions */}
                                    <div className="space-y-2.5 mb-5">
                                        {[
                                            { icon: Smartphone, text: 'បើកកម្មវិធី Banking App របស់អ្នក', sub: 'Open your Bakong-supported banking app' },
                                            { icon: QrCode, text: 'ស្កេន QR Code ខាងលើ', sub: 'Scan the QR code above' },
                                            { icon: ShieldCheck, text: 'បញ្ជាក់ការទូទាត់', sub: 'Confirm the payment in your app' },
                                        ].map((step, i) => (
                                            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                                                <div className="w-7 h-7 rounded-lg bg-cyan-500/[0.08] border border-cyan-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <step.icon className="w-3.5 h-3.5 text-cyan-400/70" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-semibold text-white/80">{step.text}</p>
                                                    <p className="text-[10px] text-slate-600 font-medium">{step.sub}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}

                            {/* Transaction Info */}
                            {transactionRef && paymentStatus !== 'success' && (
                                <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.03]">
                                    <span className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider">Ref</span>
                                    <span className="text-[11px] font-mono font-bold text-slate-400">{transactionRef}</span>
                                </div>
                            )}

                            {/* Player name */}
                            {playerName && paymentStatus !== 'success' && (
                                <div className="flex items-center justify-between px-4 py-3 mt-2 rounded-xl bg-white/[0.02] border border-white/[0.03]">
                                    <span className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider">Player</span>
                                    <span className="text-[11px] font-bold text-slate-400">{playerName}</span>
                                </div>
                            )}

                            {/* Expired action */}
                            {paymentStatus === 'expired' && (
                                <motion.button
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={onClose}
                                    className="w-full mt-4 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-outfit font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(245,158,11,0.15)]"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    Try Again
                                </motion.button>
                            )}
                        </div>

                        {/* Bottom gradient accent */}
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
