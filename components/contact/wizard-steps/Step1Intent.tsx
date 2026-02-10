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
        description: 'Personal, editorial, or family sessions.',
        icon: Camera,
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'events',
        title: 'Events',
        description: 'Weddings, parties, and celebrations.',
        icon: Calendar,
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'collabs',
        title: 'Creative Collabs',
        description: 'Artistic projects and brand work.',
        icon: Star,
        image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'general',
        title: 'Just Chatting',
        description: 'General inquiries or saying hello.',
        icon: MessageSquare,
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800'
    }
];

export default function Step1Intent({ formData, updateFormData, onNext }: Step1Props) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {options.map((option) => (
                <motion.button
                    key={option.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                        updateFormData({ intent: option.id });
                        // Small delay to allow selection animation before auto-advance
                        setTimeout(onNext, 250);
                    }}
                    className={`relative group overflow-hidden rounded-2xl h-40 text-left transition-all ${formData.intent === option.id
                            ? 'ring-4 ring-orange-500 shadow-xl'
                            : 'opacity-90 hover:opacity-100 hover:shadow-lg'
                        }`}
                >
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={option.image}
                            alt={option.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className={`absolute inset-0 transition-colors duration-300 ${formData.intent === option.id
                                ? 'bg-orange-900/40'
                                : 'bg-black/40 group-hover:bg-black/30'
                            }`} />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-6 flex flex-col justify-end h-full">
                        <div className="flex items-center gap-3 mb-1">
                            <div className={`p-2 rounded-full ${formData.intent === option.id ? 'bg-orange-500 text-white' : 'bg-white/20 backdrop-blur-md text-white'
                                }`}>
                                <option.icon className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold text-white">{option.title}</h3>
                        </div>
                        <p className="text-white/80 text-sm font-medium pl-14">{option.description}</p>
                    </div>
                </motion.button>
            ))}
        </div>
    );
}
