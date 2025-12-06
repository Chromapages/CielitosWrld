import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { WORK_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

export const revalidate = 60

interface Work {
  _id: string
  title: string
  year?: number
  excerpt?: string
  body?: any[]
  coverImage?: any
  gallery?: any[]
  tags?: string[]
}

export async function generateStaticParams() {
  const works = await client.fetch<{ slug: string }[]>(
    `*[_type=="work"]{ "slug": slug.current }`
  )
  return works.map((w) => ({ slug: w.slug }))
}

export default async function WorkPage({ params }: { params: { slug: string } }) {
  const work: Work = await client.fetch(WORK_BY_SLUG_QUERY, { slug: params.slug })

  if (!work) return null

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold">{work.title}</h1>

      {work.coverImage && (
        <Image
          src={urlFor(work.coverImage).width(1600).fit('max').url()}
          alt={work.title}
          width={1600}
          height={1000}
          className="mt-6 rounded-2xl object-cover"
        />
      )}

      {work.body && (
        <div className="prose mt-8 max-w-none">
          <PortableText value={work.body} />
        </div>
      )}

      {Array.isArray(work.gallery) && work.gallery.length > 0 && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {work.gallery.map((img: any, i: number) => (
            <Image
              key={i}
              src={urlFor(img).width(1200).fit('max').url()}
              alt={`${work.title} #${i + 1}`}
              width={1200}
              height={800}
              className="rounded-xl object-cover"
            />
          ))}
        </div>
      )}
    </article>
  )
}
