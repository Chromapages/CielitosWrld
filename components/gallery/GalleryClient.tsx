'use client';

import { useState, useMemo } from 'react';
import GallerySidebar from '@/components/gallery/GallerySidebar';
import GalleryMobileFilters from '@/components/gallery/GalleryMobileFilters';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import GallerySkeleton from '@/components/gallery/GallerySkeleton';
import EmptyState from '@/components/gallery/EmptyState';
import Lightbox from '@/components/gallery/Lightbox';
import { FilterX, Search, X, ArrowUpDown, LayoutGrid, Columns3 } from 'lucide-react';
import PageBackground from '@/components/ui/PageBackground';
import { GalleryItem } from '@/app/gallery/page';
import { cn } from '@/lib/utils';

interface GalleryClientProps {
    initialItems: GalleryItem[];
    pageData: any;
}

export default function GalleryClient({ initialItems, pageData }: GalleryClientProps) {
    const [items] = useState<GalleryItem[]>(initialItems);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const [mediaType, setMediaType] = useState<'photo' | 'video'>('photo');

    // Search State
    const [searchQuery, setSearchQuery] = useState('');

    // Sort State
    const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'title'>('newest');

    // View Mode State
    const [viewMode, setViewMode] = useState<'masonry' | 'grid'>('masonry');

    // Filter State
    const [filters, setFilters] = useState({
        category: [] as string[],
        medium: [] as string[],
        vibe: [] as string[],
        location: [] as string[],
    });

    // Filter and Sort Logic
    const filteredItems = useMemo(() => {
        let result = items.filter((item) => {
            // 1. Filter by Media Type
            if (item.mediaType !== mediaType) return false;

            // 2. Filter by Attributes
            if (filters.category.length > 0 && !filters.category.includes(item.category)) return false;
            if (filters.medium.length > 0 && !filters.medium.includes(item.medium || '')) return false;
            // Location and Vibe removed from UI but logic kept for safety/future
            if (filters.vibe.length > 0 && !filters.vibe.includes(item.vibe || '')) return false;
            if (filters.location.length > 0 && !filters.location.includes(item.location || '')) return false;

            // 3. Search by title
            if (searchQuery.trim()) {
                const query = searchQuery.toLowerCase();
                const titleMatch = item.title.toLowerCase().includes(query);
                const categoryMatch = item.category.toLowerCase().includes(query);
                const locationMatch = item.location?.toLowerCase().includes(query) ?? false;
                if (!titleMatch && !categoryMatch && !locationMatch) return false;
            }

            return true;
        });

        // 4. Sort results
        result = [...result].sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    // Assuming _id contains timestamp or we use index as proxy
                    return b._id.localeCompare(a._id);
                case 'oldest':
                    return a._id.localeCompare(b._id);
                case 'title':
                    return a.title.localeCompare(b.title);
                default:
                    return 0;
            }
        });

        return result;
    }, [items, filters, mediaType, searchQuery, sortBy]);

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
    const isFiltered = activeFilterCount > 0 || searchQuery.trim() !== '';

    // Get all active filters as array for pills
    const getActiveFilters = () => {
        const active: { type: string; value: string; label: string }[] = [];
        Object.entries(filters).forEach(([type, values]) => {
            values.forEach(value => {
                active.push({ type, value, label: value });
            });
        });
        return active;
    };

    const activeFilters = getActiveFilters();

    return (
        <div className={cn(
            "min-h-screen pt-24 pb-20 md:pt-32 -mt-16 md:-mt-24 relative transition-colors duration-700 ease-in-out",
            mediaType === 'video' ? "bg-stone-950 text-white" : "bg-white dark:bg-stone-950"
        )}>
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
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <p className="text-stone-600 dark:text-stone-400 text-lg max-w-2xl">
                            {pageData?.subtitle || 'A curated collection of moments, captured in time.'}
                        </p>
                        <div className="flex items-center gap-4">
                            {mediaType === 'video' && pageData?.youtubeChannelUrl && (
                                <a
                                    href={pageData.youtubeChannelUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-full transition-colors shadow-lg shadow-red-900/20 group"
                                >
                                    <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                                    </svg>
                                    SUBSCRIBE
                                </a>
                            )}
                            <div className="text-sm font-medium text-stone-500 dark:text-stone-500">
                                Showing {filteredItems.length} of {items.length} results
                            </div>
                        </div>
                    </div>

                    {/* Search and Sort Bar */}
                    <div className="flex flex-col sm:flex-row gap-3 mb-4">
                        {/* Search Input */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                            <input
                                type="text"
                                placeholder="Search by title, category, or location..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors"
                                >
                                    <X className="w-3 h-3 text-stone-400" />
                                </button>
                            )}
                        </div>

                        {/* Sort Dropdown */}
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                                className="appearance-none pl-10 pr-8 py-2.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all cursor-pointer"
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="title">Title (A-Z)</option>
                            </select>
                            <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                        </div>

                        {/* View Mode Toggle */}
                        <div className="flex p-1 bg-stone-100 dark:bg-stone-900 rounded-lg">
                            <button
                                onClick={() => setViewMode('masonry')}
                                className={cn(
                                    "p-2 rounded-md transition-all",
                                    viewMode === 'masonry'
                                        ? "bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-sm"
                                        : "text-stone-500 hover:text-stone-900 dark:hover:text-stone-300"
                                )}
                                aria-label="Masonry view"
                                title="Masonry view"
                            >
                                <Columns3 className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('grid')}
                                className={cn(
                                    "p-2 rounded-md transition-all",
                                    viewMode === 'grid'
                                        ? "bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-sm"
                                        : "text-stone-500 hover:text-stone-900 dark:hover:text-stone-300"
                                )}
                                aria-label="Grid view"
                                title="Grid view"
                            >
                                <LayoutGrid className="w-4 h-4" />
                            </button>
                        </div>

                    </div>

                    {/* Active Filter Pills */}
                    {(activeFilters.length > 0 || searchQuery) && (
                        <div className="flex flex-wrap items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
                            <span className="text-xs font-medium text-stone-500 dark:text-stone-400">Active:</span>

                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-medium rounded-full hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors group"
                                >
                                    <Search className="w-3 h-3" />
                                    "{searchQuery}"
                                    <X className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                                </button>
                            )}

                            {activeFilters.map((filter) => (
                                <button
                                    key={`${filter.type}-${filter.value}`}
                                    onClick={() => handleFilterChange(filter.type as keyof typeof filters, filter.value)}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-medium rounded-full hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors group"
                                >
                                    <span className="capitalize text-stone-400">{filter.type}:</span>
                                    {filter.label}
                                    <X className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                                </button>
                            ))}

                            <button
                                onClick={() => {
                                    clearFilters();
                                    setSearchQuery('');
                                }}
                                className="text-xs text-orange-600 hover:text-orange-700 font-medium ml-2 hover:underline"
                            >
                                Clear all
                            </button>
                        </div>
                    )}
                </div>

                <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-8 lg:gap-12">

                    {/* Desktop Sidebar */}
                    <aside className="hidden md:block w-64 flex-shrink-0 sticky top-32 self-start h-[calc(100vh-8rem)] overflow-y-auto pr-4 scrollbar-thin">
                        <div className="bg-white/80 dark:bg-stone-950/80 backdrop-blur-xl rounded-2xl p-4 border border-stone-200/50 dark:border-stone-800/50 shadow-lg shadow-stone-200/20 dark:shadow-black/20">
                            <GallerySidebar
                                filters={filters}
                                onFilterChange={handleFilterChange}
                                onClear={clearFilters}
                                counts={items}
                                mediaType={mediaType}
                                onMediaTypeChange={setMediaType}
                            />
                        </div>
                    </aside>

                    {/* Mobile Filter Bar */}
                    <div className="md:hidden mb-6 sticky top-0 z-30 bg-white/90 dark:bg-stone-950/90 backdrop-blur-md py-2 -mx-4 px-4 border-b border-stone-100 dark:border-stone-900">
                        <GalleryMobileFilters
                            filters={filters}
                            onFilterChange={handleFilterChange}
                            onClear={clearFilters}
                            activeCount={activeFilterCount}
                            mediaType={mediaType}
                            onMediaTypeChange={setMediaType}
                        />
                    </div>

                    {/* Main Content */}
                    <main className="flex-1 min-h-[50vh]">
                        {/* Grid View (Always visible) */}
                        <div>
                            {filteredItems.length > 0 ? (
                                <GalleryGrid
                                    items={filteredItems}
                                    onImageClick={(index) => setSelectedImageIndex(index)}
                                    viewMode={viewMode}
                                />
                            ) : items.length === 0 ? (
                                <EmptyState
                                    type="no-images"
                                />
                            ) : (
                                <EmptyState
                                    type="no-results"
                                    searchQuery={searchQuery}
                                    onClearFilters={() => {
                                        clearFilters();
                                        setSearchQuery('');
                                    }}
                                />
                            )}
                        </div>
                    </main>

                </div>

                {/* Lightbox */}
                {selectedImageIndex !== null && (
                    <Lightbox
                        items={filteredItems}
                        initialIndex={selectedImageIndex}
                        onClose={() => setSelectedImageIndex(null)}
                    />
                )}
            </div>
        </div>
    );
}
