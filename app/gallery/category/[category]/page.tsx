import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { GALLERY_BY_CATEGORY_QUERY, GALLERY_PAGE_QUERY } from '@/sanity/lib/queries';
import GalleryClient from '@/components/gallery/GalleryClient';
import { ImageGallerySchema } from '@/components/seo/JsonLd';
import { urlFor } from '@/sanity/lib/image';
import { VALID_CATEGORY_SLUGS, CATEGORY_SLUG_TO_VALUE, validateCategorySlug, CategorySlug } from '@/lib/validations/gallery';
import { MobilePageShell } from '@/components/layout/MobilePageShell';

export const revalidate = 60;

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return VALID_CATEGORY_SLUGS.map((slug) => ({ category: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const validSlug = validateCategorySlug(category);

  if (!validSlug) {
    return { title: 'Category Not Found' };
  }

  const displayName = CATEGORY_SLUG_TO_VALUE[validSlug];
  const title = `${displayName} Photography | Cielito's Wrld`;
  const description = `Browse ${displayName.toLowerCase()} photography by Cielito. Editorial and commercial ${displayName.toLowerCase()} photography across Los Angeles, Inland Empire, and San Diego.`;

  return {
    title,
    description,
    alternates: { canonical: `https://cielitoswrld.com/gallery/category/${category}` },
    openGraph: {
      title,
      description,
      url: `https://cielitoswrld.com/gallery/category/${category}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const validSlug = validateCategorySlug(category);

  if (!validSlug) {
    notFound();
  }

  const [galleryItems, galleryPage] = await Promise.all([
    client.fetch(GALLERY_BY_CATEGORY_QUERY, { category: CATEGORY_SLUG_TO_VALUE[validSlug] }, { next: { revalidate: 60 } }),
    client.fetch(GALLERY_PAGE_QUERY, {}, { next: { revalidate: 60 } }),
  ]);

  const displayName = CATEGORY_SLUG_TO_VALUE[validSlug];

  const schemaImages = galleryItems
    .slice(0, 20)
    .map((item: any) => (item.mediaType === 'video' ? item.videoThumbnail : item.image))
    .filter(Boolean)
    .map((image: any) => urlFor(image).width(1200).url());

  return (
    <MobilePageShell immersive={true}>
      <ImageGallerySchema
        name={`${displayName} Gallery`}
        description={galleryPage?.subtitle || `A curated collection of ${displayName.toLowerCase()} photography from Cielitos Wrld.`}
        url={`https://cielitoswrld.com/gallery/category/${category}`}
        images={schemaImages}
      />
      <GalleryClient
        initialItems={galleryItems}
        pageData={{ ...galleryPage, title: displayName }}
        initialCategory={displayName}
      />
    </MobilePageShell>
  );
}