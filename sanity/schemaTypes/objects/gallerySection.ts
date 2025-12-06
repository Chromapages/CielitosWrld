import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'gallerySection',
    title: 'Gallery Section',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            title: 'Section Title',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 2,
        }),
        defineField({
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
        }),
        defineField({
            name: 'layout',
            title: 'Grid Layout',
            type: 'string',
            options: {
                list: [
                    { title: 'Masonry', value: 'masonry' },
                    { title: 'Grid (Square)', value: 'grid' },
                    { title: 'Carousel', value: 'carousel' },
                ],
                layout: 'radio',
            },
            initialValue: 'masonry',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            images: 'images',
        },
        prepare({ title, images }) {
            return {
                title: title || 'Gallery Section',
                subtitle: `${images?.length || 0} images`,
                media: images?.[0],
            }
        },
    },
})
