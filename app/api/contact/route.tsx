import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import React from 'react';

import { ContactFormEmail } from '@/lib/emails/ContactFormEmail';
import { getErrorMetadata, logger } from '@/lib/logger';
import { getClientIp, getRequestId } from '@/lib/request';
import { contactFormSchema } from '@/lib/validations/contact';
import { getContactRateLimit, hasRateLimitConfig } from '@/lib/ratelimit';

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
  const requestId = getRequestId(request);
  const route = '/api/contact';

  try {
    const ip = getClientIp(request);
    
    if (hasRateLimitConfig()) {
      const { success, limit, reset, remaining } = await getContactRateLimit().limit(ip);
      
      if (!success) {
        logger.warn('Contact form rate limit exceeded', {
          requestId,
          route,
          metadata: { ip },
        });

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
      logger.error('Resend configuration error', {
        requestId,
        route,
        metadata: getErrorMetadata(error),
      });

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
      logger.error('Resend send error', {
        requestId,
        route,
        metadata: {
          ...getErrorMetadata(error),
          email: result.data.email,
        },
      });

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
    logger.error('Contact form error', {
      requestId,
      route,
      metadata: getErrorMetadata(error),
    });

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
