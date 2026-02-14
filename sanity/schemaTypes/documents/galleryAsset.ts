import { ImagesIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'galleryAsset',
  title: 'Gallery Asset',
  type: 'document',
  icon: ImagesIcon,
  groups: [
    { name: 'media', title: 'Media' },
    { name: 'metadata', title: 'Metadata' },
  ],
  initialValue: {
    mediaType: 'photo',
    featured: false,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'metadata',
      description: 'Display name for this asset',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'metadata',
      description: 'Unique identifier used in URLs and queries',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) =>
        Rule.required().error('Generate a slug so this asset can be referenced'),
    }),
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      group: 'media',
      options: {
        list: [
          { title: 'Photo', value: 'photo' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'videoStats',
      title: 'Video Statistics',
      type: 'object',
      hidden: ({ document }) => document?.mediaType !== 'video',
      fields: [
        defineField({
          name: 'duration',
          title: 'Duration',
          type: 'string',
          description: 'e.g. 3:45',
        }),
        defineField({
          name: 'views',
          title: 'View Count',
          type: 'string',
          description: 'e.g. 1.2K',
        }),
      ],
    }),
    defineField({
      name: 'hoverVideo',
      title: 'Hover Preview Video',
      type: 'file',
      options: {
        accept: 'video/mp4,video/webm',
      },
      description: 'Short, silent video for hover preview (MP4 or WebM)',
      hidden: ({ document }) => document?.mediaType !== 'video',
    }),
    defineField({
      name: 'isShort',
      title: 'Is YouTube Short?',
      type: 'boolean',
      description: 'Mark true for 9:16 vertical videos',
      hidden: ({ document }) => document?.mediaType !== 'video',
      initialValue: false,
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image' as const,
      group: 'media',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for accessibility and SEO',
          validation: (Rule) =>
            Rule.custom((value, context) => {
              if (context.document?.mediaType === 'photo' && !value) {
                return 'Alt text is required for photos'
              }
              return true
            }),
        }),
      ],
      hidden: ({ document }) => document?.mediaType !== 'photo',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.mediaType === 'photo' && !value) {
            return 'Upload an image for photo assets'
          }
          return true
        }),
    }),
    defineField({
      name: 'videoEmbedUrl',
      title: 'Video Embed URL',
      type: 'url',
      group: 'media',
      description: 'Paste a Vimeo or YouTube URL for video assets',
      hidden: ({ document }) => document?.mediaType !== 'video',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.mediaType === 'video' && !value) {
            return 'Provide an embed URL for video assets'
          }
          return true
        }).uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'videoThumbnail',
      title: 'Video Thumbnail',
      type: 'image' as const,
      group: 'media',
      options: { hotspot: true },
      description: 'Optional. If left empty, the YouTube thumbnail will be used automatically.',
      hidden: ({ document }) => document?.mediaType !== 'video',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the thumbnail image',
          // Only require alt text if a thumbnail image is actually uploaded
          validation: (Rule) =>
            Rule.custom((value, context) => {
              // @ts-ignore - parent type check
              if (context.document?.mediaType === 'video' && context.parent?.asset && !value) {
                return 'Alt text is required for video thumbnails'
              }
              return true
            }),
        }),
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'metadata',
      description: 'Primary genre or subject for this image',
      options: {
        list: [
          { title: 'Portraits', value: 'Portraits' },
          { title: 'Couples', value: 'Couples' },
          { title: 'Events', value: 'Events' },
          { title: 'Music & Artists', value: 'Music & Artists' },
          { title: 'Brands', value: 'Brands' },
          { title: 'Personal', value: 'Personal' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required().error('Please select a category'),
    }),
    defineField({
      name: 'medium',
      title: 'Medium',
      type: 'string',
      group: 'metadata',
      options: {
        list: [
          { title: 'Digital', value: 'Digital' },
          { title: 'Film', value: 'Film' },
          { title: 'Mixed', value: 'Mixed' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      group: 'metadata',
      description: 'Highlight this asset in featured galleries',
      initialValue: false,
    }),

    // Deprecated: kept hidden to avoid "Unknown field found" warnings on existing docs
    defineField({
      name: 'archived',
      title: 'Archived (deprecated)',
      type: 'boolean',
      group: 'metadata',
      hidden: true,
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      mediaType: 'mediaType',
      category: 'category',
      image: 'image',
      videoThumbnail: 'videoThumbnail',
    },
    prepare({ title, mediaType, category, image, videoThumbnail }) {
      const badge = mediaType === 'video' ? 'Video' : 'Photo'
      const subtitle = [badge, category].filter(Boolean).join(' • ')
      return {
        title: title || 'Untitled asset',
        subtitle,
        media: mediaType === 'video' ? videoThumbnail : image,
      }
    },
  },
})
