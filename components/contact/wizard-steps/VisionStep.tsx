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
        <div className="space-y-5 md:space-y-8">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
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
                                "group relative flex min-h-[112px] cursor-pointer items-start gap-4 overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 md:min-h-[230px] md:flex-col md:gap-0 md:rounded-3xl md:p-6",
                                isSelected
                                    ? "border-brand-950 bg-brand-950 text-white shadow-xl dark:border-white dark:bg-white dark:text-black dark:shadow-white/10"
                                    : "bg-white border-brand-100 text-brand-950 hover:bg-brand-50/50 hover:border-brand-200 hover:shadow-xl dark:bg-white/5 dark:border-white/10 dark:text-white dark:hover:bg-white/[0.08] dark:hover:border-white/20"
                            )}
                        >
                            {!isSelected && (
                                <div className="absolute right-0 top-0 hidden h-32 w-32 translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/5 blur-3xl transition-colors group-hover:bg-orange-500/10 md:block" />
                            )}

                            <div className={cn(
                                "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300 md:mb-4 md:h-12 md:w-12",
                                isSelected
                                    ? "bg-white text-brand-950 dark:bg-black dark:text-white shadow-lg"
                                    : "bg-brand-50 text-orange-500 group-hover:bg-orange-100 group-hover:scale-110 dark:bg-white/10 dark:group-hover:bg-white/20"
                            )}>
                                <Icon className="h-5 w-5 md:h-6 md:w-6" />
                            </div>

                            <div className="min-w-0 flex-1">
                                <h3 className={cn(
                                    "mb-1 font-sans text-base font-black tracking-tight transition-colors md:mb-2 md:text-xl",
                                    isSelected ? "text-white dark:text-brand-950" : "text-brand-950 dark:text-white"
                                )}>
                                    {service.title}
                                </h3>

                                <p className={cn(
                                    "line-clamp-2 text-sm leading-snug transition-colors md:mb-4 md:line-clamp-none md:leading-relaxed",
                                    isSelected ? "text-brand-300 dark:text-brand-600" : "text-brand-500 dark:text-brand-400"
                                )}>
                                    {service.description}
                                </p>
                            </div>

                            <div className="hidden w-full items-center justify-between border-t border-brand-100/10 pt-4 md:mt-auto md:flex">
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
                                        className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-brand-950 shadow-md dark:bg-black dark:text-white"
                                    >
                                        <Check className="h-4 w-4 stroke-[3px]" />
                                    </motion.div>
                                ) : (
                                    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-brand-200 transition-colors group-hover:border-orange-500/50 dark:border-brand-800">
                                        <div className="h-1.5 w-1.5 rounded-full bg-transparent transition-colors group-hover:bg-orange-500" />
                                    </div>
                                )}
                            </div>

                            <div className={cn(
                                "absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full border transition-all md:hidden",
                                isSelected
                                    ? "border-white bg-white text-stone-950"
                                    : "border-stone-200 bg-white text-transparent dark:border-white/10 dark:bg-white/5"
                            )}>
                                <Check className="h-3.5 w-3.5 stroke-[3px]" />
                            </div>
                        </motion.button>
                    );
                })}
            </div>
            
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center text-[11px] font-bold uppercase tracking-[0.22em] text-brand-400 md:text-xs md:tracking-[0.3em]"
            >
                Select your path to continue
            </motion.p>
        </div>
    );
};

export default VisionStep;
