'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, ChevronRight, ChevronLeft, Check, Loader2, Sparkles } from 'lucide-react';
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
    const stepTitles = ['The Vision', 'The Timeline', 'The Canvas', 'The Connection'];
    const selectedSummary = (() => {
        if (isSuccess) return 'Inquiry received';
        if (step === 1) return formData.services.length ? `${formData.services.length} selected` : 'Choose at least one path';
        if (step === 2) return formData.isFlexible ? (formData.month || 'Flexible timing') : (formData.date ? formData.date.toLocaleDateString() : 'Pick a date');
        if (step === 3) return formData.vibe.length ? `${formData.vibe.length} vibes selected` : 'Location, vibe, budget';
        return formData.name && formData.email ? 'Ready to submit' : 'Name and email required';
    })();

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
        <div className="relative flex min-h-[640px] flex-col overflow-visible bg-white dark:bg-stone-900 md:h-full md:min-h-0 md:overflow-hidden">
            <div className="sticky top-[calc(var(--mobile-header-height,64px)+var(--safe-area-top,0px)+73px)] z-20 shrink-0 border-b border-stone-100 bg-white/95 px-5 py-4 backdrop-blur-2xl dark:border-white/5 dark:bg-stone-900/95 md:static md:px-12 md:pb-5 md:pt-8">
                <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                        <span className="text-[11px] font-black uppercase tracking-[0.22em] text-orange-600">
                            Step {step} of {totalSteps}
                        </span>
                        <h2 className="mt-1 font-archivo text-2xl font-black uppercase leading-none tracking-tight text-stone-950 dark:text-white md:text-3xl">
                            {stepTitles[step - 1]}
                        </h2>
                        <p className="mt-2 truncate text-xs font-bold uppercase tracking-[0.16em] text-stone-400">
                            {selectedSummary}
                        </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-1.5 pt-1" aria-hidden="true">
                        {Array.from({ length: totalSteps }).map((_, index) => (
                            <motion.span
                                key={index}
                                className={`h-2 rounded-full ${index + 1 <= step ? 'bg-orange-600' : 'bg-stone-200 dark:bg-white/10'}`}
                                animate={{ width: index + 1 === step ? 24 : 8 }}
                                transition={{ duration: 0.25 }}
                            />
                        ))}
                    </div>
                </div>

                <div className="mt-4 h-1 overflow-hidden rounded-full bg-stone-100 dark:bg-white/5">
                    <motion.div
                        className="h-full rounded-full bg-orange-600 shadow-[0_0_12px_rgba(234,88,12,0.45)]"
                        animate={{ width: `${(step / totalSteps) * 100}%` }}
                        transition={{ duration: 0.55, ease: "circOut" }}
                    />
                </div>
            </div>

            <div className="relative min-h-0 flex-1 overflow-visible px-5 pb-28 pt-5 md:overflow-y-auto md:overflow-x-hidden md:px-12 md:pb-12 md:pt-6">
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
                                className="flex min-h-[440px] flex-col items-center justify-center py-12 text-center"
                            >
                                <div className="relative mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-orange-600/10 md:mb-10 md:h-24 md:w-24">
                                    <Sparkles className="h-9 w-9 animate-pulse text-orange-600 md:h-10 md:w-10" />
                                    <motion.div
                                        className="absolute inset-0 rounded-full border-2 border-orange-600/20"
                                        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                                        transition={{ duration: 2.5, repeat: Infinity }}
                                    />
                                </div>
                                <h3 className="mb-5 text-4xl font-pattaya text-stone-950 dark:text-white md:text-6xl">
                                    Inquiry Received
                                </h3>
                                <p className="mb-10 max-w-sm text-base font-medium leading-relaxed text-stone-600 dark:text-stone-400 md:mb-12 md:text-lg">
                                    Your story is being processed. I&apos;ll reach out personally within 24-48 hours.
                                </p>
                                <button
                                    onClick={onClose}
                                    className="btn-press min-h-[52px] rounded-full bg-stone-950 px-8 py-4 text-xs font-black uppercase tracking-[0.22em] text-white shadow-2xl dark:bg-white dark:text-stone-950 md:px-12 md:py-5"
                                >
                                    View Contact Info
                                </button>
                            </motion.div>
                        ) : (
                            <div>
                                {step === 1 && <VisionStep formData={formData} updateFormData={updateFormData} />}
                                {step === 2 && <TimelineStep formData={formData} updateFormData={updateFormData} />}
                                {step === 3 && <CanvasStep formData={formData} updateFormData={updateFormData} />}
                                {step === 4 && <ConnectionStep formData={formData} updateFormData={updateFormData} />}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {!isSuccess && (
                <div className="sticky bottom-[calc(var(--mobile-nav-height,64px)+var(--safe-area-bottom,0px)+12px)] z-30 shrink-0 border-t border-stone-100 bg-white/95 px-5 py-4 backdrop-blur-2xl dark:border-white/5 dark:bg-stone-900/95 md:static md:px-12 md:py-6">
                    {error && (
                        <div className="mb-3 flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-bold text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
                            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="flex items-center gap-3">
                        {step > 1 && (
                            <button
                                onClick={handleBack}
                                disabled={isSubmitting}
                                className="btn-press flex min-h-[52px] shrink-0 items-center gap-2 rounded-full border border-stone-200 px-4 text-xs font-black uppercase tracking-[0.16em] text-stone-500 transition-all hover:border-stone-300 hover:text-stone-950 disabled:opacity-30 dark:border-white/10 dark:text-stone-400 dark:hover:text-white"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Back
                            </button>
                        )}

                        {step < totalSteps && (
                            <button
                                onClick={handleNext}
                                disabled={isNextDisabled()}
                                className="btn-press group flex min-h-[52px] flex-1 items-center justify-center gap-3 rounded-full bg-orange-600 px-6 text-xs font-black uppercase tracking-[0.2em] text-white shadow-xl shadow-orange-600/10 transition-all disabled:cursor-not-allowed disabled:opacity-30"
                            >
                                Continue
                                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </button>
                        )}

                        {step === totalSteps && (
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting || !formData.name || !formData.email}
                                className="btn-press flex min-h-[52px] flex-1 items-center justify-center gap-3 rounded-full bg-stone-950 px-6 text-xs font-black uppercase tracking-[0.2em] text-white shadow-2xl transition-all disabled:cursor-not-allowed disabled:opacity-30 dark:bg-white dark:text-stone-950"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Sending
                                    </>
                                ) : (
                                    <>
                                        Sign Vision
                                        <Check className="h-4 w-4" />
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
