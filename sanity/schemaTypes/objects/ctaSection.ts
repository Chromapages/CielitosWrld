import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'ctaSection',
    title: 'CTA Section',
    type: 'object' as const,
    fields: [
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string',
        }),
        defineField({
            name: 'text',
            title: 'Text',
            type: 'text' as const,
            rows: 2,
        }),
        defineField({
            name: 'buttonText',
            title: 'Button Text',
            type: 'string',
        }),
        defineField({
            name: 'buttonLink',
            title: 'Button Link',
            type: 'string',
        }),
        defineField({
            name: 'backgroundImage',
            title: 'Background Image',
            type: 'image' as const,
            options: {
                hotspot: true,
            },
        }),
    ],
    preview: {
        select: {
            title: 'heading',
            media: 'backgroundImage',
        },
        prepare({ title, media }) {
            return {
                title: title || 'CTA Section',
                subtitle: 'Call to Action',
                media,
            }
        },
    },
})
