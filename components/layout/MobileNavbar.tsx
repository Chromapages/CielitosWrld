'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Camera, FileText, Mail, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV_ITEMS } from '@/lib/constants';

// For mobile, we pick the most essential 5 items to maintain a balanced grid
const MOBILE_NAV_ITEMS = NAV_ITEMS.filter(item => 
  ['Home', 'Gallery', 'Services', 'Blog', 'Contact'].includes(item.label)
).map(item => ({
  ...item,
  icon: item.label === 'Home' ? Home : 
        item.label === 'Gallery' ? Camera : 
        item.label === 'Services' ? Briefcase :
        item.label === 'Blog' ? FileText : Mail
}));

import { motion, AnimatePresence } from 'framer-motion';
import { useHaptics } from '@/hooks/useHaptics';

export default function MobileNavbar() {
  const pathname = usePathname();
  const { triggerLight } = useHaptics();

  const handleTabClick = (e: React.MouseEvent<HTMLAnchorElement>, isActive: boolean) => {
    // Provide tactile feedback on tab change
    triggerLight();

    if (isActive) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="sm:hidden fixed bottom-1 left-4 right-4 z-50 rounded-2xl border border-stone-200/50 dark:border-white/10 bg-white/70 dark:bg-stone-900/70 shadow-2xl backdrop-blur-2xl motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-full duration-700"
      style={{ bottom: 'calc(4px + env(safe-area-inset-bottom))' }}
      aria-label="Mobile Navigation"
    >
      <div 
        role="tablist" 
        className="grid h-16 w-full grid-cols-5 items-center px-1"
      >
        {MOBILE_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              role="tab"
              aria-selected={isActive}
              aria-current={isActive ? 'page' : undefined}
              onClick={(e) => handleTabClick(e, isActive)}
              className="btn-press group relative flex h-full w-full flex-col items-center justify-center gap-0.5 transition-all focus-visible:outline-none"
              aria-label={item.label}
            >
              <div className="relative flex h-8 w-12 items-center justify-center">
                {/* Framer Motion Active Indicator */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute inset-0 bg-orange-600/10 dark:bg-orange-500/20 rounded-full"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30
                      }}
                    />
                  )}
                </AnimatePresence>

                <Icon
                  size={isActive ? 20 : 18}
                  strokeWidth={isActive ? 2.5 : 2}
                  className={cn(
                    "relative z-10 transition-all duration-300 ease-out",
                    isActive 
                      ? "text-orange-600 dark:text-orange-400 scale-110" 
                      : "text-stone-500 dark:text-stone-500 group-hover:text-stone-900 dark:group-hover:text-stone-200"
                  )}
                  suppressHydrationWarning
                />
              </div>
              <span
                className={cn(
                  "relative z-10 text-[9px] font-black tracking-[0.15em] uppercase transition-colors duration-300",
                  isActive
                    ? "text-orange-700 dark:text-orange-400"
                    : "text-stone-400 dark:text-stone-500"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
