import { defineType } from 'sanity'

/**
 * Reusable image object with required alt text for accessibility
 */
export default defineType({
    name: 'imageWithAlt',
    title: 'Image',
    type: 'image',
    options: {
        hotspot: true,
    },
    fields: [
        {
            name: 'alt',
            title: 'Alt Text',
            type: 'string',
            description: 'Describe the image for screen readers and SEO (required)',
            validation: (Rule) => Rule.required().error('Alt text is required for accessibility'),
        },
        {
            name: 'caption',
            title: 'Caption',
            type: 'string',
            description: 'Optional caption displayed below the image',
        },
    ],
    preview: {
        select: {
            imageUrl: 'asset.url',
            alt: 'alt',
        },
        prepare({ alt }) {
            return {
                title: alt || 'No alt text',
            }
        },
    },
})
