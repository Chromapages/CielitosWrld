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

    const isNextDisabled = () => {
        switch (step) {
            case 1:
                return formData.services.length === 0;
            case 2:
                return formData.isFlexible ? !formData.month : !formData.date;
            case 3:
                return !formData.location || formData.vibe.length === 0 || !formData.investment;
            default:
                return false;
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

    return (
        <div className="flex h-full min-h-0 flex-col bg-white dark:bg-stone-900 overflow-hidden relative">
            {/* Minimal Progress Line */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-stone-100 dark:bg-white/5 overflow-hidden z-20">
                <motion.div
                    className="h-full bg-orange-600 shadow-[0_0_12px_rgba(234,88,12,0.6)]"
                    animate={{ width: `${(step / totalSteps) * 100}%` }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                />
            </div>

            {/* Header Content */}
            <div className="relative shrink-0 pt-8 px-6 md:px-12 pb-4">
                <div className="flex flex-col">
                    <span className="text-xs font-black text-orange-500 uppercase tracking-[0.4em] mb-2">
                        Phase 0{step} <span className="text-stone-300 dark:text-stone-700 mx-2">/</span> 0{totalSteps}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-archivo font-black text-stone-950 dark:text-white uppercase tracking-tighter leading-none">
                        {step === 1 && "The Vision"}
                        {step === 2 && "The Timeline"}
                        {step === 3 && "The Canvas"}
                        {step === 4 && "The Connection"}
                    </h2>
                </div>
            </div>

            {/* Content Area */}
            <div className="relative flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-6 md:px-12 pb-12 scroll-smooth">
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
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col items-center justify-center h-full text-center py-12"
                            >
                                <div className="w-24 h-24 bg-orange-600/10 rounded-full flex items-center justify-center mb-10 relative">
                                    <Sparkles className="w-10 h-10 text-orange-600 animate-pulse" />
                                    <motion.div 
                                        className="absolute inset-0 rounded-full border-2 border-orange-600/20"
                                        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                                        transition={{ duration: 2.5, repeat: Infinity }}
                                    />
                                </div>
                                <h3 className="text-4xl md:text-6xl font-pattaya text-stone-950 dark:text-white mb-6">
                                    Inquiry Received
                                </h3>
                                <p className="text-lg text-stone-600 dark:text-stone-400 max-w-sm mb-12 leading-relaxed font-medium">
                                    Your story is being processed. I&apos;ll reach out personally within 24-48 hours.
                                </p>
                                <button
                                    onClick={onClose}
                                    className="btn-press px-12 py-5 bg-stone-950 text-white dark:bg-white dark:text-stone-950 rounded-full font-black text-xs uppercase tracking-[0.3em] shadow-2xl"
                                >
                                    Return Home
                                </button>
                            </motion.div>
                        ) : (
                            <div className="py-2"> 
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
                <div className="shrink-0 px-6 md:px-12 py-6 bg-white/95 dark:bg-stone-900/95 flex justify-between items-center gap-4 backdrop-blur-3xl border-t border-stone-100 dark:border-white/5">
                    {step > 1 ? (
                        <button
                            onClick={handleBack}
                            disabled={isSubmitting}
                            className="btn-press flex items-center gap-3 text-stone-400 hover:text-stone-950 dark:hover:text-white text-xs font-black uppercase tracking-[0.3em] transition-all disabled:opacity-20"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Back
                        </button>
                    ) : (
                        <div /> 
                    )}

                    <div className="flex flex-col items-end gap-3">
                        {error && <span className="text-xs font-bold text-red-500 uppercase tracking-widest">{error}</span>}
                        {step < totalSteps && (
                            <button
                                onClick={handleNext}
                                disabled={isNextDisabled()}
                                className="btn-press group flex items-center gap-4 px-10 py-5 bg-orange-600 text-white rounded-full font-black text-xs uppercase tracking-[0.25em] transition-all disabled:opacity-20 disabled:cursor-not-allowed shadow-xl shadow-orange-600/10"
                            >
                                Continue
                                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </button>
                        )}

                        {step === totalSteps && (
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting || !formData.name || !formData.email}
                                className="btn-press flex items-center gap-4 px-10 py-5 bg-stone-950 text-white dark:bg-white dark:text-stone-950 rounded-full font-black text-xs uppercase tracking-[0.3em] shadow-2xl disabled:opacity-20 min-w-[200px] justify-center"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Sign Vision
                                        <Check className="w-4 h-4" />
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
