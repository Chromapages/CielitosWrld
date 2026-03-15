'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { client } from '@/sanity/lib/client';
import { urlFor, sanityLoader } from '@/sanity/lib/image';
import { cn } from '@/lib/utils';

interface CarouselImage {
    _id: string;
    title: string;
    image: {
        asset: {
            _id: string;
            url: string;
            metadata?: { lqip: string };
        };
        alt: string;
    };
}

interface AboutCarouselProps {
    images?: CarouselImage[];
}

export default function AboutCarousel({ images = [] }: AboutCarouselProps) {
    const [emblaRef] = useEmblaCarousel(
        {
            loop: true,
            dragFree: true,
            containScroll: false
        },
        [
            AutoScroll({
                playOnInit: true,
                speed: 1,
                stopOnInteraction: false,
                stopOnMouseEnter: true
            })
        ]
    );

    // No internal fetch anymore

    return (
        <section className="bg-white dark:bg-stone-950">
            {/* Mobile Bento Grid */}
            <div
                className="md:hidden grid grid-cols-2 grid-rows-2 gap-2 px-4 pb-2"
                style={{
                    gridTemplateRows: 'repeat(2, calc((100vw - 3rem) / 2))'
                }}
            >
                {images.slice(0, 3).map((item, i) => {
                    const isTall = i % 3 === 0;
                    return (
                        <div
                            key={item._id}
                            className={cn(
                                "relative rounded-xl overflow-hidden shadow-md select-none group",
                                isTall ? "row-span-2" : "row-span-1"
                            )}
                        >
                            <Image
                                loader={sanityLoader}
                                src={item.image.asset.url || urlFor(item.image).width(800).height(1200).fit('crop').url()}
                                alt={item.image.alt || item.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="50vw"
                                placeholder={item.image.asset.metadata?.lqip ? 'blur' : 'empty'}
                                blurDataURL={item.image.asset.metadata?.lqip}
                                priority={i < 4}
                            />
                            {/* Visual polish for mobile grid */}
                            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
                        </div>
                    );
                })}
            </div>

            {/* Desktop Carousel (Existing Embla logic) */}
            <div className="hidden md:block w-full overflow-hidden py-12" ref={emblaRef}>
                <div className="flex touch-pan-y gap-6 px-4">
                    {images.map((item) => (
                        <div
                            key={item._id}
                            className="flex-[0_0_30%] lg:flex-[0_0_22%] min-w-0 relative aspect-[3/4] rounded-xl overflow-hidden shadow-md select-none group"
                        >
                            <Image
                                loader={sanityLoader}
                                src={item.image.asset.url || urlFor(item.image).width(600).height(800).fit('crop').url()}
                                alt={item.image.alt || item.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                sizes="(max-width: 1024px) 45vw, 25vw"
                                placeholder={item.image.asset.metadata?.lqip ? 'blur' : 'empty'}
                                blurDataURL={item.image.asset.metadata?.lqip}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
