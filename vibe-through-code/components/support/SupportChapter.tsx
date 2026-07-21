"use client";

import { useRef } from "react";
import { useChapterProgress } from "./useChapterProgress";
import { Conduit } from "./Conduit";
import { CoffeeCapsule } from "./CoffeeCapsule";
import { FilmCapsule } from "./FilmCapsule";
import { BuildCapsule } from "./BuildCapsule";
import { BlueprintSchematic } from "./BlueprintSchematic";
import { SupportTier } from "@/data/support";
import { cn } from "@/lib/utils";

interface SupportChapterProps {
    tier: SupportTier;
    index: number;
    total: number;
    onSelect: (tier: SupportTier) => void;
}

export function SupportChapter({ tier, index, total, onSelect }: SupportChapterProps) {
    const ref = useRef<HTMLElement>(null);
    const { progress } = useChapterProgress(ref);

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
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 py-20 md:grid-cols-[260px_1fr] md:gap-12">
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
                <div className="px-4 md:px-0">
                    <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">
                        {tier.label}
                    </p>
                    <h2 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl">
                        {tier.title}
                    </h2>
                    <p className="mt-4 text-lg text-neutral-400">
                        {tier.description}
                    </p>

                    {/* Narrative lines */}
                    <div className="mt-8 space-y-4">
                        {tier.narrative.map((line, i) => (
                            <p
                                key={i}
                                className={cn(
                                    "text-sm leading-relaxed transition-colors duration-700",
                                    progress > (i + 1) * 0.25
                                        ? "text-neutral-200"
                                        : "text-neutral-500"
                                )}
                            >
                                {line}
                            </p>
                        ))}
                    </div>

                    {/* Builder blueprint */}
                    {tier.id === "builder" && <BlueprintSchematic progress={progress} />}

                    {/* Inline CTA button */}
                    <button
                        type="button"
                        onClick={() => onSelect(tier)}
                        className={cn(
                            "group mt-10 inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-5 py-2.5",
                            "text-sm font-medium text-neutral-300 transition-all duration-200",
                            "hover:border-emerald-500/30 hover:bg-emerald-500/5 hover:text-emerald-400",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30"
                        )}
                    >
                        <span>
                            Support {tier.id === "builder" ? "this journey" : "this session"} — {tier.currency}{tier.price}
                            {tier.frequency && <span className="text-neutral-500">{tier.frequency}</span>}
                        </span>
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="transition-transform duration-200 group-hover:translate-x-0.5"
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