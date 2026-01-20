'use client';

import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight, Camera } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface GalleryItem {
    id: string;
    image: string; // URL string for now
    title: string;
    caption: string;
}

interface ProcessGalleryProps {
    items: GalleryItem[];
}

export default function ProcessGallery({ items }: ProcessGalleryProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        loop: false, // No auto-loop for process steps, creating linear flow
        breakpoints: {
            '(min-width: 768px)': { align: 'start' }
        }
    });

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
    const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);

        return () => {
            emblaApi.off('select', onSelect);
            emblaApi.off('reInit', onSelect);
        };
    }, [emblaApi, onSelect]);

    if (!items || items.length === 0) return null;

    return (
        <div className="w-full relative">
            {/* Controls Header */}
            <div className="flex items-center justify-between mb-8 px-6 md:px-0 container mx-auto max-w-5xl">
                <div className="flex items-center gap-2 text-stone-900 dark:text-white">
                    <h3 className="text-xl font-bold font-display">Work in Action</h3>
                    <span className="text-xs font-mono text-stone-500 uppercase tracking-wider hidden md:inline-block border-l border-stone-200 dark:border-stone-800 pl-3 ml-1">
                        From Raw to Polished
                    </span>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={scrollPrev}
                        disabled={!canScrollPrev}
                        className={cn(
                            "w-10 h-10 rounded-full border border-stone-200 dark:border-stone-800 flex items-center justify-center transition-all",
                            !canScrollPrev
                                ? "opacity-30 cursor-not-allowed text-stone-400"
                                : "text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:border-stone-300 dark:hover:border-stone-700"
                        )}
                        aria-label="Previous slide"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={scrollNext}
                        disabled={!canScrollNext}
                        className={cn(
                            "w-10 h-10 rounded-full bg-stone-900 dark:bg-stone-100 flex items-center justify-center transition-all",
                            !canScrollNext
                                ? "opacity-30 cursor-not-allowed bg-stone-300 dark:bg-stone-700"
                                : "text-white dark:text-stone-900 hover:bg-stone-700 dark:hover:bg-stone-200"
                        )}
                        aria-label="Next slide"
                    >
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Carousel Track */}
            <div className="overflow-hidden cursor-grab active:cursor-grabbing pb-12" ref={emblaRef}>
                <div className="flex touch-pan-y" style={{ marginLeft: "calc(max((100vw - 1024px) / 2, 24px))" /* Centers start on desktop, padded on mobile */ }}>
                    {items.map((item, index) => (
                        <div
                            key={item.id}
                            className="flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_350px] min-w-0 pr-6"
                        >
                            <div className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-stone-200 dark:bg-stone-800 shadow-md">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-90" />

                                <div className="absolute bottom-0 left-0 p-6 w-full text-white">
                                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-3 text-white">
                                        <Camera className="w-4 h-4" />
                                    </div>
                                    <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                                    <p className="text-sm text-stone-300 leading-snug">{item.caption}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* Spacer at the end for scrolling comfort */}
                    <div className="flex-[0_0_24px]" />
                </div>
            </div>

            {/* Mobile Indicators */}
            <div className="flex justify-center -mt-6 gap-2 md:hidden">
                {scrollSnaps.map((_, index) => (
                    <button
                        key={index}
                        className={cn(
                            "w-1.5 h-1.5 rounded-full transition-all duration-300",
                            index === selectedIndex
                                ? "bg-stone-900 w-4 dark:bg-stone-100"
                                : "bg-stone-300 dark:bg-stone-700"
                        )}
                        onClick={() => scrollTo(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

        </div>
    );
}
