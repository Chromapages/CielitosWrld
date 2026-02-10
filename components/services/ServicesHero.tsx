import { ShieldCheck } from "lucide-react";

interface ServicesHeroProps {
    heading?: string;
    subhead?: string;
    trustText?: string;
}

export default function ServicesHero({
    heading = "Simple, Transparent Pricing",
    subhead = "Choose the perfect package for your needs. No hidden fees, just beautiful results.",
    trustText = "Trusted by 100+ clients across California"
}: ServicesHeroProps) {
    return (
        <section className="relative -mt-16 md:-mt-24 pt-32 pb-32 md:pt-48 md:pb-40 bg-brand-950 text-white overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-800/40 via-brand-950/0 to-transparent"></div>
            <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900/50 border border-brand-800 text-brand-400 text-xs uppercase tracking-widest mb-6">
                    <ShieldCheck className="w-3 h-3" /> {trustText}
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display mb-6 leading-tight">
                    {heading}
                </h1>
                <p className="text-lg md:text-xl text-brand-400 max-w-2xl mx-auto font-light leading-relaxed">
                    {subhead}
                </p>
            </div>
        </section>
    );
}
