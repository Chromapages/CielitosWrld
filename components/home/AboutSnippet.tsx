'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Camera, MapPin, Users, Clock, Heart, Star, LucideIcon } from 'lucide-react';
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
    title?: string;
    content?: string;
    image?: any;
    backgroundImage?: any;
    features?: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
    quickFacts?: Array<{
      label: string;
      icon: string;
    }>;
    ctaPrimary?: { label: string; link: string };
    ctaSecondary?: { label: string; link: string };
  };
}

export default function AboutSnippet({ data }: AboutSnippetProps) {
  const displayData = {
    heading: data?.title || 'Meet Cielo',
    bio: data?.content || "I'm a Southern California–based photographer specializing in capturing the raw, honest energy of artists, brands, and everyday stories. Whether on analog film or digital, my goal is to make you feel seen.",
    profileImage: data?.image ? {
      src: urlFor(data.image).width(800).height(1000).fit('crop').url(),
      alt: 'Cielo - Southern California Photographer',
      blurDataURL: data.image.metadata?.lqip,
    } : {
      src: '/images/profile.png',
      alt: 'Cielo - Southern California Photographer',
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
      label: data?.ctaPrimary?.label || 'Learn more about me',
      link: data?.ctaPrimary?.link || '/about'
    },
    ctaSecondary: {
      label: data?.ctaSecondary?.label || 'Work with me',
      link: data?.ctaSecondary?.link || '/contact'
    }
  };

  return (
    <section className="relative pt-16 pb-10 md:pt-24 md:pb-16 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 overflow-hidden">
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

      <div className="container mx-auto px-4 md:px-8 max-w-7xl mb-10 md:mb-12 relative z-10">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-center">

          {/* Left Column: Image */}
          <div className="w-full md:w-1/2 relative group">
            <div className="relative aspect-[4/5] md:aspect-[3/4] w-full overflow-hidden rounded-2xl shadow-xl">
              <Image
                src={displayData.profileImage.src}
                alt={displayData.profileImage.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                placeholder={displayData.profileImage.blurDataURL ? 'blur' : 'empty'}
                blurDataURL={displayData.profileImage.blurDataURL}
              />
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-orange-100 dark:bg-orange-900/20 rounded-full -z-10 blur-2xl" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-stone-100 dark:bg-stone-800 rounded-full -z-10 blur-2xl" />
          </div>

          {/* Right Column: Content */}
          <div className="w-full md:w-1/2 flex flex-col space-y-8 md:space-y-10">

            {/* Header */}
            <div>
              <h2 className="font-pattaya text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-stone-900 dark:text-stone-50">
                {displayData.heading}
              </h2>
              <p className="text-lg md:text-xl text-stone-600 dark:text-stone-400 leading-relaxed font-light">
                {displayData.bio}
              </p>
            </div>

            {/* Mobile-Optimized Scannable Blocks */}
            <div className="grid grid-cols-1 gap-6 md:hidden">
              {displayData.features.map((feature, idx) => (
                <div key={idx} className={cn("border-l-2 pl-4", idx === 0 ? "border-orange-500" : "border-stone-300 dark:border-stone-700")}>
                  <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-1">{feature.title}</h3>
                  <p className="text-sm text-stone-600 dark:text-stone-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Desktop Structured Blocks */}
            <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 gap-8">
              {displayData.features.map((feature, idx) => {
                const Icon = ICON_MAP[feature.icon] || Sparkles;
                return (
                  <div key={idx}>
                    <h3 className="flex items-center text-lg font-bold mb-2 text-stone-900 dark:text-stone-100">
                      <Icon className="w-4 h-4 mr-2 text-orange-600" />
                      {feature.title}
                    </h3>
                    <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Quick Facts Chips */}
            <div className="flex flex-wrap gap-3">
              {displayData.quickFacts.map((fact, index) => {
                const Icon = ICON_MAP[fact.icon] || Star;
                return (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1.5 rounded-full bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-300 text-xs md:text-sm font-medium border border-stone-200 dark:border-stone-800"
                  >
                    <Icon className="w-3 h-3 md:w-4 md:h-4 mr-2 text-orange-600" />
                    {fact.label}
                  </span>
                );
              })}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href={displayData.ctaPrimary.link}
                className="hidden md:inline-flex items-center justify-center px-8 py-3 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-full font-medium transition-transform hover:scale-105 active:scale-95 shadow-lg"
              >
                {displayData.ctaPrimary.label}
              </Link>

              <Link
                href={displayData.ctaSecondary.link}
                className="md:hidden inline-flex items-center justify-center px-8 py-4 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-full font-medium text-lg transition-transform hover:scale-105 active:scale-95 shadow-lg w-full"
              >
                {displayData.ctaSecondary.label}
              </Link>

              <Link
                href="/gallery"
                className="hidden md:inline-flex items-center justify-center px-6 py-3 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 font-medium transition-colors group"
              >
                See recent sessions
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* Full Width Carousel */}
      <AboutCarousel />
    </section>
  );
}