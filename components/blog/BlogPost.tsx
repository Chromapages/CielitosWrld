'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import {
  Share2, ExternalLink, Quote, Heart, Repeat, Clock,
  Link2, Twitter, Facebook, Check, MessageCircle, MoreHorizontal, ArrowRight
} from 'lucide-react';
import { PortableText } from '@portabletext/react';

interface BlogPostProps {
  post: any;
  avatar?: string;
  username?: string;
}

// Calculate read time based on content
function calculateReadTime(content: any): number {
  if (!content) return 3;
  const text = JSON.stringify(content);
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

// Get relative time (e.g., "2 days ago")
function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Film Strip Border Component (Optional/Legacy feel)
function FilmStripBorder() {
  return (
    <div className="absolute left-0 top-0 bottom-0 w-12 bg-stone-900 overflow-hidden pointer-events-none z-10 hidden sm:block">
      <svg className="w-full h-full" viewBox="0 0 48 800" preserveAspectRatio="none">
        <text x="24" y="20" className="fill-amber-500 text-[8px] font-mono" textAnchor="middle">▂▃▅</text>
        <text x="24" y="35" className="fill-amber-500 text-[6px] font-mono" textAnchor="middle">10A III</text>
        {Array.from({ length: 40 }).map((_, i) => (
          <rect
            key={i}
            x="6"
            y={50 + i * 18}
            width="10"
            height="12"
            rx="2"
            className="fill-black"
          />
        ))}
      </svg>
    </div>
  );
}

// Post Header Component
function PostHeader({
  avatar,
  username,
  publishedAt,
  notes = 0,
  rebloggedFrom
}: {
  avatar?: string;
  username?: string;
  publishedAt: string;
  notes?: number;
  rebloggedFrom?: string;
}) {
  return (
    <header className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-3 min-w-0">
        {/* Avatar */}
        <Link href={`/blog/user/${username || "cielito"}`} className="relative group/avatar">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 ring-2 ring-white/30 overflow-hidden flex-shrink-0 group-hover/avatar:ring-orange-500 transition-all">
            {avatar ? (
              <Image src={avatar} alt={username || "User"} width={40} height={40} className="object-cover w-full h-full" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-orange-400 to-brand-600" />
            )}
          </div>
        </Link>

        {/* Username + Metadata */}
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <Link href={`/blog/user/${username || "cielito"}`} className="font-bold text-sm text-brand-900 dark:text-brand-100 truncate hover:text-orange-600 transition-colors">
              {username || "cielitoswrld"}
            </Link>
            {rebloggedFrom && (
              <div className="text-[10px] text-orange-600 dark:text-orange-400 flex items-center gap-1 bg-orange-50 dark:bg-orange-500/10 px-1.5 py-0.5 rounded">
                <Repeat className="w-2.5 h-2.5" />
                <span className="truncate max-w-[80px]">{rebloggedFrom}</span>
              </div>
            )}
          </div>
          <div className="text-[11px] text-brand-500 dark:text-brand-500 flex items-center gap-1.5">
            <time>{getRelativeTime(publishedAt)}</time>
          </div>
        </div>
      </div>

      <button className="text-brand-400 hover:text-brand-600 dark:hover:text-brand-200 transition-colors">
        <MoreHorizontal className="w-5 h-5" />
      </button>
    </header>
  );
}

// Interaction Footer Component
function PostFooter({
  slug,
  likes = 0,
  reblogs = 0,
  notes = 0,
  onCommentClick
}: {
  slug: { current: string };
  likes?: number;
  reblogs?: number;
  notes?: number;
  onCommentClick?: () => void;
}) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleShare = async (platform: string) => {
    const url = `${window.location.origin}/blog/${slug.current}`;
    switch (platform) {
      case 'copy':
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
    }
    setShowShareMenu(false);
  };

  return (
    <footer className="px-6 py-3 flex items-center justify-between border-t border-white/10 dark:border-white/5">
      {/* Left: Interactions */}
      <div className="flex items-center gap-1 -ml-2">
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`btn-tumblr group ${isLiked ? 'text-red-500' : ''}`}
          aria-label="Like this post"
        >
          <Heart className={`w-5 h-5 transition-all duration-300 ${isLiked ? 'fill-current scale-110' : 'group-active:scale-125'}`} />
        </button>

        <button className="btn-tumblr group" aria-label="Reblog this post">
          <Repeat className="w-5 h-5 group-hover:rotate-180 transition-all duration-500" />
        </button>

        <button onClick={onCommentClick} className="btn-tumblr" aria-label="Add a comment">
          <MessageCircle className="w-5 h-5" />
        </button>

        <div className="relative">
          <button
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="btn-tumblr"
            aria-label="Share this post"
          >
            <Share2 className="w-5 h-5" />
          </button>

          {showShareMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowShareMenu(false)} />
              <div className="absolute left-0 bottom-full mb-2 w-48 glass-heavy rounded-xl shadow-elevation-3 overflow-hidden z-50">
                <button onClick={() => handleShare('copy')} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-brand-700 dark:text-brand-200 hover:bg-orange-500/10 transition-colors">
                  {copied ? <><Check className="w-4 h-4 text-green-500" /><span className="text-green-600">Copied!</span></>
                    : <><Link2 className="w-4 h-4" />Copy Link</>}
                </button>
                <button onClick={() => handleShare('twitter')} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-brand-700 dark:text-brand-200 hover:bg-orange-500/10 transition-colors">
                  <Twitter className="w-4 h-4 text-sky-500" />Share on X
                </button>
                <button onClick={() => handleShare('facebook')} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-brand-700 dark:text-brand-200 hover:bg-orange-500/10 transition-colors">
                  <Facebook className="w-4 h-4 text-blue-600" />Share on Facebook
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right: Notes + Permalink */}
      <div className="flex items-center gap-4">
        <span className="text-[11px] font-bold text-brand-400 dark:text-brand-500 uppercase tracking-widest">
          {notes} notes
        </span>
        <Link href={`/blog/${slug.current}`} className="text-brand-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors" aria-label="Permalink">
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>
    </footer>
  );
}

// Inline Tags Component
function InlineTags({ tags }: { tags?: string[] }) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="px-6 pb-4 flex flex-wrap gap-x-3 gap-y-1">
      {tags.map((tag: string) => (
        <Link
          key={tag}
          href={`/blog/tags/${tag}`}
          className="text-[13px] text-brand-400 dark:text-brand-500 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
        >
          #{tag}
        </Link>
      ))}
    </div>
  );
}

// Get accent gradient by post type
function getAccentGradient(postType: string): string {
  switch (postType) {
    case 'photo':
      return 'from-orange-500 to-orange-400';
    case 'quote':
      return 'from-purple-500 to-purple-400';
    case 'link':
      return 'from-blue-500 to-blue-400';
    default:
      return 'from-brand-600 to-brand-500';
  }
}

export default function BlogPost({ post, avatar, username }: BlogPostProps) {
  const { title, publishedAt, tags, slug, body, coverImage, photos, quoteText, quoteSource, linkUrl } = post;
  const postType = post.postType || 'text';
  const accentGradient = getAccentGradient(postType);

  // Mock notes counts
  const notes = Math.floor(Math.random() * 50) + 5;
  const likes = Math.floor(Math.random() * 30) + 2;
  const reblogs = Math.floor(Math.random() * 20) + 1;

  return (
    <article className="tumblr-post-card group hover-lift mx-auto max-w-2xl w-full relative">
      {/* Invisible Overlay Link for entire card */}
      <Link
        href={`/blog/${slug.current}`}
        className="absolute inset-0 z-0"
        aria-label={`Read ${title || 'full post'}`}
      />

      {/* Top Accent Bar */}
      <div className={`h-0.5 bg-gradient-to-r ${accentGradient} relative z-10`} />

      {/* Post Type Badge */}
      <span className="post-type-badge opacity-0 group-hover:opacity-100 transition-opacity z-10">
        {postType}
      </span>

      {/* Content Area - MOVED TO TOP FOR VISUAL FOCUS */}
      <div className="media-content relative z-10 pointer-events-none">
        {/* PHOTO POST - ABSOLUTE FOCUS */}
        {postType === 'photo' && (
          <div className="relative">
            {/* Main Images - Full Width & Edge-to-Edge */}
            <div className="overflow-hidden">
              {coverImage && !photos && (
                <div className="block relative aspect-[4/5] sm:aspect-auto group/image">
                  <Image
                    src={urlFor(coverImage).width(1200).url()}
                    alt={coverImage.alt || title || "Blog post image"}
                    width={1200}
                    height={1600}
                    className="w-full h-auto object-cover group-hover/image:scale-[1.01] transition-transform duration-1000 ease-out"
                    priority
                  />
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-40" />
                </div>
              )}

              {photos && photos.length > 0 && (
                <div className="flex flex-col gap-1">
                  {photos.map((photo: any, idx: number) => (
                    <div key={idx} className="relative group/image overflow-hidden">
                      <Image
                        src={urlFor(photo).width(1200).url()}
                        alt={photo.alt || `Photo ${idx + 1}`}
                        width={1200}
                        height={1600}
                        className="w-full h-auto object-cover group-hover/image:scale-[1.01] transition-transform duration-1000 ease-out"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* QUOTE POST */}
        {postType === 'quote' && (
          <div className="px-8 pt-16 pb-8 text-center relative overflow-hidden bg-purple-50 dark:bg-purple-950/20">
            <Quote className="absolute -left-4 -top-4 w-32 h-32 text-purple-500/10 rotate-12" />
            <div className="relative z-10">
              <Quote className="w-8 h-8 text-purple-400 mx-auto mb-6" />
              <blockquote className="text-h2 leading-tight text-brand-900 dark:text-brand-100 mb-6 italic font-serif">
                "{quoteText}"
              </blockquote>
              {quoteSource && (
                <cite className="block text-xs text-brand-500 dark:text-brand-500 uppercase tracking-widest not-italic">
                  — {quoteSource}
                </cite>
              )}
            </div>
          </div>
        )}

        {/* LINK POST */}
        {postType === 'link' && (
          <div className="p-4 pt-8">
            <div className="block group/link bg-brand-50 dark:bg-brand-800/50 rounded-2xl overflow-hidden border border-brand-100 dark:border-brand-700 hover:border-blue-500/50 transition-all shadow-sm hover:shadow-elevation-2">
              {coverImage && (
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image src={urlFor(coverImage).width(800).url()} alt={title || "Link preview"} fill className="object-cover group-hover/link:scale-105 transition-transform duration-700" />
                </div>
              )}
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="text-base font-bold text-brand-900 dark:text-brand-100 group-hover/link:text-blue-600 transition-colors truncate">
                      {title || linkUrl}
                    </h2>
                    <p className="text-[10px] text-brand-500 dark:text-brand-500 truncate mt-1 uppercase tracking-wider">
                      {linkUrl ? new URL(linkUrl).hostname : ''}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-brand-400" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TEXT POST - STILL VERTICAL BUT WITH PROMINENT IMAGE */}
        {postType === 'text' && (
          <div className="relative">
            {coverImage && (
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image src={urlFor(coverImage).width(1200).url()} alt={coverImage.alt || title || "Post cover"} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Meta Header - Interactivity restricted to profile link */}
      <div className="relative z-20" onClick={(e) => e.stopPropagation()}>
        <PostHeader
          avatar={avatar}
          username={username}
          publishedAt={publishedAt}
          notes={notes}
        />
      </div>

      {/* Caption Area - Interactivity allowed but mostly inert except for links */}
      <div className="px-6 pb-2 pt-0 relative z-10">
        {postType === 'text' && title && (
          <div className="mb-3">
            <h2 className="text-h3 text-brand-900 dark:text-brand-100 group-hover:text-orange-600 transition-colors leading-tight">
              {title}
            </h2>
          </div>
        )}

        {(post.excerpt || body) && (
          <div className="text-body-sm text-brand-800 dark:text-brand-200 leading-relaxed max-w-none prose-sm dark:prose-invert pointer-events-auto">
            {/* For non-text posts, title acts as a bold lead-in */}
            {postType !== 'text' && title && (
              <span className="font-bold text-brand-900 dark:text-brand-100 mr-2">{title}</span>
            )}

            {post.excerpt ? (
              <p className="mb-0">{post.excerpt}</p>
            ) : body && (
              <PortableText value={body.slice(0, 1)} />
            )}

            {/* Read More Link */}
            <div className="mt-4">
              <Link
                href={`/blog/${slug.current}`}
                className="inline-flex items-center gap-1.5 text-[11px] font-bold text-orange-600 dark:text-orange-500 hover:text-orange-500 dark:hover:text-orange-400 transition-colors group/readmore uppercase tracking-widest"
              >
                Read full story
                <ArrowRight className="w-3 h-3 transition-transform group-hover/readmore:translate-x-0.5" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Tags - High Z-index to override card link */}
      <div className="relative z-20" onClick={(e) => e.stopPropagation()}>
        <InlineTags tags={tags} />
      </div>

      {/* Footer - High Z-index to override card link */}
      <div className="relative z-20" onClick={(e) => e.stopPropagation()}>
        <PostFooter
          slug={slug}
          likes={likes}
          reblogs={reblogs}
          notes={notes}
        />
      </div>
    </article>
  );
}
