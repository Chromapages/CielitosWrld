'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Camera, Briefcase, FileText, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', href: '/', icon: Home },
  { id: 'gallery', label: 'Gallery', href: '/gallery', icon: Camera },
  { id: 'services', label: 'Services', href: '/services', icon: Briefcase },
  { id: 'blog', label: 'Blog', href: '/blog', icon: FileText },
  { id: 'contact', label: 'Contact', href: '/contact', icon: Mail },
];

export default function MobileNavbar() {
  const pathname = usePathname();

  return (
    <nav
      className="sm:hidden fixed bottom-0 left-0 right-0 z-50 w-full border-t border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-950 shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.05)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="grid grid-cols-5 h-20 w-full items-center px-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="btn-press group flex flex-col items-center justify-center gap-1 h-full w-full transition-transform"
              aria-label={item.label}
              data-active={isActive}
            >
              <div
                className={cn(
                  "flex items-center justify-center w-16 h-8 rounded-full transition-all duration-300 ease-out-quad",
                  isActive
                    ? "bg-orange-100 text-orange-900 dark:bg-orange-900/40 dark:text-orange-100"
                    : "bg-transparent text-stone-500 group-hover:bg-stone-100 dark:text-stone-400 dark:group-hover:bg-stone-900"
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
                    ? "text-stone-900 dark:text-stone-100 font-bold"
                    : "text-stone-500 dark:text-stone-400 group-hover:text-stone-700 dark:group-hover:text-stone-300"
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