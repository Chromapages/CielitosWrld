import { GalleryItem, BlogPost, TestimonialData, NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/', icon: 'Home' },
  { label: 'Gallery', href: '/gallery', icon: 'Camera' },
  { label: 'Blog', href: '/blog', icon: 'FileText' },
  { label: 'Contact', href: '/contact', icon: 'Mail' },
];

export const SAMPLE_VIDEO_ITEMS: GalleryItem[] = [
  {
    id: 'v1',
    type: 'video',
    src: 'https://player.vimeo.com/video/76979871',
    alt: 'Cinematic Nature Shots',
    caption: 'Visual exploration of natural landscapes',
    aspectRatio: '16/9',
    category: 'Nature',
    collection: 'Documentary',
    placeholder: 'https://placehold.co/800x450?text=Nature+Documentary',
    title: 'Cinematic Nature'
  },
  {
    id: 'v2',
    type: 'video',
    src: 'https://player.vimeo.com/video/173541384',
    alt: 'Urban Street Photography',
    caption: 'City life through the lens',
    aspectRatio: '16/9',
    category: 'Urban',
    collection: 'Street Photography',
    placeholder: 'https://placehold.co/800x450?text=Urban+Life',
    title: 'City Streets'
  },
  {
    id: 'v3',
    type: 'video',
    src: 'https://player.vimeo.com/video/225899315',
    alt: 'Portrait Session BTS',
    caption: 'Behind the scenes of a portrait photoshoot',
    aspectRatio: '16/9',
    category: 'Portrait',
    collection: 'Behind The Scenes',
    placeholder: 'https://placehold.co/800x450?text=Portrait+Session',
    title: 'Portrait BTS'
  },
  {
    id: 'v4',
    type: 'video',
    src: 'https://player.vimeo.com/video/189919038',
    alt: 'Landscape Time-lapse',
    caption: 'Capturing the changing light of day',
    aspectRatio: '16/9',
    category: 'Landscape',
    collection: 'Time-lapse',
    placeholder: 'https://placehold.co/800x450?text=Time-lapse',
    title: 'Day to Night'
  },
  {
    id: 'v5',
    type: 'video',
    src: 'https://player.vimeo.com/video/370467553',
    alt: 'Creative Visual Storytelling',
    caption: 'Experimental photography techniques',
    aspectRatio: '16/9',
    category: 'Experimental',
    collection: 'Creative',
    placeholder: 'https://placehold.co/800x450?text=Experimental',
    title: 'Visual Experiments'
  },
];

export const SAMPLE_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: '1',
    type: 'photo',
    src: 'https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg',
    alt: 'Mountain landscape at sunset',
    caption: 'Golden hour in the mountains',
    aspectRatio: '3/2',
    category: 'Landscape',
    collection: 'Nature',
    placeholder: 'https://placehold.co/600x400?text=Mountain+Landscape',
    title: 'Mountain Sunset'
  },
  {
    id: '2',
    type: 'photo',
    src: 'https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg',
    alt: 'Portrait photography',
    caption: 'Natural light portrait',
    aspectRatio: '2/3',
    category: 'Portrait',
    collection: 'People',
    placeholder: 'https://placehold.co/400x600?text=Portrait',
    title: 'Natural Light Portrait'
  },
  {
    id: '3',
    type: 'photo',
    src: 'https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg',
    alt: 'City architecture',
    caption: 'Urban geometry',
    aspectRatio: '16/9',
    category: 'Urban',
    collection: 'Architecture',
    placeholder: 'https://placehold.co/800x450?text=City+Architecture',
    title: 'Urban Geometry'
  },
  {
    id: '4',
    type: 'photo',
    src: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg',
    alt: 'Nature details',
    caption: 'Macro photography',
    aspectRatio: '1/1',
    category: 'Nature',
    collection: 'Macro',
    placeholder: 'https://placehold.co/600x600?text=Nature+Details',
    title: 'Macro Details'
  },
  {
    id: '5',
    type: 'photo',
    src: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg',
    alt: 'Street photography',
    caption: 'Life in motion',
    aspectRatio: '4/5',
    category: 'Street',
    collection: 'Documentary',
    placeholder: 'https://placehold.co/480x600?text=Street+Photography',
    title: 'Urban Life'
  },
  {
    id: '6',
    type: 'photo',
    src: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg',
    alt: 'Landscape vista',
    caption: 'Wide open spaces',
    aspectRatio: '5/4',
    category: 'Landscape',
    collection: 'Nature',
    placeholder: 'https://placehold.co/600x480?text=Landscape',
    title: 'Open Spaces'
  },
];

export const SAMPLE_BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Finding Beauty in Everyday Moments',
    slug: 'finding-beauty-everyday-moments',
    excerpt: 'Photography has taught me to see the extraordinary in the ordinary. Every corner, every light, every shadow tells a story...',
    content: 'Full blog post content would go here...',
    featuredImage: 'https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg',
    publishedAt: '2024-01-15',
    author: 'Cielito',
  },
  {
    id: '2',
    title: 'The Art of Natural Light',
    slug: 'art-of-natural-light',
    excerpt: 'Working with natural light is both challenging and rewarding. Here are some techniques I\'ve learned over the years...',
    content: 'Full blog post content would go here...',
    featuredImage: 'https://images.pexels.com/photos/1212487/pexels-photo-1212487.jpeg',
    publishedAt: '2024-01-10',
    author: 'Cielito',
  },
];

export const SAMPLE_TESTIMONIALS: TestimonialData[] = [
  {
    id: '1',
    name: 'Sockjus',
    content: 'Working with Cielo is very stimulating, because he\'s always bouncing ideas back and forth. He loves creating; he really does it with his heart. He makes creating easy, whenever you create with him. So, shout out to him.',
    role: 'Musical Artist',
  },
  {
    id: '2',
    name: 'Monique',
    content: 'Cielo beautifully captured my graduation photos at Citrus State Park. He made me feel comfortable and confident, and his kind, patient, and professional approach truly showed he cared about documenting this meaningful milestone.',
    role: 'Graduation Client',
  },
  {
    id: '3',
    name: 'Emily',
    content: 'Cielo made the entire photography experience fun and effortless with his calm, easygoing presence. He has a great eye and knows exactly how to make you feel comfortable in front of the camera.',
    role: 'Photography Client',
  },
  {
    id: '4',
    name: 'Sockjus',
    content: 'My experience with Cielo has been wonderful. He\'s vibrant, easy to work with, punctual, and respectful, always getting the job done. If you\'re looking for someone open to new ideas and creations, he\'s your guy.',
    role: 'Musical Artist',
  },
  {
    id: '5',
    name: 'Kaiya',
    content: 'He\'s consistently eager to expand his videography expertise, readily adapting to a diverse range of styles. This includes mastering fundamental techniques as well as specializing in more unique areas like equine shoots.',
    role: 'Photography Client',
  },
];