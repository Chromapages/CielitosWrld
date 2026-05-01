import type { Metadata } from 'next'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { ALL_WORKS_QUERY, WORK_PAGE_QUERY } from '@/sanity/lib/queries'
import PageBackground from '@/components/ui/PageBackground'
import WorkGrid from '@/components/work/WorkGrid'
import { MobilePageShell } from '@/components/layout/MobilePageShell'
import { WorkItem } from '@/components/work/WorkCard'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const workPage = await client.fetch(WORK_PAGE_QUERY, {}, { next: { revalidate: 60 } });
  const title = workPage?.title || 'Work — Portfolio Case Studies';
  const description = workPage?.introText || 'Explore selected commercial, editorial, and brand photography projects by Cielito.';
  return {
    title,
    description,
    alternates: { canonical: 'https://cielitoswrld.com/work' },
    openGraph: {
      title,
      description,
      url: 'https://cielitoswrld.com/work',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function WorkIndex() {
  const [works, workPage] = await Promise.all([
    client.fetch(ALL_WORKS_QUERY),
    client.fetch(WORK_PAGE_QUERY)
  ])

  const { title, introText, pageBackground } = workPage || {}

  return (
    <MobilePageShell immersive={true}>
      <main className="min-h-screen relative bg-stone-50 dark:bg-stone-950">
        {/* Background Image */}
        {pageBackground && (
          <PageBackground image={pageBackground} />
        )}

        {/* Hero Section */}
        <section className="relative z-10 pt-32 pb-12 md:pt-48 md:pb-20 px-6 container mx-auto max-w-7xl">
          <div className="max-w-7xl">
            <h1 className="hidden md:block font-pattaya text-5xl md:text-7xl text-stone-900 dark:text-stone-50 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 motion-reduce:animate-none">
              {title || 'Selected Works'}
            </h1>
            <p className="hidden md:block text-lg md:text-xl text-stone-600 dark:text-stone-400 font-light leading-relaxed max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 motion-reduce:animate-none">
              {introText || 'A curation of visual stories, editorial sessions, and commercial projects.'}
            </p>
          </div>
        </section>

        {/* Main Grid Section */}
        <section className="relative z-10 px-6 pb-24 container mx-auto">
          <WorkGrid works={works} />
        </section>
      </main>
    </MobilePageShell>
  )
}
