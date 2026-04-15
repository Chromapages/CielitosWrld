'use client';

import { motion } from 'framer-motion';
import { FormData } from '../BookingWizard';

interface Step3Props {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
}

export default function Step3Final({ formData, updateFormData }: Step3Props) {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    <label htmlFor="name" className="block text-[10px] font-black text-stone-500 dark:text-stone-400 mb-3 uppercase tracking-[0.2em]">
                        Your Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        required
                        placeholder="Jane Doe"
                        value={formData.name}
                        onChange={(e) => updateFormData({ name: e.target.value })}
                        className="w-full px-5 py-4 bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 rounded-2xl focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/5 outline-none transition-all font-bold text-stone-900 dark:text-white placeholder-stone-400"
                    />
                </motion.div>

                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <label htmlFor="email" className="block text-[10px] font-black text-stone-500 dark:text-stone-400 mb-3 uppercase tracking-[0.2em]">
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        required
                        placeholder="jane@example.com"
                        value={formData.email}
                        onChange={(e) => updateFormData({ email: e.target.value })}
                        className="w-full px-5 py-4 bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 rounded-2xl focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/5 outline-none transition-all font-bold text-stone-900 dark:text-white placeholder-stone-400"
                    />
                </motion.div>
            </div>

            <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <label htmlFor="message" className="block text-[10px] font-black text-stone-500 dark:text-stone-400 mb-3 uppercase tracking-[0.2em]">
                    Vibe & Vision
                </label>
                <textarea
                    id="message"
                    rows={4}
                    placeholder="Tell me a bit more about what you're imagining..."
                    value={formData.message}
                    onChange={(e) => updateFormData({ message: e.target.value })}
                    className="w-full px-5 py-4 bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 rounded-2xl focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/5 outline-none transition-all font-medium text-stone-800 dark:text-stone-200 placeholder-stone-400 resize-none"
                />
            </motion.div>
        </div>
    );
}
