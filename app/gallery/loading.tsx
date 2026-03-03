import React from "react";
import { SkeletonImage } from "@/components/ui/SkeletonImage";

export default function GalleryLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <div className="mx-auto h-10 w-48 animate-pulse rounded bg-stone-200 dark:bg-stone-800" />
        <div className="mx-auto mt-4 h-4 w-64 animate-pulse rounded bg-stone-200 dark:bg-stone-800" />
      </div>

      {/* Masonry-like skeleton grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(12)].map((_, i) => (
          <SkeletonImage
            key={i}
            aspectRatio={i % 3 === 0 ? "portrait" : i % 3 === 1 ? "square" : "landscape"}
          />
        ))}
      </div>
    </div>
  );
}
