import { defineField, defineType } from 'sanity'
import { MenuIcon } from '@sanity/icons'

export default defineType({
    name: 'navigation',
    title: 'Navigation',
    type: 'document',
    icon: MenuIcon,
    fields: [
        defineField({
            name: 'title',
            title: 'Navigation Name',
            type: 'string',
            description: 'Internal label (e.g., "Main Navigation", "Footer Navigation")',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'navId',
            title: 'Navigation ID',
            type: 'string',
            description: 'Unique identifier (e.g., "main", "footer")',
            options: {
                list: [
                    { title: 'Main Navigation', value: 'main' },
                    { title: 'Footer Navigation', value: 'footer' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'items',
            title: 'Navigation Items',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'navItem',
                    title: 'Navigation Item',
                    fields: [
                        defineField({
                            name: 'label',
                            title: 'Label',
                            type: 'string',
                            description: 'Text displayed in navigation',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'linkType',
                            title: 'Link Type',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Internal Page', value: 'internal' },
                                    { title: 'External URL', value: 'external' },
                                ],
                                layout: 'radio',
                            },
                            initialValue: 'internal',
                        }),
                        defineField({
                            name: 'internalLink',
                            title: 'Internal Link',
                            type: 'string',
                            description: 'Path to internal page (e.g., "/gallery", "/blog")',
                            hidden: ({ parent }) => parent?.linkType !== 'internal',
                            options: {
                                list: [
                                    { title: 'Home', value: '/' },
                                    { title: 'Gallery', value: '/gallery' },
                                    { title: 'Blog', value: '/blog' },
                                    { title: 'Contact', value: '/contact' },
                                ],
                            },
                        }),
                        defineField({
                            name: 'externalUrl',
                            title: 'External URL',
                            type: 'url',
                            description: 'Full URL for external links',
                            hidden: ({ parent }) => parent?.linkType !== 'external',
                        }),
                        defineField({
                            name: 'openInNewTab',
                            title: 'Open in New Tab',
                            type: 'boolean',
                            initialValue: false,
                            hidden: ({ parent }) => parent?.linkType !== 'external',
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'label',
                            linkType: 'linkType',
                            internalLink: 'internalLink',
                            externalUrl: 'externalUrl',
                        },
                        prepare({ title, linkType, internalLink, externalUrl }) {
                            const link = linkType === 'internal' ? internalLink : externalUrl
                            return {
                                title: title || 'Untitled',
                                subtitle: link || 'No link set',
                            }
                        },
                    },
                },
            ],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            navId: 'navId',
        },
        prepare({ title, navId }) {
            return {
                title: title || 'Navigation',
                subtitle: navId === 'main' ? 'Header' : navId === 'footer' ? 'Footer' : navId,
            }
        },
    },
})
