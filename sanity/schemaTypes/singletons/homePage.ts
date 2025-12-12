import { defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export default defineType({
    name: 'homePage',
    title: 'Home Page',
    type: 'document',
    icon: HomeIcon,
    fields: [
        defineField({
            name: 'hero',
            title: 'Hero Section',
            type: 'object',
            fields: [
                defineField({ name: 'title', type: 'string', title: 'Title' }),
                defineField({ name: 'subtitle', type: 'string', title: 'Subtitle' }),
                defineField({ name: 'pageBackground', type: 'image', title: 'Page Background Image', options: { hotspot: true } }),
                defineField({ name: 'backgroundImage', type: 'image', title: 'Hero Background Image (Desktop)', options: { hotspot: true } }),
                defineField({ name: 'mobileBackgroundImage', type: 'image', title: 'Hero Background Image (Mobile)', description: 'Optional. If set, this image will be used on mobile devices instead of the desktop background image.', options: { hotspot: true } }),
                defineField({ name: 'ctaText', type: 'string', title: 'Primary CTA Text' }),
                defineField({ name: 'ctaLink', type: 'string', title: 'Primary CTA Link' }),
                defineField({ name: 'secondaryCtaText', type: 'string', title: 'Secondary CTA Text' }),
                defineField({ name: 'secondaryCtaLink', type: 'string', title: 'Secondary CTA Link' }),
            ],
        }),
        defineField({
            name: 'about',
            title: 'About Section',
            type: 'object',
            fields: [
                defineField({ name: 'title', type: 'string', title: 'Title' }),
                defineField({ name: 'content', type: 'text', title: 'Content' }),
                defineField({ name: 'image', type: 'image', title: 'Image', options: { hotspot: true } }),
                defineField({
                    name: 'features',
                    title: 'Features',
                    type: 'array',
                    of: [
                        defineField({
                            name: 'feature',
                            type: 'object',
                            fields: [
                                defineField({ name: 'title', type: 'string', title: 'Title' }),
                                defineField({ name: 'description', type: 'text', title: 'Description' }),
                                defineField({
                                    name: 'icon',
                                    type: 'string',
                                    title: 'Icon',
                                    options: {
                                        list: [
                                            { title: 'Sparkles', value: 'Sparkles' },
                                            { title: 'Users', value: 'Users' },
                                            { title: 'Camera', value: 'Camera' },
                                            { title: 'Clock', value: 'Clock' },
                                            { title: 'MapPin', value: 'MapPin' },
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
                    name: 'quickFacts',
                    title: 'Quick Facts',
                    type: 'array',
                    of: [
                        defineField({
                            name: 'fact',
                            type: 'object',
                            fields: [
                                defineField({ name: 'label', type: 'string', title: 'Label' }),
                                defineField({
                                    name: 'icon',
                                    type: 'string',
                                    title: 'Icon',
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
            ],
        }),
        defineField({
            name: 'testimonials',
            title: 'Testimonials Section',
            type: 'object',
            fields: [
                defineField({ name: 'title', type: 'string', title: 'Title' }),
                defineField({
                    name: 'items',
                    title: 'Testimonials',
                    type: 'array',
                    of: [{ type: 'reference', to: [{ type: 'homeTestimonials' }] }],
                }),
            ],
        }),
        defineField({
            name: 'socialProof',
            title: 'Social Proof Section',
            type: 'object',
            fields: [
                defineField({ name: 'title', type: 'string', title: 'Title' }),
                defineField({
                    name: 'logos',
                    title: 'Logos',
                    type: 'array',
                    of: [{ type: 'image', options: { hotspot: true } }],
                }),
            ],
        }),
        defineField({
            name: 'contactCta',
            title: 'Contact CTA Section',
            type: 'object',
            fields: [
                defineField({ name: 'title', type: 'string', title: 'Title' }),
                defineField({ name: 'text', type: 'text', title: 'Text' }),
                defineField({ name: 'buttonText', type: 'string', title: 'Button Text' }),
                defineField({ name: 'buttonLink', type: 'string', title: 'Button Link' }),
            ],
        }),
    ],
    preview: {
        prepare() {
            return { title: 'Home Page' }
        },
    },
})
