/**
 * Recency — the organizing rule of Direction D.
 *
 * Visual temperature encodes how recent something is. What is happening
 * now is lit; what has happened is recorded.
 *
 * This is the ONLY place that decides how recent something is. Components
 * receive a `RecencyState` and spread `recencyAttr()` onto an element;
 * `globals.css` maps `[data-recency]` to the ink, rule and signal tokens.
 *
 * The rule that keeps this from becoming two design systems:
 *
 *   Recency is COMPUTED, never hand-applied.
 *
 * No component may accept an `isHighlighted`, `featured`, or `emphasis`
 * prop. The moment emphasis becomes an author's choice rather than a
 * function of time, the system has failed — that is precisely how this
 * codebase accumulated two unmerged design generations before.
 */

export type RecencyState = "live" | "today" | "recent" | "archive";

/**
 * Days after which an entry is considered archival.
 *
 * Deliberately a small, named constant rather than a magic number spread
 * across components. Any threshold is arbitrary; what matters is that it
 * is decided once. See `resolveRecency` for why the newest entry is a
 * special case.
 */
export const RECENT_WINDOW_DAYS = 7;

const MS_PER_DAY = 86_400_000;

/** Accepts what the DB and the admin actually produce. */
export type DateLike = Date | string | number | null | undefined;

function toTime(value: DateLike): number | null {
    if (value == null) return null;

    const date = value instanceof Date ? value : new Date(value);
    const time = date.getTime();

    return Number.isNaN(time) ? null : time;
}

/** Whole days between two instants, floored. Negative for future dates. */
function daysBetween(from: number, to: number): number {
    return Math.floor((to - from) / MS_PER_DAY);
}

export interface ResolveRecencyOptions {
    /**
     * True when the site is actually streaming — `site_state.is_live`.
     * Only ever true for the current session.
     */
    isLive?: boolean;

    /**
     * Timestamp of the newest entry in the set being rendered. When an
     * entry matches it, it is treated as `today` regardless of its date.
     *
     * This is why the rule is relative rather than absolute: the bright
     * edge should be the most recent work, not "work done in the last
     * 7 days". A week off must not make the whole site archival — that
     * would punish honesty about a gap, which is off-brand.
     */
    newestAt?: DateLike;

    /** Injectable for deterministic tests. */
    now?: DateLike;
}

/**
 * Maps a timestamp to a visual state.
 *
 * - `live`    the site is streaming and this is the current session
 * - `today`   same calendar-day age as now, or the newest entry in the set
 * - `recent`  within RECENT_WINDOW_DAYS
 * - `archive` everything older, and anything undated
 *
 * Undated entries resolve to `archive` rather than throwing: an entry with
 * no timestamp is not "new", and the ledger must never fail to render.
 */
export function resolveRecency(
    at: DateLike,
    options: ResolveRecencyOptions = {}
): RecencyState {
    const now = toTime(options.now) ?? Date.now();
    const time = toTime(at);

    if (time === null) return "archive";

    const newest = toTime(options.newestAt);
    const isNewest = newest !== null && time >= newest;

    if (options.isLive && isNewest) return "live";

    const age = daysBetween(time, now);

    // Future-dated entries are treated as current rather than hidden —
    // a scheduled stream is not archival.
    if (age <= 0 || isNewest) return "today";
    if (age <= RECENT_WINDOW_DAYS) return "recent";

    return "archive";
}

/**
 * Spread onto the element that should carry the recency treatment.
 *
 *   <li {...recencyAttr(state)}>
 *
 * Returning an object rather than a string keeps call sites from
 * assembling the attribute name by hand.
 */
export function recencyAttr(state: RecencyState): { "data-recency": RecencyState } {
    return { "data-recency": state };
}

/**
 * Convenience for rendering a list: resolves the newest entry once and
 * returns each item paired with its state.
 *
 * Callers should not compute `newestAt` themselves — doing so per-item is
 * how the relative rule gets applied inconsistently.
 */
export function withRecency<T>(
    items: T[],
    getDate: (item: T) => DateLike,
    options: Omit<ResolveRecencyOptions, "newestAt"> = {}
): Array<{ item: T; recency: RecencyState }> {
    const times = items
        .map((item) => toTime(getDate(item)))
        .filter((t): t is number => t !== null);

    const newestAt = times.length > 0 ? Math.max(...times) : undefined;

    return items.map((item) => ({
        item,
        recency: resolveRecency(getDate(item), { ...options, newestAt }),
    }));
}
