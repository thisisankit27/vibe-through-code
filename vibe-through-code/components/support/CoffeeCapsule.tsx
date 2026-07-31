/**
 * A cup, poured, still warm.
 *
 * Drawn at rest rather than assembling itself. The previous version
 * interpolated fill height, pour stream, steam opacity and a heating
 * glow from a scroll-derived `progress` value, which made it a loading
 * bar in a costume and put the reader in charge of driving it.
 *
 * The only motion is steam, on a 5s loop that runs whether or not anyone
 * is looking. Server Component — no props, no hooks, no state.
 *
 * The viewBox is 150 square rather than 120×150, offset so the cup stays
 * centred. The drawing is unchanged; the *box* is now square, matching
 * the other two capsules. Rendered at a fixed `h-32 w-32` this one used
 * to come out 128px wide against their 160px, which made the gutter
 * between figure and note change width from one chapter to the next —
 * the inconsistent rhythm, coming from a viewBox rather than from any
 * spacing value.
 *
 * The `y` offset of 10 is the same problem in the other axis. Squaring
 * the boxes aligns the three *frames*, but this drawing carries 35 units
 * of steam above the cup and steam is nearly invisible, so its perceived
 * mass sat ~25 units lower than the projector's or the crane's. Top
 * aligned against a heading, the cup read as hanging while the other two
 * read as level. Ten units up is most of the difference without pushing
 * the steam out of the box — the plume is at full opacity in the first
 * third of its 18-unit travel, and fully transparent by the end of it.
 */
export function CoffeeCapsule() {
    return (
        <svg
            width="150"
            height="150"
            viewBox="-10 10 150 150"
            className="h-32 w-32"
            role="img"
            aria-label="A full cup of coffee, steaming"
        >
            {/* Steam. Three plumes, staggered, drawn as open curves
                rather than dots — a notebook would draw it this way. */}
            <g fill="none" stroke="var(--svg-line-25)" strokeWidth="1.25" strokeLinecap="round">
                <path className="capsule-steam" d="M48 46 q-4 -8 0 -14 q4 -6 0 -12" />
                <path className="capsule-steam capsule-steam-b" d="M60 42 q-4 -8 0 -14 q4 -6 0 -12" />
                <path className="capsule-steam capsule-steam-c" d="M72 46 q-4 -8 0 -14 q4 -6 0 -12" />
            </g>

            {/* Saucer */}
            <path
                d="M22 132 q38 8 76 0"
                fill="none"
                stroke="var(--svg-line-25)"
                strokeWidth="1.25"
            />

            {/* Cup body */}
            <path
                d="M30 62 L35 122 Q35 130 45 130 L75 130 Q85 130 85 122 L90 62 Z"
                fill="none"
                stroke="var(--svg-line-50)"
                strokeWidth="1.5"
            />

            {/* Handle */}
            <path
                d="M89 74 Q108 74 108 92 Q108 110 87 110"
                fill="none"
                stroke="var(--svg-line-50)"
                strokeWidth="1.5"
            />

            {/*
                Coffee. Full, because the cup is poured — not filling.

                A wash, not a slab. At `--svg-coffee` (0.9 opaque) this
                was the heaviest object on the entire page — heavier than
                the h1, and the only large filled area in three drawings
                that are otherwise pure linework. That is a hierarchy
                inversion, and it is most of why the illustrations read as
                dominant. Inverting the two tokens keeps the warmth (this
                is the one human colour on the page and the page is meant
                to be the warm one) while letting the meniscus, not the
                body, carry the weight — which is how a wash drawing
                works.
            */}
            <clipPath id="coffee-cup-bowl">
                <path d="M32 64 L36.5 120 Q36.5 128 45 128 L75 128 Q83.5 128 83.5 120 L88 64 Z" />
            </clipPath>
            <g clipPath="url(#coffee-cup-bowl)">
                <rect x="28" y="70" width="64" height="62" fill="var(--svg-coffee-light)" />
                <ellipse cx="60" cy="70" rx="28" ry="3.5" fill="var(--svg-coffee)" />
            </g>

            {/* Rim, drawn over the liquid so the ellipse reads as surface */}
            <path
                d="M30 62 Q60 57 90 62"
                fill="none"
                stroke="var(--svg-line-50)"
                strokeWidth="1.5"
            />
        </svg>
    );
}
