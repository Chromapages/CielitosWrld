import './globals.css';
import type { Metadata } from 'next';

import Navbar from '@/components/layout/Navbar';
import MobileNavbar from '@/components/layout/MobileNavbar';
import Footer from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import AnimationProvider from '@/components/providers/AnimationProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
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
    const settings = await client.fetch(SITE_SETTINGS_QUERY);
    return settings;
  } catch (error) {
    console.error('Failed to load site settings for metadata:', error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  const defaultTitle = "Cielito's Wrld - Photography & Visual Stories";
  const defaultDescription =
    'Capturing life through my lens, one moment at a time. Explore photography, stories, and visual art by Cielito.';

  const siteTitle = settings?.title || "Cielito's Wrld";
  const metaTitle = settings?.seo?.metaTitle || defaultTitle;
  const metaDescription = settings?.seo?.metaDescription || defaultDescription;
  const ogImageUrl = settings?.seo?.ogImage?.asset?.url || '/og-image.jpg';
  const ogImageAlt = settings?.seo?.ogImage?.alt || siteTitle;

  return {
    metadataBase: new URL('https://cielitosworld.com'),
    title: {
      default: metaTitle,
      template: `%s | ${siteTitle}`,
    },
    description: metaDescription,
    keywords: ['photography', 'visual stories', 'portraits', 'landscape', 'art', 'creative'],
    authors: [{ name: 'Cielito' }],
    creator: 'Cielito',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://cielitos-wrld.com',
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
  };
}

async function getContactInfo() {
  try {
    const contact = await client.fetch(`*[_type == "contactPage"][0]{
      email,
      phone,
      location,
      socialLinks
    }`);
    return contact;
  } catch (error) {
    console.error('Failed to load contact info:', error);
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
          <AnimationProvider>
            <div className="flex flex-col min-h-screen">
              <ScrollToTop />
              <Navbar />
              <MobileNavbar />
              <main className="flex-1 pt-16 md:pt-24 pb-0">
                {children}
              </main>
              <Footer contactInfo={contactInfo} />
            </div>
          </AnimationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}