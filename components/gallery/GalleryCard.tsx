'use client';

import Image from 'next/image';
import { GalleryItem } from '@/app/gallery/page';
import { urlFor } from '@/sanity/lib/image';
import { Film } from 'lucide-react';

interface GalleryCardProps {
    item: GalleryItem;
    onClick: () => void;
    aspectRatio?: string;
}

export default function GalleryCard({ item, onClick, aspectRatio }: GalleryCardProps) {
    const isVideo = item.mediaType === 'video';
    const imageAsset = isVideo ? item.videoThumbnail : item.image;

    // Fallback dimensions if metadata is missing
    const width = imageAsset?.asset?.metadata?.dimensions?.width || 800;
    const height = imageAsset?.asset?.metadata?.dimensions?.height || 600;

    return (
        <div
            onClick={onClick}
            className="group relative cursor-pointer overflow-hidden rounded-lg bg-stone-100 dark:bg-stone-900 shadow-md hover:shadow-xl ring-1 ring-stone-200/50 dark:ring-stone-700/50 hover:ring-orange-500/30 dark:hover:ring-orange-400/30 transition-all duration-300 ease-out hover:scale-[1.05]"
            style={{ aspectRatio: aspectRatio || `${width} / ${height}` }}
        >
            {imageAsset && (
                <Image
                    src={urlFor(imageAsset).width(800).url()}
                    alt={imageAsset.alt || item.title}
                    width={800}
                    height={height}
                    className={`w-full ${aspectRatio ? 'h-full' : 'h-auto'} object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]`}
                    placeholder={imageAsset.asset?.metadata?.lqip ? 'blur' : 'empty'}
                    blurDataURL={imageAsset.asset?.metadata?.lqip}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            )}

            {/* Video Play Icon Overlay */}
            {isVideo && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 shadow-lg group-hover:scale-110 transition-transform duration-300 group-hover:animate-pulse">
                        <svg className="w-5 h-5 text-white fill-white ml-1" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </div>
            )}

            {/* Gradient Overlay - Always visible for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none" />

            {/* Overlay - Desktop */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 md:p-6">
                <h3 className="text-white font-bold font-archivo text-base md:text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300 drop-shadow-lg">
                    {item.title}
                </h3>
                <p className="text-stone-200 text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 drop-shadow-md">
                    {item.category} {item.location ? `· ${item.location}` : ''}
                </p>
            </div>

            {/* Badges */}
            {item.medium === 'Film' && !isVideo && (
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white text-xs font-medium px-2 py-1 rounded flex items-center gap-1 group-hover:rotate-3 transition-transform duration-300">
                    <Film className="w-3 h-3 group-hover:rotate-12 transition-transform duration-300" />
                    35mm
                </div>
            )}
        </div>
    );
}
