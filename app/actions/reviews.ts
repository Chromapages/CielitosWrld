'use server'

import { createClient } from 'next-sanity'
import { z } from 'zod'
import { apiVersion, dataset, projectId } from '@/sanity/env'

const writeClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: process.env.SANITY_API_WRITE_TOKEN,
})

const reviewSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name cannot exceed 100 characters'),
    email: z.string().email('Please enter a valid email address'),
    role: z.string().max(100, 'Role cannot exceed 100 characters').optional(),
    content: z.string().min(10, 'Review must be at least 10 characters').max(1000, 'Review cannot exceed 1000 characters'),
    // Honeypot field - should be empty
    gotcha: z.string().optional(),
})

export type ReviewFormState = {
    success: boolean
    message: string
    errors?: {
        name?: string[]
        email?: string[]
        role?: string[]
        content?: string[]
    }
}

export async function createReview(prevState: ReviewFormState, formData: FormData): Promise<ReviewFormState> {
    if (!process.env.SANITY_API_WRITE_TOKEN) {
        return {
            success: false,
            message: 'Configuration Error: Missing API Token. Please add SANITY_API_WRITE_TOKEN to .env.local',
        }
    }

    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        role: formData.get('role') || undefined,
        content: formData.get('content'),
        gotcha: formData.get('gotcha') || undefined,
    }

    const validatedFields = reviewSchema.safeParse(data)

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Please check your input.',
        }
    }

    const { name, email, role, content, gotcha } = validatedFields.data

    // Spam check - honeypot field should be empty
    if (gotcha) {
        // Silently accept but don't save (to not alert spammers)
        return {
            success: true,
            message: 'Thank you for your kind words! Your review will appear after moderation.',
        }
    }

    try {
        await writeClient.create({
            _type: 'kindWords',
            name,
            email,
            role: role || undefined,
            content,
            approved: false, // Default to pending moderation
            isSpam: false,
        })

        return {
            success: true,
            message: 'Thank you for your kind words! Your review will appear after moderation.',
        }
    } catch (error) {
        console.error('Error creating review:', error)
        return {
            success: false,
            message: `Failed to submit review. Please try again.`,
        }
    }
}
