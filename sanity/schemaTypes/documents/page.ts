import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'page',
    title: 'Page',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'layoutSettings',
            title: 'Layout Settings',
            type: 'object',
            fields: [
                defineField({
                    name: 'useSiteBackground',
                    title: 'Use Site Background',
                    type: 'boolean',
                    initialValue: true,
                }),
                defineField({
                    name: 'backgroundImage',
                    title: 'Background Image Override',
                    type: 'image',
                    options: { hotspot: true },
                    hidden: ({ parent }) => parent?.useSiteBackground !== false,
                }),
            ],
        }),
        defineField({
            name: 'sections',
            title: 'Page Sections',
            type: 'array',
            of: [
                { type: 'heroSection' },
                { type: 'gallerySection' },
                { type: 'textSection' },
                { type: 'ctaSection' },
            ],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            slug: 'slug.current',
        },
        prepare({ title, slug }) {
            return {
                title: title || 'Untitled Page',
                subtitle: slug ? `/${slug}` : 'No slug',
            }
        },
    },
})
