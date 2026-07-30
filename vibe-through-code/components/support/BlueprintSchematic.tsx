"use client";

import type { BuilderBenefit } from "@/types/support";
import { cn } from "@/lib/utils";

interface BlueprintSchematicProps {
    progress: number;
    builderBenefits: BuilderBenefit[];
}

export function BlueprintSchematic({
    progress,
    builderBenefits,
}: BlueprintSchematicProps) {
    // Lowered thresholds — everything lights up earlier
    const thresholds = [0.08, 0.25, 0.45, 0.65];

    return (
        <div className="mt-8 rounded-lg border border-rule-hairline bg-surface-raised p-5">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-wider text-ink-tertiary">
                Builder Ecosystem Schematic
            </p>
            <div className="space-y-3">
                {builderBenefits.map((benefit, index) => {
                    const isLit = progress >= thresholds[index];
                    return (
                        <div key={benefit.id} className="relative flex items-center gap-4">
                            {/* Connection line */}
                            {index > 0 && (
                                <div className="absolute -top-3 left-[7px] h-3 w-px bg-surface-hover" />
                            )}
                            {/* Node */}
                            <div
                                className={cn(
                                    "relative z-10 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-all duration-500",
                                    isLit
                                        ? "border-accent/50 bg-accent/20"
                                        : "border-rule-standard bg-surface-raised"
                                )}
                            >
                                <div
                                    className={cn(
                                        "h-1.5 w-1.5 rounded-full transition-all duration-500",
                                        isLit ? "bg-accent" : "bg-surface-hover"
                                    )}
                                />
                            </div>
                            {/* Label block */}
                            <div
                                className={cn(
                                    "flex-1 rounded border px-3 py-2 transition-all duration-500",
                                    isLit
                                        ? "border-accent/20 bg-accent/3"
                                        : "border-rule-hairline bg-surface-raised"
                                )}
                            >
                                <p
                                    className={cn(
                                        "font-mono text-[10px] font-semibold uppercase tracking-wider transition-colors duration-500",
                                        isLit ? "text-accent" : "text-ink-tertiary"
                                    )}
                                >
                                    {benefit.label}
                                </p>
                                <p
                                    className={cn(
                                        "mt-0.5 text-xs transition-colors duration-500",
                                        isLit ? "text-ink-primary" : "text-ink-tertiary"
                                    )}
                                >
                                    {benefit.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}