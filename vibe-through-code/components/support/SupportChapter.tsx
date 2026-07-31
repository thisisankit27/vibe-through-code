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
 * One entry in "What each one funds": a note, and a figure in the margin.
 *
 * **The figure moved to the right, and that is the substantive change.**
 * It previously took the container's left edge — the page's spine, where
 * every heading, rule and eyebrow above it begins — and pushed the words
 * 250px inboard. So the section abandoned the left edge the decision zone
 * establishes, and the eye lost the document's structure exactly where
 * the reading is supposed to be calmest. It also put the drawing in the
 * most authoritative position on the page, which is what made the
 * illustrations read as dominant: they were not too large so much as too
 * important. A figure is an annotation to a note, not its header.
 *
 * With the note back on the spine, the entry reads as one object and the
 * previously dead right third of the band carries the drawing.
 *
 * DOM order is notes-then-figure, so a screen reader hears "Support a
 * Coffee" before "A full cup of coffee, steaming" — the reverse of what
 * it heard before. `order-first md:order-none` puts the figure back on
 * top for the single-column layout without touching that order.
 *
 * **The narrative is a stanza, not prose.** Every tier's `narrative` is
 * three short declarative sentences, each one line at any width this
 * page uses. Rendering them with `space-y-3` on top of 1.6 leading put
 * 37.6px between them and made three related lines read as three
 * unrelated ones. `space-y-2` groups them into a block while staying
 * unambiguous if a longer line ever wraps.
 *
 * Nothing here responds to scroll — the drawings render at rest and
 * carry their own slow idle loops (see `globals.css`).
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
        <section className="border-b border-rule-hairline py-8 last:border-b-0">
            <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-chapter md:gap-8">
                {/* Notes */}
                <div>
                    <h3 className="text-section font-bold tracking-tight text-ink-primary">
                        {tier.title}
                    </h3>

                    {/* `body` 16px in the serif prose face. DESIGN.md names
                        14px secondary copy as why the site reads cramped,
                        and cramped reads cold on the page that is asking
                        someone for something. */}
                    <div className="mt-4 space-y-1">
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
                        className="mt-6 inline-flex items-center gap-1.5 text-meta font-medium text-ink-secondary underline-offset-4 transition-colors duration-100 ease-out hover:text-accent hover:underline"
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

                {/*
                    Figure. All three capsules now draw into a square
                    150×150 viewBox at a fixed `h-32 w-32`, so every
                    chapter reserves an identical footprint. They did not
                    before: the coffee cup's box was 120 wide against the
                    other two at 150, which rendered it 128px against
                    their 160px and left a gutter that changed width from
                    one chapter to the next.
                */}
                <div className="order-first flex justify-start md:order-none">
                    <Capsule />
                </div>
            </div>
        </section>
    );
}
