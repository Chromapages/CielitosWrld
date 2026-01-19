import { defineField, defineType } from 'sanity'
import { ProjectsIcon } from '@sanity/icons'

export default defineType({
    name: 'work',
    title: 'Work (Case Studies)',
    type: 'document',
    icon: ProjectsIcon,
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'client',
            title: 'Client / Context',
            type: 'string',
            description: 'e.g. "Nike", "Wedding", "Personal Project"',
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt / Outcome',
            type: 'text',
            rows: 3,
            description: 'Short summary or result for the card view.',
        }),
        defineField({
            name: 'coverImage',
            title: 'Cover Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'year',
            title: 'Year',
            type: 'number',
            initialValue: new Date().getFullYear(),
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [{ type: 'block' }, { type: 'image' }],
        }),
        defineField({
            name: 'gallery',
            title: 'Project Gallery',
            type: 'array',
            of: [{ type: 'image' }],
        }),
        defineField({
            name: 'featured',
            title: 'Featured',
            type: 'boolean',
            initialValue: false,
        }),
    ],
})
