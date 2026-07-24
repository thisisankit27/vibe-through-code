"use client";

import { sessionManifest } from "@/data/support2";
import { cn } from "@/lib/utils";

export function SystemTerminus() {
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
                    The journey is at Day 47. The next stream is tomorrow. Something is always being built.
                </p>

                {/* Session Manifest */}
                <div className="mx-auto mt-12 max-w-sm rounded-lg border border-white/[0.06] bg-white/[0.02] p-6 text-left font-mono">
                    <p className="mb-4 text-[10px] font-semibold uppercase tracking-wider text-neutral-600">
                        Session Manifest
                    </p>
                    <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                            <span className="text-neutral-500">Coffee</span>
                            <div className="flex items-center gap-3">
                                <span className="text-neutral-300">{sessionManifest.coffee} supporters</span>
                                <div className="flex h-1.5 w-16 gap-px">
                                    {[...Array(10)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={cn(
                                                "h-full flex-1 rounded-sm",
                                                i < Math.min(10, sessionManifest.coffee)
                                                    ? "bg-emerald-500/60"
                                                    : "bg-white/5"
                                            )}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-neutral-500">Stream</span>
                            <div className="flex items-center gap-3">
                                <span className="text-neutral-300">{sessionManifest.stream} supporters</span>
                                <div className="flex h-1.5 w-16 gap-px">
                                    {[...Array(10)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={cn(
                                                "h-full flex-1 rounded-sm",
                                                i < Math.min(10, sessionManifest.stream)
                                                    ? "bg-emerald-500/60"
                                                    : "bg-white/5"
                                            )}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-neutral-500">Builders</span>
                            <div className="flex items-center gap-3">
                                <span className="text-neutral-300">{sessionManifest.builders} supporter</span>
                                <div className="flex h-1.5 w-16 gap-px">
                                    {[...Array(10)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={cn(
                                                "h-full flex-1 rounded-sm",
                                                i < Math.min(10, sessionManifest.builders)
                                                    ? "bg-emerald-500/60"
                                                    : "bg-white/5"
                                            )}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Signature input */}
                <div className="mx-auto mt-12 max-w-md">
                    <p className="text-sm text-neutral-400">
                        Leave your mark on the journey.
                    </p>
                    <div className="mt-4 flex gap-2">
                        <input
                            type="text"
                            placeholder="Name or handle"
                            className={cn(
                                "flex-1 rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-2.5",
                                "text-sm text-white placeholder:text-neutral-600",
                                "focus:border-emerald-500/30 focus:outline-none focus:ring-1 focus:ring-emerald-500/20"
                            )}
                        />
                        <button
                            type="button"
                            className={cn(
                                "rounded-lg border border-white/[0.08] bg-white/[0.03] px-5 py-2.5",
                                "text-sm font-medium text-neutral-300",
                                "transition-all duration-200",
                                "hover:border-emerald-500/30 hover:bg-emerald-500/5 hover:text-emerald-400"
                            )}
                        >
                            Sign
                        </button>
                    </div>
                    <p className="mt-2 text-[10px] text-neutral-600">
                        No email required. Just a signature in the build log.
                    </p>
                </div>
            </div>
        </section>
    );
}