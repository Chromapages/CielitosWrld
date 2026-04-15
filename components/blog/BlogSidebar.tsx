'use client';

import Link from 'next/link';
import { Search, Disc, MapPin, Headphones } from 'lucide-react';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import NewsletterWidget from './NewsletterWidget';
import PopularPostsWidget from './PopularPostsWidget';
import { useMusic } from './MusicContext';

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
        albumArt?: string;
    };
    curatedTags?: string[];
    popularPosts?: any[];
    newsletter?: {
        heading?: string;
        description?: string;
    };
}

export default function BlogSidebar({
    title,
    subtitle,
    sidebarProfile,
    currently,
    curatedTags,
    popularPosts,
    newsletter
}: BlogSidebarProps) {
    const { name, avatar, bio } = sidebarProfile || {};
    const { listening, location, albumArt } = currently || {};
    const tags = curatedTags || ['film', '35mm', 'portraits', 'nightwalks', 'travel', 'journal', 'canon ae-1'];

    // We can safely use this hook because BlogPage wraps everything in MusicProvider
    const { setIsPlayerVisible, togglePlay, currentTrack } = useMusic();

    return (
        <aside className="w-72 flex-shrink-0 space-y-6 pb-20">

            {/* Profile Widget - Premium Opaque Card */}
            <div className="premium-card rounded-2xl p-6 shadow-elevation-2 hover:shadow-elevation-3 transition-shadow duration-300">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 overflow-hidden mx-auto mb-4 relative ring-4 ring-white/50 dark:ring-white/20 shadow-lg">
                    {avatar ? (
                        <Image
                            src={urlFor(avatar).width(160).height(160).url()}
                            alt={name || "Profile"}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-orange-400 to-brand-600" />
                    )}
                </div>
                <div className="text-center">
                    <h3 className="font-bold text-2xl text-brand-900 dark:text-brand-100 italic">
                        {name || title || "Cielito's Wrld"}
                    </h3>
                    <p className="text-sm text-brand-600 dark:text-brand-300 leading-relaxed mt-2">
                        {bio || subtitle || "Visual stories & late night thoughts."}
                    </p>
                </div>
            </div>

            {/* Search Pill - Solid background */}
            <div className="relative group bg-white dark:bg-brand-900 border border-brand-100 dark:border-brand-800 rounded-full shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-300 overflow-hidden">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-500 dark:text-brand-400 group-focus-within:text-orange-600 transition-colors" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full bg-transparent border-none py-3 pl-10 pr-4 text-sm text-brand-900 dark:text-brand-100 placeholder:text-brand-500 dark:placeholder:text-brand-500 focus:outline-none focus:ring-0 transition-colors"
                />
            </div>

            {/* Popular Posts Widget */}
            <PopularPostsWidget posts={popularPosts} />

            {/* Navigation Links - Premium Opaque Card */}
            <nav className="premium-card rounded-2xl p-2 shadow-elevation-2 flex flex-col gap-1">
                {['Home', 'Archive', 'Ask', 'Submit'].map((item) => (
                    <Link
                        key={item}
                        href={item === 'Home' ? '/' : `/blog/${item.toLowerCase()}`}
                        className="px-4 py-3 rounded-xl text-brand-700 dark:text-brand-300 hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:text-orange-700 dark:hover:text-orange-400 transition-all font-bold text-lg flex items-center justify-between group"
                    >
                        <span>{item}</span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-orange-500 transform group-hover:translate-x-1">&rarr;</span>
                    </Link>
                ))}
            </nav>

            {/* Enhanced Currently Widget - Solid background */}
            <div className="premium-card rounded-2xl p-5 shadow-elevation-2 space-y-4">
                <h4 className="text-[10px] font-archivo font-black text-brand-400 dark:text-brand-500 uppercase tracking-widest">Currently</h4>

                {/* Listening Section with Album Art */}
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center flex-shrink-0 overflow-hidden shadow-lg shadow-orange-500/30">
                        {albumArt ? (
                            <Image
                                src={albumArt}
                                alt={`Album cover for ${currently?.listening?.replace('Listening to ', '') || 'Current track'}`}
                                width={48}
                                height={48}
                                className="object-cover"
                            />
                        ) : (
                            <Headphones className="w-6 h-6 text-white" />
                        )}
                    </div>
                    <div className="flex-1 min-w-0 pointer-events-auto cursor-pointer group" onClick={() => {
                        setIsPlayerVisible(true);
                    }}>
                        <div className="flex items-center gap-1 text-[10px] text-orange-600 dark:text-orange-400 font-bold uppercase tracking-wider group-hover:text-orange-500 transition-colors">
                            <Disc className="w-3 h-3 animate-spin-slow" />
                            Now Playing
                        </div>
                        <p className="text-sm text-brand-800 dark:text-brand-200 truncate font-medium group-hover:text-orange-700 dark:group-hover:text-orange-300 transition-colors">
                            <span className="italic">{currentTrack ? currentTrack.title : (listening || "Sonic Aura")}</span>
                        </p>
                    </div>
                </div>

                {/* Location Section */}
                <div className="flex items-center gap-3 pt-3 border-t border-white/20 dark:border-white/10">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-400 to-brand-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                        <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-[10px] text-brand-400 dark:text-brand-500 font-bold uppercase tracking-wider">
                            Editing In
                        </div>
                        <p className="text-sm text-brand-800 dark:text-brand-200 font-bold">
                            {location || "SoCal"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Tags Cloud - Glass Card */}
            <div className="glass-card rounded-2xl p-5 shadow-elevation-2 space-y-3">
                <h4 className="text-[10px] font-archivo font-black text-brand-400 dark:text-brand-500 uppercase tracking-widest">Tags</h4>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <Link
                            key={tag}
                            href={`/blog/tags/${tag}`}
                            className="text-xs font-medium px-3 py-1.5 rounded-full bg-white dark:bg-brand-800 border border-brand-50 dark:border-brand-700 text-brand-700 dark:text-brand-300 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 transition-all duration-200"
                        >
                            #{tag}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Contact CTA - Bottom */}
            <NewsletterWidget
                heading={newsletter?.heading}
                description={newsletter?.description}
            />
        </aside>
    );
}
