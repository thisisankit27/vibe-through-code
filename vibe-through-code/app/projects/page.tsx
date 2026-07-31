import Container from "@/components/layout/container";
import { ProjectCard } from "@/components/project/project-card";
import { sql } from "@/lib/db";
import type { Project } from "@/types/project";

export const dynamic = "force-dynamic";

/**
 * The project catalog.
 *
 * Header grammar matches the homepage and /journey: left-aligned title
 * and lead, no centred eyebrow. Centred composition reads as
 * presentation; this page is a list of things that exist.
 */
export default async function ProjectsPage() {
    const rows = await sql`
        SELECT * FROM projects ORDER BY started_on DESC NULLS LAST
    `;

    const projects: Project[] = rows.map((row: Record<string, unknown>) => ({
        id: String(row.id),
        slug: String(row.slug),
        title: String(row.title),
        description: String(row.description ?? ""),
        status: row.status as Project["status"],
        repository: (row.repository as string) ?? "",
        technologies: (row.technologies as string[]) ?? [],
        startedOn: (row.started_on as string) ?? "",
    }));

    return (
        <Container className="max-w-5xl pb-24 pt-14 md:pb-32 md:pt-20">
            <header className="max-w-2xl">
                <h1 className="text-title font-bold tracking-tight text-ink-primary">
                    Projects
                </h1>
                <p className="mt-5 text-body text-ink-secondary">
                    Every project built throughout the journey, newest first.
                </p>
            </header>

            {projects.length > 0 ? (
                <div className="mt-12 grid gap-6 md:grid-cols-2">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            ) : (
                /* Zero is a designed state — an empty catalog says so
                   plainly rather than rendering a header over blank space. */
                <p className="mt-12 border-t border-rule-strong pt-6 text-meta text-ink-tertiary">
                    No projects logged yet.
                </p>
            )}
        </Container>
    );
}
