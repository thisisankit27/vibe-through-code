import { cn } from "@/lib/utils";
import { recencyAttr, type RecencyState } from "@/lib/recency";
import type { JourneyEventData } from "@/components/journey/types";

import { EventGlyph, eventLabel, eventTone } from "./event-glyph";

/**
 * One entry in the record.
 *
 * H3 REVERSIBILITY: this component renders CONTENT, never its container.
 * It groups date / type / body / meta and applies no padding, border,
 * background, or grid of its own — `Ledger` supplies all of that via
 * `[data-ledger]` rules in globals.css. Switching the whole record from
 * ruled rows to cards is therefore one word on the parent, with no
 * change here.
 *
 * Consequences to preserve if you edit this file:
 *   - no absolute positioning, no column indices
 *   - no `variant`, `featured`, or `isHighlighted` prop; emphasis is a
 *     function of `recency`, which is computed in lib/recency.ts
 */
interface LedgerEntryProps {
    event: JourneyEventData;
    recency: RecencyState;
}

export function LedgerEntry({ event, recency }: LedgerEntryProps) {
    const tone = eventTone(event.type);

    const toneClass =
        tone === "revenue"
            ? "text-revenue"
            : tone === "failure"
              ? "text-failure"
              : "text-ink-tertiary";

    return (
        <li
            {...recencyAttr(recency)}
            className="ledger-entry text-entry-ink"
        >
            {/* Date — fixed column, mono, sortable by eye */}
            <time
                dateTime={event.date}
                className="text-micro font-medium uppercase tracking-wider text-ink-tertiary tabular-nums"
            >
                {event.date}
                {event.time && (
                    <span className="hidden md:inline"> {event.time}</span>
                )}
            </time>

            {/* Type — glyph plus terse label. Never a hue. */}
            <span className="flex items-center gap-1.5">
                <span className={cn("ledger-entry__marker shrink-0", toneClass)}>
                    <EventGlyph type={event.type} />
                </span>
                <span className="text-micro font-medium uppercase tracking-wider text-ink-tertiary">
                    {eventLabel(event.type)}
                </span>
            </span>

            {/* Body */}
            <div className="min-w-0">
                <h3 className="text-meta font-medium">
                    {event.href ? (
                        <a
                            href={event.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline-offset-4 transition-colors duration-100 ease-out hover:text-accent hover:underline"
                        >
                            {event.title}
                        </a>
                    ) : (
                        event.title
                    )}
                </h3>

                {/*
                    Archive entries omit the description entirely rather
                    than hiding it with CSS. Hiding still ships the bytes:
                    at 800 entries that was 2.6 MB of HTML, most of it text
                    no one could read. Density in the archive is a payload
                    decision as much as a visual one.
                */}
                {event.description && recency !== "archive" && (
                    <p className="ledger-entry__description mt-1 text-meta text-ink-secondary">
                        {event.description}
                    </p>
                )}
            </div>

            {/* Meta — right-aligned figures so magnitudes compare down the column */}
            {event.meta && event.meta.length > 0 && (
                <dl className="flex flex-wrap gap-x-4 gap-y-1 md:justify-end">
                    {event.meta.map((m) => (
                        <div key={m.label} className="flex items-baseline gap-1.5">
                            <dt className="text-micro uppercase tracking-wider text-ink-tertiary">
                                {m.label}
                            </dt>
                            <dd
                                className={cn(
                                    "text-micro tabular-nums",
                                    tone === "revenue"
                                        ? "text-revenue"
                                        : "text-ink-secondary"
                                )}
                            >
                                {m.value}
                            </dd>
                        </div>
                    ))}
                </dl>
            )}
        </li>
    );
}
