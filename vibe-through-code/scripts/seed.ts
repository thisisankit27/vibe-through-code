import { config } from "dotenv";
config({ path: ".env.local" });

import { sql } from "@/lib/db";
import { journey } from "@/data/journey";
import { people as peopleData } from "@/data/people2";
import { projects as projectsData } from "@/data/projects";
import { streamHistory } from "@/data/streams";
import { supportTiers as supportTiersData } from "@/data/support";

async function seed() {
  console.log("🌱 Seeding...");

  for (const e of journey.events) {
    await sql`
      INSERT INTO events (id, type, title, description, date, time, href, badge, meta, source)
      VALUES (${e.id}, ${e.type}, ${e.title}, ${e.description}, ${e.date}, ${e.time ?? null}, ${e.href ?? null}, ${e.badge ?? null}, ${e.meta ? JSON.stringify(e.meta) : null}, 'manual')
      ON CONFLICT (id) DO NOTHING
    `;
  }
  console.log(`  → events (${journey.events.length})`);

  for (const s of streamHistory) {
    await sql`
      INSERT INTO streams (id, day, title, url, date, duration, viewers, revenue, commits, focus, is_live)
      VALUES (${s.id}, ${s.day}, ${s.title}, ${s.url}, ${s.date}, ${s.duration}, ${s.viewers}, ${s.revenue * 100}, ${s.commits}, ${s.focus}, false)
      ON CONFLICT (id) DO NOTHING
    `;
  }
  console.log(`  → streams (${streamHistory.length})`);

  for (const p of peopleData) {
    await sql`
      INSERT INTO people (id, name, role, bio, avatar, github, linkedin, website, is_founder)
      VALUES (${p.id}, ${p.name}, ${p.role}, ${p.bio}, ${p.avatar}, ${p.github ?? null}, ${p.linkedin ?? null}, ${p.website ?? null}, ${p.isFounder})
      ON CONFLICT (id) DO NOTHING
    `;
  }
  console.log(`  → people (${peopleData.length})`);

  for (const p of projectsData) {
    await sql`
      INSERT INTO projects (id, slug, title, description, status, repository, technologies, started_on)
      VALUES (${p.id}, ${p.slug}, ${p.title}, ${p.description}, ${p.status}, ${p.repository ?? null}, ${p.technologies ? JSON.stringify(p.technologies) : null}, ${p.startedOn ?? null})
      ON CONFLICT (id) DO NOTHING
    `;
  }
  console.log(`  → projects (${projectsData.length})`);

  for (const t of supportTiersData) {
    await sql`
      INSERT INTO support_tiers (id, title, price, currency, frequency, label, description, narrative)
      VALUES (${t.id}, ${t.title}, ${t.price * 100}, 'INR', ${t.frequency ?? null}, ${t.label}, ${t.description}, ${JSON.stringify(t.narrative)})
      ON CONFLICT (id) DO NOTHING
    `;
  }
  console.log(`  → tiers (${supportTiersData.length})`);

  console.log("✅ Done!");
}

seed().catch(console.error);