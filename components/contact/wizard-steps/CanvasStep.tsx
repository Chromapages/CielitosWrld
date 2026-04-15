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
        <div className="space-y-10">
            {/* Location Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-3 text-orange-500">
                    <MapPin className="w-5 h-5" />
                    <span className="text-xs font-black uppercase tracking-[0.2em]">The Location</span>
                </div>
                <input
                    type="text"
                    placeholder="e.g. Joshua Tree, Sunset Blvd, or Studio"
                    value={formData.location}
                    onChange={(e) => updateFormData({ location: e.target.value })}
                    className="w-full bg-white border border-stone-200 rounded-2xl px-6 py-5 text-stone-950 placeholder:text-stone-500 outline-none focus:border-orange-500/50 transition-all font-medium dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder:text-stone-600"
                />
            </div>

            {/* Vibe Selection */}
            <div className="space-y-4">
                <div className="flex items-center gap-3 text-orange-500">
                    <Palette className="w-5 h-5" />
                    <span className="text-xs font-black uppercase tracking-[0.2em]">The Vibe (Select Multiple)</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {VIBES.map((vibe) => {
                        const isSelected = formData.vibe.includes(vibe);
                        return (
                            <button
                                key={vibe}
                                onClick={() => toggleVibe(vibe)}
                                className={cn(
                                    "px-6 py-3 rounded-full border text-xs font-bold uppercase tracking-widest transition-all",
                                    isSelected
                                        ? "bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-600/20"
                                        : "bg-white border-stone-200 text-stone-600 hover:border-stone-300 hover:text-stone-950 dark:bg-white/5 dark:border-white/10 dark:text-stone-400 dark:hover:border-white/20 dark:hover:text-white"
                                )}
                            >
                                {vibe}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Investment Range */}
            <div className="space-y-4">
                <div className="flex items-center gap-3 text-orange-500">
                    <DollarSign className="w-5 h-5" />
                    <span className="text-xs font-black uppercase tracking-[0.2em]">Investment Range</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {INVESTMENT_RANGES.map((range) => {
                        const isSelected = formData.investment === range;
                        return (
                            <button
                                key={range}
                                onClick={() => updateFormData({ investment: range })}
                                className={cn(
                                    "px-4 py-4 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all",
                                    isSelected
                                        ? "bg-stone-950 border-stone-950 text-white shadow-xl dark:bg-white dark:border-white dark:text-black"
                                        : "bg-white border-stone-200 text-stone-500 hover:border-stone-300 hover:text-stone-950 dark:bg-white/5 dark:border-white/10 dark:hover:border-white/20 dark:hover:text-white"
                                )}
                            >
                                {range}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CanvasStep;
