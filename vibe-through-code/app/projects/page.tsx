import Container from "@/components/layout/container";
import { ProjectCard } from "@/components/project/project-card";
import { sql } from "@/lib/db";

export default async function ProjectsPage() {
    const rows = await sql`SELECT * FROM projects ORDER BY started_on DESC NULLS LAST`;

    const projects = rows.map((row: any) => ({
        id: row.id,
        slug: row.slug,
        title: row.title,
        description: row.description,
        status: row.status,
        repository: row.repository ?? "",
        technologies: row.technologies ?? [],
        startedOn: row.started_on ?? "",
    }));

    return (
        <Container>
            <section className="pt-14 pb-24 md:pt-20 md:pb-28">
                <div className="mb-12 text-center">
                    <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">
                        Project Catalog
                    </p>
                    <h1 className="mt-3 text-5xl font-bold tracking-tight">
                        Projects
                    </h1>
                    <p className="mt-6 text-zinc-400">
                        Every project built throughout the journey.
                    </p>
                </div>

                <div className="mx-auto flex max-w-7xl justify-center">
                    <div
                        className={`grid w-full gap-8 ${projects.length === 1
                                ? "max-w-md grid-cols-1"
                                : "max-w-md grid-cols-1 md:max-w-none md:grid-cols-2 xl:grid-cols-3"
                            }`}
                    >
                        {projects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                </div>
            </section>
        </Container>
    );
}