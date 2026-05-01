import { ShieldCheck } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ServicesHeroProps {
    heading?: string;
    subhead?: string;
    trustText?: string;
    backgroundImage?: string | { asset: { url: string } };
}

export default function ServicesHero({
    heading = "Simple, Transparent Pricing",
    subhead = "Choose the perfect package for your needs. No hidden fees, just beautiful results.",
    trustText = "Trusted by 100+ clients across California",
    backgroundImage = "/images/services-hero.png"
}: ServicesHeroProps) {
    const imageUrl = (typeof backgroundImage === 'string' ? backgroundImage : backgroundImage?.asset?.url) || "/images/services-hero.png";

    return (
        <section className="hidden md:block relative md:-mt-24 md:pt-48 md:pb-40 text-white overflow-hidden bg-brand-950">
            {/* Background Image */}
            {imageUrl && (
                <div className="hidden md:block absolute inset-0 z-0">
                    <Image
                        src={imageUrl}
                        alt="Services background"
                        fill
                        priority
                        className="object-cover object-center opacity-70 transition-opacity duration-700"
                    />
                    {/* Multi-layer Overlays for depth and readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-950/60 via-brand-950/20 to-brand-950/80" />
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-950/30 via-transparent to-brand-950/30" />
                    <div className="absolute inset-0 backdrop-blur-[1px]" />
                </div>
            )}

            <div className="container mx-auto px-6 relative z-10 text-left max-w-7xl">
                <div className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-950/60 backdrop-blur-md border border-brand-800 text-brand-400 text-xs uppercase tracking-widest mb-6">
                    <ShieldCheck className="w-3 h-3" /> {trustText}
                </div>
                <h1 className="hidden md:block text-4xl md:text-6xl lg:text-7xl font-bold font-display mb-6 leading-tight drop-shadow-2xl">
                    {heading}
                </h1>
                <p className="hidden md:block text-lg md:text-xl text-brand-200 max-w-3xl font-light leading-relaxed drop-shadow-lg">
                    {subhead}
                </p>
            </div>
        </section>
    );
}
