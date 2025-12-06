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
}

export default function GalleryMobileFilters({ filters, onFilterChange, onClear, activeCount }: GalleryMobileFiltersProps) {
    const [isOpen, setIsOpen] = useState(false);

    // Predefined quick filters
    const quickFilters = [
        { label: 'All', type: 'all', value: 'all' },
        { label: 'Portraits', type: 'category', value: 'Portraits' },
        { label: 'Events', type: 'category', value: 'Events' },
        { label: 'Brands', type: 'category', value: 'Brands' },
        { label: 'Film', type: 'medium', value: 'Film' },
        { label: 'B&W', type: 'vibe', value: 'Black & white' },
    ];

    // Helper to check if a filter is active
    const isActive = (type: string, value: string) => {
        if (type === 'all') return activeCount === 0;
        return filters[type as keyof typeof filters]?.includes(value);
    };

    // Helper to handle quick filter click
    const handleQuickFilter = (type: string, value: string) => {
        if (type === 'all') {
            onClear();
        } else {
            onFilterChange(type as any, value);
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
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1 px-4 -mx-4">
                {/* Main Filter Button */}
                <button
                    onClick={() => setIsOpen(true)}
                    className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 shadow-sm border",
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
                    const active = isActive(filter.type, filter.value);
                    return (
                        <button
                            key={filter.label}
                            onClick={() => handleQuickFilter(filter.type, filter.value)}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 shadow-sm border",
                                active
                                    ? "bg-stone-900 text-white border-stone-900 dark:bg-stone-100 dark:text-stone-900 dark:border-stone-100"
                                    : "bg-white text-stone-600 border-stone-200 dark:bg-stone-900 dark:text-stone-400 dark:border-stone-800"
                            )}
                        >
                            {filter.label}
                        </button>
                    );
                })}
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
                <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">

                    <div className="bg-white dark:bg-stone-950 rounded-t-3xl overflow-hidden max-h-[90vh] flex flex-col animate-in slide-in-from-bottom-full duration-300 shadow-2xl">

                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100 dark:border-stone-900">
                            <h2 className="text-xl font-bold font-display">Filters</h2>
                            <button onClick={() => setIsOpen(false)} className="p-2 -mr-2 text-stone-500">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8">
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
                            "px-4 py-2 rounded-full text-sm border transition-all",
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
