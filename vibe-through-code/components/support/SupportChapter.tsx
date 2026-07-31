"use client";

import { useRef } from "react";
import { useInViewProgress } from "./use-in-view-progress";
import { actionFor } from "./tier-actions";
import { Conduit } from "./Conduit";
import { CoffeeCapsule } from "./CoffeeCapsule";
import { FilmCapsule } from "./FilmCapsule";
import { BuildCapsule } from "./BuildCapsule";
import { BlueprintSchematic } from "./BlueprintSchematic";
import type {
    SupportTier,
    BuilderBenefit,
} from "@/types/support";
import { cn } from "@/lib/utils";

interface SupportChapterProps {
    tier: SupportTier;
    index: number;
    total: number;
    builderBenefits: BuilderBenefit[];
    /** `site_state.first_builder_on`; changes the recurring tier's action. */
    firstBuilderOn?: string;
    onSelect: (tier: SupportTier) => void;
}

export function SupportChapter({
    tier,
    index,
    total,
    builderBenefits,
    firstBuilderOn,
    onSelect,
}: SupportChapterProps) {
    const ref = useRef<HTMLElement>(null);
    const { progress } = useInViewProgress(ref);

    const isFirst = index === 0;
    const isLast = index === total - 1;

    const CapsuleComponent =
        tier.id === "coffee"
            ? CoffeeCapsule
            : tier.id === "stream"
                ? FilmCapsule
                : BuildCapsule;

    return (
        <section ref={ref} className="relative">
            {/* No `mx-auto max-w-*` — the page supplies one Container and
                one width. This component setting its own was half of why
                /support visibly jumped width mid-scroll. */}
            <div className="grid grid-cols-1 gap-8 py-20 md:grid-cols-[260px_1fr] md:gap-12">
                {/* Left: Capsule (mobile) / Conduit + Capsule (desktop) */}
                <div className="flex justify-center md:block">
                    <div className="flex flex-col items-center md:sticky md:top-1/3">
                        {/* Capsule wrapper: explicit min-height prevents Safari flex collapse */}
                        <div className="flex shrink-0 items-center justify-center md:absolute md:left-1/2 md:top-0 md:-translate-x-1/2 md:pt-8">
                            <CapsuleComponent progress={progress} />
                        </div>
                        {/* Conduit: hidden on mobile, visible rail on desktop */}
                        <div className="hidden md:block">
                            <Conduit isFirst={isFirst} isLast={isLast} progress={progress} />
                        </div>
                    </div>
                </div>

                {/* Right: Narrative */}
                <div className="max-w-prose">
                    {/*
                        Title only — no eyebrow, no description.

                        Both live in the decision zone above, and rendering
                        them again here made the page say `tier.label` and
                        `tier.description` verbatim twice. The zones
                        partition the fields rather than duplicating them:
                        decide carries label, price, frequency, description
                        and benefits; understand carries the narrative. The
                        title appears in both only because a reader
                        scrolling into a chapter needs to know which tier
                        they are reading about.

                        h3, not h2 — the chapter sits inside a section that
                        carries the h2, and this string is already an h3 in
                        the decision zone. The same text at two heading
                        levels gives screen-reader users two entries with
                        nothing to distinguish them.
                    */}
                    <h3 className="text-section font-bold tracking-tight text-ink-primary">
                        {tier.title}
                    </h3>

                    {/* Narrative lines, at `body` 16px in the serif prose
                        face. DESIGN.md names 14px secondary copy as why
                        the site reads cramped, and cramped reads cold on
                        the page that is asking someone for something. */}
                    <div className="mt-6 space-y-4">
                        {tier.narrative.map((line, i) => (
                            <p
                                key={i}
                                className={cn(
                                    "text-body transition-colors duration-700",
                                    progress > (i + 1) * 0.25
                                        ? "text-ink-primary"
                                        : "text-ink-tertiary"
                                )}
                            >
                                {line}
                            </p>
                        ))}
                    </div>

                    {/* Builder blueprint */}
                    {tier.id === "builder" && <BlueprintSchematic
                        progress={progress}
                        builderBenefits={builderBenefits}
                    />}

                    {/*
                        A link, not a button. The ruled controls in the
                        decision zone above are where this action lives;
                        repeating them at equal weight here would put six
                        competing controls on one page. But a reader who
                        has just finished the argument for this tier
                        should not have to scroll back to act, so the same
                        `onSelect` is offered at link weight.

                        The price is deliberately absent — it is a field,
                        and it belongs in the aligned slot above where it
                        can be compared, not restated inside prose.
                    */}
                    <button
                        type="button"
                        onClick={() => onSelect(tier)}
                        className="group mt-10 inline-flex items-center gap-1.5 text-meta font-medium text-ink-secondary underline-offset-4 transition-colors duration-100 ease-out hover:text-accent hover:underline"
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