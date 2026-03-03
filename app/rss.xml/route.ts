import { client } from '@/sanity/lib/client';

export const revalidate = 3600; // Revalidate every hour

async function getPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) [0...20] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    coverImage { asset->{ url } }
  }`;
  return client.fetch(query);
}

export async function GET() {
  const posts = await getPosts();
  
  const siteUrl = 'https://cielitosworld.com';
  
  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Cielito's Wrld Blog</title>
    <description>Visual stories and late night thoughts</description>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${posts.map((post: any) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt || ''}]]></description>
      <link>${siteUrl}/blog/${post.slug.current}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug.current}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
    </item>
    `).join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
