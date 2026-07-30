import { withRecency } from "@/lib/recency";
import type { JourneyEventData } from "@/components/journey/types";

import { GlyphSprite } from "./event-glyph";
import { LedgerEntry } from "./ledger-entry";

/**
 * The record.
 *
 * Owns layout so `LedgerEntry` doesn't have to — see the `[data-ledger]`
 * rules in globals.css. `presentation` is the H3 switch and the only
 * place either treatment is named.
 *
 * The list is never truncated. If it needs to be shorter, slice the
 * QUERY, not the render — the premise of this site is that the record
 * is complete.
 */
interface LedgerProps {
    events: JourneyEventData[];
    /** H3: "rows" is the hypothesis under test; "cards" is the control. */
    presentation?: "rows" | "cards";
    /** From site_state.is_live — only the newest entry can be live. */
    isLive?: boolean;
}

export function Ledger({
    events,
    presentation = "rows",
    isLive = false,
}: LedgerProps) {
    if (events.length === 0) {
        return (
            <p className="py-8 text-meta text-ink-tertiary">Nothing logged yet.</p>
        );
    }

    // Recency is resolved once for the whole set so the "newest entry
    // stays lit" rule is applied consistently. Never compute this
    // per-item at the call site.
    const entries = withRecency(events, (e) => entryTimestamp(e), { isLive });

    return (
        <>
            <GlyphSprite />
            <ol data-ledger={presentation} className="w-full">
                {entries.map(({ item, recency }) => (
                    <LedgerEntry key={item.id} event={item} recency={recency} />
                ))}
            </ol>
        </>
    );
}

/** `date` is a day; `time` refines it when present. */
function entryTimestamp(event: JourneyEventData): string {
    return event.time ? `${event.date}T${event.time}` : event.date;
}
