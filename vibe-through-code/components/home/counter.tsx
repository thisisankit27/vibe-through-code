import { formatUsd } from "@/lib/utils";

const GOAL_CENTS = 1_000_000_00;
const METER_SEGMENTS = 40;

/**
 * The mission, as an instrument.
 *
 * The most important number on the site, and the one most likely to be
 * mishandled. Rules from DESIGN.md this encodes:
 *
 *   - It NEVER animates on load. A number that performs its own growth
 *     looks like it is lying.
 *   - The meter is honestly empty and is never rescaled to make early
 *     progress look larger.
 *   - Percentage runs to four decimals so real movement is visible
 *     rather than rounding to 0%.
 *   - `$0` is a designed state, not an absence.
 */
export function Counter({ revenueCents }: { revenueCents: number }) {
    const safe = Number.isFinite(revenueCents) ? Math.max(0, revenueCents) : 0;
    const share = safe / GOAL_CENTS;

    // Round DOWN so the meter never overstates.
    const filled = Math.min(METER_SEGMENTS, Math.floor(share * METER_SEGMENTS));
    const hasRevenue = safe > 0;

    return (
        <section aria-label="Progress to $1,000,000" className="py-8">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <p
                    className={
                        hasRevenue
                            ? "text-display tabular-nums text-revenue"
                            : "text-display tabular-nums text-ink-primary"
                    }
                >
                    {formatUsd(safe)}
                </p>
                <p className="text-section tabular-nums text-ink-tertiary">
                    / {formatUsd(GOAL_CENTS)}
                </p>
            </div>

            <div className="mt-6 flex items-center gap-4">
                <div
                    className="flex h-2 flex-1 gap-px"
                    role="img"
                    aria-label={`${(share * 100).toFixed(4)} percent of the goal`}
                >
                    {Array.from({ length: METER_SEGMENTS }).map((_, i) => (
                        <div
                            key={i}
                            className={
                                i < filled
                                    ? "h-full flex-1 rounded-sm bg-revenue"
                                    : "h-full flex-1 rounded-sm bg-surface-sunk"
                            }
                        />
                    ))}
                </div>

                <p className="text-meta tabular-nums text-ink-tertiary">
                    {(share * 100).toFixed(4)}%
                </p>
            </div>
        </section>
    );
}
