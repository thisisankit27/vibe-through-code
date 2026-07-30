"use client";

import { cn } from "@/lib/utils";

export function ContributionCTA() {
    return (
        <div className="relative overflow-hidden rounded-2xl border border-rule-hairline bg-surface-raised px-6 py-12 text-center md:px-12 md:py-16">

            <div className="relative z-10">
                <p className="text-sm uppercase tracking-[0.3em] text-accent">
                    Open Journey
                </p>
                <h3 className="mt-3 text-3xl font-bold tracking-tight text-ink-primary md:text-4xl">
                    Become part of the journey.
                </h3>
                <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-ink-secondary">
                    This is a public build. Contributions, collaborations, and conversations are always welcome. If you are building something interesting, let us vibe through code together.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <a
                        href="https://github.com/thisisankit27/vibe-through-code"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            "inline-flex items-center gap-2 rounded-xl border border-rule-standard",
                            "bg-surface-raised px-5 py-3 text-sm font-medium text-ink-secondary",
                            "transition-all duration-200",
                            "hover:border-accent/30 hover:bg-accent/5 hover:text-accent"
                        )}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                            <path d="M9 18c-4.51 2-5-2-7-2" />
                        </svg>
                        <span>Contribute on GitHub</span>
                    </a>
                    <a
                        href="#"
                        className={cn(
                            "inline-flex items-center gap-2 rounded-xl border border-rule-standard",
                            "bg-surface-raised px-5 py-3 text-sm font-medium text-ink-secondary",
                            "transition-all duration-200",
                            "hover:border-rule-standard hover:bg-surface-hover hover:text-ink-primary"
                        )}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="20" height="16" x="2" y="4" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                        <span>Get in touch</span>
                    </a>
                </div>
            </div>
        </div>
    );
}