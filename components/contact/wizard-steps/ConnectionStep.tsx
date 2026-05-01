'use client';

import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Instagram, MessageSquare } from 'lucide-react';
import { FormData } from '../BookingWizard';
import { cn } from '@/lib/utils';

interface StepProps {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
}

const ConnectionStep = ({ formData, updateFormData }: StepProps) => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-3">
                    <label className="flex items-center gap-3 text-orange-500 text-xs font-black uppercase tracking-[0.2em]">
                        <User className="w-4 h-4" />
                        Full Name
                    </label>
                    <input
                        type="text"
                        placeholder="John Doe"
                        autoComplete="name"
                        value={formData.name}
                        onChange={(e) => updateFormData({ name: e.target.value })}
                        className="w-full bg-white border border-stone-200 rounded-2xl px-6 py-3 text-base text-stone-950 placeholder:text-stone-500 outline-none focus:border-orange-500/50 transition-all font-medium dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder:text-stone-700"
                    />
                </div>

                {/* Email Address */}
                <div className="space-y-3">
                    <label className="flex items-center gap-3 text-orange-500 text-xs font-black uppercase tracking-[0.2em]">
                        <Mail className="w-4 h-4" />
                        Email Address
                    </label>
                    <input
                        type="email"
                        placeholder="john@example.com"
                        autoComplete="email"
                        inputMode="email"
                        value={formData.email}
                        onChange={(e) => updateFormData({ email: e.target.value })}
                        className="w-full bg-white border border-stone-200 rounded-2xl px-6 py-3 text-base text-stone-950 placeholder:text-stone-500 outline-none focus:border-orange-500/50 transition-all font-medium dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder:text-stone-700"
                    />
                </div>

                {/* Phone Number */}
                <div className="space-y-3">
                    <label className="flex items-center gap-3 text-orange-500 text-xs font-black uppercase tracking-[0.2em]">
                        <Phone className="w-4 h-4" />
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        placeholder="(555) 123-4567"
                        autoComplete="tel"
                        inputMode="tel"
                        value={formData.phone}
                        onChange={(e) => updateFormData({ phone: e.target.value })}
                        className="w-full bg-white border border-stone-200 rounded-2xl px-6 py-3 text-base text-stone-950 placeholder:text-stone-500 outline-none focus:border-orange-500/50 transition-all font-medium dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder:text-stone-700"
                    />
                </div>

                {/* City / State */}
                <div className="space-y-3">
                    <label className="flex items-center gap-3 text-orange-500 text-xs font-black uppercase tracking-[0.2em]">
                        <MapPin className="w-4 h-4" />
                        City / State
                    </label>
                    <input
                        type="text"
                        placeholder="Los Angeles, CA"
                        autoComplete="address-level2"
                        value={formData.cityState}
                        onChange={(e) => updateFormData({ cityState: e.target.value })}
                        className="w-full bg-white border border-stone-200 rounded-2xl px-6 py-3 text-base text-stone-950 placeholder:text-stone-500 outline-none focus:border-orange-500/50 transition-all font-medium dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder:text-stone-700"
                    />
                </div>
            </div>

            {/* Social Handle */}
            <div className="space-y-3">
                <label className="flex items-center gap-3 text-orange-500 text-xs font-black uppercase tracking-[0.2em]">
                    <Instagram className="w-4 h-4" />
                    Instagram / Website (Optional)
                </label>
                <input
                    type="text"
                    placeholder="@yourhandle"
                    autoComplete="username"
                    value={formData.social}
                    onChange={(e) => updateFormData({ social: e.target.value })}
                    className="w-full bg-white border border-stone-200 rounded-2xl px-6 py-4 text-base text-stone-950 placeholder:text-stone-500 outline-none focus:border-orange-500/50 transition-all font-medium dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder:text-stone-700"
                />
            </div>

            {/* Message */}
            <div className="space-y-3">
                <label className="flex items-center gap-3 text-orange-500 text-xs font-black uppercase tracking-[0.2em]">
                    <MessageSquare className="w-4 h-4" />
                    Additional Vision Notes
                </label>
                <textarea
                    placeholder="Tell me more about the story we're telling..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => updateFormData({ message: e.target.value })}
                    className="w-full bg-white border border-stone-200 rounded-2xl px-6 py-4 text-base text-stone-950 placeholder:text-stone-500 outline-none focus:border-orange-500/50 transition-all font-medium resize-none dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder:text-stone-700"
                />
            </div>

            <p className="text-stone-600 text-xs text-center font-bold uppercase tracking-[0.2em] pt-4">
                🔒 Your privacy is respected. No spam, ever.
            </p>
        </div>
    );
};

export default ConnectionStep;
