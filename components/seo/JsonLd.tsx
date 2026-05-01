'use client';

interface JsonLdProps {
  data: Record<string, any>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Organization schema
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: "Cielito's Wrld",
    url: 'https://cielitoswrld.com',
    logo: 'https://cielitoswrld.com/logo.png',
    description: "Photography and visual storytelling by Cielito. Portraits, events, and commercial sessions in Los Angeles, Inland Empire, and San Diego.",
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      url: 'https://cielitoswrld.com/contact',
    },
    sameAs: [
      'https://instagram.com/cielitoswrld',
      'https://twitter.com/cielitoswrld',
    ],
  };

  return <JsonLd data={schema} />;
}

// Website schema
export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: "Cielito's Wrld",
    url: 'https://cielitoswrld.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://cielitoswrld.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return <JsonLd data={schema} />;
}

// Article schema for blog posts
export function ArticleSchema({ title, description, datePublished, dateModified, image, url }: {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    image: image,
    url: url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: {
      '@type': 'Person',
      name: 'Cielito',
      url: 'https://cielitoswrld.com',
    },
    publisher: {
      '@type': 'Organization',
      name: "Cielito's Wrld",
      logo: {
        '@type': 'ImageObject',
        url: 'https://cielitoswrld.com/logo.png',
      },
    },
  };

  return <JsonLd data={schema} />;
}

export function PersonSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Cielito',
    url: 'https://cielitoswrld.com',
    jobTitle: 'Photographer',
    description: 'Visual storyteller and photographer based in Southern California. Specializing in editorial portraits, events, and commercial photography.',
    image: 'https://cielitoswrld.com/logo.png',
    knowsAbout: ['Photography', 'Editorial Portraits', 'Event Photography', 'Commercial Photography', 'Film Photography'],
    areaServed: [
      { '@type': 'City', name: 'Los Angeles' },
      { '@type': 'City', name: 'Inland Empire' },
      { '@type': 'City', name: 'San Diego' },
    ],
    sameAs: [
      'https://instagram.com/cielitoswrld',
      'https://twitter.com/cielitoswrld',
    ],
  };

  return <JsonLd data={schema} />;
}

export function ImageGallerySchema({
  name,
  description,
  url,
  images,
}: {
  name: string;
  description: string;
  url: string;
  images: string[];
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name,
    description,
    url,
    image: images,
  };

  return <JsonLd data={schema} />;
}

// Breadcrumb navigation schema
export function BreadcrumbListSchema({ items }: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <JsonLd data={schema} />;
}

// FAQ schema — maps directly to FAQAccordion data from Sanity
export function FAQPageSchema({ faqs }: {
  faqs: { question: string; answer: string }[];
}) {
  if (!faqs?.length) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return <JsonLd data={schema} />;
}

// Professional service + pricing schema for the services page
export function ProfessionalServiceSchema({ packages }: {
  packages: { name: string; price: string }[];
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: "Cielito's Wrld Photography",
    url: 'https://cielitoswrld.com',
    image: 'https://cielitoswrld.com/logo.png',
    priceRange: '$350 - $3000+',
    areaServed: [
      { '@type': 'City', name: 'Los Angeles' },
      { '@type': 'City', name: 'Inland Empire' },
      { '@type': 'City', name: 'San Diego' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Photography Packages',
      itemListElement: packages.map(pkg => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: pkg.name },
        price: pkg.price.replace(/[^0-9]/g, ''),
        priceCurrency: 'USD',
      })),
    },
    sameAs: [
      'https://instagram.com/cielitoswrld',
      'https://twitter.com/cielitoswrld',
    ],
  };

  return <JsonLd data={schema} />;
}

// Creative work schema for portfolio/work detail pages
export function CreativeWorkSchema({ title, description, image, url, dateCreated }: {
  title: string;
  description?: string;
  image?: string;
  url: string;
  dateCreated?: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'VisualArtwork',
    name: title,
    description: description,
    image: image,
    url: url,
    dateCreated: dateCreated,
    artMedium: 'Photography',
    artworkSurface: 'Digital',
    creator: {
      '@type': 'Person',
      name: 'Cielito',
      url: 'https://cielitoswrld.com',
    },
  };

  return <JsonLd data={schema} />;
}
