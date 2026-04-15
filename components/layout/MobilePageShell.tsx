'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MobilePageShellProps {
  children: ReactNode;
  className?: string;
  /**
   * If true, content will start from the top of the screen (behind the header).
   * Useful for hero sections with background images.
   */
  immersive?: boolean;
}

/**
 * MobilePageShell standardizes the layout spacing for mobile devices.
 * It accounts for the fixed top header and bottom tab bar, including safe areas.
 */
export const MobilePageShell = ({ 
  children, 
  className, 
  immersive = false 
}: MobilePageShellProps) => {
  return (
    <div 
      className={cn(
        "flex flex-col min-h-screen w-full relative",
        // Handle top offset for fixed header
        !immersive 
          ? "pt-[calc(var(--mobile-header-height,64px)+var(--safe-area-top,0px))] md:pt-0" 
          : "pt-0",
        // Handle bottom offset for fixed tab bar
        "pb-[calc(var(--mobile-nav-height,64px)+var(--safe-area-bottom,0px))] md:pb-0",
        className
      )}
    >
      {children}
    </div>
  );
};
