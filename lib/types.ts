import { PortableTextBlock } from 'sanity';

export interface GalleryItem {
  id: string;
  type: 'photo' | 'video';
  src: string;
  alt: string;
  caption?: string;
  aspectRatio: '2/3' | '3/2' | '16/9' | '1/1' | '4/5' | '5/4';
  category: string;
  collection: string;
  placeholder?: string;
  title: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  publishedAt: string;
  author: string;
}

export interface SanityImage {
  asset?: {
    _ref?: string;
    _type?: string;
  };
}

export interface SanityPost {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: SanityImage;
  publishedAt?: string;
  tags?: string[];
}

export interface SanityPostDetail extends SanityPost {
  body?: PortableTextBlock[];
}

export interface Comment {
  id: string;
  postId: string;
  parentId?: string;
  author: string;
  content: string;
  createdAt: string;
  replies?: Comment[];
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ReviewFormData {
  name: string;
  email: string;
  role?: string;
  content: string;
}

export interface TestimonialData {
  id: string;
  name: string;
  content: string;
  avatar?: string;
  role?: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}