import { defineField, defineType } from 'sanity'
import { TagIcon } from '@sanity/icons'

export default defineType({
    name: 'service',
    title: 'Service Package',
    type: 'document',
    icon: TagIcon,
    fields: [
        defineField({
            name: 'order',
            title: 'Order Number',
            type: 'number',
            description: 'Used for manual positioning (0, 1, 2...). Lower numbers appear first.',
            initialValue: 0,
        }),
        defineField({
            name: 'name',
            title: 'Package Name',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'tagline',
            title: 'Tagline / Ideal For',
            type: 'string',
        }),
        defineField({
            name: 'price',
            title: 'Price Display',
            type: 'string',
            description: 'e.g. "$350" or "Custom"',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'priceNote',
            title: 'Price Note',
            type: 'string',
            description: 'e.g. "starting at" or "per hour"',
        }),
        defineField({
            name: 'features',
            title: 'Features Included',
            type: 'array' as const,
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'popular',
            title: 'Mark as Most Popular',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'ctaText',
            title: 'CTA Button Text',
            type: 'string',
            initialValue: 'Book Now',
        }),
        defineField({
            name: 'ctaLink',
            title: 'CTA Link',
            type: 'string',
            initialValue: '/contact',
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'price',
            popular: 'popular',
            order: 'order',
        },
        prepare({ title, subtitle, popular, order }) {
            return {
                title: `${order !== undefined ? `[${order}] ` : ''}${title}`,
                subtitle: `${subtitle} ${popular ? '(Popular)' : ''}`,
                media: TagIcon,
            }
        },
    },
})
