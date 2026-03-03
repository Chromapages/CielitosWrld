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
    url: 'https://cielitosworld.com',
    logo: 'https://cielitosworld.com/logo.png',
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
    url: 'https://cielitosworld.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://cielitosworld.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return <JsonLd data={schema} />;
}

// Article schema for blog posts
export function ArticleSchema({ title, description, datePublished, image, url }: {
  title: string;
  description: string;
  datePublished: string;
  image?: string;
  url: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    datePublished: datePublished,
    image: image,
    url: url,
    author: {
      '@type': 'Person',
      name: 'Cielito',
    },
    publisher: {
      '@type': 'Organization',
      name: "Cielito's Wrld",
      logo: {
        '@type': 'ImageObject',
        url: 'https://cielitosworld.com/logo.png',
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
    url: 'https://cielitosworld.com',
    jobTitle: 'Photographer',
    image: 'https://cielitosworld.com/logo.png',
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
