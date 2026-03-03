'use client';

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface SearchResult {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  postType?: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const searchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.posts || []);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(searchPosts, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-xl shadow-2xl overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center px-4 py-3 border-b border-stone-200 dark:border-stone-700">
          <Search className="w-5 h-5 text-stone-400" />
          <input
            type="text"
            placeholder="Search posts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-3 py-2 bg-transparent outline-none text-stone-900 dark:text-stone-100 placeholder-stone-400"
            autoFocus
          />
          <button onClick={onClose} className="p-1 hover:bg-stone-100 dark:hover:bg-stone-800 rounded">
            <X className="w-5 h-5 text-stone-400" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {loading && (
            <div className="p-8 text-center text-stone-500">Searching...</div>
          )}
          
          {!loading && query.length >= 2 && results.length === 0 && (
            <div className="p-8 text-center text-stone-500">No results found</div>
          )}

          {!loading && results.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              onClick={onClose}
              className="block px-4 py-3 hover:bg-stone-50 dark:hover:bg-stone-800 border-b border-stone-100 dark:border-stone-800 last:border-0"
            >
              <h4 className="font-medium text-stone-900 dark:text-stone-100">{post.title}</h4>
              {post.excerpt && (
                <p className="text-sm text-stone-500 mt-1 line-clamp-1">{post.excerpt}            </Link>
</p>
              )}
          ))}
        </div>
      </div>
    </div>
  );
}

// Search button component for navbar
export function SearchButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-1.5 text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
    >
      <Search className="w-4 h-4" />
      <span className="hidden sm:inline">Search</span>
      <kbd className="hidden md:inline px-1.5 py-0.5 text-xs bg-stone-100 dark:bg-stone-800 rounded">⌘K</kbd>
    </button>
  );
}
