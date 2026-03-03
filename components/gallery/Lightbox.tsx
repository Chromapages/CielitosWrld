'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Share2, Download, Info, Eye } from 'lucide-react';
import { GalleryItem } from '@/app/gallery/page';
import { urlFor } from '@/sanity/lib/image';
import useEmblaCarousel from 'embla-carousel-react';
import { useDrag } from '@use-gesture/react';
import { cn } from '@/lib/utils';
import { getYouTubeThumbnail } from '@/lib/videoUtils';

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

  // Handle video vs image assets
  const mainImage = item.mediaType === 'video' ? item.videoThumbnail : item.image;

  // If no image is available at all, we can't render much (shouldn't happen with our fallbacks)
  if (!mainImage && item.mediaType !== 'video') return null;

  // Get the thumbnail URL (same as used in gallery grid)
  const thumbnailUrl = mainImage ? (mainImage?.asset?.url || urlFor(mainImage).width(800).url()) : null;

  // Get the LQIP (Low Quality Image Placeholder) if available
  const lqipUrl = mainImage?.asset?.metadata?.lqip;

  // Get the full-size URL for lightbox
  const fullSizeUrl = mainImage
    ? (mainImage?.asset?.url || urlFor(mainImage).width(1600).quality(90).auto('format').url())
    : (item.mediaType === 'video' && item.videoEmbedUrl ? getYouTubeThumbnail(item.videoEmbedUrl, 'maxres') || null : null);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    loadedImageCache.add(imageId);
    onLoad?.();
  }, [imageId, onLoad]);

  return (
    <div className="relative w-full h-full">
      {/* Loading spinner - shows when not cached and not loaded */}
      {!isCached && !isLoaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
        </div>
      )}

      {/* Blur-up placeholder layer */}
      {!isCached && thumbnailUrl && (
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
      {fullSizeUrl && (
        <Image
          src={fullSizeUrl}
          alt={(mainImage as any)?.alt || item.title}
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
          blurDataURL={lqipUrl || undefined}
          unoptimized={!mainImage} // Required for external YouTube URLs
        />
      )}
    </div>
  );
}

export default function Lightbox({ items, initialIndex, onClose }: LightboxProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  const [showControls, setShowControls] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [shareFeedback, setShareFeedback] = useState(false);
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

  // Lock body scroll and stop Lenis
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.classList.add('lightbox-open');

    // Stop Lenis if it exists on window
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.stop();
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('lightbox-open');

      // Start Lenis again
      if (lenis) {
        lenis.start();
      }
    };
  }, []);

  const currentItem = items[currentIndex];

  const handleShare = useCallback(async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setShareFeedback(true);
      setTimeout(() => setShareFeedback(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, []);

  const handleDownload = useCallback(() => {
    if (currentItem.mediaType === 'photo' && currentItem.image) {
      const link = document.createElement('a');
      link.href = urlFor(currentItem.image).width(2400).quality(95).auto('format').url();
      link.download = `${currentItem.title || 'image'}.jpg`;
      link.target = '_blank';
      link.click();
    }
  }, [currentItem]);

  const bindSwipe = useDrag(
    ({ last, movement: [mx], velocity: [vx], direction: [dx] }) => {
      if (!last) return;
      const hasSwipeIntent = Math.abs(mx) > 80 || vx > 0.35;
      if (!hasSwipeIntent) return;

      if (dx > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    },
    {
      axis: 'x',
      pointer: { touch: true },
      filterTaps: true,
    }
  );

  return (
    <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-xl flex flex-col animate-in fade-in zoom-in-95 duration-300 motion-reduce:animate-none">

      {/* Main Carousel Area */}
      <div
        className="flex-1 relative overflow-hidden"
        onClick={() => setShowControls(!showControls)}
        {...bindSwipe()}
      >
        <div className="h-full" ref={emblaRef}>
          <div className="flex h-full touch-pan-y">
            {items.map((item, index) => (
              <div key={item._id} className="flex-[0_0_100%] min-w-0 relative h-full flex items-center justify-center p-0 md:p-12">
                <div className="relative w-full h-full max-w-6xl max-h-[100dvh] md:max-h-[85vh] flex items-center justify-center">
                  {item.mediaType === 'video' && item.videoEmbedUrl ? (
                    <div className="w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl relative">
                      {/* Only render the actual iframe when this slide is centered (active) */}
                      {index === currentIndex ? (
                        <iframe
                          src={getEmbedUrl(item.videoEmbedUrl)}
                          className="w-full h-full"
                          allow="autoplay; fullscreen; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        /* Show the thumbnail as a static placeholder for inactive slides */
                        <OptimizedLightboxImage
                          item={item}
                          isActive={false}
                        />
                      )}
                    </div>
                  ) : (
                    <div className="relative w-full h-full max-w-7xl">
                      <OptimizedLightboxImage
                        item={item}
                        isActive={index === currentIndex}
                        onLoad={() => {
                          if (index === currentIndex) {
                            // Any specific logic on load
                          }
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer / Caption */}
      <div
        className={cn(
          "p-6 md:p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-300",
          showControls ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        <div className="max-w-4xl mx-auto">
          {currentItem.title && (
            <h2 className="text-xl md:text-2xl font-display text-white mb-2">{currentItem.title}</h2>
          )}
          {currentItem.description && (
            <p className="text-stone-300 text-sm md:text-base line-clamp-3 md:line-clamp-none max-w-2xl">
              {currentItem.description}
            </p>
          )}

          {/* Quick info badges */}
          <div className="flex flex-wrap gap-4 mt-6">
            {currentItem.client && (
              <div className="flex items-center gap-2 text-xs text-stone-400">
                <span className="w-1 h-1 rounded-full bg-brand-500" />
                <span className="uppercase tracking-widest opacity-60">Client:</span>
                <span className="text-stone-200">{currentItem.client}</span>
              </div>
            )}
            {currentItem.categories && currentItem.categories.length > 0 && (
              <div className="flex items-center gap-2 text-xs text-stone-400">
                <span className="w-1 h-1 rounded-full bg-brand-500" />
                <span className="uppercase tracking-widest opacity-60">Category:</span>
                <span className="text-stone-200">{currentItem.categories[0].title}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Slide-out Info Panel */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full md:w-96 bg-stone-950/95 backdrop-blur-xl z-[60] border-l border-white/10 transition-transform duration-500 ease-premium shadow-2xl transform overflow-y-auto no-scrollbar",
          showInfo ? "translate-x-0" : "translate-x-full"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 space-y-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <h3 className="text-xl font-display text-white">Artwork Details</h3>
            <button
              onClick={() => setShowInfo(false)}
              className="text-stone-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg text-white font-medium">{currentItem.title || 'Untitled'}</h4>
            {currentItem.description && (
              <p className="text-stone-400 text-sm leading-relaxed">
                {currentItem.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 pt-4">
            {currentItem.client && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Eye className="w-4 h-4 text-stone-400" />
                </div>
                <div>
                  <p className="text-xs text-stone-500 uppercase tracking-wider">Client</p>
                  <p className="text-stone-200">{currentItem.client}</p>
                </div>
              </div>
            )}

            {currentItem.medium && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-stone-500 uppercase tracking-wider">Medium</p>
                  <p className="text-stone-200">{currentItem.medium}</p>
                </div>
              </div>
            )}

            {currentItem.vibe && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-stone-500 uppercase tracking-wider">Vibe</p>
                  <p className="text-stone-200">{currentItem.vibe}</p>
                </div>
              </div>
            )}

            {/* Image dimensions if available */}
            {currentItem.image?.asset?.metadata?.dimensions && (
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs text-stone-500 uppercase tracking-wider mb-2">Image Details</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-stone-500 text-xs">Dimensions</p>
                    <p className="text-stone-300">
                      {currentItem.image.asset.metadata.dimensions.width} × {currentItem.image.asset.metadata.dimensions.height}
                    </p>
                  </div>
                  <div>
                    <p className="text-stone-500 text-xs">Aspect Ratio</p>
                    <p className="text-stone-300">
                      {(currentItem.image.asset.metadata.dimensions.width / currentItem.image.asset.metadata.dimensions.height).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Backdrop for info panel */}
        {showInfo && (
          <div
            className="absolute inset-0 bg-black/20 z-10 pointer-events-auto"
            onClick={() => setShowInfo(false)}
          />
        )}
      </div>
    </div>
  );

  if (!mounted) return null;

  return createPortal(lightboxContent, document.body);
}
