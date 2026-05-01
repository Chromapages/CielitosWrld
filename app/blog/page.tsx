import type { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { SITE_SETTINGS_QUERY, BLOG_PAGE_QUERY, BLOG_POSTS_QUERY } from '@/sanity/lib/queries';
import BlogSidebar from '@/components/blog/BlogSidebar';
import BlogPost from '@/components/blog/BlogPost';
import FeaturedPost from '@/components/blog/FeaturedPost';
import SonicAura from '@/components/blog/SonicAura';
import PageBackground from '@/components/ui/PageBackground';
import { MusicProvider } from '@/components/blog/MusicContext';
import { MobilePageShell } from '@/components/layout/MobilePageShell';
import { MobileSection } from '@/components/layout/MobileSection';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const blogPage = await client.fetch(BLOG_PAGE_QUERY, {}, { next: { revalidate: 60 } });
  const title = blogPage?.title || 'Blog — Photography Stories';
  const description = blogPage?.subtitle || 'Visual stories, behind-the-scenes, and creative process from Cielito.';
  return {
    title,
    description,
    alternates: { canonical: 'https://cielitoswrld.com/blog' },
    openGraph: {
      title,
      description,
      url: 'https://cielitoswrld.com/blog',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function BlogPage() {
  // 1. Fetch Blog Page Settings & Site Settings first
  const [blogPage, siteSettings] = await Promise.all([
    client.fetch(BLOG_PAGE_QUERY, {}, { useCdn: false, next: { revalidate: 60 } }),
    client.fetch(SITE_SETTINGS_QUERY, {}, { useCdn: false, next: { revalidate: 60 } })
  ]);

  const {
    title,
    subtitle,
    heroImage,
    pageBackground,
    postsPerPage,
    orderBy,
    noPostsMessage,
    pagination,
    sidebarProfile,
    currently,
    curatedTags,
    playlist, // Extract playlist
    newsletter,      // Extract newsletter settings
    popularPosts     // Extract popular posts
  } = blogPage || {};

  // 2. Fetch Posts with dynamic settings
  const orderClause = orderBy || 'publishedAt desc';
  const limit = postsPerPage ?? 10;

  const query = `*[_type == "post"] | order(${orderClause}) [0...$limit] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    coverImage { asset->{ _id, url, metadata { dimensions, lqip } } },
    "tags": tags,
    body,
    postType,
    photos,
    quoteText,
    quoteSource,
    linkUrl
  }`;

  const posts = await client.fetch(query, { limit }, { useCdn: false, next: { revalidate: 60 } });

  // Resolve Background
  const backgroundImage = blogPage?.pageBackground || blogPage?.heroImage || siteSettings?.globalBackgroundImage;

  return (
    <MusicProvider initialPlaylist={playlist || []}>
      <MobilePageShell immersive={true}>
        {/* Background */}
        {backgroundImage ? (
          <PageBackground
            image={backgroundImage}
            overlayClassName="bg-white/70 dark:bg-black/80 backdrop-blur-md"
          />
        ) : (
          <div className="fixed inset-0 z-0 bg-stone-50 dark:bg-stone-950" />
        )}

        {/* Sonic Aura */}
        <SonicAura tags={posts[0]?.tags || []} />

        {/* Main Feed Section */}
        <MobileSection className="relative z-10 pt-32 md:pt-48 min-h-[50vh]" hasGutter={true}>
          <div className="flex flex-col lg:flex-row justify-center gap-16 lg:gap-24 w-full">
            {/* Main Feed */}
            <main className="w-full max-w-[768px]">
              {/* Header */}
              <header className="mb-8 text-left">
                <h1 className="hidden md:block font-pattaya text-4xl md:text-7xl font-bold text-stone-900 dark:text-stone-50 mb-3 tracking-tight">
                  {title || "Late Night Thoughts"}
                </h1>
                <p className="hidden md:block text-lg md:text-xl text-stone-600 dark:text-stone-400 font-light max-w-2xl">
                  {subtitle || "Visual stories & editorial fragments."}
                </p>
              </header>

              {posts.length === 0 ? (
                <div className="bg-white dark:bg-stone-900 p-12 rounded-[2rem] text-center border border-stone-100 dark:border-stone-800 shadow-sm">
                  <p className="text-stone-500 font-medium">{noPostsMessage || "No stories found yet."}</p>
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

              {/* Pagination */}
              <div className="mt-8 mb-20 flex justify-between items-center px-4">
                <button className="btn-press font-bold text-lg text-stone-900 dark:text-stone-100 disabled:opacity-30" disabled>
                  &larr; {pagination?.newer || "Newer"}
                </button>
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Page 1</span>
                <button className="btn-press font-bold text-lg text-stone-900 dark:text-stone-100">
                  {pagination?.older || "Older"} &rarr;
                </button>
              </div>
            </main>

            {/* Desktop Sidebar - Sticky */}
            <aside className="hidden lg:block w-72 sticky top-32 self-start mb-20">
              <BlogSidebar
                title={title}
                subtitle={subtitle}
                sidebarProfile={sidebarProfile}
                currently={currently}
                curatedTags={curatedTags}
                popularPosts={popularPosts}
                newsletter={newsletter}
              />
            </aside>
          </div>
        </MobileSection>
      </MobilePageShell>
    </MusicProvider>
  );
}
