import { client } from '@/sanity/lib/client'
import { HOME_PAGE_QUERY } from '@/sanity/lib/queries'
import HeroSection from '@/components/HeroSection'
import SocialProof from '@/components/home/SocialProof'
import AboutSnippet from '@/components/home/AboutSnippet'
import FeaturedWork from '@/components/home/FeaturedWork'
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel'
import ContactCTA from '@/components/home/ContactCTA'

export const revalidate = 60

export default async function Home() {
  const homeData = await client.fetch(HOME_PAGE_QUERY)

  return (
    <div className="-mt-24">
      <HeroSection data={homeData?.hero} />
      <AboutSnippet data={homeData?.about} />
      <FeaturedWork data={homeData?.featuredWork} />
      <TestimonialsCarousel data={homeData?.testimonials} />
      <SocialProof data={homeData?.socialProof} />
      <ContactCTA data={homeData?.contactCta} />
    </div>
  )
}