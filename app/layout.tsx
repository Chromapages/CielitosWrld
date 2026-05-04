import './globals.css';
import type { Metadata, Viewport } from 'next';

import { Analytics } from '@vercel/analytics/react';
import { OrganizationSchema, WebsiteSchema } from '@/components/seo/JsonLd';
import Navbar from '@/components/layout/Navbar';
import MobileNavbar from '@/components/layout/MobileNavbar';
import MobileHeader from '@/components/layout/MobileHeader';
import Footer from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import AnimationProvider from '@/components/providers/AnimationProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import ImageProtection from '@/components/providers/ImageProtection';
import LoadingScreen from '@/components/LoadingScreen';
import PageTransition from '@/components/PageTransition';
import { getErrorMetadata, logger } from '@/lib/logger';
import { client } from '@/sanity/lib/client';
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries';

// Import Google Fonts
import { Inter, Pattaya, Archivo } from 'next/font/google';

// Configure Inter font
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

// Configure Pattaya font
const pattaya = Pattaya({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-pattaya',
  display: 'swap',
});

// Configure Archivo font (headings and UI)
const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-archivo',
  display: 'swap',
});

// Font variables for CSS-in-JS
const fontVariables = {
  '--font-sans': inter.style.fontFamily,
  '--font-inter': inter.style.fontFamily,
  '--font-display': pattaya.style.fontFamily,
  '--font-pattaya': pattaya.style.fontFamily,
  '--font-heading': archivo.style.fontFamily,
  '--font-archivo': archivo.style.fontFamily,
  '--font-body': inter.style.fontFamily, // Space Grotesk -> Inter
} as const;

async function getSiteSettings() {
  try {
    const settings = await client.fetch(SITE_SETTINGS_QUERY, {}, { next: { revalidate: 60 } });
    return settings;
  } catch (error) {
    logger.error('Failed to load site settings for metadata', {
      route: 'generateMetadata',
      metadata: getErrorMetadata(error),
    });
    return null;
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  interactiveWidget: 'resizes-content',
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  const defaultTitle = "Cielito's Wrld - Photography & Visual Stories";
  const defaultDescription =
    'Capturing life through my lens, one moment at a time. Explore photography, stories, and visual art by Cielito.';

  const siteTitle = settings?.title || "Cielito's Wrld";
  const metaTitle = settings?.seo?.metaTitle || defaultTitle;
  const metaDescription = settings?.seo?.metaDescription || defaultDescription;
  const ogImageUrl = settings?.seo?.ogImage?.asset?.url || '/ogimage.jpeg';
  const ogImageAlt = settings?.seo?.ogImage?.alt || siteTitle;

  return {
    metadataBase: new URL('https://cielitoswrld.com'),
    title: {
      default: metaTitle,
      template: `%s | ${siteTitle}`,
    },
    description: metaDescription,
    alternates: { canonical: 'https://cielitoswrld.com' },
    keywords: ['photography', 'visual stories', 'portraits', 'landscape', 'art', 'creative'],
    authors: [{ name: 'Cielito' }],
    creator: 'Cielito',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://cielitoswrld.com',
      siteName: siteTitle,
      title: metaTitle,
      description: metaDescription,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteTitle,
      description: metaDescription,
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'darkreader-lock': 'true',
    },
  };
}

async function getContactInfo() {
  try {
    const contact = await client.fetch(`*[_type == "contactPage"][0]{
      email,
      phone,
      location,
      socialLinks
  }`, {}, { next: { revalidate: 60 } });
    return contact;
  } catch (error) {
    logger.error('Failed to load contact info', {
      route: 'RootLayout',
      metadata: getErrorMetadata(error),
    });
    return null;
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const contactInfo = await getContactInfo();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${pattaya.variable} ${archivo.variable} font-sans`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen flex flex-col bg-brand-50 dark:bg-brand-950 dark:text-brand-50"
        style={fontVariables as React.CSSProperties}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <OrganizationSchema />
          <WebsiteSchema />
          <Analytics />
          <ImageProtection />
          <AnimationProvider>
            <LoadingScreen />
            <div className="flex flex-col min-h-screen" suppressHydrationWarning>
              <ScrollToTop />
              <Navbar />
              <MobileHeader />
              <MobileNavbar />
              <main 
                className="flex-1 md:pt-16 pb-0"
              >
                <PageTransition>
                  {children}
                </PageTransition>
              </main>
              <Footer contactInfo={contactInfo} />
            </div>
          </AnimationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
