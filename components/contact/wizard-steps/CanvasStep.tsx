'use client';

import { motion } from 'framer-motion';
import { MapPin, Palette, DollarSign } from 'lucide-react';
import { FormData } from '../BookingWizard';
import { cn } from '@/lib/utils';

interface StepProps {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
}

const VIBES = [
    'Cinematic', 'Candid', 'Moody', 'Minimal', 'Ethereal', 'Symmetry', 'Urban', 'Natural'
];

const INVESTMENT_RANGES = [
    '<$500', '$500 - $1K', '$1K - $3K', '$3K+', 'Not sure'
];

const CanvasStep = ({ formData, updateFormData }: StepProps) => {
    const toggleVibe = (vibe: string) => {
        const newVibes = formData.vibe.includes(vibe)
            ? formData.vibe.filter(v => v !== vibe)
            : [...formData.vibe, vibe];
        updateFormData({ vibe: newVibes });
    };

    return (
        <div className="space-y-7 md:space-y-12">
            <div className="space-y-3 md:space-y-6">
                <div className="flex items-center gap-3 text-orange-500">
                    <MapPin className="h-5 w-5" />
                    <span className="text-[11px] font-black uppercase tracking-[0.22em] md:text-xs md:tracking-[0.3em]">The Location</span>
                </div>
                <motion.div whileHover={{ scale: 1.01 }} className="relative">
                    <input
                        type="text"
                        placeholder="e.g. Joshua Tree, Sunset Blvd, or Studio"
                        value={formData.location}
                        onChange={(e) => updateFormData({ location: e.target.value })}
                        className="min-h-[52px] w-full rounded-2xl border border-brand-100 bg-white px-5 py-4 text-base font-medium text-brand-950 shadow-sm outline-none transition-all placeholder:text-brand-300 focus:border-orange-500/50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-brand-700 md:px-8 md:py-6"
                    />
                </motion.div>
            </div>

            <div className="space-y-3 md:space-y-6">
                <div className="flex items-center gap-3 text-orange-500">
                    <Palette className="h-5 w-5" />
                    <span className="text-[11px] font-black uppercase tracking-[0.22em] md:text-xs md:tracking-[0.3em]">The Vibe</span>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:flex md:flex-wrap md:gap-3">
                    {VIBES.map((vibe, idx) => {
                        const isSelected = formData.vibe.includes(vibe);
                        return (
                            <motion.button
                                key={vibe}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.03 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => toggleVibe(vibe)}
                                className={cn(
                                    "min-h-[46px] rounded-full border px-3 py-3 text-center text-[11px] font-bold uppercase tracking-[0.12em] transition-all duration-300 md:px-8 md:py-4 md:text-xs md:tracking-[0.15em]",
                                    isSelected
                                        ? "bg-orange-600 border-orange-600 text-white shadow-xl shadow-orange-600/20"
                                        : "bg-white border-brand-100 text-brand-500 hover:border-brand-300 hover:text-brand-950 hover:bg-brand-50 dark:bg-white/5 dark:border-white/10 dark:text-brand-400 dark:hover:border-white/20 dark:hover:text-white"
                                )}
                            >
                                {vibe}
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            <div className="space-y-3 md:space-y-6">
                <div className="flex items-center gap-3 text-orange-500">
                    <DollarSign className="h-5 w-5" />
                    <span className="text-[11px] font-black uppercase tracking-[0.22em] md:text-xs md:tracking-[0.3em]">Investment Range</span>
                </div>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                    {INVESTMENT_RANGES.map((range, idx) => {
                        const isSelected = formData.investment === range;
                        return (
                            <motion.button
                                key={range}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                whileHover={!isSelected ? { scale: 1.02, y: -2 } : {}}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => updateFormData({ investment: range })}
                                className={cn(
                                    "min-h-[50px] rounded-2xl border px-3 py-4 text-center text-[11px] font-black uppercase tracking-[0.14em] transition-all duration-300 md:px-6 md:py-5 md:text-xs md:tracking-[0.2em]",
                                    isSelected
                                        ? "bg-brand-950 border-brand-950 text-white shadow-2xl dark:bg-white dark:border-white dark:text-black"
                                        : "bg-white border-brand-100 text-brand-400 hover:border-brand-300 hover:text-brand-950 hover:bg-brand-50 dark:bg-white/5 dark:border-white/10 dark:hover:border-white/20 dark:hover:text-white"
                                )}
                            >
                                {range}
                            </motion.button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CanvasStep;
