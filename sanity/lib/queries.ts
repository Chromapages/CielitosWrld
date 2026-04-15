/**
 * Sanity GROQ Queries
 * Centralized queries for fetching content from Sanity CMS
 */

// Query for featured gallery assets
export const FEATURED_GALLERY_QUERY = `
  *[_type == "galleryAsset" && featured == true && archived != true] | order(_createdAt desc) [0...12] {
    _id,
    title,
    slug,
    category,
    mediaType,
    image {
      asset-> {
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      alt,
      caption
    },
    videoThumbnail {
      asset-> {
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      alt
    },
    _createdAt
  }
`

// Query for all gallery assets with optional filtering
export const GALLERY_QUERY = `
  *[_type == "galleryAsset" && archived != true] | order(_createdAt desc) {
    _id,
    title,
    slug,
    category,
    collection,
    medium,
    vibe,
    location,
    mediaType,
    videoEmbedUrl,
    "videoStats": videoStats {
      duration,
      views
    },
    "hoverVideo": hoverVideo.asset->url,
    isShort,
    featured,
    image {
      asset-> {
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      alt,
      caption
    },
    videoThumbnail {
      asset-> {
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      alt
    },
    _createdAt
  }
`

// Query for gallery assets by category
export const GALLERY_BY_CATEGORY_QUERY = `
  *[_type == "galleryAsset" && category == $category && archived != true] | order(_createdAt desc) {
    _id,
    title,
    slug,
    category,
    mediaType,
    image {
      asset-> {
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      alt,
      caption
    },
    _createdAt
  }
`

export const ABOUT_CAROUSEL_IMAGES_QUERY = `
  *[_type == "aboutCarouselImage"] | order(sortOrder asc, _createdAt asc) {
    _id,
    title,
    caption,
    image {
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      alt
    },
    linkedGalleryAsset->{
      "slug": slug.current
    }
  }
`

export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    title,
    description,
    globalBackgroundImage {
      asset->{
        _id,
        url,
        metadata { dimensions, lqip }
      }
    },
    // pageBackgrounds removed
    social,
    heroVideo {
      asset->{
        _id,
        url
      }
    },
    heroVideoAlt,
    aboutProfileImage {
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      alt
    },
    seo {
      metaTitle,
      metaDescription,
      ogImage {
        asset->{
          _id,
          url,
          metadata {
            dimensions,
            lqip
          }
        },
        alt
      }
    }
  }
`

export const PAGE_BUILDER_QUERY = `
  *[_type == "page" && slug.current == $slug][0] {
    title,
    layoutSettings {
      useSiteBackground,
      backgroundImage {
        asset->{
          _id,
          url,
          metadata { dimensions, lqip }
        }
      }
    },
    sections[] {
      ...,
      _type == "heroSection" => {
        backgroundImage {
          asset->{ _id, url, metadata { dimensions, lqip } }
        }
      },
      _type == "gallerySection" => {
        images[] {
          asset->{ _id, url, metadata { dimensions, lqip } }
        }
      },
      _type == "ctaSection" => {
        backgroundImage {
          asset->{ _id, url, metadata { dimensions, lqip } }
        }
      }
    }
  }
`

// --- Singleton Page Queries ---

export const HOME_PAGE_QUERY = `
  {
    "hero": *[_type == "homePage"][0].hero {
      title,
      subtitle,
      backgroundImage { asset->{ _id, url, metadata { dimensions, lqip } } },
      mobileBackgroundImage { asset->{ _id, url, metadata { dimensions, lqip } } },
      ctaText,
      ctaLink,
      secondaryCtaText,
      secondaryCtaText,
      secondaryCtaLink
    },
    "contact": *[_type == "homePage"][0].contact {
      email
    },
    "about": *[_type == "homeAbout"][0] {
      eyebrow,
      heading,
      bio,
      testimonial,
      "title": heading,
      "content": bio,
      "image": profileImage { asset->{ _id, url, metadata { dimensions, lqip } } },
      "backgroundImage": backgroundImage { asset->{ _id, url, metadata { dimensions, lqip } } },
      features[] {
        title,
        description,
        icon
      },
      quickFacts[] {
        label,
        icon
      },
      ctaPrimary,
      ctaSecondary,
      "carouselImages": *[_type == "aboutCarouselImage"] | order(sortOrder asc) {
        _id,
        title,
        image {
          asset->{
            _id,
            url,
            metadata { lqip }
          },
          alt
        }
      }
    },
    "featuredWork": {
      "title": coalesce(*[_type == "homePage"][0].featuredWork.title, "Featured Work"),
      "items": *[
        (_type == "work" || _type == "galleryAsset") && 
        featured == true && 
        archived != true
      ] | order(_createdAt desc) [0...5] {
        _id,
        _type,
        title,
        "slug": slug.current,
        "category": coalesce(client, category, "Portfolio"),
        excerpt,
        "coverImage": coalesce(coverImage, image, videoThumbnail) { 
          asset->{ 
            _id, 
            url, 
            metadata { dimensions, lqip } 
          } 
        },
        year,
        _createdAt
      }
    },
    "testimonials": *[_type == "homeTestimonials"][0] {
      "title": heading,
      "badge": badge,
      "description": description,
      "backgroundImage": backgroundImage { asset->{ _id, url, metadata { dimensions, lqip } } },
      "items": testimonials[] {
        name,
        role,
        company,
        "avatar": avatar.asset->{ _id, url, metadata { dimensions, lqip } },
        rating,
        highlight,
        "quote": content
      }
    },
    "socialProof": *[_type == "homeCollaborations"][0] {
      "title": heading,
      "backgroundImage": backgroundImage { asset->{ _id, url, metadata { dimensions, lqip } } },
      "logos": items[] {
        name,
        "asset": logo.asset->{ _id, url },
        "alt": logo.alt
      }
    }
  }
`

export const BLOG_PAGE_QUERY = `
  *[_type == "blogPage" && _id == "blogPage"][0] {
    title,
    subtitle,
    heroImage { asset->{ _id, url, metadata { dimensions, lqip } } },
    pageBackground { asset->{ _id, url, metadata { dimensions, lqip } } },
    postsPerPage,
    orderBy,
    noPostsMessage,
    pagination {
      newer,
      older
    },
    sidebarProfile {
      name,
      avatar { asset->{ _id, url } },
      bio
    },
    currently {
      listening,
      location
    },
    curatedTags,
    playlist[] {
      title,
      artist,
      mood,
      "url": audioFile.asset->url
    },
    newsletter {
      heading,
      description
    },
    "popularPosts": *[_type == "post" && featured == true && archived != true] | order(publishedAt desc) [0...3] {
      _id,
      title,
      slug,
      coverImage,
      "viewCount": 0 // Placeholder as we don't have real views yet
    }
  }
`

export const BLOG_POSTS_QUERY = `
  *[_type == "post"] | order(publishedAt desc) [0...$limit] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    coverImage { asset->{ _id, url, metadata { dimensions, lqip } } },
    "tags": tags,
    body,
    postType,
    photos,
    quoteText,
    quoteSource,
    linkUrl
  }
`

export const GALLERY_PAGE_QUERY = `
  *[_type == "galleryPage"][0] {
    title,
    subtitle,
    noImagesMessage,
    clearFiltersLabel,
    youtubeChannelUrl,
    pageBackground { asset->{ _id, url, metadata { dimensions, lqip } } }
  }
`

export const WORK_PAGE_QUERY = `
  *[_type == "workPage"][0] {
    title,
    introText
  }
`

export const CONTACT_PAGE_QUERY = `
  *[_type == "contactPage" && _id == "contactPage"][0] {
    title,
    introText,
    pageBackground { asset->{ _id, url, metadata { dimensions, lqip } } },
    email,
    location,
    socialLinks,
    faqs,
    studioLabel,
    emailLabel,
    followMeLabel
  }
`

// --- Work Queries ---

export const ALL_WORKS_QUERY = `
  *[_type == "work"] | order(year desc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    year,
    featured,
    excerpt,
    coverImage { asset->{ _id, url, metadata { dimensions, lqip } } },
    tags
  }
`

export const WORK_BY_SLUG_QUERY = `
  *[_type == "work" && slug.current == $slug][0] {
    _id,
    title,
    year,
    excerpt,
    body,
    coverImage { asset->{ _id, url, metadata { dimensions, lqip } } },
    gallery[] { asset->{ _id, url, metadata { dimensions, lqip } } },
    tags
  }
`

export const POST_BY_SLUG_QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    coverImage { asset->{ _id, url, metadata { dimensions, lqip } } },
    body,
    publishedAt,
    "tags": tags,
    postType,
    photos,
    quoteText,
    quoteSource,
    linkUrl
  }
`

export const ALL_POSTS_QUERY = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    coverImage,
    "tags": tags,
    body,
    postType,
    photos,
    quoteText,
    quoteSource,
    linkUrl
  }
`

export const SERVICES_PAGE_QUERY = `
  {
    "page": *[_type == "servicesPage"][0] {
      heroHeading,
      heroSubhead,
      heroTrustText,
      processSteps,
      processGallery,
      faqs,
      "seo": {
        "title": seoTitle,
        "description": seoDescription
      }
    },
    "packages": *[_type == "service"] | order(order asc, price asc) {
      _id,
      name,
      tagline,
      price,
      priceNote,
      features,
      popular,
      ctaText,
      ctaLink
    }
  }
`
