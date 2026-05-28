import { motion } from 'framer-motion';
import { Settings, CheckCircle2 } from 'lucide-react';

export default function AdminSettingsTab({ settings, setSettings, onSave, isSaved }) {
    const ToggleRow = ({ label, desc, checked, onChange, color = 'blue' }) => {
        const colors = {
            blue: { track: 'bg-blue-500', hover: 'hover:border-blue-500/40' },
            emerald: { track: 'bg-emerald-500', hover: 'hover:border-emerald-500/40' },
            purple: { track: 'bg-purple-500', hover: 'hover:border-purple-500/40' },
        };
        const c = colors[color] || colors.blue;
        return (
            <label className={`flex items-center justify-between p-5 bg-slate-950/40 border border-white/[0.06] rounded-2xl cursor-pointer ${c.hover} transition-all group/t`}>
                <div className="pr-4">
                    <span className="text-sm font-bold text-white block tracking-wide">{label}</span>
                    <span className="text-xs text-slate-500 mt-0.5 block">{desc}</span>
                </div>
                <div className={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer flex-shrink-0 ${checked ? c.track : 'bg-slate-800 border border-white/10'}`}
                    onClick={(e) => { e.preventDefault(); onChange(!checked); }}>
                    <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
                </div>
            </label>
        );
    };

    const InputRow = ({ label, value, onChange, placeholder }) => (
        <div>
            <label className="block text-[11px] text-slate-500 font-bold mb-2 uppercase tracking-widest ml-1">{label}</label>
            <input value={value} onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-slate-950/50 border border-white/[0.08] text-white rounded-xl px-4 py-3.5 focus:border-blue-500/40 outline-none text-sm font-medium shadow-inner transition-all" />
        </div>
    );

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Tournament Info */}
            <div className="bg-slate-900/60 border border-white/[0.06] rounded-2xl p-6 sm:p-8">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        <Settings className="w-5 h-5" />
                    </div>
                    Tournament Info
                </h3>
                <div className="grid md:grid-cols-2 gap-5">
                    <InputRow label="Tournament Name" value={settings.name} onChange={v => setSettings({...settings, name: v})} />
                    <InputRow label="Season" value={settings.season} onChange={v => setSettings({...settings, season: v})} />
                    <div className="md:col-span-2">
                        <InputRow label="Tagline" value={settings.tagline} onChange={v => setSettings({...settings, tagline: v})} />
                    </div>
                </div>
            </div>

            {/* Status Controls */}
            <div className="bg-slate-900/60 border border-white/[0.06] rounded-2xl p-6 sm:p-8">
                <h3 className="text-lg font-bold text-white mb-6">Status Controls</h3>
                <div className="space-y-3">
                    <ToggleRow label="Registration Open" desc="Allow new players to sign up" checked={settings.registrationOpen}
                        onChange={v => setSettings({...settings, registrationOpen: v})} color="blue" />
                    <ToggleRow label="Tournament Live" desc="Show standings & schedule publicly" checked={settings.tournamentStarted}
                        onChange={v => setSettings({...settings, tournamentStarted: v})} color="emerald" />
                    <ToggleRow label="Voting Mode" desc="Lock site for community vote" checked={settings.votingEnabled}
                        onChange={v => setSettings({...settings, votingEnabled: v})} color="purple" />
                </div>
            </div>

            {/* Save Button */}
            <motion.button
                whileHover={!isSaved ? { scale: 1.01 } : {}} whileTap={!isSaved ? { scale: 0.99 } : {}}
                onClick={onSave} disabled={isSaved}
                className={`w-full py-4 rounded-2xl font-bold tracking-wide transition-all text-sm relative overflow-hidden ${isSaved ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-[0_0_30px_rgba(79,70,229,0.3)]'}`}>
                <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSaved ? <><CheckCircle2 className="w-5 h-5" /> Saved!</> : 'Save Settings'}
                </span>
            </motion.button>
        </motion.div>
    );
}
