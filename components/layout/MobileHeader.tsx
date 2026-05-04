'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Camera, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';

const ROUTE_TITLES: Record<string, string> = {
  '/': "Cielito's Wrld",
  '/gallery': 'Gallery',
  '/services': 'Services',
  '/blog': 'Journal',
  '/contact': 'Book a Session',
  '/work': 'Portfolio',
};

import { useRouter } from 'next/navigation';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function MobileHeader() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBack = () => {
    if (window.history.length > 2) {
      window.history.back();
    } else {
      router.push('/');
    }
  };

  // Determine the display title based on the current path
  const getDisplayTitle = () => {
    if (pathname.startsWith('/blog/')) return 'Journal';
    if (pathname.startsWith('/work/')) return 'Project';
    return ROUTE_TITLES[pathname] || "Cielito's Wrld";
  };

  const isHome = pathname === '/';

  return (
    <header
      className={cn(
        "md:hidden fixed top-0 left-0 right-0 z-[100] flex flex-col justify-end transition-all duration-500",
        scrolled
          ? "bg-white/90 dark:bg-stone-950/90 backdrop-blur-2xl border-b border-stone-200/50 dark:border-white/5 shadow-lg"
          : "bg-white dark:bg-stone-950 border-b border-transparent"
      )}
      style={{
        paddingTop: 'var(--safe-area-top, 0px)',
        height: 'calc(var(--mobile-header-height, 64px) + var(--safe-area-top, 0px))',
      }}
    >
      <div className="flex items-center justify-between px-6 h-16">
        <div className="flex items-center gap-4">
          {!isHome && (
            <button 
              onClick={handleBack}
              className="p-2 -ml-2 text-stone-500 active:scale-90 transition-all dark:text-stone-400"
              aria-label="Go back"
            >
            <ChevronLeft size={24} strokeWidth={2.5} suppressHydrationWarning />
          </button>
        )}
        
        <Link
          href="/"
          className="flex items-center gap-2 text-brand-900 dark:text-white group"
          aria-label="Cielito's Wrld - Go to homepage"
        >
          {isHome && (
            <div 
              aria-hidden="true"
              className="size-5 text-orange-600 dark:text-orange-500 transition-transform duration-500 group-hover:rotate-12"
            >
              <Camera className="w-full h-full" strokeWidth={2.5} suppressHydrationWarning />
            </div>
          )}
            <span className={cn(
               "font-black tracking-tight transition-all duration-300 shrink",
                isHome 
                 ? "text-2xl font-pattaya italic text-stone-900 dark:text-white pr-2" 
                 : "text-xl font-pattaya text-stone-900 dark:text-white truncate max-w-[180px] xs:max-w-[220px]"
             )}>
               {getDisplayTitle()}
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-1">
          <ThemeToggle />
        </div>
      </div>

      {/* Progress Indicator */}
      {!isHome && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500 origin-left z-[51]"
          style={{ scaleX }}
        />
      )}
    </header>
  );
}
