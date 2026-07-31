import { sql } from "@/lib/db";
import { getSiteState } from "@/lib/site";
import type { SupportTier, BuilderBenefit } from "@/types/support";

import SupportPageClient from "./support-page-client";

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

    // Cadence is the one axis on which these rows genuinely differ in
    // kind, so it is what the decision zone groups by. `frequency` is
    // null for a one-time contribution and "/month" for a membership.
    const oneTime = supportTiers.filter((tier) => !tier.frequency);
    const ongoing = supportTiers.filter((tier) => tier.frequency);

    // Still hardcoded, and still a violation of DATA-INTEGRITY.md:31
    // ("Hardcoding in a server component is still hardcoding").
    // M4.2b moves these to a `tier_benefits` table with an /admin tab.
    // Kept here for one milestone so the architecture change stays
    // reviewable on its own.
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

    const benefitsByTier: Record<string, BuilderBenefit[]> = {
        builder: builderBenefits,
    };

    // No `payments` table exists yet, so there are provably zero
    // supporters. `sessionManifest` stays absent until it can be derived
    // from a real query — the terminus renders its honest zero state.
    return (
        <SupportPageClient
            supportTiers={supportTiers}
            oneTime={oneTime}
            ongoing={ongoing}
            benefitsByTier={benefitsByTier}
            builderBenefits={builderBenefits}
            currentDay={Number(state.current_day ?? 0)}
            // Absent until the first Builder joins. `site_state` is a
            // key/value table, so "has not happened" is the absence of a
            // row rather than a null column — which is the right shape
            // for a site that records what has happened. Written once,
            // never edited; see components/support/foundation-stone.tsx.
            firstBuilderOn={state.first_builder_on}
        />
    );
}
