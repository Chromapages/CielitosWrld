'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { urlFor } from '@/sanity/lib/image';

// --- Types ---
type ProjectCategory = 'Portraits' | 'Couples' | 'Events' | 'Music & Artists' | 'Brands' | 'Personal' | 'Other';
type FilterCategory = 'All' | ProjectCategory;

interface Project {
    id: string;
    title: string;
    category: ProjectCategory;
    image: string;
    story: string;
    tags: string[];
}

interface FeaturedWorkProps {
    data?: {
        title?: string;
        categories?: string[];
        items?: any[];
    };
}

export default function FeaturedWork({ data }: FeaturedWorkProps) {
    const [projects, setProjects] = useState<Project[]>([]);
    const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');

    // Dynamic categories from Sanity data
    const categories: FilterCategory[] = ['All', ...(data?.categories || []) as ProjectCategory[]];

    // Process Data
    useEffect(() => {
        if (data?.items && data.items.length > 0) {
            const formattedProjects: Project[] = data.items.map((item: any) => {
                const imageUrl = item.coverImage
                    ? urlFor(item.coverImage).width(1200).url() // No height constraint for natural aspect ratio
                    : 'https://placehold.co/800x1000/png?text=No+Image';

                // Use category from Sanity or default
                const category: ProjectCategory = item.category || 'Portraits';

                // Format year from _createdAt
                const year = item.year ? new Date(item.year).getFullYear() : new Date().getFullYear();

                return {
                    id: item.slug,
                    title: item.title || 'Untitled Project',
                    category: category,
                    image: imageUrl,
                    story: `${year} • ${item.title}`,
                    tags: [category, 'Photo'],
                };
            });
            setProjects(formattedProjects);
        } else {
            setProjects([]);
        }
    }, [data]);

    const filteredProjects = activeFilter === 'All'
        ? projects
        : projects.filter(p => p.category === activeFilter);

    return (
        <section className="pt-10 pb-10 md:pt-16 md:pb-16 bg-stone-50 dark:bg-stone-950 overflow-hidden">
            <div className="container mx-auto px-4 md:px-8 max-w-[1600px]">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-8">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-3 mb-4">
                            <Sparkles className="w-5 h-5 text-orange-600" />
                            <span className="text-sm font-medium tracking-[0.2em] uppercase text-stone-500">Selected Works</span>
                        </div>
                        <h2 className="font-pattaya text-5xl md:text-7xl font-bold text-stone-900 dark:text-stone-50 mb-6 leading-tight">
                            {data?.title || 'Signature Sessions'}
                        </h2>
                        <p className="text-stone-600 dark:text-stone-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                            Curated highlights from recent editorial, commercial, and portrait commissions.
                        </p>
                    </div>

                    {/* Desktop Filters */}
                    <div className="hidden md:flex flex-wrap justify-end gap-2 max-w-2xl">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                className={cn(
                                    "px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border",
                                    activeFilter === cat
                                        ? "bg-stone-900 text-white border-stone-900 shadow-lg scale-105"
                                        : "bg-transparent text-stone-600 border-stone-200 hover:border-stone-400 hover:text-stone-900 dark:text-stone-400 dark:border-stone-800 dark:hover:border-stone-600"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Mobile Filters (Scrollable) */}
                <div className="md:hidden flex overflow-x-auto pb-8 gap-3 scrollbar-hide -mx-4 px-4 mb-4">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            className={cn(
                                "whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium border transition-colors",
                                activeFilter === cat
                                    ? "bg-stone-900 text-white border-stone-900 shadow-md"
                                    : "bg-white text-stone-600 border-stone-200"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* --- MASONRY GRID LAYOUT --- */}
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
                    {filteredProjects.map((project, index) => (
                        <Link
                            href="/gallery"
                            key={project.id}
                            className="group relative block break-inside-avoid rounded-xl overflow-hidden bg-stone-200 dark:bg-stone-900 shadow-md hover:shadow-xl ring-1 ring-stone-200/50 dark:ring-stone-700/50 hover:ring-orange-500/30 dark:hover:ring-orange-400/30 transition-all duration-250 ease-out hover:scale-[1.02]"
                        >
                            <div className="relative w-full">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    width={800}
                                    height={1200}
                                    className="w-full h-auto object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                    priority={index < 4}
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {project.tags.map(tag => (
                                                <span key={tag} className="px-2 py-0.5 bg-white/20 backdrop-blur-md text-white text-[10px] font-medium rounded-md border border-white/10">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-1 leading-tight">{project.title}</h3>
                                        <p className="text-stone-300 text-xs line-clamp-2 mb-3 font-light">{project.story}</p>
                                        <div className="flex items-center text-white font-medium text-xs tracking-wide group/btn">
                                            VIEW PROJECT <ArrowUpRight className="w-3 h-3 ml-1 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <div className="py-20 text-center">
                        <p className="text-stone-500 dark:text-stone-400 text-lg">No projects found in this category.</p>
                        <button
                            onClick={() => setActiveFilter('All')}
                            className="mt-4 text-orange-600 hover:text-orange-700 font-medium"
                        >
                            View all projects
                        </button>
                    </div>
                )}

                {/* Footer CTA */}
                <div className="mt-20 md:mt-32 flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link
                        href="/gallery"
                        className="px-10 py-5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-full font-medium text-lg transition-all hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl flex items-center"
                    >
                        Browse Full Portfolio
                    </Link>
                    <Link
                        href="/contact"
                        className="px-10 py-5 bg-transparent border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 rounded-full font-medium text-lg transition-colors hover:bg-stone-100 dark:hover:bg-stone-800"
                    >
                        Book a Session
                    </Link>
                </div>

            </div>
        </section>
    );
}
