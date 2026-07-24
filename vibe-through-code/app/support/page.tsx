import { sql } from "@/lib/db";
import type {
    SupportTier,
    BuilderBenefit,
    SessionManifest,
} from "@/types/support";

import SupportPageClient from "./SupportPageClient";

export default async function SupportPage() {
    const rows = await sql`SELECT * FROM support_tiers ORDER BY price`;

    const supportTiers: SupportTier[] = rows.map((row: any) => ({
        id: row.id,
        title: row.title,
        price: row.price / 100,                 // paise → rupees
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

    const sessionManifest: SessionManifest = {
        coffee: 12,
        stream: 3,
        builders: 1,
    };

    return <SupportPageClient
        supportTiers={supportTiers}
        builderBenefits={builderBenefits}
        sessionManifest={sessionManifest}
    />;
}