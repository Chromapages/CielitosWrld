import { defineField, defineType } from 'sanity'
import { UserIcon } from '@sanity/icons'

export default defineType({
    name: 'homeAbout',
    title: 'Home - About Section',
    type: 'document',
    icon: UserIcon,
    fields: [
        defineField({
            name: 'eyebrow',
            title: 'Eyebrow',
            type: 'string',
            description: 'Small text above the heading (e.g., "About Me")',
        }),
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string',
            description: 'Section heading (e.g., "Meet Cielo")',
        }),
        defineField({
            name: 'bio',
            title: 'Bio',
            type: 'text',
            description: 'Main description text about the photographer.',
        }),
        defineField({
            name: 'testimonial',
            title: 'Featured Testimonial',
            type: 'object',
            fields: [
                defineField({ name: 'quote', type: 'text', title: 'Quote', rows: 3 }),
                defineField({ name: 'author', type: 'string', title: 'Author Name' }),
                defineField({ name: 'role', type: 'string', title: 'Author Role/Context' }),
            ],
        }),
        defineField({
            name: 'profileImage',
            title: 'Profile Image',
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
            validation: (rule) => rule.required(),
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
            name: 'quickFacts',
            title: 'Quick Facts',
            type: 'array',
            of: [
                defineField({
                    type: 'object',
                    name: 'fact',
                    fields: [
                        defineField({
                            name: 'label',
                            title: 'Label',
                            type: 'string',
                        }),
                        defineField({
                            name: 'icon',
                            title: 'Icon Name',
                            type: 'string',
                            description: 'Lucide icon name (e.g., Clock, Camera, MapPin, Users)',
                            options: {
                                list: [
                                    { title: 'Clock', value: 'Clock' },
                                    { title: 'Camera', value: 'Camera' },
                                    { title: 'MapPin', value: 'MapPin' },
                                    { title: 'Users', value: 'Users' },
                                    { title: 'Sparkles', value: 'Sparkles' },
                                    { title: 'Heart', value: 'Heart' },
                                    { title: 'Star', value: 'Star' },
                                ],
                            },
                        }),
                    ],
                }),
            ],
        }),
        defineField({
            name: 'features',
            title: 'Features Links (Value Props)',
            type: 'array',
            of: [
                defineField({
                    type: 'object',
                    name: 'feature',
                    fields: [
                        defineField({
                            name: 'title',
                            title: 'Title',
                            type: 'string',
                        }),
                        // Removed description to encourage single-line value props as per plan
                        defineField({
                            name: 'icon',
                            title: 'Icon Name',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Sparkles', value: 'Sparkles' },
                                    { title: 'Users', value: 'Users' },
                                    { title: 'Camera', value: 'Camera' },
                                    { title: 'Heart', value: 'Heart' },
                                    { title: 'Star', value: 'Star' },
                                ],
                            },
                        }),
                    ],
                }),
            ],
        }),
        defineField({
            name: 'ctaPrimary',
            title: 'Primary CTA',
            type: 'object',
            fields: [
                defineField({ name: 'label', type: 'string', title: 'Label' }),
                defineField({ name: 'link', type: 'string', title: 'Link' }),
            ],
        }),
        defineField({
            name: 'ctaSecondary',
            title: 'Secondary CTA',
            type: 'object',
            fields: [
                defineField({ name: 'label', type: 'string', title: 'Label' }),
                defineField({ name: 'link', type: 'string', title: 'Link' }),
            ],
        }),
    ],
    preview: {
        select: {
            title: 'heading',
            media: 'profileImage',
        },
        prepare({ title, media }) {
            return {
                title: title || 'About Section',
                subtitle: 'Home Page',
                media,
            }
        },
    },
})
