'use client';

import { useEffect, useRef, useState } from 'react';

import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

interface HeroMediaProps {
  desktopVideoUrl?: string;
  mobileVideoUrl?: string;
}

const MOBILE_MEDIA_QUERY = '(max-width: 767px)';

export default function HeroMedia({ desktopVideoUrl, mobileVideoUrl }: HeroMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isMobileViewport, setIsMobileViewport] = useState<boolean | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
    const updateViewport = (event?: MediaQueryListEvent) => {
      setIsMobileViewport(event ? event.matches : mediaQuery.matches);
    };

    updateViewport();

    mediaQuery.addEventListener('change', updateViewport);

    return () => {
      mediaQuery.removeEventListener('change', updateViewport);
    };
  }, []);

  const activeVideoUrl =
    isMobileViewport === null
      ? undefined
      : isMobileViewport
        ? mobileVideoUrl || desktopVideoUrl
        : desktopVideoUrl;

  useEffect(() => {
    const video = videoRef.current;

    setIsReady(false);
    setHasFailed(false);

    if (!video || !activeVideoUrl || shouldReduceMotion) {
      return;
    }

    const attemptPlayback = async () => {
      try {
        video.muted = true;
        video.defaultMuted = true;
        video.playsInline = true;
        await video.play();
      } catch {
        setHasFailed(true);
      }
    };

    attemptPlayback();
  }, [activeVideoUrl, shouldReduceMotion]);

  if (!activeVideoUrl || shouldReduceMotion || hasFailed) {
    return null;
  }

  return (
    <video
      key={activeVideoUrl}
      ref={videoRef}
      aria-hidden="true"
      autoPlay
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
        isReady ? 'opacity-100' : 'opacity-0'
      }`}
      loop
      muted
      onError={() => setHasFailed(true)}
      onLoadedData={() => setIsReady(true)}
      playsInline
      preload="auto"
    >
      <source src={activeVideoUrl} type="video/mp4" />
    </video>
  );
}
