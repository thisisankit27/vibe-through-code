/**
 * A structure, part built and part still drawn.
 *
 * Redrawn, and the change is semantic rather than cosmetic. The previous
 * version raised a completed building — columns, walls, roof, flag — out
 * of scroll position. That contradicted the foundation stone sitting
 * directly above it in the decision zone, which says in plain words that
 * Builder does not exist yet. A finished building is the wrong claim.
 *
 * So: **solid linework for what exists, dashed for what is planned.**
 * The foundation and the first floor are cut; everything above is drawn
 * but not built. That is how a site elevation is actually annotated, it
 * is honest about the state of the thing, and it means the illustration
 * agrees with the stone instead of arguing with it.
 *
 * The single motion is the crane's beacon on a 4s breath. A crane light
 * blinks on an empty site all night; nothing else here should move.
 *
 * Two elements were removed when the capsule dropped from 160px to
 * 128px, because neither survived the size. The lattice crane's mast
 * bracing — six 0.6-wide diagonals over 36 units — rendered as a
 * zigzag ribbon that read as a rope or a drawing error rather than as
 * bracing. The setting-out ticks at `--svg-line-10` were invisible, and
 * redundant besides: the dashed floors already mark the levels they were
 * marking. Detail that cannot be resolved is not detail, it is texture.
 *
 * Primary structure is `--svg-line-50` rather than `-35`. Measured over
 * `--surface-base` the register runs 1.7–3.0:1 — under the 3:1 bar for a
 * graphic — and dropping the old wall and roof fills made this drawing in
 * particular fainter. `-50` clears it at 3.39:1 on paper and 4.79:1 in
 * dark. Secondary detail stays light so the drawing still reads as
 * technical linework rather than an icon.
 *
 * Server Component — no props, no hooks, no state.
 */
export function BuildCapsule() {
    return (
        <svg
            width="150"
            height="150"
            viewBox="0 0 150 150"
            className="h-32 w-32"
            role="img"
            aria-label="A structure part built, the upper floors still drawn as plans"
        >
            {/* Ground */}
            <line x1="16" y1="130" x2="134" y2="130" stroke="var(--svg-line-50)" strokeWidth="1.5" />

            {/* Foundation — laid, so it is solid and filled */}
            <rect
                x="30"
                y="121"
                width="76"
                height="9"
                fill="var(--svg-line-15)"
                stroke="var(--svg-line-50)"
                strokeWidth="1.25"
            />

            {/* Columns: cut to the first floor, drawn above it */}
            <g stroke="var(--svg-line-50)" strokeWidth="1.5" fill="none">
                <path d="M40 121 L40 92" />
                <path d="M100 121 L100 92" />
            </g>
            <g stroke="var(--svg-line-20)" strokeWidth="1.25" strokeDasharray="4 4" fill="none">
                <path d="M40 92 L40 44" />
                <path d="M100 92 L100 44" />
            </g>

            {/* First floor — built */}
            <line x1="34" y1="92" x2="106" y2="92" stroke="var(--svg-line-50)" strokeWidth="1.5" />

            {/* Floors above — planned */}
            <g stroke="var(--svg-line-20)" strokeWidth="1.25" strokeDasharray="4 4">
                <line x1="34" y1="70" x2="106" y2="70" />
                <line x1="34" y1="48" x2="106" y2="48" />
            </g>

            {/* Crane: mast, counter-jib, jib, hoist line */}
            <g stroke="var(--svg-line-30)" strokeWidth="1.5" fill="none">
                <path d="M124 130 L124 30" />
                <path d="M124 34 L136 34" />
                <path d="M124 34 L84 34" />
            </g>
            <path d="M92 34 L92 52" stroke="var(--svg-line-20)" strokeWidth="1" fill="none" />
            <path d="M88 52 L96 52" stroke="var(--svg-line-30)" strokeWidth="1.5" fill="none" />

            {/* The beacon. The only thing on this page that moves on its
                own, and the only colour in the drawing. */}
            <circle
                className="capsule-beacon"
                cx="124"
                cy="26"
                r="3"
                fill="var(--svg-signal-80)"
            />
        </svg>
    );
}
