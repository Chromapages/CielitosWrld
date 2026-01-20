import { defineField, defineType } from 'sanity'
import { CreditCardIcon } from '@sanity/icons'

export default defineType({
    name: 'servicesPage',
    title: 'Services Page',
    type: 'document',
    icon: CreditCardIcon,
    fields: [
        // Hero Section
        defineField({
            name: 'heroHeading',
            title: 'Hero Heading',
            type: 'string',
        }),
        defineField({
            name: 'heroSubhead',
            title: 'Hero Subhead',
            type: 'string',
        }),
        defineField({
            name: 'heroTrustText',
            title: 'Hero Trust Indicator',
            type: 'string',
            description: 'e.g. "Trusted by 100+ clients"',
        }),

        // Process Section
        defineField({
            name: 'processSteps',
            title: 'Process Steps',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    defineField({ name: 'title', type: 'string' }),
                    defineField({ name: 'description', type: 'text', rows: 2 }),
                ]
            }]
        }),

        // FAQ Section
        defineField({
            name: 'faqs',
            title: 'FAQs',
            type: 'array',
            of: [{
                type: 'object',
                name: 'faq',
                fields: [
                    defineField({ name: 'question', type: 'string' }),
                    defineField({ name: 'answer', type: 'text', rows: 3 }),
                ],
            }],
        }),

        // Final CTA
        defineField({
            name: 'finalCtaHeading',
            title: 'Final CTA Heading',
            type: 'string',
        }),
        defineField({
            name: 'finalCtaText',
            title: 'Final CTA Text',
            type: 'text',
            rows: 2,
        }),

        // Metadata
        defineField({
            name: 'seoTitle',
            title: 'SEO Title',
            type: 'string',
        }),
        defineField({
            name: 'seoDescription',
            title: 'SEO Description',
            type: 'text',
            rows: 3,
        }),
    ],
})
