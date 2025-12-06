'use client';

import { Moon, Sun } from 'lucide-react';
import { useDarkMode } from '@/lib/contexts/DarkModeContext';

interface DarkModeSwitcherProps {
  variant?: 'full' | 'minimal';
}

export default function DarkModeSwitcher({ variant = 'full' }: DarkModeSwitcherProps) {
  const { isDark, toggleDark } = useDarkMode();

  if (variant === 'minimal') {
    return (
      <button
        onClick={toggleDark}
        className="p-2 rounded-md text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2c3325] transition-colors"
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDark ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={toggleDark}
      className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2c3325] transition-colors"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <>
          <Sun className="w-4 h-4" />
          <span className="hidden sm:inline">Light Mode</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4" />
          <span className="hidden sm:inline">Dark Mode</span>
        </>
      )}
    </button>
  );
}
