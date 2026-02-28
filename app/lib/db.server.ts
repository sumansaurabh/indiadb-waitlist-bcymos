import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as dbSchema from "../../db/schema";

// Get DATABASE_URL from environment
const connectionString = process.env.DATABASE_URL;

// Database instance - will be null if not configured
export let db: PostgresJsDatabase<Record<string, never>> | null = null;

/**
 * Initialize database connection
 * This is called lazily when db is first accessed
 */
async function initializeDb() {
  if (!connectionString) {
    return null;
  }

  try {
    // Use static imports to ensure bundlers include the schema and driver
    // `dbSchema` may be an empty object if no tables are defined
    const schema = dbSchema && Object.keys(dbSchema).length ? dbSchema : {};

    // Create postgres client
    const client = postgres(connectionString, {
      max: 10, // Max connections in pool
      idle_timeout: 20,
      connect_timeout: 10,
    });

    // Create drizzle instance
    db = drizzle(client, { schema });
    console.log("✓ Database connection initialized");
    return db;
  } catch (error) {
    console.error("✗ Database initialization failed:", error);
    return null;
  }
}

// Initialize on module load (no await - let it initialize in background)
if (connectionString) {
  initializeDb().catch((error) => {
    console.error("Failed to initialize database:", error);
  });
} else {
  console.warn("⚠ DATABASE_URL not set - database features disabled");
}

/**
 * Get database instance, ensuring it's initialized
 * Use this in routes that require database access
 */
export async function getDb() {
  if (db) {
    return db;
  }

  if (!connectionString) {
    throw new Error(
      "Database is not configured. Please set DATABASE_URL environment variable."
    );
  }

  // Try to initialize if not already done
  return await initializeDb();
}

/**
 * Helper to ensure database is available (sync version)
 * Use this in routes that require database access
 * Note: Assumes db is already initialized
 */
export function requireDb() {
  if (!db) {
    throw new Error(
      "Database is not configured or not yet initialized. Please set DATABASE_URL environment variable."
    );
  }
  return db;
}
