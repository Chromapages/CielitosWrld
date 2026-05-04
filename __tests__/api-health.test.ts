import { afterEach, describe, expect, it, vi } from 'vitest';

import { GET } from '@/app/api/health/route';

describe('/api/health', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('returns stable health status without secrets', async () => {
    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toMatchObject({
      status: 'ok',
      service: 'cielitoswrld',
      dependencies: {
        sanity: expect.stringMatching(/configured|missing/),
        resend: expect.stringMatching(/configured|missing/),
        upstash: expect.stringMatching(/configured|missing/),
      },
    });
    expect(body.timestamp).toEqual(expect.any(String));
    expect(JSON.stringify(body)).not.toContain('TOKEN');
  });

  it('reports configured dependencies when required env vars exist', async () => {
    vi.stubEnv('NEXT_PUBLIC_SANITY_PROJECT_ID', 'project');
    vi.stubEnv('NEXT_PUBLIC_SANITY_DATASET', 'production');
    vi.stubEnv('RESEND_API_KEY', 'resend-key');
    vi.stubEnv('UPSTASH_REDIS_REST_URL', 'https://upstash.example');
    vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', 'upstash-token');

    const response = await GET();
    const body = await response.json();

    expect(body.dependencies).toEqual({
      sanity: 'configured',
      resend: 'configured',
      upstash: 'configured',
    });
  });
});
