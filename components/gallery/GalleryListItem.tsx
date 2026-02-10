'use client';

import Image from 'next/image';
import { GalleryItem } from '@/app/gallery/page';
import { urlFor } from '@/sanity/lib/image';
import { Film, MapPin, Calendar } from 'lucide-react';

interface GalleryListItemProps {
    item: GalleryItem;
    onClick: () => void;
}

export default function GalleryListItem({ item, onClick }: GalleryListItemProps) {
    const isVideo = item.mediaType === 'video';
    const imageAsset = isVideo ? item.videoThumbnail : item.image;

    return (
        <div
            onClick={onClick}
            className="group flex flex-col sm:flex-row gap-4 p-4 bg-white dark:bg-stone-900 rounded-xl shadow-sm hover:shadow-lg ring-1 ring-stone-200/50 dark:ring-stone-700/50 hover:ring-orange-500/30 dark:hover:ring-orange-400/30 transition-all duration-300 cursor-pointer"
        >
            {/* Thumbnail */}
            <div className="relative w-full sm:w-48 md:w-64 flex-shrink-0 aspect-[4/3] sm:aspect-square overflow-hidden rounded-lg bg-stone-100 dark:bg-stone-800">
                {imageAsset && (
                    <Image
                        src={urlFor(imageAsset).width(400).height(400).url()}
                        alt={imageAsset.alt || item.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 256px"
                    />
                )}

                {/* Video Play Icon Overlay */}
                {isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/20">
                        <div className="w-10 h-10 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/50">
                            <svg className="w-4 h-4 text-white fill-white ml-0.5" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>
                )}

                {/* Film Badge */}
                {item.medium === 'Film' && !isVideo && (
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded flex items-center gap-1">
                        <Film className="w-3 h-3" />
                        35mm
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-center min-w-0">
                <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-1 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    {item.title}
                </h3>
                
                <p className="text-stone-500 dark:text-stone-400 text-sm mb-3">
                    {item.category}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-stone-400">
                    {item.location && (
                        <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {item.location}
                        </span>
                    )}
                    
                    {item.medium && (
                        <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {item.medium}
                        </span>
                    )}

                    {item.vibe && (
                        <span className="px-2 py-0.5 bg-stone-100 dark:bg-stone-800 rounded-full">
                            {item.vibe}
                        </span>
                    )}
                </div>
            </div>

            {/* Arrow */}
            <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-400 group-hover:bg-orange-100 dark:group-hover:bg-orange-900/30 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </div>
    );
}
