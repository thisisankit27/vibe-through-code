import { sql } from "@/lib/db";
import type { Project } from "@/types/project";

export async function getCurrentProject(): Promise<Project | null> {
    const [row] = await sql`
        SELECT *
        FROM projects
        WHERE status = 'active'
        ORDER BY started_on DESC NULLS LAST
        LIMIT 1
    `;

    if (!row) return null;

    return {
        id: row.id,
        slug: row.slug,
        title: row.title,
        description: row.description,
        status: row.status,
        repository: row.repository ?? "",
        technologies: row.technologies ?? [],
        startedOn: row.started_on ?? "",
    };
}