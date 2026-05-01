'use client';

import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Quote, MessageSquareHeart, Star, Plus, ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { urlFor, sanityLoader } from '@/sanity/lib/image';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from '@/components/ui/visually-hidden';
import ReviewForm from './ReviewForm';
import { MobileSection, MobileSectionHeader } from '../layout/MobileSection';

interface Testimonial {
  name: string;
  role?: string;
  company?: string;
  quote: string;
  avatar?: any;
  rating?: number;
}

interface TestimonialsSectionProps {
  data?: {
    title?: string;
    badge?: string;
    description?: string;
    backgroundImage?: any;
    items?: Testimonial[];
  };
}

const TestimonialsCarousel = ({ data }: TestimonialsSectionProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    breakpoints: {
      '(min-width: 768px)': { align: 'start' }
    }
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const testimonials = data?.items || [];
  if (testimonials.length === 0) return null;

  const displayData = {
    badge: data?.badge || 'Client Love',
    heading: data?.title || 'Kind Words',
    description: data?.description || "Hear from the artists, brands, and individuals I've had the pleasure of capturing.",
  };

  return (
    <MobileSection className="bg-stone-50 dark:bg-stone-950 overflow-hidden border-t border-stone-200 dark:border-stone-900">
      {/* Background Image (Optional) */}
      {data?.backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            loader={sanityLoader}
            src={data.backgroundImage?.asset?.url || urlFor(data.backgroundImage).url()}
            alt="Abstract texture background"
            fill
            className="object-cover opacity-[0.03]"
            placeholder={data.backgroundImage?.asset?.metadata?.lqip ? 'blur' : 'empty'}
            blurDataURL={data.backgroundImage?.asset?.metadata?.lqip}
            suppressHydrationWarning
          />
        </div>
      )}

        <div className="relative z-10">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 md:px-8 lg:px-12">
          <div className="max-w-xl">
            <MobileSectionHeader 
               eyebrow={displayData.badge}
               title={displayData.heading}
               description={displayData.description}
               className="mb-0"
            />

            <div>
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <button className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-full text-sm font-semibold active:scale-95 transition-transform">
                    <Plus className="w-4 h-4" suppressHydrationWarning />
                    Leave a Review
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg bg-white dark:bg-stone-950 border-stone-200 dark:border-stone-800">
                  <VisuallyHidden suppressHydrationWarning>
                    <DialogTitle>Leave a Review</DialogTitle>
                  </VisuallyHidden>
                  <ReviewForm
                    onCancel={() => setIsModalOpen(false)}
                    onSuccess={() => setIsModalOpen(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-3">
            <button
              onClick={scrollPrev}
              className="w-11 h-11 rounded-full bg-stone-100 dark:bg-stone-900 flex items-center justify-center text-stone-900 dark:text-stone-100 active:scale-95 transition-transform"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="w-5 h-5" suppressHydrationWarning />
            </button>
            <button
              onClick={scrollNext}
              className="w-11 h-11 rounded-full bg-stone-100 dark:bg-stone-900 flex items-center justify-center text-stone-900 dark:text-stone-100 active:scale-95 transition-transform"
              aria-label="Next testimonial"
            >
              <ArrowRight className="w-5 h-5" suppressHydrationWarning />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative" ref={emblaRef}>
          <div className="flex -ml-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="flex-[0_0_100%] md:flex-[0_0_50%] xl:flex-[0_0_33.333%] pl-6 min-w-0"
              >
                <div className="bg-white dark:bg-stone-900 p-8 rounded-[18px] border border-stone-100 dark:border-stone-800/60 transition-colors flex flex-col h-full group relative overflow-hidden active:scale-[0.98] transition-transform duration-200">
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Stars */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(t.rating || 5)].map((_, stars) => (
                        <Star key={stars} className="w-3.5 h-3.5 text-orange-400 fill-orange-400" suppressHydrationWarning />
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-[21px] font-semibold leading-[1.19] tracking-[0.231px] text-stone-900 dark:text-stone-100 mb-6 flex-grow">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>

                    {/* Author */}
                    <div className="mt-auto pt-6 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-stone-100 dark:bg-stone-800 relative shrink-0">
                        {t.avatar ? (
                          <Image
                            loader={sanityLoader}
                            src={t.avatar?.url || urlFor(t.avatar).width(100).url()}
                            alt={t.name}
                            fill
                            className="object-cover"
                            placeholder={t.avatar?.metadata?.lqip ? 'blur' : 'empty'}
                            blurDataURL={t.avatar?.metadata?.lqip}
                            suppressHydrationWarning
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 font-bold text-xs uppercase">
                            {t.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[17px] font-semibold tracking-[-0.374px] text-stone-900 dark:text-stone-100 leading-tight">
                          {t.name}
                        </span>
                        {(t.role || t.company) && (
                          <span className="text-[14px] font-normal tracking-[-0.224px] text-stone-500 dark:text-stone-400 leading-tight mt-0.5">
                            {t.role}{t.role && t.company ? ' • ' : ''}{t.company}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Navigation Dots */}
        <div className="flex justify-center mt-10 md:hidden gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={cn(
                "rounded-full transition-all duration-300",
                index === selectedIndex
                  ? "w-8 h-3 bg-stone-900 dark:bg-stone-100"
                  : "w-3 h-3 bg-stone-300 dark:bg-stone-700"
              )}
              onClick={() => scrollTo(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </MobileSection>
  );
};

export default TestimonialsCarousel;
