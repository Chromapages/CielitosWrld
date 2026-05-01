'use client';

import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { ArrowRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  coverImage?: any;
  publishedAt: string;
  category?: string;
  estimatedReadingTime?: number;
}

interface RelatedPostsProps {
  posts: Post[];
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="py-20 md:py-32 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 md:mb-14"
        >
          <h2 className="font-pattaya text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-3 italic">
            More Stories
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Continue reading similar articles
          </p>
        </motion.div>

        {/* Desktop Grid (4 columns on large, 2 on tablet) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post, index) => (
            <motion.article
              key={post._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/blog/${post.slug.current}`} className="block">
                <div className="relative bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  {/* Image - Aspect 3/4 for visual impact */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    {post.coverImage ? (
                      <Image
                        src={urlFor(post.coverImage).width(600).height(800).url()}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#EC4899]/20 to-[#F472B6]/20" />
                    )}
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                    
                    {/* Content on Image */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      {/* Category Badge */}
                      {post.category && (
                        <span className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white bg-[#EC4899] rounded-full mb-3">
                          {post.category}
                        </span>
                      )}
                      <h3 className="font-pattaya text-lg font-bold text-white leading-tight line-clamp-3 group-hover:text-[#EC4899] transition-colors italic">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-3 text-xs text-white/70">
                        <time>{formatDate(post.publishedAt)}</time>
                        {post.estimatedReadingTime && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {Math.ceil(post.estimatedReadingTime)} min
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden -mx-4 px-4">
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {posts.map((post, index) => (
              <motion.article
                key={post._id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex-shrink-0 w-[280px] snap-start"
              >
                <Link href={`/blog/${post.slug.current}`} className="block">
                  <div className="relative bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-md">
                    {/* Image - Aspect 3/4 */}
                    <div className="relative aspect-[3/4] overflow-hidden">
                      {post.coverImage ? (
                        <Image
                          src={urlFor(post.coverImage).width(560).height(746).url()}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#EC4899]/20 to-[#F472B6]/20" />
                      )}
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      {/* Content on Image */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        {post.category && (
                          <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white bg-[#EC4899] rounded-full mb-2">
                            {post.category}
                          </span>
                        )}
                        <h3 className="font-pattaya text-base font-bold text-white leading-snug line-clamp-3 italic">
                          {post.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-2 text-xs text-white/70">
                          <time>{formatDate(post.publishedAt)}</time>
                          {post.estimatedReadingTime && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {Math.ceil(post.estimatedReadingTime)} min
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
          
          {/* Scroll Indicator */}
          <div className="flex justify-center gap-1.5 mt-4">
            {posts.map((_, index) => (
              <div key={index} className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            ))}
          </div>
        </div>

        {/* View All Link */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-zinc-900 dark:text-white font-semibold hover:text-[#EC4899] transition-colors group"
          >
            View All Stories
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default RelatedPosts;
