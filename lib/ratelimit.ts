import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

let contactRateLimit: Ratelimit | null = null;

export function hasRateLimitConfig(): boolean {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

export function getContactRateLimit(): Ratelimit {
  if (!hasRateLimitConfig()) {
    throw new Error('Upstash rate limit environment variables are not configured');
  }

  contactRateLimit ??= new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, '60 s'),
    analytics: true,
    prefix: '@upstash/ratelimit/contact',
  });

  return contactRateLimit;
}
