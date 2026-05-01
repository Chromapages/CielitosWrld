import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { BLOG_PAGE_QUERY, POSTS_BY_TAG_QUERY } from '@/sanity/lib/queries';
import BlogPost from '@/components/blog/BlogPost';
import PageBackground from '@/components/ui/PageBackground';
import { MusicProvider } from '@/components/blog/MusicContext';
import { MobilePageShell } from '@/components/layout/MobilePageShell';
import { MobileSection } from '@/components/layout/MobileSection';

export const revalidate = 60;

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const title = `#${decoded} — Blog`;
  const description = `Browse all posts tagged "${decoded}" on Cielito's Wrld.`;
  const canonical = `https://cielitoswrld.com/blog/tags/${tag}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);

  const [posts, blogPage] = await Promise.all([
    client.fetch(POSTS_BY_TAG_QUERY, { tag: decoded } as Record<string, unknown>, { next: { revalidate: 60 } }),
    client.fetch(BLOG_PAGE_QUERY, {}, { next: { revalidate: 60 } }),
  ]);

  const backgroundImage = blogPage?.pageBackground || blogPage?.heroImage;
  const sidebarProfile = blogPage?.sidebarProfile;

  return (
    <MusicProvider initialPlaylist={[]}>
      <MobilePageShell immersive={true}>
        {backgroundImage ? (
          <PageBackground
            image={backgroundImage}
            overlayClassName="bg-white/70 dark:bg-black/80 backdrop-blur-md"
          />
        ) : (
          <div className="fixed inset-0 z-0 bg-stone-50 dark:bg-stone-950" />
        )}

        <MobileSection className="relative z-10 pt-32 md:pt-48 min-h-[50vh]" hasGutter={false}>
          <div className="container mx-auto max-w-[768px] px-6">
            <header className="mb-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400 hover:text-orange-500 transition-colors mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                All Posts
              </Link>
              <h1 className="font-pattaya text-4xl md:text-6xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
                #{decoded}
              </h1>
              <p className="text-stone-500 dark:text-stone-400 mt-2">
                {posts.length} {posts.length === 1 ? 'post' : 'posts'}
              </p>
            </header>

            {posts.length === 0 ? (
              <div className="bg-white dark:bg-stone-900 p-12 rounded-[2rem] text-center border border-stone-100 dark:border-stone-800 shadow-sm">
                <p className="text-stone-500 font-medium">No posts tagged &ldquo;{decoded}&rdquo; yet.</p>
                <Link href="/blog" className="mt-4 inline-block text-orange-500 hover:underline font-medium">
                  Browse all posts →
                </Link>
              </div>
            ) : (
              <div className="space-y-12 md:space-y-20 pb-20">
                {posts.map((post: any, index: number) => (
                  <div
                    key={post._id}
                    className="opacity-0 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-forwards"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <BlogPost
                      post={post}
                      avatar={sidebarProfile?.avatar ? urlFor(sidebarProfile.avatar).width(80).height(80).url() : undefined}
                      username={sidebarProfile?.name}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </MobileSection>
      </MobilePageShell>
    </MusicProvider>
  );
}
