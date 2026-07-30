import { sql } from "@/lib/db";
import { formatUsd } from "@/lib/utils";
import { getSiteState } from "./site";

import type {
    CurrentStatusData,
    JourneyEventData,
} from "@/components/journey";

export async function getJourneyEvents(): Promise<JourneyEventData[]> {
    const rows = await sql`
        SELECT *
        FROM events
        ORDER BY date DESC, time DESC NULLS LAST
    `;

    return rows.map((row) => ({
        id: row.id,
        type: row.type,
        title: row.title,
        description: row.description,
        date: row.date,
        time: row.time ?? undefined,
        href: row.href ?? undefined,
        badge: row.badge ?? undefined,
        meta: row.meta ?? [],
    }));
}

export async function getJourneyStatus(): Promise<CurrentStatusData> {
    const state = await getSiteState();

    const goal = (state.current_goal ?? "").trim().replace(/\.$/, "");
    const milestone = (state.current_milestone ?? "").trim();

    return {
        label: state.is_live === "true"
            ? "Streaming Live"
            : "Currently Building",

        message: [goal, milestone].filter(Boolean).join(" — "),

        isLive: state.is_live === "true",

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