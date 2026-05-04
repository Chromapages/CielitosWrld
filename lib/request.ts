import { NextRequest } from 'next/server';

export function getRequestId(request: NextRequest): string | undefined {
  return request.headers.get('x-request-id') ?? request.headers.get('x-vercel-id') ?? undefined;
}

export function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');

  if (forwardedFor) {
    const [firstIp] = forwardedFor.split(',');
    const ip = firstIp?.trim();

    if (ip) {
      return ip;
    }
  }

  return request.headers.get('x-real-ip') ?? '127.0.0.1';
}
