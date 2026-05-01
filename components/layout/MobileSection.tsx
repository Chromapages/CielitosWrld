'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MobileSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  /**
   * Whether to include the standard horizontal gutter.
   * Default is true.
   */
  hasGutter?: boolean;
}

/**
 * MobileSection standardizes the vertical rhythm and optional horizontal gutters.
 */
export const MobileSection = ({ 
  children, 
  className, 
  id,
  hasGutter = true
}: MobileSectionProps) => {
  return (
    <section 
      id={id}
      className={cn(
        "w-full py-16 lg:py-32", // Standard vertical rhythm
        "flex flex-col items-center", // Ensure children are centered within the max-width
        className
      )}
    >
      <div className={cn(
        "w-full max-w-[1600px] mx-auto",
        hasGutter && "px-[var(--mobile-gutter,24px)] md:px-0"
      )}>
        {children}
      </div>
    </section>
  );
};

interface MobileSectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}

/**
 * MobileSectionHeader provides a consistent typography hierarchy for section introductions.
 */
export const MobileSectionHeader = ({ 
  eyebrow, 
  title, 
  description,
  className
}: MobileSectionHeaderProps) => {
  return (
    <div className={cn("mb-8 space-y-2", className)}>
      {eyebrow && (
        <span className="text-[13px] font-semibold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-500">
          {eyebrow}
        </span>
      )}
      <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-brand-900 dark:text-white leading-[1.1]">
        {title}
      </h2>
      {description && (
        <p className="hidden md:block text-lg md:text-xl text-brand-600 dark:text-stone-400 leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
};
