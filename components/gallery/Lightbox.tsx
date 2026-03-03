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
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  // Handle video vs image assets
  const mainImage = item.mediaType === 'video' ? item.videoThumbnail : item.image;

  // If no image is available at all, we can't render much
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
    setStatus('loaded');
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    console.error('Failed to load image:', fullSizeUrl);
    setStatus('error');
  }, [fullSizeUrl]);

  return (
    <div className="relative w-full h-full">
      {/* Loading spinner - shows when loading */}
      {status === 'loading' && (
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="w-10 h-10 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
        </div>
      )}

      {/* Error state */}
      {status === 'error' && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white/50 pointer-events-none">
          <Info size={32} className="mb-2 opacity-50" />
          <p className="text-sm">Image failed to load</p>
        </div>
      )}

      {/* Blur-up placeholder layer */}
      {thumbnailUrl && status === 'loading' && (
        <div className="absolute inset-0 z-0 transition-opacity duration-500 opacity-100 pointer-events-none">
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
          alt={(mainImage as any)?.alt || item.title || 'Gallery item'}
          fill
          className={cn(
            "object-contain z-1 transition-opacity duration-300",
            status === 'loaded' ? "opacity-100" : "opacity-0"
          )}
          priority={isActive}
          quality={90}
          sizes="100vw"
          onLoad={handleLoad}
          onError={handleError}
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
      try {
        const img = document.createElement('img');
        img.src = urlFor(item.image).width(1600).quality(90).auto('format').url();
        preloadedRef.current.add(i);
      } catch (err) {
        console.error('Failed to preload:', err);
      }
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

  const lightboxContent = (
    <div
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col"
      onClick={onClose}
    >
      {/* Controls Overlay */}
      <div
        className={cn(
          "absolute inset-x-0 top-0 z-50 p-4 flex justify-between items-start transition-opacity duration-300 bg-gradient-to-b from-black/80 to-transparent",
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-1 max-w-[70%]">
          <h2 className="text-white font-display text-lg md:text-xl line-clamp-1">
            {currentItem.title || 'Untitled'}
          </h2>
          <p className="text-white/60 text-xs uppercase tracking-widest">
            {currentIndex + 1} / {items.length}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {currentItem.mediaType === 'photo' && (
            <button
              onClick={handleDownload}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Download Original"
            >
              <Download size={20} />
            </button>
          )}
          <button
            onClick={handleShare}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors relative"
            title="Share Link"
          >
            <Share2 size={20} />
            {shareFeedback && (
              <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-brand-500 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap">
                Copied!
              </span>
            )}
          </button>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className={cn(
              "p-2.5 rounded-full transition-colors",
              showInfo ? "bg-brand-500 text-white" : "bg-white/10 hover:bg-white/20 text-white"
            )}
            title="Information"
          >
            <Info size={20} />
          </button>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors ml-2"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className="flex-1 relative flex items-center justify-center cursor-default"
        onClick={() => setShowControls(!showControls)}
        {...bindSwipe()}
      >
        {/* Desktop Navigation */}
        <button
          onClick={handlePrev}
          className="absolute left-6 z-40 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all hidden md:block"
          aria-label="Previous"
        >
          <ChevronLeft size={36} />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-6 z-40 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all hidden md:block"
          aria-label="Next"
        >
          <ChevronRight size={36} />
        </button>

        {/* Carousel */}
        <div className="w-full h-full overflow-hidden" ref={emblaRef}>
          <div className="flex h-full">
            {items.map((item, index) => (
              <div
                key={item._id}
                className="flex-[0_0_100%] min-w-0 h-full relative"
              >
                <div className="w-full h-full flex items-center justify-center p-4 md:p-16 lg:p-24">
                  {item.mediaType === 'video' && item.videoEmbedUrl ? (
                    <div className="relative w-full aspect-video max-w-5xl shadow-2xl rounded-lg overflow-hidden bg-black">
                      <iframe
                        src={getEmbedUrl(item.videoEmbedUrl)}
                        className="absolute inset-0 w-full h-full border-0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="relative w-full h-full max-w-7xl">
                      <OptimizedLightboxImage
                        item={item}
                        isActive={index === currentIndex}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Info Panel Slider */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full md:w-96 bg-stone-950/98 backdrop-blur-2xl z-[60] border-l border-white/10 transition-transform duration-500 ease-out shadow-2xl transform overflow-y-auto",
          showInfo ? "translate-x-0" : "translate-x-full"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 space-y-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <h3 className="text-xl font-display text-white">Artwork Details</h3>
            <button
              onClick={() => setShowInfo(false)}
              className="p-2 text-stone-400 hover:text-white transition-colors"
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

          <div className="space-y-6 pt-4">
            {currentItem.client && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                  <Eye className="w-5 h-5 text-brand-400" />
                </div>
                <div>
                  <p className="text-[10px] text-stone-500 uppercase tracking-[0.2em] mb-1">Client</p>
                  <p className="text-stone-200 font-medium">{currentItem.client}</p>
                </div>
              </div>
            )}

            {currentItem.medium && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-stone-500 uppercase tracking-[0.2em] mb-1">Medium</p>
                  <p className="text-stone-200 font-medium">{currentItem.medium}</p>
                </div>
              </div>
            )}

            {currentItem.vibe && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-stone-500 uppercase tracking-[0.2em] mb-1">Vibe</p>
                  <p className="text-stone-200 font-medium">{currentItem.vibe}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (!mounted) return null;

  return createPortal(lightboxContent, document.body);
}
