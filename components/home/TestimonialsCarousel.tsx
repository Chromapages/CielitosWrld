'use client';

import { useState } from 'react';
import { Quote, MessageSquareHeart, Star, Plus } from 'lucide-react';
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
  highlight?: boolean;
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

const TestimonialsSection = ({ data }: TestimonialsSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // If no items, safely handle or return null (optional: return empty state if editing in studio)
  const testimonials = data?.items || [];
  if (testimonials.length === 0) return null;

  const displayData = {
    badge: data?.badge || 'Client Love',
    heading: data?.title || 'Kind Words',
    description: data?.description || "Hear from the artists, brands, and individuals I've had the pleasure of capturing.",
  };

  // Logic to separate "Highlight/Hero" testimonial vs grid items
  // If a highlight exists, use it. Otherwise use the first item as hero.
  const heroIndex = testimonials.findIndex(t => t.highlight) !== -1
    ? testimonials.findIndex(t => t.highlight)
    : 0;

  const heroTestimonial = testimonials[heroIndex];

  // Grid items are everyone else (limit to 4 for the 2x2 grid)
  const gridTestimonials = testimonials.filter((_, idx) => idx !== heroIndex).slice(0, 4);

  return (
    <section className="relative py-20 md:py-32 bg-stone-50 dark:bg-stone-950 overflow-hidden border-t border-stone-200 dark:border-stone-900">

      {/* Background Image (Optional) */}
      {data?.backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={urlFor(data.backgroundImage).url()}
            alt="Background"
            fill
            className="object-cover opacity-[0.03]"
            placeholder={data.backgroundImage.metadata?.lqip ? 'blur' : 'empty'}
            blurDataURL={data.backgroundImage.metadata?.lqip}
          />
        </div>
      )}

      <div className="container mx-auto px-4 md:px-8 max-w-[1600px] relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
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
          </div>

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-full text-sm font-medium hover:scale-105 transition-transform shadow-lg">
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

        {/* LAYOUT: Hero (Left) + Grid (Right) */}
        <div className="flex flex-col xl:flex-row gap-6 md:gap-8">

          {/* HERO CARD (50% on XL) */}
          <div className="w-full xl:w-1/2 flex">
            <div className="bg-white dark:bg-stone-900 rounded-[2rem] p-8 md:p-12 flex flex-col shadow-xl border border-stone-100 dark:border-stone-800 relative overflow-hidden group w-full">
              {/* Decorative Quote Mark */}
              <Quote className="absolute top-8 right-8 w-24 h-24 text-stone-100 dark:text-stone-800 -rotate-12 transition-transform group-hover:rotate-0 duration-500" />

              {/* Stars */}
              <div className="flex gap-1 mb-8 relative z-10">
                {[...Array(heroTestimonial.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-orange-400 fill-orange-400" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="relative z-10 text-2xl md:text-3xl font-medium text-stone-900 dark:text-stone-100 leading-snug mb-10 flex-grow font-display">
                &ldquo;{heroTestimonial.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="relative z-10 flex items-center gap-4 mt-auto">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-stone-200 relative shrink-0 border-2 border-white dark:border-stone-800 shadow-sm">
                  {heroTestimonial.avatar ? (
                    <Image
                      src={urlFor(heroTestimonial.avatar).width(100).url()}
                      alt={heroTestimonial.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-orange-100 text-orange-600 font-bold text-xl">
                      {heroTestimonial.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <div className="font-bold text-lg text-stone-900 dark:text-stone-100">
                    {heroTestimonial.name}
                  </div>
                  <div className="text-stone-500 dark:text-stone-400 text-sm font-medium uppercase tracking-wide">
                    {heroTestimonial.role} {heroTestimonial.company && `• ${heroTestimonial.company}`}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* GRID OF SMALLER CARDS (50% on XL) */}
          <div className="w-full xl:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {gridTestimonials.map((t, i) => (
              <div key={i} className="bg-white dark:bg-stone-900 p-8 rounded-3xl border border-stone-100 dark:border-stone-800 hover:border-orange-200 dark:hover:border-orange-900/50 transition-colors shadow-sm flex flex-col h-full">

                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating || 5)].map((_, stars) => (
                    <Star key={stars} className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
                  ))}
                </div>

                <p className="text-stone-700 dark:text-stone-300 text-base leading-relaxed mb-6 flex-grow font-light italic">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3 mt-auto pt-6 border-t border-stone-100 dark:border-stone-800">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-stone-200 relative shrink-0 border border-white dark:border-stone-800">
                    {t.avatar ? (
                      <Image
                        src={urlFor(t.avatar).width(64).url()}
                        alt={t.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-orange-50 text-orange-600 font-bold text-sm">
                        {t.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-bold text-stone-900 dark:text-stone-100 text-sm">{t.name}</div>
                    {(t.role || t.company) && (
                      <div className="text-xs text-stone-500 dark:text-stone-500 truncate max-w-[120px]">
                        {t.role}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;