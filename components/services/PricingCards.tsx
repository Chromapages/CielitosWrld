'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from "next/link";
import { Users, Check, ArrowRight } from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react';
import { ServicePackage } from "@/types/services";
import { cn } from '@/lib/utils';
import { MobileSection } from "../layout/MobileSection";

interface PricingCardsProps {
    packages: ServicePackage[];
}

export default function PricingCards({ packages }: PricingCardsProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: 'start',
        containScroll: 'trimSnaps'
    });
    const [selectedIndex, setSelectedIndex] = useState(0);
    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);
    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on('select', onSelect);
        return () => { emblaApi.off('select', onSelect); };
    }, [emblaApi, onSelect]);

    const renderCard = (pkg: ServicePackage, index: number, isMobile: boolean = false) => (
        <div
            key={pkg._id}
            className={`group relative flex flex-col p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${pkg.popular
                ? 'bg-white dark:bg-brand-900 border-orange-500/50 shadow-orange-500/10 shadow-lg hover:shadow-orange-500/20'
                : 'bg-white dark:bg-brand-900 border-brand-200 dark:border-brand-800 shadow-sm hover:border-orange-300 dark:hover:border-orange-800'
                } ${isMobile ? 'flex-[0_0_92%] min-w-0 mx-2 first:ml-4 last:mr-4' : ''}`}
            style={{ animationDelay: `${index * 100}ms` }}
        >
            {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-orange-500 text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-md">
                    Most Popular
                </div>
            )}

            <div className="mb-6">
                <h3 className="text-xl font-bold font-archivo text-brand-900 dark:text-white mb-2">{pkg.name}</h3>
                {pkg.tagline && <p className="text-sm text-brand-500 dark:text-brand-400">{pkg.tagline}</p>}

                {/* Target Audience Badge */}
                {pkg.targetAudience && (
                    <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-brand-100 dark:bg-brand-800 text-brand-600 dark:text-brand-400 text-xs font-medium rounded-full">
                        <Users className="w-3 h-3" />
                        Best for: {pkg.targetAudience}
                    </div>
                )}
            </div>

            <div className="mb-8">
                <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-brand-900 dark:text-white">{pkg.price}</span>
                    {pkg.priceNote && <span className="text-sm text-brand-500 font-medium">{pkg.priceNote}</span>}
                </div>
            </div>

            <ul className="space-y-4 mb-8 flex-grow">
                {pkg.features?.map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-brand-600 dark:text-brand-300 group/item">
                        <Check className="w-5 h-5 text-orange-500 shrink-0 transition-transform duration-200 group-hover/item:scale-110" />
                        <span className="leading-tight">{feature}</span>
                    </li>
                ))}
            </ul>

            <Link
                href={pkg.ctaLink || '/contact'}
                className={`group/btn w-full py-3 px-6 rounded-xl font-bold text-center transition-all duration-300 hover:shadow-lg active:scale-[0.98] ${pkg.popular
                    ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-md'
                    : 'bg-brand-100 dark:bg-brand-800 text-brand-900 dark:text-white hover:bg-brand-200 dark:hover:bg-brand-700'
                    }`}
            >
                <span className="inline-flex items-center gap-2">
                    {pkg.ctaText || 'Book Now'}
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </span>
            </Link>
        </div>
    );

    const renderCustomQuote = (isMobile: boolean = false) => (
        <div className={`flex flex-col p-8 rounded-3xl border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-950/50 flex items-center justify-center text-center ${isMobile ? 'flex-[0_0_92%] min-w-0 mx-2 first:ml-4 last:mr-4' : ''}`}>
            <h3 className="text-xl font-bold text-brand-900 dark:text-white mb-2">Custom Project?</h3>
            <p className="text-brand-500 dark:text-brand-400 text-sm mb-6">Need something specific? Let's create a custom package just for you.</p>
            <Link href="/contact" className="text-orange-600 font-bold hover:underline underline-offset-4 decoration-2">
                Get a Custom Quote →
            </Link>
        </div>
    );


    return (
        <MobileSection id="pricing" className="pt-16 lg:pt-32 pb-16 lg:pb-32 relative z-20">
            <h2 className="text-center text-4xl md:text-5xl font-archivo font-bold tracking-tight mb-20 text-brand-950 dark:text-white">
                Choose Your Experience
            </h2>

                {/* DESKTOP GRID */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {packages.map((pkg, index) => renderCard(pkg, index, false))}
                    {packages.length < 4 && renderCustomQuote(false)}
                </div>

                {/* MOBILE CAROUSEL */}
                <div className="md:hidden overflow-hidden" ref={emblaRef} data-carousel>
                    <div className="flex touch-pan-y py-4">
                        {packages.map((pkg, index) => renderCard(pkg, index, true))}
                        {packages.length < 4 && renderCustomQuote(true)}
                    </div>
                </div>

                {/* Mobile dot indicators */}
                <div className="flex justify-center gap-2 mt-4 md:hidden">
                    {packages.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => emblaApi?.scrollTo(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            className={cn(
                                'h-2 rounded-full transition-all',
                                i === selectedIndex ? 'w-6 bg-orange-500' : 'w-2 bg-stone-300 dark:bg-stone-600'
                            )}
                        />
                    ))}
                </div>

        </MobileSection>
    );
}
