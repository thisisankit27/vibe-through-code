import type { EventType } from "@/components/journey/types";

/**
 * Event type is carried by a glyph and a mono label — never by hue.
 *
 * The previous timeline used 11 one-off accent colours, each appearing
 * exactly once, doing work that shape should do. Colour on this site is
 * reserved for what money and time are doing (see DESIGN.md).
 *
 * Fifteen types map onto eight marks. Shared marks are deliberate:
 * `pr_merge` and `deployment` really are the same gesture to a reader
 * scanning a column, and eight distinguishable shapes is already at the
 * edge of what a 14px glyph can carry.
 */
type GlyphName =
    | "merge"
    | "stream"
    | "ship"
    | "coin"
    | "cross"
    | "branch"
    | "diamond"
    | "note";

const TYPE_GLYPH: Record<EventType, GlyphName> = {
    pr_merge: "merge",
    deployment: "ship",
    livestream: "stream",
    revenue: "coin",
    first_sale: "coin",
    bug_fix: "cross",
    architecture_decision: "branch",
    learning_moment: "branch",
    website_launch: "diamond",
    milestone: "diamond",
    project_start: "diamond",
    project_complete: "ship",
    community: "note",
    partnership: "note",
    blog_post: "note",
};

/** Short, terse, technical. Rendered in mono micro. */
const TYPE_LABEL: Record<EventType, string> = {
    website_launch: "LAUNCH",
    project_start: "PROJECT",
    project_complete: "SHIPPED",
    livestream: "STREAM",
    pr_merge: "MERGED",
    milestone: "MILESTONE",
    revenue: "REVENUE",
    community: "COMMUNITY",
    blog_post: "BLOG",
    bug_fix: "FIX",
    architecture_decision: "ADR",
    learning_moment: "LEARNED",
    deployment: "DEPLOY",
    partnership: "PARTNER",
    first_sale: "FIRST SALE",
};

/**
 * Semantic tone. Only money and failure earn a colour; everything else
 * is ink. This is the rule that replaced eleven decorative hues.
 */
export type EventTone = "revenue" | "failure" | "neutral";

const TYPE_TONE: Partial<Record<EventType, EventTone>> = {
    revenue: "revenue",
    first_sale: "revenue",
    bug_fix: "failure",
};

export function eventLabel(type: EventType): string {
    return TYPE_LABEL[type] ?? type.replace(/_/g, " ").toUpperCase();
}

export function eventTone(type: EventType): EventTone {
    return TYPE_TONE[type] ?? "neutral";
}

const PATHS: Record<GlyphName, React.ReactNode> = {
    // two lines converging — a merge
    merge: (
        <>
            <path d="M4 2v6a4 4 0 0 0 4 4h4" />
            <circle cx="4" cy="13" r="1.6" />
            <circle cx="12" cy="12" r="1.6" />
        </>
    ),
    // a play triangle in a frame
    stream: (
        <>
            <rect x="2" y="3.5" width="12" height="9" rx="1.5" />
            <path d="M7 6.75 10 8l-3 1.25z" fill="currentColor" />
        </>
    ),
    // an upward chevron over a baseline — shipped
    ship: (
        <>
            <path d="M8 3.5 12 8H4z" fill="currentColor" stroke="none" />
            <path d="M4 12.5h8" />
        </>
    ),
    // a filled disc — money
    coin: <circle cx="8" cy="8" r="4.25" fill="currentColor" stroke="none" />,
    // a cross — a failure
    cross: (
        <>
            <path d="M4.5 4.5l7 7" />
            <path d="M11.5 4.5l-7 7" />
        </>
    ),
    // a fork — a decision
    branch: (
        <>
            <path d="M5 13V7a3 3 0 0 1 3-3h3" />
            <circle cx="5" cy="14" r="1.4" />
            <circle cx="12" cy="4" r="1.4" />
        </>
    ),
    // a rotated square — a marker
    diamond: <path d="M8 2.5 13.5 8 8 13.5 2.5 8z" />,
    // ruled lines — written material
    note: (
        <>
            <path d="M3.5 4.5h9" />
            <path d="M3.5 8h9" />
            <path d="M3.5 11.5h5.5" />
        </>
    ),
};

/**
 * The eight marks, defined once per page.
 *
 * Render this once inside the ledger container; entries then reference a
 * symbol by id. Inlining the paths per entry cost 258 bytes each — 32% of
 * an archive row, and ~200 KB across an 800-entry record.
 */
export function GlyphSprite() {
    return (
        <svg width="0" height="0" aria-hidden="true" className="absolute">
            <defs>
                {(Object.keys(PATHS) as GlyphName[]).map((name) => (
                    <symbol
                        key={name}
                        id={`glyph-${name}`}
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        {PATHS[name]}
                    </symbol>
                ))}
            </defs>
        </svg>
    );
}

export function EventGlyph({ type }: { type: EventType }) {
    return (
        <svg width="14" height="14" aria-hidden="true">
            <use href={`#glyph-${TYPE_GLYPH[type] ?? "diamond"}`} />
        </svg>
    );
}
