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
        "w-full py-10 md:py-20", // Standard vertical rhythm
        hasGutter && "px-[var(--mobile-gutter,24px)] md:px-0",
        className
      )}
    >
      {children}
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
        <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-orange-600 dark:text-orange-500">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-brand-900 dark:text-white">
        {title}
      </h2>
      {description && (
        <p className="text-base text-brand-600 dark:text-stone-400 leading-relaxed max-w-xl">
          {description}
        </p>
      )}
    </div>
  );
};
