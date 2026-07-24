import { sql } from "@/lib/db";
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

    return {
        label: state.is_live === "true"
            ? "Streaming Live"
            : "Currently Building",

        message: `${state.current_goal} — ${state.current_milestone}`,

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
                label: "Revenue",
                value: `₹${(
                    Number(state.total_revenue_paise) / 100
                ).toLocaleString("en-IN")}`,
            },
        ],
    };
}