import { defineField, defineType } from 'sanity'
import { EnvelopeIcon } from '@sanity/icons'

export default defineType({
    name: 'contactPage',
    title: 'Contact Page',
    type: 'document',
    icon: EnvelopeIcon,
    fields: [
        defineField({
            name: 'title',
            title: 'Page Title',
            type: 'string',
            initialValue: 'Get in Touch',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'pageBackground',
            title: 'Page Background Image',
            type: 'image',
            options: { hotspot: true },
        }),

        defineField({
            name: 'introText',
            title: 'Intro Text',
            type: 'text',
            rows: 3,
            description: 'A brief message displayed above the contact form',
        }),
        defineField({
            name: 'email',
            title: 'Contact Email',
            type: 'string',
            description: 'Override the global site email for this page (optional)',
        }),
        defineField({
            name: 'phone',
            title: 'Phone Number',
            type: 'string',
        }),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'string',
            initialValue: 'Southern California, USA',
        }),
        defineField({
            name: 'studioLabel',
            title: 'Studio Label',
            type: 'string',
            initialValue: 'Studio',
        }),
        defineField({
            name: 'emailLabel',
            title: 'Email Label',
            type: 'string',
            initialValue: 'Email',
        }),
        defineField({
            name: 'phoneLabel',
            title: 'Phone Label',
            type: 'string',
            initialValue: 'Phone',
        }),
        defineField({
            name: 'followMeLabel',
            title: 'Follow Me Label',
            type: 'string',
            initialValue: 'Follow Me',
        }),
        defineField({
            name: 'socialLinks',
            title: 'Social Links',
            type: 'object',
            fields: [
                { name: 'instagram', type: 'url', title: 'Instagram URL' },
                { name: 'tiktok', type: 'url', title: 'TikTok URL' },
                { name: 'threads', type: 'url', title: 'Threads URL' },
            ],
        }),
        defineField({
            name: 'faqs',
            title: 'Frequently Asked Questions',
            type: 'array',
            of: [
                defineField({
                    type: 'object',
                    name: 'faq',
                    fields: [
                        defineField({
                            name: 'question',
                            title: 'Question',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'answer',
                            title: 'Answer',
                            type: 'text',
                            rows: 3,
                            validation: (Rule) => Rule.required(),
                        }),
                    ],
                }),
            ],
        }),
    ],
    preview: {
        select: {
            title: 'title',

        },
    },
})
