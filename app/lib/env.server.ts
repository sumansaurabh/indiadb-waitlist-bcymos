/**
 * Environment Variable Utilities
 * 
 * This file provides type-safe access to environment variables.
 * All server-side environment variables should be accessed through these utilities.
 */

/**
 * Get an environment variable with validation
 * @throws Error if the variable is required but not set
 */
export function getEnv(key: string, required = false): string | undefined {
  const value = process.env[key];

  if (required && !value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}

/**
 * Get a required environment variable
 * @throws Error if the variable is not set
 */
export function getRequiredEnv(key: string): string {
  const value = getEnv(key, true);
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

/**
 * Server Environment Variables
 * Add your environment variables here for type safety
 */
export const env = {
  // Application
  NODE_ENV: getEnv("NODE_ENV") || "development",
  PORT: getEnv("PORT") || "5173",
  PUBLIC_URL: getEnv("PUBLIC_URL") || "http://localhost:5173",

  // Database (optional - only needed if using database features)
  DATABASE_URL: getEnv("DATABASE_URL"),
  DIRECT_DATABASE_URL: getEnv("DIRECT_DATABASE_URL"),

  // Security
  SESSION_SECRET: getEnv("SESSION_SECRET") || "dev-secret-change-in-production",

  // Add your API keys and secrets here
  // Example:
  // OPENAI_API_KEY: getEnv("OPENAI_API_KEY"),
  // STRIPE_SECRET_KEY: getEnv("STRIPE_SECRET_KEY"),
} as const;

/**
 * Client Environment Variables
 * These are exposed to the browser via the VITE_ prefix
 * Only use for non-sensitive configuration
 */
export const clientEnv = {
  // Example:
  // API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  // ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === "true",
} as const;
