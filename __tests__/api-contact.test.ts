import { NextRequest } from 'next/server';
import { afterEach, describe, expect, it, vi } from 'vitest';

const sendMock = vi.fn();
const limitMock = vi.fn();
const hasRateLimitConfigMock = vi.fn(() => false);

vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(function ResendMock() {
    return {
      emails: {
        send: sendMock,
      },
    };
  }),
}));

vi.mock('@/lib/ratelimit', () => ({
  hasRateLimitConfig: hasRateLimitConfigMock,
  getContactRateLimit: vi.fn(() => ({
    limit: limitMock,
  })),
}));

function contactRequest(body: unknown) {
  return new NextRequest('https://example.com/api/contact', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json',
      'x-forwarded-for': '203.0.113.10, 198.51.100.1',
    },
  });
}

describe('/api/contact', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
    vi.restoreAllMocks();
    hasRateLimitConfigMock.mockReturnValue(false);
  });

  it('rejects invalid contact payloads with the existing response shape', async () => {
    const { POST } = await import('@/app/api/contact/route');
    const response = await POST(contactRequest({ name: 'A', email: 'bad', message: 'short' }));
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe('Validation failed');
    expect(body.details.email).toBeDefined();
  });

  it('returns a safe configuration error when Resend is missing', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);

    const { POST } = await import('@/app/api/contact/route');
    const response = await POST(contactRequest({
      name: 'Jane Doe',
      email: 'jane@example.com',
      message: 'This is a valid contact message.',
    }));

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ error: 'Email service is not configured' });
  });

  it('sends email and preserves the success response shape', async () => {
    vi.stubEnv('RESEND_API_KEY', 'test-key');
    sendMock.mockResolvedValueOnce({ data: { id: 'email_123' }, error: null });

    const { POST } = await import('@/app/api/contact/route');
    const response = await POST(contactRequest({
      name: 'Jane Doe',
      email: 'jane@example.com',
      budget: '$5k',
      message: 'This is a valid contact message.',
    }));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      message: 'Message sent successfully',
      id: 'email_123',
    });
  });

  it('returns rate limit headers when the limiter blocks a request', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    hasRateLimitConfigMock.mockReturnValue(true);
    limitMock.mockResolvedValueOnce({
      success: false,
      limit: 5,
      remaining: 0,
      reset: 123,
    });

    const { POST } = await import('@/app/api/contact/route');
    const response = await POST(contactRequest({
      name: 'Jane Doe',
      email: 'jane@example.com',
      message: 'This is a valid contact message.',
    }));

    expect(response.status).toBe(429);
    expect(response.headers.get('X-RateLimit-Limit')).toBe('5');
    expect(await response.json()).toEqual({ error: 'Too many requests. Please try again later.' });
  });

  it('returns a safe error when Resend rejects the message', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    vi.stubEnv('RESEND_API_KEY', 'test-key');
    sendMock.mockResolvedValueOnce({ data: null, error: new Error('Provider rejected') });

    const { POST } = await import('@/app/api/contact/route');
    const response = await POST(contactRequest({
      name: 'Jane Doe',
      email: 'jane@example.com',
      message: 'This is a valid contact message.',
    }));

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ error: 'Failed to send email' });
  });
});
