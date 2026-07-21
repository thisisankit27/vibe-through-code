"use client";

import { useRef } from "react";
import { useChapterProgress } from "./useChapterProgress";
import { Conduit } from "./Conduit";
import { CoffeeCapsule } from "./CoffeeCapsule";
import { FilmCapsule } from "./FilmCapsule";
import { BuildCapsule } from "./BuildCapsule";
import { BlueprintSchematic } from "./BlueprintSchematic";
import { TerminalCommitBar } from "./TerminalCommitBar";
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
        <section
            ref={ref}
            className="relative min-h-[120vh]"
        >
            <div className="mx-auto flex max-w-6xl">
                {/* Left: Conduit + Capsule */}
                <div className="relative w-20 shrink-0 md:w-32">
                    <div className="sticky top-1/3 flex flex-col items-center">
                        <Conduit isFirst={isFirst} isLast={isLast} progress={progress} />
                        <div className="absolute left-1/2 top-0 -translate-x-1/2 pt-8">
                            <CapsuleComponent progress={progress} />
                        </div>
                    </div>
                </div>

                {/* Right: Narrative */}
                <div className="flex-1 px-4 pb-32 pt-32 md:px-8 md:pb-40 md:pt-40">
                    <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">
                        {tier.label}
                    </p>
                    <h2 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl">
                        {tier.title}
                    </h2>
                    <p className="mt-4 text-lg text-neutral-400">
                        {tier.description}
                    </p>

                    {/* Narrative lines — brighter, no opacity fade */}
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

                    {/* Terminal commit bar */}
                    <TerminalCommitBar
                        label={`Support ${tier.id === "builder" ? "this journey" : "this session"} — ${tier.currency}${tier.price}`}
                        price={tier.price}
                        currency={tier.currency}
                        frequency={tier.frequency}
                        onClick={() => onSelect(tier)}
                    />
                </div>
            </div>
        </section>
    );
}