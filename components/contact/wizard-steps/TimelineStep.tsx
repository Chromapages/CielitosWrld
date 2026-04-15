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
            <div className="flex bg-stone-100 p-1 rounded-2xl w-fit mx-auto border border-stone-200 dark:bg-white/5 dark:border-white/5">
                <button
                    onClick={() => updateFormData({ isFlexible: false })}
                    className={cn(
                        "px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                        !formData.isFlexible ? "bg-stone-950 text-white shadow-lg dark:bg-white dark:text-black" : "text-stone-500 hover:text-stone-950 dark:hover:text-white"
                    )}
                >
                    Specific Date
                </button>
                <button
                    onClick={() => updateFormData({ isFlexible: true })}
                    className={cn(
                        "px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                        formData.isFlexible ? "bg-stone-950 text-white shadow-lg dark:bg-white dark:text-black" : "text-stone-500 hover:text-stone-950 dark:hover:text-white"
                    )}
                >
                    I&apos;m Flexible
                </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center min-h-[300px]">
                {formData.isFlexible ? (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-sm space-y-4"
                    >
                        <div className="flex items-center gap-3 text-orange-500 mb-6 justify-center">
                            <Sparkles className="w-5 h-5" />
                            <span className="text-xs font-black uppercase tracking-[0.2em]">When are you thinking?</span>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                            {MONTHS.map((month) => (
                                <button
                                    key={month}
                                    onClick={() => updateFormData({ month })}
                                    className={cn(
                                        "w-full p-4 rounded-2xl border transition-all text-sm font-bold uppercase tracking-wide",
                                        formData.month === month
                                            ? "bg-stone-950 border-stone-950 text-white shadow-xl dark:bg-white dark:border-white dark:text-black"
                                            : "bg-white border-stone-200 text-stone-600 hover:border-stone-300 hover:text-stone-950 dark:bg-white/5 dark:border-white/10 dark:text-stone-400 dark:hover:border-white/30 dark:hover:text-white"
                                    )}
                                >
                                    {month}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center text-center space-y-8"
                    >
                        <div className="w-20 h-20 bg-stone-100 rounded-3xl flex items-center justify-center text-orange-500 border border-stone-200 dark:bg-white/5 dark:border-white/10">
                            <CalendarIcon className="w-10 h-10" />
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-2xl font-archivo font-black text-stone-950 dark:text-white uppercase tracking-tight">
                                Select Your Perfect Day
                            </h3>
                            <p className="text-stone-500 text-sm max-w-xs mx-auto leading-relaxed">
                                Pick a primary date you have in mind. We can always refine this later.
                            </p>
                            
                            <input 
                                type="date"
                                className="mt-8 bg-stone-950 text-white dark:bg-white dark:text-black px-8 py-4 rounded-2xl font-black text-lg outline-none cursor-pointer hover:bg-stone-800 dark:hover:bg-stone-100 transition-colors"
                                onChange={(e) => updateFormData({ date: new Date(e.target.value) })}
                                value={formData.date ? formData.date.toISOString().split('T')[0] : ''}
                            />

                            {formData.date && (
                                <motion.p 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-orange-500 text-xs font-black uppercase tracking-widest mt-4"
                                >
                                    {format(formData.date, 'MMMM do, yyyy')} — Solid Choice.
                                </motion.p>
                            )}
                        </div>
                    </motion.div>
                )}
            </div>

            <div className="flex items-center gap-2 justify-center text-stone-600">
                <Clock className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Typical response time: 24-48h</span>
            </div>
        </div>
    );
};

export default TimelineStep;
