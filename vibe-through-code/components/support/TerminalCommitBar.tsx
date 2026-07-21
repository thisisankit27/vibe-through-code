"use client";

import { cn } from "@/lib/utils";

interface TerminalCommitBarProps {
    label: string;
    price: number;
    currency: string;
    frequency?: string;
    onClick?: () => void;
}

export function TerminalCommitBar({
    label,
    price,
    currency,
    frequency,
    onClick,
}: TerminalCommitBarProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "group relative mt-12 flex w-full items-center justify-center gap-4",
                "border-y border-white/[0.06] bg-white/[0.01] py-5",
                "transition-all duration-300",
                "hover:border-emerald-500/20 hover:bg-emerald-500/[0.02]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30"
            )}
        >
            {/* Left branch line */}
            <div className="hidden h-px flex-1 bg-white/[0.06] transition-colors group-hover:bg-emerald-500/20 sm:block" />

            <span className="shrink-0 text-sm font-medium text-neutral-400 transition-colors group-hover:text-emerald-400">
                {label}
            </span>
            <span className="shrink-0 font-mono text-sm text-neutral-500 transition-colors group-hover:text-neutral-300">
                {currency}{price}
                {frequency && <span className="text-neutral-600">{frequency}</span>}
            </span>

            {/* Right branch line */}
            <div className="hidden h-px flex-1 bg-white/[0.06] transition-colors group-hover:bg-emerald-500/20 sm:block" />

            {/* Hover arrow */}
            <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 text-neutral-600 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-emerald-400"
            >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
            </svg>
        </button>
    );
}