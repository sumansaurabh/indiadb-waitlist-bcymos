import { db } from "../app/lib/db.server";

/**
 * Database Seed Script
 * Run with: pnpm run db:seed
 */

async function seed() {
  console.log("🌱 Starting database seed...");

  try {
    // Add your seed data here
    // Example:
    /*
    const { users } = await import("../db/schema");
    
    await db.insert(users).values([
      {
        email: "admin@example.com",
        name: "Admin User",
      },
    ]);
    
    console.log("✅ Created admin user");
    */

    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
  
  process.exit(0);
}

seed();
