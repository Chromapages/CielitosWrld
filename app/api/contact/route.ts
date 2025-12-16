import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import React from 'react';
import { ContactFormEmail } from '@/lib/emails/ContactFormEmail';

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

interface ContactFormData {
  name: string;
  email: string;
  budget?: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const { name, email, budget, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Send email using Resend
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
      react: ContactFormEmail({ name, email, budget: budget || '', message }) as React.ReactElement,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    console.log('Email sent successfully:', data);

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