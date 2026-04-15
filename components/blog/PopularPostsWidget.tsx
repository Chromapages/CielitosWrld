'use client';

import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { TrendingUp, Eye } from 'lucide-react';

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  coverImage?: any;
  viewCount?: number;
}

interface PopularPostsWidgetProps {
  posts?: Post[];
}

// Mock popular posts data
export default function PopularPostsWidget({ posts = [] }: PopularPostsWidgetProps) {
  if (!posts || posts.length === 0) return null;
  return (
    <div className="bg-white dark:bg-brand-900 p-5 rounded-2xl border border-brand-100 dark:border-brand-800 shadow-sm relative z-10">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-4 h-4 text-orange-600" />
        <h4 className="text-[10px] font-archivo font-black text-brand-400 dark:text-brand-500 uppercase tracking-widest">Popular Posts</h4>
      </div>

      <div className="space-y-4">
        {posts.map((post, index) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug.current}`}
            className="group flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-white/40 dark:hover:bg-white/10 transition-colors"
          >
            {/* Thumbnail */}
            <div className="w-16 h-16 rounded-lg bg-brand-200 dark:bg-brand-800 overflow-hidden flex-shrink-0 relative">
              {post.coverImage ? (
                <Image
                  src={urlFor(post.coverImage).width(100).height(100).url()}
                  alt={post.title}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-orange-200 to-brand-200 dark:from-orange-900/30 dark:to-brand-900/30 flex items-center justify-center">
                  <span className="text-lg font-display font-bold text-orange-400 dark:text-orange-600">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h5 className="text-sm font-inter font-medium text-brand-800 dark:text-brand-200 leading-tight line-clamp-2 group-hover:text-orange-700 dark:group-hover:text-orange-400 transition-colors">
                {post.title}
              </h5>
              {post.viewCount && (
                <div className="flex items-center gap-1 mt-1 text-xs text-brand-400 dark:text-brand-500">
                  <Eye className="w-3 h-3" />
                  {post.viewCount.toLocaleString()} views
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* View All Link */}
      <Link
        href="/blog/archive"
        className="block text-center text-xs text-orange-600 dark:text-orange-400 font-medium mt-4 pt-4 border-t border-orange-500/20 dark:border-orange-400/20 hover:underline"
      >
        View All Posts →
      </Link>
    </div>
  );
}
