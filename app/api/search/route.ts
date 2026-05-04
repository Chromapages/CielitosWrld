import { NextRequest, NextResponse } from 'next/server';
import type { QueryParams } from 'next-sanity';
import { z } from 'zod';

import { getErrorMetadata, logger } from '@/lib/logger';
import { getRequestId } from '@/lib/request';
import { client } from '@/sanity/lib/client';

const searchParamsSchema = z.object({
  q: z.string().trim().min(2).max(100),
});

export type SearchPost = {
  _id: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  postType?: string;
};

export async function GET(request: NextRequest) {
  const route = '/api/search';
  const requestId = getRequestId(request);
  const params = searchParamsSchema.safeParse({
    q: request.nextUrl.searchParams.get('q'),
  });

  if (!params.success) {
    return NextResponse.json({ posts: [] });
  }

  try {
    const searchQuery = `*[_type == "post" && (
      title match $query + "*" ||
      excerpt match $query + "*" ||
      pt::text(body) match $query + "*"
    )][0...10] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      postType
    }`;

    const queryParams = { query: params.data.q } as unknown as QueryParams;
    const posts = await client.fetch<SearchPost[]>(searchQuery, queryParams);

    return NextResponse.json({ posts });
  } catch (error) {
    logger.error('Search error', {
      requestId,
      route,
      metadata: getErrorMetadata(error),
    });

    return NextResponse.json({ posts: [], error: 'Search failed' }, { status: 500 });
  }
}
