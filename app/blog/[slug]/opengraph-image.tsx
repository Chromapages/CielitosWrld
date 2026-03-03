import { ImageResponse } from 'next/og';
import { client } from '@/sanity/lib/client';
import { POST_BY_SLUG_QUERY } from '@/sanity/lib/queries';

export const alt = 'Cielitos Wrld blog post preview';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await client.fetch<any>(POST_BY_SLUG_QUERY, { slug }, { next: { revalidate: 60 } });

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0f110c 0%, #2e2015 55%, #824625 100%)',
          color: '#f8f3e9',
          padding: '64px',
        }}
      >
        <div style={{ fontSize: 30, letterSpacing: 2, textTransform: 'uppercase', opacity: 0.9 }}>
          Cielitos Wrld
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontSize: 18, letterSpacing: 2, textTransform: 'uppercase', color: '#f2b47d' }}>Blog Post</div>
          <div style={{ fontSize: 66, lineHeight: 1.08, fontWeight: 700, maxWidth: 980 }}>
            {post?.title || 'Visual stories and late night thoughts'}
          </div>
          <div style={{ fontSize: 28, opacity: 0.8, maxWidth: 900 }}>
            {post?.excerpt || 'Photography, process, and storytelling from Cielito.'}
          </div>
        </div>
      </div>
    ),
    size
  );
}
