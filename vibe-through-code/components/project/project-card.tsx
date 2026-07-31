import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Project } from "@/types/project";
import { ProjectStatusTag } from "./project-status";

/**
 * One project in the catalog at /projects.
 *
 * A card rather than a ruled row on purpose: DESIGN.md reserves cards for
 * "genuinely independent, comparable, self-contained objects — a project,
 * a person. That is the complete list." Everything else on the site is a
 * row. If a third card type appears, one of us is wrong.
 *
 * Deliberately does NOT lift, glow, or scale on hover. Motion reports
 * state; a card that rises when the pointer passes is reporting nothing.
 *
 * Focus is left to the global `:focus-visible` rule in globals.css. The
 * hand-rolled ring here previously carried `ring-offset-zinc-950`, which
 * survived the token migration because the sweep only looked for
 * `bg-`/`text-`/`border-` prefixes — so on the paper ground the site's
 * keyboard affordance drew a near-black halo.
 */
interface ProjectCardProps {
    project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <article className="flex h-full flex-col rounded-md border border-rule-standard bg-surface-raised p-6">
            <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                <ProjectStatusTag status={project.status} />

                {project.startedOn && (
                    <time
                        className="text-micro text-ink-tertiary"
                        dateTime={project.startedOn}
                    >
                        {project.startedOn}
                    </time>
                )}
            </header>

            <h3 className="mt-4 text-section font-bold tracking-tight text-ink-primary">
                {project.title}
            </h3>

            <p className="mt-3 flex-1 text-meta text-ink-secondary">
                {project.description}
            </p>

            {project.technologies.length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                        <li
                            key={tech}
                            className="rounded-sm border border-rule-hairline bg-surface-sunk px-2 py-1 text-micro text-ink-secondary"
                        >
                            {tech}
                        </li>
                    ))}
                </ul>
            )}

            {project.repository && (
                <footer className="mt-6 border-t border-rule-hairline pt-5">
                    <Link
                        href={project.repository}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-meta font-medium text-ink-secondary underline-offset-4 transition-colors duration-100 ease-out hover:text-accent hover:underline"
                    >
                        Repository
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                </footer>
            )}
        </article>
    );
}
