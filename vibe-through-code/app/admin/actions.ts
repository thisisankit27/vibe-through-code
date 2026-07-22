"use server";

import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

/* ── Events ─────────────────────────────────────────────── */
export async function getEvents() {
    return db.select().from(schema.events).orderBy(desc(schema.events.date));
}
export async function createEvent(data: typeof schema.events.$inferInsert) {
    await db.insert(schema.events).values(data);
    revalidatePath("/admin");
}
export async function updateEvent(id: string, data: Partial<typeof schema.events.$inferInsert>) {
    await db.update(schema.events).set(data).where(eq(schema.events.id, id));
    revalidatePath("/admin");
}
export async function deleteEvent(id: string) {
    await db.delete(schema.events).where(eq(schema.events.id, id));
    revalidatePath("/admin");
}

/* ── Streams ────────────────────────────────────────────── */
export async function getStreams() {
    return db.select().from(schema.streams).orderBy(desc(schema.streams.date));
}
export async function createStream(data: typeof schema.streams.$inferInsert) {
    await db.insert(schema.streams).values(data);
    revalidatePath("/admin");
}
export async function updateStream(id: string, data: Partial<typeof schema.streams.$inferInsert>) {
    await db.update(schema.streams).set(data).where(eq(schema.streams.id, id));
    revalidatePath("/admin");
}
export async function deleteStream(id: string) {
    await db.delete(schema.streams).where(eq(schema.streams.id, id));
    revalidatePath("/admin");
}

/* ── People ─────────────────────────────────────────────── */
export async function getPeople() {
    return db.select().from(schema.people).orderBy(schema.people.name);
}
export async function createPerson(data: typeof schema.people.$inferInsert) {
    await db.insert(schema.people).values(data);
    revalidatePath("/admin");
}
export async function updatePerson(id: string, data: Partial<typeof schema.people.$inferInsert>) {
    await db.update(schema.people).set(data).where(eq(schema.people.id, id));
    revalidatePath("/admin");
}
export async function deletePerson(id: string) {
    await db.delete(schema.people).where(eq(schema.people.id, id));
    revalidatePath("/admin");
}

/* ── Projects ───────────────────────────────────────────── */
export async function getProjects() {
    return db.select().from(schema.projects).orderBy(schema.projects.title);
}
export async function createProject(data: typeof schema.projects.$inferInsert) {
    await db.insert(schema.projects).values(data);
    revalidatePath("/admin");
}
export async function updateProject(id: string, data: Partial<typeof schema.projects.$inferInsert>) {
    await db.update(schema.projects).set(data).where(eq(schema.projects.id, id));
    revalidatePath("/admin");
}
export async function deleteProject(id: string) {
    await db.delete(schema.projects).where(eq(schema.projects.id, id));
    revalidatePath("/admin");
}

/* ── Support Tiers ──────────────────────────────────────── */
export async function getTiers() {
    return db.select().from(schema.supportTiers).orderBy(schema.supportTiers.price);
}
export async function createTier(data: typeof schema.supportTiers.$inferInsert) {
    await db.insert(schema.supportTiers).values(data);
    revalidatePath("/admin");
}
export async function updateTier(id: string, data: Partial<typeof schema.supportTiers.$inferInsert>) {
    await db.update(schema.supportTiers).set(data).where(eq(schema.supportTiers.id, id));
    revalidatePath("/admin");
}
export async function deleteTier(id: string) {
    await db.delete(schema.supportTiers).where(eq(schema.supportTiers.id, id));
    revalidatePath("/admin");
}

/* ── Site State ─────────────────────────────────────────── */
export async function getSiteState() {
    return db.select().from(schema.siteState).orderBy(schema.siteState.key);
}
export async function updateSiteState(key: string, value: string) {
    await db.update(schema.siteState).set({ value, updatedAt: new Date() }).where(eq(schema.siteState.key, key));
    revalidatePath("/admin");
}