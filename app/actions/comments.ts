'use server'

import { createClient } from 'next-sanity'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { apiVersion, dataset, projectId } from '@/sanity/env'

const writeClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: process.env.SANITY_API_WRITE_TOKEN,
})

const commentSchema = z.object({
    postId: z.string(),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    comment: z.string().min(2, 'Comment must be at least 2 characters').max(1000, 'Comment cannot exceed 1000 characters'),
    parentId: z.string().optional(),
    // Honeypot field - should be empty
    gotcha: z.string().optional(),
})

export async function createComment(prevState: any, formData: FormData) {
    if (!process.env.SANITY_API_WRITE_TOKEN) {
        return {
            success: false,
            message: 'Configuration Error: Missing API Token. Please add SANITY_API_WRITE_TOKEN to .env.local',
        }
    }

    const data = {
        postId: formData.get('postId'),
        name: formData.get('name'),
        comment: formData.get('comment'),
        parentId: formData.get('parentId') || undefined,
        gotcha: formData.get('gotcha') || undefined,
    }

    const validatedFields = commentSchema.safeParse(data)

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Please check your input.',
        }
    }

    const { postId, name, comment, parentId, gotcha } = validatedFields.data

    // Spam check
    if (gotcha) {
        return {
            success: false,
            message: 'Spam detected.',
        }
    }

    try {
        await writeClient.create({
            _type: 'comment',
            post: {
                _type: 'reference',
                _ref: postId,
            },
            ...(parentId && {
                parent: {
                    _type: 'reference',
                    _ref: parentId,
                },
            }),
            name,
            comment,
            approved: false, // Default to pending
        })

        revalidatePath(`/blog/[slug]`, 'page')

        return {
            success: true,
            message: 'Comment submitted! It will appear after moderation.',
        }
    } catch (error) {
        console.error('Error creating comment:', error)
        return {
            success: false,
            message: `Failed to submit: ${(error as Error).message}`,
        }
    }
}
