
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/project";
import { capitalize } from "@/lib/utils";

interface ProjectCardProps {
    project: Project;
}

function getStatusColor(status: Project["status"]) {
    switch (status) {
        case "active":
            return "text-accent bg-accent/10 border-accent/20";
        case "planned":
            return "text-accent bg-accent/10 border-accent/20";
        case "completed":
            return "text-info bg-info/10 border-info/20";
        default:
            return "text-ink-secondary bg-surface-hover border-rule-standard";
    }
}

function getStatusLabel(status: Project["status"]) {
    return status.charAt(0).toUpperCase() + status.slice(1);
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-rule-standard bg-surface-raised p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-accent/15 blur-3xl" />
            <header className="mb-4 flex items-center justify-between">
                <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusColor(project.status)}`}
                >
                    {capitalize(project.status)}
                </span>
                <time className="text-xs text-ink-tertiary" dateTime={project.startedOn}>
                    {project.startedOn}
                </time>
            </header>

            <div className="mb-4 flex-1">
                <h3 className="mb-3 text-xl font-bold tracking-tight text-ink-primary">
                    {project.title}
                </h3>
                <p className="text-sm leading-7 text-ink-secondary">
                    {project.description}
                </p>
            </div>

            <div className="mb-5 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                    <span
                        key={tech}
                        className="inline-flex items-center rounded-lg border border-rule-standard bg-scrim px-3 py-1.5 text-xs font-medium text-ink-secondary"
                    >
                        {tech}
                    </span>
                ))}
            </div>

            <footer className="mt-auto border-t border-rule-hairline pt-5">
                <Link
                    href={project.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-secondary transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 rounded-md"
                >
                    View Repository
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
            </footer>
        </article>
    );
}