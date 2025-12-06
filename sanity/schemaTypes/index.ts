import { type SchemaTypeDefinition } from 'sanity'
import aboutCarouselImage from './aboutCarouselImage'
import galleryAsset from './galleryAsset'
import siteSettings from './siteSettings'
import homeAbout from './homeAbout'
import homeTestimonials from './homeTestimonials'
import homeCollaborations from './homeCollaborations'
import post from './post'
import contactPage from './contactPage'

import comment from './comment'
import kindWords from './kindWords'
import page from './page'
import heroSection from './objects/heroSection'
import gallerySection from './objects/gallerySection'
import textSection from './objects/textSection'
import ctaSection from './objects/ctaSection'

import homePage from './homePage'
import blogPage from './blogPage'
import galleryPage from './galleryPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Content
    post,
    galleryAsset,
    siteSettings,
    homeAbout,
    homeTestimonials,
    homeCollaborations,
    contactPage,
    homePage,
    blogPage,
    galleryPage,
    aboutCarouselImage,
    comment,
    kindWords,
    page,
    heroSection,
    gallerySection,
    textSection,
    ctaSection,
  ],
}

