import { defineField, defineType } from 'sanity'
import { UsersIcon } from '@sanity/icons'

export default defineType({
    name: 'homeCollaborations',
    title: 'Home - Collaborations Section',
    type: 'document',
    icon: UsersIcon,
    fields: [
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string',
            initialValue: 'Collaborations',
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
            name: 'items',
            title: 'Collaboration Items',
            type: 'array',
            of: [
                defineField({
                    type: 'object',
                    name: 'item',
                    fields: [
                        defineField({
                            name: 'name',
                            title: 'Name',
                            type: 'string',
                            description: 'Partner name (used for alt text if logo alt is missing)',
                            validation: (rule) => rule.required(),
                        }),
                        defineField({
                            name: 'logo',
                            title: 'Logo',
                            type: 'image',
                            options: {
                                hotspot: true,
                            },
                            fields: [
                                defineField({
                                    name: 'alt',
                                    type: 'string',
                                    title: 'Alternative Text',
                                    description: 'Describe the logo for accessibility',
                                }),
                            ],
                            validation: (rule) => rule.required(),
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'name',
                            media: 'logo',
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
                title: title || 'Collaborations Section',
                subtitle: 'Home Page',
            }
        },
    },
})
