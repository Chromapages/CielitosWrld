'use client';

import { useRef, useEffect, useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { GalleryItem } from '@/app/gallery/page';
import { CATEGORY_SLUG_TO_VALUE, CategorySlug } from '@/lib/validations/gallery';

interface FilterGroupProps {
    title: string;
    options: string[];
    selected: string[];
    onChange: (value: string) => void;
    counts?: Record<string, number>;
}

function FilterGroup({ title, options, selected, onChange, counts }: FilterGroupProps) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="border-b border-stone-100 dark:border-stone-800 py-3 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full text-left font-medium text-stone-900 dark:text-stone-100 mb-2 group"
            >
                {title}
                <ChevronDown className={cn("w-3.5 h-3.5 text-stone-400 transition-transform duration-200", isOpen && "rotate-180")} />
            </button>

            {isOpen && (
                <div className="space-y-1.5 mt-2">
                    {options.map((option) => (
                        <label key={option} className="flex items-center gap-2.5 cursor-pointer group/label">
                            <div className="relative flex items-center flex-shrink-0">
                                <input
                                    type="checkbox"
                                    className="peer sr-only"
                                    checked={selected.includes(option)}
                                    onChange={() => onChange(option)}
                                />
                                <div className="w-3.5 h-3.5 border border-stone-300 dark:border-stone-600 rounded transition-colors peer-checked:bg-stone-900 peer-checked:border-stone-900 dark:peer-checked:bg-stone-100 dark:peer-checked:border-stone-100" />
                                <svg
                                    className="absolute inset-0 w-3.5 h-3.5 text-white dark:text-stone-900 opacity-0 peer-checked:opacity-100 pointer-events-none"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </div>
                            <span className={cn(
                                "text-sm transition-colors flex-1",
                                selected.includes(option)
                                    ? "text-stone-900 dark:text-stone-100 font-medium"
                                    : "text-stone-500 dark:text-stone-400 group-hover/label:text-stone-700 dark:group-hover/label:text-stone-200"
                            )}>
                                {option}
                            </span>
                            {counts && counts[option] > 0 && (
                                <span className={cn(
                                    "text-[11px] px-1.5 py-0.5 rounded-full font-medium flex-shrink-0",
                                    selected.includes(option)
                                        ? "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900"
                                        : "bg-stone-100 text-stone-400 dark:bg-stone-800 dark:text-stone-500"
                                )}>
                                    {counts[option]}
                                </span>
                            )}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}

interface GallerySidebarProps {
    filters: {
        category: string[];
        medium: string[];
        vibe: string[];
        location: string[];
    };
    onFilterChange: (type: keyof GallerySidebarProps['filters'], value: string) => void;
    onClear: () => void;
    counts: GalleryItem[];
    mediaType: 'photo' | 'video';
    onMediaTypeChange: (type: 'photo' | 'video') => void;
}

export default function GallerySidebar({ filters, onFilterChange, onClear, counts, mediaType, onMediaTypeChange }: GallerySidebarProps) {
    const sidebarRef = useRef<HTMLDivElement>(null);
    const [topOffset, setTopOffset] = useState(128); // 8rem default

    // Calculate counts dynamically
    const getCounts = (field: keyof GalleryItem) => {
        const countMap: Record<string, number> = {};
        counts.forEach(item => {
            if (item.mediaType === mediaType) {
                const value = item[field] as string;
                if (value) {
                    countMap[value] = (countMap[value] || 0) + 1;
                }
            }
        });
        return countMap;
    };

    const categoryCounts = getCounts('category');
    const mediumCounts = getCounts('medium');
    const hasActiveFilters = Object.values(filters).some(arr => arr.length > 0);

    // Calculate sidebar height to not overflow viewport
    useEffect(() => {
        const updateOffset = () => {
            // Account for mobile header if present
            const mobileHeader = document.querySelector('[data-mobile-header]');
            if (mobileHeader) {
                const rect = mobileHeader.getBoundingClientRect();
                setTopOffset(rect.height + 16);
            } else {
                setTopOffset(128); // 8rem
            }
        };

        updateOffset();
        window.addEventListener('resize', updateOffset);
        return () => window.removeEventListener('resize', updateOffset);
    }, []);

    return (
        <div
            ref={sidebarRef}
            className="flex flex-col h-[calc(100vh-6rem)] overflow-hidden"
        >
            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto scrollbar-thin pr-1 -mr-1 space-y-5">
                {/* Media Toggle */}
                <div>
                    <h3 className="font-bold text-[11px] uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-2 px-1">
                        Browse
                    </h3>
                    <div className="flex p-1 bg-stone-100 dark:bg-stone-900/80 rounded-lg">
                        <button
                            onClick={() => onMediaTypeChange('photo')}
                            className={cn(
                                "flex-1 py-1.5 text-xs font-semibold rounded-md transition-all duration-200",
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
                                "flex-1 py-1.5 text-xs font-semibold rounded-md transition-all duration-200",
                                mediaType === 'video'
                                    ? "bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-sm"
                                    : "text-stone-500 hover:text-stone-900 dark:hover:text-stone-300"
                            )}
                        >
                            Videos
                        </button>
                    </div>
                </div>

                {/* Category Navigation */}
                <div>
                    <h3 className="font-bold text-[11px] uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-2 px-1">
                        Collections
                    </h3>
                    <nav className="space-y-0.5">
                        <Link
                            href="/gallery"
                            className="flex items-center justify-between px-2.5 py-2 text-sm rounded-lg text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800/60 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                        >
                            <span>All Photos</span>
                            <span className="text-xs text-stone-400 dark:text-stone-600">{counts.filter(i => i.mediaType === 'photo').length}</span>
                        </Link>
                        {(Object.entries(CATEGORY_SLUG_TO_VALUE) as [CategorySlug, string][]).map(([slug, label]) => (
                            <Link
                                key={slug}
                                href={`/gallery/category/${slug}`}
                                className="flex items-center justify-between px-2.5 py-2 text-sm rounded-lg text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800/60 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                            >
                                <span>{label}</span>
                                {categoryCounts[label] > 0 && (
                                    <span className="text-xs text-stone-400 dark:text-stone-600">{categoryCounts[label]}</span>
                                )}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Filters */}
                <div>
                    <div className="flex items-center justify-between mb-2 px-1">
                        <h3 className="font-bold text-[11px] uppercase tracking-widest text-stone-400 dark:text-stone-500">
                            Filters
                        </h3>
                        {hasActiveFilters && (
                            <button
                                onClick={onClear}
                                className="text-[11px] text-orange-500 hover:text-orange-600 font-semibold flex items-center gap-0.5 transition-colors"
                            >
                                Clear
                                <X className="w-3 h-3" />
                            </button>
                        )}
                    </div>

                    <div className="bg-stone-50 dark:bg-stone-900/50 rounded-xl p-3 border border-stone-100 dark:border-stone-800/50">
                        <FilterGroup
                            title="Category"
                            options={['Portraits', 'Couples', 'Events', 'Music & Artists', 'Brands', 'Personal']}
                            selected={filters.category}
                            onChange={(val) => onFilterChange('category', val)}
                            counts={categoryCounts}
                        />

                        <FilterGroup
                            title="Medium"
                            options={['Digital', 'Film', 'Mixed']}
                            selected={filters.medium}
                            onChange={(val) => onFilterChange('medium', val)}
                            counts={mediumCounts}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}