'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { GalleryItem } from '@/app/gallery/page';
import { 
  X, ChevronLeft, ChevronRight, Share2, Download, 
  Info, Camera, Aperture, Clock, MapPin, Calendar,
  ZoomIn, ZoomOut, Maximize2
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
  const [shareFeedback, setShareFeedback] = useState(false);

  const currentItem = items[currentIndex];
  if (!currentItem || !isOpen) return null;

  const isVideo = currentItem.mediaType === 'video';
  const imageAsset = isVideo ? currentItem.videoThumbnail : currentItem.image;

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setShareFeedback(true);
      setTimeout(() => setShareFeedback(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = () => {
    if (!isVideo && imageAsset) {
      const link = document.createElement('a');
      link.href = urlFor(imageAsset).width(2400).quality(95).auto('format').url();
      link.download = `${currentItem.title || 'image'}.jpg`;
      link.target = '_blank';
      link.click();
    }
  };

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
            className="flex items-center justify-between p-4 md:p-6 text-white z-20"
          >
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-white/60">
                {currentIndex + 1} / {items.length}
              </span>
              <h3 className="hidden md:block text-lg font-bold truncate max-w-md">
                {currentItem.title}
              </h3>
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
              <button
                onClick={handleShare}
                className="p-2 hover:bg-white/10 rounded-full transition-colors relative"
              >
                <Share2 className="w-5 h-5" />
                {shareFeedback && (
                  <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs bg-white text-black px-2 py-1 rounded whitespace-nowrap"
                  >
                    Copied!
                  </motion.span>
                )}
              </button>

              {/* Download */}
              {!isVideo && (
                <button
                  onClick={handleDownload}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <Download className="w-5 h-5" />
                </button>
              )}

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

          {/* Info Panel - Slide in from right */}
          <AnimatePresence>
            {showInfo && (
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-black/90 backdrop-blur-xl border-l border-white/10 p-6 overflow-y-auto z-30"
              >
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-lg font-bold text-white">Image Details</h4>
                  <button
                    onClick={() => setShowInfo(false)}
                    className="p-1 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Title & Category */}
                  <div>
                    <h5 className="text-xl font-bold text-white mb-1">{currentItem.title}</h5>
                    <p className="text-orange-400">{currentItem.category}</p>
                  </div>

                  {/* Location */}
                  {currentItem.location && (
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-white/60 mt-0.5" />
                      <div>
                        <p className="text-xs text-white/40 uppercase tracking-wider">Location</p>
                        <p className="text-white">{currentItem.location}</p>
                      </div>
                    </div>
                  )}

                  {/* Medium */}
                  {currentItem.medium && (
                    <div className="flex items-start gap-3">
                      <Camera className="w-5 h-5 text-white/60 mt-0.5" />
                      <div>
                        <p className="text-xs text-white/40 uppercase tracking-wider">Medium</p>
                        <p className="text-white">{currentItem.medium}</p>
                      </div>
                    </div>
                  )}

                  {/* Vibe */}
                  {currentItem.vibe && (
                    <div className="flex items-start gap-3">
                      <Aperture className="w-5 h-5 text-white/60 mt-0.5" />
                      <div>
                        <p className="text-xs text-white/40 uppercase tracking-wider">Vibe</p>
                        <p className="text-white">{currentItem.vibe}</p>
                      </div>
                    </div>
                  )}

                  {/* Dimensions */}
                  {imageAsset?.asset?.metadata?.dimensions && (
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Technical Details</p>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-white/40">Dimensions</p>
                          <p className="text-white">
                            {imageAsset.asset.metadata.dimensions.width} × {imageAsset.asset.metadata.dimensions.height}
                          </p>
                        </div>
                        <div>
                          <p className="text-white/40">Aspect Ratio</p>
                          <p className="text-white">
                            {(imageAsset.asset.metadata.dimensions.width / imageAsset.asset.metadata.dimensions.height).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* File Info */}
                  <div className="pt-4 border-t border-white/10 text-sm text-white/40">
                    <p>Press <kbd className="px-2 py-1 bg-white/10 rounded text-white">←</kbd> <kbd className="px-2 py-1 bg-white/10 rounded text-white">→</kbd> to navigate</p>
                    <p className="mt-1">Press <kbd className="px-2 py-1 bg-white/10 rounded text-white">I</kbd> to toggle info</p>
                    <p className="mt-1">Press <kbd className="px-2 py-1 bg-white/10 rounded text-white">ESC</kbd> to close</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
