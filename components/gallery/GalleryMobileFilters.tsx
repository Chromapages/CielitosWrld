'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SlidersHorizontal, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GalleryMobileFiltersProps {
    filters: {
        category: string[];
        medium: string[];
        vibe: string[];
        location: string[];
    };
    onFilterChange: (type: keyof GalleryMobileFiltersProps['filters'], value: string) => void;
    onClear: () => void;
    activeCount: number;
    mediaType: 'photo' | 'video';
    onMediaTypeChange: (type: 'photo' | 'video') => void;
    sortBy: 'newest' | 'oldest' | 'title';
    onSortChange: (sort: 'newest' | 'oldest' | 'title') => void;
    viewMode: 'masonry' | 'grid';
    onViewModeChange: (view: 'masonry' | 'grid') => void;
}

export default function GalleryMobileFilters({
    filters,
    onFilterChange,
    onClear,
    activeCount,
    mediaType,
    onMediaTypeChange,
    sortBy,
    onSortChange,
    viewMode,
    onViewModeChange
}: GalleryMobileFiltersProps) {
    const [isOpen, setIsOpen] = useState(false);

    // Predefined quick filters
    const quickFilters = [
        { label: 'All', href: '/gallery', type: 'all' as const },
        { label: 'Videos', href: null, type: 'mediaType' as const, value: 'video' as const },
        { label: 'Portraits', href: '/gallery/category/portraits', type: 'category' as const },
        { label: 'Events', href: '/gallery/category/events', type: 'category' as const },
        { label: 'Brands', href: '/gallery/category/brands', type: 'category' as const },
        { label: 'Film', href: null, type: 'medium' as const, value: 'Film' as const },
        { label: 'B&W', href: null, type: 'vibe' as const, value: 'Black & white' as const },
    ];

    // Helper to check if a filter is active
    const isActive = (type: string, value: string, href: string | null) => {
        if (type === 'all') return activeCount === 0 && mediaType === 'photo';
        if (type === 'mediaType') return mediaType === value;
        return filters[type as keyof typeof filters]?.includes(value);
    };

    // Helper to handle quick filter click
    const handleQuickFilter = (e: React.MouseEvent, type: string, value: string | undefined, href: string | null) => {
        if (href) {
            // Navigate to dedicated category page
            window.location.assign(href);
            return;
        }
        if (type === 'all') {
            onClear();
            onMediaTypeChange('photo');
        } else if (type === 'mediaType' && value) {
            onMediaTypeChange(value as 'photo' | 'video');
        } else if (value) {
            onFilterChange(type as keyof typeof filters, value);
        }
    };

    // Identify "extra" active filters that are NOT in the quick list
    const getExtraFilters = () => {
        const extras: { type: string, value: string }[] = [];

        // Check all active filters
        Object.entries(filters).forEach(([type, values]) => {
            values.forEach(val => {
                // If this value is NOT in quickFilters, add it to extras
                const isQuick = quickFilters.some(q => q.type === type && q.value === val);
                if (!isQuick) {
                    extras.push({ type, value: val });
                }
            });
        });
        return extras;
    };

    const extraFilters = getExtraFilters();

    return (
        <div className="flex flex-col gap-2">
            {/* Top Row: Filters Btn + Quick Chips */}
            <div className="relative group/filters px-4 -mx-4">
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
                {/* Main Filter Button */}
                <button
                    onClick={() => setIsOpen(true)}
                    className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0 shadow-sm border",
                        activeCount > 0
                            ? "bg-stone-900 text-white border-stone-900 dark:bg-stone-100 dark:text-stone-900 dark:border-stone-100"
                            : "bg-white text-stone-700 border-stone-200 dark:bg-stone-900 dark:text-stone-300 dark:border-stone-800"
                    )}
                >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                    {activeCount > 0 && (
                        <span className="ml-1 bg-white/20 px-1.5 py-0.5 rounded-full text-xs">
                            {activeCount}
                        </span>
                    )}
                </button>

                {/* Quick Chips */}
                {quickFilters.map((filter) => {
                    const active = isActive(filter.type, filter.value ?? '', filter.href);
                    const Wrapper = filter.href ? 'a' : 'button';
                    const wrapperProps = filter.href
                        ? { href: filter.href }
                        : { onClick: (e: React.MouseEvent) => handleQuickFilter(e, filter.type, filter.value, filter.href) };
                    return (
                        <Wrapper
                            key={filter.label}
                            {...wrapperProps}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0 shadow-sm border",
                                active
                                    ? "bg-stone-900 text-white border-stone-900 dark:bg-stone-100 dark:text-stone-900 dark:border-stone-100"
                                    : "bg-white text-stone-600 border-stone-200 dark:bg-stone-900 dark:text-stone-400 dark:border-stone-800"
                            )}
                        >
                            {filter.label}
                        </Wrapper>
                    );
                })}
                </div>
                {/* Horizontal scroll fade indicators */}
                <div className="absolute right-0 top-0 bottom-1 w-12 bg-gradient-to-l from-white dark:from-stone-950 to-transparent pointer-events-none opacity-100 md:hidden" />
            </div>

            {/* Secondary Row: Extra Active Filters (Location, etc.) */}
            {extraFilters.length > 0 && (
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide px-4 -mx-4">
                    {extraFilters.map((filter) => (
                        <button
                            key={`${filter.type}-${filter.value}`}
                            onClick={() => onFilterChange(filter.type as any, filter.value)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-stone-100 text-stone-900 dark:bg-stone-800 dark:text-stone-100 whitespace-nowrap flex-shrink-0"
                        >
                            {filter.value}
                            <X className="w-3 h-3" />
                        </button>
                    ))}
                </div>
            )}

            {/* Filter Sheet / Modal */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="filter-title"
                >
                    {/* Body Scroll Lock */}
                    <style jsx global>{`
                        body { overflow: hidden !important; overscroll-behavior: contain; }
                    `}</style>

                    <div className="bg-white dark:bg-stone-950 rounded-t-3xl overflow-hidden max-h-[90vh] flex flex-col animate-in slide-in-from-bottom-full duration-300 shadow-2xl">

                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100 dark:border-stone-900">
                            <h2 id="filter-title" className="text-xl font-bold font-display">Filters</h2>
                            <button onClick={() => setIsOpen(false)} className="p-2 -mr-2 text-stone-500">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8">
                            {/* Media Type Toggle */}
                            <div>
                                <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-3 text-lg uppercase tracking-wider">Show Me</h3>
                                <div className="flex p-1 bg-stone-100 dark:bg-stone-900 rounded-xl">
                                    <button
                                        onClick={() => onMediaTypeChange('photo')}
                                        className={cn(
                                            "flex-1 py-3 text-sm font-bold rounded-lg transition-all duration-200",
                                            mediaType === 'photo'
                                                ? "bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-sm"
                                                : "text-stone-500 hover:text-stone-900 dark:hover:text-stone-300"
                                        )}
                                    >
                                        Photos
                                    </button>
                                    <button
                                        onClick={() => onMediaTypeChange('video')}
                                        className={cn(
                                            "flex-1 py-3 text-sm font-bold rounded-lg transition-all duration-200",
                                            mediaType === 'video'
                                                ? "bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-sm"
                                                : "text-stone-500 hover:text-stone-900 dark:hover:text-stone-300"
                                        )}
                                    >
                                        Videos
                                    </button>
                                </div>
                            </div>

                            {/* Sort Order */}
                            <div>
                                <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-3 text-lg uppercase tracking-wider">Sort By</h3>
                                <div className="grid grid-cols-1 gap-2">
                                    {[
                                        { label: 'Newest First', value: 'newest' },
                                        { label: 'Oldest First', value: 'oldest' },
                                        { label: 'Title (A-Z)', value: 'title' }
                                    ].map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => onSortChange(option.value as any)}
                                            className={cn(
                                                "w-full py-3 px-4 text-left text-sm font-medium rounded-xl border transition-all duration-200 flex items-center justify-between",
                                                sortBy === option.value
                                                    ? "bg-orange-50 dark:bg-orange-900/20 border-orange-500 text-orange-900 dark:text-orange-100"
                                                    : "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400"
                                            )}
                                        >
                                            {option.label}
                                            {sortBy === option.value && <div className="w-2 h-2 rounded-full bg-orange-500" />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* View Mode */}
                            <div>
                                <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-3 text-lg uppercase tracking-wider">Layout</h3>
                                <div className="flex p-1 bg-stone-100 dark:bg-stone-900 rounded-xl">
                                    <button
                                        onClick={() => onViewModeChange('masonry')}
                                        className={cn(
                                            "flex-1 py-3 text-sm font-bold rounded-lg transition-all duration-200",
                                            viewMode === 'masonry'
                                                ? "bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-sm"
                                                : "text-stone-500 hover:text-stone-900 dark:hover:text-stone-300"
                                        )}
                                    >
                                        Masonry
                                    </button>
                                    <button
                                        onClick={() => onViewModeChange('grid')}
                                        className={cn(
                                            "flex-1 py-3 text-sm font-bold rounded-lg transition-all duration-200",
                                            viewMode === 'grid'
                                                ? "bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-sm"
                                                : "text-stone-500 hover:text-stone-900 dark:hover:text-stone-300"
                                        )}
                                    >
                                        Grid
                                    </button>
                                </div>
                            </div>

                            <MobileFilterGroup
                                title="Type"
                                options={['Portraits', 'Couples', 'Events', 'Music & Artists', 'Brands', 'Personal']}
                                selected={filters.category}
                                onChange={(val) => onFilterChange('category', val)}
                            />
                            <MobileFilterGroup
                                title="Medium"
                                options={['Digital', 'Film', 'Mixed']}
                                selected={filters.medium}
                                onChange={(val) => onFilterChange('medium', val)}
                            />
                            <MobileFilterGroup
                                title="Vibe"
                                options={['Warm', 'Moody', 'High contrast', 'Soft', 'Black & white']}
                                selected={filters.vibe}
                                onChange={(val) => onFilterChange('vibe', val)}
                            />
                            <MobileFilterGroup
                                title="Location"
                                options={['Inland Empire', 'Los Angeles', 'San Diego', 'Other']}
                                selected={filters.location}
                                onChange={(val) => onFilterChange('location', val)}
                            />
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-stone-100 dark:border-stone-900 flex gap-4 bg-white dark:bg-stone-950 pb-safe">
                            <button
                                onClick={() => {
                                    onClear();
                                    setIsOpen(false);
                                }}
                                className="px-6 py-3 text-stone-600 dark:text-stone-400 font-medium"
                            >
                                Clear all
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="flex-1 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-full font-bold py-3 shadow-lg"
                            >
                                Show Results
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function MobileFilterGroup({ title, options, selected, onChange }: { title: string, options: string[], selected: string[], onChange: (val: string) => void }) {
    return (
        <div>
            <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-3">{title}</h3>
            <div className="flex flex-wrap gap-2">
                {options.map((option) => (
                    <button
                        key={option}
                        onClick={() => onChange(option)}
                        className={cn(
                            "px-4 py-2 rounded-full text-sm border transition-all duration-200",
                            selected.includes(option)
                                ? "bg-stone-900 text-white border-stone-900 dark:bg-stone-100 dark:text-stone-900 dark:border-stone-100"
                                : "bg-white text-stone-600 border-stone-200 dark:bg-stone-900 dark:text-stone-400 dark:border-stone-800"
                        )}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
}
