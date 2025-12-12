import { defineField, defineType } from 'sanity'
import { ImagesIcon } from '@sanity/icons'

export default defineType({
    name: 'galleryPage',
    title: 'Gallery Page',
    type: 'document',
    icon: ImagesIcon,
    fields: [
        defineField({
            name: 'title',
            title: 'Page Title',
            type: 'string',
            initialValue: 'Visual Stories',
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtitle',
            type: 'text',
            rows: 2,
            initialValue: 'A curated collection of moments, captured in time.',
        }),
        defineField({
            name: 'pageBackground',
            title: 'Page Background Image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'noImagesMessage',
            title: 'No Images Message',
            type: 'string',
            initialValue: 'No images found.',
        }),
        defineField({
            name: 'clearFiltersLabel',
            title: 'Clear Filters Label',
            type: 'string',
            initialValue: 'Clear all filters',
        }),
    ],
    preview: {
        prepare() {
            return { title: 'Gallery Page' }
        },
    },
})
