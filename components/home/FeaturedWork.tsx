'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Sparkles, ArrowUpRight, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { cn } from '@/lib/utils';
import { urlFor } from '@/sanity/lib/image';

interface Project {
    id: string;
    title: string;
    category?: string; // e.g. "Nike" or "Weddings" (mapped from client)
    image: string;
    slug: string;
    year: number;
    excerpt?: string;
}

interface FeaturedWorkProps {
    data?: {
        title?: string;
        items?: any[];
    };
}

export default function FeaturedWork({ data }: FeaturedWorkProps) {
    // Process items safely
    const projects = (data?.items || []).map((item: any) => ({
        id: item._id,
        type: item._type, // Keep track of document type
        title: item.title || 'Untitled Project',
        // 'category' here comes from the query mapping 'client' -> 'category'
        category: item.category || 'Portfolio',
        image: item.coverImage
            ? urlFor(item.coverImage).width(1200).url()
            : 'https://placehold.co/800x1000/png?text=No+Image',
        slug: item.slug,
        year: item.year || new Date().getFullYear(),
        excerpt: item.excerpt
    }));

    // Helper to generate the correct link
    const getProjectLink = (project: any) => {
        if (project.type === 'galleryAsset') return '/gallery';
        return `/work/${project.slug}`;
    };

    const hasProjects = projects.length > 0;

    // Split into Hero (first item) and Grid (next 4)
    const heroProject = hasProjects ? projects[0] : null;
    const gridProjects = hasProjects ? projects.slice(1, 5) : [];

    // Embla Carousel for Mobile
    const [emblaRef] = useEmblaCarousel({
        loop: true,
        align: 'start',
        containScroll: 'trimSnaps'
    });

    return (
        <section className="py-20 md:py-32 bg-stone-50 dark:bg-stone-950 overflow-hidden">
            <div className="container mx-auto px-4 md:px-8 max-w-[1600px]">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-8">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <Sparkles className="w-5 h-5 text-orange-600" />
                            <span className="text-sm font-medium tracking-[0.2em] uppercase text-stone-500">Selected Works</span>
                        </div>
                        <h2 className="font-pattaya text-5xl md:text-7xl font-bold text-stone-900 dark:text-stone-50 mb-6 leading-tight">
                            {data?.title || 'Recent Sessions'}
                        </h2>
                        <p className="text-stone-600 dark:text-stone-400 text-lg md:text-xl font-light leading-relaxed">
                            A curated selection of editorial, commercial, and personal projects.
                        </p>
                    </div>

                    <Link
                        href="/work"
                        className="hidden md:inline-flex items-center text-stone-900 dark:text-stone-100 font-medium hover:text-orange-600 dark:hover:text-orange-400 transition-colors group"
                    >
                        View Full Portfolio <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {!hasProjects ? (
                    <div className="py-20 text-center border-2 border-dashed border-stone-200 dark:border-stone-800 rounded-3xl bg-white dark:bg-stone-900/50">
                        <div className="max-w-md mx-auto px-6">
                            <Sparkles className="w-12 h-12 text-stone-300 dark:text-stone-700 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-2">No Projects Found</h3>
                            <p className="text-stone-500 dark:text-stone-400 mb-6">
                                Head to Sanity Studio and add some &quot;Work&quot; items with the &quot;Featured&quot; toggle enabled to populate this section.
                            </p>
                            <Link href="/studio" target="_blank" className="inline-flex items-center px-6 py-3 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-full font-medium text-sm hover:scale-105 transition-transform">
                                Go to Studio
                            </Link>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* LAYOUT: Hero Left, Grid Right (Desktop Only) */}
                        <div className="hidden md:flex flex-col xl:flex-row gap-6 md:gap-8">

                            {/* HERO PROJECT (50% width on XL) */}
                            {heroProject && (
                                <Link
                                    href={getProjectLink(heroProject)}
                                    className="group relative w-full xl:w-1/2 rounded-[2rem] overflow-hidden shadow-xl aspect-[4/5] xl:aspect-[3/4]"
                                >
                                    <Image
                                        src={heroProject.image}
                                        alt={heroProject.title}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        priority
                                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 50vw"
                                    />

                                    {/* Persistent Overlay (Gradient) */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                                    {/* Content Bottom */}
                                    <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                                        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                            <div className="flex items-center gap-3 text-white/80 text-sm font-medium mb-3">
                                                <span>{heroProject.category}</span>
                                                <span>•</span>
                                                <span>{heroProject.year}</span>
                                            </div>
                                            <h3 className="text-3xl md:text-5xl font-bold font-archivo text-white mb-3 leading-tight">
                                                {heroProject.title}
                                            </h3>
                                            {heroProject.excerpt && (
                                                <p className="text-white/80 text-base md:text-lg line-clamp-2 max-w-lg mb-6 font-light">
                                                    {heroProject.excerpt}
                                                </p>
                                            )}
                                            <div className="btn-press inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-medium text-sm transition-colors group-hover:bg-white group-hover:text-stone-900">
                                                View Case Study <ArrowUpRight className="ml-2 w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )}

                            {/* GRID PROJECTS (50% width on XL) */}
                            <div className="w-full xl:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                                {gridProjects.map((project, idx) => (
                                    <Link
                                        href={getProjectLink(project)}
                                        key={project.id}
                                        className={`group relative w-full aspect-[4/5] rounded-[1.5rem] overflow-hidden shadow-lg bg-stone-200 dark:bg-stone-800 ${idx < 4 ? `stagger-${idx + 1}` : ''}`}
                                    >
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                                        />

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                <p className="text-orange-400 text-xs font-bold tracking-widest uppercase mb-1">
                                                    {project.category}
                                                </p>
                                                <h4 className="text-xl font-bold font-archivo text-white mb-2 leading-tight">
                                                    {project.title}
                                                </h4>
                                                <div className="flex items-center text-white text-xs font-medium mt-3">
                                                    View Project <ArrowUpRight className="ml-1 w-3 h-3" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* MOBILE CAROUSEL (Visible only on mobile) */}
                        <div className="md:hidden -mx-4 overflow-hidden" ref={emblaRef}>
                            <div className="flex touch-pan-y pl-4">
                                {projects.map((project) => (
                                    <Link
                                        key={project.id}
                                        href={getProjectLink(project)}
                                        className="flex-[0_0_92%] min-w-0 pr-4 relative"
                                    >
                                        <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-lg bg-stone-200 dark:bg-stone-800">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 85vw"
                                            />
                                            {/* Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 flex flex-col justify-end p-6">
                                                <p className="text-orange-400 text-xs font-bold tracking-widest uppercase mb-1">
                                                    {project.category}
                                                </p>
                                                <h3 className="text-2xl font-bold font-archivo text-white leading-tight">
                                                    {project.title}
                                                </h3>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Mobile Bottom CTA */}
                        <div className="mt-12 md:hidden text-center">
                            <Link
                                href="/work"
                                className="btn-press inline-flex items-center px-8 py-4 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-full font-medium text-lg w-full justify-center shadow-lg"
                            >
                                View Full Portfolio
                            </Link>
                        </div>
                    </>
                )}

            </div>
        </section>
    );
}
