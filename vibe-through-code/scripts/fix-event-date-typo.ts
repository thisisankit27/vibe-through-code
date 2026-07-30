/**
 * Repairs the year-22026 date typo in the record.
 *
 * One livestream event was entered as `22026-07-30` — an extra digit in the
 * year, accepted verbatim because the admin date field was free text. Two
 * consequences:
 *
 *   1. `ORDER BY date DESC` sorted it above every real entry, so /journey and
 *      the homepage preview both led with it. That is what surfaced the bug:
 *      the record looked mis-sorted when it was faithfully sorting bad data.
 *
 *   2. The event id is derived from the date string (`app/admin/page.tsx`),
 *      so the typo propagated into the primary key: `evt-220260730-liv-932`.
 *
 * The corrected date is `2026-07-30`, which is not a guess:
 *   - the title reads "Day 17", and Day 16 is dated 2026-07-29;
 *   - the id's own date segment is `220260730` — the intended digits with one
 *     extra `2` in front;
 *   - the 19:30 start matches the surrounding streams (18:50, 19:00, 20:00).
 *
 * Nothing has a foreign key to `events.id`, so renaming the key is safe. It
 * is renamed rather than left alone because a primary key that disagrees with
 * its own row is the same defect in a quieter place.
 *
 * Idempotent: re-running after a successful pass is a no-op.
 *
 *   npx tsx scripts/fix-event-date-typo.ts
 */

import { config } from "dotenv";
config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set. Check your .env.local file.");
}

const sql = neon(process.env.DATABASE_URL);

const BAD_ID = "evt-220260730-liv-932";
const GOOD_ID = "evt-20260730-liv-932";
const GOOD_DATE = "2026-07-30";

async function main() {
    const [row] = await sql`
        SELECT id, title, date, time FROM events WHERE id = ${BAD_ID}
    `;

    if (!row) {
        console.log(`No row with id ${BAD_ID} — already repaired. Nothing to do.`);
    } else {
        const [collision] = await sql`
            SELECT id FROM events WHERE id = ${GOOD_ID}
        `;
        if (collision) {
            throw new Error(
                `Cannot rename: ${GOOD_ID} already exists. Resolve by hand.`
            );
        }

        console.log(`Before: ${row.id} | ${row.date} | ${row.time} | ${row.title}`);

        await sql`
            UPDATE events
            SET id = ${GOOD_ID}, date = ${GOOD_DATE}::date
            WHERE id = ${BAD_ID}
        `;

        console.log(`After:  ${GOOD_ID} | ${GOOD_DATE}`);
    }

    // Report any other implausible date rather than repairing it — a second
    // occurrence needs a human to say what the right value is.
    const stragglers = await sql`
        SELECT id, date, title FROM events
        WHERE date < DATE '2020-01-01' OR date > CURRENT_DATE
        ORDER BY date
    `;

    if (stragglers.length) {
        console.warn(
            `\nWARNING: ${stragglers.length} other event(s) hold an implausible date:`
        );
        for (const s of stragglers) {
            console.warn(`  ${s.id} | ${s.date} | ${s.title}`);
        }
    } else {
        console.log("\nEvery event date is within range.");
    }

    // Confirm the record now reads newest-first with no surprises at the top.
    const top = await sql`
        SELECT id, date, time, title FROM events
        ORDER BY date DESC, time DESC NULLS LAST
        LIMIT 5
    `;
    console.log("\nTop of the record:");
    for (const t of top) {
        const d = t.date instanceof Date
            ? `${t.date.getFullYear()}-${String(t.date.getMonth() + 1).padStart(2, "0")}-${String(t.date.getDate()).padStart(2, "0")}`
            : String(t.date);
        console.log(`  ${d} ${String(t.time ?? "").padEnd(6)} | ${String(t.title).slice(0, 52)}`);
    }
}

main();
