import { client } from '@/sanity/lib/client';
import { GALLERY_QUERY, GALLERY_PAGE_QUERY } from '@/sanity/lib/queries';
import GalleryClient from '@/components/gallery/GalleryClient';
import { ImageGallerySchema } from '@/components/seo/JsonLd';
import { urlFor } from '@/sanity/lib/image';

export const revalidate = 60;

export interface GalleryItem {
  _id: string;
  title: string;
  category: string;
  medium?: string;
  vibe?: string;
  location?: string;
  description?: string;
  client?: string;
  mediaType: 'photo' | 'video';
  videoEmbedUrl?: string;
  videoStats?: {
    duration?: string;
    views?: string;
  };
  hoverVideo?: string;
  isShort?: boolean;
  videoThumbnail?: {
    asset: {
      _id: string;
      url: string;
      metadata?: {
        lqip: string;
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
    alt: string;
  };
  image: {
    asset: {
      _id: string;
      url: string;
      metadata?: {
        lqip: string;
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
    alt: string;
  };
}

export default async function GalleryPage() {
  const [galleryItems, galleryPage] = await Promise.all([
    client.fetch(GALLERY_QUERY, {}, { next: { revalidate: 60 } }),
    client.fetch(GALLERY_PAGE_QUERY, {}, { next: { revalidate: 60 } })
  ]);

  const schemaImages = galleryItems
    .slice(0, 20)
    .map((item: GalleryItem) => (item.mediaType === 'video' ? item.videoThumbnail : item.image))
    .filter(Boolean)
    .map((image: any) => urlFor(image).width(1200).url());

  return (
    <>
      <ImageGallerySchema
        name={galleryPage?.title || 'Cielitos Wrld Gallery'}
        description={galleryPage?.subtitle || 'A curated image and video gallery from Cielitos Wrld.'}
        url="https://cielitosworld.com/gallery"
        images={schemaImages}
      />
      <GalleryClient initialItems={galleryItems} pageData={galleryPage} />
    </>
  );
}
