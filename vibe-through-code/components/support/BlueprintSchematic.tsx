"use client";

import { builderBenefits } from "@/data/support";
import { cn } from "@/lib/utils";

interface BlueprintSchematicProps {
    progress: number;
}

export function BlueprintSchematic({ progress }: BlueprintSchematicProps) {
    // Lowered thresholds — everything lights up earlier
    const thresholds = [0.08, 0.25, 0.45, 0.65];

    return (
        <div className="mt-8 rounded-lg border border-white/[0.06] bg-white/[0.02] p-5">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-wider text-neutral-600">
                Builder Ecosystem Schematic
            </p>
            <div className="space-y-3">
                {builderBenefits.map((benefit, index) => {
                    const isLit = progress >= thresholds[index];
                    return (
                        <div key={benefit.id} className="relative flex items-center gap-4">
                            {/* Connection line */}
                            {index > 0 && (
                                <div className="absolute -top-3 left-[7px] h-3 w-px bg-white/[0.06]" />
                            )}
                            {/* Node */}
                            <div
                                className={cn(
                                    "relative z-10 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-all duration-500",
                                    isLit
                                        ? "border-emerald-500/50 bg-emerald-500/20 shadow-[0_0_8px_rgba(0,230,118,0.3)]"
                                        : "border-white/10 bg-white/[0.02]"
                                )}
                            >
                                <div
                                    className={cn(
                                        "h-1.5 w-1.5 rounded-full transition-all duration-500",
                                        isLit ? "bg-emerald-400" : "bg-neutral-700"
                                    )}
                                />
                            </div>
                            {/* Label block */}
                            <div
                                className={cn(
                                    "flex-1 rounded border px-3 py-2 transition-all duration-500",
                                    isLit
                                        ? "border-emerald-500/20 bg-emerald-500/[0.03]"
                                        : "border-white/[0.04] bg-white/[0.01]"
                                )}
                            >
                                <p
                                    className={cn(
                                        "font-mono text-[10px] font-semibold uppercase tracking-wider transition-colors duration-500",
                                        isLit ? "text-emerald-400" : "text-neutral-600"
                                    )}
                                >
                                    {benefit.label}
                                </p>
                                <p
                                    className={cn(
                                        "mt-0.5 text-xs transition-colors duration-500",
                                        isLit ? "text-neutral-200" : "text-neutral-600"
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