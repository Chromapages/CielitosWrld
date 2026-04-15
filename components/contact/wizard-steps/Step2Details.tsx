'use client';

import { motion } from 'framer-motion';
import { FormData } from '../BookingWizard';
import { Calendar as CalendarIcon, MapPin } from 'lucide-react';

interface Step2Props {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
}

export default function Step2Details({ formData, updateFormData }: Step2Props) {
    return (
        <div className="space-y-10">
            <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
            >
                <div className="flex items-center justify-between mb-4">
                    <label htmlFor="date" className="text-[10px] font-black text-stone-500 dark:text-stone-400 uppercase tracking-[0.2em]">
                        Preferred Timeline
                    </label>
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Optional</span>
                </div>
                <div className="relative group">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500 group-focus-within:text-orange-500 transition-colors">
                        <CalendarIcon className="w-4 h-4" />
                    </div>
                    <input
                        id="date"
                        type="date"
                        className="w-full pl-14 pr-6 py-5 bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 rounded-2xl focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/5 outline-none transition-all font-bold text-stone-900 dark:text-white"
                        onChange={(e) => updateFormData({ date: e.target.valueAsDate || undefined })}
                    />
                </div>
            </motion.div>

            <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <label htmlFor="location" className="block text-[10px] font-black text-stone-500 dark:text-stone-400 mb-4 uppercase tracking-[0.2em]">
                    Vibe Location
                </label>
                <div className="relative group">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500 group-focus-within:text-orange-500 transition-colors">
                        <MapPin className="w-4 h-4" />
                    </div>
                    <input
                        id="location"
                        type="text"
                        placeholder="e.g. Joshua Tree, Sunset Blvd, or Studio"
                        value={formData.location || ''}
                        onChange={(e) => updateFormData({ location: e.target.value })}
                        className="w-full pl-14 pr-6 py-5 bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 rounded-2xl focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/5 outline-none transition-all font-bold text-stone-900 dark:text-white placeholder-stone-400"
                    />
                </div>
            </motion.div>

            <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <label className="block text-[10px] font-black text-stone-500 dark:text-stone-400 mb-4 uppercase tracking-[0.2em]">
                    Investment Range
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['<$500', '$500-1k', '$1k-3k', '$3k+'].map((budget) => (
                        <button
                            key={budget}
                            type="button"
                            onClick={() => updateFormData({ budget })}
                            className={`py-4 px-2 rounded-xl border-2 font-black text-[10px] uppercase tracking-widest transition-all ${
                                formData.budget === budget
                                    ? 'border-orange-500 bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                                    : 'border-stone-100 dark:border-stone-800 text-stone-500 hover:border-orange-500/30'
                            }`}
                        >
                            {budget}
                        </button>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
