'use client';

import { useState } from 'react';
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
                            ? "bg-[#822c01] text-white border-[#822c01]"
                            : "bg-white text-stone-700 border-stone-200 dark:bg-stone-900 dark:text-stone-300 dark:border-stone-800"
                    )}
                >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                    {activeCount > 0 && (
                        <span className="ml-1 bg-white/20 px-1.5 py-0.5 rounded-full text-[10px]">
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
                                    ? "bg-[#822c01] text-white border-[#822c01]"
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
                            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-orange-50 text-[#822c01] dark:bg-orange-950/30 dark:text-orange-200 border border-orange-100 dark:border-orange-900/50 whitespace-nowrap flex-shrink-0"
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
                    className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="filter-title"
                >
                    {/* Body Scroll Lock */}
                    <style jsx global>{`
                        body { overflow: hidden !important; overscroll-behavior: contain; }
                    `}</style>

                    <div className="bg-white dark:bg-stone-950 rounded-t-[2.5rem] overflow-hidden max-h-[92vh] flex flex-col animate-in slide-in-from-bottom-full duration-500 ease-out shadow-2xl">

                        {/* Header */}
                        <div className="flex items-center justify-between px-8 py-6 border-b border-stone-100 dark:border-stone-900">
                            <h2 id="filter-title" className="text-xl font-bold">Filters</h2>
                            <button onClick={() => setIsOpen(false)} className="p-2 -mr-2 text-stone-400 hover:text-stone-900 transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-none">
                            {/* Media Type Toggle */}
                            <div className="space-y-4">
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">Show Me</h3>
                                <div className="relative flex p-1 bg-stone-100 dark:bg-stone-900 rounded-2xl">
                                    <div 
                                        className={cn(
                                            "absolute inset-y-1 w-[calc(50%-4px)] bg-white dark:bg-stone-800 rounded-xl shadow-sm transition-transform duration-300 ease-out",
                                            mediaType === 'photo' ? "translate-x-0" : "translate-x-full"
                                        )}
                                    />
                                    <button
                                        onClick={() => onMediaTypeChange('photo')}
                                        className={cn(
                                            "relative z-10 flex-1 py-3 text-sm font-bold transition-all duration-200",
                                            mediaType === 'photo'
                                                ? "text-stone-900 dark:text-white"
                                                : "text-stone-500"
                                        )}
                                    >
                                        Photos
                                    </button>
                                    <button
                                        onClick={() => onMediaTypeChange('video')}
                                        className={cn(
                                            "relative z-10 flex-1 py-3 text-sm font-bold transition-all duration-200",
                                            mediaType === 'video'
                                                ? "text-stone-900 dark:text-white"
                                                : "text-stone-500"
                                        )}
                                    >
                                        Videos
                                    </button>
                                </div>
                            </div>

                            {/* Sort Order */}
                            <div className="space-y-4">
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">Sort By</h3>
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
                                                "w-full py-4 px-5 text-left text-[15px] font-medium rounded-2xl border transition-all duration-300 flex items-center justify-between",
                                                sortBy === option.value
                                                    ? "bg-orange-50/50 dark:bg-orange-950/20 border-[#822c01] text-[#822c01] dark:text-orange-200"
                                                    : "bg-white dark:bg-stone-900 border-stone-100 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-200"
                                            )}
                                        >
                                            {option.label}
                                            {sortBy === option.value && <div className="w-1.5 h-1.5 rounded-full bg-[#822c01] shadow-[0_0_8px_rgba(130,44,1,0.4)]" />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* View Mode */}
                            <div className="space-y-4">
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">Layout</h3>
                                <div className="relative flex p-1 bg-stone-100 dark:bg-stone-900 rounded-2xl">
                                    <div 
                                        className={cn(
                                            "absolute inset-y-1 w-[calc(50%-4px)] bg-white dark:bg-stone-800 rounded-xl shadow-sm transition-transform duration-300 ease-out",
                                            viewMode === 'masonry' ? "translate-x-0" : "translate-x-full"
                                        )}
                                    />
                                    <button
                                        onClick={() => onViewModeChange('masonry')}
                                        className={cn(
                                            "relative z-10 flex-1 py-3 text-sm font-bold transition-all duration-200",
                                            viewMode === 'masonry'
                                                ? "text-stone-900 dark:text-white"
                                                : "text-stone-500"
                                        )}
                                    >
                                        Masonry
                                    </button>
                                    <button
                                        onClick={() => onViewModeChange('grid')}
                                        className={cn(
                                            "relative z-10 flex-1 py-3 text-sm font-bold transition-all duration-200",
                                            viewMode === 'grid'
                                                ? "text-stone-900 dark:text-white"
                                                : "text-stone-500"
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
                        <div className="p-8 border-t border-stone-100 dark:border-stone-900 flex gap-4 bg-white dark:bg-stone-950 pb-safe-offset-4">
                            <button
                                onClick={() => {
                                    onClear();
                                    setIsOpen(false);
                                }}
                                className="px-6 py-4 text-stone-500 dark:text-stone-400 font-bold text-sm uppercase tracking-wider"
                            >
                                Clear all
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="flex-1 bg-stone-900 dark:bg-[#822c01] text-white rounded-[1.25rem] font-bold py-4 shadow-xl shadow-stone-900/10 dark:shadow-orange-950/20 active:scale-[0.98] transition-transform"
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
        <div className="space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">{title}</h3>
            <div className="flex flex-wrap gap-2.5">
                {options.map((option) => (
                    <button
                        key={option}
                        onClick={() => onChange(option)}
                        className={cn(
                            "px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300",
                            selected.includes(option)
                                ? "bg-[#822c01] text-white border-[#822c01] shadow-lg shadow-orange-900/10"
                                : "bg-white text-stone-600 border-stone-100 dark:bg-stone-900 dark:text-stone-400 dark:border-stone-800 hover:border-stone-200"
                        )}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
}
