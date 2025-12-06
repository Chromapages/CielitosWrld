'use client';

import { useState, useMemo } from 'react';
import GallerySidebar from '@/components/gallery/GallerySidebar';
import GalleryMobileFilters from '@/components/gallery/GalleryMobileFilters';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import Lightbox from '@/components/gallery/Lightbox';
import { FilterX } from 'lucide-react';
import PageBackground from '@/components/ui/PageBackground';
import { GalleryItem } from '@/app/gallery/page';

interface GalleryClientProps {
    initialItems: GalleryItem[];
    pageData: any;
}

export default function GalleryClient({ initialItems, pageData }: GalleryClientProps) {
    const [items] = useState<GalleryItem[]>(initialItems);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const [mediaType, setMediaType] = useState<'photo' | 'video'>('photo');

    // Filter State
    const [filters, setFilters] = useState({
        category: [] as string[],
        medium: [] as string[],
        vibe: [] as string[],
        location: [] as string[],
    });

    // Filter Logic
    const filteredItems = useMemo(() => {
        return items.filter((item) => {
            // 1. Filter by Media Type
            if (item.mediaType !== mediaType) return false;

            // 2. Filter by Attributes
            if (filters.category.length > 0 && !filters.category.includes(item.category)) return false;
            if (filters.medium.length > 0 && !filters.medium.includes(item.medium || '')) return false;
            // Location and Vibe removed from UI but logic kept for safety/future
            if (filters.vibe.length > 0 && !filters.vibe.includes(item.vibe || '')) return false;
            if (filters.location.length > 0 && !filters.location.includes(item.location || '')) return false;
            return true;
        });
    }, [items, filters, mediaType]);

    const handleFilterChange = (type: keyof typeof filters, value: string) => {
        setFilters((prev) => {
            const current = prev[type];
            const updated = current.includes(value)
                ? current.filter((item) => item !== value)
                : [...current, value];
            return { ...prev, [type]: updated };
        });
    };

    const clearFilters = () => {
        setFilters({
            category: [],
            medium: [],
            vibe: [],
            location: [],
        });
    };

    const activeFilterCount = Object.values(filters).reduce((acc, curr) => acc + curr.length, 0);
    const isFiltered = activeFilterCount > 0;

    return (
        <div className="min-h-screen bg-white dark:bg-stone-950 pt-24 pb-20 md:pt-32 -mt-16 md:-mt-24 relative">
            {/* Background Image */}
            {pageData?.pageBackground && (
                <PageBackground image={pageData.pageBackground} />
            )}

            <div className="relative z-10">

                {/* Header */}
                <div className="container mx-auto px-4 md:px-8 mb-8 md:mb-12">
                    <h1 className="font-pattaya text-4xl md:text-6xl font-bold text-stone-900 dark:text-stone-50 mb-4">
                        {pageData?.title || 'Visual Stories'}
                    </h1>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <p className="text-stone-600 dark:text-stone-400 text-lg max-w-2xl">
                            {pageData?.subtitle || 'A curated collection of moments, captured in time.'}
                        </p>
                        <div className="text-sm font-medium text-stone-500 dark:text-stone-500">
                            Showing {isFiltered ? filteredItems.length : items.length} results
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-8 lg:gap-12">

                    {/* Desktop Sidebar */}
                    <aside className="hidden md:block w-64 flex-shrink-0 sticky top-32 self-start h-[calc(100vh-8rem)] overflow-y-auto pr-4 scrollbar-thin">
                        <GallerySidebar
                            filters={filters}
                            onFilterChange={handleFilterChange}
                            onClear={clearFilters}
                            counts={items}
                            mediaType={mediaType}
                            onMediaTypeChange={setMediaType}
                        />
                    </aside>

                    {/* Mobile Filter Bar */}
                    <div className="md:hidden mb-6 sticky top-0 z-30 bg-white/90 dark:bg-stone-950/90 backdrop-blur-md py-2 -mx-4 px-4 border-b border-stone-100 dark:border-stone-900">
                        <GalleryMobileFilters
                            filters={filters}
                            onFilterChange={handleFilterChange}
                            onClear={clearFilters}
                            activeCount={activeFilterCount}
                        />
                    </div>

                    {/* Main Content */}
                    <main className="flex-1 min-h-[50vh]">
                        {/* Grid View (Always visible) */}
                        <div>
                            {items.length > 0 ? (
                                <GalleryGrid
                                    items={isFiltered ? filteredItems : items}
                                    onImageClick={(index) => setSelectedImageIndex(index)}
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center py-20 text-stone-400">
                                    <FilterX className="w-12 h-12 mb-4 opacity-50" />
                                    <p className="text-lg font-medium">{pageData?.noImagesMessage || 'No images found.'}</p>
                                    <button
                                        onClick={clearFilters}
                                        className="mt-4 text-orange-600 hover:underline"
                                    >
                                        {pageData?.clearFiltersLabel || 'Clear all filters'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </main>

                </div>

                {/* Lightbox */}
                {selectedImageIndex !== null && (
                    <Lightbox
                        items={isFiltered ? filteredItems : items}
                        initialIndex={selectedImageIndex}
                        onClose={() => setSelectedImageIndex(null)}
                    />
                )}
            </div>
        </div>
    );
}
