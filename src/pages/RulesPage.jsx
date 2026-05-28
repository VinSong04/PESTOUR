import { BookOpen, Gamepad2, BarChart3, ClipboardList, MonitorSmartphone, WifiOff, Users, Scale } from 'lucide-react';
import { motion } from 'framer-motion';
import { staggerContainer as containerVariants, springItem as itemVariants } from '../constants/animations';

export default function RulesView() {
    const BulletItem = ({ children }) => (
        <li className="flex gap-3.5 items-start">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/60 mt-2 shrink-0"></span>
            <span className="text-slate-300 font-medium text-[15px] leading-relaxed">{children}</span>
        </li>
    );

    return (
        <motion.div
            className="max-w-5xl mx-auto space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >

            {/* Header */}
            <motion.div variants={itemVariants} className="text-center space-y-5 mb-12 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-500/6 blur-[80px] rounded-full pointer-events-none"></div>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center justify-center p-4 rounded-2xl bg-purple-500/8 border border-purple-500/10 text-purple-400 mb-2 relative z-10"
                >
                    <BookOpen className="w-10 h-10" />
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white relative z-10" style={{ fontFamily: '"Suwannaphum", "Outfit", sans-serif', lineHeight: '1.4' }}>
                    ច្បាប់ និងលក្ខខណ្ឌផ្លូវការ
                </h2>
                <p className="text-slate-500 text-base sm:text-lg max-w-2xl mx-auto font-medium relative z-10" style={{ fontFamily: '"Suwannaphum", "Outfit", sans-serif' }}>
                    ច្បាប់ និងលក្ខខណ្ឌផ្លូវការនៃការប្រកួត PALLET PES TOUR
                </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-5" style={{ fontFamily: '"Suwannaphum", "Outfit", sans-serif' }}>
                {/* 1. REGISTRATION & EVENT LOGISTICS */}
                <motion.div variants={itemVariants} className="glass-card-hover p-7 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-blue-500/10 transition-all duration-700"></div>
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3 relative z-10">
                        <div className="p-2 rounded-xl bg-blue-500/8 text-blue-400 border border-blue-500/10">
                            <ClipboardList className="w-5 h-5" />
                        </div>
                        ១. ការចុះឈ្មោះ និងការរៀបចំ
                    </h3>
                    <div className="space-y-4 relative z-10">
                        <ul className="space-y-3">
                            <BulletItem><strong className="text-white">ការចុះឈ្មោះជាសាធារណៈ (Open Registration):</strong> ការចុះឈ្មោះបើកទូលាយសម្រាប់កីឡាករទាំងអស់រហូតដល់ថ្ងៃផុតកំណត់។ មិនមានការកំណត់ចំនួនអ្នកចូលរួមឡើយ។</BulletItem>
                            <BulletItem><strong className="text-white">ថ្ងៃបិទឈ្មោះ (Deadline):</strong> ការចុះឈ្មោះនឹងត្រូវបិទយ៉ាងតឹងរ៉ឹងតាមកាលបរិច្ឆេទ និងម៉ោងដែលបានកំណត់។ រាល់ការចុះឈ្មោះយឺតយ៉ាវនឹងមិនត្រូវបានទទួលយកជាដាច់ខាត។</BulletItem>
                            <BulletItem><strong className="text-white">រចនាសម្ព័ន្ធដែលអាចបត់បែនបាន (Dynamic Structure):</strong> គណៈកម្មការរក្សាសិទ្ធិក្នុងការកែប្រែចំនួនអ្នកក្នុងពូល (ឧ. ពូល ៤ ឬ ៥នាក់) និងចំនួនកូតាអ្នកឡើងទៅវគ្គបន្ត ផ្អែកលើចំនួនកីឡាករដែលបានចុះឈ្មោះជាក់លាក់នៅពេលបិទបញ្ជី។ ចំពោះវគ្គចាញ់ធ្លាក់ (Knockout) នឹងត្រូវរៀបចំជាតារាងសម្រាប់កីឡាករ ៨នាក់ ឬ ៤នាក់ជានិច្ច ដើម្បីងាយស្រួលប្រកួត។</BulletItem>
                        </ul>
                    </div>
                </motion.div>

                {/* 2. TOURNAMENT FORMAT & POINTS */}
                <motion.div variants={itemVariants} className="glass-card-hover p-7 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-emerald-500/10 transition-all duration-700"></div>

                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3 relative z-10">
                        <div className="p-2 rounded-xl bg-emerald-500/8 text-emerald-400 border border-emerald-500/10">
                            <BarChart3 className="w-5 h-5" />
                        </div>
                        ២. ទម្រង់ប្រកួត និងការគិតពិន្ទុ
                    </h3>
                    <div className="space-y-4 relative z-10">
                        <p className="font-medium text-slate-200 text-[15px] leading-relaxed">រាល់ការប្រកួតគឺលេងជាទម្រង់ <strong className="text-white bg-white/[0.06] px-2 py-0.5 rounded-md border border-white/[0.06]">Best-of-3 (Bo3)</strong>។ អ្នកដែលឈ្នះ ២ប្រកួតមុន គឺជាអ្នកឈ្នះស៊េរីនោះ។</p>
                        <p className="font-medium text-slate-400 text-sm leading-relaxed"><strong>ច្បាប់ហ្គេមទី 3:</strong> ប្រសិនបើកីឡាករណាម្នាក់ឈ្នះ ២ប្រកួតដំបូងជាប់គ្នា (២-០) ការប្រកួតនឹងត្រូវបញ្ចប់ភ្លាមៗ។ ប្រកួតទី៣ (Game 3) នឹងត្រូវលេងលុះត្រាតែលទ្ធផលស្មើគ្នា ១-១ ប៉ុណ្ណោះ។</p>
                        
                        <div className="bg-white/[0.02] rounded-xl border border-white/[0.04] p-1 mt-4">
                            <ul className="divide-y divide-white/[0.03]">
                                <li className="flex justify-between items-center p-3 hover:bg-white/[0.02] rounded-lg transition-colors">
                                    <span className="text-slate-200 font-medium text-sm">ឈ្នះ ២-០</span>
                                    <span className="text-emerald-400 font-outfit font-bold">+៣ ពិន្ទុ (PTS)</span>
                                </li>
                                <li className="flex justify-between items-center p-3 hover:bg-white/[0.02] rounded-lg transition-colors">
                                    <span className="text-slate-200 font-medium text-sm">ឈ្នះ ២-១</span>
                                    <span className="text-emerald-400 font-outfit font-bold">+២ ពិន្ទុ (PTS)</span>
                                </li>
                                <li className="flex justify-between items-center p-3 bg-white/[0.01] rounded-lg">
                                    <span className="text-slate-400 font-medium text-sm">ចាញ់ ១-២</span>
                                    <span className="text-amber-400 font-outfit font-bold">+១ ពិន្ទុ (PTS)</span>
                                </li>
                                <li className="flex justify-between items-center p-3 opacity-60">
                                    <span className="text-slate-500 font-medium text-sm">ចាញ់ ០-២</span>
                                    <span className="text-slate-600 font-outfit font-bold">០ ពិន្ទុ (PTS)</span>
                                </li>
                            </ul>
                        </div>

                        <div className="pt-2">
                            <p className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2">ការកាត់សេចក្តីពេលពិន្ទុស្មើគ្នា (Tiebreaker Order):</p>
                            <ol className="list-decimal list-inside text-sm text-slate-300 space-y-1 ml-1">
                                <li>ពិន្ទុសរុប (PTS)</li>
                                <li>ផលសងគ្រាប់បាល់សរុប (GD)</li>
                                <li>គ្រាប់បាល់ស៊ុតបញ្ចូលទីបានសរុប (GF)</li>
                                <li>ប្រវត្តិជួបគ្នាផ្ទាល់ (Head-to-Head)</li>
                                <li>របូតគ្រាប់បាល់តិចជាងគេ (GA)</li>
                            </ol>
                        </div>
                    </div>
                </motion.div>

                {/* 3. IN-GAME SETTINGS & TEAM SELECTION */}
                <motion.div variants={itemVariants} className="glass-card-hover p-7 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-amber-500/10 transition-all duration-700"></div>

                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3 relative z-10">
                        <div className="p-2 rounded-xl bg-amber-500/8 text-amber-400 border border-amber-500/10">
                            <Gamepad2 className="w-5 h-5" />
                        </div>
                        ៣. ការកំណត់ក្នុងហ្គេម (Settings)
                    </h3>
                    <div className="space-y-4 relative z-10">
                        <ul className="space-y-3">
                            <BulletItem>រយៈពេលប្រកួត: <strong className="text-white">១២ នាទី</strong></BulletItem>
                            <BulletItem>ម៉ោងបន្ថែម និងប៉េណាល់ទី: <strong className="text-white">បើក (Enabled)</strong></BulletItem>
                            <BulletItem>ប្តូរកីឡាករ: <strong className="text-white">៥ នាក់</strong> (ប្តូរបាន ៣ដង + ១ដងពេលថែមម៉ោង)</BulletItem>
                            <BulletItem>ទម្រង់កីឡាករ (Condition): <strong className="text-white">ល្អឥតខ្ចោះ (Excellent)</strong></BulletItem>
                            <BulletItem><strong className="text-white">ការជ្រើសរើសក្រុម:</strong> ត្រូវលេងក្នុងទម្រង់ Authentic Teams។ កីឡាករត្រូវប្រើក្រុមតែមួយគត់តាំងពីផ្តើមរហូតដល់ចប់ការប្រកួត។</BulletItem>
                            <BulletItem><strong className="text-white">ការលេងក្រុមដូចគ្នា (Mirror Matches):</strong> អនុញ្ញាតឲ្យលេងក្រុមដូចគ្នាបាន។ ប៉ុន្តែកីឡាករ &quot;ក្រុមភ្ញៀវ (Away)&quot; ត្រូវមានភារកិច្ចប្តូរឯកសណ្ឋាន (Kit) ឲ្យខុសពណ៌គ្នា ដើម្បីកុំឲ្យភាន់ច្រឡំពេលប្រកួត។</BulletItem>
                        </ul>
                    </div>
                </motion.div>

                {/* 4. PLATFORM & MATCH SETUP */}
                <motion.div variants={itemVariants} className="glass-card-hover p-7 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-purple-500/10 transition-all duration-700"></div>

                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3 relative z-10">
                        <div className="p-2 rounded-xl bg-purple-500/8 text-purple-400 border border-purple-500/10">
                            <MonitorSmartphone className="w-5 h-5" />
                        </div>
                        ៤. ឧបករណ៍ និងការរៀបចំ (Setup)
                    </h3>
                    <div className="space-y-4 relative z-10">
                        <ul className="space-y-3">
                            <BulletItem><strong className="text-white">ឧបករណ៍ដែលអនុញ្ញាត:</strong> កីឡាករត្រូវតែប្រកួតដោយប្រើប្រាស់ទូរស័ព្ទ ឬ Tablet (iOS / Android)។</BulletItem>
                            <BulletItem><strong className="text-rose-400">ហាមឃាត់កម្មវិធីជំនួស:</strong> ការលេងនៅលើកុំព្យូទ័រ (ប្រើ BlueStacks, LDPlayer ឬ Keyboard/Mouse) ត្រូវបានហាមឃាត់យ៉ាងតឹងរ៉ឹង។ បើរកឃើញ នឹងត្រូវបិទសិទ្ធិប្រកួតជារៀងរហូត។</BulletItem>
                            <BulletItem><strong className="text-white">ការបង្កើតបន្ទប់ (Room Hosting):</strong> កីឡាករ &quot;ម្ចាស់ផ្ទះ (Home)&quot; (ឈ្មោះនៅខាងលើ ឬខាងឆ្វេងក្នុងតារាងប្រកួត) មានភារកិច្ចបង្កើត Match Room និងប្រាប់លេខកូដបន្ទប់ (Room ID) ទៅកាន់គូប្រកួត។</BulletItem>
                            <BulletItem><strong className="text-white">បញ្ហាអ៊ីនធឺណិត និងថ្ម:</strong> កីឡាករត្រូវធានាលើល្បឿនអ៊ីនធឺណិត និងថ្មទូរស័ព្ទខ្លួនឯង។ ការប្រកួតនឹងមិនត្រូវផ្អាក ឬលេងឡើងវិញទេ ក្នុងករណីមានបញ្ហា Ping លោត, Lag ឬរលត់ទូរស័ព្ទ។</BulletItem>
                        </ul>
                    </div>
                </motion.div>

                {/* 5. DISCONNECTIONS & TECHNICAL ISSUES */}
                <motion.div variants={itemVariants} className="glass-card-hover p-7 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-rose-500/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-rose-500/10 transition-all duration-700"></div>

                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3 relative z-10">
                        <div className="p-2 rounded-xl bg-rose-500/8 text-rose-400 border border-rose-500/10">
                            <WifiOff className="w-5 h-5" />
                        </div>
                        ៥. ការដាច់អ៊ីនធឺណិត (Disconnects)
                    </h3>
                    <div className="space-y-4 relative z-10">
                        <ul className="space-y-3">
                            <BulletItem><strong className="text-white">ដាច់ពេលកំពុងលេង:</strong> បើដាច់ការតភ្ជាប់ ត្រូវបង្កើតបន្ទប់លេងឡើងវិញភ្លាមៗ។ ការប្រកួតដែលបង្កើតថ្មីនេះ នឹងលេងត្រឹមតែ <strong className="text-amber-400">នាទីដែលនៅសល់</strong> ប៉ុណ្ណោះ។ (ឧទាហរណ៍៖ បើដាច់នៅនាទីទី ៧០ ត្រូវលេងប្រកួតថ្មីត្រឹមនាទីទី ២០ រួចចាំចុចបោះបង់ហ្គេម / Quit)។</BulletItem>
                            <BulletItem><strong className="text-white">ការរក្សាលទ្ធផល:</strong> លទ្ធផលគ្រាប់បាល់ និងកាតក្រហមនៅពេលដាច់ នឹងត្រូវរាប់បញ្ចូលបន្តក្នុងការប្រកួតដែលបង្កើតថ្មីនេះ។</BulletItem>
                            <BulletItem><strong className="text-white">ការចុចចេញពីហ្គេមដោយចេតនា:</strong> ការក្លែងបន្លំចុចចេញពីហ្គេម ដើម្បីគេចវេសមិនឲ្យគេស៊ុតចូល នឹងត្រូវពិន័យឲ្យចាញ់ដោយស្វ័យប្រវត្តិក្នុងលទ្ធផល ០-៣ សម្រាប់ហ្គេមនោះ។</BulletItem>
                        </ul>
                    </div>
                </motion.div>

                {/* 6. CONDUCT, REPLACEMENTS & FAIR PLAY */}
                <motion.div variants={itemVariants} className="glass-card-hover p-7 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-cyan-500/10 transition-all duration-700"></div>

                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3 relative z-10">
                        <div className="p-2 rounded-xl bg-cyan-500/8 text-cyan-400 border border-cyan-500/10">
                            <Users className="w-5 h-5" />
                        </div>
                        ៦. បទបញ្ជាផ្ទៃក្នុង & យុត្តិធម៌ (Fair Play)
                    </h3>
                    <div className="space-y-4 relative z-10">
                        <ul className="space-y-3">
                            <BulletItem><strong className="text-white">ច្បាប់ម៉ោង (No-Show Rule):</strong> អនុញ្ញាតឲ្យយឺតយ៉ាងយូរបំផុតត្រឹម <strong className="text-rose-400">១៥ នាទី</strong> ប៉ុណ្ណោះ។ ការខកខានមិនបានចូលបន្ទប់ប្រកួតតាមម៉ោងកំណត់ នឹងត្រូវចាត់ទុកថាបោះបង់ការប្រកួត (ចាញ់ ០-២ ស៊េរី)។</BulletItem>
                            <BulletItem><strong className="text-white">ហាមប្តូរមនុស្សលេង (No Stand-ins):</strong> ហាមដាច់ខាតការប្តូរអ្នកលេងកណ្តាលទី។ បើកីឡាករមិនអាចបន្តការលេងបានរហូតដល់ចប់ ការប្រកួតដែលនៅសល់នឹងត្រូវកាត់ឲ្យចាញ់ (Forfeit)។</BulletItem>
                            <BulletItem><strong className="text-white">ការលេងជំនួស (Account Sharing):</strong> អ្នកដែលបានចុះឈ្មោះ ត្រូវតែជាអ្នកលេងផ្ទាល់។ ការពឹងអ្នកផ្សេងឲ្យមកលេងជំនួសក្នុងអំឡុងពេលប្រកួត ដើម្បីយកឈ្នះគូប្រកួត នឹងត្រូវដកសិទ្ធិភ្លាមៗ។</BulletItem>
                            <BulletItem><strong className="text-white">ភស្តុតាងប្រកួត (Match Proof):</strong> អ្នកឈ្នះមានភារកិច្ចថតអេក្រង់ (Screenshot) លទ្ធផលប្រកួត និងផ្ញើជូនគណៈកម្មការភ្លាមៗ បន្ទាប់ពីការប្រកួតស៊េរីនោះបានបញ្ចប់។</BulletItem>
                            <BulletItem><strong className="text-white">ការចុចផ្អាកហ្គេម (Pause Etiquette):</strong> កីឡាករអាចផ្អាកហ្គេម (Pause) បានលុះត្រាតែបាល់ដាច់ចេញក្រៅទីលានប៉ុណ្ណោះ។ ការ Pause នៅពេលគូប្រកួតកំពុងវាយសម្រុក នឹងត្រូវពិន័យឲ្យចាញ់ភ្លាមៗសម្រាប់ហ្គេមនោះ។</BulletItem>
                            <BulletItem><strong className="text-white">ហាមលេងស៊ីម៉ោង (Anti-Griefing):</strong> ការលេងពន្យារពេលហួសហេតុ (ឧ. ការប៉ះបាល់ចុះឡើងរវាងអ្នកចាំទី និងខ្សែការពារដោយចេតនាស៊ីម៉ោង) គឺខុសច្បាប់។ បើមានវីដេអូភស្តុតាង នឹងត្រូវទទួលការព្រមាន ឬដកសិទ្ធិប្រកួត។</BulletItem>
                        </ul>
                    </div>
                </motion.div>

                {/* 7. ADMINISTRATOR OVERRIDE */}
                <motion.div variants={itemVariants} className="md:col-span-2 glass-card-hover p-7 sm:p-10 rounded-3xl relative overflow-hidden group mt-2">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-slate-500/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-slate-500/10 transition-all duration-700"></div>

                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3 relative z-10">
                        <div className="p-2.5 rounded-xl bg-slate-500/8 text-slate-400 border border-slate-500/10">
                            <Scale className="w-6 h-6" />
                        </div>
                        ៧. សិទ្ធិសម្រេចរបស់គណៈកម្មការ
                    </h3>

                    <div className="relative z-10">
                        <p className="font-medium text-slate-300 text-[15px] leading-relaxed">
                            <strong className="text-white">សិទ្ធិសម្រេចចុងក្រោយ (Administrator Override):</strong> ច្បាប់នេះមិនអាចសរសេរគ្របដណ្តប់គ្រប់រឿងហេតុទាំងអស់បានទេ។ គណៈកម្មការរៀបចំការប្រកួតរក្សាសិទ្ធិក្នុងការកាត់សេចក្តីចុងក្រោយលើរាល់ស្ថានភាព វិវាទ ឬចន្លោះប្រហោងណាដែលមិនមានចែងក្នុងឯកសារនេះ ដើម្បីធានាបាននូវភាពយុត្តិធម៌ក្នុងការប្រកួត។
                        </p>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
