import { sql } from "@/lib/db";
import { SupportTier } from "@/data/support2";
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

    return <SupportPageClient supportTiers={supportTiers} />;
}