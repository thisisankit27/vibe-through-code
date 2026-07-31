"use client";

import type { BuilderBenefit } from "@/types/support";
import { cn } from "@/lib/utils";

interface BlueprintSchematicProps {
    progress: number;
    builderBenefits: BuilderBenefit[];
}

/**
 * Nodes light in sequence as the chapter plays.
 *
 * Derived from the benefit count rather than the hardcoded
 * `[0.08, 0.25, 0.45, 0.65]` this used to carry — that array was indexed
 * by benefit position and returned `undefined` for any list that was not
 * exactly four long, which would have left later nodes permanently lit.
 * The count becomes data-driven in M4.2b.
 *
 * The last node lights at 0.7 rather than 1.0 so the sequence finishes
 * before the capsule does.
 */
function thresholdFor(index: number, count: number): number {
    if (count <= 0) return 0;
    return ((index + 1) / (count + 1)) * 0.7;
}

export function BlueprintSchematic({
    progress,
    builderBenefits,
}: BlueprintSchematicProps) {
    // Nothing to diagram. An empty bordered box is worse than no box.
    if (builderBenefits.length === 0) return null;

    return (
        <div className="mt-8 rounded-lg border border-rule-hairline bg-surface-raised p-5">
            <p className="mb-4 text-micro font-semibold uppercase tracking-wider text-ink-tertiary">
                Builder Ecosystem Schematic
            </p>
            <div className="space-y-3">
                {builderBenefits.map((benefit, index) => {
                    const isLit =
                        progress >=
                        thresholdFor(index, builderBenefits.length);
                    return (
                        <div key={benefit.id} className="relative flex items-center gap-4">
                            {/* Connection line. Centred on the node by
                                geometry rather than by eye: the node is
                                h-4 (16px), so its centre is 8px in, less
                                half the 1px rule. `left-[7px]` was that
                                arithmetic done by hand. */}
                            {index > 0 && (
                                <div className="absolute -top-3 left-2 h-3 w-px -translate-x-1/2 bg-surface-hover" />
                            )}
                            {/* Node */}
                            <div
                                className={cn(
                                    "relative z-10 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors duration-700",
                                    isLit
                                        ? "border-accent/50 bg-accent/20"
                                        : "border-rule-standard bg-surface-raised"
                                )}
                            >
                                <div
                                    className={cn(
                                        "h-1.5 w-1.5 rounded-full transition-colors duration-700",
                                        isLit ? "bg-accent" : "bg-surface-hover"
                                    )}
                                />
                            </div>
                            {/* Label block */}
                            <div
                                className={cn(
                                    "flex-1 rounded-sm border px-3 py-2 transition-colors duration-700",
                                    isLit
                                        ? "border-accent/20 bg-accent/3"
                                        : "border-rule-hairline bg-surface-raised"
                                )}
                            >
                                {/*
                                    Label only. `benefit.description` used
                                    to render here as well as in the
                                    decision zone above, so the same four
                                    sentences appeared twice on one page.
                                    The decision zone is where benefits are
                                    compared and keeps the full text; this
                                    is a visual index of what was already
                                    read, and the lit-node reveal is what
                                    it contributes.
                                */}
                                <p
                                    className={cn(
                                        "font-mono text-micro font-semibold uppercase tracking-wider transition-colors duration-700",
                                        isLit ? "text-accent" : "text-ink-tertiary"
                                    )}
                                >
                                    {benefit.label}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}