'use client';

import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, Sparkles } from 'lucide-react';
import { FormData } from '../BookingWizard';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface StepProps {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
}

const MONTHS = [
    'Soon (Next 30 Days)',
    'Next 3 Months',
    'Next 6 Months',
    'Later this year',
    'Not sure yet'
];

const TimelineStep = ({ formData, updateFormData }: StepProps) => {
    return (
        <div className="flex flex-col h-full space-y-10">
            {/* Toggle Switch */}
            <div className="flex bg-brand-50 p-1.5 rounded-2xl w-fit mx-auto border border-brand-100 dark:bg-white/5 dark:border-white/10">
                <button
                    onClick={() => updateFormData({ isFlexible: false })}
                    className={cn(
                        "px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300",
                        !formData.isFlexible 
                            ? "bg-brand-950 text-white shadow-xl dark:bg-white dark:text-black" 
                            : "text-brand-400 hover:text-brand-950 dark:hover:text-white"
                    )}
                >
                    Specific Date
                </button>
                <button
                    onClick={() => updateFormData({ isFlexible: true })}
                    className={cn(
                        "px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300",
                        formData.isFlexible 
                            ? "bg-brand-950 text-white shadow-xl dark:bg-white dark:text-black" 
                            : "text-brand-400 hover:text-brand-950 dark:hover:text-white"
                    )}
                >
                    I&apos;m Flexible
                </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center min-h-[350px]">
                {formData.isFlexible ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-sm space-y-6"
                    >
                        <div className="flex items-center gap-3 text-orange-500 mb-8 justify-center">
                            <Sparkles className="w-5 h-5" />
                            <span className="text-xs font-black uppercase tracking-[0.3em]">When are you thinking?</span>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {MONTHS.map((month, idx) => {
                                const isSelected = formData.month === month;
                                return (
                                    <motion.button
                                        key={month}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        whileHover={!isSelected ? { scale: 1.02, x: 4 } : {}}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => updateFormData({ month })}
                                        className={cn(
                                            "w-full p-5 rounded-2xl border transition-all duration-300 text-sm font-bold uppercase tracking-widest text-left px-8",
                                            isSelected
                                                ? "bg-brand-950 border-brand-950 text-white shadow-2xl dark:bg-white dark:border-white dark:text-black"
                                                : "bg-white border-brand-100 text-brand-500 hover:border-brand-300 hover:text-brand-950 hover:bg-brand-50/50 dark:bg-white/5 dark:border-white/10 dark:text-brand-400 dark:hover:border-white/30 dark:hover:text-white"
                                        )}
                                    >
                                        {month}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center text-center space-y-8"
                    >
                        <div className="w-24 h-24 bg-brand-50 rounded-[2rem] flex items-center justify-center text-orange-500 border border-brand-100 dark:bg-white/5 dark:border-white/10 shadow-inner">
                            <CalendarIcon className="w-10 h-10" />
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-3xl font-sans font-bold text-brand-950 dark:text-white uppercase tracking-tighter">
                                Select Your Day
                            </h3>
                            <p className="text-brand-500 text-[15px] max-w-xs mx-auto leading-relaxed">
                                Pick a primary date you have in mind. We can always refine this later.
                            </p>
                            
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="mt-10"
                            >
                                <input
                                    type="date"
                                    className="bg-brand-950 text-white dark:bg-white dark:text-black px-10 py-5 rounded-2xl font-black text-base outline-none cursor-pointer hover:shadow-2xl transition-all duration-300 border-none"
                                    onChange={(e) => updateFormData({ date: new Date(e.target.value) })}
                                    value={formData.date ? formData.date.toISOString().split('T')[0] : ''}
                                />
                            </motion.div>

                            {formData.date && (
                                <motion.p 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-orange-500 text-xs font-black uppercase tracking-[0.2em] mt-6"
                                >
                                    {format(formData.date, 'MMMM do, yyyy')} — Solid Choice.
                                </motion.p>
                            )}
                        </div>
                    </motion.div>
                )}
            </div>

            <div className="flex items-center gap-2 justify-center text-brand-400 border-t border-brand-50 pt-8 dark:border-brand-900/30">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">Typical response time: 24-48h</span>
            </div>
        </div>
    );
};

export default TimelineStep;
