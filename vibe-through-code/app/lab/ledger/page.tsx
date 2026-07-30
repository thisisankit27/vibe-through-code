import { notFound } from "next/navigation";

import Container from "@/components/layout/container";
import { Bench } from "@/components/journey/bench";
import { Ledger } from "@/components/ledger";
import { generateEvents } from "@/lib/synthetic-events";

export const dynamic = "force-dynamic";

/**
 * Scale review fixture — NOT a public page.
 *
 * Renders the real Journey composition against synthetic entries so the
 * design can be judged at volumes the project has not reached. Direction
 * D was chosen on the claim that the identity improves as the archive
 * grows; this is where that claim gets tested.
 *
 *   /lab/ledger?n=800&presentation=rows&theme=paper
 *
 * 404s in production. The synthetic data never reaches a visitor.
 */
export default async function LedgerLabPage({
    searchParams,
}: {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
    if (process.env.NODE_ENV === "production" && !process.env.ENABLE_LAB) {
        notFound();
    }

    const params = await searchParams;
    const read = (key: string) => {
        const v = params[key];
        return Array.isArray(v) ? v[0] : v;
    };

    const count = Math.min(5000, Math.max(0, Number(read("n") ?? 25) || 0));
    const presentation = read("presentation") === "cards" ? "cards" : "rows";
    const theme = read("theme") === "dark" ? "dark" : "paper";
    const face = read("face") === "sans" ? "sans" : "serif";

    const events = generateEvents(count);

    return (
        <div
            className={[
                theme === "dark" ? "theme-dark" : "theme-paper",
                face === "sans" ? "face-sans" : "",
                "bg-surface-base",
            ]
                .filter(Boolean)
                .join(" ")}
        >
            <main className="min-h-screen">
                <Container className="max-w-5xl pb-24 pt-14 md:pb-32 md:pt-20">
                    <header>
                        <p className="text-micro font-medium uppercase tracking-eyebrow text-accent">
                            Lab · not a real page
                        </p>
                        <h1 className="mt-3 text-title font-bold text-ink-primary">
                            Journey
                        </h1>
                        <p className="mt-4 max-w-xl text-body text-ink-secondary">
                            {count} synthetic entries · {presentation} · {theme} ·{" "}
                            {face}
                        </p>
                    </header>

                    <div className="mt-10">
                        <Bench
                            status={{
                                label: "Currently Building",
                                message:
                                    "Build Family Knowledge Vault — Initiate the action plan",
                                isLive: false,
                                meta: [
                                    { label: "Day", value: "16" },
                                    { label: "Streak", value: "16" },
                                    { label: "Revenue", value: "$0" },
                                ],
                            }}
                        />
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

                        <Ledger events={events} presentation={presentation} />
                    </section>
                </Container>
            </main>
        </div>
    );
}
