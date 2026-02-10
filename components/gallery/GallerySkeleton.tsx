'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface GallerySkeletonProps {
  count?: number;
}

export default function GallerySkeleton({ count = 12 }: GallerySkeletonProps) {
  // Generate random aspect ratios for masonry layout
  const aspectRatios = [
    'aspect-[3/4]',
    'aspect-[4/3]',
    'aspect-square',
    'aspect-[3/2]',
    'aspect-[2/3]',
    'aspect-[16/9]',
  ];

  return (
    <div className="columns-2 md:columns-2 lg:columns-3 gap-3 md:gap-6 space-y-3 md:space-y-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="break-inside-avoid opacity-0 animate-in fade-in duration-500 fill-mode-forwards"
        >
          <Skeleton
            className={cn(
              "w-full rounded-lg",
              aspectRatios[index % aspectRatios.length]
            )}
          />
        </div>
      ))}
    </div>
  );
}
