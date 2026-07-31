"use client";

import { useState } from "react";

import Container from "@/components/layout/container";
import {
    SupportChapter,
    SystemTerminus,
    ReceiptPanel,
    TierDecision,
} from "@/components/support";
import type {
    SupportTier,
    BuilderBenefit,
    SessionManifest,
} from "@/types/support";

interface SupportPageClientProps {
    supportTiers: SupportTier[];
    oneTime: SupportTier[];
    ongoing: SupportTier[];
    benefitsByTier: Record<string, BuilderBenefit[]>;
    builderBenefits: BuilderBenefit[];
    currentDay: number;
    /** `site_state.first_builder_on`; absent until it happens. */
    firstBuilderOn?: string;
    sessionManifest?: SessionManifest;
}

/**
 * /support, in three zones that run in sequence rather than at once.
 *
 *   DECIDE      every price, cadence and benefit, before any narrative
 *   UNDERSTAND  the capsule chapters — why each amount is worth it
 *   SITUATE     where the journey currently stands
 *
 * The page previously interleaved all three: each tier's price lived
 * inside the CTA at the bottom of its own full-viewport chapter, so no
 * two prices were ever simultaneously visible and comparing ₹99 with
 * ₹999 meant scrolling past two animations. Deciding and understanding
 * were competing for the same screen and neither won.
 *
 * Nothing was deleted to fix it. The chapters are intact — they just
 * stopped standing between a reader and the prices.
 */
export default function SupportPageClient({
    supportTiers,
    oneTime,
    ongoing,
    benefitsByTier,
    builderBenefits,
    currentDay,
    firstBuilderOn,
    sessionManifest,
}: SupportPageClientProps) {
    const [selectedTier, setSelectedTier] = useState<SupportTier | null>(null);
    const [isReceiptOpen, setIsReceiptOpen] = useState(false);

    const handleSelect = (tier: SupportTier) => {
        setSelectedTier(tier);
        setIsReceiptOpen(true);
    };

    const handleClose = () => {
        setIsReceiptOpen(false);
    };

    return (
        // One Container, one width, top to bottom. `app/layout.tsx`
        // already supplies the <main> landmark — this component rendering
        // its own put two on the page.
        <Container className="max-w-5xl pt-14 md:pt-20">
            <header className="max-w-2xl">
                <h1 className="text-title font-bold tracking-tight text-ink-primary">
                    Support
                </h1>
                <p className="mt-5 text-body text-ink-secondary">
                    This is one person building a company in the open, funded
                    by whoever thinks it should keep happening. Pick whichever
                    of these is worth it to you.
                </p>
            </header>

            <TierDecision
                oneTime={oneTime}
                ongoing={ongoing}
                benefitsByTier={benefitsByTier}
                firstBuilderOn={firstBuilderOn}
                onSelect={handleSelect}
            />

            {/* UNDERSTAND — the chapters keep their full scale, conduit
                and narrative. They answer "why this amount", which is the
                question a reader has *after* seeing the prices. */}
            {supportTiers.length > 0 && (
                <section aria-labelledby="what-it-funds" className="mt-20">
                    <h2
                        id="what-it-funds"
                        className="border-b border-rule-strong pb-2 text-micro font-medium uppercase tracking-wider text-ink-tertiary"
                    >
                        What each one funds
                    </h2>

                    <div className="relative">
                        {supportTiers.map((tier, index) => (
                            <SupportChapter
                                key={tier.id}
                                tier={tier}
                                index={index}
                                total={supportTiers.length}
                                onSelect={handleSelect}
                                builderBenefits={builderBenefits}
                                firstBuilderOn={firstBuilderOn}
                            />
                        ))}
                    </div>
                </section>
            )}

            <SystemTerminus
                currentDay={currentDay}
                sessionManifest={sessionManifest}
            />

            <ReceiptPanel
                isOpen={isReceiptOpen}
                onClose={handleClose}
                tier={selectedTier}
            />
        </Container>
    );
}
