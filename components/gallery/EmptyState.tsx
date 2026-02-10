'use client';

import { SearchX, ImageOff, FilterX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  type?: 'no-results' | 'no-images' | 'filtered-out';
  searchQuery?: string;
  onClearFilters?: () => void;
  className?: string;
}

export default function EmptyState({
  type = 'no-results',
  searchQuery = '',
  onClearFilters,
  className,
}: EmptyStateProps) {
  const configs = {
    'no-results': {
      icon: SearchX,
      title: searchQuery ? `No results for "${searchQuery}"` : 'No results found',
      description: searchQuery
        ? 'Try adjusting your search terms or filters to find what you\'re looking for.'
        : 'Try adjusting your filters to find what you\'re looking for.',
    },
    'no-images': {
      icon: ImageOff,
      title: 'No images yet',
      description: 'Check back soon for new additions to the gallery.',
    },
    'filtered-out': {
      icon: FilterX,
      title: 'All items filtered out',
      description: 'Your current filters are hiding all gallery items.',
    },
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-20 px-4 text-center",
        "animate-in fade-in zoom-in-95 duration-500",
        className
      )}
    >
      <div className="w-20 h-20 mb-6 rounded-2xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
        <Icon className="w-10 h-10 text-stone-400" />
      </div>
      
      <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-2">
        {config.title}
      </h3>
      
      <p className="text-stone-500 dark:text-stone-400 max-w-md mb-6">
        {config.description}
      </p>

      {onClearFilters && (
        <button
          onClick={onClearFilters}
          className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-full font-medium hover:scale-105 transition-transform duration-200 shadow-lg"
        >
          <FilterX className="w-4 h-4" />
          Clear all filters
        </button>
      )}
    </div>
  );
}
