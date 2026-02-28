import { env } from "~/lib/env.server";

/**
 * Health Check API
 * Tests service environment configuration
 * GET /api/health
 */
export async function loader() {
  return Response.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
    publicUrl: env.PUBLIC_URL,
    waitlist: {
      provider: "bareuptime",
      endpoint: env.WAITLIST_API_URL,
      source: env.WAITLIST_SRC,
    },
    message: "✅ Service healthy",
  }, {
    status: 200,
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
}
