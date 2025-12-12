import { type SchemaTypeDefinition } from 'sanity'

// ─────────────────────────────────────────────────────────────────────────────
// Documents (repeatable content)
// ─────────────────────────────────────────────────────────────────────────────
import post from './documents/post'
import galleryAsset from './documents/galleryAsset'
import comment from './documents/comment'
import kindWords from './documents/kindWords'
import aboutCarouselImage from './documents/aboutCarouselImage'
import page from './documents/page'
import siteSettings from './documents/siteSettings'
import navigation from './documents/navigation'

// ─────────────────────────────────────────────────────────────────────────────
// Singletons (one-of-a-kind page configurations)
// ─────────────────────────────────────────────────────────────────────────────
import homePage from './singletons/homePage'
import homeAbout from './singletons/homeAbout'
import homeTestimonials from './singletons/homeTestimonials'
import homeCollaborations from './singletons/homeCollaborations'
import blogPage from './singletons/blogPage'
import galleryPage from './singletons/galleryPage'
import contactPage from './singletons/contactPage'

// ─────────────────────────────────────────────────────────────────────────────
// Objects (reusable components and page builder blocks)
// ─────────────────────────────────────────────────────────────────────────────
import heroSection from './objects/heroSection'
import gallerySection from './objects/gallerySection'
import textSection from './objects/textSection'
import ctaSection from './objects/ctaSection'
import seo from './objects/seo'
import imageWithAlt from './objects/imageWithAlt'

// ─────────────────────────────────────────────────────────────────────────────
// Schema Export
// ─────────────────────────────────────────────────────────────────────────────
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    post,
    galleryAsset,
    comment,
    kindWords,
    aboutCarouselImage,
    page,
    siteSettings,
    navigation,

    // Singletons
    homePage,
    homeAbout,
    homeTestimonials,
    homeCollaborations,
    blogPage,
    galleryPage,
    contactPage,

    // Objects
    heroSection,
    gallerySection,
    textSection,
    ctaSection,
    seo,
    imageWithAlt,
  ],
}
