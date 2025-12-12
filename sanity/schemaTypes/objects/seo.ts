import { defineType } from 'sanity'

/**
 * Reusable SEO object for consistent SEO fields across schemas
 */
export default defineType({
    name: 'seo',
    title: 'SEO Settings',
    type: 'object',
    options: {
        collapsible: true,
        collapsed: true,
    },
    fields: [
        {
            name: 'metaTitle',
            title: 'Meta Title',
            type: 'string',
            description: 'Override the page title for search engines (max 60 characters)',
            validation: (Rule) => Rule.max(60).warning('Keep under 60 characters for best SEO'),
        },
        {
            name: 'metaDescription',
            title: 'Meta Description',
            type: 'text',
            rows: 2,
            description: 'Description shown in search results (max 160 characters)',
            validation: (Rule) => Rule.max(160).warning('Keep under 160 characters for best SEO'),
        },
        {
            name: 'ogImage',
            title: 'Social Share Image',
            type: 'image',
            description: 'Image shown when shared on social media (1200x630 recommended)',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'noIndex',
            title: 'Hide from Search Engines',
            type: 'boolean',
            description: 'Prevent this page from appearing in search results',
            initialValue: false,
        },
    ],
})
