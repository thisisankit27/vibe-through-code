import { sql } from "@/lib/db";

export async function getSiteState(): Promise<Record<string, string>> {
    const rows = await sql`
        SELECT key, value
        FROM site_state
    `;

    return Object.fromEntries(
        rows.map((row) => [row.key, row.value])
    );
}