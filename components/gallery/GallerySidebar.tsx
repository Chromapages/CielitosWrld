'use client';

import { useRef, useEffect, useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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

    // Hide options with 0 count for cleaner UX
    const visibleOptions = options.filter(option => !counts || (counts[option] && counts[option] > 0) || selected.includes(option));

    if (visibleOptions.length === 0) return null;

    return (
        <div className="py-3 border-b border-stone-100 dark:border-stone-800 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full text-left font-semibold text-stone-900 dark:text-stone-100 mb-2 group transition-colors hover:text-[#822c01] dark:hover:text-[#822c01]"
            >
                <span className="text-sm tracking-tight">{title}</span>
                <ChevronDown className={cn("w-3.5 h-3.5 text-stone-400 transition-transform duration-300 ease-out", isOpen && "rotate-180")} />
            </button>

            <div className={cn(
                "grid transition-all duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"
            )}>
                <div className="overflow-hidden space-y-2">
                    {visibleOptions.map((option) => (
                        <label 
                            key={option} 
                            className="flex items-center gap-3 cursor-pointer group/label select-none"
                            tabIndex={0}
                            aria-label={`Filter by ${option}`}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    onChange(option);
                                }
                            }}
                        >
                            <div className="relative flex items-center justify-center flex-shrink-0">
                                <input
                                    type="checkbox"
                                    className="peer sr-only"
                                    checked={selected.includes(option)}
                                    onChange={() => onChange(option)}
                                />
                                <div className={cn(
                                    "w-4 h-4 border rounded transition-all duration-200 ease-out",
                                    "border-stone-300 dark:border-stone-600",
                                    "peer-checked:bg-[#822c01] peer-checked:border-[#822c01]"
                                )} />
                                <svg
                                    className="absolute w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200 pointer-events-none"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </div>
                            <span className={cn(
                                "text-[13px] transition-colors flex-1",
                                selected.includes(option)
                                    ? "text-stone-900 dark:text-stone-100 font-medium"
                                    : "text-stone-500 dark:text-stone-400 group-hover/label:text-stone-700 dark:group-hover/label:text-stone-200"
                            )}>
                                {option}
                            </span>
                            {counts && counts[option] > 0 && (
                                <span className="text-[11px] text-stone-400 font-mono tabular-nums">
                                    {counts[option]}
                                </span>
                            )}
                        </label>
                    ))}
                </div>
            </div>
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
    const pathname = usePathname();

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

    const isPathActive = (href: string) => pathname === href;

    return (
        <div
            ref={sidebarRef}
            className="flex flex-col h-full overflow-hidden"
        >
            <div className="flex-1 overflow-y-auto scrollbar-none space-y-8 pr-2">
                {/* Media Toggle - Segmented Pill */}
                <div className="space-y-3">
                    <div className="relative flex p-1 bg-stone-100 dark:bg-stone-900/80 rounded-xl">
                        {/* Sliding Indicator */}
                        <div 
                            className={cn(
                                "absolute inset-y-1 w-[calc(50%-4px)] bg-white dark:bg-stone-800 rounded-[9px] shadow-sm transition-transform duration-300 ease-out",
                                mediaType === 'photo' ? "translate-x-0" : "translate-x-full"
                            )}
                        />
                        <button
                            onClick={() => onMediaTypeChange('photo')}
                            className={cn(
                                "relative z-10 flex-1 py-1.5 text-xs font-semibold transition-colors duration-200",
                                mediaType === 'photo'
                                    ? "text-stone-900 dark:text-white"
                                    : "text-stone-500 hover:text-stone-700 dark:hover:text-stone-300"
                            )}
                        >
                            Photos
                        </button>
                        <button
                            onClick={() => onMediaTypeChange('video')}
                            className={cn(
                                "relative z-10 flex-1 py-1.5 text-xs font-semibold transition-colors duration-200",
                                mediaType === 'video'
                                    ? "text-stone-900 dark:text-white"
                                    : "text-stone-500 hover:text-stone-700 dark:hover:text-stone-300"
                            )}
                        >
                            Videos
                        </button>
                    </div>
                </div>

                {/* Collections Navigation */}
                <div className="space-y-3">
                    <nav className="flex flex-col">
                        <Link
                            href="/gallery"
                            className={cn(
                                "group relative flex items-center justify-between pl-4 pr-2 py-2.5 text-sm transition-all duration-200",
                                isPathActive('/gallery')
                                    ? "text-[#822c01] font-semibold"
                                    : "text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-900/40 hover:text-stone-900 dark:hover:text-stone-100"
                            )}
                        >
                            {/* Active Indicator Bar */}
                            {isPathActive('/gallery') && (
                                <div className="absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-[#822c01] rounded-full" />
                            )}
                            <span>All Photos</span>
                            <span className="text-[11px] text-stone-400 dark:text-stone-600 font-mono tabular-nums group-hover:text-stone-500 transition-colors">
                                {counts.filter(i => i.mediaType === 'photo').length}
                            </span>
                        </Link>
                        {(Object.entries(CATEGORY_SLUG_TO_VALUE) as [CategorySlug, string][]).map(([slug, label]) => {
                            const href = `/gallery/category/${slug}`;
                            const active = isPathActive(href);
                            return (
                                <Link
                                    key={slug}
                                    href={href}
                                    className={cn(
                                        "group relative flex items-center justify-between pl-4 pr-2 py-2.5 text-sm transition-all duration-200",
                                        active
                                            ? "text-[#822c01] font-semibold"
                                            : "text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-900/40 hover:text-stone-900 dark:hover:text-stone-100"
                                    )}
                                >
                                    {active && (
                                        <div className="absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-[#822c01] rounded-full" />
                                    )}
                                    <span>{label}</span>
                                    {categoryCounts[label] > 0 && (
                                        <span className="text-[11px] text-stone-400 dark:text-stone-600 font-mono tabular-nums group-hover:text-stone-500 transition-colors">
                                            {categoryCounts[label]}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Filters Section */}
                <div className="space-y-3">
                    <div className="flex items-center justify-end px-1">
                        {hasActiveFilters && (
                            <button
                                onClick={onClear}
                                className="text-[10px] font-bold uppercase tracking-wider text-[#822c01] hover:text-[#a13b0a] flex items-center gap-1 transition-colors"
                            >
                                Clear all <X className="w-2.5 h-2.5" />
                            </button>
                        )}
                    </div>

                    <div className="border-t border-stone-100 dark:border-stone-800">
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