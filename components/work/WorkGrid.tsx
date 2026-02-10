'use client';

import { useState, useMemo } from 'react';
import Masonry from 'react-masonry-css';
import WorkCard, { WorkItem } from './WorkCard';
import { cn } from '@/lib/utils';
import { MotionConfig, motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

interface WorkGridProps {
    works: WorkItem[];
}

export default function WorkGrid({ works }: WorkGridProps) {
    const [filter, setFilter] = useState('All');
    const shouldReduceMotion = useReducedMotion();

    // Extract unique tags for filter
    const filters = useMemo(() => {
        const allTags = works.flatMap(w => w.tags || []);
        // Count occurrences to sort by popularity if desired, or just unique
        const uniqueTags = Array.from(new Set(allTags)).filter(Boolean).sort();
        return ['All', ...uniqueTags];
    }, [works]);

    // Filter logic
    const filteredWorks = useMemo(() => {
        if (filter === 'All') return works;
        return works.filter(w => w.tags?.includes(filter));
    }, [works, filter]);

    const breakpointColumnsObj = {
        default: 3,
        1100: 2,
        700: 1
    };

    return (
        <section>
            {/* Filter Chips */}
            <div className="mb-12 flex flex-wrap gap-2 justify-center md:justify-start">
                {filters.map((tag) => (
                    <button
                        key={tag}
                        onClick={() => setFilter(tag)}
                        className={cn(
                            "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
                            filter === tag
                                ? "bg-stone-900 text-white border-stone-900 dark:bg-stone-100 dark:text-stone-900 dark:border-stone-100 shadow-md transform scale-105"
                                : "bg-transparent text-stone-600 border-stone-200 hover:border-stone-400 hover:text-stone-900 dark:text-stone-400 dark:border-stone-800 dark:hover:text-stone-200 dark:hover:border-stone-700"
                        )}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            {/* Masonry Grid */}
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid flex w-auto -ml-8"
                columnClassName="my-masonry-grid_column pl-8 bg-clip-padding"
            >
                {filteredWorks.map((work) => (
                    <motion.div
                        key={work._id}
                        initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
                        layout={!shouldReduceMotion}
                    >
                        <WorkCard work={work} />
                    </motion.div>
                ))}
            </Masonry>
        </section>
    );
}
