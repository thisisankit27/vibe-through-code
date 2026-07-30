import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

import Container from "@/components/layout/container";
import { Bench } from "@/components/journey/bench";
import { Counter } from "@/components/home/counter";
import { Ledger } from "@/components/ledger";
import CurrentProject from "@/components/project/current-project";

import {
    getHomeStatus,
    getJourneyEvents,
    getLatestLivestream,
} from "@/lib/journey";
import { getCurrentProject } from "@/lib/projects";
import { site } from "@/data/site";

export const dynamic = "force-dynamic";

/** Preview only. The full record lives at /journey and is never truncated. */
const PREVIEW_ENTRIES = 8;

/**
 * The homepage — an instrument panel, not a hero.
 *
 * Reads top to bottom in recency order: what this is, what is happening
 * now, what the number is, what just happened, what is being built.
 *
 * The mission paragraph earns its place by making the counter legible.
 * `$0 / $1,000,000` means nothing to someone who does not know the
 * premise, so the statement comes first and the instruments follow —
 * which is also how a statement is laid out: a header saying what it is,
 * then the figures.
 */
export default async function HomePage() {
    const [{ status, revenueCents }, events, project, latestStream] =
        await Promise.all([
            getHomeStatus(),
            getJourneyEvents(PREVIEW_ENTRIES),
            getCurrentProject(),
            getLatestLivestream(),
        ]);

    return (
        <Container className="max-w-5xl pb-24 pt-14 md:pb-32 md:pt-20">
            <header className="max-w-2xl">
                <h1 className="text-title font-bold tracking-tight text-ink-primary">
                    {site.tagline}
                </h1>

                <p className="mt-5 text-body text-ink-secondary">
                    <span className="text-ink-primary">
                        A software journey, built in public.
                    </span>{" "}
                    Every project is developed live on stream. Every number
                    below is real — including the ones that aren&rsquo;t
                    impressive yet.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Link
                        href={site.links.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-meta font-medium text-ink-on-accent transition-colors duration-100 ease-out hover:bg-accent/90"
                    >
                        <Play className="h-4 w-4 fill-current" />
                        Watch Live
                    </Link>

                    <Link
                        href={site.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-meta font-medium text-ink-secondary underline-offset-4 transition-colors duration-100 ease-out hover:text-accent hover:underline"
                    >
                        View GitHub
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </header>

            <div className="mt-12">
                <Bench status={status} />
            </div>

            <Counter revenueCents={revenueCents} />

            <section aria-label="Recent record" className="mt-8">
                <div className="flex items-baseline justify-between border-b border-rule-strong pb-2">
                    <h2 className="text-micro font-medium uppercase tracking-wider text-ink-tertiary">
                        Recently
                    </h2>
                    <Link
                        href="/journey"
                        className="text-micro text-ink-tertiary underline-offset-4 transition-colors duration-100 ease-out hover:text-accent hover:underline"
                    >
                        The full record →
                    </Link>
                </div>

                <Ledger events={events} isLive={status.isLive} />
            </section>

            {project && (
                <section aria-label="Current project" className="mt-16">
                    <h2 className="text-micro font-medium uppercase tracking-wider text-ink-tertiary">
                        Building right now
                    </h2>

                    <div className="mt-4">
                        <CurrentProject
                            project={project}
                            latestStream={latestStream}
                        />
                    </div>
                </section>
            )}
        </Container>
    );
}
