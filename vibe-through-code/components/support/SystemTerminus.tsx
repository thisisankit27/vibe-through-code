"use client";

import type { SessionManifest } from "@/types/support";
import { cn } from "@/lib/utils";

interface SystemTerminusProps {
    /** Real day count, from `site_state.current_day`. */
    currentDay: number;
    /**
     * Supporter counts per tier. Omitted until a payments table exists —
     * the panel then renders its honest zero state rather than a placeholder.
     */
    sessionManifest?: SessionManifest;
}

const MANIFEST_SEGMENTS = 10;

export function SystemTerminus({
    currentDay,
    sessionManifest,
}: SystemTerminusProps) {
    const rows = [
        { label: "Coffee", count: sessionManifest?.coffee ?? 0 },
        { label: "Stream", count: sessionManifest?.stream ?? 0 },
        { label: "Builders", count: sessionManifest?.builders ?? 0 },
    ];

    const total = rows.reduce((sum, row) => sum + row.count, 0);

    return (
        <section className="relative pb-24 pt-16 md:pb-32 md:pt-24">
            <div className="mx-auto max-w-2xl px-6 text-center">
                {/* Glowing endpoint */}
                <div className="relative mx-auto mb-10 flex h-16 w-16 items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl" />
                    <div className="absolute inset-2 rounded-full bg-emerald-500/30 blur-md" />
                    <div className="relative h-4 w-4 rounded-full bg-emerald-400 shadow-[0_0_20px_rgba(0,230,118,0.5)]">
                        <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-30" />
                    </div>
                </div>

                <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">
                    System Terminus
                </p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                    The build is never finished.
                </h2>
                <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-neutral-400">
                    The journey is at Day {currentDay}. Something is always being built.
                </p>

                {/* Session Manifest */}
                <div className="mx-auto mt-12 max-w-sm rounded-lg border border-white/[0.06] bg-white/[0.02] p-6 text-left font-mono">
                    <p className="mb-4 text-[10px] font-semibold uppercase tracking-wider text-neutral-600">
                        Session Manifest
                    </p>

                    <div className="space-y-2 text-xs">
                        {rows.map((row) => (
                            <div
                                key={row.label}
                                className="flex items-center justify-between"
                            >
                                <span className="text-neutral-500">{row.label}</span>

                                <div className="flex items-center gap-3">
                                    <span className="text-neutral-300 tabular-nums">
                                        {row.count}{" "}
                                        {row.count === 1 ? "supporter" : "supporters"}
                                    </span>

                                    <div className="flex h-1.5 w-16 gap-px">
                                        {Array.from({ length: MANIFEST_SEGMENTS }).map(
                                            (_, i) => (
                                                <div
                                                    key={i}
                                                    className={cn(
                                                        "h-full flex-1 rounded-sm",
                                                        i < Math.min(MANIFEST_SEGMENTS, row.count)
                                                            ? "bg-emerald-500/60"
                                                            : "bg-white/5"
                                                    )}
                                                />
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {total === 0 && (
                        <p className="mt-4 text-[10px] text-neutral-600">
                            No supporters yet.
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
