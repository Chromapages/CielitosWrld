'use client';

import { GalleryItem } from '@/app/gallery/page';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { ArrowRight } from 'lucide-react';

interface GalleryFeedProps {
    items: GalleryItem[];
    onImageClick: (item: GalleryItem) => void;
}

interface FeedSectionProps {
    title: string;
    items: GalleryItem[];
    onImageClick: (item: GalleryItem) => void;
}

function FeedSection({ title, items, onImageClick }: FeedSectionProps) {
    const [emblaRef] = useEmblaCarousel({
        align: 'start',
        containScroll: 'trimSnaps',
        dragFree: true
    });

    if (items.length === 0) return null;

    return (
        <div className="mb-10 last:mb-0">
            <div className="px-4 mb-3 flex items-center justify-between">
                <h3 className="font-display text-xl font-bold text-stone-900 dark:text-stone-100">
                    {title}
                </h3>
                <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">
                    {items.length} Photos
                </span>
            </div>

            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-3 px-4">
                    {items.map((item) => (
                        <div
                            key={item._id}
                            className="flex-[0_0_80%] sm:flex-[0_0_45%] min-w-0 relative aspect-[4/5] rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-900"
                            onClick={() => onImageClick(item)}
                        >
                            <Image
                                src={urlFor(item.image).width(600).height(750).url()}
                                alt={item.image.alt || item.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 80vw, 45vw"
                                placeholder={item.image.asset.metadata?.lqip ? 'blur' : 'empty'}
                                blurDataURL={item.image.asset.metadata?.lqip}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                <p className="text-white font-medium text-sm truncate">{item.title}</p>
                            </div>
                        </div>
                    ))}

                    {/* "View All" Card */}
                    <div className="flex-[0_0_30%] min-w-0 flex flex-col items-center justify-center bg-stone-100 dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800">
                        <div className="w-10 h-10 rounded-full bg-white dark:bg-stone-800 flex items-center justify-center mb-2 shadow-sm">
                            <ArrowRight className="w-5 h-5 text-stone-600 dark:text-stone-400" />
                        </div>
                        <span className="text-xs font-medium text-stone-500">View All</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function GalleryFeed({ items, onImageClick }: GalleryFeedProps) {
    // Group items by category or other logic
    const portraits = items.filter(i => i.category?.toLowerCase() === 'portraits').slice(0, 8);
    const events = items.filter(i => i.category?.toLowerCase() === 'events').slice(0, 8);
    const film = items.filter(i => i.medium?.toLowerCase() === 'film').slice(0, 8);
    const brands = items.filter(i => i.category?.toLowerCase() === 'brands').slice(0, 8);
    const latest = items.slice(0, 6); // Just the most recent ones

    return (
        <div className="pb-20 space-y-2">
            <FeedSection title="Latest Work" items={latest} onImageClick={onImageClick} />
            <FeedSection title="Portraits" items={portraits} onImageClick={onImageClick} />
            <FeedSection title="Film Favorites" items={film} onImageClick={onImageClick} />
            <FeedSection title="Events & Shows" items={events} onImageClick={onImageClick} />
            <FeedSection title="Brands" items={brands} onImageClick={onImageClick} />
        </div>
    );
}
