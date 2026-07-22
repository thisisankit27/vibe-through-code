import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { journey } from "@/data/journey";
import { people as peopleData } from "@/data/people";
import { projects as projectsData } from "@/data/projects";
import { streamHistory } from "@/data/streams";
import { supportTiers as supportTiersData } from "@/data/support";

async function seed() {
    console.log("🌱 Seeding database...");

    await db.delete(schema.payments);
    await db.delete(schema.syncLog);
    await db.delete(schema.siteState);
    await db.delete(schema.events);
    await db.delete(schema.streams);
    await db.delete(schema.people);
    await db.delete(schema.projects);
    await db.delete(schema.supportTiers);

    // Site state
    console.log("  → site_state");
    await db.insert(schema.siteState).values([
        { key: "current_day", value: String(journey.currentDay) },
        { key: "current_goal", value: journey.currentGoal },
        { key: "current_milestone", value: journey.currentMilestone },
        { key: "total_revenue_paise", value: String(journey.revenue * 100) },
        { key: "streak_days", value: String(journey.streak) },
        { key: "total_commits", value: String(journey.totalCommits) },
        { key: "total_streams", value: String(journey.totalStreams) },
        { key: "is_live", value: String(journey.isLive) },
    ]);

    // Events
    console.log(`  → events (${journey.events.length})`);
    if (journey.events.length > 0) {
        await db.insert(schema.events).values(
            journey.events.map((e) => ({
                id: e.id,
                type: e.type,
                title: e.title,
                description: e.description,
                date: e.date,
                time: e.time ?? null,
                href: e.href ?? null,
                badge: e.badge ?? null,
                meta: e.meta ?? null,
                source: "manual",
            }))
        );
    }

    // Streams
    console.log(`  → streams (${streamHistory.length})`);
    if (streamHistory.length > 0) {
        await db.insert(schema.streams).values(
            streamHistory.map((s) => ({
                id: s.id,
                day: s.day,
                title: s.title,
                url: s.url,
                date: s.date,
                duration: s.duration,
                viewers: s.viewers,
                revenue: s.revenue * 100,
                commits: s.commits,
                focus: s.focus,
                isLive: false,
            }))
        );
    }

    // People
    console.log(`  → people (${peopleData.length})`);
    if (peopleData.length > 0) {
        await db.insert(schema.people).values(peopleData);
    }

    // Projects
    console.log(`  → projects (${projectsData.length})`);
    if (projectsData.length > 0) {
        await db.insert(schema.projects).values(
            projectsData.map((p) => ({
                id: p.id,
                slug: p.slug,
                title: p.title,
                description: p.description,
                status: p.status,
                repository: p.repository ?? null,
                technologies: p.technologies,
                startedOn: p.startedOn ?? null,
                completedOn: null,
            }))
        );
    }

    // Support tiers
    console.log(`  → support_tiers (${supportTiersData.length})`);
    if (supportTiersData.length > 0) {
        await db.insert(schema.supportTiers).values(
            supportTiersData.map((t) => ({
                id: t.id,
                title: t.title,
                price: t.price * 100,
                currency: "INR",
                frequency: t.frequency ?? null,
                label: t.label,
                description: t.description,
                narrative: t.narrative,
            }))
        );
    }

    console.log("✅ Seed complete!");
}

seed().catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
});