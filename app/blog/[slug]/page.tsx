import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { POST_BY_SLUG_QUERY } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import type { SanityPostDetail } from '@/lib/types';
import { EnhancedPortableText } from '@/components/blog/EnhancedPortableText';
import TableOfContents from '@/components/blog/TableOfContents';
import RelatedPosts from '@/components/blog/RelatedPosts';
import Comments from '@/components/blog/Comments';
import { ShareButtons } from '@/components/blog/ShareButtons';
import { HeroSection } from '@/components/blog/HeroSection';
import { ArticleSchema } from '@/components/seo/JsonLd';
import { ArrowLeft, Share2 } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 60;

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}


function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<SanityPostDetail | null>(POST_BY_SLUG_QUERY, { slug: slug }, { next: { revalidate: 60 } });

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const coverUrl = post.coverImage ? urlFor(post.coverImage).width(1200).height(630).fit('max').url() : undefined;

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      images: coverUrl
        ? [
          {
            url: coverUrl,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ]
        : undefined,
    },
  };
}

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(`*[_type=="post"]{ "slug": slug.current }`);
  return slugs.map((entry) => ({ slug: entry.slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await client.fetch<SanityPostDetail | null>(POST_BY_SLUG_QUERY, { slug: slug }, { next: { revalidate: 60 } });

  if (!post) {
    notFound();
  }

  const formattedDate = formatDate(post.publishedAt || new Date().toISOString());

  // Fetch related posts
  const relatedPosts = await client.fetch(
    `*[_type == "post" && category == $category && slug.current != $slug][0...4]{
      _id,
      title,
      slug,
      excerpt,
      coverImage,
      publishedAt,
      category,
      estimatedReadingTime
    }`,
    { category: (post as any).category || 'general', slug },
    { next: { revalidate: 60 } }
  );

  const coverUrl = post.coverImage ? urlFor(post.coverImage).width(1200).height(630).fit('max').url() : undefined;
  const canonicalUrl = `https://cielitosworld.com/blog/${slug}`;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-stone-950 pb-20">
      <ArticleSchema
        title={post.title}
        description={post.excerpt || `Read ${post.title} on Cielitos Wrld.`}
        datePublished={post.publishedAt || new Date().toISOString()}
        image={coverUrl}
        url={canonicalUrl}
      />

      {/* Hero Section - Pure Imagery focus */}
      <HeroSection
        title={post.title}
        coverImage={post.coverImage}
        category={(post as any).category}
        formattedDate={formattedDate}
        author={(post as any).author}
      />

      {/* Main Content Container with Overlap */}
      <div className="relative -mt-24 md:-mt-32 lg:-mt-48 z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Article Card */}
          <article className="bg-white dark:bg-stone-900 rounded-2xl md:rounded-3xl shadow-elevation-4 overflow-hidden">

            {/* Header / Meta Section inside the card */}
            <div className="px-6 py-10 md:p-16 lg:p-20 text-center border-b border-zinc-100 dark:border-zinc-800">
              {(post as any).category && (
                <Link
                  href={`/blog/category/${(post as any).category.toLowerCase()}`}
                  className="inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#EC4899] mb-8"
                >
                  {(post as any).category}
                </Link>
              )}

              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-zinc-900 dark:text-white leading-[1.1] mb-8 tracking-tight">
                {post.title}
              </h1>

              <div className="flex items-center justify-center gap-6 mt-8">
                <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  <span className="italic mr-1 text-zinc-400">Written by</span> {(post as any).author || "Cielito"}
                </div>
                <div className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                <time className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  {formattedDate}
                </time>
              </div>
            </div>

            {/* Read Content Area */}
            <div className="px-6 py-12 md:p-16 lg:px-20 lg:py-24">
              <div className="max-w-prose mx-auto">
                {/* Excerpt as a Lead paragraph */}
                {post.excerpt && (
                  <p className="font-heading text-xl md:text-2xl text-zinc-700 dark:text-zinc-300 leading-relaxed mb-12 italic border-l-4 border-[#EC4899] pl-6 py-2">
                    {post.excerpt}
                  </p>
                )}

                {/* Body Content */}
                {post.body && (
                  <div className="prose-reading">
                    <EnhancedPortableText value={post.body} />
                  </div>
                )}

                {/* Tags & Footer Section inside card */}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-20 pt-10 border-t border-zinc-100 dark:border-zinc-800">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mr-2">Tags</span>
                      {post.tags.map((tag: string) => (
                        <Link
                          key={tag}
                          href={`/blog/tags/${tag}`}
                          className="text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-[#EC4899] transition-colors"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Share Section in card footer */}
            <div className="px-6 py-8 md:px-16 lg:px-20 bg-zinc-50/50 dark:bg-zinc-800/10 border-t border-zinc-100 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6">
              <h3 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em]">
                Share this story
              </h3>
              <ShareButtons title={post.title} slug={slug} />
            </div>
          </article>

          {/* Table of Contents - Now floating or repositioned */}
          <div className="mt-12 mb-12 max-w-3xl mx-auto hidden lg:block">
            <TableOfContents content={post.body} />
          </div>
        </div>
      </div>

      {/* Post-Card Visual Sections (Full width restricted) */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        {/* Related Posts */}
        {relatedPosts && relatedPosts.length > 0 && (
          <RelatedPosts posts={relatedPosts} />
        )}

        {/* Comments Section */}
        <div className="mt-24 max-w-4xl mx-auto">
          <Comments postId={post._id} />
        </div>
      </div>
    </div>
  );
}
