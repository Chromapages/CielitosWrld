'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { urlFor, sanityLoader } from '@/sanity/lib/image';
import { MobileSection, MobileSectionHeader } from '../layout/MobileSection';

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
        type: item._type, 
        title: item.title || 'Untitled Project',
        category: item.category || 'Portfolio',
        image: item.coverImage
            ? (() => {
                try {
                    return urlFor(item.coverImage).width(1200).quality(80).auto('format').fit('max').url();
                } catch {
                    return item.coverImage?.asset?.url || item.coverImage?.url || 'https://placehold.co/800x1000/png?text=No+Image';
                }
            })()
            : 'https://placehold.co/800x1000/png?text=No+Image',
        lqip: item.coverImage?.asset?.metadata?.lqip,
        slug: item.slug,
        year: item.year || (item._createdAt ? new Date(item._createdAt).getFullYear() : new Date().getFullYear()),
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
        <MobileSection className="bg-stone-50 dark:bg-stone-950 overflow-hidden !py-20 md:!py-32">
            <div className="container mx-auto max-w-[1600px]">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-8 px-4 sm:px-8 md:px-0">
                    <MobileSectionHeader 
                        eyebrow="Selected Works"
                        title={data?.title || 'Recent Sessions'}
                        description="A curated selection of editorial, commercial, and personal projects."
                        className="mb-0"
                    />

                    <Link
                        href="/gallery"
                        className="hidden md:inline-flex items-center text-stone-900 dark:text-stone-100 font-bold hover:text-orange-600 dark:hover:text-orange-400 transition-colors group"
                    >
                        View Full Portfolio <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" suppressHydrationWarning />
                    </Link>
                </div>

                {!hasProjects ? (
                    <div className="py-20 text-center border-2 border-dashed border-stone-200 dark:border-stone-800 rounded-3xl bg-white dark:bg-stone-900/50 mx-4 sm:mx-8 md:mx-0">
                        <div className="max-w-md mx-auto px-6">
                            <Sparkles className="w-12 h-12 text-stone-300 dark:text-stone-700 mx-auto mb-4" suppressHydrationWarning />
                            <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-2">No Projects Found</h3>
                            <p className="text-stone-500 dark:text-stone-400 mb-6">
                                Head to Sanity Studio and add some &quot;Work&quot; items with the &quot;Featured&quot; toggle enabled to populate this section.
                            </p>
                            <Link href="/studio" target="_blank" className="btn-press inline-flex items-center px-6 py-3 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-full font-bold text-sm hover:scale-105 transition-transform">
                                Go to Studio
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div>
                        {/* LAYOUT: Hero Left, Grid Right (Desktop Only) */}
                        <div className="hidden md:flex flex-col xl:flex-row gap-6 md:gap-8 px-8 md:px-0">
                            {heroProject && (
                                <div className="w-full xl:w-1/2">
                                    <Link
                                        href={getProjectLink(heroProject)}
                                        className="group relative block w-full rounded-[2rem] overflow-hidden shadow-xl aspect-[4/5] xl:aspect-[3/4]"
                                    >
                                        <Image
                                            loader={sanityLoader}
                                            src={heroProject.image}
                                            alt={heroProject.title}
                                            fill
                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                            priority
                                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 50vw"
                                            placeholder={heroProject.lqip ? 'blur' : 'empty'}
                                            blurDataURL={heroProject.lqip}
                                            suppressHydrationWarning
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                                        <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full text-left">
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
                                                <div className="btn-press inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-bold text-sm transition-colors group-hover:bg-white group-hover:text-stone-900">
                                                    View Case Study <ArrowUpRight className="ml-2 w-4 h-4" suppressHydrationWarning />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )}

                            <div className="w-full xl:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                                {gridProjects.map((project, idx) => (
                                    <div key={project.id}>
                                        <Link
                                            href={getProjectLink(project)}
                                            className="group relative block w-full aspect-[4/5] rounded-[1.5rem] overflow-hidden shadow-lg bg-stone-200 dark:bg-stone-800"
                                        >
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                                                placeholder={project.lqip ? 'blur' : 'empty'}
                                                blurDataURL={project.lqip}
                                                suppressHydrationWarning
                                            />
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left">
                                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                    <p className="text-orange-400 text-xs font-bold tracking-widest uppercase mb-1">
                                                        {project.category}
                                                    </p>
                                                    <h4 className="text-xl font-bold font-archivo text-white mb-2 leading-tight">
                                                        {project.title}
                                                    </h4>
                                                    <div className="flex items-center text-white text-xs font-bold mt-3">
                                                        View Project <ArrowUpRight className="ml-1 w-3 h-3" suppressHydrationWarning />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* MOBILE CAROUSEL */}
                        <div className="md:hidden overflow-hidden" ref={emblaRef}>
                            <div className="flex touch-pan-y pl-[var(--mobile-gutter)]">
                                {projects.map((project) => (
                                    <div
                                        key={project.id}
                                        className="flex-[0_0_88%] min-w-0 pr-4 relative"
                                    >
                                        <Link
                                            href={getProjectLink(project)}
                                            className="block relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-lg bg-stone-200 dark:bg-stone-800 ring-1 ring-black/5"
                                        >
                                            <Image
                                                loader={sanityLoader}
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 85vw"
                                                placeholder={project.lqip ? 'blur' : 'empty'}
                                                blurDataURL={project.lqip}
                                                suppressHydrationWarning
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 text-left">
                                                <p className="text-orange-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-1">
                                                    {project.category}
                                                </p>
                                                <h3 className="text-2xl font-bold font-archivo text-white leading-tight">
                                                    {project.title}
                                                </h3>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Mobile Bottom CTA */}
                        <div className="mt-12 md:hidden px-[var(--mobile-gutter)]">
                            <Link
                                href="/gallery"
                                className="btn-press flex items-center px-8 py-4 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-full font-bold text-lg w-full justify-center shadow-lg transform active:scale-95 transition-transform"
                            >
                                View Full Portfolio
                            </Link>
                        </div>
                    </div>
                )}

            </div>
        </MobileSection>
    );
}
