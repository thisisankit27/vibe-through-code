"use server";

import { sql } from "@/lib/db";
import { revalidatePath } from "next/cache";

/* ── Events ─────────────────────────────────────────────── */
export async function getEvents() {
    return sql`SELECT * FROM events ORDER BY date DESC`;
}
export async function createEvent(data: any) {
    await sql`
    INSERT INTO events (id, type, title, description, date, time, href, badge, meta, source)
    VALUES (${data.id}, ${data.type}, ${data.title}, ${data.description}, ${data.date}, ${data.time ?? null}, ${data.href ?? null}, ${data.badge ?? null}, ${data.meta ? JSON.stringify(data.meta) : null}, ${data.source ?? 'manual'})
  `;
    revalidatePath("/admin");
}
export async function updateEvent(id: string, data: any) {
    await sql`
    UPDATE events SET
      type = ${data.type},
      title = ${data.title},
      description = ${data.description},
      date = ${data.date},
      time = ${data.time ?? null},
      href = ${data.href ?? null},
      badge = ${data.badge ?? null},
      meta = ${data.meta ? JSON.stringify(data.meta) : null}
    WHERE id = ${id}
  `;
    revalidatePath("/admin");
}
export async function deleteEvent(id: string) {
    await sql`DELETE FROM events WHERE id = ${id}`;
    revalidatePath("/admin");
}

/* ── Streams ────────────────────────────────────────────── */
export async function getStreams() {
    return sql`SELECT * FROM streams ORDER BY date DESC`;
}
export async function createStream(data: any) {
    await sql`
    INSERT INTO streams (id, day, title, url, date, duration, viewers, revenue, commits, focus, is_live)
    VALUES (${data.id}, ${data.day}, ${data.title}, ${data.url}, ${data.date}, ${data.duration ?? null}, ${data.viewers ?? 0}, ${data.revenue ?? 0}, ${data.commits ?? 0}, ${data.focus ?? null}, ${data.isLive ?? false})
  `;
    revalidatePath("/admin");
}
export async function updateStream(id: string, data: any) {
    await sql`
    UPDATE streams SET
      day = ${data.day},
      title = ${data.title},
      url = ${data.url},
      date = ${data.date},
      duration = ${data.duration ?? null},
      viewers = ${data.viewers ?? 0},
      revenue = ${data.revenue ?? 0},
      commits = ${data.commits ?? 0},
      focus = ${data.focus ?? null},
      is_live = ${data.isLive ?? false}
    WHERE id = ${id}
  `;
    revalidatePath("/admin");
}
export async function deleteStream(id: string) {
    await sql`DELETE FROM streams WHERE id = ${id}`;
    revalidatePath("/admin");
}

/* ── People ─────────────────────────────────────────────── */
export async function getPeople() {
    return sql`SELECT * FROM people ORDER BY name`;
}
export async function createPerson(data: any) {
    await sql`
    INSERT INTO people (id, name, role, bio, avatar, github, linkedin, website, is_founder)
    VALUES (${data.id}, ${data.name}, ${data.role}, ${data.bio}, ${data.avatar ?? null}, ${data.github ?? null}, ${data.linkedin ?? null}, ${data.website ?? null}, ${data.isFounder ?? false})
  `;
    revalidatePath("/admin");
}
export async function updatePerson(id: string, data: any) {
    await sql`
    UPDATE people SET
      name = ${data.name},
      role = ${data.role},
      bio = ${data.bio},
      avatar = ${data.avatar ?? null},
      github = ${data.github ?? null},
      linkedin = ${data.linkedin ?? null},
      website = ${data.website ?? null},
      is_founder = ${data.isFounder ?? false}
    WHERE id = ${id}
  `;
    revalidatePath("/admin");
}
export async function deletePerson(id: string) {
    await sql`DELETE FROM people WHERE id = ${id}`;
    revalidatePath("/admin");
}

/* ── Projects ───────────────────────────────────────────── */
export async function getProjects() {
    return sql`SELECT * FROM projects ORDER BY title`;
}
export async function createProject(data: any) {
    await sql`
    INSERT INTO projects (id, slug, title, description, status, repository, technologies, started_on)
    VALUES (${data.id}, ${data.slug}, ${data.title}, ${data.description}, ${data.status}, ${data.repository ?? null}, ${data.technologies ? JSON.stringify(data.technologies) : null}, ${data.startedOn ?? null})
  `;
    revalidatePath("/admin");
}
export async function updateProject(id: string, data: any) {
    await sql`
    UPDATE projects SET
      slug = ${data.slug},
      title = ${data.title},
      description = ${data.description},
      status = ${data.status},
      repository = ${data.repository ?? null},
      technologies = ${data.technologies ? JSON.stringify(data.technologies) : null},
      started_on = ${data.startedOn ?? null}
    WHERE id = ${id}
  `;
    revalidatePath("/admin");
}
export async function deleteProject(id: string) {
    await sql`DELETE FROM projects WHERE id = ${id}`;
    revalidatePath("/admin");
}

/* ── Support Tiers ──────────────────────────────────────── */
export async function getTiers() {
    return sql`SELECT * FROM support_tiers ORDER BY price`;
}
export async function createTier(data: any) {
    await sql`
    INSERT INTO support_tiers (id, title, price, currency, frequency, label, description, narrative)
    VALUES (${data.id}, ${data.title}, ${data.price}, ${data.currency ?? 'INR'}, ${data.frequency ?? null}, ${data.label}, ${data.description}, ${data.narrative ? JSON.stringify(data.narrative) : null})
  `;
    revalidatePath("/admin");
}
export async function updateTier(id: string, data: any) {
    await sql`
    UPDATE support_tiers SET
      title = ${data.title},
      price = ${data.price},
      currency = ${data.currency},
      frequency = ${data.frequency ?? null},
      label = ${data.label},
      description = ${data.description},
      narrative = ${data.narrative ? JSON.stringify(data.narrative) : null}
    WHERE id = ${id}
  `;
    revalidatePath("/admin");
}
export async function deleteTier(id: string) {
    await sql`DELETE FROM support_tiers WHERE id = ${id}`;
    revalidatePath("/admin");
}

/* ── Site State ─────────────────────────────────────────── */
export async function getSiteState() {
    return sql`SELECT * FROM site_state ORDER BY key`;
}
export async function updateSiteState(key: string, value: string) {
    await sql`
    UPDATE site_state SET value = ${value}, updated_at = CURRENT_TIMESTAMP
    WHERE key = ${key}
  `;
    revalidatePath("/admin");
}