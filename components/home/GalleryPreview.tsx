'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Folder, ChevronRight } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { FEATURED_GALLERY_QUERY } from '@/sanity/lib/queries';

// TypeScript interfaces
interface Category {
  id: string;
  name: string;
  hasSubfolders?: boolean;
  subfolders?: Category[];
}

interface GalleryAsset {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  mediaType: 'photo' | 'video';
  image?: {
    asset: {
      _id: string;
      url: string;
      metadata: {
        dimensions: { width: number; height: number };
        lqip?: string;
      };
    };
    alt: string;
    caption?: string;
  };
  videoThumbnail?: {
    asset: {
      _id: string;
      url: string;
      metadata: {
        lqip?: string;
      };
    };
    alt: string;
  };
  _createdAt: string;
}

interface GalleryItem {
  id: string;
  title: string;
  src: string;
  alt: string;
  type: 'image' | 'video';
  filename: string;
  size: string;
  date: string;
  blurDataURL?: string;
}

// Category structure
const categories: Category[] = [
  { id: 'all', name: 'All Featured' },
  { id: 'portrait', name: 'Portrait' },
  { id: 'editorial', name: 'Editorial' },
  { id: 'nature', name: 'Nature' },
  { id: 'events', name: 'Events' },
];

export default function GalleryPreview() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [galleryAssets, setGalleryAssets] = useState<GalleryAsset[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch featured gallery assets from Sanity
  useEffect(() => {
    async function fetchGalleryAssets() {
      try {
        setIsLoading(true);
        const assets = await client.fetch<GalleryAsset[]>(FEATURED_GALLERY_QUERY);
        setGalleryAssets(assets);
        setError(null);
      } catch (err) {
        console.error('Error fetching gallery assets:', err);
        setError('Failed to load gallery images');
      } finally {
        setIsLoading(false);
      }
    }

    fetchGalleryAssets();
  }, []);

  // Transform Sanity assets to gallery items
  const transformAssets = (assets: GalleryAsset[]): GalleryItem[] => {
    const items: GalleryItem[] = [];

    for (const asset of assets) {
      const isVideo = asset.mediaType === 'video';
      const imageAsset = isVideo ? asset.videoThumbnail : asset.image;

      if (!imageAsset) continue;

      const imageUrl = urlFor(imageAsset.asset)
        .width(600)
        .height(900)
        .fit('crop')
        .auto('format')
        .url();

      const date = new Date(asset._createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });

      items.push({
        id: asset._id,
        title: asset.title,
        src: imageUrl,
        alt: imageAsset.alt || asset.title,
        type: isVideo ? 'video' : 'image',
        filename: `${asset.title.replace(/\s+/g, '_')}.${isVideo ? 'mp4' : 'jpg'}`,
        size: isVideo ? '~85 MB' : '~1.5 MB',
        date,
        blurDataURL: imageAsset.asset.metadata?.lqip,
      });
    }

    return items;
  };

  // Get filtered items based on selected category
  const getFilteredItems = (): GalleryItem[] => {
    const allItems = transformAssets(galleryAssets);

    if (selectedCategory === 'all') {
      return allItems;
    }

    return allItems.filter((item) => {
      const asset = galleryAssets.find((a) => a._id === item.id);
      return asset?.category === selectedCategory;
    });
  };

  const currentItems = getFilteredItems();

  // Toggle category expansion
  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  // Handle category selection
  const handleCategorySelect = (categoryId: string, hasSubfolders?: boolean) => {
    if (hasSubfolders) {
      toggleCategory(categoryId);
    }
    setSelectedCategory(categoryId);
  };

  // Lightbox functions
  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToNext = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % currentItems.length);
  };

  const goToPrev = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex - 1 + currentItems.length) % currentItems.length);
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <section className="relative py-16 sm:py-24 px-4 sm:px-10">
        <div
          aria-hidden
          className="absolute inset-0 h-full w-full bg-fixed bg-cover bg-center"
          style={{ backgroundImage: "url('/images/contactsheets/CONTACT3.png')" }}
        />
        <div className="absolute inset-0 h-full w-full bg-black/45 backdrop-blur-sm" aria-hidden />

        <style jsx>{`
          @keyframes shimmer {
            0% {
              background-position: -1000px 0;
            }
            100% {
              background-position: 1000px 0;
            }
          }
          .shimmer {
            animation: shimmer 2s infinite linear;
            background: linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.1) 0%,
              rgba(255, 255, 255, 0.3) 50%,
              rgba(255, 255, 255, 0.1) 100%
            );
            background-size: 1000px 100%;
          }
        `}</style>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header Skeleton */}
          <div className="text-center mb-12">
            <div className="h-10 w-64 mx-auto bg-white/20 rounded-lg shimmer mb-4" />
            <div className="h-6 w-96 max-w-full mx-auto bg-white/20 rounded shimmer" />
          </div>

          {/* Dual-Pane Explorer Skeleton */}
          <div className="rounded-xl shadow-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-800 overflow-hidden">
            {/* Window Chrome */}
            <div className="h-11 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="h-4 w-48 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="w-16"></div>
            </div>

            {/* Dual Pane Container */}
            <div className="flex flex-col md:flex-row h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden">
              {/* Sidebar Skeleton */}
              <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/30 p-4">
                <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded shimmer mb-4" />
                <div className="space-y-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-10 bg-gray-300 dark:bg-gray-700 rounded-md shimmer" />
                  ))}
                </div>
              </div>

              {/* Grid Skeleton */}
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex flex-col">
                      <div className="aspect-[2/3] bg-gray-300 dark:bg-gray-700 rounded-lg shimmer" />
                      <div className="mt-3 space-y-2">
                        <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded shimmer" />
                        <div className="h-3 w-1/2 bg-gray-300 dark:bg-gray-700 rounded shimmer" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-10">
      {/* Background Image */}
      <div
        aria-hidden
        className="absolute inset-0 h-full w-full bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('/images/contactsheets/CONTACT3.png')" }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 h-full w-full bg-black/45 backdrop-blur-sm" aria-hidden />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-white">
            Featured Work
          </h2>
          <p className="text-base font-normal leading-relaxed text-white/80 mt-2 max-w-2xl mx-auto">
            Explore my portfolio with a classic dual-pane file explorer. Select a category to see the collection.
          </p>
        </div>

        {/* Dual-Pane File Explorer */}
        <div className="rounded-xl shadow-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-800 overflow-hidden">
          {/* Window Chrome - macOS style */}
          <div className="h-11 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Cielito's Wrld &gt; Portfolio</div>
            <div className="w-16"></div>
          </div>

          {/* Dual Pane Container */}
          <div className="flex flex-col md:flex-row h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden">
            {/* Left Sidebar - Category Navigation */}
            <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/30 overflow-y-auto">
              <div className="p-4">
                <h3 className="px-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Portfolio
                </h3>
                <ul className="space-y-1">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <button
                        onClick={() => handleCategorySelect(category.id, category.hasSubfolders)}
                        className={`flex items-center gap-2.5 p-2 rounded-md transition-colors cursor-pointer w-full text-left ${selectedCategory === category.id
                            ? 'bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-500'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-800 dark:text-gray-200'
                          }`}
                      >
                        {category.hasSubfolders && (
                          <ChevronRight
                            className={`w-5 h-5 -ml-0.5 transition-transform ${expandedCategories.has(category.id) ? 'rotate-90' : ''
                              }`}
                          />
                        )}
                        <Folder className="w-5 h-5 text-orange-600" />
                        <span className={`text-sm truncate ${selectedCategory === category.id ? 'font-semibold' : 'font-medium'
                          }`}>
                          {category.name}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Content Area - Image Grid */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentItems.length > 0 ? (
                  currentItems.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => openLightbox(index)}
                      className="group flex flex-col items-start text-left rounded-lg transition-colors cursor-pointer"
                    >
                      <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700/50">
                        {item.type === 'video' && (
                          <span className="absolute top-2 left-2 rounded-full bg-black/70 text-white text-xs font-semibold px-2 py-1">
                            Video
                          </span>
                        )}
                        <Image
                          src={item.src}
                          alt={item.alt}
                          width={600}
                          height={900}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          placeholder={item.blurDataURL ? "blur" : "empty"}
                          blurDataURL={item.blurDataURL}
                        />
                      </div>
                      <div className="flex flex-col gap-0.5 mt-3 w-full">
                        <span className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate w-full group-hover:text-orange-600 dark:group-hover:text-orange-500">
                          {item.filename}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {item.size} | {item.date}
                        </span>
                      </div>
                    </button>
                  ))
                ) : error ? (
                  <div className="col-span-full text-center py-12">
                    <p className="text-red-500 dark:text-red-400 mb-2">{error}</p>
                    <button
                      onClick={() => window.location.reload()}
                      className="text-orange-600 hover:text-orange-700 underline"
                    >
                      Try again
                    </button>
                  </div>
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400 mb-2">
                      {selectedCategory === 'all'
                        ? 'No featured images yet. Check back soon!'
                        : `No ${selectedCategory} images found.`}
                    </p>
                    <Link
                      href="/gallery"
                      className="text-orange-600 hover:text-orange-700 underline"
                    >
                      View all gallery →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* View Full Gallery CTA */}
        <div className="text-center mt-8">
          <Link
            href="/gallery"
            className="inline-block bg-orange-600 text-white font-inter font-medium px-8 py-3 rounded-lg shadow-md hover:bg-orange-700 transition-colors duration-300 text-lg"
          >
            View Full Gallery →
          </Link>
        </div>

        {/* Lightbox */}
        {lightboxOpen && currentItems.length > 0 && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking navigation buttons
              className="absolute top-5 right-5 z-50 text-white text-4xl hover:text-gray-300 transition-colors"
              aria-label="Close lightbox"
            >
              &times;
            </button>

            {/* Image Container */}
            <div
              className="relative w-full h-full max-w-4xl max-h-[90vh] flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={currentItems[selectedImageIndex].src}
                alt={currentItems[selectedImageIndex].alt}
                width={800}
                height={600}
                className="object-contain max-h-[90vh] max-w-full"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>

            {/* Prev/Next Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
              className="absolute left-5 top-1/2 -translate-y-1/2 z-50 text-white bg-black/30 p-2 rounded-full hover:bg-black/50 transition-colors"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-5 top-1/2 -translate-y-1/2 z-50 text-white bg-black/30 p-2 rounded-full hover:bg-black/50 transition-colors"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>

            {/* Pagination Dots */}
            <div
              className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2"
              onClick={(e) => e.stopPropagation()}
            >
              {currentItems.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageIndex(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-colors ${index === selectedImageIndex ? 'bg-white' : 'bg-gray-500 hover:bg-gray-400'}`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}