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

export const revalidate = 60; // Revalidate every 60 seconds

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
            overlayClassName="bg-white/40 dark:bg-black/40 backdrop-blur-[2px]"
          />
        ) : (
          <div className="fixed inset-0 z-0 bg-stone-50 dark:bg-stone-950" />
        )}

        {/* Sonic Aura */}
        <SonicAura tags={posts[0]?.tags || []} />

        {/* Main Feed Section */}
        <MobileSection className="relative z-10 pt-12 md:pt-24 min-h-[50vh]" hasGutter={false}>
          <div className="container mx-auto max-w-[1600px] flex justify-center gap-16 px-0 sm:px-8">
            {/* Main Feed */}
            <main className="w-full max-w-[640px] px-[var(--mobile-gutter)] sm:px-0">
              {/* Header */}
              <header className="mb-12 text-center sm:text-left">
                <h1 className="font-pattaya text-4xl md:text-7xl font-bold text-stone-900 dark:text-stone-50 mb-3 tracking-tight">
                  {title || "Late Night Thoughts"}
                </h1>
                <p className="text-lg md:text-xl text-stone-600 dark:text-stone-400 font-light max-w-lg mx-auto sm:mx-0">
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
