'use client';

import { useCallback } from 'react';

/**
 * useHaptics provides a safe wrapper for the Navigation Vibrate API.
 * It uses subtle, quick pulses to provide tactile feedback on mobile devices.
 */
export const useHaptics = () => {
  const vibrate = useCallback((pattern: number | number[] = 10) => {
    // Check for browser support and user preference
    if (
      typeof window !== 'undefined' &&
      'vibrate' in navigator &&
      // Don't vibrate if the user has requested reduced motion or is on desktop
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      window.matchMedia('(max-width: 1024px)').matches
    ) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {
        // Silently fail if blocked by permissions or other browser logic
        console.debug('Haptics not supported or blocked:', e);
      }
    }
  }, []);

  const triggerLight = () => vibrate(10);
  const triggerMedium = () => vibrate(20);
  const triggerSuccess = () => vibrate([10, 30, 10]);
  const triggerError = () => vibrate([50, 50, 50]);

  return {
    triggerLight,
    triggerMedium,
    triggerSuccess,
    triggerError,
  };
};
