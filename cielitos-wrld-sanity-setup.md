# Cielitos Wrld × Sanity CMS — Integration Guide (Next.js + Tailwind + TypeScript)

A clean, end‑to‑end setup to power **Cielitos Wrld** portfolio content with **Sanity** and render it in a **Next.js (App Router)** site.

---

## Prerequisites

- Node 18+
- Next.js 13.4+ (App Router)
- Tailwind CSS (optional but assumed)
- A Sanity account (free tier is fine)

---

## Quick Start

```bash
# 1) Create a Sanity Studio (separate folder or inside your repo)
npm create sanity@latest

# Choose: New project → dataset "production" → template "Clean" (v3+)
# Follow prompts to log in and link the project

# 2) Install frontend dependencies in your Next.js app
npm i next-sanity @sanity/image-url @portabletext/react groq
```

> Prefer the Studio **inside** your Next.js app at `/studio`? See the “Embed Studio at /studio (optional)” section.

---

## Content Model (schemas)

Create a `work` document type for portfolio items.

```ts
// /sanity/schemas/work.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'work',
  title: 'Work',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: r => r.required() }),
    defineField({ name: 'year', type: 'number' }),
    defineField({ name: 'coverImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'gallery', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'excerpt', type: 'text' }),
    defineField({ name: 'body', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'tags', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', type: 'number' }),
  ],
  preview: { select: { title: 'title', media: 'coverImage' } }
})
```

Register it in your Studio’s `schema.ts`:

```ts
// /sanity/schema.ts (or /sanity/schemas/index.ts depending on scaffold)
import { type SchemaTypeDefinition } from 'sanity'
import work from './schemas/work'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [work],
}
```

Optional supporting docs:

- `siteSettings` (nav, social, SEO)
- `page` (About, Contact)
- `series` or `collection` (to group works)

---

## Next.js ↔ Sanity wiring

Install libs (already shown) and create a tiny Sanity toolkit in your Next.js app:

```ts
// /lib/sanity.client.ts
import {createClient} from 'next-sanity'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-01-01',   // fixed date for determinism
  useCdn: true,               // CDN cache for published content
})
```

```ts
// /lib/sanity.image.ts
import imageUrlBuilder from '@sanity/image-url'
import {sanityClient} from './sanity.client'

const builder = imageUrlBuilder(sanityClient)
export const urlFor = (source: any) => builder.image(source)
```

```ts
// /lib/queries.ts
import {groq} from 'next-sanity'

export const allWorksQuery = groq`
*[_type=="work"] | order(coalesce(order, 9999) asc, _createdAt desc)[]{
  _id, title, "slug": slug.current, year, featured,
  excerpt, coverImage, gallery, tags
}
`

export const workBySlugQuery = groq`
*[_type=="work" && slug.current == $slug][0]{
  _id, title, year, excerpt, body, coverImage, gallery, tags
}
`
```

> Notes
> - `useCdn: true` serves **published** content quickly. If you need **draft previews**, use a read token and Next.js draft mode (see “Draft Previews (optional)” below).
> - `@sanity/image-url` preserves crop/hotspot and generates optimal sizes per request.

---

## Pages (App Router)

### All Works page

```tsx
// /app/work/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import {sanityClient} from '@/lib/sanity.client'
import {allWorksQuery} from '@/lib/queries'
import {urlFor} from '@/lib/sanity.image'

export const revalidate = 60 // ISR

export default async function WorkIndex() {
  const works = await sanityClient.fetch(allWorksQuery)
  return (
    <main className="mx-auto max-w-6xl px-6 py-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {works.map((w: any) => (
        <Link key={w._id} href={`/work/${w.slug}`} className="group">
          {w.coverImage && (
            <Image
              src={urlFor(w.coverImage).width(1200).height(800).fit('max').url()}
              alt={w.title}
              width={1200} height={800}
              className="aspect-[3/2] object-cover rounded-2xl"
            />
          )}
          <h3 className="mt-3 text-lg font-semibold">{w.title}</h3>
          {w.year && <p className="text-sm opacity-70">{w.year}</p>}
        </Link>
      ))}
    </main>
  )
}
```

### Single Work page

```tsx
// /app/work/[slug]/page.tsx
import Image from 'next/image'
import {PortableText} from '@portabletext/react'
import {sanityClient} from '@/lib/sanity.client'
import {workBySlugQuery} from '@/lib/queries'
import {urlFor} from '@/lib/sanity.image'

export const revalidate = 60

export async function generateStaticParams() {
  const works = await sanityClient.fetch(`*[_type=="work"]{ "slug": slug.current }`)
  return works.map((w: any) => ({ slug: w.slug }))
}

export default async function WorkPage({ params }: { params: { slug: string } }) {
  const work = await sanityClient.fetch(workBySlugQuery, { slug: params.slug })
  if (!work) return null
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold">{work.title}</h1>

      {work.coverImage && (
        <Image
          src={urlFor(work.coverImage).width(1600).fit('max').url()}
          alt={work.title} width={1600} height={1000}
          className="mt-6 rounded-2xl object-cover"
        />
      )}

      {work.body && <div className="prose mt-8"><PortableText value={work.body} /></div>}

      {Array.isArray(work.gallery) && work.gallery.length > 0 && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {work.gallery.map((img: any, i: number) => (
            <Image
              key={i}
              src={urlFor(img).width(1200).fit('max').url()}
              alt={`${work.title} #${i+1}`}
              width={1200} height={800}
              className="rounded-xl object-cover"
            />
          ))}
        </div>
      )}
    </article>
  )
}
```

---

## Environment & CORS

Create **.env.local** in the Next.js app:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=yourProjectId
NEXT_PUBLIC_SANITY_DATASET=production
# SANITY_API_READ_TOKEN=...  # only if you enable draft previews
```

In **Sanity → Manage → API → CORS origins**, add:
- `http://localhost:3000`
- Your production domain, e.g. `https://cielitoswrld.com`

---

## Draft Previews (optional)

- Create a **read token** in Sanity (API → Tokens: read/list permissions).
- In Next.js, configure **draft mode** and a “Preview” route.
- When fetching in preview, pass `{token}` to the client and query with `useCdn: false` for live, draft content.
- Consider Sanity’s Visual Editing for click‑to‑edit from your site.

_This step is optional; for a public portfolio, published‑only content + ISR is often enough._

---

## Embed Studio at `/studio` (optional)

Add a route that renders the Studio inside your Next.js app.

```tsx
// /app/studio/[[...index]]/page.tsx
'use client'

import {NextStudio} from 'next-sanity/studio'
import config from '../../../sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

And a minimal `sanity.config.ts` at your project root (or `/sanity`), aligning paths and schema import accordingly:

```ts
// /sanity.config.ts
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schema} from './sanity/schema' // exports { types: [...] }

export default defineConfig({
  name: 'cielitoswrld_studio',
  title: 'Cielitos Wrld Studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [structureTool(), visionTool()],
  schema,
})
```

Now the Studio is reachable at `/studio`. You can deploy just your Next.js app and manage content from the same domain.

---

## Content strategy tips for **Cielitos Wrld**

- **Types**: `work`, `series` (grouped bodies of work), `page`, `siteSettings`
- **Useful fields**: medium/role, client, location, external link, color palette, “featured” boolean, display `order`
- **Homepage**: query featured work
  ```groq
  *[_type=="work" && featured==true] | order(coalesce(order, 9999) asc){title, "slug": slug.current, coverImage}
  ```
- **Images**: upload large, high‑quality assets; use builder sizing (`.width(1200).height(800).fit('max')`) per placement

---

## Deployment notes

- Enable **Incremental Static Regeneration** (`export const revalidate = 60`) on pages you want auto‑refreshed.
- If you embed Studio, secure it:
  - Protect with password or limit access via CORS, or host Studio separately on a private subdomain.
- For production images, consider Next.js **Image Optimization** with a remote pattern for `cdn.sanity.io` in `next.config.js`:
  ```js
  // next.config.js
  module.exports = {
    images: {
      remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
    },
  }
  ```

---

## Troubleshooting

- **No documents returned**: Check dataset name, projectId, and that documents are **published**.
- **Image not rendering**: Ensure `next.config.js` allows `cdn.sanity.io`; verify `urlFor(image).width(...).url()` is non-empty.
- **CORS error**: Add your local/prod origins in Sanity API settings.
- **Type errors**: Add TypeScript types for `Work` and use them in components for stronger safety.

---

## Folder sketch (example)

```
/app
  /work
    page.tsx
    /[slug]
      page.tsx
/lib
  queries.ts
  sanity.client.ts
  sanity.image.ts
/sanity
  schema.ts
  /schemas
    work.ts
sanity.config.ts           # if embedding studio
.env.local
```

---

### You’re set! 
Create a few **Work** documents in Studio, publish them, and your `/work` routes will light up automatically. If your stack differs from Next.js, adapt the client and rendering bits accordingly.
