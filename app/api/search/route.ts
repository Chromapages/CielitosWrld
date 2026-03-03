import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  if (!query || query.length < 2) {
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

    const posts = await client.fetch(searchQuery, { query });

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ posts: [], error: 'Search failed' }, { status: 500 });
  }
}
