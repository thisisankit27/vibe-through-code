"use client";

import type { SupportTier, BuilderBenefit } from "@/types/support";
import { TierOption } from "./tier-option";
import { actionFor } from "./tier-actions";

interface TierDecisionProps {
    oneTime: SupportTier[];
    ongoing: SupportTier[];
    /** Keyed by tier id. Only `builder` carries any today. */
    benefitsByTier: Record<string, BuilderBenefit[]>;
    /** `site_state.first_builder_on`; absent until it happens. */
    firstBuilderOn?: string;
    onSelect: (tier: SupportTier) => void;
}

/**
 * The decision zone — everything needed to answer "which one?", before
 * any narrative.
 *
 * Grouped by CADENCE rather than laid out as three symmetric columns,
 * because the three tiers are not three parallel products. `coffee` and
 * `stream` are the same product — a one-time contribution — at two
 * amounts, differing only in the story attached. `builder` is the only
 * row with a `frequency`, and the only one carrying benefits.
 *
 * A symmetric three-column comparison would assert a parallelism the
 * data does not have, and its benefits row would read "— — ✓" four times
 * over, framing the cheaper tiers as deficient rather than different.
 * That is a false claim made by layout.
 *
 * No filled button anywhere. Filling one would express a preference
 * between amounts that this site has no basis for. The warmth is carried
 * by the action labels instead — see `tier-actions.ts`.
 */
function Group({
    heading,
    tiers,
    benefitsByTier,
    firstBuilderOn,
    onSelect,
}: {
    heading: string;
    tiers: SupportTier[];
    benefitsByTier: Record<string, BuilderBenefit[]>;
    firstBuilderOn?: string;
    onSelect: (tier: SupportTier) => void;
}) {
    // An empty group renders nothing at all — not a heading over a gap.
    if (tiers.length === 0) return null;

    return (
        <section aria-label={heading} className="mt-12 first:mt-0">
            <h2 className="border-b border-rule-strong pb-2 text-micro font-medium uppercase tracking-wider text-ink-tertiary">
                {heading}
            </h2>

            <div className="mt-8 grid gap-x-12 gap-y-10 md:grid-cols-2">
                {tiers.map((tier) => (
                    <TierOption
                        key={tier.id}
                        tier={tier}
                        benefits={benefitsByTier[tier.id]}
                        action={actionFor(tier, firstBuilderOn)}
                        // A one-time contribution has no beginning to
                        // mark; only a recurring commitment does.
                        foundation={Boolean(tier.frequency)}
                        firstBuilderOn={firstBuilderOn}
                        onSelect={onSelect}
                    />
                ))}
            </div>
        </section>
    );
}

export function TierDecision({
    oneTime,
    ongoing,
    benefitsByTier,
    firstBuilderOn,
    onSelect,
}: TierDecisionProps) {
    if (oneTime.length === 0 && ongoing.length === 0) {
        return (
            <p className="mt-10 border-t border-rule-strong pt-6 text-body text-ink-tertiary">
                No support options are set up yet.
            </p>
        );
    }

    return (
        <div className="mt-10">
            <Group
                heading="One-time"
                tiers={oneTime}
                benefitsByTier={benefitsByTier}
                firstBuilderOn={firstBuilderOn}
                onSelect={onSelect}
            />
            <Group
                heading="Ongoing"
                tiers={ongoing}
                benefitsByTier={benefitsByTier}
                firstBuilderOn={firstBuilderOn}
                onSelect={onSelect}
            />
        </div>
    );
}
