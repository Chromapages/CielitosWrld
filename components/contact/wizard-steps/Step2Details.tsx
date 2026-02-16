'use client';

import { motion } from 'framer-motion';
import { FormData } from '../BookingWizard';
import { Calendar as CalendarIcon, MapPin, DollarSign } from 'lucide-react';

interface Step2Props {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
}

export default function Step2Details({ formData, updateFormData }: Step2Props) {
    return (
        <div className="space-y-8">
            <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
            >
                <label htmlFor="date" className="block text-sm font-bold text-stone-500 dark:text-stone-400 mb-3 uppercase tracking-wider">
                    Preferred Date (Optional)
                </label>
                <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">
                        <CalendarIcon className="w-5 h-5" />
                    </div>
                    <input
                        id="date"
                        type="date"
                        className="w-full pl-12 pr-4 py-4 bg-white dark:bg-stone-800 border-2 border-stone-200 dark:border-stone-700 rounded-xl focus:border-orange-500 focus:ring-0 outline-none transition-all font-medium text-stone-800 dark:text-stone-100"
                        onChange={(e) => updateFormData({ date: e.target.valueAsDate || undefined })}
                    />
                </div>
            </motion.div>

            <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <label htmlFor="location" className="block text-sm font-bold text-stone-500 dark:text-stone-400 mb-3 uppercase tracking-wider">
                    Location / Venue
                </label>
                <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">
                        <MapPin className="w-5 h-5" />
                    </div>
                    <input
                        id="location"
                        type="text"
                        placeholder="e.g. Joshua Tree, Downtown LA..."
                        value={formData.location || ''}
                        onChange={(e) => updateFormData({ location: e.target.value })}
                        className="w-full pl-12 pr-4 py-4 bg-white dark:bg-stone-800 border-2 border-stone-200 dark:border-stone-700 rounded-xl focus:border-orange-500 focus:ring-0 outline-none transition-all font-medium text-stone-800 dark:text-stone-100 placeholder-stone-400"
                    />
                </div>
            </motion.div>

            <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <label className="block text-sm font-bold text-stone-500 dark:text-stone-400 mb-3 uppercase tracking-wider">
                    Estimated Budget
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['<$500', '$500-1k', '$1k-3k', '$3k+'].map((budget) => (
                        <button
                            key={budget}
                            onClick={() => updateFormData({ budget })}
                            className={`py-3 px-4 rounded-xl border-2 font-bold text-sm transition-all ${formData.budget === budget
                                    ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
                                    : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-stone-300'
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
