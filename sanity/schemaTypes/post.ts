import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The title of your blog post',
      validation: (Rule) => Rule.required().error('Title is required'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier (auto-generated from title)',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (Rule) =>
        Rule.required()
          .error('Click "Generate" to create a URL slug from the title')
          .custom((slug) => {
            if (!slug?.current) {
              return 'Slug is required before publishing'
            }
            return true
          }),
    }),
    defineField({
      name: 'coverImage',
      title: 'Hero Image',
      type: 'image',
      description: 'Main image (min 1600px wide recommended). Use hotspot to set focus.',
      options: {
        hotspot: true,
        metadata: ['blurhash', 'lqip', 'palette'],
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Describe the image for screen readers and SEO (required)',
          validation: (Rule) => Rule.required().error('Alt text is required for accessibility'),
        },
      ],
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.document as {featured?: boolean}
          if (parent?.featured && !value) {
            return 'Hero image is required for featured posts'
          }
          return true
        }),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'Short summary (≤160 characters for best SEO)',
      rows: 3,
      validation: (Rule) =>
        Rule.max(160)
          .warning('Keep excerpts under 160 characters for search engines')
          .custom((text) => {
            if (text && text.length > 0 && text.length < 50) {
              return 'Excerpt should be at least 50 characters'
            }
            return true
          }),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      description: 'When this post was/will be published',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      description: 'Main content of your post',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [{title: 'Bullet', value: 'bullet'}, {title: 'Numbered', value: 'number'}],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) =>
                      Rule.uri({
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              description: 'Required for accessibility',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      description: 'Keywords for filtering and SEO',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this post on the homepage',
      initialValue: false,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      description: 'Search engine optimization (optional, defaults to title/excerpt)',
      options: {
        collapsible: true,
        collapsed: true,
      },
      hidden: true, // Hidden for client simplicity
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'SEO Title',
          description: 'Override page title for search engines',
          validation: (Rule) => Rule.max(60),
        },
        {
          name: 'description',
          type: 'text',
          title: 'Meta Description',
          description: 'Override excerpt for search engines',
          rows: 2,
          validation: (Rule) => Rule.max(160),
        },
        {
          name: 'ogImage',
          type: 'image',
          title: 'Social Share Image',
          description: 'Custom image for social media shares (defaults to hero image)',
        },
      ],
    }),
    defineField({
      name: 'archived',
      title: 'Archived',
      type: 'boolean',
      description: 'Archive this post (hides from public lists)',
      initialValue: false,
      hidden: ({document}) => !document?.archived,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      publishedAt: 'publishedAt',
      featured: 'featured',
      archived: 'archived',
    },
    prepare({title, media, publishedAt, featured, archived}) {
      const badges = []
      if (featured) badges.push('⭐ Featured')
      if (archived) badges.push('📦 Archived')
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString() : 'Draft'
      const subtitle = [date, ...badges].filter(Boolean).join(' • ')
      return {
        title,
        media,
        subtitle,
      }
    },
  },
})
