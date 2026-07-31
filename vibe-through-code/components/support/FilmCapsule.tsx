/**
 * A projector, threaded and running.
 *
 * Redrawn. The previous version stacked two reels on top of a camera
 * body with a lens in the middle, which read as neither a camera nor a
 * projector — and every part of it (aperture, film strip, reel spin,
 * REC light) was interpolated from scroll position.
 *
 * Now it is one clear object at rest, with the reels turning on a 20s
 * loop and a single running light breathing. Both are slow enough to be
 * noticed only if you look for them.
 *
 * The old REC light used `--color-failure`, which is reserved for bugs
 * and failed builds. Spending a reserved semantic colour on decoration
 * is the same class of mistake as spending `--revenue` on a hover state.
 * It is now the signal amber the rest of the site uses for live state.
 *
 * Server Component — no props, no hooks, no state.
 */
export function FilmCapsule() {
    return (
        <svg
            width="150"
            height="150"
            viewBox="0 0 150 150"
            className="h-32 w-32"
            role="img"
            aria-label="A film projector, threaded and running"
        >
            {/* Feed reel */}
            <g
                className="capsule-reel"
                style={{ transformOrigin: "42px 44px" }}
            >
                <circle cx="42" cy="44" r="26" fill="none" stroke="var(--svg-line-50)" strokeWidth="1.5" />
                <circle cx="42" cy="44" r="20" fill="none" stroke="var(--svg-line-15)" strokeWidth="0.9" />
                <circle cx="42" cy="44" r="5" fill="none" stroke="var(--svg-line-30)" strokeWidth="1.5" />
                {/* Spokes */}
                <line x1="42" y1="20" x2="42" y2="68" stroke="var(--svg-line-25)" strokeWidth="1" />
                <line x1="18" y1="44" x2="66" y2="44" stroke="var(--svg-line-25)" strokeWidth="1" />
                <line x1="25" y1="27" x2="59" y2="61" stroke="var(--svg-line-15)" strokeWidth="0.9" />
                <line x1="59" y1="27" x2="25" y2="61" stroke="var(--svg-line-15)" strokeWidth="0.9" />
            </g>

            {/* Take-up reel, smaller, turning the other way */}
            <g
                className="capsule-reel-reverse"
                style={{ transformOrigin: "112px 52px" }}
            >
                <circle cx="112" cy="52" r="18" fill="none" stroke="var(--svg-line-50)" strokeWidth="1.5" />
                <circle cx="112" cy="52" r="4" fill="none" stroke="var(--svg-line-30)" strokeWidth="1.5" />
                <line x1="112" y1="36" x2="112" y2="68" stroke="var(--svg-line-25)" strokeWidth="1" />
                <line x1="96" y1="52" x2="128" y2="52" stroke="var(--svg-line-25)" strokeWidth="1" />
            </g>

            {/* Film path, threaded between the reels and through the gate */}
            <path
                d="M42 70 Q46 92 62 96 L92 96 Q108 94 112 70"
                fill="none"
                stroke="var(--svg-line-30)"
                strokeWidth="2"
                strokeDasharray="5 3"
            />

            {/* Gate and lamp housing */}
            <rect
                x="58"
                y="88"
                width="40"
                height="26"
                rx="3"
                fill="none"
                stroke="var(--svg-line-50)"
                strokeWidth="1.5"
            />

            {/* Lens barrel, projecting left */}
            <path
                d="M58 96 L44 100 L44 110 L58 112"
                fill="none"
                stroke="var(--svg-line-50)"
                strokeWidth="1.5"
            />

            {/* Running light. The one element carrying colour. */}
            <circle
                className="capsule-beacon"
                cx="90"
                cy="106"
                r="3"
                fill="var(--svg-signal-80)"
            />

            {/* Base */}
            <path
                d="M52 122 L104 122"
                fill="none"
                stroke="var(--svg-line-25)"
                strokeWidth="1.25"
            />
            <line x1="66" y1="114" x2="62" y2="122" stroke="var(--svg-line-25)" strokeWidth="1.25" />
            <line x1="90" y1="114" x2="94" y2="122" stroke="var(--svg-line-25)" strokeWidth="1.25" />
        </svg>
    );
}
