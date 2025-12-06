'use client';

import { useState } from 'react';
import { Folder, File, ChevronRight, ChevronDown, Image, Video, Briefcase, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Category {
  name: string;
  collections: string[];
}

interface FileBrowserSidebarProps {
  categories: Category[];
  activeCategory: string | null;
  activeCollection: string | null;
  onSelectCategory: (category: string) => void;
  onSelectCollection: (category: string, collection: string) => void;
}

export default function FileBrowserSidebar({
  categories,
  activeCategory,
  activeCollection,
  onSelectCategory,
  onSelectCollection
}: FileBrowserSidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(() => new Set(['Images']));

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName);
      } else {
        newSet.add(categoryName);
      }
      return newSet;
    });
  };

  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName.toLowerCase()) {
      case 'images': return Image;
      case 'videos': return Video;
      default: return Folder;
    }
  };

  return (
    <div className="w-full h-full bg-gray-200/70 backdrop-blur-sm rounded-xl border border-gray-300/60 font-sans">
      <div className="flex items-center p-3 border-b border-gray-300/60">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <h2 className="text-sm font-semibold text-gray-700 text-center flex-1">Collections</h2>
      </div>

      <div className="p-2 space-y-2">
        {categories.map((category) => (
          <div key={category.name}>
            <div 
              onClick={() => toggleCategory(category.name)}
              className={cn(
                'flex items-center p-1.5 rounded-md cursor-pointer transition-colors text-gray-700 hover:bg-gray-300/60',
                {
                  'bg-blue-500 text-white hover:bg-blue-600': activeCategory === category.name && !activeCollection,
                }
              )}
            >
              <ChevronRight className={cn('w-4 h-4 mr-1 transition-transform', { 'rotate-90': expandedCategories.has(category.name) })} />
              <span className="text-sm font-medium">{category.name}</span>
            </div>

            {expandedCategories.has(category.name) && (
              <div className="mt-1 ml-4 pl-2 border-l border-gray-300/80 space-y-1">
                {category.collections.map((collection) => {
                  const Icon = getCategoryIcon(category.name);
                  return (
                    <div 
                      key={collection}
                      onClick={() => onSelectCollection(category.name, collection)}
                      className={cn(
                        'flex items-center p-1.5 rounded-md cursor-pointer transition-colors text-gray-600 hover:bg-gray-300/60',
                        {
                          'bg-blue-500 text-white hover:bg-blue-600': activeCollection === collection,
                        }
                      )}
                    >
                      <Icon className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="text-sm truncate">{collection}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
