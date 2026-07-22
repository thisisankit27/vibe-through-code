import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const events = sqliteTable("events", {
    id: text("id").primaryKey(),
    type: text("type").notNull(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    date: text("date").notNull(),
    time: text("time"),
    href: text("href"),
    badge: text("badge"),
    meta: text("meta", { mode: "json" }).$type<
        { label: string; value: string }[]
    >(),
    source: text("source").default("manual"),
    createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
        () => new Date()
    ),
});

export const streams = sqliteTable("streams", {
    id: text("id").primaryKey(),
    day: integer("day").notNull(),
    title: text("title").notNull(),
    url: text("url").notNull(),
    date: text("date").notNull(),
    duration: text("duration"),
    viewers: integer("viewers").default(0),
    revenue: integer("revenue").default(0),
    commits: integer("commits").default(0),
    focus: text("focus"),
    isLive: integer("is_live", { mode: "boolean" }).default(false),
    createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
        () => new Date()
    ),
});

export const people = sqliteTable("people", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    role: text("role").notNull(),
    bio: text("bio").notNull(),
    avatar: text("avatar"),
    github: text("github"),
    linkedin: text("linkedin"),
    website: text("website"),
    isFounder: integer("is_founder", { mode: "boolean" }).default(false),
    createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
        () => new Date()
    ),
});

export const projects = sqliteTable("projects", {
    id: text("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    status: text("status").notNull(),
    repository: text("repository"),
    technologies: text("technologies", { mode: "json" }).$type<string[]>(),
    startedOn: text("started_on"),
    completedOn: text("completed_on"),
});

export const supportTiers = sqliteTable("support_tiers", {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    price: integer("price").notNull(),
    currency: text("currency").notNull().default("INR"),
    frequency: text("frequency"),
    label: text("label").notNull(),
    description: text("description").notNull(),
    narrative: text("narrative", { mode: "json" }).$type<string[]>(),
});

export const payments = sqliteTable("payments", {
    id: text("id").primaryKey(),
    tierId: text("tier_id")
        .notNull()
        .references(() => supportTiers.id),
    amount: integer("amount").notNull(),
    currency: text("currency").notNull(),
    status: text("status").notNull(),
    provider: text("provider").notNull(),
    providerRef: text("provider_ref"),
    payerName: text("payer_name"),
    payerEmail: text("payer_email"),
    payerContact: text("payer_contact"),
    metadata: text("metadata", { mode: "json" }),
    createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
        () => new Date()
    ),
    updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
        () => new Date()
    ),
});

export const syncLog = sqliteTable("sync_log", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    source: text("source").notNull(),
    syncType: text("sync_type").notNull(),
    itemsFound: integer("items_found").default(0),
    itemsInserted: integer("items_inserted").default(0),
    itemsUpdated: integer("items_updated").default(0),
    status: text("status").notNull(),
    errorMessage: text("error_message"),
    startedAt: integer("started_at", { mode: "timestamp" }).$defaultFn(
        () => new Date()
    ),
    completedAt: integer("completed_at", { mode: "timestamp" }),
});

export const siteState = sqliteTable("site_state", {
    key: text("key").primaryKey(),
    value: text("value").notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
        () => new Date()
    ),
});