'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { client } from '@/sanity/lib/client';
import { urlFor, sanityLoader } from '@/sanity/lib/image';

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

    if (images.length === 0) return null;

    return (
        <div className="w-full overflow-hidden py-12 bg-white dark:bg-stone-950" ref={emblaRef}>
            <div className="flex touch-pan-y gap-4 md:gap-6 px-4">
                {images.map((item) => (
                    <div
                        key={item._id}
                        className="flex-[0_0_80%] sm:flex-[0_0_45%] md:flex-[0_0_30%] lg:flex-[0_0_22%] min-w-0 relative aspect-[3/4] rounded-xl overflow-hidden shadow-md select-none"
                    >
                        <Image
                            loader={sanityLoader}
                            src={item.image.asset.url || urlFor(item.image).width(600).height(800).fit('crop').url()}
                            alt={item.image.alt || item.title}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 25vw"
                            placeholder={item.image.asset.metadata?.lqip ? 'blur' : 'empty'}
                            blurDataURL={item.image.asset.metadata?.lqip}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
