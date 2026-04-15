'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check, Loader2, PartyPopper, Sparkles } from 'lucide-react';
import VisionStep from './wizard-steps/VisionStep';
import TimelineStep from './wizard-steps/TimelineStep';
import CanvasStep from './wizard-steps/CanvasStep';
import ConnectionStep from './wizard-steps/ConnectionStep';

interface BookingWizardProps {
    onClose: () => void;
    isEmbedded?: boolean;
}

export type FormData = {
    services: string[];
    date?: Date;
    month?: string;
    isFlexible: boolean;
    location: string;
    vibe: string[];
    investment: string;
    name: string;
    email: string;
    phone: string;
    cityState: string;
    social?: string;
    message: string;
};

export default function BookingWizard({ onClose, isEmbedded = false }: BookingWizardProps) {
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(0);
    const [formData, setFormData] = useState<FormData>({
        services: [],
        isFlexible: false,
        location: '',
        vibe: [],
        investment: '',
        name: '',
        email: '',
        phone: '',
        cityState: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const targetEmail = process.env.NEXT_PUBLIC_FORM_SUBMIT_EMAIL || 'Abajo.Del.Cieloo@gmail.com';
    const totalSteps = 4;

    const handleNext = () => {
        if (step < totalSteps) {
            setDirection(1);
            setStep(step + 1);
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setDirection(-1);
            setStep(step - 1);
        }
    };

    const updateFormData = (data: Partial<FormData>) => {
        setFormData(prev => ({ ...prev, ...data }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    _subject: `New Creative Inquiry from ${formData.name}`,
                    _template: 'table',
                    _honey: '', 
                    services: formData.services.join(', '),
                    vibe: formData.vibe.join(', '),
                    dateText: formData.isFlexible ? `Flexible (${formData.month})` : formData.date?.toLocaleDateString()
                })
            });

            if (!response.ok) throw new Error('Submission failed');

            setIsSuccess(true);
        } catch (err) {
            console.error('Submission error:', err);
            setError('Something went wrong. Please try again or reach out directly.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0,
            filter: 'blur(10px)',
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            filter: 'blur(0px)',
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 50 : -50,
            opacity: 0,
            filter: 'blur(10px)',
        }),
    };

    const shellClassName = isEmbedded
        ? 'rounded-[2rem]'
        : 'rounded-[2.5rem]';

    return (
        <div className={`flex h-full min-h-0 flex-col bg-white/85 text-stone-950 backdrop-blur-2xl border border-stone-200/80 dark:bg-black/40 dark:text-white dark:border-white/5 overflow-hidden shadow-2xl ${shellClassName}`}>
            {/* Ultra-minimal Progress Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-stone-200/80 dark:bg-white/5 overflow-hidden z-20">
                <motion.div
                    className="h-full bg-orange-600 shadow-[0_0_10px_rgba(234,88,12,0.5)]"
                    animate={{ width: `${(step / totalSteps) * 100}%` }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                />
            </div>

            {/* Header Content */}
            <div className="relative shrink-0 pt-10 px-6 md:px-10 lg:px-12 pb-2">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] mb-1">
                            Phase {step} of {totalSteps}
                        </span>
                        <h2 className="text-xl md:text-2xl font-archivo font-black text-stone-950 dark:text-white uppercase tracking-tighter">
                            {step === 1 && "The Vision"}
                            {step === 2 && "The Timeline"}
                            {step === 3 && "The Canvas"}
                            {step === 4 && "The Connection"}
                        </h2>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="relative flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-6 md:px-10 lg:px-12 pb-4 md:pb-6">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={step}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ type: "spring", duration: 0.6, bounce: 0 }}
                        className="w-full"
                    >
                        {isSuccess ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col items-center justify-center h-full text-center py-12"
                            >
                                <div className="w-24 h-24 bg-orange-600/20 rounded-full flex items-center justify-center mb-10 relative">
                                    <Sparkles className="w-12 h-12 text-orange-500 animate-pulse" />
                                    <motion.div 
                                        className="absolute inset-0 rounded-full border-2 border-orange-500/30"
                                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                </div>
                                <h3 className="text-3xl md:text-5xl font-archivo font-black text-stone-950 dark:text-white mb-6 tracking-tighter uppercase">
                                    Vibe Sent.
                                </h3>
                                <p className="text-xl text-stone-600 dark:text-stone-400 max-w-sm mb-12 leading-relaxed">
                                    I&apos;ll dive into your vision and reach back within 24-48 hours. Let&apos;s make this real.
                                </p>
                                <button
                                    onClick={onClose}
                                    className="px-10 py-5 bg-stone-950 text-white dark:bg-white dark:text-black rounded-full font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl dark:shadow-white/10"
                                >
                                    Close Story
                                </button>
                            </motion.div>
                        ) : (
                            <div className="pt-6 pb-2"> 
                                {step === 1 && <VisionStep formData={formData} updateFormData={updateFormData} />}
                                {step === 2 && <TimelineStep formData={formData} updateFormData={updateFormData} />}
                                {step === 3 && <CanvasStep formData={formData} updateFormData={updateFormData} />}
                                {step === 4 && <ConnectionStep formData={formData} updateFormData={updateFormData} />}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Premium Footer Navigation */}
            {!isSuccess && (
                <div className="shrink-0 px-6 md:px-10 lg:px-12 py-6 md:py-8 border-t border-stone-200/80 bg-white/70 dark:border-white/5 dark:bg-black/20 flex justify-between items-center gap-4 backdrop-blur-md">
                    {step > 1 ? (
                        <button
                            onClick={handleBack}
                            disabled={isSubmitting}
                            className="flex items-center gap-3 group text-stone-500 hover:text-stone-950 dark:hover:text-white text-xs font-black uppercase tracking-[0.2em] transition-all disabled:opacity-20"
                        >
                            <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                            Prev
                        </button>
                    ) : (
                        <div /> 
                    )}

                    <div className="flex flex-col items-end gap-3">
                        {error && <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">{error}</span>}
                        {step < totalSteps && (
                            <button
                                onClick={handleNext}
                                disabled={(step === 1 && formData.services.length === 0)}
                                className="group flex items-center gap-4 px-10 py-5 bg-stone-950 text-white dark:bg-white dark:text-black rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-orange-600 hover:text-white transition-all disabled:opacity-20 shadow-2xl active:scale-95"
                            >
                                {step === 1 ? "Start The Magic" : "Next Phase"}
                                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </button>
                        )}

                        {step === totalSteps && (
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting || !formData.name || !formData.email}
                                className="flex items-center gap-4 px-12 py-5 bg-orange-600 text-white rounded-full font-black text-xs uppercase tracking-[0.3em] hover:bg-orange-500 transition-all shadow-2xl shadow-orange-600/30 disabled:opacity-20 min-w-[220px] justify-center active:scale-95"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Inking...
                                    </>
                                ) : (
                                    <>
                                        Finalize Connection
                                        <Check className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
