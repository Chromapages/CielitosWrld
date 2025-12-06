import { defineField, defineType } from 'sanity'
import { StarIcon } from '@sanity/icons'

export default defineType({
    name: 'kindWords',
    title: 'Kind Words (User Reviews)',
    type: 'document',
    icon: StarIcon,
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.required().min(2).max(100),
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
            description: 'For internal contact only - not displayed publicly',
            validation: (Rule) => Rule.required().email(),
            hidden: false, // Visible in Studio for admin reference
        }),
        defineField({
            name: 'role',
            title: 'Role / Context',
            type: 'string',
            description: 'e.g., "Wedding Client" or "Portrait Session"',
        }),
        defineField({
            name: 'content',
            title: 'Review Content',
            type: 'text',
            rows: 4,
            validation: (Rule) => Rule.required().min(10).max(1000),
        }),
        defineField({
            name: 'approved',
            title: 'Approved',
            type: 'boolean',
            description: 'Reviews will not show on the site until approved',
            initialValue: false,
        }),
        defineField({
            name: 'isSpam',
            title: 'Spam',
            type: 'boolean',
            description: 'Mark as spam to hide from admin review queue',
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'role',
            content: 'content',
            approved: 'approved',
            isSpam: 'isSpam',
        },
        prepare({ title, subtitle, content, approved, isSpam }) {
            const status = isSpam ? '🚫 Spam' : approved ? '✅ Approved' : '⏳ Pending'
            return {
                title: `${title} ${status}`,
                subtitle: subtitle || 'No role specified',
                media: StarIcon,
                description: content ? `"${content.substring(0, 50)}..."` : '',
            }
        },
    },
    orderings: [
        {
            title: 'Pending First',
            name: 'pendingFirst',
            by: [
                { field: 'approved', direction: 'asc' },
                { field: '_createdAt', direction: 'desc' },
            ],
        },
        {
            title: 'Newest First',
            name: 'newestFirst',
            by: [{ field: '_createdAt', direction: 'desc' }],
        },
    ],
})
