import { cn } from "@/lib/utils";

interface FoundationStoneProps {
    /**
     * The date the first Builder joined, `YYYY-MM-DD`.
     *
     * Read from `site_state.first_builder_on`, which **does not exist
     * yet** — and its absence is the point. This site records what has
     * happened; nothing has happened here, so there is no row. The stone
     * renders uninscribed because that is true, not as a placeholder.
     *
     * Write-once. Set exactly once, in /admin, on the day it happens,
     * and never edited again. A cornerstone that gets updated is not a
     * cornerstone, and the entire meaning of this element collapses with
     * it.
     */
    laidOn?: string;
}

/**
 * The foundation stone for the Builder tier.
 *
 * This is the page's memorable moment, and the brief for it was
 * "celebrate beginnings, not popularity" — which rules out anything that
 * counts or grows. A cornerstone is the one architectural object whose
 * whole purpose is to mark a start: laid once, inscribed with a date,
 * never updated. There is no such thing as a cornerstone count.
 *
 * It also belongs to the tier it sits in. The Builder illustration is a
 * building rising, and a building's first act is its foundation stone.
 *
 * **This must never display a total.** Not "3 Builders", not a meter,
 * not a plural. When a second Builder joins, nothing here changes — that
 * is the design, not a limitation. The moment it shows a count it has
 * become a popularity metric and the whole idea is lost.
 *
 * Both states are the same shape and size. Laying the stone does not
 * grow it or add to it; it only cuts the inscription and turns the
 * waiting rule solid. A beginning should look like something completing,
 * not something accumulating.
 */
export function FoundationStone({ laidOn }: FoundationStoneProps) {
    const laid = Boolean(laidOn);

    return (
        // No `bg-surface-sunk`. The first draft had one, which read well
        // — a stone set into a wall — but painting a surface creates a
        // contrast pair nobody has measured: `--ink-tertiary` is tuned to
        // 4.85:1 against `--surface-base` and drops to 4.44:1 on
        // `--surface-sunk`, under AA. The border alone still reads as a
        // discrete object, and the type keeps its full hierarchy.
        <div className="rounded-sm border border-rule-hairline px-4 py-3">
            <p className="text-micro font-medium uppercase tracking-wider text-ink-tertiary">
                Foundation
            </p>

            {/* The inscription slot. Identical height in both states, so
                the stone is cut rather than filled in. */}
            <p className="mt-1 text-meta">
                {laidOn ? (
                    <time dateTime={laidOn} className="text-ink-primary">
                        {laidOn}
                    </time>
                ) : (
                    <span className="text-ink-tertiary">Not yet laid</span>
                )}
            </p>

            <div
                className={cn(
                    "mt-2 border-t",
                    laid
                        ? "border-rule-standard"
                        : "border-dashed border-rule-standard"
                )}
            />

            <p className="mt-2 text-meta text-ink-secondary">
                {laid ? (
                    <>
                        Laid by the first Builder. Everything since has been
                        built together.
                    </>
                ) : (
                    <>
                        Builder doesn&rsquo;t exist yet. It starts with the
                        first supporter. Everything after that is built
                        together.
                    </>
                )}
            </p>
        </div>
    );
}
