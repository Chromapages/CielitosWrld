import { client } from '@/sanity/lib/client';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://cielitosworld.com';

    // Fetch dynamic routes from Sanity
    const [blogPosts, works, galleryItems] = await Promise.all([
        client.fetch(`*[_type == "post"]{ "slug": slug.current, _updatedAt }`),
        client.fetch(`*[_type == "work"]{ "slug": slug.current, _updatedAt }`),
        client.fetch(`*[_type == "galleryAsset"]{ _updatedAt }`),
    ]);

    const routes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/work`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/gallery`,
            lastModified: galleryItems[0]?._updatedAt || new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
    ];

    // Add Blog Posts
    blogPosts.forEach((post: any) => {
        routes.push({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: post._updatedAt,
            changeFrequency: 'monthly',
            priority: 0.8,
        });
    });

    // Add Work Items
    works.forEach((work: any) => {
        routes.push({
            url: `${baseUrl}/work/${work.slug}`,
            lastModified: work._updatedAt,
            changeFrequency: 'monthly',
            priority: 0.8,
        });
    });

    return routes;
}
