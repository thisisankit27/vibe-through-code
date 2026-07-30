import { cn } from "@/lib/utils";
import type { CurrentStatusData } from "./types";

/**
 * The bench — what is happening right now.
 *
 * The lit end of Direction D. This is the only region on the page where
 * the signal colour and motion are permitted; everything below it is the
 * record. Its job is to make Monday look different from Friday.
 *
 * Rules from DESIGN.md this encodes:
 *   - the number is the largest thing; the label sits above it in micro
 *   - every figure is mono and tabular
 *   - figures are never editorialised — `$0` renders as `$0`
 *   - the live pulse runs only when actually live, and stops under
 *     prefers-reduced-motion (handled globally in globals.css)
 */
export function Bench({ status }: { status: CurrentStatusData }) {
    return (
        <section
            aria-label="Current status"
            className="border-y border-rule-standard py-8"
        >
            <div className="flex items-center gap-2">
                <span
                    aria-hidden="true"
                    className={cn(
                        "relative flex h-2 w-2 shrink-0 rounded-full",
                        status.isLive ? "bg-accent-signal" : "bg-ink-tertiary"
                    )}
                >
                    {status.isLive && (
                        <span className="absolute inset-0 animate-ping rounded-full bg-accent-signal opacity-60" />
                    )}
                </span>

                <p className="text-micro font-medium uppercase tracking-wider text-accent">
                    {status.label}
                </p>
            </div>

            <p className="mt-3 max-w-2xl text-section text-ink-primary">
                {status.message}
            </p>

            {status.meta && status.meta.length > 0 && (
                <dl className="mt-8 grid grid-cols-3 gap-x-6 gap-y-6 sm:max-w-lg">
                    {status.meta.map((m) => (
                        <div key={m.label}>
                            <dt className="text-micro font-medium uppercase tracking-wider text-ink-tertiary">
                                {m.label}
                            </dt>
                            <dd className="mt-1 text-section tabular-nums text-ink-primary">
                                {m.value}
                            </dd>
                        </div>
                    ))}
                </dl>
            )}
        </section>
    );
}
