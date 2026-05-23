import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminModal({ modalConfig, setModalConfig }) {
    const [promptValue, setPromptValue] = useState('');

    if (!modalConfig) return null;

    const close = () => { setModalConfig(null); setPromptValue(''); };

    const handleAction = () => {
        if (modalConfig.type === 'prompt') {
            if (promptValue === modalConfig.expectedValue) {
                modalConfig.onConfirm();
                setPromptValue('');
            } else {
                setModalConfig({
                    title: 'Invalid Input',
                    message: `You must type '${modalConfig.expectedValue}' exactly.`,
                    type: 'alert', danger: true
                });
                setPromptValue('');
            }
        } else {
            if (modalConfig.onConfirm) modalConfig.onConfirm();
            else setModalConfig(null);
        }
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-[#0A0D14]/80 backdrop-blur-md"
                    onClick={close}
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-[32px] p-8 shadow-2xl overflow-hidden"
                >
                    <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] pointer-events-none mix-blend-screen opacity-50 ${
                        modalConfig.danger ? 'bg-rose-500/20' :
                        modalConfig.type === 'alert' ? 'bg-emerald-500/20' :
                        'bg-amber-500/20'
                    }`} />

                    <div className="relative z-10">
                        <h3 className={`text-2xl font-outfit font-black mb-2 uppercase tracking-widest ${modalConfig.danger ? 'text-rose-400' : 'text-white'}`}>
                            {modalConfig.title}
                        </h3>
                        <p className="text-slate-400 font-medium mb-8 leading-relaxed">{modalConfig.message}</p>

                        {modalConfig.type === 'prompt' && (
                            <input
                                type="text" value={promptValue}
                                onChange={(e) => setPromptValue(e.target.value)}
                                placeholder={`Type '${modalConfig.expectedValue}'`}
                                className="w-full bg-slate-950/50 border border-white/10 rounded-2xl px-5 py-4 mb-8 text-white focus:outline-none focus:border-rose-500/50 transition-colors font-mono font-bold uppercase tracking-widest text-center shadow-inner"
                                autoFocus
                            />
                        )}

                        <div className="flex gap-4 items-center">
                            {(modalConfig.type === 'confirm' || modalConfig.type === 'prompt') && (
                                <button onClick={close} className="flex-1 px-6 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-outfit font-black uppercase tracking-widest transition-all text-sm">
                                    Cancel
                                </button>
                            )}
                            <button
                                onClick={handleAction}
                                className={`flex-1 px-6 py-4 rounded-2xl font-outfit font-black uppercase tracking-widest transition-all text-sm shadow-lg ${
                                    modalConfig.danger ? 'bg-rose-500 hover:bg-rose-400 text-slate-950' :
                                    modalConfig.type === 'alert' ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950' :
                                    'bg-white hover:bg-slate-200 text-slate-900'
                                }`}
                            >
                                {modalConfig.type === 'alert' ? 'OK' : 'Confirm'}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
