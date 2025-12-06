'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem } from '@/app/gallery/page';
import { urlFor } from '@/sanity/lib/image';
import useEmblaCarousel from 'embla-carousel-react';
import { cn } from '@/lib/utils';

interface LightboxProps {
  items: GalleryItem[];
  initialIndex: number;
  onClose: () => void;
}

// Helper to convert common video URLs to embed URLs
function getEmbedUrl(url: string) {
  if (!url) return '';

  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1`;

  // Vimeo
  const vimeoMatch = url.match(/(?:vimeo\.com\/)([0-9]+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;

  return url;
}

// Track loaded images for instant display on revisit
const loadedImageCache = new Set<string>();

/**
 * Optimized Lightbox Image Component
 * - Uses thumbnail as blur-up placeholder
 * - Tracks loading state per image
 * - Caches loaded images
 */
function OptimizedLightboxImage({
  item,
  isActive,
  onLoad,
}: {
  item: GalleryItem;
  isActive: boolean;
  onLoad?: () => void;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imageId = item._id;

  // Check if already loaded (cached)
  const isCached = loadedImageCache.has(imageId);

  // Get the thumbnail URL (same as used in gallery grid)
  const thumbnailUrl = urlFor(item.image).width(800).url();
  // Get the LQIP (Low Quality Image Placeholder) if available
  const lqipUrl = item.image?.asset?.metadata?.lqip;

  // Get the full-size URL for lightbox
  const fullSizeUrl = urlFor(item.image).width(1600).quality(90).auto('format').url();

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    loadedImageCache.add(imageId);
    onLoad?.();
  }, [imageId, onLoad]);

  // Use LQIP or thumbnail as placeholder
  const placeholderUrl = lqipUrl || thumbnailUrl;

  return (
    <div className="relative w-full h-full">
      {/* Loading spinner - shows when not cached and not loaded */}
      {!isCached && !isLoaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
        </div>
      )}

      {/* Blur-up placeholder layer */}
      {!isCached && (
        <div
          className={cn(
            "absolute inset-0 z-0 transition-opacity duration-500",
            isLoaded ? "opacity-0" : "opacity-100"
          )}
        >
          <Image
            src={thumbnailUrl}
            alt=""
            fill
            className="object-contain blur-sm scale-105"
            sizes="100vw"
            priority={isActive}
            unoptimized // Use the already-loaded thumbnail
          />
        </div>
      )}

      {/* Full-size image */}
      <Image
        src={fullSizeUrl}
        alt={item.image.alt || item.title}
        fill
        className={cn(
          "object-contain z-1 transition-opacity duration-300",
          (isCached || isLoaded) ? "opacity-100" : "opacity-0"
        )}
        priority={isActive}
        quality={90}
        sizes="100vw"
        onLoad={handleLoad}
        placeholder={lqipUrl ? 'blur' : 'empty'}
        blurDataURL={lqipUrl}
      />
    </div>
  );
}

export default function Lightbox({ items, initialIndex, onClose }: LightboxProps) {
  const [showControls, setShowControls] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    startIndex: initialIndex,
    duration: 20
  });
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const preloadedRef = useRef<Set<number>>(new Set());

  // Preload adjacent images when index changes
  const preloadAdjacentImages = useCallback((index: number) => {
    const indicesToPreload = [
      (index - 1 + items.length) % items.length, // Previous
      (index + 1) % items.length, // Next
    ];

    indicesToPreload.forEach((i) => {
      if (preloadedRef.current.has(i)) return;

      const item = items[i];
      if (item.mediaType === 'video') return;

      // Create a hidden image to preload
      const img = document.createElement('img');
      img.src = urlFor(item.image).width(1600).quality(90).auto('format').url();
      preloadedRef.current.add(i);
    });
  }, [items]);

  // Sync Embla index with state
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const newIndex = emblaApi.selectedScrollSnap();
    setCurrentIndex(newIndex);
    // Preload next/prev images
    preloadAdjacentImages(newIndex);
  }, [emblaApi, preloadAdjacentImages]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    // Preload initial adjacent images
    preloadAdjacentImages(initialIndex);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect, preloadAdjacentImages, initialIndex]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') if (emblaApi) emblaApi.scrollNext();
      if (e.key === 'ArrowLeft') if (emblaApi) emblaApi.scrollPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, emblaApi]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const currentItem = items[currentIndex];

  return (
    <div className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-md flex flex-col animate-in fade-in zoom-in-95 duration-300">

      {/* Main Carousel Area */}
      <div
        className="flex-1 relative overflow-hidden"
        onClick={() => setShowControls(!showControls)}
      >
        <div className="h-full" ref={emblaRef}>
          <div className="flex h-full touch-pan-y">
            {items.map((item, index) => (
              <div key={item._id} className="flex-[0_0_100%] min-w-0 relative h-full flex items-center justify-center p-0 md:p-12">
                <div className="relative w-full h-full max-w-6xl max-h-[100dvh] md:max-h-[85vh] flex items-center justify-center">
                  {item.mediaType === 'video' && item.videoEmbedUrl ? (
                    <div className="w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
                      <iframe
                        src={getEmbedUrl(item.videoEmbedUrl)}
                        className="w-full h-full"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <OptimizedLightboxImage
                      item={item}
                      isActive={index === currentIndex}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls Overlay */}
      <div className={cn(
        "absolute inset-0 pointer-events-none transition-opacity duration-300",
        showControls ? "opacity-100" : "opacity-0"
      )}>

        {/* Top Bar: Close + Tags */}
        <div className="absolute top-0 left-0 right-0 p-4 pt-safe flex justify-between items-start z-10 text-white bg-gradient-to-b from-black/60 to-transparent pointer-events-auto">
          <div className="flex flex-col items-start gap-1 max-w-[80%]">
            <h2 className="text-lg font-bold font-display leading-tight">{currentItem.title}</h2>
            <div className="flex flex-wrap gap-2 text-xs text-stone-300 font-medium">
              <span>{currentItem.category}</span>
              {currentItem.medium && (
                <>
                  <span className="opacity-50">•</span>
                  <span>{currentItem.medium}</span>
                </>
              )}
              {currentItem.location && (
                <>
                  <span className="opacity-50">•</span>
                  <span>{currentItem.location}</span>
                </>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 -mr-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        {/* Nav Buttons (Desktop) */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-auto">
          <button
            onClick={handlePrev}
            className="p-3 hover:bg-white/10 rounded-full text-white transition-colors hidden md:block"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-auto">
          <button
            onClick={handleNext}
            className="p-3 hover:bg-white/10 rounded-full text-white transition-colors hidden md:block"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>

        {/* Bottom Bar: Progress + Minimal Controls */}
        <div className="absolute bottom-0 left-0 right-0 pb-safe bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white pointer-events-auto flex items-end justify-between">
          <div className="text-sm font-medium opacity-80 tabular-nums">
            {currentIndex + 1} / {items.length}
          </div>

          <div className="flex gap-4 md:hidden">
            <button onClick={handlePrev} className="p-2 hover:bg-white/10 rounded-full"><ChevronLeft className="w-6 h-6" /></button>
            <button onClick={handleNext} className="p-2 hover:bg-white/10 rounded-full"><ChevronRight className="w-6 h-6" /></button>
          </div>
        </div>
      </div>

    </div>
  );
}