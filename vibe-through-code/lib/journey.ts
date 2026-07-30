import { sql } from "@/lib/db";
import { formatUsd, toISODateString as toISODate } from "@/lib/utils";
import { getSiteState } from "./site";

import type {
    CurrentStatusData,
    JourneyEventData,
} from "@/components/journey";

// `toISODate` normalises the Postgres DATE the driver hands back as a JS
// `Date`, keeping `JourneyEventData.date` honest about being a string —
// rendering the raw value threw "Objects are not valid as a React child"
// at runtime while type-checking cleanly. See `lib/utils.ts` for why it
// reads local components rather than calling toISOString().

/**
 * @param limit Optional cap, for the homepage preview only.
 *
 *   The record itself is NEVER truncated — `/journey` calls this with no
 *   limit. The homepage shows a preview that links through, and it slices
 *   the QUERY rather than the render so the component never receives a
 *   list it is quietly hiding part of.
 */
export async function getJourneyEvents(
    limit?: number
): Promise<JourneyEventData[]> {
    const rows = limit
        ? await sql`
            SELECT *
            FROM events
            ORDER BY date DESC, time DESC NULLS LAST
            LIMIT ${limit}
        `
        : await sql`
            SELECT *
            FROM events
            ORDER BY date DESC, time DESC NULLS LAST
        `;

    return rows.map((row) => ({
        id: row.id,
        type: row.type,
        title: row.title,
        description: row.description,
        date: toISODate(row.date),
        time: row.time ? String(row.time).slice(0, 5) : undefined,
        href: row.href ?? undefined,
        badge: row.badge ?? undefined,
        meta: row.meta ?? [],
    }));
}

export interface LatestLivestream {
    url: string;
    title: string;
    date: string;
}

/**
 * The most recent stream, read from the RECORD rather than the `streams`
 * table.
 *
 * `streams` fed exactly one thing on the public site — a single `url` for
 * one link — while carrying nine columns nothing rendered. Worse, it had
 * drifted: its newest row was day 9 while the events record was at day
 * 16, so the homepage "latest stream" link pointed eight days and seven
 * streams into the past on a page whose bench read Day 16.
 *
 * Events are the single source of truth for what happened. Nothing on the
 * public site reads `streams` after this; the table and its admin tab can
 * be retired whenever you want.
 *
 * Returns null rather than a broken link when no usable URL exists — a
 * placeholder href is a dead end, and DATA-INTEGRITY.md rules those out.
 */
export async function getLatestLivestream(): Promise<LatestLivestream | null> {
    const [row] = await sql`
        SELECT title, href, date
        FROM events
        WHERE type = 'livestream'
          AND href IS NOT NULL
          AND href <> ''
          AND href NOT LIKE '%live/...%'
        ORDER BY date DESC, time DESC NULLS LAST
        LIMIT 1
    `;

    if (!row?.href) return null;

    return {
        url: String(row.href),
        title: String(row.title ?? ""),
        date: toISODate(row.date),
    };
}

/** Shared by both status shapes below. */
function readCurrent(state: Record<string, string>) {
    const goal = (state.current_goal ?? "").trim().replace(/\.$/, "");
    const milestone = (state.current_milestone ?? "").trim();

    return {
        label: state.is_live === "true" ? "Streaming Live" : "Currently Building",
        message: [goal, milestone].filter(Boolean).join(" — "),
        isLive: state.is_live === "true",
    };
}

/**
 * Homepage status.
 *
 * Carries Day / Streak / Commits rather than Revenue, because the counter
 * below it owns money — showing `$0` twice on one screen would be noise,
 * and `total_commits` was previously stored and read by nothing.
 */
export async function getHomeStatus(): Promise<{
    status: CurrentStatusData;
    revenueCents: number;
}> {
    const state = await getSiteState();

    return {
        status: {
            ...readCurrent(state),
            meta: [
                { label: "Day", value: state.current_day ?? "0" },
                { label: "Streak", value: state.streak_days ?? "0" },
                { label: "Commits", value: state.total_commits ?? "0" },
            ],
        },
        revenueCents: Number(state.total_revenue_paise ?? 0),
    };
}

export async function getJourneyStatus(): Promise<CurrentStatusData> {
    const state = await getSiteState();

    return {
        ...readCurrent(state),

        meta: [
            {
                label: "Day",
                value: state.current_day,
            },
            {
                label: "Streak",
                value: state.streak_days,
            },
            {
                // NOTE: the column is still named `total_revenue_paise` but is
                // read as USD cents per the currency decision in PRINCIPLES.md.
                // Safe while the value is 0; the rename is tracked in
                // MIGRATION-CHECKLIST.md and lands with the M2 counter work.
                label: "Revenue",
                value: formatUsd(Number(state.total_revenue_paise ?? 0)),
            },
        ],
    };
}