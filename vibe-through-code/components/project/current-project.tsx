import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Project } from "@/types/project";
import type { LatestLivestream } from "@/lib/journey";
import { ProjectStatusTag } from "./project-status";

interface CurrentProjectProps {
    project: Project;
    /**
     * Newest livestream from the events record. Null when none has a
     * usable URL — the link is then omitted rather than pointing at a
     * placeholder.
     */
    latestStream: LatestLivestream | null;
}

export default function CurrentProject({
    project,
    latestStream,
}: CurrentProjectProps) {
    if (!project) return null;

    return (
        // The section heading lives on the page, not in here — this
        // component previously carried its own "Building Right Now"
        // eyebrow, which rendered twice once the homepage added one.
        <div className="rounded-md border border-rule-standard bg-surface-raised p-6 md:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                <h3 className="text-section font-bold text-ink-primary">
                    {project.title}
                </h3>

                <ProjectStatusTag status={project.status} />
            </div>

            <p className="mt-3 max-w-2xl text-meta text-ink-secondary">
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

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
                {project.repository && (
                    <Link
                        href={project.repository}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-meta font-medium text-ink-secondary underline-offset-4 transition-colors duration-100 ease-out hover:text-accent hover:underline"
                    >
                        Repository
                        <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                )}

                {latestStream && (
                    <Link
                        href={latestStream.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-meta font-medium text-ink-secondary underline-offset-4 transition-colors duration-100 ease-out hover:text-accent hover:underline"
                    >
                        Latest stream
                        <time
                            dateTime={latestStream.date}
                            className="text-micro tabular-nums text-ink-tertiary"
                        >
                            {latestStream.date}
                        </time>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                )}
            </div>
        </div>
    );
}
