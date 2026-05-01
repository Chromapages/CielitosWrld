'use client';

import { User, Mail, Phone, MapPin, Instagram, MessageSquare, ShieldCheck } from 'lucide-react';
import { FormData } from '../BookingWizard';

interface StepProps {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
}

const ConnectionStep = ({ formData, updateFormData }: StepProps) => {
    const inputClassName = "min-h-[48px] w-full rounded-2xl border border-stone-200 bg-white px-5 py-3 text-base font-medium text-stone-950 outline-none transition-all placeholder:text-stone-500 focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-stone-700 md:px-6";
    const labelClassName = "flex items-center gap-2.5 text-[11px] font-black uppercase tracking-[0.16em] text-orange-500 md:gap-3 md:text-xs md:tracking-[0.2em]";

    return (
        <div className="space-y-5 md:space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2.5 md:space-y-3">
                    <label className={labelClassName}>
                        <User className="h-4 w-4" />
                        Full Name
                    </label>
                    <input
                        type="text"
                        placeholder="John Doe"
                        autoComplete="name"
                        value={formData.name}
                        onChange={(e) => updateFormData({ name: e.target.value })}
                        className={inputClassName}
                    />
                </div>

                <div className="space-y-2.5 md:space-y-3">
                    <label className={labelClassName}>
                        <Mail className="h-4 w-4" />
                        Email Address
                    </label>
                    <input
                        type="email"
                        placeholder="john@example.com"
                        autoComplete="email"
                        inputMode="email"
                        value={formData.email}
                        onChange={(e) => updateFormData({ email: e.target.value })}
                        className={inputClassName}
                    />
                </div>

                <div className="space-y-2.5 md:space-y-3">
                    <label className={labelClassName}>
                        <Phone className="h-4 w-4" />
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        placeholder="(555) 123-4567"
                        autoComplete="tel"
                        inputMode="tel"
                        value={formData.phone}
                        onChange={(e) => updateFormData({ phone: e.target.value })}
                        className={inputClassName}
                    />
                </div>

                <div className="space-y-2.5 md:space-y-3">
                    <label className={labelClassName}>
                        <MapPin className="h-4 w-4" />
                        City / State
                    </label>
                    <input
                        type="text"
                        placeholder="Los Angeles, CA"
                        autoComplete="address-level2"
                        value={formData.cityState}
                        onChange={(e) => updateFormData({ cityState: e.target.value })}
                        className={inputClassName}
                    />
                </div>
            </div>

            <div className="space-y-2.5 md:space-y-3">
                <label className={labelClassName}>
                    <Instagram className="h-4 w-4" />
                    Instagram / Website (Optional)
                </label>
                <input
                    type="text"
                    placeholder="@yourhandle"
                    autoComplete="username"
                    value={formData.social}
                    onChange={(e) => updateFormData({ social: e.target.value })}
                    className={inputClassName}
                />
            </div>

            <div className="space-y-2.5 md:space-y-3">
                <label className={labelClassName}>
                    <MessageSquare className="h-4 w-4" />
                    Additional Vision Notes
                </label>
                <textarea
                    placeholder="Tell me more about the story we're telling..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => updateFormData({ message: e.target.value })}
                    className="min-h-[120px] w-full resize-none rounded-2xl border border-stone-200 bg-white px-5 py-4 text-base font-medium text-stone-950 outline-none transition-all placeholder:text-stone-500 focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-stone-700 md:px-6"
                />
            </div>

            <div className="flex items-center justify-center gap-2 pt-1 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-stone-500 md:pt-4 md:text-xs md:tracking-[0.2em]">
                <ShieldCheck className="h-4 w-4 text-orange-500" />
                <span>Your privacy is respected. No spam, ever.</span>
            </div>
        </div>
    );
};

export default ConnectionStep;
