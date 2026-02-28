import type { LoaderFunctionArgs } from "@remix-run/node";
import { db } from "~/lib/db.server";
import { env } from "~/lib/env.server";
import { sql } from "drizzle-orm";

/**
 * Health Check API
 * Tests database connection and environment configuration
 * GET /api/health
 */
export async function loader() {
  const startTime = Date.now();

  // Check if database is configured
  if (!db) {
    return Response.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      environment: env.NODE_ENV,
      publicUrl: env.PUBLIC_URL,
      database: {
        configured: false,
        message: "Database not configured (DATABASE_URL not set)",
      },
      message: "⚠️ Service running without database",
    }, {
      status: 200,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  }

  try {
    // Run a simple query to verify database is actually working
    await db.execute(sql`SELECT 1 as connected`);

    const responseTime = Date.now() - startTime;

    return Response.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      environment: env.NODE_ENV,
      publicUrl: env.PUBLIC_URL,
      database: {
        configured: true,
        connected: true,
        responseTimeMs: responseTime,
        orm: "Drizzle ORM",
      },
      message: "✅ Database connection successful!",
    }, {
      status: 200,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    console.error("❌ Database connection failed:", error);

    return Response.json({
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      environment: env.NODE_ENV,
      publicUrl: env.PUBLIC_URL,
      database: {
        configured: true,
        connected: false,
        error: errorMessage,
        orm: "Drizzle ORM",
      },
      message: "❌ Database connection failed",
      troubleshooting: {
        hint: "Check your DATABASE_URL in .env file",
        expectedFormat: "postgresql://user:password@host:port/database?schema=public",
        commonIssues: [
          "Database server is not running",
          "Incorrect credentials in DATABASE_URL",
          "Database does not exist",
          "Network/firewall blocking connection",
        ],
      },
    }, {
      status: 503,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  }
}
