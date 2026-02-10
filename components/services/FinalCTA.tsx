import Link from "next/link";
import { HeartHandshake, ArrowRight } from "lucide-react";

interface FinalCTAProps {
    heading?: string;
    text?: string;
}

export default function FinalCTA({ heading, text }: FinalCTAProps) {
    const isDefault = !heading;
    const resolvedHeading = heading || "Ready to create something beautiful?";
    const resolvedText = text || "Let's chat about your vision and see if we're a good fit. No pressure, just a conversation.";

    return (
        <section className="py-24 bg-brand-900 text-white text-center overflow-hidden relative">
            {/* Background gradient animation */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 via-transparent to-purple-600/10 animate-pulse" />

            <div className="container mx-auto px-6 max-w-2xl relative z-10">
                {/* Guarantee Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8 animate-in fade-in zoom-in duration-700">
                    <HeartHandshake className="w-4 h-4 text-orange-400" />
                    <span className="text-sm font-medium text-brand-200">100% Satisfaction Guarantee</span>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-archivo mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                    {resolvedHeading}
                </h2>
                <p className="text-brand-400 mb-10 text-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                    {resolvedText}
                </p>
                <Link
                    href="/contact"
                    className="group inline-flex items-center gap-3 bg-orange-600 hover:bg-orange-500 text-white px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-orange-600/30 hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300"
                >
                    Book a Session
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <p className="mt-6 text-brand-500 text-sm animate-in fade-in duration-700 delay-500">
                    Free consultation • No commitment required
                </p>
            </div>
        </section>
    );
}
