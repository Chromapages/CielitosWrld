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
  LucideIcon
} from 'lucide-react';
import { urlFor, sanityLoader } from '@/sanity/lib/image';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import AboutCarousel from './AboutCarousel';
import { MobileSection } from '../layout/MobileSection';

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
    bio?: string;
    content?: string; 
    title?: string;
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
      src: data.image?.asset?.url || urlFor(data.image).width(800).height(1000).fit('crop').url(),
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
      label: data?.ctaPrimary?.label || 'Learn More',
      link: data?.ctaPrimary?.link || '/about'
    },
    ctaSecondary: {
      label: data?.ctaSecondary?.label || "Let's Create Together",
      link: data?.ctaSecondary?.link || '/contact'
    }
  };

  return (
    <MobileSection className="bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 overflow-hidden" hasGutter={false}>
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          {/* LEFT COLUMN: IMAGE */}
          <div className="w-full lg:w-1/2 relative group">
            {/* Decorative Elements */}
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-orange-100 dark:bg-orange-900/10 rounded-full blur-3xl -z-10 transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute -top-8 -left-8 w-64 h-64 bg-stone-100 dark:bg-stone-800/50 rounded-full blur-3xl -z-10" />

            {/* Main Image Container */}
            <div className="relative aspect-[4/5] w-full max-w-lg mx-auto lg:max-w-none rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-stone-900/5 dark:ring-white/5 bg-stone-200 dark:bg-stone-800">
              <Image
                loader={sanityLoader}
                src={displayData.profileImage.src}
                alt={displayData.profileImage.alt}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                placeholder={displayData.profileImage.blurDataURL ? 'blur' : 'empty'}
                blurDataURL={displayData.profileImage.blurDataURL}
                suppressHydrationWarning
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[2rem]" />
            </div>
          </div>

          {/* RIGHT COLUMN: CONTENT */}
          <div className="w-full lg:w-1/2 flex flex-col space-y-10">
            {/* 1. Header Block */}
            <div className="space-y-4 text-center lg:text-left">
              <span className="inline-block text-[13px] font-semibold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-500 mb-2">
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

            {/* 3. Value Props Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {displayData.features.map((feature, idx) => {
                const Icon = ICON_MAP[feature.icon] || Sparkles;
                return (
                  <div
                    key={idx}
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center text-orange-600 dark:text-orange-400">
                      <Icon className="w-5 h-5" suppressHydrationWarning />
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

            {/* 4. CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center lg:justify-start">
              <Link
                href={displayData.ctaPrimary.link}
                className="btn-press inline-flex items-center justify-center h-12 px-8 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-full font-bold transition-all hover:scale-105 hover:shadow-lg text-base w-full sm:w-auto"
              >
                {displayData.ctaPrimary.label}
              </Link>
              <Link
                href={displayData.ctaSecondary.link}
                className="btn-press inline-flex items-center justify-center h-12 px-8 text-stone-600 dark:text-stone-300 hover:text-orange-600 dark:hover:text-orange-400 font-bold transition-colors group w-full sm:w-auto"
              >
                {displayData.ctaSecondary.label}
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" suppressHydrationWarning />
              </Link>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Bottom Carousel strip */}
      <div className="mt-20">
        <AboutCarousel images={data?.carouselImages} />
      </div>
    </MobileSection>
  );
}