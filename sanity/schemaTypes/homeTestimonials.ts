import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'homeTestimonials',
    title: 'Home - Testimonials Section',
    type: 'document',
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
            type: 'text',
            description: 'Subtitle below the heading',
        }),
        defineField({
            name: 'backgroundImage',
            title: 'Background Image (Optional)',
            type: 'image',
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
            type: 'array',
            of: [
                defineField({
                    type: 'object',
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
                            type: 'text',
                            rows: 4,
                            validation: (rule) => rule.required(),
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
