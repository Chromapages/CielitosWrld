'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Camera, FileText, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', href: '/', icon: Home },
  { id: 'gallery', label: 'Gallery', href: '/gallery', icon: Camera },
  { id: 'blog', label: 'Blog', href: '/blog', icon: FileText },
  { id: 'contact', label: 'Contact', href: '/contact', icon: Mail },
];

export default function MobileNavbar() {
  const pathname = usePathname();

  return (
    <nav
      className="sm:hidden fixed bottom-3 left-1/2 z-50 w-[calc(100%-1rem)] max-w-sm -translate-x-1/2 rounded-full border border-white/20 bg-stone-950/80 shadow-navbar-float backdrop-blur-xl"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="grid h-16 w-full grid-cols-4 items-center px-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
                className="btn-press group flex h-full w-full flex-col items-center justify-center gap-1 transition-transform"
              aria-label={item.label}
              data-active={isActive}
            >
              <div
                className={cn(
                   "flex h-8 w-14 items-center justify-center rounded-full transition-all duration-300 ease-out-quad",
                   isActive
                     ? "bg-orange-500/30 text-orange-100"
                     : "bg-transparent text-stone-300 group-hover:bg-white/10"
                 )}
              >
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2.5 : 2}
                  className="transition-transform duration-300"
                />
              </div>
              <span
                className={cn(
                  "text-[11px] font-medium tracking-wide transition-colors duration-300",
                   isActive
                     ? "font-bold text-white"
                     : "text-stone-300 group-hover:text-stone-100"
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
