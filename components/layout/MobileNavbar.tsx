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
      className="sm:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex items-center justify-center gap-2 rounded-full bg-white/70 dark:bg-moss-900/70 px-4 py-3 text-sm shadow-xl ring-1 ring-white/20 backdrop-blur-md">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'group flex flex-col items-center gap-1 px-4 py-1 transition-all duration-200 ease-in-out',
                isActive ? 'text-orange-600 dark:text-orange-500' : 'text-moss-800 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500'
              )}
              aria-label={item.label}
            >
              <Icon className="text-xl" size={20} strokeWidth={2} />
              <span className="font-medium text-xs tracking-wide">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}