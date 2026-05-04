'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronDown } from 'lucide-react';
import { urlFor, sanityLoader } from '@/sanity/lib/image';
import { MobileSection } from '../layout/MobileSection';

interface CollaborationItem {
  name: string;
  asset: {
    _id: string;
    url: string;
  };
  alt?: string;
}

interface LogoItemProps {
  item: CollaborationItem;
  className?: string;
}

function LogoItem({ item, className = '' }: LogoItemProps) {
  return (
    <div className={`flex items-center justify-center transition-all duration-300 ${className}`}>
      {item.asset?.url ? (
        <div className="relative h-10 w-28">
          <Image
            loader={sanityLoader}
            src={item.asset.url || urlFor(item.asset).url()}
            alt={item.alt || item.name || 'Partner Logo'}
            fill
            className="object-contain grayscale hover:grayscale-0 dark:brightness-0 dark:invert dark:hover:invert-0 dark:hover:brightness-100"
            suppressHydrationWarning
          />
        </div>
      ) : (
        <p className="font-bold text-[#371d13] dark:text-stone-400 text-lg uppercase tracking-tight">
          {item.name}
        </p>
      )}
    </div>
  );
}

interface SocialProofProps {
  data?: {
    title?: string;
    backgroundImage?: any;
    logos?: CollaborationItem[];
  };
}

export default function SocialProof({ data }: SocialProofProps) {

  // Display data
  const displayData = {
    heading: data?.title || 'Collaborations',
    items: data?.logos || []
  };

  // Don't render section if no logos
  if (displayData.items.length === 0) return null;

  // State for mobile expansion
  const [isExpanded, setIsExpanded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Embla carousel for mobile expanded view
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start', containScroll: 'trimSnaps' });
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Handle reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Scroll to selected slide when using dot indicators
  const scrollTo = useCallback((index: number) => {
    if (emblaApi) {
      emblaApi.scrollTo(index);
    }
  }, [emblaApi]);

  // Handle embla scroll to update dot indicators
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi, onSelect]);

  const totalPartners = displayData.items.length;
  const previewCount = 4;

  return (
    <MobileSection
      aria-labelledby="collaborations-title"
      className="relative bg-neutral-200 dark:bg-stone-900 border-t border-neutral-300 dark:border-stone-800 py-10 md:py-16 lg:py-20"
    >
      {/* Optional Background Image */}
      {data?.backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            loader={sanityLoader}
            src={data.backgroundImage?.asset?.url || urlFor(data.backgroundImage).url()}
            alt="Abstract texture background"
            fill
            className="object-cover opacity-50"
            placeholder={data.backgroundImage?.asset?.metadata?.lqip ? 'blur' : 'empty'}
            blurDataURL={data.backgroundImage?.asset?.metadata?.lqip}
            suppressHydrationWarning
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-200/80 via-neutral-200/50 to-neutral-200/80 dark:from-stone-900/80 dark:via-stone-900/50 dark:to-stone-900/80" />
        </div>
      )}

      <div className="relative z-10 md:px-8 lg:px-12">
        <h2
          id="collaborations-title"
          className="text-center text-3xl md:text-5xl font-pattaya italic text-neutral-800 dark:text-stone-200 mb-8"
        >
          {displayData.heading}
        </h2>

        {/* Mobile: static preview or carousel */}
        <div className="md:hidden">
          {!isExpanded ? (
            // Collapsed: show preview
            <div className="flex flex-col items-center">
              <div className="flex justify-center items-center gap-8">
                {displayData.items.slice(0, previewCount).map((item, index) => (
                  <LogoItem key={index} item={item} className="opacity-70" />
                ))}
              </div>
              <button
                onClick={() => setIsExpanded(true)}
                disabled={prefersReducedMotion}
                className="mt-6 mx-auto flex items-center gap-2 px-5 py-2.5 bg-stone-200 dark:bg-stone-800 rounded-full text-sm font-medium text-stone-700 dark:text-stone-300 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>See all {totalPartners} partners</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          ) : (
            // Expanded: embla carousel
            <div className="flex flex-col items-center">
              <div className="overflow-hidden w-full" ref={emblaRef}>
                <div className="flex touch-pan-y pl-[var(--mobile-gutter)]">
                  {displayData.items.map((item, index) => (
                    <div key={index} className="flex-[0_0_75%] min-w-0 pr-4">
                      <LogoItem item={item} />
                    </div>
                  ))}
                </div>
              </div>
              {/* Dot indicators */}
              <div className="flex justify-center items-center gap-2 mt-4">
                {displayData.items.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === selectedIndex
                        ? 'bg-stone-700 dark:bg-stone-300 w-3'
                        : 'bg-stone-400 dark:bg-stone-600'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="mt-4 mx-auto flex items-center gap-2 px-5 py-2.5 bg-stone-200 dark:bg-stone-800 rounded-full text-sm font-medium text-stone-700 dark:text-stone-300 active:scale-95 transition-all"
              >
                <span>Show less</span>
              </button>
            </div>
          )}
        </div>

        {/* Desktop: wrapped flex grid (unchanged) */}
        <div className="hidden md:flex flex-wrap justify-center items-center gap-12 lg:gap-16">
          {displayData.items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-2 opacity-80 hover:opacity-100 grayscale hover:grayscale-0 dark:brightness-0 dark:invert dark:hover:invert-0 dark:hover:brightness-100 transition-all duration-300"
            >
              {item.asset?.url ? (
                <div className="relative h-16 w-40">
                  <Image
                    loader={sanityLoader}
                    src={item.asset.url || urlFor(item.asset).url()}
                    alt={item.alt || item.name || 'Partner Logo'}
                    fill
                    className="object-contain"
                    suppressHydrationWarning
                  />
                </div>
              ) : (
                <div className="text-center font-bold">
                  <p className="text-[#371d13] dark:text-stone-400 text-lg uppercase tracking-tight">Partner</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </MobileSection>
  );
}
