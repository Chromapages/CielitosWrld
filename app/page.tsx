import type { ComponentProps } from 'react'

import HeroSection from '@/components/HeroSection'
import AboutSnippet from '@/components/home/AboutSnippet'
import ContactCTA from '@/components/home/ContactCTA'
import FeaturedWork from '@/components/home/FeaturedWork'
import SocialProof from '@/components/home/SocialProof'
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel'
import { MobilePageShell } from '@/components/layout/MobilePageShell'
import { PersonSchema } from '@/components/seo/JsonLd'
import type { HomeHero } from '@/lib/types'
import { client } from '@/sanity/lib/client'
import { HOME_PAGE_QUERY } from '@/sanity/lib/queries'

export const revalidate = 60

interface HomePageData {
  hero?: HomeHero;
  about?: ComponentProps<typeof AboutSnippet>['data'];
  featuredWork?: ComponentProps<typeof FeaturedWork>['data'];
  testimonials?: ComponentProps<typeof TestimonialsCarousel>['data'];
  socialProof?: ComponentProps<typeof SocialProof>['data'];
}

export default async function Home() {
  const homeData = await client.fetch<HomePageData>(HOME_PAGE_QUERY, {}, { next: { revalidate: 60 } })

  return (
    <MobilePageShell immersive={true}>
      <PersonSchema />
      <HeroSection data={homeData?.hero} className="md:-mt-24" />
      <AboutSnippet data={homeData?.about} />
      <FeaturedWork data={homeData?.featuredWork} />
      <TestimonialsCarousel data={homeData?.testimonials} />
      <SocialProof data={homeData?.socialProof} />
      <ContactCTA />
    </MobilePageShell>
  )
}
