# Database Setup Guide - Drizzle ORM

This project uses **Drizzle ORM** with **PostgreSQL** for database management.

## Quick Start

### 1. Setup Environment Variables
```bash
# Copy the example file
cp .env.example .env

# Edit .env and set your database URL
# DATABASE_URL=postgresql://user:password@localhost:5432/database_name
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Define Your Schema
```typescript
// db/schema/index.ts
import { pgTable, text, timestamp, serial } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
```

### 4. Generate and Run Migrations
```bash
# Generate migration SQL
bun run db:generate

# Apply migrations
bun run db:migrate
```

### 5. Seed Database (Optional)
```bash
bun run db:seed
```

## Database Commands

| Command | Description | When to Use |
|---------|-------------|-------------|
| `bun run db:generate` | Generate SQL migrations | After schema changes |
| `bun run db:push` | Push schema directly | Quick prototyping (dev only) |
| `bun run db:migrate` | Run migrations | Apply migrations to database |
| `bun run db:studio` | Open Drizzle Studio | Database GUI browser |
| `bun run db:seed` | Run seed script | Initial data setup |
| `bun run db:test` | Test connection | Verify database works |

## Schema Definition

### Basic Table
```typescript
import { pgTable, text, serial, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
```

### With All Column Types
```typescript
import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  boolean,
  timestamp,
  jsonb,
  decimal,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  sku: varchar('sku', { length: 50 }).unique(),
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  stock: integer('stock').default(0).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  metadata: jsonb('metadata').$type<{ tags: string[] }>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  skuIdx: uniqueIndex('sku_idx').on(table.sku),
}));
```

## Using Drizzle in Routes

```typescript
// app/routes/api.users.tsx
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { db } from "~/lib/db.server";
import { users } from "~/../../db/schema";
import { eq } from "drizzle-orm";

export async function loader() {
  const allUsers = await db.select().from(users);
  return Response.json({ users: allUsers });
}

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.json();
  
  const newUser = await db.insert(users).values({
    email: body.email,
    name: body.name,
  }).returning();

  return Response.json({ user: newUser[0] }, { status: 201 });
}
```

## Common Operations

### Insert
```typescript
// Single
const user = await db.insert(users).values({
  email: "user@example.com",
  name: "John Doe",
}).returning();

// Multiple
const users = await db.insert(users).values([
  { email: "user1@example.com", name: "User 1" },
  { email: "user2@example.com", name: "User 2" },
]).returning();
```

### Select
```typescript
import { eq, and, or, like, gt, desc } from "drizzle-orm";

// All
const all = await db.select().from(users);

// With condition
const user = await db
  .select()
  .from(users)
  .where(eq(users.email, "user@example.com"));

// Multiple conditions
const filtered = await db
  .select()
  .from(users)
  .where(and(
    eq(users.isActive, true),
    gt(users.age, 18)
  ));

// Order and limit
const recent = await db
  .select()
  .from(users)
  .orderBy(desc(users.createdAt))
  .limit(10);
```

### Update
```typescript
const updated = await db
  .update(users)
  .set({ name: "Jane Doe" })
  .where(eq(users.id, 1))
  .returning();
```

### Delete
```typescript
await db
  .delete(users)
  .where(eq(users.id, 1));
```

## Migration Best Practices

### ✅ DO
- Generate migrations for every schema change
- Review generated SQL before applying
- Commit migration files to Git
- Test migrations on staging first

### ❌ DON'T
- Don't use `db:push` in production
- Don't modify existing migration files
- Don't delete migration files

## Troubleshooting

### Connection Test
```bash
bun run db:test
```

### Reset Migrations (Dev Only)
```bash
rm -rf db/migrations
bun run db:generate
bun run db:migrate
```

## Resources

- [Drizzle ORM Documentation](https://orm.drizzle.team)
- [Database Management Guide](../.cursor/skills/database-management.md)
- [Environment Setup Guide](../docs/ENVIRONMENT_SETUP.md)
