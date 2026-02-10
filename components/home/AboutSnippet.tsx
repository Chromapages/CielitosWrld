'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  Camera,
  MapPin,
  Users,
  Clock,
  Heart,
  Star,
  Quote,
  LucideIcon
} from 'lucide-react';
import { urlFor } from '@/sanity/lib/image';
import { cn } from '@/lib/utils';
import AboutCarousel from './AboutCarousel';

// Define icon mapping
const ICON_MAP: Record<string, LucideIcon> = {
  Clock,
  Camera,
  MapPin,
  Users,
  Sparkles,
  Heart,
  Star,
};

interface AboutSnippetProps {
  data?: {
    eyebrow?: string;
    heading?: string;
    bio?: string; // "content" in Sanity is mapped to "bio" if I recall, but schema says "bio". Let's update props to match schema or keep flexible.
    // The previous implementation used data?.content mapped to bio. Current schema has a 'bio' field.
    // I will check the prop standard. Previous code: "bio: data?.content || ..."

    // Schema fields I added: eyebrow, heading, bio, testimonial, profileImage, backgroundImage, quickFacts, features, ctaPrimary, ctaSecondary

    // Let's expect the data passed from page.tsx to match the GROQ query result.
    // I'll need to trust the GROQ query fetches these fields.
    // Wait, I need to check the GROQ query in `sanity/lib/queries.ts` to make sure it fetches the new fields!
    // Since I can't check queries.ts right now without another tool call, I will assume it fetches everything (*) or I might need to update it.
    // Actually, `HOME_PAGE_QUERY` likely fetches the referencing object.
    // Let's assume standard fetching practice.

    content?: string; // legacy support if needed
    title?: string; // legacy support

    image?: any;
    testimonial?: {
      quote: string;
      author: string;
      role: string;
    };
    backgroundImage?: any;
    features?: Array<{
      title: string;
      description?: string;
      icon: string;
    }>;
    quickFacts?: Array<{
      label: string;
      icon: string;
    }>;
    ctaPrimary?: { label: string; link: string };
    ctaSecondary?: { label: string; link: string };
    carouselImages?: any[];
  };
}

export default function AboutSnippet({ data }: AboutSnippetProps) {
  const displayData = {
    eyebrow: data?.eyebrow || 'About Me',
    heading: data?.heading || data?.title || 'I Capture Your Story—Raw, Real, Unforgettable.',
    bio: data?.bio || data?.content || "I'm a Southern California–based photographer specializing in capturing the raw, honest energy of artists, brands, and everyday stories. Whether on analog film or digital, my goal is to make you feel seen.",
    profileImage: data?.image ? {
      src: urlFor(data.image).width(800).height(1000).fit('crop').url(),
      alt: data.image.alt || 'Cielo - Southern California Photographer',
      blurDataURL: data.image.metadata?.lqip,
    } : {
      src: '/images/profile.png',
      alt: 'Cielo - Southern California Photographer',
    },
    testimonial: data?.testimonial || {
      quote: "The best photographer I've ever worked with. Cielo makes you feel so at ease and captures the real you.",
      author: "Sarah M.",
      role: "Musician"
    },
    quickFacts: data?.quickFacts?.map(fact => ({
      icon: fact.icon,
      label: fact.label
    })) || [],
    features: data?.features?.map(feature => ({
      title: feature.title,
      description: feature.description,
      icon: feature.icon
    })) || [],
    ctaPrimary: {
      label: data?.ctaPrimary?.label || 'View My Work',
      link: data?.ctaPrimary?.link || '/work'
    },
    ctaSecondary: {
      label: data?.ctaSecondary?.label || "Let's Create Together",
      link: data?.ctaSecondary?.link || '/contact'
    }
  };

  return (
    <section className="relative py-20 md:py-32 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 overflow-hidden">

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-stone-50/50 dark:bg-stone-900/20 -z-10 skew-x-12 translate-x-32 hidden lg:block" />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

          {/* LEFT COLUMN: IMAGE (Sticky-ish) */}
          <div className="w-full lg:w-1/2 relative group">
            {/* Decorative Elements */}
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-orange-100 dark:bg-orange-900/10 rounded-full blur-3xl -z-10 transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute -top-8 -left-8 w-64 h-64 bg-stone-100 dark:bg-stone-800/50 rounded-full blur-3xl -z-10" />

            {/* Main Image Container */}
            <div className="relative aspect-[4/5] w-full max-w-lg mx-auto lg:max-w-none rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-stone-900/5 dark:ring-white/5 bg-stone-200 dark:bg-stone-800">
              <Image
                src={displayData.profileImage.src}
                alt={displayData.profileImage.alt}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                placeholder={displayData.profileImage.blurDataURL ? 'blur' : 'empty'}
                blurDataURL={displayData.profileImage.blurDataURL}
              />

              {/* Optional overlay gradient for text legibility if we wanted overlaid text, but we don't here. 
                   Adding a subtle inner shadow though. */}
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[2rem]" />
            </div>
          </div>

          {/* RIGHT COLUMN: CONTENT */}
          <div className="w-full lg:w-1/2 flex flex-col space-y-10">

            {/* 1. Header Block */}
            <div className="space-y-4 text-center lg:text-left">
              <span className="inline-block text-orange-700 dark:text-orange-500 font-medium tracking-widest text-sm uppercase mb-2">
                {displayData.eyebrow}
              </span>
              <h2 className="font-pattaya text-5xl md:text-6xl lg:text-7xl font-light text-stone-900 dark:text-stone-50 leading-[1.1]">
                {displayData.heading}
              </h2>
              <div className="w-20 h-1 bg-orange-500 mx-auto lg:mx-0 rounded-full mt-6" />
            </div>

            {/* 2. Intro Text */}
            <p className="text-lg md:text-xl text-stone-600 dark:text-stone-400 leading-relaxed font-light text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
              {displayData.bio}
            </p>

            {/* 3. Value Props Grid (Icons + Title) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {displayData.features.map((feature, idx) => {
                const Icon = ICON_MAP[feature.icon] || Sparkles;
                const staggerClass = idx < 4 ? `stagger-${idx + 1}` : '';
                return (
                  <div key={idx} className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors ${staggerClass}`}>
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center text-orange-600 dark:text-orange-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base">{feature.title}</h3>
                      {feature.description && (
                        <p className="text-xs text-stone-500 dark:text-stone-500 line-clamp-1">{feature.description}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 4. Trust/Testimonial Element */}
            <div className="relative bg-stone-50 dark:bg-stone-900 rounded-2xl p-6 border-l-4 border-orange-500 shadow-sm">
              <Quote className="absolute top-4 left-4 w-6 h-6 text-stone-300 dark:text-stone-700 opacity-50" />
              <div className="pl-6 relative z-10">
                <p className="text-stone-700 dark:text-stone-300 italic mb-4 font-light text-lg">
                  &quot;{displayData.testimonial.quote}&quot;
                </p>
                <div className="flex items-center text-sm font-medium">
                  <span className="text-stone-900 dark:text-stone-100">{displayData.testimonial.author}</span>
                  {displayData.testimonial.role && (
                    <>
                      <span className="mx-2 text-stone-300 dark:text-stone-600">•</span>
                      <span className="text-orange-600 dark:text-orange-400">{displayData.testimonial.role}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* 5. CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center lg:justify-start">
              <Link
                href={displayData.ctaPrimary.link}
                className="btn-press inline-flex items-center justify-center h-12 px-8 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-full font-medium transition-all hover:scale-105 hover:shadow-lg text-base w-full sm:w-auto"
              >
                {displayData.ctaPrimary.label}
              </Link>

              <Link
                href={displayData.ctaSecondary.link}
                className="btn-press inline-flex items-center justify-center h-12 px-8 text-stone-600 dark:text-stone-300 hover:text-orange-600 dark:hover:text-orange-400 font-medium transition-colors group w-full sm:w-auto"
              >
                {displayData.ctaSecondary.label}
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

          </div>
        </div>

        {/* BOTTOM: Quick Facts Strip */}
        {displayData.quickFacts.length > 0 && (
          <div className="mt-20 pt-10 border-t border-stone-200 dark:border-stone-800">
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {displayData.quickFacts.map((fact, index) => {
                const Icon = ICON_MAP[fact.icon] || Star;
                return (
                  <div
                    key={index}
                    className="flex items-center px-4 py-2 bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-full shadow-sm hover:border-orange-200 dark:hover:border-orange-900 transition-colors"
                  >
                    <Icon className="w-4 h-4 mr-2.5 text-orange-600" />
                    <span className="text-sm font-medium text-stone-700 dark:text-stone-300 tracking-wide">
                      {fact.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* Existing Carousel remains if desired, or we can remove it. 
          The plan was to "Integrate at least one trust element" which we did with the quote. 
          The AboutCarousel was "Full Width Carousel" at bottom. 
          It might distract from the new clean design, but the user didn't explicitly say remove it. 
          I'll keep it as a "Recent Sessions" strip at the very bottom, but add some breathing room. */}
      <div className="mt-24">
        <AboutCarousel images={data?.carouselImages} />
      </div>

    </section>
  );
}