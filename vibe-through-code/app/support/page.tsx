import { sql } from "@/lib/db";
import { getSiteState } from "@/lib/site";
import type {
    SupportTier,
    BuilderBenefit,
} from "@/types/support";

import SupportPageClient from "./SupportPageClient";

export const dynamic = "force-dynamic";

interface SupportTierRow {
    id: string;
    title: string;
    price: number;
    currency: string;
    frequency: string | null;
    label: string;
    description: string;
    narrative: string[] | string | null;
}

export default async function SupportPage() {
    const [rows, state] = await Promise.all([
        sql`SELECT * FROM support_tiers ORDER BY price`,
        getSiteState(),
    ]);

    const supportTiers: SupportTier[] = (rows as SupportTierRow[]).map((row) => ({
        id: row.id,
        title: row.title,
        price: row.price / 100,                 // minor units → major units
        currency: row.currency === "INR" ? "₹" : row.currency,
        frequency: row.frequency ?? undefined,
        label: row.label,
        description: row.description,
        narrative: Array.isArray(row.narrative)
            ? row.narrative
            : JSON.parse(row.narrative ?? "[]"),
    }));

    const builderBenefits: BuilderBenefit[] = [
        {
            id: "priority",
            label: "PRIORITY QUEUE",
            description: "Early project access",
        },
        {
            id: "comm",
            label: "COMM CHANNEL",
            description: "Builder community / Discord",
        },
        {
            id: "review",
            label: "DESIGN REVIEW",
            description: "Monthly architecture sessions",
        },
        {
            id: "pipeline",
            label: "FEATURE PIPELINE",
            description: "Vote on upcoming projects",
        },
    ];

    // No `payments` table exists yet, so there are provably zero supporters.
    // `sessionManifest` stays absent until it can be derived from a real
    // query — the terminus renders its honest zero state meanwhile.
    return <SupportPageClient
        supportTiers={supportTiers}
        builderBenefits={builderBenefits}
        currentDay={Number(state.current_day ?? 0)}
    />;
}
