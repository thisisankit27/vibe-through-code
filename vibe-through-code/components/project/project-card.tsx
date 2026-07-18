
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
            return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
        case "planned":
            return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
        case "completed":
            return "text-blue-400 bg-blue-500/10 border-blue-500/20";
        default:
            return "text-zinc-400 bg-zinc-500/10 border-zinc-500/20";
    }
}

function getStatusLabel(status: Project["status"]) {
    return status.charAt(0).toUpperCase() + status.slice(1);
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40">
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-emerald-500/12 blur-3xl" />
            <header className="mb-4 flex items-center justify-between">
                <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusColor(project.status)}`}
                >
                    {capitalize(project.status)}
                </span>
                <time className="text-xs text-zinc-500" dateTime={project.startedOn}>
                    {project.startedOn}
                </time>
            </header>

            <div className="mb-4 flex-1">
                <h3 className="mb-3 text-xl font-bold tracking-tight text-white">
                    {project.title}
                </h3>
                <p className="text-sm leading-7 text-zinc-400">
                    {project.description}
                </p>
            </div>

            <div className="mb-5 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                    <span
                        key={tech}
                        className="inline-flex items-center rounded-lg border border-white/10 bg-black/40 px-3 py-1.5 text-xs font-medium text-zinc-300"
                    >
                        {tech}
                    </span>
                ))}
            </div>

            <footer className="mt-auto border-t border-white/5 pt-5">
                <Link
                    href={project.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-300 transition-colors hover:text-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 rounded-md"
                >
                    View Repository
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
            </footer>
        </article>
    );
}