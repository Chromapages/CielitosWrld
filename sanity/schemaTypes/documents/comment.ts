import { defineField, defineType } from 'sanity'
import { CommentIcon } from '@sanity/icons'

export default defineType({
    name: 'comment',
    title: 'Comment',
    type: 'document',
    icon: CommentIcon,
    fields: [
        defineField({
            name: 'post',
            title: 'Post',
            type: 'reference' as const,
            to: [{ type: 'post' as const }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'parent',
            title: 'Parent Comment',
            type: 'reference' as const,
            to: [{ type: 'comment' as const }],
            description: 'The comment this is a reply to (optional)',
        }),
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'comment',
            title: 'Comment Body',
            type: 'text' as const,
            validation: (Rule) => Rule.required().min(2).max(1000),
        }),
        defineField({
            name: 'approved',
            title: 'Approved',
            type: 'boolean',
            description: 'Comments won’t show on the site until approved',
            initialValue: false,
        }),
        defineField({
            name: 'isSpam',
            title: 'Spam',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'likes',
            title: 'Likes',
            type: 'number',
            initialValue: 0,
            readOnly: true,
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'comment',
            postTitle: 'post.title',
            approved: 'approved',
        },
        prepare({ title, subtitle, postTitle, approved }) {
            return {
                title: `${title} on "${postTitle || 'Unknown Post'}"`,
                subtitle: subtitle,
                media: CommentIcon,
                description: approved ? '✅ Approved' : '⏳ Pending',
            }
        },
    },
})
