'use client';

import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface WorkItem {
    _id: string;
    title: string;
    slug: string;
    year?: number;
    featured?: boolean;
    excerpt?: string;
    coverImage?: any;
    tags?: string[];
}

interface WorkCardProps {
    work: WorkItem;
}

export default function WorkCard({ work }: WorkCardProps) {
    return (
        <Link
            href={`/work/${work.slug}`}
            className="group block relative mb-6 break-inside-avoid"
        >
            <div className="relative overflow-hidden rounded-2xl bg-stone-100 dark:bg-stone-900 shadow-sm hover:shadow-xl transition-all duration-500 ease-out hover:-translate-y-1">
                {/* Image */}
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                    {work.coverImage ? (
                        <Image
                            src={urlFor(work.coverImage).width(800).url()}
                            alt={work.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-stone-200 dark:bg-stone-800 text-stone-400">
                            No Image
                        </div>
                    )}

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Badge (Top Left) */}
                {work.tags && work.tags.length > 0 && (
                    <div className="absolute top-4 left-4">
                        <span className="inline-block px-3 py-1 bg-white/90 dark:bg-black/80 backdrop-blur-sm text-stone-900 dark:text-white text-xs font-medium uppercase tracking-wider rounded-full shadow-sm">
                            {work.tags[0]}
                        </span>
                    </div>
                )}

                {/* Content Overlay (Bottom) - Visible on hover only for cleaner look */}
                <div className="absolute bottom-0 left-0 w-full p-6 text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex justify-between items-end">
                        <div>
                            <h3 className="text-xl font-bold font-archivo leading-tight mb-1">{work.title}</h3>
                            <p className="text-sm text-stone-200">{work.year}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white text-stone-900 flex items-center justify-center transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                            <ArrowUpRight className="w-5 h-5" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile/Default Content (Below Image) - Visible when not hovering or on mobile */}
            <div className="mt-4 md:hidden">
                <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-archivo">{work.title}</h3>
                <div className="flex gap-2 text-sm text-stone-500 dark:text-stone-400">
                    <span>{work.year}</span>
                    {work.tags && work.tags.length > 0 && (
                        <>
                            <span>•</span>
                            <span>{work.tags[0]}</span>
                        </>
                    )}
                </div>
            </div>
        </Link>
    );
}
