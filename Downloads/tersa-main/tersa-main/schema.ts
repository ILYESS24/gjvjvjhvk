import { sql } from "drizzle-orm";
import {
  boolean,
  index,
  json,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

const uuid = sql`uuid_generate_v4()`;

/**
 * Projects table - stores user's AI workflow projects
 * The content field stores the ReactFlow canvas state as JSON
 */
export const projects = pgTable(
  "project",
  {
    id: text("id").primaryKey().default(uuid).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    transcriptionModel: varchar("transcription_model", { length: 100 }).notNull(),
    visionModel: varchar("vision_model", { length: 100 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
    content: json("content").$type<{
      nodes: unknown[];
      edges: unknown[];
      viewport?: { x: number; y: number; zoom: number };
    }>(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    image: varchar("image", { length: 2048 }), // URL can be long
    members: text("members").array(),
    welcomeProject: boolean("demo_project").notNull().default(false),
  },
  (table) => [
    // Index for faster user lookups
    index("project_user_id_idx").on(table.userId),
    // Index for faster recent projects queries
    index("project_updated_at_idx").on(table.updatedAt),
    // Composite index for common query pattern
    index("project_user_updated_idx").on(table.userId, table.updatedAt),
  ]
);

/**
 * Profile table - stores user subscription and metadata
 */
export const profile = pgTable(
  "profile",
  {
    id: text("id").primaryKey().notNull(),
    customerId: text("customer_id"),
    subscriptionId: text("subscription_id"),
    productId: text("product_id"),
    onboardedAt: timestamp("onboarded_at", { withTimezone: true }),
  },
  (table) => [
    // Index for Stripe customer lookups
    index("profile_customer_id_idx").on(table.customerId),
  ]
);
