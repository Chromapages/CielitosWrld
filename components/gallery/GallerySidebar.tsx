'use client';

import { ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GalleryItem } from '@/app/gallery/page';
import { useState } from 'react';

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
        <div className="border-b border-stone-100 dark:border-stone-800 py-4 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full text-left font-medium text-stone-900 dark:text-stone-100 mb-2 group"
            >
                {title}
                <ChevronDown className={cn("w-4 h-4 text-stone-400 transition-transform duration-200", isOpen && "rotate-180")} />
            </button>

            {isOpen && (
                <div className="space-y-2 mt-2 animate-in slide-in-from-top-2 duration-200">
                    {options.map((option) => (
                        <label key={option} className="flex items-center gap-3 cursor-pointer group/label">
                            <div className="relative flex items-center">
                                <input
                                    type="checkbox"
                                    className="peer sr-only"
                                    checked={selected.includes(option)}
                                    onChange={() => onChange(option)}
                                />
                                <div className="w-4 h-4 border border-stone-300 dark:border-stone-600 rounded transition-colors peer-checked:bg-stone-900 peer-checked:border-stone-900 dark:peer-checked:bg-stone-100 dark:peer-checked:border-stone-100" />
                                <svg
                                    className="absolute inset-0 w-4 h-4 text-white dark:text-stone-900 opacity-0 peer-checked:opacity-100 pointer-events-none"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </div>
                            <span className={cn(
                                "text-sm transition-colors",
                                selected.includes(option)
                                    ? "text-stone-900 dark:text-stone-100 font-medium"
                                    : "text-stone-600 dark:text-stone-400 group-hover/label:text-stone-900 dark:group-hover/label:text-stone-200"
                            )}>
                                {option}
                            </span>
                            {counts && (
                                <span className="ml-auto text-xs text-stone-400">
                                    {counts[option] || 0}
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

    // Calculate counts dynamically
    const getCounts = (field: keyof GalleryItem) => {
        const countMap: Record<string, number> = {};
        counts.forEach(item => {
            // Only count items matching current media type
            if (item.mediaType === mediaType) {
                const value = item[field] as string;
                if (value) {
                    countMap[value] = (countMap[value] || 0) + 1;
                }
            }
        });
        return countMap;
    };

    const hasActiveFilters = Object.values(filters).some(arr => arr.length > 0);

    return (
        <div className="space-y-8">
            {/* Media Toggle */}
            <div>
                <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-3">Media</h3>
                <div className="flex p-1 bg-stone-100 dark:bg-stone-900 rounded-lg">
                    <button
                        onClick={() => onMediaTypeChange('photo')}
                        className={cn(
                            "flex-1 py-2 text-sm font-medium rounded-md transition-all",
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
                            "flex-1 py-2 text-sm font-medium rounded-md transition-all",
                            mediaType === 'video'
                                ? "bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-sm"
                                : "text-stone-500 hover:text-stone-900 dark:hover:text-stone-300"
                        )}
                    >
                        Videos
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="space-y-1">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-stone-900 dark:text-stone-100">Filters</h3>
                    {hasActiveFilters && (
                        <button
                            onClick={onClear}
                            className="text-xs text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1"
                        >
                            Clear all
                            <X className="w-3 h-3" />
                        </button>
                    )}
                </div>

                <FilterGroup
                    title="Category"
                    options={['Portraits', 'Couples', 'Events', 'Music & Artists', 'Brands', 'Personal']}
                    selected={filters.category}
                    onChange={(val) => onFilterChange('category', val)}
                    counts={getCounts('category')}
                />

                <FilterGroup
                    title="Medium"
                    options={['Digital', 'Film', 'Mixed']}
                    selected={filters.medium}
                    onChange={(val) => onFilterChange('medium', val)}
                    counts={getCounts('medium')}
                />
            </div>
        </div>
    );
}
