'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';
import Step1Intent from './wizard-steps/Step1Intent';
import Step2Details from './wizard-steps/Step2Details';
import Step3Final from './wizard-steps/Step3Final';

interface BookingWizardProps {
    onClose: () => void;
}

export type FormData = {
    intent: string;
    date?: Date;
    location?: string;
    budget?: string;
    name: string;
    email: string;
    message: string;
};

export default function BookingWizard({ onClose }: BookingWizardProps) {
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(0);
    const [formData, setFormData] = useState<FormData>({
        intent: '',
        name: '',
        email: '',
        message: ''
    });

    const totalSteps = 3;

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

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 50 : -50,
            opacity: 0,
        }),
    };

    return (
        <div className="flex flex-col h-full min-h-[500px] md:min-h-[600px]">
            {/* Header / Progress */}
            <div className="px-8 py-6 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between bg-stone-50/50 dark:bg-stone-900/50">
                <div>
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">Step {step} of {totalSteps}</span>
                    <h2 className="text-xl font-bold text-stone-900 dark:text-white mt-1">
                        {step === 1 && "What's the vibe?"}
                        {step === 2 && "The details matter."}
                        {step === 3 && "Let's make it real."}
                    </h2>
                </div>
                <div className="flex gap-1">
                    {[1, 2, 3].map((s) => (
                        <div
                            key={s}
                            className={`h-2 rounded-full transition-all duration-300 ${s === step ? 'w-8 bg-orange-600' :
                                    s < step ? 'w-2 bg-orange-200 dark:bg-orange-900' : 'w-2 bg-stone-200 dark:bg-stone-800'
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden relative p-8">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={step}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ type: "spring", duration: 0.5, bounce: 0 }}
                        className="w-full max-w-2xl mx-auto"
                    >
                        {step === 1 && <Step1Intent formData={formData} updateFormData={updateFormData} onNext={handleNext} />}
                        {step === 2 && <Step2Details formData={formData} updateFormData={updateFormData} />}
                        {step === 3 && <Step3Final formData={formData} updateFormData={updateFormData} />}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Footer / Navigation */}
            <div className="px-8 py-6 border-t border-stone-100 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50 flex justify-between items-center">
                {step > 1 ? (
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white font-medium transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        Back
                    </button>
                ) : (
                    <div /> // Spacer
                )}

                {step < totalSteps && (
                    <button
                        onClick={handleNext}
                        disabled={(step === 1 && !formData.intent)}
                        className="flex items-center gap-2 px-6 py-3 bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-xl font-bold hover:bg-stone-800 dark:hover:bg-stone-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        Next Step
                        <ChevronRight className="w-5 h-5" />
                    </button>
                )}

                {step === totalSteps && (
                    <button
                        className="flex items-center gap-2 px-8 py-3 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-500 transition-all shadow-lg shadow-orange-600/20"
                    >
                        Send Inquiry
                        <Check className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>
    );
}
