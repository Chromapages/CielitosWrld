'use client';

import { useState, useMemo } from 'react';
import GallerySidebar from '@/components/gallery/GallerySidebar';
import GalleryMobileFilters from '@/components/gallery/GalleryMobileFilters';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import GallerySkeleton from '@/components/gallery/GallerySkeleton';
import EmptyState from '@/components/gallery/EmptyState';
import Lightbox from '@/components/gallery/Lightbox';
import { MobileSection } from '@/components/layout/MobileSection';
import PageBackground from '@/components/ui/PageBackground';
import { GalleryItem } from '@/app/gallery/page';
import { Search, X, ArrowUpDown, LayoutGrid, Columns3 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GalleryClientProps {
    initialItems: GalleryItem[];
    pageData: any;
    initialCategory?: string;
}

export default function GalleryClient({ initialItems, pageData, initialCategory }: GalleryClientProps) {
    const [items] = useState<GalleryItem[]>(initialItems);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const [mediaType, setMediaType] = useState<'photo' | 'video'>('photo');

    // Search State
    const [searchQuery, setSearchQuery] = useState('');

    // Sort State
    const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'title'>('newest');

    // View Mode State
    const [viewMode, setViewMode] = useState<'masonry' | 'grid'>('masonry');

    // Filter State — initialize with initialCategory if provided (from category page route)
    const [filters, setFilters] = useState({
        category: initialCategory ? [initialCategory] : ([] as string[]),
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
            "relative transition-colors duration-700 ease-in-out",
            mediaType === 'video' ? "bg-stone-950 text-white" : "bg-white dark:bg-stone-950"
        )}>
            {/* Background Image */}
            {pageData?.pageBackground && (
                <PageBackground image={pageData.pageBackground} />
            )}

            <div className="relative z-10">
                {/* Header (Hidden on Mobile as it's in the stickyer header) */}
                <div className="container mx-auto max-w-7xl px-6 py-12 md:py-20">
                    <h1 className="hidden md:block font-pattaya text-3xl sm:text-4xl md:text-8xl font-bold text-stone-900 dark:text-stone-50 mb-6 drop-shadow-sm">
                        {pageData?.title || 'Visual Stories'}
                    </h1>
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <p className="hidden md:block text-stone-600 dark:text-stone-400 text-lg md:text-2xl max-w-3xl font-light leading-relaxed">
                            {pageData?.subtitle || 'A curated collection of moments, captured in time.'}
                        </p>
                        
                        <div className="flex items-center gap-4">
                            {mediaType === 'video' && pageData?.youtubeChannelUrl && (
                                <a
                                    href={pageData.youtubeChannelUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-press inline-flex items-center gap-2 px-6 py-2 bg-red-600 hover:bg-red-700 text-white dark:bg-red-700 dark:hover:bg-red-600 text-sm font-bold rounded-xl transition-all shadow-xl shadow-red-900/20 dark:shadow-red-950/40"
                                >
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                                    </svg>
                                    SUBSCRIBE
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Desktop Search & Controls */}
                    <div className="hidden sm:flex flex-wrap gap-4 mt-12 bg-stone-50 dark:bg-stone-900/50 p-4 rounded-2xl border border-stone-200 dark:border-stone-800">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                            <input
                                type="text"
                                placeholder="Search stories..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all font-medium"
                            />
                        </div>

                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                                className="appearance-none pl-10 pr-10 py-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all cursor-pointer font-bold"
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="title">Title (A-Z)</option>
                            </select>
                            <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                        </div>

                        <div className="flex p-1 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl">
                            <button
                                onClick={() => setViewMode('masonry')}
                                className={cn(
                                    "p-2 rounded-lg transition-all",
                                    viewMode === 'masonry'
                                        ? "bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white shadow-sm"
                                        : "text-stone-400 hover:text-stone-900 dark:hover:text-stone-200"
                                )}
                            >
                                <Columns3 className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setViewMode('grid')}
                                className={cn(
                                    "p-2 rounded-lg transition-all",
                                    viewMode === 'grid'
                                        ? "bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white shadow-sm"
                                        : "text-stone-400 hover:text-stone-900 dark:hover:text-stone-200"
                                )}
                            >
                                <LayoutGrid className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Active Filters */}
                    {(activeFilters.length > 0 || searchQuery) && (
                        <div className="flex flex-wrap items-center gap-2 mt-6 animate-in fade-in slide-in-from-top-2">
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="btn-press flex items-center gap-1.5 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-bold rounded-full border border-orange-200 dark:border-orange-800"
                                >
                                    <Search className="w-3.5 h-3.5" />
                                    "{searchQuery}"
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            )}

                            {activeFilters.map((filter) => (
                                <button
                                    key={`${filter.type}-${filter.value}`}
                                    onClick={() => handleFilterChange(filter.type as keyof typeof filters, filter.value)}
                                    className="btn-press flex items-center gap-1.5 px-4 py-2 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold rounded-full border border-stone-200 dark:border-stone-700"
                                >
                                    <span className="text-stone-400 uppercase text-[10px] tracking-widest">{filter.type}:</span>
                                    {filter.label}
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="container mx-auto max-w-[1600px] flex flex-col md:flex-row gap-8 lg:gap-12 relative px-4 sm:px-8">
                    {/* Desktop Sidebar */}
                    <aside className="hidden md:flex w-64 xl:w-72 flex-shrink-0 sticky top-32 self-start max-h-[calc(100vh-8rem)] z-10">
                        <div className="flex-1 overflow-hidden">
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

                    {/* Mobile Filter Bar - Sticky with System Height */}
                    <div className="md:hidden sticky top-[var(--mobile-header-height)] z-40 bg-white/95 dark:bg-stone-950/95 backdrop-blur-xl py-2 -mx-4 px-4 border-b border-stone-100 dark:border-stone-800/60 shadow-sm">
                        <GalleryMobileFilters
                            filters={filters}
                            onFilterChange={handleFilterChange}
                            onClear={clearFilters}
                            activeCount={activeFilterCount}
                            mediaType={mediaType}
                            onMediaTypeChange={setMediaType}
                            sortBy={sortBy}
                            onSortChange={setSortBy}
                            viewMode={viewMode}
                            onViewModeChange={setViewMode}
                        />
                    </div>

                    {/* Grid Section */}
                    <main className="flex-1 pb-20">
                        {filteredItems.length > 0 ? (
                            <GalleryGrid
                                items={filteredItems}
                                onImageClick={(index) => setSelectedImageIndex(index)}
                                viewMode={viewMode}
                            />
                        ) : items.length === 0 ? (
                            <div className="py-20">
                                <EmptyState type="no-images" />
                            </div>
                        ) : (
                            <div className="py-20">
                                <EmptyState
                                    type="no-results"
                                    searchQuery={searchQuery}
                                    onClearFilters={() => {
                                        clearFilters();
                                        setSearchQuery('');
                                    }}
                                />
                            </div>
                        )}
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
