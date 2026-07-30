# Vibe Through Code — Design Bible

The design system. This document defines **what** the system is. For **how** to apply it when building a component, see `.claude/skills/design/SKILL.md`.

Derived from a full audit of the codebase on 2026-07-30. Where a rule exists, it exists because the opposite was found in the tree.

---

## The visual thesis

> **Instruments, hairlines, and real numbers in monospace. No decoration that isn't data.**

The site should read like a well-kept internal tool rather than a marketing page. Internal tools are trusted because they have no incentive to lie. That association is the entire design strategy.

---

## The ten principles

1. **Every number is real or it is absent.** If a value has no database column, it does not appear on screen.
2. **Evidence over assertion.** Never claim a quality the data can demonstrate.
3. **Weight matches information value.** Visual prominence is earned by informational importance.
4. **Numbers are monospace and tabular.** Always. No exceptions.
5. **Rules, not boxes.** Separate content with lines; enclose only genuinely independent objects.
6. **Motion reports state; it never performs.** The counter never counts up on load.
7. **Zero is a designed state.** `$0` and `0.0000%` are shipping states with real designs.
8. **One primary action per view.** Exactly one filled button in any viewport.
9. **Tokens or it doesn't ship.** No raw hex, `rgba()`, or arbitrary values in component code.
10. **Append-only, never curated.** The record grows and is never truncated to look better.

---

## Color

### The architecture

Tokens are **semantic, not literal**. `--surface-base`, never `--black`. This is deliberate and now load-bearing: three identity choices are held as reversible hypotheses (see below), and a semantic layer means flipping any of them is a value change in one file rather than a rename across thirty. Never encode polarity, hue, or a family name in a token name.

Never reference a Tailwind palette color (`emerald-400`, `neutral-500`, `zinc-950`) in a component. Reference the semantic token.

| Token | Role |
|---|---|
| `--surface-base` | page ground. **Exactly one value sitewide.** |
| `--surface-raised` | cards, panels, controls |
| `--surface-sunk` | inset regions, table stripes, code blocks |
| `--ink-primary` | primary text |
| `--ink-secondary` | supporting text, labels |
| `--ink-tertiary` | de-emphasized, disabled, placeholder |
| `--rule-hairline` | dividers between rows |
| `--rule-standard` | container edges |
| `--rule-strong` | section boundaries, table heads |
| `--accent` | interactive, live, current, in-progress |
| `--accent-dim` | secondary accent. **Non-text use only** — fails contrast at text sizes. |
| `--revenue` | **real recorded money only. Never a UI color.** |
| `--failure` | errors, failed builds, negative entries |
| `--info` | references, neutral annotations |

Three levels each of surface, ink and rule. Not more. Not eight border opacities in two notations.

### `--revenue` is reserved

`--revenue` may only be applied to a figure that came out of the `payments` table or `site_state.total_revenue_*`. It is not a success color, not a hover state, not a check mark. Using it for UI destroys the mechanic described below and is a review failure.

### Current-state values (dark base)

Valid today and compatible with directions A and B. Direction C inverts them; the token names do not change.

```
--surface-base    #08090A      one black, replacing #050505 and #0A0A0A
--surface-raised  ink @ 2%
--surface-sunk    ink @ 4%
--ink-primary     #F4F4F5
--ink-secondary   ink @ 68%
--ink-tertiary    ink @ 42%
--rule-hairline   ink @ 6%
--rule-standard   ink @ 10%
--rule-strong     ink @ 20%
--accent          signal amber — derived per ground, see identity section
--revenue         #00E676
--failure         #F0503A
--info            #4C8DF5
```

### What this replaces

The audit found, in shipping code:

| Problem | Count |
|---|---|
| Page blacks | 3 — `#050505`, `#0A0A0A`, unused `--background` |
| Grey families | 2 — `neutral` (72 uses) and `zinc` (22 uses), colliding inside single files |
| White-opacity steps | 18 — 11 Tailwind + 7 raw `rgba`, in two notations (`/5` beside `/[0.06]`) |
| Greens | 3 — `emerald-400`, `emerald-500`, `rgba(0,230,118)` (Material Green A400) |
| Accent hues | 12 — emerald plus 11 one-offs in `journey/JourneyEvent.tsx`, each used once |
| Card border generations | 3 — `/10`, `/[0.06]`, `/[0.08]`, unmerged |
| Dead token variables | ~40 of 65 declared, referenced zero times |

The existing shadcn token layer is **entirely dead**: 36 references to it live inside `components/ui/button.tsx`, which has zero imports, and `body { background: #050505 }` overrides the one base rule that consumed a token. Building the real token layer is prerequisite to all visual work.

### Semantic color is earned, not decorative

Color carries meaning or it is absent. In the journey timeline: `--revenue` for money, `--failure` for bugs and failures, `--ink-secondary` for everything else. Event *type* is carried by a glyph and a mono label, not by hue. Eleven single-use hues is a palette pretending to be a taxonomy.

---

## The identity — Direction D, The Workbench

Decided 2026-07-30. Full evaluation of the four candidate directions is in the M1.5 decision document.

> **A workbench with an open logbook.** What is happening now is lit; what has happened is recorded. The site is a large calm archive with a small bright edge, and that edge is why people come back.

### The organizing rule

**Visual temperature encodes recency.** This is the direction — not a palette. Every element renders according to how recent it is:

| State | Treatment |
|---|---|
| **Live now** | Signal amber, full contrast, motion permitted, generous space |
| **Today** | Warm ink, full weight, instrument framing |
| **Recent** | Full ink, neutral, ruled rows |
| **Archive** | Cooler and lighter ink, denser rows, no motion, no accent |

Recency must be **computed from a timestamp, never hand-applied.** If a component ever takes an `isHighlighted` prop, the system has failed — that is how the codebase accumulated two unmerged design generations before.

### Settled

- Recency encodes visual temperature
- `--revenue` green means real recorded money, only — never a UI colour, never a success state
- Numbers are mono and tabular, everywhere
- The record is never truncated
- Motion reports state; the counter never animates upward on load
- Colour is semantic — time and money are the only things hue exists to show

### Hypotheses — resolved on the Journey rebuild, 2026-07-31

| | Claim | Outcome |
|---|---|---|
| **H1** ground polarity | Light differentiates and enforces honesty better than dark | **Paper.** Validated on the rebuilt Journey page. Dark ships as a designed theme via `.theme-dark`. |
| **H3** entry container | Ruled rows scale where cards do not | **Rows.** Note the scale review found rows and cards produce *byte-identical* HTML — the entry owns no container — so this was a design judgement, not a performance one. `presentation="cards"` stays in `Ledger` as the documented counterfactual. |
| **H2** prose face | A text serif signals *document* rather than *product page* | **Implemented, awaiting review.** Source Serif 4 — drawn by Adobe for reading interfaces rather than books, variable, and legible at `text-meta` (14px), which matters because the ledger is dense. Compare against the sans control at `/lab/ledger?face=sans`. |

### Dark is designed, not inverted

The governing image is the same workshop after the lights are turned off — a bench under one warm lamp at night. That drives every value:

- The ground is **warm** near-black (`#121110`), not neutral `#000`. A workshop at night is dim, not void.
- Ink is warm off-white, never pure `#fff`, which glares on a dark field.
- **Amber stops being an accent and becomes the light source.** Lit things read as lit because the lamp is on — not because they glow.
- Revenue green is **deepened** from the paper value rather than brightened. Neon green reads as a crypto ticker; this has to read as money that was earned.
- **No glow, no bloom, no neon.** Depth is rules and surface steps in both themes, which is also what keeps the two feeling like one product.

Hierarchy, spacing, type, recency and semantics are identical across the two by construction — they are theme-independent tokens. Only the light changes.

Both grounds are explicit selectors; neither is "the absence of the other". Dark is declared *after* paper because the two have equal specificity and the class must be able to override the default ground.

**What the scale review actually showed** (25 / 250 / 800 synthetic entries, via `/lab/ledger`):

| Entries | HTML | Lit edge | Archive | Lit share |
|---|---|---|---|---|
| 25 | 91 KB | 14 | 11 | 56% |
| 250 | 658 KB | 14 | 236 | 5.6% |
| 800 | 2074 KB | 14 | 786 | 1.7% |

The lit edge stays constant while the archive grows around it. That ratio is the identity, and it confirmed the reason the direction was chosen: it gets *more* distinctive with volume.

**One caveat it also surfaced:** the design scales but the delivery does not. 2 MB of HTML at 800 entries is too much for one document — the ledger needs pagination or virtualization past roughly 250 entries. At ~1.5 entries/day that is about five months out.

**Reversibility is a requirement on the token system, not a hope.** Three rules make it cheap:

1. **Tokens name roles, never polarity.** `--surface-base`, not `--paper`. **No `white/*` or `black/*` opacity literals anywhere** — they bake polarity into every component that touches them, and the audit found 18 such steps. Depth comes from rules, not glows: a blur glow only reads on dark, a hairline reads on both.
2. **Font tokens are semantic** — `--font-prose`, `--font-fact`. Family names appear in exactly one file. The type scale sets line-height explicitly per step so it is metric-independent and a face swap cannot break rhythm.
3. **Entry components render content, not container.** They group semantically (date / body / delta); the parent supplies layout. Do not use `<table>` for the ledger — a chronological feed is a list, so an ordered list with grid layout is both semantically correct and card-reversible. (Genuinely tabular data, i.e. `/admin`, still uses real `<table>` markup per `ACCESSIBILITY.md`.)

Each hypothesis is settled by a **single-variable comparison** against a built homepage, run at **two data volumes** — today's ~25 events and ~800 seeded ones. At 25 entries cards look fine; testing only at current volume would answer the wrong question.

### Palette anchors

Provisional values for the leading configuration. Note that **signal amber must be derived separately per ground** — `#FFB020` is unusable for text on paper, so anything textual uses a darker burnt ochre and bright amber is restricted to dots, rules and meter fills.

```
--surface-base   #FAFAF8   warm paper (H1 — reversible)
--ink-primary    #16161A   near-black, never pure
--accent         amber     present tense; per-ground derivation required
--revenue        #0F6E3D   real recorded money, only
--failure        #A32A1C   bugs, failures, corrections
```

---

## Typography

### Prerequisite: the font is broken

`app/globals.css` declares `--font-sans: var(--font-sans)` — a self-reference, therefore invalid. `app/layout.tsx` publishes `--font-geist-sans`, which nothing reads. **Geist Sans is downloaded on every page load and renders zero glyphs.** The site is currently displaying in the browser default sans-serif.

Fix this before making any type decision. Every prior judgment about this site's typography was made looking at the wrong typeface.

### Faces

- **Mono is the brand voice.** It carries every number, label, timestamp, ID, badge, metric, delta, and code reference. Currently mono is on 5 elements sitewide; it should be on far more. This is the highest-leverage typographic move available.
- **Sans/serif carries prose only.** Headings and body copy.
- **Replace Geist Sans.** Not because it's poor — because it is Vercel's own typeface, and Geist + dark + green + glass reads as "Next.js starter" within 200ms. Per-direction picks are in the direction descriptions above.
- **Keep Geist Mono** until a direction is chosen.

### The scale — six steps

Replaces fifteen sizes, including three arbitrary values (`text-[10px]`, `text-[11px]`, `text-[0.8rem]`) invented because `text-xs` wasn't small enough.

| Token | Size | Line | Use |
|---|---|---|---|
| `display` | `clamp(3rem, 6vw, 4.5rem)` | 1.05 | homepage only, once per page |
| `title` | `clamp(2rem, 4vw, 2.5rem)` | 1.15 | page `<h1>` |
| `section` | `1.5rem` | 1.25 | `<h2>` |
| `body` | `1rem` | 1.6 | prose |
| `meta` | `0.875rem` | 1.5 | secondary, captions |
| `micro` | `0.6875rem` | 1.4 | mono, uppercase, `tracking-wider` — instrument labels |

`micro` is the legitimate home for the current `text-[10px]` usage. Body copy is **16px** — the site currently uses 14px (`text-sm`) for 45% of all type, which is why it reads slightly cramped.

### Weights

Three: `regular` 400, `medium` 500, `bold` 700. Currently `font-bold` and `font-semibold` are applied inconsistently at the same heading level.

### Numbers

**Every figure uses mono with `font-variant-numeric: tabular-nums`.** A revenue counter in a proportional font wobbles as digits change, and wobbling numbers read as decoration. Tabular mono reads as measurement.

### Letter-spacing

- `tracking-tight` (-0.02em) — `display` and `title` only
- `tracking-wider` (0.05em) — mono `micro` labels
- `tracking-eyebrow` (0.3em) — uppercase section eyebrows

The eyebrow treatment is the most consistent element in the codebase (12 uses) and worth keeping — but **stop opening every section with it.** All five pages currently run the identical `eyebrow → 5xl heading → grey one-liner` template with zero variation, which is why the pages blur together.

### Line height

Two systems currently coexist (multiplier and fixed-rem) and 75% of sized text has no explicit leading. Line height is a property of the scale step, not a per-element decision. Do not set it ad hoc.

---

## Spacing

One 4px-based scale. Nothing off it.

```
1  4px     4  16px    12  48px    24   96px
2  8px     6  24px    16  64px    32  128px
3  12px    8  32px
```

### Rhythm

| Context | Space |
|---|---|
| Between major sections | `24` (96px), `32` (128px) at a major boundary |
| Heading to its content | `4`–`6` |
| Between data rows | `2`–`3` + hairline |
| Inside an instrument row | `1`–`2` |

**Two section paddings only**, both scaling down one step on mobile. The audit found 6 distinct section paddings across 11 sections, with only 2 agreeing, and 4 of 11 having no responsive padding at all.

### Whitespace philosophy

**Generous between sections, tight within data.** The current site is uniformly airy, which sounds correct and is the actual problem: uniform spacing groups nothing, so every element floats at equal importance and the eye finds no structure. A financial statement has large page margins and very tight row spacing — that contrast is what makes it scannable.

### Containers

One `Container` component. Three widths, chosen by content type:

| Width | Use |
|---|---|
| `max-w-7xl` | instrument rows, tables, grids |
| `max-w-3xl` | prose and narrative |
| `max-w-xl` | forms, receipts, single-column focus |

Horizontal inset is `px-6 lg:px-8` — one value, defined once. Currently `components/layout/container.tsx` is bypassed by `JourneyTimeline` (different width *and* different padding scale) and by admin, and on `/support` two sibling sections use different widths so the column visibly jumps mid-scroll.

### Grid

12 columns. **Start using asymmetry.** Every section is currently centered, which is a large part of why the site reads as a portfolio. Centered composition says *presentation*; left-aligned with a consistent gutter says *document*. Instrument data especially wants to be left-aligned and column-locked so the eye can compare down a column.

---

## Borders, radius, elevation

### Borders are the primary structural device

160 border usages against essentially no shadows is the right instinct: hairlines read as engineering drawings, shadows read as marketing. Commit to it.

**Borders yes, boxes no.** A border that *encloses* creates a box, and boxes fragment a page into competing regions. A border that *separates* creates a rule, and rules organize a page into a hierarchy. Default to rules: horizontal dividers, left-edge accents, underlined section heads, column separators. Reserve full enclosure for genuinely liftable objects and true overlays.

Three weights: `--rule-hairline`, `--rule-standard`, `--rule-strong`. Always 1px. The only 2px border in the codebase is one avatar ring.

### Radius — three values

| Token | Value | Use |
|---|---|---|
| `sm` | 4px | chips, badges, inputs |
| `md` | 8px | cards, buttons, panels |
| `full` | 9999px | dots, pills |

Seven radii currently do the work of three; cards alone use three of them. The seven radius variables in `globals.css` are consumed only by the unused `button.tsx`.

### Elevation — no shadows

Depth comes from border weight, surface tint, and blur glow. The only legitimate shadow use is a genuinely overlaid surface: the receipt drawer and the admin modal.

### The glow

One `Glow` primitive, one set of values. The same `absolute inset-x-0 bottom-0 h-28 bg-emerald-500/15 blur-3xl` div is currently duplicated in **six** components at three heights (`h-28`/`h-32`/`h-40`) and three opacities (`/9`, `/10`, `/15`) — and the hero's copy is missing `pointer-events-none`, so it intercepts clicks.

---

## Motion

> **Motion reports state. It never performs.**

Every animation answers "what changed, and why does that matter?" If the answer is "nothing, it looks nice," delete it. For a brand whose value is *these numbers are real*, motion that dramatizes data makes true numbers look staged.

**The counter never animates upward on load.** No count-up, no roll. It renders at its value. A number that performs its own growth looks like it's lying. When it *does* change, mark the change honestly — a brief highlight on the digit that moved, with the delta and timestamp beside it.

### Durations — four

| Token | ms | Use |
|---|---|---|
| `instant` | 100 | hover, focus, active — anything under the pointer |
| `quick` | 180 | state changes, badges, disclosure |
| `settle` | 320 | drawers, modals, page-level entrances |
| `report` | 700 | a real data change announcing itself. Rare. |

Replaces ten distinct durations, of which 56 of 80 transitions specified none and inherited Tailwind's 150ms default.

### Easing — two

- `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)` — everything entering or responding. Deceleration reads as *arriving*.
- `linear` — **only** continuous mechanical motion (film reels, conduit fill) where constant rate is the point.

Never `ease-in-out`; it reads as decorative. Zero easing curves are currently declared in `.tsx`.

### Rules

| Element | Behavior |
|---|---|
| Hover | Border strengthens, surface lifts one tint step, `instant`. One model everywhere. |
| Card hover | **No lift.** Retire `hover:-translate-y-1`. Cards that jump are marketing cards. |
| Arrow nudge | 2px, one distance, everywhere |
| Focus | One visible ring token on every interactive element |
| Page transitions | **None.** Instant navigation. A build log doesn't fade between entries. |
| Loading | Skeletons matching final layout. No shimmer — shimmer is decoration on an absence. Instrument values show a `—` placeholder. |
| Scroll reveal | Prose and section entrances only. Once, `quick`, never re-triggering. |
| Parallax / scroll-jacking | Never |

### Scroll-driven mechanisms

The support capsules are the best work in the repo. Keep them, with three fixes:

1. **Throttle through `requestAnimationFrame`.** `components/support/useChapterProgress.ts` fires two `setState` calls per scroll event with three instances mounted, each re-rendering an SVG subtree of up to 20 animated elements — three forced layout reflows per tick. This is the site's most expensive runtime path.
2. **Delete `isActive`.** Computed, returned, never consumed. Removing it halves the re-render rate for free.
3. **Remove `0.1s linear` transitions on scroll-driven properties.** They fight the scroll position, adding lag rather than smoothing.

**The strategic upgrade:** wherever a mechanism *can* be driven by real state instead of scroll position, drive it by real state. A conduit filling because you scrolled is decoration. The same conduit filling because revenue moved is an instrument. Same code, entirely different meaning.

### Reduced motion

`prefers-reduced-motion` has **zero occurrences** today alongside 51 animated SVG properties and infinite SMIL loops. Under reduced motion: continuous animation stops, capsules render final-state, transitions drop to 0ms, `animate-ping` becomes static. See `ACCESSIBILITY.md`.

---

## Components

> **A component's visual weight must match its information weight.**

The site currently inverts this: fourteen words of adjectives get three bordered cards with icons and hover-lift, while fourteen real timestamped events get a narrow column rendering three of them.

### When a card exists

**Almost never.** Cards are for genuinely independent, comparable, self-contained objects — a project, a person. That is the complete list.

Everything else becomes a **ruled row**: journey events, mission points, benefits, manifest lines. Rows scale to hundreds of items, compare cleanly down a column, and read as a record. Cards cap out around a dozen and read as a catalog. **We are building a record, not a catalog.**

Test: *would this still make sense as a line in a printed table?* If yes, it's a row.

### Buttons

Four variants: `primary` (filled, one per view), `ruled`, `ghost`, `link`. Three sizes. Never lift, never scale, never shadow.

`components/ui/button.tsx` currently has 6 variants × 9 sizes and **zero imports** — every button on the site is hand-rolled, and `/admin` alone reimplements the same style four ways.

### Statistics

The most important component on the site. Rules:

1. Monospace, tabular, always
2. **The number is the largest thing.** Label above in `micro`; value below, large. Currently label and value are near-equal weight, so neither leads.
3. Never editorialize. `$0` renders as `$0` — no "(so far!)", no upward arrow, no encouraging color
4. **A stat with no source is not shipped.** Every figure traces to a column.
5. Deltas are explicit and dated: `+6 commits · today`. This is the mechanic that serves the return-visit goal.
6. Zero is a first-class designed state
7. **Segmented meters, not continuous bars.** `▮▮▮▯▯▯▯▯▯▯` reads as measurement; a smooth gradient fill reads as marketing.

### The counter

Mono at `display` size. `$0` today, `0.0000%` of goal beside it, segmented meter honestly and visibly empty. Never scale the meter to make progress look bigger. Never hide it until there's something to show. **An honestly empty progress bar on Day 9 is the most credible element that could exist on this site.**

### Timelines

Like `git log`, not like a marketing roadmap. Append-only, chronological, timestamped, unglamorous, **complete**.

Target form: a dense ruled ledger — `date · type · title · delta` — where a year of events is browsable and a single event can expand for detail. Type carried by a mono label plus a glyph. Color reserved for genuine semantics only.

Truncating the record to 3 of 14 entries is the most on-brand-violating decision in the codebase.

### Iconography

- `lucide` for UI affordances only — arrows, external-link, close, chevrons. Functionally invisible.
- **No decorative icons.** An icon illustrating an abstract noun is decoration. The `Code2`/`BrainCircuit`/`Share2` trio on the Mission section is the most template-signalling element on the site.
- One small custom set for the 15 event types — simple 16px geometric glyphs in an engineering-drawing register. This is where custom iconography earns its cost, and it replaces 11 single-use hues doing work that shape should do.

### Inventory to build

`components/ui/` holds three files, one unused. `/admin` — which hand-rolls a table, modal, select, textarea, input and four button styles — is the specification for what's missing.

**Primitives:** `Button` (fix + adopt) · `Stat` · `Meter` · `Row` · `Rule` · `Label` · `Badge` · `Input` · `Select` · `Textarea` · `Table` · `Dialog` · `Tabs` · `Toast` · `Glow` · `Skeleton`

**Composites:** `InstrumentRow` · `LedgerEntry` · `CounterDisplay` · `LiveIndicator` · `EventGlyph` · `TierRow`

---

## Enforcement

Principles that aren't checkable become aspirations.

- **A lint rule banning raw color literals in `.tsx`** — arbitrary Tailwind values, hex, and `rgba` outside `globals.css` and the designated SVG token file. This is what makes principle 9 real. There is currently no CI in the repo, so this would be the first automated check.
- **PR template gains a data-integrity line:** does every new number trace to a column?
- **`npx tsc --noEmit` and `npm run lint` pass** before any milestone is considered done.

### Mechanical checks

```bash
# no raw color literals in components
grep -rE '#[0-9A-Fa-f]{6}|rgba\(' app components --include=*.tsx

# no arbitrary Tailwind values
grep -rE '(bg|text|border|w|h)-\[' app components --include=*.tsx

# one grey family
grep -rc 'zinc-' app components

# record not truncated
grep -rn 'slice(0,' app components
```

All four should return nothing (or only the designated SVG file) once P1 lands.
