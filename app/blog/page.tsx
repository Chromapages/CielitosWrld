import { client } from '@/sanity/lib/client';
import { SITE_SETTINGS_QUERY, BLOG_PAGE_QUERY, BLOG_POSTS_QUERY } from '@/sanity/lib/queries';
import BlogSidebar from '@/components/blog/BlogSidebar';
import BlogPost from '@/components/blog/BlogPost';
import PageBackground from '@/components/ui/PageBackground';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function BlogPage() {
  // 1. Fetch Blog Page Settings & Site Settings first
  const [blogPage, siteSettings, allBlogPages] = await Promise.all([
    client.fetch(BLOG_PAGE_QUERY, {}, { useCdn: false }),
    client.fetch(SITE_SETTINGS_QUERY, {}, { useCdn: false }),
    client.fetch(`*[_type == "blogPage"]{_id, title, _updatedAt}`, {}, { useCdn: false })
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
    curatedTags
  } = blogPage || {};

  // Debug logging
  console.log('=== BLOG PAGE DATA ===');
  console.log('All Blog Pages Found:', JSON.stringify(allBlogPages, null, 2));
  console.log('Fetched blogPage:', JSON.stringify(blogPage, null, 2));
  console.log('sidebarProfile:', sidebarProfile);
  console.log('currently:', currently);
  console.log('curatedTags:', curatedTags);
  console.log('=====================');

  // 2. Fetch Posts with dynamic settings
  // Construct the order clause dynamically based on the 'orderBy' field
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

  const posts = await client.fetch(query, { limit }, { useCdn: false });

  // Resolve Background
  // Priority: Blog Page Background > Blog Page Hero Image > Global Background
  // Note: We've deprecated 'pageBackgrounds' from siteSettings in favor of per-page configuration
  const backgroundImage = blogPage?.pageBackground || blogPage?.heroImage || siteSettings?.globalBackgroundImage;

  return (
    <div className="min-h-screen relative pt-24 pb-20 md:pt-32 -mt-16 md:-mt-24">

      {/* Background Image */}
      {/* Background Image */}
      {backgroundImage ? (
        <PageBackground
          image={backgroundImage}
          overlayClassName="bg-white/40 dark:bg-white/20 backdrop-blur-[4px]"
        />
      ) : (
        <div className="fixed inset-0 z-0 bg-sage-50 dark:bg-[#0a0a0a]" />
      )}

      <div className="relative z-10">
        {/* Mobile Header (Visible only on small screens) */}
        <div className="lg:hidden container mx-auto px-4 mb-8 text-center">
          <h1 className="font-fitzgerald text-3xl font-bold text-mud-900 dark:text-sage-100 mb-2 drop-shadow-md">
            {title || "Cielito's Wrld"}
          </h1>
          <p className="text-sm text-sage-600 dark:text-sage-400 font-inter drop-shadow-sm">
            {subtitle || "Visual stories & late night thoughts."}
          </p>
        </div>

        <div className="container mx-auto px-4 md:px-8 flex justify-center gap-16">

          {/* Main Feed */}
          <main className="w-full max-w-[640px]">
            {posts.length === 0 ? (
              <div className="bg-white dark:bg-sage-900 p-12 rounded-sm text-center border border-sage-100 dark:border-sage-800">
                <p className="text-sage-500 font-inter">{noPostsMessage || "No posts found."}</p>
              </div>
            ) : (
              <div className="space-y-12">
                {posts.map((post: any) => (
                  <BlogPost key={post._id} post={post} />
                ))}
              </div>
            )}

            {/* Pagination / Load More */}
            <div className="mt-16 flex justify-between items-center px-4">
              <button className="text-mud-600 dark:text-sage-400 font-fitzgerald text-lg hover:text-orange-600 transition-colors disabled:opacity-50" disabled>
                &larr; {pagination?.newer || "Newer"}
              </button>
              <span className="text-xs font-bold text-sage-300 uppercase tracking-widest">Page 1</span>
              <button className="text-mud-600 dark:text-sage-400 font-fitzgerald text-lg hover:text-orange-600 transition-colors">
                {pagination?.older || "Older"} &rarr;
              </button>
            </div>
          </main>

          {/* Sidebar (Desktop Sticky) */}
          <BlogSidebar
            title={title}
            subtitle={subtitle}
            sidebarProfile={sidebarProfile}
            currently={currently}
            curatedTags={curatedTags}
          />

        </div>
      </div>
    </div>
  );
}