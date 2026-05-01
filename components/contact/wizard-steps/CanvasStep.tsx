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
        <div className="space-y-12">
            {/* Location Section */}
            <div className="space-y-6">
                <div className="flex items-center gap-3 text-orange-500">
                    <MapPin className="w-5 h-5" />
                    <span className="text-xs font-black uppercase tracking-[0.3em]">The Location</span>
                </div>
                <motion.div whileHover={{ scale: 1.01 }} className="relative">
                    <input
                        type="text"
                        placeholder="e.g. Joshua Tree, Sunset Blvd, or Studio"
                        value={formData.location}
                        onChange={(e) => updateFormData({ location: e.target.value })}
                        className="w-full bg-white border border-brand-100 rounded-2xl px-8 py-6 text-brand-950 placeholder:text-brand-300 outline-none focus:border-orange-500/50 transition-all font-medium text-base shadow-sm dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder:text-brand-700"
                    />
                </motion.div>
            </div>

            {/* Vibe Selection */}
            <div className="space-y-6">
                <div className="flex items-center gap-3 text-orange-500">
                    <Palette className="w-5 h-5" />
                    <span className="text-xs font-black uppercase tracking-[0.3em]">The Vibe (Select Multiple)</span>
                </div>
                <div className="flex flex-wrap gap-3">
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
                                    "px-8 py-4 rounded-full border text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300",
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

            {/* Investment Range */}
            <div className="space-y-6">
                <div className="flex items-center gap-3 text-orange-500">
                    <DollarSign className="w-5 h-5" />
                    <span className="text-xs font-black uppercase tracking-[0.3em]">Investment Range</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                                    "px-6 py-5 rounded-2xl border text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 text-center",
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
