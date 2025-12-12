import { defineField, defineType } from 'sanity'
import { BookIcon } from '@sanity/icons'

export default defineType({
    name: 'blogPage',
    title: 'Blog Page',
    type: 'document',
    icon: BookIcon,
    fields: [
        defineField({
            name: 'title',
            title: 'Page Title',
            type: 'string',
            initialValue: "Cielito's Wrld",
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtitle',
            type: 'string',
            initialValue: 'Visual stories & late night thoughts.',
        }),
        defineField({
            name: 'heroImage',
            title: 'Hero Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'pageBackground',
            title: 'Page Background Image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'postsPerPage',
            title: 'Posts Per Page',
            type: 'number',
            initialValue: 10,
            validation: (Rule) => Rule.min(1).max(50),
        }),
        defineField({
            name: 'orderBy',
            title: 'Order By',
            type: 'string',
            options: {
                list: [
                    { title: 'Latest First', value: 'publishedAt desc' },
                    { title: 'Oldest First', value: 'publishedAt asc' },
                    { title: 'Title A-Z', value: 'title asc' },
                ],
            },
            initialValue: 'publishedAt desc',
        }),
        defineField({
            name: 'noPostsMessage',
            title: 'No Posts Message',
            type: 'string',
            initialValue: 'No posts found.',
        }),
        defineField({
            name: 'pagination',
            title: 'Pagination Labels',
            type: 'object',
            fields: [
                defineField({ name: 'newer', type: 'string', title: 'Newer Label', initialValue: 'Newer' }),
                defineField({ name: 'older', type: 'string', title: 'Older Label', initialValue: 'Older' }),
            ],
        }),
        defineField({
            name: 'sidebarProfile',
            title: 'Sidebar Profile',
            type: 'object',
            fields: [
                defineField({ name: 'name', type: 'string', title: 'Name', initialValue: "Cielito's Wrld" }),
                defineField({ name: 'avatar', type: 'image', title: 'Avatar', options: { hotspot: true } }),
                defineField({ name: 'bio', type: 'text', title: 'Bio', rows: 3, initialValue: 'Capturing life on 35mm. Visual stories, late night thoughts, and the beauty in the mundane.' }),
            ],
        }),
        defineField({
            name: 'currently',
            title: 'Currently',
            type: 'object',
            fields: [
                defineField({ name: 'listening', type: 'string', title: 'Listening To', initialValue: 'Lofi Beats' }),
                defineField({ name: 'location', type: 'string', title: 'Location', initialValue: 'SoCal' }),
            ],
        }),
        defineField({
            name: 'curatedTags',
            title: 'Curated Tags',
            type: 'array',
            of: [{ type: 'string' }],
            initialValue: ['film', '35mm', 'portraits', 'nightwalks', 'travel', 'journal', 'canon ae-1'],
        }),
    ],
    preview: {
        prepare() {
            return { title: 'Blog Page' }
        },
    },
})
