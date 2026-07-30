import type { EventType, JourneyEventData } from "@/components/journey/types";

/**
 * Deterministic synthetic ledger entries, for validating that the record
 * holds up at scale.
 *
 * NEVER import this from a shipping page. It exists so the design can be
 * reviewed at volumes the project has not reached yet — Direction D was
 * chosen on the claim that the identity *improves* as the archive grows,
 * and that claim needs testing before the pattern is propagated.
 *
 * See DATA-INTEGRITY.md: synthetic values must never reach a visitor.
 * The only consumer is the lab route, which 404s in production.
 */

const TYPES: EventType[] = [
    "pr_merge",
    "livestream",
    "deployment",
    "bug_fix",
    "architecture_decision",
    "learning_moment",
    "milestone",
    "blog_post",
    "community",
    "project_start",
    "project_complete",
    "revenue",
    "website_launch",
    "partnership",
    "first_sale",
];

const TITLES: Record<string, string[]> = {
    pr_merge: ["Ledger entry primitive", "Recency utility", "Token layer", "Admin form fields"],
    livestream: ["Building the ledger", "Token migration", "Design system pass", "Refactor session"],
    deployment: ["Deploy to production", "Preview channel cutover", "Rollback and redeploy"],
    bug_fix: ["Fix scroll listener leak", "Correct contrast on paper", "Repair meta round-trip"],
    architecture_decision: ["Semantic tokens over literals", "No ORM", "Rows over cards"],
    learning_moment: ["Tailwind theme namespaces", "CSS custom property scope", "SSR attribute handling"],
    milestone: ["First hundred entries", "Design system adopted", "Archive crosses a year"],
    blog_post: ["Why the record is never truncated", "Designing for accumulation"],
    community: ["First outside contribution", "Discussion thread opened"],
    project_start: ["New project scaffolded"],
    project_complete: ["Project shipped"],
    revenue: ["Support received"],
    website_launch: ["Platform live"],
    partnership: ["Collaboration agreed"],
    first_sale: ["First sale"],
};

/** Small deterministic PRNG so runs are comparable. */
function rng(seed: number) {
    let s = seed >>> 0;
    return () => {
        s = (s * 1664525 + 1013904223) >>> 0;
        return s / 4294967296;
    };
}

export function generateEvents(
    count: number,
    startDate = new Date("2026-07-31T09:00:00Z")
): JourneyEventData[] {
    const rand = rng(count * 7919 + 13);
    const events: JourneyEventData[] = [];

    for (let i = 0; i < count; i++) {
        const type = TYPES[Math.floor(rand() * TYPES.length)];
        const titles = TITLES[type] ?? ["Entry"];
        const title = titles[Math.floor(rand() * titles.length)];

        // Roughly 1.5 entries/day, matching the real rate.
        const daysBack = Math.floor(i / 1.5);
        const at = new Date(startDate.getTime() - daysBack * 86_400_000);
        const hh = String(9 + Math.floor(rand() * 12)).padStart(2, "0");
        const mm = String(Math.floor(rand() * 60)).padStart(2, "0");

        const meta =
            rand() > 0.35
                ? [
                      { label: "Files", value: String(1 + Math.floor(rand() * 40)) },
                      { label: "Commits", value: String(1 + Math.floor(rand() * 12)) },
                  ]
                : undefined;

        events.push({
            id: `synthetic-${count}-${i}`,
            type,
            title: `${title}`,
            description:
                "Synthetic entry generated for scale review. Not real data and never rendered in production.",
            date: at.toISOString().slice(0, 10),
            time: `${hh}:${mm}`,
            href: rand() > 0.6 ? "https://github.com/thisisankit27/vibe-through-code" : undefined,
            meta,
        });
    }

    return events;
}
