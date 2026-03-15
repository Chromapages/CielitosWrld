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

export default function MobileNavbar() {
  const pathname = usePathname();

  return (
    <nav
      className="sm:hidden fixed bottom-0 left-0 right-0 z-50 w-full border-t border-stone-200 dark:border-white/10 bg-white/95 dark:bg-stone-950/90 shadow-navbar-float backdrop-blur-2xl motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-full duration-500 rounded-t-[2rem]"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 0.5rem)' }}
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
              className="group relative flex h-full w-full flex-col items-center justify-center gap-1 transition-transform focus-visible:outline-none"
              aria-label={item.label}
            >
              <div
                className={cn(
                  "flex h-9 w-14 items-center justify-center rounded-full transition-all duration-300 ease-out-quad motion-reduce:transition-none",
                  isActive
                    ? "bg-orange-500/20 dark:bg-orange-500/30 text-orange-600 dark:text-orange-100 scale-100 opacity-100"
                    : "bg-transparent text-stone-500 dark:text-stone-400 opacity-80 group-hover:bg-stone-100 dark:group-hover:bg-white/10 group-hover:opacity-100 group-hover:text-stone-900 dark:group-hover:text-stone-200",
                  "group-focus-visible:ring-2 group-focus-visible:ring-orange-500 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-white dark:group-focus-visible:ring-offset-stone-950"
                )}
              >
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2.5 : 2}
                  className={cn(
                    "transition-transform duration-300 ease-out motion-reduce:transition-none",
                    isActive ? "scale-110" : "scale-100 group-hover:scale-105"
                  )}
                />
              </div>
              <span
                className={cn(
                  "text-[10px] font-bold tracking-wide transition-colors duration-300 ease-out motion-reduce:transition-none",
                  isActive
                    ? "text-orange-700 dark:text-white"
                    : "text-stone-500 dark:text-stone-400 group-hover:text-stone-900 dark:group-hover:text-stone-100"
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
