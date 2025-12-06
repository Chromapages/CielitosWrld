'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Camera } from 'lucide-react';
import { NAV_ITEMS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const pathname = usePathname();

  // Separate regular nav items from contact
  const regularNavItems = NAV_ITEMS.filter(item => item.href !== '/contact');
  const contactItem = NAV_ITEMS.find(item => item.href === '/contact');

  return (
    <>
      {/* Navbar - Hidden on mobile, floating on desktop */}
      <header className="hidden md:flex md:fixed md:top-6 md:left-1/2 md:-translate-x-1/2 z-50 md:w-[95%] max-w-5xl backdrop-blur-md bg-white/70 dark:bg-moss-900/70 rounded-full shadow-navbar-float px-6 py-3 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-moss-900 dark:text-white group">
          <div className="size-6 text-orange-600 dark:text-orange-500 transition-transform duration-300 group-hover:scale-110">
            <Camera className="w-full h-full" />
          </div>
          <h2 className="text-xl font-bold tracking-tight font-pattaya">
            Cielito's Wrld
          </h2>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 justify-end gap-8">
          <div className="flex items-center gap-9">
            {regularNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-inter font-medium transition-colors duration-200',
                  pathname === item.href
                    ? 'text-orange-600 dark:text-orange-500'
                    : 'text-moss-800 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500'
                )}
              >
                {item.label}
              </Link>
            ))}

            {/* Contact CTA */}
            {contactItem && (
              <Link
                href={contactItem.href}
                className={cn(
                  'text-sm font-inter font-medium px-4 py-2 rounded-full transition-all duration-300',
                  pathname === contactItem.href
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'bg-orange-500 text-white hover:bg-orange-600 hover:shadow-md'
                )}
              >
                {contactItem.label}
              </Link>
            )}
          </div>
        </div>

      </header>
    </>
  );
}