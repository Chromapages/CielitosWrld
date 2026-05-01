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
        <div className="flex flex-col space-y-6 md:h-full md:space-y-10">
            <div className="grid w-full grid-cols-2 rounded-2xl border border-brand-100 bg-brand-50 p-1.5 dark:border-white/10 dark:bg-white/5 md:mx-auto md:w-fit">
                <button
                    onClick={() => updateFormData({ isFlexible: false })}
                    className={cn(
                        "min-h-[44px] rounded-xl px-3 py-3 text-[11px] font-black uppercase tracking-[0.12em] transition-all duration-300 md:px-6 md:text-xs md:tracking-widest",
                        !formData.isFlexible
                            ? "bg-brand-950 text-white shadow-xl dark:bg-white dark:text-black"
                            : "text-brand-400 hover:text-brand-950 dark:hover:text-white"
                    )}
                >
                    Date
                </button>
                <button
                    onClick={() => updateFormData({ isFlexible: true })}
                    className={cn(
                        "min-h-[44px] rounded-xl px-3 py-3 text-[11px] font-black uppercase tracking-[0.12em] transition-all duration-300 md:px-6 md:text-xs md:tracking-widest",
                        formData.isFlexible
                            ? "bg-brand-950 text-white shadow-xl dark:bg-white dark:text-black"
                            : "text-brand-400 hover:text-brand-950 dark:hover:text-white"
                    )}
                >
                    Flexible
                </button>
            </div>

            <div className="flex flex-1 flex-col items-center justify-start md:min-h-[350px] md:justify-center">
                {formData.isFlexible ? (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-sm space-y-5 md:space-y-6"
                    >
                        <div className="mb-2 flex items-center justify-center gap-3 text-orange-500 md:mb-8">
                            <Sparkles className="h-5 w-5" />
                            <span className="text-[11px] font-black uppercase tracking-[0.2em] md:text-xs md:tracking-[0.3em]">When are you thinking?</span>
                        </div>
                        <div className="grid grid-cols-1 gap-3 md:gap-4">
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
                                            "min-h-[50px] w-full rounded-2xl border px-5 py-4 text-left text-xs font-black uppercase tracking-[0.14em] transition-all duration-300 md:p-5 md:px-8 md:text-sm md:tracking-widest",
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
                        className="flex w-full max-w-sm flex-col items-center space-y-5 text-center md:space-y-8"
                    >
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-100 bg-brand-50 text-orange-500 shadow-inner dark:border-white/10 dark:bg-white/5 md:h-24 md:w-24 md:rounded-[2rem]">
                            <CalendarIcon className="h-8 w-8 md:h-10 md:w-10" />
                        </div>
                        <div className="w-full space-y-3 md:space-y-4">
                            <h3 className="font-sans text-2xl font-black uppercase tracking-tight text-brand-950 dark:text-white md:text-3xl">
                                Select Your Day
                            </h3>
                            <p className="mx-auto max-w-xs text-sm leading-relaxed text-brand-500 md:text-[15px]">
                                Pick a primary date you have in mind. We can always refine this later.
                            </p>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="pt-4 md:mt-10 md:pt-0"
                            >
                                <input
                                    type="date"
                                    className="min-h-[52px] w-full cursor-pointer rounded-2xl border-none bg-brand-950 px-6 py-4 text-center text-base font-black text-white outline-none transition-all duration-300 hover:shadow-2xl dark:bg-white dark:text-black md:px-10 md:py-5"
                                    onChange={(e) => updateFormData({ date: new Date(e.target.value) })}
                                    value={formData.date ? formData.date.toISOString().split('T')[0] : ''}
                                />
                            </motion.div>

                            {formData.date && (
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-orange-500 md:mt-6 md:tracking-[0.2em]"
                                >
                                    {format(formData.date, 'MMMM do, yyyy')} - Solid Choice.
                                </motion.p>
                            )}
                        </div>
                    </motion.div>
                )}
            </div>

            <div className="flex items-center justify-center gap-2 border-t border-brand-50 pt-5 text-brand-400 dark:border-brand-900/30 md:pt-8">
                <Clock className="h-4 w-4 shrink-0" />
                <span className="text-center text-[11px] font-bold uppercase tracking-[0.16em] md:text-xs md:tracking-[0.2em]">Typical response time: 24-48h</span>
            </div>
        </div>
    );
};

export default TimelineStep;
