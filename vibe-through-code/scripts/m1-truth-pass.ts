/**
 * M1 Truth Pass — database migration.
 *
 * Removes fabricated values from the live database. `scripts/seed.ts` uses
 * ON CONFLICT DO NOTHING, so it cannot correct rows that already exist.
 *
 * Idempotent: safe to run more than once.
 *
 * See DATA-INTEGRITY.md for why each of these is a defect rather than a
 * cosmetic issue.
 *
 *   npx tsx scripts/m1-truth-pass.ts
 */

import { config } from "dotenv";
config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set. Check your .env.local file.");
    process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

interface TierRow {
    id: string;
    narrative: unknown;
}

interface StreamRow {
    id: string;
    day: number;
    viewers: number;
    url: string;
}

interface EventRow {
    id: string;
    title: string;
    href: string;
}

interface CountRow {
    n: number;
}

/**
 * The `stream` tier narrative claimed live metrics that were never real:
 * "312 people watching. 47 commits." — actual viewers for those days are 0.
 *
 * The replacement keeps the original three-beat structure and its payoff
 * line, and states only what is true of the format.
 */
const STREAM_NARRATIVE = [
    "Every session is streamed start to finish.",
    "Nothing edited out. Nothing rehearsed.",
    "Your support keeps the camera rolling.",
];

async function main() {
    console.log("M1 Truth Pass\n");

    // ── 1. Fabricated live metrics in support copy ──────────────────────
    const tiersBefore = (await sql`
        SELECT id, narrative FROM support_tiers WHERE id = 'stream'
    `) as TierRow[];

    if (tiersBefore.length === 0) {
        console.log("1. support_tiers: no 'stream' tier found — skipped");
    } else {
        console.log("1. support_tiers.narrative (stream tier)");
        console.log("   before:", JSON.stringify(tiersBefore[0].narrative));

        await sql`
            UPDATE support_tiers
            SET narrative = ${JSON.stringify(STREAM_NARRATIVE)}::json
            WHERE id = 'stream'
        `;

        console.log("   after: ", JSON.stringify(STREAM_NARRATIVE));
    }

    // ── 2. Invented viewer counts ───────────────────────────────────────
    const inflated = (await sql`
        SELECT id, day, viewers, url FROM streams WHERE viewers > 0 ORDER BY day
    `) as StreamRow[];

    console.log("\n2. streams.viewers");

    if (inflated.length === 0) {
        console.log("   already 0 for every row — nothing to do");
    } else {
        for (const row of inflated) {
            console.log(`   day ${row.day}: ${row.viewers} → 0`);
        }

        await sql`UPDATE streams SET viewers = 0 WHERE viewers > 0`;

        console.log(`   ${inflated.length} row(s) corrected`);
    }

    // ── 3. Placeholder URLs — reported, not changed ─────────────────────
    // These need the real stream URLs, which only the operator has.
    const placeholders = (await sql`
        SELECT id, day, viewers, url FROM streams
        WHERE url LIKE '%youtube.com/live/...%' OR url = '#'
        ORDER BY day
    `) as StreamRow[];

    console.log("\n3. streams.url — placeholders (NOT modified)");

    if (placeholders.length === 0) {
        console.log("   none");
    } else {
        for (const row of placeholders) {
            console.log(`   day ${row.day} (${row.id}): ${row.url}`);
        }
        console.log(
            `   ⚠ ${placeholders.length} row(s) need real URLs. Set them via /admin.`
        );
    }

    const eventPlaceholders = (await sql`
        SELECT id, title, href FROM events
        WHERE href LIKE '%youtube.com/live/...%'
        ORDER BY date
    `) as EventRow[];

    console.log("\n4. events.href — placeholders (NOT modified)");

    if (eventPlaceholders.length === 0) {
        console.log("   none");
    } else {
        for (const row of eventPlaceholders) {
            console.log(`   ${row.id}: ${row.href}`);
        }
        console.log(
            `   ⚠ ${eventPlaceholders.length} row(s) need real URLs. Set them via /admin.`
        );
    }

    // ── Verification ────────────────────────────────────────────────────
    console.log("\n── verification ──");

    const remaining = (await sql`
        SELECT id, narrative FROM support_tiers
        WHERE narrative::text LIKE '%312%'
           OR narrative::text LIKE '%47 commits%'
    `) as TierRow[];

    console.log(
        `fabricated metrics in support copy: ${
            remaining.length === 0 ? "none ✓" : `${remaining.length} REMAINING ✗`
        }`
    );

    const nonZero = (await sql`
        SELECT count(*)::int AS n FROM streams WHERE viewers > 0
    `) as CountRow[];

    console.log(
        `streams with non-zero viewers: ${
            nonZero[0].n === 0 ? "none ✓" : `${nonZero[0].n} REMAINING ✗`
        }`
    );

    console.log("\nDone.");
}

main().catch((err: unknown) => {
    console.error("\nFailed:", err instanceof Error ? err.message : err);
    process.exit(1);
});
