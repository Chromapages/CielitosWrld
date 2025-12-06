'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Camera } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative w-full h-[100dvh] md:h-screen overflow-hidden -mt-16 md:mt-0">

      {/* Background Media */}
      <div className="absolute inset-0 w-full h-full">
        {isMobile ? (
          // Mobile: Static Image for performance & cinematic feel
          <Image
            src="https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg" // Placeholder: Needs a strong portrait/vertical shot
            alt="Cielito shooting in SoCal"
            fill
            className="object-cover object-center"
            priority
            quality={90}
          />
        ) : (
          // Desktop: Video or High-Res Image
          <div className="relative w-full h-full">
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: 'url(https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg)',
              }}
            />
            {/* Optional: Restore video background for desktop if desired later */}
          </div>
        )}

        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80 md:via-black/20 md:to-black/60" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-between px-6 py-8 md:px-12 md:py-20 max-w-7xl mx-auto">

        {/* Top: Logo (Mobile Only) */}
        <div className="md:hidden pt-4 flex justify-center opacity-0 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <div className="flex items-center gap-2 text-white/90 backdrop-blur-sm px-4 py-2 rounded-full bg-white/10 border border-white/10">
            <Camera className="w-4 h-4" />
            <span className="font-display text-lg tracking-wide">Cielito's Wrld</span>
          </div>
        </div>

        {/* Middle/Bottom: Main Content */}
        <div className="flex flex-col justify-end md:justify-center h-full pb-20 md:pb-0 text-center md:text-left">

          {/* Headline */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 md:mb-6 leading-[1.1] tracking-tight opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            Real stories, <br className="hidden md:block" />
            <span className="text-orange-100 italic">captured in SoCal.</span>
          </h1>

          {/* Subcopy */}
          <p className="text-lg md:text-2xl text-stone-200 mb-8 md:mb-10 max-w-xl md:max-w-2xl mx-auto md:mx-0 font-light leading-relaxed opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            Portraits, events, and visual stories for artists and brands who want to be seen.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto opacity-0 animate-fade-in-up" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-stone-900 rounded-full font-bold text-lg transition-transform active:scale-95 hover:bg-stone-100 hover:scale-105 shadow-lg shadow-black/20"
            >
              Book a session
            </Link>
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full font-medium text-lg transition-transform active:scale-95 hover:bg-white/20"
            >
              Browse gallery
            </Link>
          </div>

        </div>
      </div>

      {/* Scroll Indicator (Desktop Only) */}
      <div className="hidden md:block absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </div>

    </section>
  );
}