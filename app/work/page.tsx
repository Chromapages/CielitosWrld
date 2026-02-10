import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { ALL_WORKS_QUERY, WORK_PAGE_QUERY } from '@/sanity/lib/queries'
import PageBackground from '@/components/ui/PageBackground'
import WorkGrid from '@/components/work/WorkGrid'
import { WorkItem } from '@/components/work/WorkCard'
import { ChevronRight, Home } from 'lucide-react'

export const revalidate = 60 // ISR

export default async function WorkIndex() {
  const [works, workPage] = await Promise.all([
    client.fetch(ALL_WORKS_QUERY),
    client.fetch(WORK_PAGE_QUERY)
  ])

  const { title, introText, pageBackground } = workPage || {}

  return (
    <main className="min-h-screen relative bg-stone-50 dark:bg-stone-950">
      {/* Background Image */}
      {pageBackground && (
        <PageBackground image={pageBackground} />
      )}

      {/* Hero Section with Breadcrumbs */}
      <section className="relative z-10 pt-32 pb-12 md:pt-40 md:pb-20 px-6 container mx-auto">
        <nav className="flex items-center gap-2 text-sm text-stone-500 mb-6 animate-in fade-in slide-in-from-top-4 duration-700 motion-reduce:animate-none">
          <Link href="/" className="hover:text-stone-900 dark:hover:text-stone-300 transition-colors flex items-center gap-1">
            <Home className="w-3 h-3" />
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-stone-900 dark:text-stone-100 font-medium">Portfolio</span>
        </nav>

        <div className="max-w-4xl">
          <h1 className="font-pattaya text-5xl md:text-7xl text-stone-900 dark:text-stone-50 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 motion-reduce:animate-none">
            {title || 'Selected Works'}
          </h1>
          <p className="text-lg md:text-xl text-stone-600 dark:text-stone-400 font-light leading-relaxed max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 motion-reduce:animate-none">
            {introText || 'A curation of visual stories, editorial sessions, and commercial projects.'}
          </p>
        </div>
      </section>

      {/* Main Grid Section */}
      <section className="relative z-10 px-6 pb-24 container mx-auto">
        <WorkGrid works={works} />
      </section>
    </main>
  )
}
