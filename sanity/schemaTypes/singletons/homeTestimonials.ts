import { defineField, defineType } from 'sanity'
import { StarIcon } from '@sanity/icons'

export default defineType({
    name: 'homeTestimonials',
    title: 'Home - Testimonials Section',
    type: 'document',
    icon: StarIcon,
    fields: [
        defineField({
            name: 'badge',
            title: 'Badge',
            type: 'string',
            description: 'Small label above the heading (e.g., "Client Love")',
        }),
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string',
            description: 'Main section title (e.g., "Kind Words")',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text' as const,
            description: 'Subtitle below the heading',
        }),
        defineField({
            name: 'backgroundImage',
            title: 'Background Image (Optional)',
            type: 'image' as const,
            options: {
                hotspot: true,
            },
            fields: [
                defineField({
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                }),
            ],
        }),
        defineField({
            name: 'testimonials',
            title: 'Testimonials',
            type: 'array' as const,
            of: [
                defineField({
                    type: 'object' as const,
                    name: 'testimonial',
                    fields: [
                        defineField({
                            name: 'name',
                            title: 'Client Name',
                            type: 'string',
                            validation: (rule) => rule.required(),
                        }),
                        defineField({
                            name: 'role',
                            title: 'Role / Context',
                            type: 'string',
                            description: 'e.g., "Musical Artist" or "Graduation Client"',
                        }),
                        defineField({
                            name: 'content',
                            title: 'Quote',
                            type: 'text' as const,
                            rows: 4,
                            validation: (rule) => rule.required(),
                        }),
                        defineField({
                            name: 'company',
                            title: 'Company / Business',
                            type: 'string',
                            description: 'e.g., "Sony Music" or "Vogue"',
                        }),
                        defineField({
                            name: 'avatar',
                            title: 'Client Photo',
                            type: 'image' as const,
                            options: { hotspot: true },
                        }),
                        defineField({
                            name: 'rating',
                            title: 'Star Rating',
                            type: 'number',
                            initialValue: 5,
                            validation: (rule) => rule.min(1).max(5),
                        }),
                        defineField({
                            name: 'highlight',
                            title: 'Highlight / Hero',
                            type: 'boolean',
                            initialValue: false,
                            description: 'Show this testimonial as the large hero card',
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'name',
                            subtitle: 'role',
                            description: 'content',
                        },
                        prepare({ title, subtitle, description }) {
                            return {
                                title,
                                subtitle,
                                description: description ? `"${description.substring(0, 50)}..."` : '',
                            }
                        },
                    },
                }),
            ],
        }),
    ],
    preview: {
        select: {
            title: 'heading',
        },
        prepare({ title }) {
            return {
                title: title || 'Testimonials Section',
                subtitle: 'Home Page',
            }
        },
    },
})
