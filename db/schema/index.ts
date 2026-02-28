import { pgTable, text, timestamp, integer, jsonb, boolean, uniqueIndex, decimal, serial } from 'drizzle-orm/pg-core';

// ==================================
// EXAMPLE MODELS
// ==================================
// Uncomment and modify these models based on your needs

// Example: Users table
// export const users = pgTable('users', {
//   id: serial('id').primaryKey(),
//   email: text('email').notNull().unique(),
//   name: text('name'),
//   createdAt: timestamp('created_at').defaultNow().notNull(),
//   updatedAt: timestamp('updated_at').defaultNow().notNull(),
// }, (table) => ({
//   emailIdx: uniqueIndex('email_idx').on(table.email),
// }));

// Example: Waitlist entries table
// export const waitlistEntries = pgTable('waitlist_entries', {
//   id: serial('id').primaryKey(),
//   email: text('email').notNull().unique(),
//   name: text('name'),
//   position: integer('position').notNull(),
//   referralCode: text('referral_code'),
//   metadata: jsonb('metadata'),
//   isActive: boolean('is_active').default(true).notNull(),
//   createdAt: timestamp('created_at').defaultNow().notNull(),
// }, (table) => ({
//   emailIdx: uniqueIndex('waitlist_email_idx').on(table.email),
//   positionIdx: uniqueIndex('waitlist_position_idx').on(table.position),
// }));

// Example: Products table with decimal pricing
// export const products = pgTable('products', {
//   id: serial('id').primaryKey(),
//   name: text('name').notNull(),
//   description: text('description'),
//   price: decimal('price', { precision: 10, scale: 2 }).notNull(),
//   stock: integer('stock').default(0).notNull(),
//   isActive: boolean('is_active').default(true).notNull(),
//   metadata: jsonb('metadata'),
//   createdAt: timestamp('created_at').defaultNow().notNull(),
//   updatedAt: timestamp('updated_at').defaultNow().notNull(),
// });
