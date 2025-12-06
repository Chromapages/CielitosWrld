import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Comments from '@/components/blog/Comments'
import { client } from '@/sanity/lib/client'
import { POST_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import type { SanityPostDetail } from '@/lib/types'

export const revalidate = 0

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

const formatPublishedDate = (dateValue?: string) => {
  if (!dateValue) {
    return ''
  }

  const date = new Date(dateValue)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const portableTextComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="font-inter text-lg leading-relaxed text-slate-700">{children}</p>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="font-inter text-base text-slate-700">{children}</li>
    ),
  },
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await client.fetch<SanityPostDetail | null>(POST_BY_SLUG_QUERY, { slug: params.slug })

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const coverUrl = post.coverImage ? urlFor(post.coverImage).width(1200).height(630).fit('max').url() : undefined

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      images: coverUrl
        ? [
          {
            url: coverUrl,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ]
        : undefined,
    },
  }
}

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(`*[_type=="post"]{ "slug": slug.current }`)
  return slugs.map((entry) => ({ slug: entry.slug }))
}

const BlogHero = ({ post }: { post: SanityPostDetail }) => {
  const coverUrl = post.coverImage ? urlFor(post.coverImage).width(1600).height(900).fit('max').url() : null
  const publishedAt = formatPublishedDate(post.publishedAt)

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
      {coverUrl && (
        <div className="relative h-80 w-full overflow-hidden sm:h-[28rem]">
          <Image
            src={coverUrl}
            alt={post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 text-white">
            <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-sm font-inter">
              {publishedAt || 'Draft'}
            </span>
            <h1 className="mt-4 font-fitzgerald-bold text-3xl sm:text-4xl">{post.title}</h1>
          </div>
        </div>
      )}

      {!coverUrl && (
        <div className="px-6 py-10">
          <span className="inline-block rounded-full bg-orange/10 px-3 py-1 font-inter text-sm text-orange-500">
            {publishedAt || 'Draft'}
          </span>
          <h1 className="mt-4 font-fitzgerald-bold text-3xl sm:text-4xl text-slate-900">{post.title}</h1>
        </div>
      )}
    </div>
  )
}

const BlogPostBody = ({ post }: { post: SanityPostDetail }) => {
  return (
    <div className="mt-10 space-y-8">
      {post.excerpt && (
        <p className="rounded-2xl bg-sage-50 px-6 py-4 font-inter text-lg text-slate-700">
          {post.excerpt}
        </p>
      )}

      {post.body && post.body.length > 0 ? (
        <div className="prose prose-lg max-w-none prose-headings:font-fitzgerald-bold prose-headings:text-slate-900 prose-p:font-inter prose-p:text-slate-700">
          <PortableText value={post.body} components={portableTextComponents} />
        </div>
      ) : (
        <p className="font-inter text-slate-600">
          {/* Content placeholder */}
        </p>
      )}

      {post.tags && post.tags.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <li key={tag} className="rounded-full bg-orange/10 px-3 py-1 font-inter text-sm text-orange-500">
              #{tag}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const post = await client.fetch<SanityPostDetail | null>(POST_BY_SLUG_QUERY, { slug: params.slug })

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-sage-50 py-10 sm:py-16">
      <div className="mx-auto max-w-4xl px-4">
        <BlogHero post={post} />
        <BlogPostBody post={post} />
        <Comments postId={post._id} />
      </div>
    </div>
  )
}

export default BlogPostPage