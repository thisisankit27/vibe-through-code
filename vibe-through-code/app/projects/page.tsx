import Container from "@/components/layout/container";
import { ProjectCard } from "@/components/project/project-card";

import { projects } from "@/data/projects";

export default function ProjectsPage() {
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