'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: !isTouchDevice,
      wheelMultiplier: 0.9,
      touchMultiplier: isTouchDevice ? 0 : 1,
    });

    // Make lenis accessible globally for blocking
    (window as any).lenis = lenis;

    let rafId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
