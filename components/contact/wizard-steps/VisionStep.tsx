'use client';

import { motion } from 'framer-motion';
import { Camera, Zap, Heart, Briefcase, Check } from 'lucide-react';
import { FormData } from '../BookingWizard';
import { cn } from '@/lib/utils';

interface StepProps {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
}

const SERVICES = [
    {
        id: 'editorial',
        title: 'Editorial / Portraits',
        description: 'Statement imagery that tells a story. High-fashion, individual essence.',
        icon: Camera,
        vibe: 'Bold, Clean, Sophisticated'
    },
    {
        id: 'events',
        title: 'Events / BTS',
        description: 'The raw, candid moments. Festivals, private sets, and behind-the-scenes.',
        icon: Zap,
        vibe: 'Candid, Energetic, Real'
    },
    {
        id: 'lifestyle',
        title: 'Brand / Lifestyle',
        description: 'Humanizing your brand. Natural environments and authentic connection.',
        icon: Heart,
        vibe: 'Warm, Narrative, Relatable'
    },
    {
        id: 'commercial',
        title: 'Commercial / Product',
        description: 'Sharp, distinct visuals for products and professional platforms.',
        icon: Briefcase,
        vibe: 'Sharp, Minimal, Exact'
    }
];

const VisionStep = ({ formData, updateFormData }: StepProps) => {
    const toggleService = (id: string) => {
        const newServices = formData.services.includes(id)
            ? formData.services.filter(s => s !== id)
            : [...formData.services, id];
        updateFormData({ services: newServices });
    };

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SERVICES.map((service, index) => {
                    const isSelected = formData.services.includes(service.id);
                    const Icon = service.icon;
                    
                    return (
                        <motion.button
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => toggleService(service.id)}
                            className={cn(
                                "relative flex flex-col items-start p-6 rounded-3xl border transition-all text-left group",
                                isSelected 
                                    ? "bg-stone-950 border-stone-950 text-white shadow-2xl dark:bg-white dark:border-white dark:text-black dark:shadow-white/10" 
                                    : "bg-white border-stone-200 text-stone-950 hover:border-stone-300 dark:bg-white/5 dark:border-white/10 dark:text-white dark:hover:border-white/20"
                            )}
                        >
                            <div className={cn(
                                "w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors",
                                isSelected ? "bg-white text-stone-950 dark:bg-black dark:text-white" : "bg-stone-100 text-orange-500 group-hover:bg-stone-200 dark:bg-white/10 dark:group-hover:bg-white/20"
                            )}>
                                <Icon className="w-6 h-6" />
                            </div>

                            <h3 className="text-xl font-inter font-black uppercase tracking-tight mb-2">
                                {service.title}
                            </h3>
                            <p className={cn(
                                "text-sm leading-relaxed mb-4",
                                isSelected ? "text-stone-300 dark:text-stone-600" : "text-stone-600 dark:text-stone-400"
                            )}>
                                {service.description}
                            </p>

                            <div className="flex items-center justify-between w-full mt-auto">
                                <span className={cn(
                                    "text-[10px] font-bold uppercase tracking-widest",
                                    isSelected ? "text-orange-600" : "text-stone-500"
                                )}>
                                    {service.vibe}
                                </span>
                                {isSelected && (
                                    <motion.div 
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-6 h-6 bg-white text-stone-950 dark:bg-black dark:text-white rounded-full flex items-center justify-center"
                                    >
                                        <Check className="w-4 h-4" />
                                    </motion.div>
                                )}
                            </div>

                            {/* Magnetic hover effect placeholder */}
                            {!isSelected && (
                                <div className="absolute inset-0 bg-stone-100 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none dark:bg-white/5" />
                            )}
                        </motion.button>
                    );
                })}
            </div>
            
            <p className="text-stone-500 text-xs text-center font-medium uppercase tracking-[0.2em]">
                Select one or more categories to start your story
            </p>
        </div>
    );
};

export default VisionStep;
