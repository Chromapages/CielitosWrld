import { NextRequest } from 'next/server';
import { afterEach, describe, expect, it, vi } from 'vitest';

const fetchMock = vi.fn();

vi.mock('@/sanity/lib/client', () => ({
  client: {
    fetch: fetchMock,
  },
}));

describe('/api/search', () => {
  afterEach(() => {
    fetchMock.mockReset();
  });

  it('returns an empty result for short queries', async () => {
    const { GET } = await import('@/app/api/search/route');
    const response = await GET(new NextRequest('https://example.com/api/search?q=a'));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ posts: [] });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('fetches typed search results for valid queries', async () => {
    fetchMock.mockResolvedValueOnce([{ _id: 'post-1', title: 'Hello', slug: 'hello' }]);

    const { GET } = await import('@/app/api/search/route');
    const response = await GET(new NextRequest('https://example.com/api/search?q=hello'));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      posts: [{ _id: 'post-1', title: 'Hello', slug: 'hello' }],
    });
    expect(fetchMock).toHaveBeenCalledWith(expect.any(String), { query: 'hello' });
  });

  it('returns a safe error response when Sanity fails', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    fetchMock.mockRejectedValueOnce(new Error('Sanity unavailable'));

    const { GET } = await import('@/app/api/search/route');
    const response = await GET(new NextRequest('https://example.com/api/search?q=hello'));

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ posts: [], error: 'Search failed' });
  });
});
