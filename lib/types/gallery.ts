export interface GalleryItem {
  id: string;
  type: 'photo' | 'video';
  src: string;
  alt: string;
  caption: string;
  aspectRatio: '1/1' | '2/3' | '3/2' | '4/5' | '5/4' | '16/9';
  category: string;
  collection: string;
  placeholder: string;
  title: string;
  // Optional calculated dimensions for image optimization
  calculatedWidth?: number;
  calculatedHeight?: number;
}

export interface GalleryCategory {
  name: string;
  collections: string[];
}
