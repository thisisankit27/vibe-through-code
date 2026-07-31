"use client";

import { actionFor } from "./tier-actions";
import { CoffeeCapsule } from "./CoffeeCapsule";
import { FilmCapsule } from "./FilmCapsule";
import { BuildCapsule } from "./BuildCapsule";
import type { SupportTier } from "@/types/support";

interface SupportChapterProps {
    tier: SupportTier;
    /** `site_state.first_builder_on`; changes the recurring tier's action. */
    firstBuilderOn?: string;
    onSelect: (tier: SupportTier) => void;
}

/**
 * One entry in "What each one funds": a drawing, its notes, and a way
 * to act on it.
 *
 * Nothing here responds to scroll. The chapter used to hold a
 * `useInViewProgress` hook feeding a 0→1 value into the capsule, the
 * conduit and a schematic, so the whole section assembled itself as you
 * moved down the page. The drawings now render at rest and carry their
 * own slow idle loops (see `globals.css`), which is what makes them feel
 * drawn rather than triggered.
 *
 * The capsule also no longer sticks. `md:sticky md:top-1/3` pinned the
 * illustration while the narrative scrolled past it, which is another
 * scroll effect and the reason each chapter needed `py-20` of height to
 * work at all. Without it the drawing simply sits beside its notes and
 * the section loses roughly a third of its length.
 *
 * `BlueprintSchematic` is gone. It listed the same four benefits the
 * decision zone already compares, and its only distinct contribution was
 * revealing them on scroll. With the reveal removed it was a restatement
 * in a box — and it was the reason the Builder chapter had a fourth
 * element the other two did not, which is what made the section read as
 * uneven.
 */
export function SupportChapter({
    tier,
    firstBuilderOn,
    onSelect,
}: SupportChapterProps) {
    const Capsule =
        tier.id === "coffee"
            ? CoffeeCapsule
            : tier.id === "stream"
              ? FilmCapsule
              : BuildCapsule;

    return (
        <section className="relative border-b border-rule-hairline py-10 last:border-b-0 md:py-12">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-[13rem_1fr] md:gap-10">
                {/*
                    Drawing.

                    The `Conduit` that used to sit here — a vertical rail
                    with a scroll-driven glow and a counter-rotating
                    hexagon at each end — is gone entirely. Stripped of
                    the glow and the hexagons it was a bare hairline, and
                    a hairline behind a transparent drawing runs straight
                    through it. The horizontal rule between chapters
                    already does the connecting work, in the grammar the
                    ledger uses.
                */}
                <div className="flex items-start justify-center md:justify-start">
                    <Capsule />
                </div>

                {/* Notes */}
                <div className="max-w-prose">
                    <h3 className="text-section font-bold tracking-tight text-ink-primary">
                        {tier.title}
                    </h3>

                    {/* `body` 16px in the serif prose face. DESIGN.md names
                        14px secondary copy as why the site reads cramped,
                        and cramped reads cold on the page that is asking
                        someone for something. */}
                    <div className="mt-4 space-y-3">
                        {tier.narrative.map((line, i) => (
                            <p key={i} className="text-body text-ink-secondary">
                                {line}
                            </p>
                        ))}
                    </div>

                    {/*
                        A link, not a button. The ruled controls in the
                        decision zone above are where this action lives;
                        repeating them at equal weight here would put six
                        competing controls on one page. But a reader who
                        has just finished the argument for this tier should
                        not have to scroll back to act.

                        The price is deliberately absent — it is a field,
                        and it belongs in the aligned slot above where it
                        can be compared, not restated inside prose.
                    */}
                    <button
                        type="button"
                        onClick={() => onSelect(tier)}
                        className="mt-5 inline-flex items-center gap-1.5 text-meta font-medium text-ink-secondary underline-offset-4 transition-colors duration-100 ease-out hover:text-accent hover:underline"
                    >
                        {actionFor(tier, firstBuilderOn)}
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}
