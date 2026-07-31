"use client";

import type { SupportTier, BuilderBenefit } from "@/types/support";
import { FoundationStone } from "./foundation-stone";

interface TierOptionProps {
    tier: SupportTier;
    /** Rendered only for tiers that actually carry benefits. */
    benefits?: BuilderBenefit[];
    /** Label for the action. Says what the money does, in the tier's voice. */
    action: string;
    /**
     * Renders the foundation stone beneath the benefits. Set for the
     * recurring tier only — a one-time contribution has no beginning to
     * mark, and putting a stone on all three would make it decoration.
     */
    foundation?: boolean;
    /** `site_state.first_builder_on`; absent until it happens. */
    firstBuilderOn?: string;
    onSelect: (tier: SupportTier) => void;
}

/**
 * One choice in the decision zone.
 *
 * The single place a price is rendered on this page. That is deliberate:
 * the ₹→USD migration is a later milestone, and centralising the format
 * here makes it a one-file change when it comes.
 *
 * The price is mono and tabular and sits in a fixed slot so it compares
 * down the column — but it is NOT the largest thing, which is where this
 * page departs from `DESIGN.md`'s statistics rule. That rule exists so
 * figures read as measurement rather than decoration, and it is right for
 * a revenue counter, where the number *is* the information. A price is
 * not a measurement of the journey; it is the cost of joining it.
 * Rendering it at display scale turns an invitation into a price tag.
 * Alignment does the comparison work here, not size.
 */
export function TierOption({
    tier,
    benefits,
    action,
    foundation = false,
    firstBuilderOn,
    onSelect,
}: TierOptionProps) {
    return (
        <div className="flex h-full flex-col">
            <p className="text-micro font-medium uppercase tracking-eyebrow text-accent">
                {tier.label}
            </p>

            <div className="mt-3 flex flex-wrap items-baseline gap-x-3">
                <h3 className="text-section font-bold tracking-tight text-ink-primary">
                    {tier.title}
                </h3>
                <p className="font-mono text-section text-ink-primary tabular-nums">
                    {tier.currency}
                    {tier.price}
                    {tier.frequency && (
                        <span className="text-meta text-ink-tertiary">
                            {tier.frequency}
                        </span>
                    )}
                </p>
            </div>

            {/* Serif, 16px. The rest of the site runs 14px for secondary
                copy; DESIGN.md calls that out as why the site reads
                cramped, and cramped reads cold on the one page that is
                asking someone for something. */}
            <p className="mt-3 text-body text-ink-secondary">
                {tier.description}
            </p>

            {benefits && benefits.length > 0 && (
                <ul className="mt-5 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                    {benefits.map((benefit) => (
                        <li
                            key={benefit.id}
                            className="flex items-baseline gap-2 text-meta text-ink-secondary"
                        >
                            <span
                                className="text-accent-signal"
                                aria-hidden="true"
                            >
                                ▸
                            </span>
                            {benefit.description}
                        </li>
                    ))}
                </ul>
            )}

            {/* The stone sits last before the action, so the beat lands
                on the decision rather than after it. */}
            {foundation && (
                <div className="mt-6">
                    <FoundationStone laidOn={firstBuilderOn} />
                </div>
            )}

            <div className="mt-auto pt-6">
                {/*
                    `border-ink-tertiary`, not `border-rule-standard`.
                    The rule tokens are for separating content, and
                    measured against `--surface-base` they land at 1.42:1
                    — under the 3:1 that WCAG 1.4.11 asks of a control
                    boundary. That is not a checker technicality here: the
                    whole reason these are ruled rather than filled is to
                    present three amounts at equal weight, and a ruled
                    button whose rule is invisible is just text.
                    `ink-tertiary` clears it at 4.85:1 / 5.14:1.
                */}
                <button
                    type="button"
                    onClick={() => onSelect(tier)}
                    className="inline-flex items-center rounded-md border border-ink-tertiary px-5 py-2.5 text-meta font-medium text-ink-primary transition-colors duration-100 ease-out hover:border-accent hover:bg-accent/5 hover:text-accent"
                >
                    {action}
                </button>
            </div>
        </div>
    );
}
