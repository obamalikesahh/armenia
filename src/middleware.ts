import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Basic in-memory store for rate limiting
const rateLimit = new Map<string, { count: number; lastReset: number }>();

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 100; // 100 requests per window

const BLOCKED_USER_AGENTS = [
  'python-requests',
  'curl',
  'wget',
  'scrapy',
  'bot',
  'crawler',
  'spider',
];

export function middleware(request: NextRequest) {
  // 1. Bot Protection
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';
  
  if (BLOCKED_USER_AGENTS.some(bot => userAgent.includes(bot))) {
    return new NextResponse('Access denied', { status: 403 });
  }

  // 2. Basic IP Rate Limiting
  const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'unknown';
  
  if (ip !== 'unknown') {
    const now = Date.now();
    const windowStart = now - RATE_LIMIT_WINDOW_MS;
    
    // Clean up old entries
    for (const [key, value] of rateLimit.entries()) {
      if (value.lastReset < windowStart) {
        rateLimit.delete(key);
      }
    }

    const currentLimit = rateLimit.get(ip) || { count: 0, lastReset: now };

    if (currentLimit.count >= RATE_LIMIT_MAX_REQUESTS) {
      return new NextResponse('Too many requests, please try again later.', { status: 429 });
    }

    currentLimit.count += 1;
    rateLimit.set(ip, currentLimit);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
