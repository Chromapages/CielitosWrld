import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import React from 'react';
import { ContactFormEmail } from '@/lib/emails/ContactFormEmail';
import { contactFormSchema } from '@/lib/validations/contact';
import { contactRateLimit } from '@/lib/ratelimit';

/**
 * Initialize Resend client lazily to avoid build-time errors
 * Only creates the client when the API route is actually called
 */
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY environment variable is not set');
  }
  return new Resend(apiKey);
}

// Email address to receive contact form submissions
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'Abajo.Del.Cieloo@gmail.com';

export async function POST(request: NextRequest) {
  try {
    // 1. Rate Limiting
    const ip = (request as any).ip ?? request.headers.get('x-forwarded-for') ?? '127.0.0.1';
    
    // Only apply rate limit if env vars are present (prevents breaking dev if not configured)
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
      const { success, limit, reset, remaining } = await contactRateLimit.limit(ip);
      
      if (!success) {
        return NextResponse.json(
          { error: 'Too many requests. Please try again later.' },
          { 
            status: 429,
            headers: {
              'X-RateLimit-Limit': limit.toString(),
              'X-RateLimit-Remaining': remaining.toString(),
              'X-RateLimit-Reset': reset.toString(),
            }
          }
        );
      }
    }

    // 2. Validation
    const body = await request.json();
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: result.error.flatten().fieldErrors 
        },
        { status: 400 }
      );
    }

    const { name, email, budget, message } = result.data;

    // 4. Send email using Resend
    let resend;
    try {
      resend = getResendClient();
    } catch (error) {
      console.error('Resend configuration error:', error);
      return NextResponse.json(
        { error: 'Email service is not configured' },
        { status: 500 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Cielito\'s World <onboarding@resend.dev>',
      to: [CONTACT_EMAIL],
      replyTo: email,
      subject: `New Contact: ${name} - ${budget || 'No budget specified'}`,
      react: <ContactFormEmail name={name} email={email} budget={budget || ''} message={message} />,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Message sent successfully', id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}