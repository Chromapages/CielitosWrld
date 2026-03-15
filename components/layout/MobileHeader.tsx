'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Camera } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';

export default function MobileHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "md:hidden fixed top-0 left-0 right-0 z-50 flex flex-col justify-end transition-all duration-300",
        scrolled
          ? "bg-white dark:bg-stone-950 shadow-md border-b border-stone-200 dark:border-stone-800"
          : "bg-white dark:bg-stone-950 border-b border-transparent"
      )}
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        height: 'calc(4rem + env(safe-area-inset-top))',
      }}
    >
      <div className="flex items-center justify-between px-6 h-16">
        <Link
          href="/"
          className="flex items-center gap-2 text-brand-900 dark:text-white group focus-visible:outline-2 focus-visible:outline-orange-500 focus-visible:outline-offset-4 focus-visible:rounded-sm"
          aria-label="Cielito's Wrld - Go to homepage"
        >
          <div 
            aria-hidden="true"
            className="size-5 text-orange-600 dark:text-orange-500 transition-transform duration-300 group-hover:scale-110"
          >
            <Camera className="w-full h-full" />
          </div>
          <span className="text-lg font-bold tracking-tight font-pattaya">
            Cielito's Wrld
          </span>
        </Link>
        <div className="p-1 -mr-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
