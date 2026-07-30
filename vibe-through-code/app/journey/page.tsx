import type { Metadata } from "next";

import Container from "@/components/layout/container";
import { Bench } from "@/components/journey/bench";
import { Ledger } from "@/components/ledger";

import { getJourneyEvents, getJourneyStatus } from "@/lib/journey";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Journey — Vibe Through Code",
    description:
        "Every commit, stream, decision and failure on the way from $0 to $1,000,000.",
};

/**
 * The Journey page — the first full implementation of Direction D.
 *
 * Two regions, in recency order:
 *
 *   Bench   what is happening now. Lit, generous, the only place the
 *           signal colour and motion appear.
 *   Ledger  everything that has happened. Ruled, dense, cooling with
 *           age. Never truncated.
 *
 * The ratio between them is the identity: a large calm archive with a
 * small bright edge.
 */
export default async function JourneyPage() {
    const [status, events] = await Promise.all([
        getJourneyStatus(),
        getJourneyEvents(),
    ]);

    return (
        <main className="min-h-screen">
            <Container className="max-w-5xl pb-24 pt-14 md:pb-32 md:pt-20">
                <header>
                    <p className="text-micro font-medium uppercase tracking-eyebrow text-accent">
                        Engineering Journal
                    </p>
                    <h1 className="mt-3 text-title font-bold text-ink-primary">
                        Journey
                    </h1>
                    <p className="mt-4 max-w-xl text-body text-ink-secondary">
                        Every commit, stream, decision and failure. Nothing is
                        removed once it is written.
                    </p>
                </header>

                <div className="mt-10">
                    <Bench status={status} />
                </div>

                <section aria-label="Record" className="mt-10">
                    <div className="flex items-baseline justify-between border-b border-rule-strong pb-2">
                        <h2 className="text-micro font-medium uppercase tracking-wider text-ink-tertiary">
                            The Record
                        </h2>
                        <p className="text-micro tabular-nums text-ink-tertiary">
                            {events.length} entries
                        </p>
                    </div>

                    <Ledger events={events} isLive={status.isLive} />
                </section>
            </Container>
        </main>
    );
}
