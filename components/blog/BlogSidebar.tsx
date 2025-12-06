'use client';

import Link from 'next/link';
import { Search, Disc, MapPin } from 'lucide-react';

import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';

interface BlogSidebarProps {
    title?: string;
    subtitle?: string;
    sidebarProfile?: {
        name?: string;
        avatar?: any;
        bio?: string;
    };
    currently?: {
        listening?: string;
        location?: string;
    };
    curatedTags?: string[];
}

export default function BlogSidebar({
    title,
    subtitle,
    sidebarProfile,
    currently,
    curatedTags
}: BlogSidebarProps) {
    const { name, avatar, bio } = sidebarProfile || {};
    const { listening, location } = currently || {};
    const tags = curatedTags || ['film', '35mm', 'portraits', 'nightwalks', 'travel', 'journal', 'canon ae-1'];

    return (
        <aside className="w-72 flex-shrink-0 sticky top-32 self-start hidden lg:block space-y-8">

            {/* Profile Widget */}
            <div className="bg-white/70 dark:bg-moss-900/70 backdrop-blur-md p-6 rounded-xl border border-white/20 dark:border-white/10 shadow-sm">
                <div className="w-20 h-20 rounded-full bg-sage-200 dark:bg-sage-800 overflow-hidden mx-auto mb-4 relative ring-2 ring-white/30 dark:ring-white/10">
                    {avatar ? (
                        <Image
                            src={urlFor(avatar).width(160).height(160).url()}
                            alt={name || "Profile"}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-orange-400 to-mud-600" />
                    )}
                </div>
                <div className="text-center">
                    <h3 className="font-fitzgerald font-bold text-2xl text-mud-900 dark:text-sage-100">
                        {name || title || "Cielito's Wrld"}
                    </h3>
                    <p className="text-sm text-sage-700 dark:text-sage-300 font-inter leading-relaxed mt-2">
                        {bio || subtitle || "Visual stories & late night thoughts."}
                    </p>
                </div>
            </div>

            {/* Search Pill */}
            <div className="relative group bg-white/70 dark:bg-moss-900/70 backdrop-blur-md rounded-full border border-white/20 dark:border-white/10 overflow-hidden transition-all focus-within:bg-white/80 dark:focus-within:bg-moss-900/80 focus-within:border-orange-500/50 shadow-sm">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-mud-500 dark:text-sage-400 group-focus-within:text-orange-600 transition-colors" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full bg-transparent border-none py-2.5 pl-10 pr-4 text-sm text-mud-900 dark:text-sage-100 placeholder:text-mud-500 dark:placeholder:text-sage-500 focus:outline-none focus:ring-0 transition-colors"
                />
            </div>

            {/* Navigation Links */}
            <nav className="bg-white/70 dark:bg-moss-900/70 backdrop-blur-md p-2 rounded-xl border border-white/20 dark:border-white/10 shadow-sm flex flex-col gap-1">
                {['Home', 'Archive', 'Ask', 'Submit'].map((item) => (
                    <Link
                        key={item}
                        href={item === 'Home' ? '/' : `/blog/${item.toLowerCase()}`}
                        className="px-4 py-2 rounded-lg text-mud-700 dark:text-sage-300 hover:bg-white/40 dark:hover:bg-white/10 hover:text-orange-700 dark:hover:text-orange-400 transition-all font-fitzgerald text-lg flex items-center justify-between group"
                    >
                        <span>{item}</span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-orange-500">&rarr;</span>
                    </Link>
                ))}
            </nav>

            {/* Currently Widget */}
            <div className="bg-white/70 dark:bg-moss-900/70 backdrop-blur-md p-5 rounded-xl border border-white/20 dark:border-white/10 shadow-sm space-y-3">
                <h4 className="text-[10px] font-bold text-mud-400 dark:text-sage-500 uppercase tracking-widest mb-1">Currently</h4>

                <div className="flex items-center gap-3 text-sm text-mud-800 dark:text-sage-200">
                    <Disc className="w-4 h-4 animate-spin-slow text-orange-600 flex-shrink-0" />
                    <span className="truncate">Listening to <span className="italic font-medium">{listening || "Lofi Beats"}</span></span>
                </div>

                <div className="flex items-center gap-3 text-sm text-mud-800 dark:text-sage-200">
                    <MapPin className="w-4 h-4 text-orange-600 flex-shrink-0" />
                    <span>Editing in <span className="font-medium">{location || "SoCal"}</span></span>
                </div>
            </div>

            {/* Tags Cloud */}
            <div className="bg-white/70 dark:bg-moss-900/70 backdrop-blur-md p-5 rounded-xl border border-white/20 dark:border-white/10 shadow-sm space-y-3">
                <h4 className="text-[10px] font-bold text-mud-400 dark:text-sage-500 uppercase tracking-widest">Tags</h4>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <Link
                            key={tag}
                            href={`/blog/tags/${tag}`}
                            className="text-xs font-medium px-2.5 py-1 rounded-md bg-white/30 dark:bg-white/5 text-mud-600 dark:text-sage-400 hover:bg-orange-100 dark:hover:bg-orange-900/30 hover:text-orange-700 dark:hover:text-orange-400 transition-colors"
                        >
                            #{tag}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="text-center">
                <p className="text-[10px] text-sage-500 dark:text-sage-600 uppercase tracking-widest font-medium">
                    Theme by Cielito
                </p>
            </div>
        </aside>
    );
}
