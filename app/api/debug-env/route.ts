import { NextResponse } from 'next/server';

export async function GET() {
    const apiKey = process.env.RESEND_API_KEY;

    return NextResponse.json({
        hasApiKey: !!apiKey,
        apiKeyPrefix: apiKey ? apiKey.substring(0, 7) + '...' : 'NOT_SET',
        contactEmail: process.env.CONTACT_EMAIL || 'NOT_SET',
    });
}
