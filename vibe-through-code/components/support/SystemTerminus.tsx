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
            {/* No `px-*` — the page's Container already supplies the
                horizontal inset, and setting it again here stacked the
                padding. */}
            <div className="mx-auto max-w-2xl text-center">
                {/*
                    The endpoint. A ringed marker rather than a bloom —
                    depth is rules and surface steps in both themes, so
                    this reads the same with the lights on or off.
                */}
                <div className="relative mx-auto mb-10 flex h-16 w-16 items-center justify-center">
                    <div className="absolute inset-0 rounded-full border border-rule-hairline" />
                    <div className="absolute inset-4 rounded-full border border-rule-standard" />
                    <div className="relative h-2.5 w-2.5 rounded-full bg-accent-signal">
                        <div className="absolute inset-0 animate-ping rounded-full bg-accent-signal opacity-40" />
                    </div>
                </div>

                <p className="text-sm uppercase tracking-[0.3em] text-accent">
                    System Terminus
                </p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink-primary md:text-4xl">
                    The build is never finished.
                </h2>
                <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink-secondary">
                    The journey is at Day {currentDay}. Something is always being built.
                </p>

                {/* Session Manifest */}
                <div className="mx-auto mt-12 max-w-sm rounded-lg border border-rule-hairline bg-surface-raised p-6 text-left font-mono">
                    <p className="mb-4 text-[10px] font-semibold uppercase tracking-wider text-ink-tertiary">
                        Session Manifest
                    </p>

                    <div className="space-y-2 text-xs">
                        {rows.map((row) => (
                            <div
                                key={row.label}
                                className="flex items-center justify-between"
                            >
                                <span className="text-ink-tertiary">{row.label}</span>

                                <div className="flex items-center gap-3">
                                    <span className="text-ink-secondary tabular-nums">
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
                                                            ? "bg-accent/60"
                                                            : "bg-surface-hover"
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
                        <p className="mt-4 text-[10px] text-ink-tertiary">
                            No supporters yet.
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
