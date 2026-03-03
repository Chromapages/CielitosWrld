'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { GalleryItem } from '@/app/gallery/page';
import { urlFor } from '@/sanity/lib/image';
import { Film, Eye } from 'lucide-react';
import { getYouTubeThumbnail } from '@/lib/videoUtils';

interface GalleryCardProps {
    item: GalleryItem;
    onClick: () => void;
    aspectRatio?: string;
}

export default function GalleryCard({ item, onClick, aspectRatio }: GalleryCardProps) {
    const isVideo = item.mediaType === 'video';
    const imageAsset = isVideo ? item.videoThumbnail : item.image;
    const videoRef = useRef<HTMLVideoElement>(null);

    // Auto-generate thumbnail for YouTube videos if missing manual upload
    const youtubeThumbnail = (!imageAsset && isVideo && item.videoEmbedUrl)
        ? getYouTubeThumbnail(item.videoEmbedUrl, 'maxres') || getYouTubeThumbnail(item.videoEmbedUrl, 'hq')
        : null;

    // Fallback dimensions if metadata is missing
    const width = imageAsset?.asset?.metadata?.dimensions?.width || 1600;
    const height = imageAsset?.asset?.metadata?.dimensions?.height || (isVideo ? 900 : 1200);

    const handleMouseEnter = () => {
        if (isVideo && item.hoverVideo && videoRef.current) {
            videoRef.current.play().catch(() => {
                // Autoplay might be blocked, ignore
            });
        }
    };

    const handleMouseLeave = () => {
        if (isVideo && videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    return (
        <div
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="group relative cursor-pointer overflow-hidden rounded-lg bg-stone-100 dark:bg-stone-900 shadow-md hover:shadow-xl ring-1 ring-stone-200/50 dark:ring-stone-700/50 hover:ring-orange-500/30 dark:hover:ring-orange-400/30 transition-all duration-300 ease-out hover:scale-[1.05]"
            style={{ aspectRatio: item.isShort ? '9/16' : aspectRatio || `${width} / ${height}` }}
        >
            {(imageAsset || youtubeThumbnail) ? (
                <Image
                    src={imageAsset
                      ? (() => {
                          try {
                            return urlFor(imageAsset).width(900).quality(78).auto('format').fit('max').url();
                          } catch {
                            return imageAsset?.asset?.url || imageAsset?.url || '';
                          }
                        })()
                      : youtubeThumbnail!}
                    alt={imageAsset?.alt || item.title}
                    fill
                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                    placeholder={imageAsset?.asset?.metadata?.lqip ? 'blur' : 'empty'}
                    blurDataURL={imageAsset?.asset?.metadata?.lqip}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized={!imageAsset} // Required for external YouTube URLs
                />
            ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-200 dark:bg-stone-800 text-stone-400">
                    <Film className="w-12 h-12 opacity-50 mb-2" />
                    <span className="text-xs font-medium uppercase tracking-wider opacity-50">No Thumbnail</span>
                </div>
            )}

            {/* Hover Video Preview */}
            {isVideo && item.hoverVideo && (
                <video
                    ref={videoRef}
                    src={item.hoverVideo}
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
            )}

            {/* Video Play Icon Overlay (Fades out on hover if preview plays) */}
            {isVideo && (
                <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${item.hoverVideo ? 'group-hover:opacity-0' : ''}`}>
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
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 md:p-6 pointer-events-none">
                <h3 className="text-white font-bold font-archivo text-base md:text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300 drop-shadow-lg line-clamp-2">
                    {item.title}
                </h3>
                <div className="text-stone-200 text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 drop-shadow-md flex items-center gap-2 mt-1">
                    <span>{item.category}</span>
                    {item.location && <span>· {item.location}</span>}
                </div>

                {/* Video Stats */}
                {isVideo && item.videoStats && (
                    <div className="flex items-center gap-3 mt-2 text-xs text-stone-300 font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                        {item.videoStats.views && (
                            <span className="flex items-center gap-1">
                                <Eye className="w-3 h-3" /> {item.videoStats.views}
                            </span>
                        )}
                        {item.videoStats.duration && (
                            <span className="bg-black/40 px-1.5 py-0.5 rounded text-white border border-white/10">
                                {item.videoStats.duration}
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Badges */}
            {item.medium === 'Film' && !isVideo && (
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white text-xs font-medium px-2 py-1 rounded flex items-center gap-1 group-hover:rotate-3 transition-transform duration-300 pointer-events-none">
                    <Film className="w-3 h-3 group-hover:rotate-12 transition-transform duration-300" />
                    35mm
                </div>
            )}

            {/* Shorts Badge */}
            {item.isShort && (
                <div className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 shadow-lg pointer-events-none">
                    <span className="uppercase tracking-wider">Shorts</span>
                </div>
            )}
        </div>
    );
}
