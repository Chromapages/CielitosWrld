'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { GalleryItem } from '@/app/gallery/page';
import { 
  X, ChevronLeft, ChevronRight,
  Info, Camera, Aperture, Clock, MapPin, Calendar,
  ZoomIn, ZoomOut, Maximize2, Sparkles, Eye
} from 'lucide-react';

interface GalleryLightboxProps {
  items: GalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function GalleryLightbox({
  items,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
}: GalleryLightboxProps) {
  const [showInfo, setShowInfo] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const currentItem = items[currentIndex];
  if (!currentItem || !isOpen) return null;

  const isVideo = currentItem.mediaType === 'video';
  const imageAsset = isVideo ? currentItem.videoThumbnail : currentItem.image;





  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.5, 1));

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onPrev();
    if (e.key === 'ArrowRight') onNext();
    if (e.key === 'i' || e.key === 'I') setShowInfo(!showInfo);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col"
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Top Bar */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-start justify-between p-4 md:p-6 text-white z-30 relative"
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
              <AnimatePresence>
                {showInfo && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 left-4 md:left-6 flex flex-col gap-3 pointer-events-auto"
                  >
                    {currentItem.description && (
                      <p className="text-white/90 text-sm leading-relaxed max-w-lg drop-shadow-md pb-1 bg-black/20 p-3 rounded-lg backdrop-blur-md border border-white/10">
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-2">
              {/* Zoom Controls */}
              <button
                onClick={handleZoomOut}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                disabled={zoom <= 1}
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <span className="text-sm text-white/60 w-12 text-center">{Math.round(zoom * 100)}%</span>
              <button
                onClick={handleZoomIn}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                disabled={zoom >= 3}
              >
                <ZoomIn className="w-5 h-5" />
              </button>

              <div className="w-px h-6 bg-white/20 mx-2" />

              {/* Info Toggle */}
              <button
                onClick={() => setShowInfo(!showInfo)}
                className={`p-2 rounded-full transition-colors ${showInfo ? 'bg-white/20' : 'hover:bg-white/10'}`}
              >
                <Info className="w-5 h-5" />
              </button>

              {/* Share */}




              <div className="w-px h-6 bg-white/20 mx-2" />

              {/* Close */}
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </motion.div>

          {/* Main Image Area */}
          <div className="flex-1 flex items-center justify-center relative overflow-hidden">
            {/* Navigation Arrows */}
            <button
              onClick={onPrev}
              className="absolute left-4 z-10 p-3 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md text-white transition-all hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={onNext}
              className="absolute right-4 z-10 p-3 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md text-white transition-all hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Container */}
            <motion.div
              key={currentItem._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full flex items-center justify-center p-4 md:p-12"
            >
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                </div>
              )}
              
              {imageAsset && (
                <Image
                  src={urlFor(imageAsset).width(2000).quality(95).url()}
                  alt={currentItem.title}
                  width={1200}
                  height={800}
                  className="max-w-full max-h-full object-contain transition-transform duration-300"
                  style={{ transform: `scale(${zoom})` }}
                  onLoadingComplete={() => setIsLoading(false)}
                  priority
                />
              )}
            </motion.div>
          </div>

          {/* Bottom Info Bar */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="p-4 md:p-6 text-white z-20"
          >
            <div className="md:hidden mb-2">
              <h3 className="text-lg font-bold">{currentItem.title}</h3>
            </div>
            <p className="text-sm text-white/60">
              {currentItem.category}
              {currentItem.location && ` · ${currentItem.location}`}
            </p>
          </motion.div>


        </motion.div>
      )}
    </AnimatePresence>
  );
}
