'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Quote, ArrowLeft, ArrowRight, MessageSquareHeart, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import ReviewForm from './ReviewForm';

interface Testimonial {
  name: string;
  role?: string;
  quote: string;
  avatar?: any;
}

interface TestimonialsCarouselProps {
  data?: {
    title?: string;
    badge?: string;
    description?: string;
    backgroundImage?: any;
    items?: Testimonial[];
  };
}

const TestimonialsSection = ({ data }: TestimonialsCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { align: 'start' },
    },
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollTo = useCallback((index: number) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(index);
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const handleSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    handleSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', handleSelect);
    emblaApi.on('reInit', handleSelect);

    return () => {
      emblaApi.off('select', handleSelect);
      emblaApi.off('reInit', handleSelect);
    };
  }, [emblaApi, handleSelect]);

  const displayData = {
    badge: data?.badge || 'Client Love',
    heading: data?.title || 'Kind Words',
    description: data?.description || "Hear from the artists, brands, and individuals I've had the pleasure of capturing.",
    testimonials: data?.items || []
  };

  // Don't render section if no testimonials
  if (displayData.testimonials.length === 0) return null;

  return (
    <section className="relative pt-10 pb-20 md:pt-16 md:pb-32 bg-white dark:bg-stone-950 overflow-hidden border-t border-stone-100 dark:border-stone-900">
      {/* Optional Background Image */}
      {data?.backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={urlFor(data.backgroundImage).url()}
            alt="Background"
            fill
            className="object-cover opacity-50"
            placeholder={data.backgroundImage.metadata?.lqip ? 'blur' : 'empty'}
            blurDataURL={data.backgroundImage.metadata?.lqip}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/50 to-white/80 dark:from-stone-950/80 dark:via-stone-950/50 dark:to-stone-950/80" />
        </div>
      )}

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <MessageSquareHeart className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-medium tracking-[0.2em] uppercase text-stone-500">{displayData.badge}</span>
            </div>
            <h2 className="font-pattaya text-5xl md:text-7xl font-bold text-stone-900 dark:text-stone-50 mb-6 leading-tight">
              {displayData.heading}
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-lg md:text-xl font-light leading-relaxed">
              {displayData.description}
            </p>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <button className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-stone-100 rounded-full text-sm font-medium hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors border border-stone-200 dark:border-stone-800">
                  <Plus className="w-4 h-4" />
                  Leave a Review
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg bg-white dark:bg-stone-950 border-stone-200 dark:border-stone-800">
                <ReviewForm
                  onCancel={() => setIsModalOpen(false)}
                  onSuccess={() => setIsModalOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </div>

          {/* Desktop Navigation Controls */}
          <div className="hidden md:flex gap-3">
            <button
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full border border-stone-200 dark:border-stone-800 flex items-center justify-center text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className="w-12 h-12 rounded-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 flex items-center justify-center hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors shadow-md"
              aria-label="Next testimonial"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative" ref={emblaRef}>
          <div className="flex -ml-4 md:-ml-6">
            {displayData.testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4 md:pl-6 min-w-0"
              >
                <div className="bg-stone-50 dark:bg-stone-900/50 rounded-2xl p-8 md:p-10 h-full flex flex-col border border-stone-100 dark:border-stone-800 hover:border-orange-200 dark:hover:border-orange-900/30 transition-colors duration-300 group">
                  <Quote className="w-10 h-10 text-orange-200 dark:text-orange-900/40 mb-6 group-hover:text-orange-300 dark:group-hover:text-orange-800/60 transition-colors" />

                  <blockquote className="text-stone-700 dark:text-stone-300 text-lg leading-relaxed mb-8 flex-grow font-light">
                    "{testimonial.quote}"
                  </blockquote>

                  <div className="mt-auto pt-6 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {testimonial.avatar && (
                        <div className="w-10 h-10 rounded-full overflow-hidden relative">
                          <img
                            src={urlFor(testimonial.avatar).url()}
                            alt={testimonial.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      )}
                      {!testimonial.avatar && (
                        <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-700 dark:text-orange-300 font-bold text-sm">
                          {testimonial.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <cite className="font-display text-xl font-bold text-stone-900 dark:text-stone-100 not-italic block">
                          {testimonial.name}
                        </cite>
                        {testimonial.role && (
                          <span className="text-stone-500 dark:text-stone-500 text-sm font-medium uppercase tracking-wide mt-1 block">
                            {testimonial.role}
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
        <div className="flex justify-center mt-8 md:hidden gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === selectedIndex
                  ? "bg-stone-900 w-6 dark:bg-stone-100"
                  : "bg-stone-300 dark:bg-stone-700"
              )}
              onClick={() => scrollTo(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;