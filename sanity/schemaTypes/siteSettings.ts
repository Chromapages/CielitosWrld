import { defineField, defineType } from 'sanity'
import { CogIcon } from '@sanity/icons'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      description: 'The name of your website',
      initialValue: "Cielito's Wrld",
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      description: 'Brief description of your site (for SEO)',
      rows: 3,
    }),
    // defineField({
    //   name: 'pageBackgrounds',
    //   title: 'Page Backgrounds (Deprecated - Moved to individual pages)',
    //   type: 'array',
    //   of: [{ type: 'string' }],
    //   hidden: true,
    // }),
    defineField({
      name: 'seo',
      title: 'Global SEO',
      type: 'object',
      description: 'Default SEO settings',
      fields: [
        {
          name: 'metaTitle',
          type: 'string',
          title: 'Default Meta Title',
        },
        {
          name: 'metaDescription',
          type: 'text',
          title: 'Default Meta Description',
          rows: 2,
        },
        {
          name: 'ogImage',
          type: 'image',
          title: 'Default Social Share Image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
        subtitle: 'Global site configuration',
      }
    },
  },
})
