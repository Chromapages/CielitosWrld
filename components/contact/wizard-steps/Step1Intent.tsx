'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Camera, Calendar, Star, MessageSquare } from 'lucide-react';
import { FormData } from '../BookingWizard';

interface Step1Props {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
    onNext: () => void;
}

const options = [
    {
        id: 'portraits',
        title: 'Portraits',
        short: 'Editorial & Narrative',
        icon: Camera,
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'events',
        title: 'Events',
        short: 'Atmospheric Moments',
        icon: Calendar,
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'collabs',
        title: 'Collabs',
        short: 'Creative Partnerships',
        icon: Star,
        image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'general',
        title: 'Dialogue',
        short: 'Brief Inquiry',
        icon: MessageSquare,
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800'
    }
];

export default function Step1Intent({ formData, updateFormData, onNext }: Step1Props) {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {options.map((option, idx) => (
                    <motion.button
                        key={option.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        onClick={() => {
                            updateFormData({ intent: option.id });
                            setTimeout(onNext, 300);
                        }}
                        className={`relative group h-32 w-full rounded-2xl overflow-hidden text-left transition-all border-2 ${
                            formData.intent === option.id 
                                ? 'border-orange-500 shadow-lg' 
                                : 'border-stone-100 dark:border-stone-800 hover:border-orange-500/50'
                        }`}
                    >
                        {/* Background with higher contrast overlay */}
                        <div className="absolute inset-0 z-0 opacity-20 dark:opacity-40 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity">
                            <Image
                                src={option.image}
                                alt={option.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        
                        {/* Content */}
                        <div className="relative z-10 p-6 flex items-center gap-4 h-full">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                                formData.intent === option.id 
                                    ? 'bg-orange-500 text-white' 
                                    : 'bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-300 group-hover:bg-orange-500/10 group-hover:text-orange-500'
                            }`}>
                                <option.icon className="w-5 h-5" />
                            </div>
                            
                            <div className="flex flex-col">
                                <span className={`text-lg font-black tracking-tight leading-none mb-1 transition-colors ${
                                    formData.intent === option.id ? 'text-orange-600 dark:text-orange-500' : 'text-stone-900 dark:text-white'
                                }`}>
                                    {option.title}
                                </span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500">
                                    {option.short}
                                </span>
                            </div>

                            {formData.intent === option.id && (
                                <motion.div 
                                    layoutId="check-badge"
                                    className="ml-auto w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center"
                                >
                                    <div className="w-2 h-2 bg-white rounded-full" />
                                </motion.div>
                            )}
                        </div>
                    </motion.button>
                ))}
            </div>
            
            <p className="text-[10px] font-bold text-center text-stone-400 uppercase tracking-[0.2em] mt-8">
                Select your primary objective to begin
            </p>
        </div>
    );
}
