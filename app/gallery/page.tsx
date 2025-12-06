import { client } from '@/sanity/lib/client';
import { GALLERY_QUERY, GALLERY_PAGE_QUERY } from '@/sanity/lib/queries';
import GalleryClient from '@/components/gallery/GalleryClient';

export const revalidate = 60;

export interface GalleryItem {
  _id: string;
  title: string;
  category: string;
  medium?: string;
  vibe?: string;
  location?: string;
  mediaType: 'photo' | 'video';
  videoEmbedUrl?: string;
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
    client.fetch(GALLERY_QUERY),
    client.fetch(GALLERY_PAGE_QUERY)
  ]);

  return (
    <GalleryClient initialItems={galleryItems} pageData={galleryPage} />
  );
}
