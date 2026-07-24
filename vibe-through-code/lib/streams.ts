import { sql } from "@/lib/db";

export interface LatestStream {
    url: string;
}

export async function getLatestStream(): Promise<LatestStream> {
    const [row] = await sql`
        SELECT url
        FROM streams
        ORDER BY date DESC
        LIMIT 1
    `;

    return {
        url: row?.url ?? "#",
    };
}