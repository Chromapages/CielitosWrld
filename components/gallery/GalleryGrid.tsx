'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GalleryItem } from '@/app/gallery/page';
import GalleryCard from './GalleryCard';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

interface GalleryGridProps {
  items: GalleryItem[];
  onImageClick: (index: number) => void;
  viewMode?: 'masonry' | 'grid';
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
};



export default function GalleryGrid({ items, onImageClick, viewMode = 'masonry' }: GalleryGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "0px 0px -100px 0px" });
  const shouldReduceMotion = useReducedMotion();

  const activeContainerVariants = shouldReduceMotion ? { hidden: { opacity: 1 }, visible: { opacity: 1 } } : containerVariants;
  const activeItemVariants = shouldReduceMotion ? { hidden: { opacity: 1 }, visible: { opacity: 1 } } : itemVariants;

  if (viewMode === 'masonry') {
    return (
      <motion.div
        ref={containerRef}
        className="columns-2 md:columns-2 lg:columns-3 gap-3 md:gap-6 space-y-3 md:space-y-6"
        initial="visible"
        animate="visible"
        variants={activeContainerVariants}
      >
        {items.map((item, idx) => (
          <motion.div
            key={item._id}
            className="break-inside-avoid"
            variants={activeItemVariants}
          >
            <GalleryCard
              item={item}
              onClick={() => onImageClick(idx)}
            />
          </motion.div>
        ))}
      </motion.div>
    );
  }

  if (viewMode === 'grid') {
    return (
      <motion.div
        ref={containerRef}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6"
        initial="visible"
        animate="visible"
        variants={activeContainerVariants}
      >
        {items.map((item, idx) => (
          <motion.div
            key={item._id}
            variants={activeItemVariants}
          >
            <GalleryCard
              item={item}
              onClick={() => onImageClick(idx)}
              aspectRatio="2/3"
            />
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return null;
}
