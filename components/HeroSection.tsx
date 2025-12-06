'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

interface HeroSectionProps {
  data?: {
    title?: string;
    subtitle?: string;
    backgroundImage?: any;
    mobileBackgroundImage?: any;
    ctaText?: string;
    ctaLink?: string;
    secondaryCtaText?: string;
    secondaryCtaLink?: string;
  };
}

const HeroSection: React.FC<HeroSectionProps> = ({ data }) => {
  const title = data?.title || "Cielito's Wrld";
  const subtitle = data?.subtitle || "Visual stories & late night thoughts.";
  const ctaText = data?.ctaText || "View Gallery";
  const ctaLink = data?.ctaLink || "/gallery";
  const secondaryCtaText = data?.secondaryCtaText || "Read My Blog";
  const secondaryCtaLink = data?.secondaryCtaLink || "/blog";
  const { backgroundImage, mobileBackgroundImage } = data || {};

  // Use mobile background if available, otherwise fall back to desktop background
  const desktopBgUrl = backgroundImage ? urlFor(backgroundImage).url() : null;
  const mobileBgUrl = mobileBackgroundImage ? urlFor(mobileBackgroundImage).url() : desktopBgUrl;

  const isDesktopVideo = desktopBgUrl ? (desktopBgUrl.endsWith('.gif') || desktopBgUrl.endsWith('.mp4')) : false;
  const isMobileVideo = mobileBgUrl ? (mobileBgUrl.endsWith('.gif') || mobileBgUrl.endsWith('.mp4')) : false;

  return (
    <section className="relative h-[105vh] sm:h-[85vh] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="relative h-full w-full overflow-hidden">
          {/* Desktop Background */}
          {desktopBgUrl && (
            <>
              {isDesktopVideo ? (
                <img
                  src={desktopBgUrl}
                  alt="Animated hero background"
                  aria-label="Animated hero background"
                  tabIndex={0}
                  className="hidden sm:block object-cover w-full h-full"
                  style={{ position: 'absolute', inset: 0 }}
                />
              ) : (
                <Image
                  src={desktopBgUrl}
                  alt="Hero background"
                  fill
                  priority
                  className="hidden sm:block object-cover"
                  sizes="100vw"
                />
              )}
            </>
          )}

          {/* Mobile Background */}
          {mobileBgUrl && (
            <>
              {isMobileVideo ? (
                <img
                  src={mobileBgUrl}
                  alt="Animated hero background"
                  aria-label="Animated hero background"
                  tabIndex={0}
                  className="sm:hidden object-cover w-full h-full"
                  style={{ position: 'absolute', inset: 0 }}
                />
              ) : (
                <Image
                  src={mobileBgUrl}
                  alt="Hero background"
                  fill
                  priority
                  className="sm:hidden object-cover"
                  sizes="100vw"
                />
              )}
            </>
          )}
          {/* Semi-transparent overlay */}
          <div className="absolute inset-0 bg-[#33361c]/40" />
          {/* Bottom gradient for navbar integration - mobile only */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/30 to-transparent sm:hidden" />
        </div>
      </div>

      {/* Content - Mobile-first vertical stacking */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-end pb-32 sm:pb-12 md:justify-center md:pb-0 px-3 sm:px-4 md:px-6 text-center text-white">
        <div className="max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl w-full">
          {/* Title - Mobile-first typography scaling */}
          <h1 className="font-fitzgerald-bold text-5xl leading-tight drop-shadow-md sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl italic mb-3 sm:mb-4 md:mb-6">
            {title}
          </h1>

          {/* Subtitle - Responsive typography */}
          <p className="font-inter text-sm leading-relaxed sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-6 sm:mb-8 md:mb-10 lg:mb-12 px-2 sm:px-4 md:px-0">
            {subtitle}
          </p>

          {/* CTA Buttons - Mobile-first stacking */}
          <div className="flex flex-col space-y-3 sm:space-y-4 md:flex-row md:space-y-0 md:space-x-4 lg:space-x-6 justify-center items-center w-full">
            <Link
              href={ctaLink}
              className="font-inter w-full max-w-xs sm:max-w-sm md:w-auto inline-block rounded-lg bg-orange-600 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base text-white transition-all duration-300 hover:bg-orange-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 shadow-lg"
            >
              {ctaText}
            </Link>
            <Link
              href={secondaryCtaLink}
              className="font-inter w-full max-w-xs sm:max-w-sm md:w-auto inline-block rounded-lg border-2 border-white bg-transparent px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base text-white transition-all duration-300 hover:bg-white/10 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 backdrop-blur-sm"
            >
              {secondaryCtaText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
