import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { SITE_SETTINGS_QUERY, BLOG_PAGE_QUERY, BLOG_POSTS_QUERY } from '@/sanity/lib/queries';
import BlogSidebar from '@/components/blog/BlogSidebar';
import BlogPost from '@/components/blog/BlogPost';
import FeaturedPost from '@/components/blog/FeaturedPost';
import SonicAura from '@/components/blog/SonicAura';
import PageBackground from '@/components/ui/PageBackground';
import { MusicProvider } from '@/components/blog/MusicContext';


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
      {/* 1. Background (Fixed) */}
      {backgroundImage ? (
        <PageBackground
          image={backgroundImage}
          overlayClassName="bg-white/40 dark:bg-white/20 backdrop-blur-[4px]"
        />
      ) : (
        <div className="fixed inset-0 z-0 bg-brand-50 dark:bg-brand-950" />
      )}

      {/* 2. Sonic Aura (Fixed) */}
      <SonicAura tags={posts[0]?.tags || []} />

      {/* 3. Main Page Content (Normal Flow) */}
      <div className="relative z-10 flex flex-col pt-8 md:pt-16 bg-transparent">
        <div className="flex-1 flex flex-col">
          {/* Mobile Header (Visible only on small screens) */}
          <div className="lg:hidden container mx-auto px-4 mb-8 text-center flex-shrink-0">
            <h1 className="font-display text-3xl font-bold text-brand-900 dark:text-brand-100 mb-2 drop-shadow-md">
              {title || "Cielito's Wrld"}
            </h1>
            <p className="text-sm text-brand-600 dark:text-brand-400 font-inter drop-shadow-sm">
              {subtitle || "Visual stories & late night thoughts."}
            </p>
          </div>

          <div className="container mx-auto px-4 md:px-8 flex justify-center gap-16 flex-1">
            {/* Main Feed */}
            <main className="w-full max-w-[640px] pt-4">
              {posts.length === 0 ? (
                <div className="bg-white dark:bg-brand-900 p-12 rounded-sm text-center border border-brand-100 dark:border-brand-800">
                  <p className="text-brand-500 font-inter">{noPostsMessage || "No posts found."}</p>
                </div>
              ) : (
                <div className="space-y-16 pb-20">
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
                <button className="text-brand-600 dark:text-brand-400 font-display font-bold text-lg hover:text-orange-600 transition-colors disabled:opacity-50" disabled>
                  &larr; {pagination?.newer || "Newer"}
                </button>
                <span className="text-xs font-bold text-brand-300 uppercase tracking-widest">Page 1</span>
                <button className="text-brand-600 dark:text-brand-400 font-display font-bold text-lg hover:text-orange-600 transition-colors">
                  {pagination?.older || "Older"} &rarr;
                </button>
              </div>
            </main>

            {/* Sidebar - Sticky on desktop */}
            <aside className="hidden lg:block w-72 pt-4 sticky top-32 self-start mb-20">
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
        </div>
      </div>
    </MusicProvider>
  );
}
