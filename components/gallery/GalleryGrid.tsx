'use client';

import { GalleryItem } from '@/app/gallery/page';
import GalleryCard from './GalleryCard';

interface GalleryGridProps {
  items: GalleryItem[];
  onImageClick: (index: number) => void;
}

export default function GalleryGrid({ items, onImageClick }: GalleryGridProps) {
  return (
    <div className="columns-2 md:columns-2 lg:columns-3 gap-3 md:gap-6 space-y-3 md:space-y-6">
      {items.map((item, index) => (
        <div key={item._id} className="break-inside-avoid">
          <GalleryCard
            item={item}
            onClick={() => onImageClick(index)}
          />
        </div>
      ))}
    </div>
  );
}