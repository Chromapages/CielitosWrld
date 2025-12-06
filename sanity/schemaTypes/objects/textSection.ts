import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'textSection',
    title: 'Text Section',
    type: 'object',
    fields: [
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string',
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'centered',
            title: 'Center Text',
            type: 'boolean',
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            title: 'heading',
            content: 'content',
        },
        prepare({ title, content }) {
            const block = (content || []).find((block: any) => block._type === 'block')
            return {
                title: title || 'Text Section',
                subtitle: block
                    ? block.children
                        .filter((child: any) => child._type === 'span')
                        .map((span: any) => span.text)
                        .join('')
                    : 'No content',
            }
        },
    },
})
