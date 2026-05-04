import { NextResponse } from 'next/server';

type DependencyStatus = 'configured' | 'missing';

function dependencyStatus(...values: Array<string | undefined>): DependencyStatus {
  return values.every(Boolean) ? 'configured' : 'missing';
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'cielitoswrld',
    timestamp: new Date().toISOString(),
    dependencies: {
      sanity: dependencyStatus(
        process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        process.env.NEXT_PUBLIC_SANITY_DATASET,
      ),
      resend: dependencyStatus(process.env.RESEND_API_KEY),
      upstash: dependencyStatus(
        process.env.UPSTASH_REDIS_REST_URL,
        process.env.UPSTASH_REDIS_REST_TOKEN,
      ),
    },
  });
}
