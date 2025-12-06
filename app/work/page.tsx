import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { ALL_WORKS_QUERY, WORK_PAGE_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import PageBackground from '@/components/ui/PageBackground'

export const revalidate = 60 // ISR

interface Work {
  _id: string
  title: string
  slug: string
  year?: number
  featured?: boolean
  excerpt?: string
  coverImage?: any
  gallery?: any[]
  tags?: string[]
}

export default async function WorkIndex() {
  const [works, workPage] = await Promise.all([
    client.fetch(ALL_WORKS_QUERY),
    client.fetch(WORK_PAGE_QUERY)
  ])

  const { title, introText, pageBackground } = workPage || {}

  return (
    <main className="mx-auto max-w-6xl px-6 py-16 relative min-h-screen">
      {/* Background Image */}
      {pageBackground && (
        <PageBackground image={pageBackground} />
      )}

      <div className="relative z-10">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{title || 'Work'}</h1>
          {introText && <p className="text-lg text-stone-600 max-w-2xl">{introText}</p>}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {works.map((w: Work) => (
            <Link key={w._id} href={`/work/${w.slug}`} className="group">
              {w.coverImage && (
                <Image
                  src={urlFor(w.coverImage).width(1200).height(800).fit('max').url()}
                  alt={w.title}
                  width={1200}
                  height={800}
                  className="aspect-[3/2] rounded-2xl object-cover transition-transform group-hover:scale-105"
                />
              )}
              <h3 className="mt-3 text-lg font-semibold">{w.title}</h3>
              {w.year && <p className="text-sm opacity-70">{w.year}</p>}
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
