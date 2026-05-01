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
                            whileHover={!isSelected ? { y: -4, scale: 1.01 } : {}}
                            whileTap={{ scale: 0.98 }}
                            transition={{ 
                                delay: index * 0.05,
                                type: "spring",
                                stiffness: 300,
                                damping: 20
                            }}
                            onClick={() => toggleService(service.id)}
                            className={cn(
                                "relative flex flex-col items-start p-6 rounded-3xl border transition-all duration-300 text-left group overflow-hidden",
                                isSelected 
                                    ? "bg-brand-950 border-brand-950 text-white shadow-2xl dark:bg-white dark:border-white dark:text-black dark:shadow-white/10" 
                                    : "bg-white border-brand-100 text-brand-950 hover:bg-brand-50/50 hover:border-brand-200 hover:shadow-xl dark:bg-white/5 dark:border-white/10 dark:text-white dark:hover:bg-white/[0.08] dark:hover:border-white/20"
                            )}
                        >
                            {/* Decorative background element for hover */}
                            {!isSelected && (
                                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-orange-500/10 transition-colors" />
                            )}

                            <div className={cn(
                                "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300",
                                isSelected 
                                    ? "bg-white text-brand-950 dark:bg-black dark:text-white shadow-lg" 
                                    : "bg-brand-50 text-orange-500 group-hover:bg-orange-100 group-hover:scale-110 dark:bg-white/10 dark:group-hover:bg-white/20"
                            )}>
                                <Icon className="w-6 h-6" />
                            </div>

                            <h3 className={cn(
                                "text-xl font-sans font-bold tracking-tight mb-2 transition-colors",
                                isSelected ? "text-white dark:text-brand-950" : "text-brand-950 dark:text-white"
                            )}>
                                {service.title}
                            </h3>
                            
                            <p className={cn(
                                "text-sm leading-relaxed mb-4 transition-colors",
                                isSelected ? "text-brand-300 dark:text-brand-600" : "text-brand-500 dark:text-brand-400"
                            )}>
                                {service.description}
                            </p>

                            <div className="flex items-center justify-between w-full mt-auto pt-4 border-t border-brand-100/10">
                                <span className={cn(
                                    "text-[11px] font-bold uppercase tracking-[0.2em] transition-colors",
                                    isSelected ? "text-orange-500" : "text-brand-400 dark:text-brand-500 group-hover:text-brand-600 dark:group-hover:text-brand-300"
                                )}>
                                    {service.vibe}
                                </span>
                                
                                {isSelected ? (
                                    <motion.div 
                                        initial={{ scale: 0, rotate: -45 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        className="w-7 h-7 bg-white text-brand-950 dark:bg-black dark:text-white rounded-full flex items-center justify-center shadow-md"
                                    >
                                        <Check className="w-4 h-4 stroke-[3px]" />
                                    </motion.div>
                                ) : (
                                    <div className="w-7 h-7 rounded-full border border-brand-200 dark:border-brand-800 flex items-center justify-center group-hover:border-orange-500/50 transition-colors">
                                        <div className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-orange-500 transition-colors" />
                                    </div>
                                )}
                            </div>
                        </motion.button>
                    );
                })}
            </div>
            
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-brand-400 text-xs text-center font-bold uppercase tracking-[0.3em]"
            >
                Select your path to continue
            </motion.p>
        </div>
    );
};

export default VisionStep;
