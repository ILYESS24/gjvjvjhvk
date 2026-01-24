/**
 * Simple in-memory rate limiter for API routes
 * For production with multiple instances, use Redis-based solution like @upstash/ratelimit
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up expired entries every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
      if (now > entry.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

interface RateLimitConfig {
  /** Maximum number of requests allowed in the window */
  limit: number;
  /** Time window in seconds */
  windowSeconds: number;
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
  reset: number;
}

/**
 * Check if a request should be rate limited
 * @param identifier - Unique identifier for the client (e.g., user ID or IP)
 * @param config - Rate limit configuration
 * @returns Result indicating if the request is allowed
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  const now = Date.now();
  const key = identifier;
  const entry = rateLimitStore.get(key);

  // If no entry or expired, create new entry
  if (!entry || now > entry.resetTime) {
    const resetTime = now + config.windowSeconds * 1000;
    rateLimitStore.set(key, { count: 1, resetTime });
    return {
      success: true,
      remaining: config.limit - 1,
      reset: resetTime,
    };
  }

  // Check if limit exceeded
  if (entry.count >= config.limit) {
    return {
      success: false,
      remaining: 0,
      reset: entry.resetTime,
    };
  }

  // Increment count
  entry.count++;
  return {
    success: true,
    remaining: config.limit - entry.count,
    reset: entry.resetTime,
  };
}

/**
 * Create a rate limit response with appropriate headers
 */
export function rateLimitResponse(reset: number): Response {
  const retryAfter = Math.ceil((reset - Date.now()) / 1000);
  return new Response("Too many requests. Please try again later.", {
    status: 429,
    headers: {
      "Retry-After": String(retryAfter),
      "X-RateLimit-Reset": String(reset),
    },
  });
}
