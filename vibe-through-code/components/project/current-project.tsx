import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Project } from "@/types/project";
import { capitalize } from "@/lib/utils";

interface LatestStream {
    url: string;
}

interface CurrentProjectProps {
    project: Project;
    latestStream: LatestStream;
}

export default function CurrentProject({
    project,
    latestStream,
}: CurrentProjectProps) {
    if (!project) return null;

    return (
        <div className="mt-20 w-full max-w-3xl rounded-2xl border border-rule-standard bg-surface-hover p-8 backdrop-blur">

            <p className="text-sm font-medium uppercase tracking-[0.3em] text-accent">
                Building Right Now
            </p>

            <h2 className="mt-4 text-3xl font-bold">
                {project.title}
            </h2>

            <p className="mt-4 max-w-2xl text-ink-secondary">
                {project.description}
            </p>

            {/* Status */}
            <div className="mt-8">

                <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-medium text-accent">

                    <span className="mr-2 h-2 w-2 rounded-full bg-accent" />

                    {capitalize(project.status)}

                </span>

            </div>

            {/* Tech Stack */}
            <div className="mt-6 mx-auto flex max-w-xl flex-wrap justify-center gap-3">

                {project.technologies.map((tech) => (
                    <span
                        key={tech}
                        className="rounded-md border border-rule-standard bg-surface-sunk px-3 py-2 text-sm text-ink-secondary"
                    >
                        {tech}
                    </span>
                ))}

            </div>

            {/* Repository */}

            {/* Actions */}
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">

                <Link
                    href={project.repository}
                    target="_blank"
                    className="inline-flex items-center font-medium text-accent transition hover:text-accent"
                >
                    Repository
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>

                <Link
                    href={latestStream.url}
                    target="_blank"
                    className="inline-flex items-center font-medium text-accent transition hover:text-accent"
                >
                    Latest Stream
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>

            </div>

        </div>
    );
}