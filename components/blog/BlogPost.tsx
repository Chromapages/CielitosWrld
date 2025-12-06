'use client';

import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { Share2, ExternalLink, Quote, Heart, Repeat } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PortableText } from '@portabletext/react';

interface BlogPostProps {
  post: any;
}

export default function BlogPost({ post }: BlogPostProps) {
  const { title, publishedAt, tags, slug, body, coverImage, photos, quoteText, quoteSource, linkUrl } = post;
  const postType = post.postType || 'text';

  const date = new Date(publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });

  return (
    <article className="bg-white/70 dark:bg-moss-900/70 backdrop-blur-md rounded-xl shadow-sm border border-white/20 dark:border-white/10 overflow-hidden mb-12 group transition-all hover:shadow-md hover:bg-white/80 dark:hover:bg-moss-900/80">

      {/* Header (Date & Permalink) - Tumblr Style */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-orange-500/30 dark:border-orange-400/30">
        <div className="text-xs font-bold text-mud-600 dark:text-sage-300 uppercase tracking-widest opacity-80">
          {date}
        </div>
        <Link
          href={`/blog/${slug.current}`}
          className="text-mud-400 dark:text-sage-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
          title="Permalink"
        >
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>

      {/* Content based on Type */}
      <div className="relative">

        {/* PHOTO POST */}
        {postType === 'photo' && (
          <div className="space-y-1">
            {/* Single Cover Image */}
            {coverImage && !photos && (
              <div className="relative w-full">
                <Image
                  src={urlFor(coverImage).width(1200).url()}
                  alt={coverImage.alt || title}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
            {/* Photo Set */}
            {photos && photos.length > 0 && (
              <div className="grid grid-cols-1 gap-1">
                {photos.map((photo: any, idx: number) => (
                  <div key={idx} className="relative w-full">
                    <Image
                      src={urlFor(photo).width(1200).url()}
                      alt={photo.alt || `Photo ${idx + 1}`}
                      width={1200}
                      height={800}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
            {/* Caption */}
            {(title || body) && (
              <div className="px-6 py-6">
                {title && <h2 className="text-2xl font-fitzgerald font-bold mb-3 text-mud-900 dark:text-sage-100">{title}</h2>}
                {body && (
                  <div className="prose dark:prose-invert prose-sage max-w-none font-inter text-mud-800 dark:text-sage-200">
                    <PortableText value={body} />
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* QUOTE POST */}
        {postType === 'quote' && (
          <div className="px-8 py-10">
            <Quote className="w-8 h-8 text-orange-400 mb-6 opacity-80" />
            <blockquote className="text-3xl md:text-4xl font-fitzgerald font-bold leading-tight text-mud-900 dark:text-sage-100 mb-6">
              "{quoteText}"
            </blockquote>
            {quoteSource && (
              <div className="flex items-center gap-3 text-sage-600 dark:text-sage-400 font-inter text-sm uppercase tracking-widest">
                <span className="w-8 h-[1px] bg-orange-400"></span>
                {quoteSource}
              </div>
            )}
          </div>
        )}

        {/* LINK POST */}
        {postType === 'link' && (
          <div className="p-6">
            <a
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block group/link bg-white/30 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-lg overflow-hidden hover:border-orange-500/50 transition-all"
            >
              {coverImage && (
                <div className="relative h-56 w-full">
                  <Image
                    src={urlFor(coverImage).width(800).url()}
                    alt={coverImage.alt || title}
                    fill
                    className="object-cover group-hover/link:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-5 flex items-center justify-between bg-transparent">
                <div>
                  <h2 className="text-xl font-fitzgerald font-bold text-mud-900 dark:text-sage-100 mb-1 group-hover/link:text-orange-600 transition-colors">
                    {title}
                  </h2>
                  <p className="text-sm text-sage-600 dark:text-sage-400 font-inter truncate max-w-md">{linkUrl}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/40 dark:bg-white/10 flex items-center justify-center group-hover/link:bg-orange-100 dark:group-hover/link:bg-orange-900/30 transition-colors">
                  <ExternalLink className="w-5 h-5 text-mud-500 dark:text-sage-300 group-hover/link:text-orange-500" />
                </div>
              </div>
            </a>
          </div>
        )}

        {/* TEXT POST (Default) */}
        {postType === 'text' && (
          <div className="px-6 py-8">
            {title && (
              <Link href={`/blog/${slug.current}`} className="block mb-4 group/title">
                <h2 className="text-3xl md:text-4xl font-fitzgerald font-bold text-mud-900 dark:text-sage-100 group-hover/title:text-orange-700 transition-colors">
                  {title}
                </h2>
              </Link>
            )}
            {coverImage && (
              <div className="relative aspect-video w-full mb-8 rounded-lg overflow-hidden shadow-sm">
                <Image
                  src={urlFor(coverImage).width(800).height(450).url()}
                  alt={coverImage.alt || title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            {body && (
              <div className="prose dark:prose-invert prose-sage max-w-none prose-lg font-inter text-mud-800 dark:text-sage-200 leading-relaxed">
                <PortableText value={body} />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer / Meta / Controls */}
      <div className="px-6 py-4 bg-transparent border-t border-orange-500/30 dark:border-orange-400/30 flex items-center justify-between">

        {/* Tags as Chips */}
        <div className="flex flex-wrap gap-2">
          {tags?.map((tag: string) => (
            <Link
              key={tag}
              href={`/blog/tags/${tag}`}
              className="text-xs font-medium font-inter px-3 py-1 rounded-full bg-white/30 dark:bg-white/5 text-mud-600 dark:text-sage-300 hover:bg-orange-100 dark:hover:bg-orange-900/30 hover:text-orange-700 dark:hover:text-orange-400 transition-all border border-transparent hover:border-orange-200 dark:hover:border-orange-800/50"
            >
              #{tag}
            </Link>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 text-mud-400 dark:text-sage-400">
            <button className="hover:text-green-600 hover:bg-green-100/50 dark:hover:bg-green-900/30 p-1.5 rounded-full transition-all" title="Reblog">
              <Repeat className="w-5 h-5" />
            </button>
            <button className="hover:text-red-500 hover:bg-red-100/50 dark:hover:bg-red-900/30 p-1.5 rounded-full transition-all" title="Like">
              <Heart className="w-5 h-5" />
            </button>
          </div>
          <Link
            href={`/blog/${slug.current}`}
            className="p-1.5 rounded-full hover:bg-white/40 dark:hover:bg-white/10 text-mud-400 dark:text-sage-400 hover:text-mud-900 dark:hover:text-sage-100 transition-all"
            title="Permalink"
          >
            <Share2 className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </article>
  );
}