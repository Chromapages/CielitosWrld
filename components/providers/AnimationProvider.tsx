'use client';

import LenisProvider from '@/components/providers/LenisProvider';
import PullToRefreshProvider from '@/components/providers/PullToRefreshProvider';
import RouteTransitionProvider from '@/components/providers/RouteTransitionProvider';

/**
 * Client-side providers for animations and interactivity
 * Wrapped in a separate component to avoid hydration issues in the root layout
 */
export function AnimationProvider({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <PullToRefreshProvider>
        <RouteTransitionProvider>{children}</RouteTransitionProvider>
      </PullToRefreshProvider>
    </LenisProvider>
  );
}

export default AnimationProvider;
