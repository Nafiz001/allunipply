import { NextRequest } from "next/server";

type RateLimitOptions = {
  windowMs: number;
  maxRequests: number;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type RateLimitResult = {
  success: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
  retryAfterSeconds: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

function getClientIdentifier(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for") || "";
  const realIp = request.headers.get("x-real-ip") || "";
  const ip = forwardedFor.split(",")[0]?.trim() || realIp.trim() || "unknown";
  const userAgent = request.headers.get("user-agent") || "unknown";

  return `${ip}:${userAgent}`;
}

export function checkRateLimit(
  request: NextRequest,
  keyPrefix: string,
  options: RateLimitOptions,
): RateLimitResult {
  const now = Date.now();
  const clientId = getClientIdentifier(request);
  const key = `${keyPrefix}:${clientId}`;

  const existing = rateLimitStore.get(key);

  if (!existing || now > existing.resetAt) {
    const resetAt = now + options.windowMs;
    rateLimitStore.set(key, { count: 1, resetAt });

    return {
      success: true,
      limit: options.maxRequests,
      remaining: Math.max(0, options.maxRequests - 1),
      resetAt,
      retryAfterSeconds: Math.ceil(options.windowMs / 1000),
    };
  }

  const nextCount = existing.count + 1;
  existing.count = nextCount;

  const remaining = Math.max(0, options.maxRequests - nextCount);
  const retryAfterSeconds = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));

  return {
    success: nextCount <= options.maxRequests,
    limit: options.maxRequests,
    remaining,
    resetAt: existing.resetAt,
    retryAfterSeconds,
  };
}

export function getRateLimitHeaders(result: RateLimitResult): HeadersInit {
  return {
    "X-RateLimit-Limit": String(result.limit),
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": String(Math.ceil(result.resetAt / 1000)),
    "Retry-After": String(result.retryAfterSeconds),
  };
}
