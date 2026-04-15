'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Share2, Info, Eye, MapPin, Camera, Sparkles } from 'lucide-react';
import { GalleryItem } from '@/app/gallery/page';
import { urlFor, sanityLoader } from '@/sanity/lib/image';
import useEmblaCarousel from 'embla-carousel-react';
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
  const [useDirectUrlFallback, setUseDirectUrlFallback] = useState(false);

  // Handle video vs image assets
  const mainImage = item.mediaType === 'video' ? item.videoThumbnail : item.image;

  // If no image is available at all, we can't render much
  if (!mainImage && item.mediaType !== 'video') return null;

  // Get the thumbnail URL (same as used in gallery grid)
  const thumbnailUrl = mainImage
    ? (() => {
        try {
          return urlFor(mainImage).width(900).quality(75).auto('format').fit('max').url();
        } catch {
          return mainImage?.asset?.url || (mainImage as any)?.url || null;
        }
      })()
    : null;

  // Get the LQIP (Low Quality Image Placeholder) if available
  const lqipUrl = mainImage?.asset?.metadata?.lqip;
  const directUrl = mainImage?.asset?.url || (mainImage as any)?.url || null;

  // Get the full-size URL for lightbox
  const transformedUrl = mainImage
    ? (() => {
        try {
          return urlFor(mainImage).width(1200).quality(88).auto('format').fit('max').url();
        } catch {
          return directUrl;
        }
      })()
    : (item.mediaType === 'video' && item.videoEmbedUrl ? getYouTubeThumbnail(item.videoEmbedUrl, 'maxres') || null : null);

  const fullSizeUrl = useDirectUrlFallback && directUrl ? directUrl : transformedUrl;

  const handleLoad = useCallback(() => {
    setStatus('loaded');
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    if (!useDirectUrlFallback && directUrl && transformedUrl && directUrl !== transformedUrl) {
      setUseDirectUrlFallback(true);
      setStatus('loading');
      return;
    }
    console.error('Failed to load image:', fullSizeUrl);
    setStatus('error');
  }, [directUrl, fullSizeUrl, transformedUrl, useDirectUrlFallback]);

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
          loader={sanityLoader}
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
    
    // Modern Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(url);
        setShareFeedback(true);
        setTimeout(() => setShareFeedback(false), 2000);
        return;
      } catch (err) {
        console.warn('Clipboard API failed, trying fallback:', err);
      }
    }

    // Legacy Fallback
    try {
      const textArea = document.createElement("textarea");
      textArea.value = url;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      textArea.style.top = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (successful) {
        setShareFeedback(true);
        setTimeout(() => setShareFeedback(false), 2000);
      }
    } catch (err) {
      console.error('Final fallback copy failed:', err);
    }
  }, []);



  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const lightboxContent = (
    <div
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col"
      role="dialog"
      aria-modal="true"
    >
      {/* Controls Overlay */}
      <div
        className={cn(
          "absolute inset-x-0 top-0 z-50 p-4 flex justify-between items-start transition-opacity duration-300 bg-gradient-to-b from-black/80 to-transparent",
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-1 max-w-[85vw] sm:max-w-[70%]">
          <h2 className="text-white font-sans text-lg md:text-xl font-semibold line-clamp-1 drop-shadow-md">
            {currentItem.title || 'Untitled'}
          </h2>
          <p className="text-white/80 text-xs uppercase tracking-widest drop-shadow-md">
            {currentIndex + 1} / {items.length}
            {currentItem.client && <span className="hidden sm:inline"> • {currentItem.client}</span>}
          </p>

          {/* Condensed Details Overlay */}
          {showInfo && (
            <div className="mt-3 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-300 pointer-events-auto">
              {currentItem.description && (
                <p className="text-white/90 text-sm leading-relaxed max-w-lg drop-shadow-md pb-1">
                  {currentItem.description}
                </p>
              )}
              <div className="flex flex-wrap gap-x-3 gap-y-2">
                {currentItem.medium && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-white/90 drop-shadow-md bg-black/40 px-2.5 py-1.5 rounded-md backdrop-blur-md border border-white/10">
                    <Camera size={14} className="text-white/60" /> {currentItem.medium}
                  </span>
                )}
                {currentItem.vibe && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-white/90 drop-shadow-md bg-black/40 px-2.5 py-1.5 rounded-md backdrop-blur-md border border-white/10">
                    <Sparkles size={14} className="text-white/60" /> {currentItem.vibe}
                  </span>
                )}
                {currentItem.location && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-white/90 drop-shadow-md bg-black/40 px-2.5 py-1.5 rounded-md backdrop-blur-md border border-white/10">
                    <MapPin size={14} className="text-white/60" /> {currentItem.location}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">

          <button
            onClick={(e) => { e.stopPropagation(); handleShare(); }}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors relative"
            title="Share Link"
          >
            <Share2 size={18} className="md:w-5 md:h-5" />
            {shareFeedback && (
              <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-brand-500 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap">
                Copied!
              </span>
            )}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setShowInfo(!showInfo); }}
            className={cn(
              "p-2.5 rounded-full transition-colors",
              showInfo ? "bg-brand-500 text-white" : "bg-white/10 hover:bg-white/20 text-white"
            )}
            title="Information"
          >
            <Info size={18} className="md:w-5 md:h-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors ml-1 md:ml-2"
            aria-label="Close"
          >
            <X size={20} className="md:w-6 md:h-6" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className="flex-1 relative flex items-center justify-center cursor-default bg-black/40"
        onClick={() => setShowControls(!showControls)}
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
            {items.map((item, index) => {
              // Virtualization: only render current and adjacent items
              const distance = Math.abs(index - currentIndex);
              const isAdjacent = distance <= 1 || distance === items.length - 1;

              if (!isAdjacent) return <div key={item._id} className="flex-[0_0_100%] min-w-0" />;

              return (
                <div
                  key={item._id}
                  className="flex-[0_0_100%] min-w-0 h-full relative"
                >
                  <div className="w-full h-full flex items-center justify-center p-2 md:p-16 lg:p-24">
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
            );
          })}
          </div>
        </div>
      </div>


    </div>
  );

  if (!mounted) return null;

  return createPortal(lightboxContent, document.body);
}
