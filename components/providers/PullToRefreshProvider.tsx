'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useDrag } from '@use-gesture/react';

const MAX_PULL = 100;
const TRIGGER_PULL = 72;

export default function PullToRefreshProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [pullDistance, setPullDistance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const isSupportedRoute = pathname.startsWith('/blog') || pathname.startsWith('/gallery');

  const bind = useDrag(
    ({ down, movement: [, my], cancel, last, event }) => {
      if (!isSupportedRoute || refreshing) return;

      const touchEvent = event as TouchEvent;
      const isTouch = touchEvent.type.startsWith('touch');
      if (!isTouch) return;

      // Don't trigger pull-to-refresh if the user is interacting with navigation or head elements
      const target = touchEvent.target as HTMLElement;
      if (target.closest('header') || target.closest('nav') || target.closest('button') || target.closest('a')) {
        return;
      }

      const atTop = window.scrollY <= 0;
      if (!atTop && down) {
        cancel();
        return;
      }

      if (down && my > 0 && atTop) {
        setPullDistance(Math.min(MAX_PULL, my * 0.55));
      }

      if (last) {
        if (pullDistance >= TRIGGER_PULL) {
          setRefreshing(true);
          router.refresh();
          window.setTimeout(() => {
            setRefreshing(false);
            setPullDistance(0);
          }, 600);
          return;
        }

        setPullDistance(0);
      }
    },
    {
      axis: 'y',
      filterTaps: true,
      pointer: { touch: true },
    }
  );

  return (
    <div {...bind()} className="min-h-screen">
      <div
        className="pointer-events-none fixed inset-x-0 top-16 z-[70] flex justify-center transition-opacity duration-200"
        style={{ opacity: pullDistance > 0 || refreshing ? 1 : 0 }}
      >
        <div className="rounded-full bg-black/80 px-3 py-1 text-xs font-medium text-white shadow-lg">
          {refreshing ? 'Refreshing...' : pullDistance >= TRIGGER_PULL ? 'Release to refresh' : 'Pull to refresh'}
        </div>
      </div>
      {pullDistance > 0 ? (
        <div style={{ transform: `translateY(${pullDistance}px)` }} className="transition-transform duration-150">
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
}
