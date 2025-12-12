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
            description: 'Main hero banner at the top of the homepage',
            fields: [
                defineField({
                    name: 'title',
                    type: 'string',
                    title: 'Title',
                    description: 'Main heading text',
                    validation: (Rule) => Rule.required()
                }),
                defineField({
                    name: 'subtitle',
                    type: 'string',
                    title: 'Subtitle',
                    description: 'Subheading below the title'
                }),
                defineField({
                    name: 'backgroundImage',
                    type: 'image',
                    title: 'Hero Background Image (Desktop)',
                    description: 'Background image for desktop screens',
                    options: { hotspot: true },
                    validation: (Rule) => Rule.required()
                }),
                defineField({
                    name: 'mobileBackgroundImage',
                    type: 'image',
                    title: 'Hero Background Image (Mobile)',
                    description: 'Optional. If set, this image will be used on mobile devices instead of the desktop background image.',
                    options: { hotspot: true }
                }),
                defineField({
                    name: 'ctaText',
                    type: 'string',
                    title: 'Primary CTA Text',
                    description: 'Text for the primary call-to-action button',
                    initialValue: 'View Gallery'
                }),
                defineField({
                    name: 'ctaLink',
                    type: 'string',
                    title: 'Primary CTA Link',
                    description: 'URL for the primary button (e.g., /gallery)',
                    initialValue: '/gallery'
                }),
                defineField({
                    name: 'secondaryCtaText',
                    type: 'string',
                    title: 'Secondary CTA Text',
                    description: 'Text for the secondary call-to-action button',
                    initialValue: 'Read My Blog'
                }),
                defineField({
                    name: 'secondaryCtaLink',
                    type: 'string',
                    title: 'Secondary CTA Link',
                    description: 'URL for the secondary button (e.g., /blog)',
                    initialValue: '/blog'
                }),
            ],
        }),
    ],
    preview: {
        select: {
            title: 'hero.title',
            subtitle: 'hero.subtitle',
            media: 'hero.backgroundImage'
        },
        prepare({ title, subtitle, media }) {
            return {
                title: title || 'Home Page',
                subtitle: subtitle || 'Hero Section',
                media
            }
        },
    },
})
