# Database Management with Drizzle ORM & PostgreSQL

## Overview
This project uses **Drizzle ORM** with **PostgreSQL** for database management. All database operations are type-safe with excellent TypeScript support and a SQL-like query builder.

## Database Configuration

### Environment Variables
Database connection is configured through `.env` file:

```env
DATABASE_URL=postgresql://user:password@host:port/database
```

**Format**: `postgresql://[user]:[password]@[host]:[port]/[database]`

### Drizzle Configuration
- **Schema**: `db/schema/index.ts` (defines tables)
- **Config**: `drizzle.config.ts` (Drizzle Kit configuration)
- **Migrations**: `db/migrations/` (SQL migration files)

## Available Scripts

### Generate Migration
```bash
bun run db:generate
# or: npx drizzle-kit generate
```
**When to use**: After modifying `db/schema/index.ts` to generate SQL migrations

### Push Schema (Development)
```bash
bun run db:push
# or: npx drizzle-kit push --force
```
**When to use**: Quick prototyping, pushes schema directly without migrations
**⚠️ Caution**: Can cause data loss, use only in development
**Note**: The `--force` flag skips interactive confirmation (required for automation/AI)
**Prerequisite**: Requires `DATABASE_URL` in `.env` file

### Run Migrations
```bash
bun run db:migrate
# or: npx drizzle-kit migrate
```
**When to use**: Apply generated migrations to database

### Drizzle Studio (GUI)
```bash
bun run db:studio
# or: npx drizzle-kit studio
```
**When to use**: Visual database browser (like Studio)

### Seed Database
```bash
bun run db:seed
# or: tsx db/seed.ts
```
**When to use**: Populate database with initial/test data

### Test Connection
```bash
bun run db:test
# or: tsx scripts/test-db-connection.ts
```
**When to use**: Verify database connection works

## Schema Definition

### Defining Tables
```typescript
// db/schema/index.ts
import { pgTable, text, timestamp, integer, jsonb, boolean, uniqueIndex, decimal, serial } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  age: integer('age'),
  isActive: boolean('is_active').default(true).notNull(),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  emailIdx: uniqueIndex('email_idx').on(table.email),
}));
```

### Available Column Types
```typescript
import { 
  pgTable, 
  serial,      // Auto-increment integer
  integer,     // Integer
  text,        // Text/string
  varchar,     // Variable character (max length)
  boolean,     // Boolean
  timestamp,   // Date/time
  date,        // Date only
  time,        // Time only
  jsonb,       // JSON data
  decimal,     // Decimal numbers
  real,        // Floating point
  uuid,        // UUID
  bytea,       // Binary data
} from 'drizzle-orm/pg-core';

// Example usage
export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  sku: varchar('sku', { length: 50 }).unique(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  stock: integer('stock').default(0),
  isActive: boolean('is_active').default(true),
  metadata: jsonb('metadata').$type<{ tags: string[] }>(),
  createdAt: timestamp('created_at').defaultNow(),
});
```


### Defining Enums
Use Enums for fixed sets of values (e.g., User Roles, Status).

```typescript
import { pgTable, pgEnum, text, serial } from 'drizzle-orm/pg-core';

// 1. Define the Enum (must be exported)
export const roleEnum = pgEnum('role', ['admin', 'user', 'guest']);

// 2. Use in Table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name'),
  // Usage:
  role: roleEnum('role').default('user').notNull(),
});
```

### 3. Add "Cascading Deletes"

```typescript
import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  // UPDATED: Added cascade delete
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }), 
});

// Define relations
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const postsRelations = relations(posts, ({ one }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
}));
```

### Relationships
```typescript
import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  userId: integer('user_id').notNull().references(() => users.id),
});

// Define relations
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const postsRelations = relations(posts, ({ one }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
}));
```

## Using Drizzle in Code

### Import and Use
```typescript
// app/lib/db.server.ts - Already configured
// NOTE: Prefer static imports for Drizzle and your schema in server modules
// (e.g., `app/lib/db.server.ts`) so bundlers include schema definitions and
// avoid runtime issues caused by dynamic import paths in production.
import { db } from "~/lib/db.server";
import { users } from "~/../../db/schema";

// In your route/action
export async function loader() {
  const allUsers = await db.select().from(users);
  return Response.json({ users: allUsers });
}
```

### CRUD Operations

#### Create (Insert)
```typescript
import { db } from "~/lib/db.server";
import { users } from "~/../../db/schema";

// Insert single
const newUser = await db.insert(users).values({
  email: "user@example.com",
  name: "John Doe",
}).returning();

// Insert multiple
const newUsers = await db.insert(users).values([
  { email: "user1@example.com", name: "User 1" },
  { email: "user2@example.com", name: "User 2" },
]).returning();
```

#### Read (Select)
```typescript
import { db } from "~/lib/db.server";
import { users } from "~/../../db/schema";
import { eq, and, or, like, gt, lt, desc } from "drizzle-orm";

// Select all
const allUsers = await db.select().from(users);

// Select with conditions
const user = await db
  .select()
  .from(users)
  .where(eq(users.email, "user@example.com"));

// Multiple conditions
const activeUsers = await db
  .select()
  .from(users)
  .where(and(
    eq(users.isActive, true),
    gt(users.age, 18)
  ));

// Or conditions
const results = await db
  .select()
  .from(users)
  .where(or(
    eq(users.email, "admin@example.com"),
    eq(users.role, "admin")
  ));

// Like search
const searched = await db
  .select()
  .from(users)
  .where(like(users.name, "%John%"));

// Order and limit
const recent = await db
  .select()
  .from(users)
  .orderBy(desc(users.createdAt))
  .limit(10)
  .offset(0);

// Select specific fields
const emails = await db
  .select({ 
    email: users.email, 
    name: users.name 
  })
  .from(users);
```

#### Relational Queries (The `db.query` API)
**Preferred for**: Fetching nested data (e.g., User + Posts) without writing manual JOINs.

```typescript
import { db } from "~/lib/db.server";
import { users } from "~/../../db/schema";
import { eq } from "drizzle-orm";

// 1. Get user with their posts (One-to-Many)
const userWithPosts = await db.query.users.findFirst({
  where: eq(users.id, 1),
  with: {
    posts: true, // Fetch all columns from posts
  },
});

// 2. partial selection (specific columns only)
const userProfile = await db.query.users.findMany({
  columns: {
    id: true,
    name: true,
  },
  with: {
    posts: {
      columns: {
        title: true,
      },
      limit: 3, // Limit nested results
    },
  },
});

#### Update
```typescript
import { db } from "~/lib/db.server";
import { users } from "~/../../db/schema";
import { eq } from "drizzle-orm";

// Update single
const updated = await db
  .update(users)
  .set({ name: "Jane Doe" })
  .where(eq(users.id, 1))
  .returning();

// Update multiple fields
const updated2 = await db
  .update(users)
  .set({ 
    name: "John Smith",
    updatedAt: new Date(),
  })
  .where(eq(users.email, "user@example.com"))
  .returning();
```

#### Delete
```typescript
import { db } from "~/lib/db.server";
import { users } from "~/../../db/schema";
import { eq } from "drizzle-orm";

// Delete single
await db
  .delete(users)
  .where(eq(users.id, 1));

// Delete with condition
await db
  .delete(users)
  .where(eq(users.isActive, false));
```

### Transactions
```typescript
import { db } from "~/lib/db.server";
import { users, posts } from "~/../../db/schema";

const result = await db.transaction(async (tx) => {
  const newUser = await tx.insert(users).values({
    email: "user@example.com",
    name: "John Doe",
  }).returning();

  await tx.insert(posts).values({
    title: "First Post",
    userId: newUser[0].id,
  });

  return newUser[0];
});
```

### Raw SQL
```typescript
import { db } from "~/lib/db.server";
import { sql } from "drizzle-orm";

// Execute raw SQL
const result = await db.execute(sql`
  SELECT * FROM users WHERE email = ${email}
`);

// With parameters
const users = await db.execute(sql`
  SELECT * FROM users 
  WHERE age > ${minAge} 
  AND created_at > ${date}
`);
```

## Migration Workflow

### 1. Development: Creating a New Table

```typescript
// db/schema/index.ts
export const waitlistEntries = pgTable('waitlist_entries', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  position: integer('position').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  emailIdx: uniqueIndex('email_idx').on(table.email),
}));
```

**Steps**:
```bash
# 1. Generate migration
bun run db:generate

# 2. Review generated SQL in db/migrations/
# 3. Apply migration
bun run db:migrate
```

### 2. Development: Modifying Existing Table

```typescript
// Adding a new field
export const waitlistEntries = pgTable('waitlist_entries', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  phone: text('phone'),  // NEW FIELD
  position: integer('position').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
```

**Steps**:
```bash
# 1. Generate migration
bun run db:generate

# 2. Review generated SQL
# 3. Apply migration
bun run db:migrate
```

### 3. Quick Prototyping (No Migrations)

```bash
# Push schema directly (dev only!) - non-interactive with --force flag
bun run db:push

# Or manually:
npx drizzle-kit push --force
```

### Relational Queries (Preferred for Nested Data)
Use the `db.query` API for fetching related data without manual joins.

```typescript
// Get all users with their posts
const usersWithPosts = await db.query.users.findMany({
  with: {
    posts: true, // Fetch all fields from posts
  },
});

// Get specific user with partial post data
const user = await db.query.users.findFirst({
  where: eq(users.id, 1),
  with: {
    posts: {
      columns: {
        title: true,
      },
      limit: 5,
    },
  },
});

## Best Practices

### ✅ DO
- **Use typed schemas** for type safety
- **Generate migrations** for all changes (`db:generate`)
- **Review SQL** before applying migrations
- **Use transactions** for related operations
- **Add indexes** for frequently queried fields
- **Use `.returning()`** to get inserted/updated data
- **Commit migrations** to version control
- **Use Drizzle ORM query builder** instead of raw SQL when possible
- **Convert Date objects to ISO strings** when using in raw SQL queries

### ❌ DON'T
- **Don't use `db:push`** in production
- **Don't modify** existing migration files
- **Don't hardcode** database credentials
- **Don't skip** generating migrations in production
- **Don't pass JavaScript Date objects directly** to raw SQL queries
- **Don't use raw SQL** when Drizzle ORM query builder can handle the query

### Date Handling in Queries

**CRITICAL**: When using JavaScript Date objects in SQL queries, always convert to ISO strings:

#### ❌ WRONG - Will cause PostgreSQL errors
```typescript
import { sql } from "drizzle-orm";

const user = { createdAt: new Date(), referralCount: 5 };

// BAD: Date object passed directly
const result = await db.execute(sql`
  SELECT count(*) as rank 
  FROM ${waitlistEntries} 
  WHERE ${waitlistEntries.createdAt} < ${user.createdAt}
`);
// Error: Failed query - params: Fri Jan 23 2026 17:05:47 GMT+0530 (India Standard Time)
```

#### ✅ CORRECT - Convert Date to ISO string
```typescript
import { sql } from "drizzle-orm";

const user = { createdAt: new Date(), referralCount: 5 };

// GOOD: Date converted to ISO string
const result = await db.execute(sql`
  SELECT count(*) as rank 
  FROM ${waitlistEntries} 
  WHERE ${waitlistEntries.createdAt} < ${user.createdAt.toISOString()}
`);
```

#### ✅ BETTER - Use Drizzle ORM query builder instead
```typescript
import { lt, count } from "drizzle-orm";

const user = { createdAt: new Date(), referralCount: 5 };

// BEST: Use ORM - handles Date conversion automatically
const result = await db
  .select({ rank: count() })
  .from(waitlistEntries)
  .where(lt(waitlistEntries.createdAt, user.createdAt));
```

### When to Use Raw SQL vs ORM

#### Prefer Drizzle ORM Query Builder For:
- Simple CRUD operations
- Standard WHERE conditions (eq, gt, lt, like, etc.)
- JOINs and relations
- Ordering, limiting, grouping
- Most common queries

**Why?** Type-safe, handles Date conversions automatically, less error-prone

#### Use Raw SQL Only For:
- Complex aggregations ORM doesn't support well
- Performance-critical queries with specific optimizations
- Database-specific features not in ORM
- Complex window functions or CTEs

**Remember:** If using raw SQL with Dates, always use `.toISOString()`

## Example: Complete API Route

```typescript
// app/routes/api.users.tsx
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { db } from "~/lib/db.server";
import { users } from "~/../../db/schema";
import { eq } from "drizzle-orm";

export async function loader({ request }: LoaderFunctionArgs) {
  const allUsers = await db.select().from(users);
  return Response.json({ users: allUsers });
}

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return Response.json(
      { error: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    const body = await request.json();

    // Validate
    if (!body.email) {
      return Response.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Create user
    const newUser = await db.insert(users).values({
      email: body.email,
      name: body.name,
    }).returning();

    return Response.json(
      { success: true, user: newUser[0] },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error creating user:", error);

    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

## Troubleshooting

### Migration Issues
```bash
# Check what migrations exist
ls db/migrations/

# Reset and regenerate (dev only!)
rm -rf db/migrations
bun run db:generate
bun run db:migrate
```

### Type Issues
```bash
# Regenerate types
bun run db:generate
```

### Connection Issues
```bash
# Test connection
bun run db:test
```

## Resources

- [Drizzle ORM Docs](https://orm.drizzle.team/docs/overview)
- [Drizzle Kit Docs](https://orm.drizzle.team/kit-docs/overview)
- [SQL Operators](https://orm.drizzle.team/docs/operators)
- [Query Examples](https://orm.drizzle.team/docs/crud)
