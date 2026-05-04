import { NextRequest } from 'next/server';
import { describe, expect, it, vi } from 'vitest';

import { getErrorMetadata, logger } from '@/lib/logger';
import { getClientIp, getRequestId } from '@/lib/request';

describe('request helpers', () => {
  it('derives request IDs from supported headers', () => {
    const request = new NextRequest('https://example.com', {
      headers: { 'x-request-id': 'req_123' },
    });

    expect(getRequestId(request)).toBe('req_123');
  });

  it('uses the first forwarded IP address', () => {
    const request = new NextRequest('https://example.com', {
      headers: { 'x-forwarded-for': '203.0.113.1, 198.51.100.2' },
    });

    expect(getClientIp(request)).toBe('203.0.113.1');
  });

  it('falls back to x-real-ip and local defaults', () => {
    const realIpRequest = new NextRequest('https://example.com', {
      headers: { 'x-real-ip': '198.51.100.10' },
    });
    const fallbackRequest = new NextRequest('https://example.com');

    expect(getClientIp(realIpRequest)).toBe('198.51.100.10');
    expect(getClientIp(fallbackRequest)).toBe('127.0.0.1');
  });
});

describe('logger', () => {
  it('writes structured JSON log entries', () => {
    const spy = vi.spyOn(console, 'info').mockImplementation(() => undefined);

    logger.info('Test event', {
      requestId: 'req_123',
      route: '/api/test',
      metadata: { ok: true },
    });

    const payload = JSON.parse(spy.mock.calls[0][0] as string);
    expect(payload).toMatchObject({
      level: 'info',
      message: 'Test event',
      service: 'cielitoswrld',
      requestId: 'req_123',
      route: '/api/test',
      metadata: { ok: true },
    });
    expect(payload.timestamp).toEqual(expect.any(String));

    spy.mockRestore();
  });

  it('normalizes error metadata without stack traces', () => {
    expect(getErrorMetadata(new Error('Nope'))).toEqual({
      errorName: 'Error',
      errorMessage: 'Nope',
    });
  });

  it('handles warning and error log levels', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    logger.warn('Warning event');
    logger.error('Error event');

    expect(JSON.parse(warnSpy.mock.calls[0][0] as string)).toMatchObject({ level: 'warn' });
    expect(JSON.parse(errorSpy.mock.calls[0][0] as string)).toMatchObject({ level: 'error' });

    warnSpy.mockRestore();
    errorSpy.mockRestore();
  });

  it('normalizes unknown thrown values', () => {
    expect(getErrorMetadata('nope')).toEqual({ errorMessage: 'Unknown error' });
  });
});
