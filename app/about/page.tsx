import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { MobilePageShell } from '@/components/layout/MobilePageShell';
import ContactCTA from '@/components/home/ContactCTA';
import { ArrowRight, Camera, MapPin, Clock, Heart, Sparkles, Users, LucideIcon } from 'lucide-react';
import { sanityFetch } from '@/sanity/lib/client';
import { ABOUT_PAGE_QUERY } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';

export const metadata: Metadata = {
  title: "About — Cielito's Wrld",
  description:
    "Southern California photographer capturing raw, honest moments for artists, brands, and everyday stories. Based in the Inland Empire — shooting across LA, San Diego, and beyond.",
  alternates: { canonical: 'https://cielitoswrld.com/about' },
};

const ICON_MAP: Record<string, LucideIcon> = {
  Camera,
  Heart,
  Users,
  Sparkles,
  MapPin,
  Clock,
};

export default async function AboutPage() {
  const data = await sanityFetch<any>({
    query: ABOUT_PAGE_QUERY,
    tags: ['homeAbout'],
  });

  if (!data) {
    return (
      <MobilePageShell immersive={true}>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-stone-500">Loading about content...</p>
        </div>
      </MobilePageShell>
    );
  }

  const {
    eyebrow,
    heading,
    bio,
    testimonial,
    profileImage,
    quickFacts,
    features,
    ctaPrimary,
    ctaSecondary,
  } = data;

  return (
    <MobilePageShell immersive={true}>
      <main className="min-h-screen bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100">

        {/* ── Hero ── */}
        <section className="relative pt-32 pb-16 md:pt-48 md:pb-24 px-6">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100 dark:bg-orange-900/10 rounded-full blur-3xl -z-0 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-stone-100 dark:bg-stone-800/30 rounded-full blur-3xl -z-0 pointer-events-none" />

          <div className="container mx-auto max-w-7xl relative z-10">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
              {/* Profile Image */}
              <div className="w-full lg:w-5/12 relative group animate-in fade-in slide-in-from-left-8 duration-700 delay-100 motion-reduce:animate-none">
                <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-orange-100 dark:bg-orange-900/10 rounded-full blur-2xl -z-10 transition-transform duration-700 group-hover:scale-110" />
                <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-stone-900/5 dark:ring-white/5 bg-stone-200 dark:bg-stone-800">
                  {profileImage && (
                    <Image
                      src={urlFor(profileImage).width(800).url()}
                      alt={profileImage.alt || "Cielo — Southern California Photographer"}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 42vw"
                      priority
                      placeholder="blur"
                      blurDataURL={profileImage.asset?.metadata?.lqip}
                    />
                  )}
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[2rem]" />
                </div>
              </div>

              {/* Intro Content */}
              <div className="w-full lg:w-7/12 flex flex-col space-y-8 animate-in fade-in slide-in-from-right-8 duration-700 delay-150 motion-reduce:animate-none">
                <div className="space-y-4 text-left">
                  <span className="hidden md:block text-orange-600 dark:text-orange-500 font-bold tracking-[0.3em] text-[11px] uppercase">
                    {eyebrow || "About Me"}
                  </span>
                  <h1 className="hidden md:block font-pattaya text-5xl md:text-6xl lg:text-7xl font-light text-stone-900 dark:text-stone-50 leading-[1.1]">
                    {heading || "The Story Behind the Lens"}
                  </h1>
                  <div className="w-20 h-1 bg-orange-500 mx-0 rounded-full mb-2" />
                </div>

                <div className="hidden md:block text-lg md:text-xl text-stone-600 dark:text-stone-400 leading-relaxed font-light text-left whitespace-pre-wrap">
                  {bio}
                </div>

                {/* Quick Facts */}
                <div className="flex flex-wrap gap-3 justify-start">
                  {quickFacts?.map((fact: any, index: number) => {
                    const Icon = ICON_MAP[fact.icon] || Camera;
                    return (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 text-sm font-medium"
                      >
                        <Icon className="w-3.5 h-3.5 text-orange-500" />
                        {fact.label}
                      </span>
                    );
                  })}
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 justify-center lg:justify-start">
                  {ctaPrimary?.link && (
                    <Link
                      href={ctaPrimary.link}
                      className="btn-press inline-flex items-center justify-center h-12 px-8 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-full font-bold transition-all hover:scale-105 hover:shadow-lg text-base w-full sm:w-auto"
                    >
                      {ctaPrimary.label || "View My Work"}
                    </Link>
                  )}
                  {ctaSecondary?.link && (
                    <Link
                      href={ctaSecondary.link}
                      className="btn-press inline-flex items-center justify-center h-12 px-8 text-stone-600 dark:text-stone-300 hover:text-orange-600 dark:hover:text-orange-400 font-bold transition-colors group w-full sm:w-auto"
                    >
                      {ctaSecondary.label || "Let's Create Together"}
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Values ── */}
        <section className="py-20 md:py-28 px-6 bg-stone-50 dark:bg-stone-900/50">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-14">
              <span className="inline-block text-orange-600 dark:text-orange-500 font-bold tracking-[0.3em] text-[11px] uppercase mb-3">
                How I Work
              </span>
              <h2 className="font-pattaya text-4xl md:text-5xl text-stone-900 dark:text-stone-50">
                What Drives Every Shot
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features?.map((feature: any, index: number) => {
                const Icon = ICON_MAP[feature.icon] || Sparkles;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-5 p-6 rounded-2xl bg-white dark:bg-stone-900 shadow-sm ring-1 ring-stone-100 dark:ring-stone-800 hover:shadow-md transition-shadow"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <h3 className="font-archivo font-bold text-stone-900 dark:text-stone-100 text-lg mb-1">
                        {feature.title}
                      </h3>
                      {/* No description field in schema, keeping it simple as per design */}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Pull Quote ── */}
        {testimonial && (
          <section className="py-20 md:py-28 px-6">
            <div className="container mx-auto max-w-3xl text-center">
              <div className="text-6xl text-orange-200 dark:text-orange-900 font-serif leading-none mb-6 select-none">&ldquo;</div>
              <blockquote className="font-pattaya text-3xl md:text-4xl text-stone-800 dark:text-stone-200 leading-snug italic">
                {testimonial.quote}
              </blockquote>
              <footer className="mt-8">
                <p className="font-bold text-stone-900 dark:text-stone-100">{testimonial.author}</p>
                <p className="text-sm text-orange-600 dark:text-orange-400 font-medium tracking-wide uppercase mt-0.5">
                  {testimonial.role}
                </p>
              </footer>
            </div>
          </section>
        )}

        {/* ── Final CTA ── */}
        <ContactCTA 
          data={{
            title: "Let's Tell Your Story",
            text: "Whether you're an artist, a brand, or just someone with a story worth capturing — I'd love to hear from you.",
            buttonText: "Book a Session",
            buttonLink: "/contact"
          }}
        />

      </main>
    </MobilePageShell>
  );
}
