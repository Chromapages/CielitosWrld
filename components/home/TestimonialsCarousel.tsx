'use client';

import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Quote, MessageSquareHeart, Star, Plus, ArrowLeft, ArrowRight } from 'lucide-react';
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
    <section className="relative py-20 md:py-32 bg-stone-50 dark:bg-stone-950 overflow-hidden border-t border-stone-200 dark:border-stone-900">

      {/* Background Image (Optional) */}
      {data?.backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={urlFor(data.backgroundImage).url()}
            alt="Abstract texture background"
            fill
            className="object-cover opacity-[0.03]"
            placeholder={data.backgroundImage.metadata?.lqip ? 'blur' : 'empty'}
            blurDataURL={data.backgroundImage.metadata?.lqip}
          />
        </div>
      )}

      <div className="container mx-auto px-4 md:px-8 max-w-[1600px] relative z-10">

        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <MessageSquareHeart className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-medium tracking-[0.2em] uppercase text-stone-500">{displayData.badge}</span>
            </div>
            <h2 className="font-pattaya text-5xl md:text-7xl font-bold text-stone-900 dark:text-stone-50 mb-6 margin-balance leading-tight">
              {displayData.heading}
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-lg md:text-xl font-light leading-relaxed">
              {displayData.description}
            </p>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <button className="btn-press mt-8 inline-flex items-center gap-2 px-6 py-3 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-full text-sm font-medium hover:scale-105 transition-transform shadow-lg">
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-3">
            <button
              onClick={scrollPrev}
              className="btn-press w-14 h-14 rounded-full border border-stone-200 dark:border-stone-800 flex items-center justify-center text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <button
              onClick={scrollNext}
              className="btn-press w-14 h-14 rounded-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 flex items-center justify-center hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors shadow-md"
              aria-label="Next testimonial"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative" ref={emblaRef}>
          <div className="flex -ml-6">
            {testimonials.map((t, i) => (
              <div key={i} className="flex-[0_0_100%] md:flex-[0_0_50%] xl:flex-[0_0_33.333%] pl-6 min-w-0">
                <div className="bg-white dark:bg-stone-900 p-8 rounded-[2rem] border border-stone-100 dark:border-stone-800 hover:border-orange-200 dark:hover:border-orange-900/50 transition-colors shadow-sm flex flex-col h-full group relative">

                  {/* Quote Icon Background */}
                  <Quote className="absolute top-6 right-6 w-12 h-12 text-stone-100 dark:text-stone-800 -z-0 transition-transform group-hover:scale-110 duration-500" />

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Stars */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(t.rating || 5)].map((_, stars) => (
                        <Star key={stars} className="w-4 h-4 text-orange-400 fill-orange-400" />
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-lg md:text-xl font-bold font-sans text-stone-900 dark:text-stone-100 leading-relaxed mb-6 flex-grow">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>

                    {/* Author */}
                    <div className="mt-auto pt-8 border-t border-stone-100 dark:border-stone-800 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-stone-200 relative shrink-0 border border-white dark:border-stone-800 shadow-sm">
                        {t.avatar ? (
                          <Image
                            src={urlFor(t.avatar).width(100).url()}
                            alt={t.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-orange-100 text-orange-600 font-bold text-sm">
                            {t.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-stone-900 dark:text-stone-100 text-base">
                          {t.name}
                        </div>
                        {(t.role || t.company) && (
                          <div className="text-sm text-stone-500 dark:text-stone-400 uppercase tracking-wide font-medium">
                            {t.role} {t.role && t.company && '•'} {t.company}
                          </div>
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
                "w-2 h-2 rounded-full transition-all duration-300",
                index === selectedIndex
                  ? "bg-stone-900 w-8 dark:bg-stone-100"
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

export default TestimonialsCarousel;