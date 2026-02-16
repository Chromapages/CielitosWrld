'use client';

import { motion } from 'framer-motion';
import { FormData } from '../BookingWizard';

interface Step3Props {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
}

export default function Step3Final({ formData, updateFormData }: Step3Props) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    <label htmlFor="name" className="block text-sm font-bold text-stone-500 dark:text-stone-400 mb-2 uppercase tracking-wider">
                        Your Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        required
                        placeholder="Jane Doe"
                        value={formData.name}
                        onChange={(e) => updateFormData({ name: e.target.value })}
                        className="w-full px-4 py-4 bg-white dark:bg-stone-800 border-2 border-stone-200 dark:border-stone-700 rounded-xl focus:border-orange-500 focus:ring-0 outline-none transition-all font-bold text-lg text-stone-900 dark:text-white placeholder-stone-400"
                    />
                </motion.div>

                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <label htmlFor="email" className="block text-sm font-bold text-stone-500 dark:text-stone-400 mb-2 uppercase tracking-wider">
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        required
                        placeholder="jane@example.com"
                        value={formData.email}
                        onChange={(e) => updateFormData({ email: e.target.value })}
                        className="w-full px-4 py-4 bg-white dark:bg-stone-800 border-2 border-stone-200 dark:border-stone-700 rounded-xl focus:border-orange-500 focus:ring-0 outline-none transition-all font-bold text-lg text-stone-900 dark:text-white placeholder-stone-400"
                    />
                </motion.div>
            </div>

            <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <label htmlFor="message" className="block text-sm font-bold text-stone-500 dark:text-stone-400 mb-2 uppercase tracking-wider">
                    Your Message
                </label>
                <textarea
                    id="message"
                    rows={5}
                    placeholder="Tell me a bit more about your vision..."
                    value={formData.message}
                    onChange={(e) => updateFormData({ message: e.target.value })}
                    className="w-full px-4 py-4 bg-white dark:bg-stone-800 border-2 border-stone-200 dark:border-stone-700 rounded-xl focus:border-orange-500 focus:ring-0 outline-none transition-all font-medium text-stone-800 dark:text-stone-200 placeholder-stone-400 resize-none"
                />
            </motion.div>
        </div>
    );
}
