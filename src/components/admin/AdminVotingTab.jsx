import { motion } from 'framer-motion';
import { ThumbsUp, Plus, Trash2, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function AdminVotingTab({ settings, setSettings, onSave, isSaved, onResetVotes }) {
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-slate-900/60 border border-white/[0.06] rounded-2xl p-6 sm:p-8">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        <ThumbsUp className="w-5 h-5" />
                    </div>
                    Voting Management
                </h3>
                <div className="space-y-5">
                    <div>
                        <label className="block text-[11px] text-slate-500 font-bold mb-2 uppercase tracking-widest ml-1">Description</label>
                        <textarea value={settings.votingTitle || ''} onChange={e => setSettings({...settings, votingTitle: e.target.value})} rows={2}
                            className="w-full bg-slate-950/50 border border-white/[0.08] text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500/40" placeholder="e.g., MVP of the Week" />
                    </div>
                    <div className="space-y-3">
                        <h4 className="text-[11px] text-slate-500 font-bold uppercase tracking-widest ml-1">Options</h4>
                        {(settings.votingOptions || []).map((opt, idx) => (
                            <div key={opt.id} className="flex gap-3 items-center">
                                <span className="w-8 h-8 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center text-sm font-bold text-indigo-400">{String.fromCharCode(65 + idx)}</span>
                                <input value={opt.label} onChange={e => {
                                    const o = [...settings.votingOptions]; o[idx] = {...o[idx], label: e.target.value};
                                    setSettings({...settings, votingOptions: o});
                                }} className="flex-1 bg-slate-950/50 border border-white/[0.08] text-white rounded-lg px-3 py-2.5 text-sm outline-none focus:border-indigo-500/40" placeholder={`Option ${String.fromCharCode(65 + idx)}`} />
                                <button onClick={() => setSettings({...settings, votingOptions: settings.votingOptions.filter((_, i) => i !== idx)})}
                                    className="p-2.5 bg-rose-500/5 hover:bg-rose-500/10 text-rose-400/50 hover:text-rose-400 rounded-lg border border-white/[0.06] transition-all">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                        <button onClick={() => setSettings({...settings, votingOptions: [...(settings.votingOptions || []), { id: Date.now().toString(), label: '', votes: 0 }]})}
                            className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-500/5 hover:bg-indigo-500/10 text-indigo-400 border border-dashed border-indigo-500/20 rounded-xl text-xs font-bold uppercase tracking-widest">
                            <Plus className="w-4 h-4" /> Add Option
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-4">
                        <label className="flex items-center justify-between p-4 bg-slate-950/40 border border-white/[0.06] rounded-xl cursor-pointer">
                            <span className="text-xs font-bold text-white">Voting Mode</span>
                            <div className={`w-10 h-6 rounded-full p-0.5 transition-colors cursor-pointer ${settings.votingEnabled ? 'bg-indigo-500' : 'bg-slate-800'}`}
                                onClick={e => { e.preventDefault(); setSettings({...settings, votingEnabled: !settings.votingEnabled}); }}>
                                <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${settings.votingEnabled ? 'translate-x-4' : 'translate-x-0'}`} />
                            </div>
                        </label>
                        <label className="flex items-center justify-between p-4 bg-slate-950/40 border border-white/[0.06] rounded-xl cursor-pointer">
                            <span className="text-xs font-bold text-white">Finished</span>
                            <div className={`w-10 h-6 rounded-full p-0.5 transition-colors cursor-pointer ${settings.votingStatus === 'finished' ? 'bg-emerald-500' : 'bg-slate-800'}`}
                                onClick={e => { e.preventDefault(); setSettings({...settings, votingStatus: settings.votingStatus === 'finished' ? 'starting' : 'finished'}); }}>
                                <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${settings.votingStatus === 'finished' ? 'translate-x-4' : 'translate-x-0'}`} />
                            </div>
                        </label>
                    </div>
                </div>
            </div>
            <motion.button whileHover={!isSaved ? { scale: 1.01 } : {}} onClick={onSave} disabled={isSaved}
                className={`w-full py-4 rounded-xl font-bold text-sm transition-all ${isSaved ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white'}`}>
                {isSaved ? <span className="flex items-center justify-center gap-2"><CheckCircle2 className="w-5 h-5" /> Saved!</span> : 'Save Voting Settings'}
            </motion.button>
            <button onClick={onResetVotes} className="w-full flex items-center justify-center gap-2 py-4 bg-rose-500/5 text-rose-400 border border-rose-500/15 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-rose-500/10 transition-all">
                <RefreshCw className="w-4 h-4" /> Reset All Votes
            </button>
        </motion.div>
    );
}
