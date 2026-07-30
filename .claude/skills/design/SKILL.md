---
name: design
description: Implementation guidance for building and refactoring UI in Vibe Through Code. Use when creating a component, refactoring markup, choosing between a card and a row, styling a statistic or metric, adding motion, or reviewing UI work. Covers the component decision tree, the instrument and ledger patterns, codebase-specific anti-patterns, and the review checklist. Load before writing any .tsx that renders visible UI.
---

# Building UI in Vibe Through Code

This skill is **how to apply** the design system. The system itself — tokens, scales, the ten principles — is defined in `DESIGN.md` at the repo root. Read that first if you haven't; don't re-derive it here.

Product context is in `PRINCIPLES.md`. Copy rules are in `VOICE.md`. Number rules are in `DATA-INTEGRITY.md`. Interaction requirements are in `ACCESSIBILITY.md`.

---

## Start here: the four questions

Before writing markup, answer these in order. Most bad UI in this codebase comes from skipping question 1.

**1. What is the information, and how important is it?**
Visual weight must match information value. Fourteen words of adjectives currently get three bordered cards with icons and hover-lift, while fourteen real timestamped events get a narrow column rendering three of them. Decide the weight before you decide the form.

**2. Is this a record or a catalog?**
A record is chronological, grows without bound, and is compared down a column → **ruled rows**. A catalog is a small set of independent comparable objects → **cards**. Almost everything here is a record.

**3. Does every number have a column behind it?**
If not, stop. Wire the query first, or render zero. See `DATA-INTEGRITY.md`.

**4. Can I do this by removing something instead?**
Usually yes. The site's problem has never been too little UI.

---

## The component decision tree

```
Rendering a set of things?
├── Chronological, unbounded, comparable down a column?
│   └── LEDGER ROWS.  Never cards. Never sliced.
├── Small fixed set of independent objects (projects, people)?
│   └── CARDS.  Maximum ~12 before it becomes a record.
└── Key/value state (day, streak, revenue)?
    └── INSTRUMENT ROW.

Rendering one thing?
├── A number that matters?
│   └── STAT.  Mono, tabular, label above in micro, value large.
├── Progress toward a known target?
│   └── SEGMENTED METER.  Never a continuous gradient bar.
├── Prose?
│   └── max-w-3xl, body scale (16px), no container border.
└── An action?
    └── BUTTON.  One primary per view; everything else ruled/ghost/link.
```

---

## Pattern: the instrument row

The signature component of this product. `components/journey/CurrentStatus.tsx` is the seed; it needs promoting to a primitive.

**Structure:** label above, value below. Label in `micro` (11px mono, uppercase, `tracking-wider`, `--ink-secondary`). Value in mono, tabular, `--ink-primary`, several steps larger.

**The mistake to avoid:** label and value at near-equal weight, which is the current state — so neither leads and the row reads as text rather than instrumentation.

**Rules:**
- Values are mono and tabular, always. A row of stats where digits shift width as data changes reads as decoration.
- Fixed-width formatting where it prevents layout shift: `DAY 009`, not `Day 9`.
- Include the delta when one exists: `+6 · today` beside the total. This is the mechanic that makes a return visit rewarding, which is the site's primary goal.
- Zero renders as `0`, never as `—` or an omission. `—` means *unknown*, which is a different fact.
- Never editorialize. No arrows, no color for "good", no parenthetical encouragement.

**Where color is allowed:** `--revenue` on a real revenue figure. Nowhere else. `--revenue` is reserved (see `DESIGN.md`) and using it as a generic success color destroys the mechanic.

---

## Pattern: the ledger entry

Replaces the current card-per-event timeline. Target form for `/journey`.

**Structure:** a ruled row — `date · type · title · delta` — with an optional expansion for detail. Grouped by day under a sticky date rule.

**Rules:**
- Date in ISO mono (`2026-07-21`), left-aligned, fixed width, so the column scans.
- Type carried by a mono `micro` label plus a glyph. **Not by hue.** There are currently 11 single-use accent colors doing work that shape should do.
- Title in `body`. One line, truncated with the full text available on expansion.
- Numeric deltas right-aligned in their own column (`+1063 −1`), mono, so magnitudes compare vertically.
- Color only for genuine semantics: `--revenue` for money, `--failure` for bugs and failures, `--ink-secondary` for everything else.
- **Render every entry.** No `slice()`. Paginate or virtualize. This form holds 400 events; the current card stack does not hold 40.

**Why rows beat cards here:** a card costs ~120px of vertical space and isolates each entry, which prevents exactly the comparison the timeline exists to enable. A row costs ~40px and puts every date in one column, every delta in another.

---

## Pattern: the counter

The most important single element on the site.

- Mono, `display` size, tabular
- `$0` today. Full digits for the goal: `$1,000,000`, never `$1M`
- `0.0000%` beside it — four decimals so early progress is visible rather than rounding to `0%`
- Segmented meter, honestly and visibly empty
- **Never animates upward on load.** No count-up, no roll. A number that performs its own growth looks like it's lying.
- Never scale the meter to make progress look bigger. Never hide it until there's something to show.

An honestly empty progress bar on Day 9 is the most credible element that could exist here. Treat the emptiness as the design, not as a problem to solve.

---

## Pattern: segmented meter

`▮▮▮▯▯▯▯▯▯▯`

Segments read as measurement; a smooth gradient fill reads as marketing. Ten segments is the default. Partial segments do not render — round down, so the meter never overstates.

`components/support/SystemTerminus.tsx` has the right form already; it is visualizing invented numbers. Keep the form, fix the data.

---

## Spacing in practice

The scale is in `DESIGN.md`. What matters when applying it:

**Generous between sections, tight within data.** This contrast is the whole technique. The current site is uniformly airy, which groups nothing — so every element floats at equal importance and the eye finds no structure. A financial statement has large page margins and very tight row spacing; that is why it scans.

**Use one mechanism per stack.** Pick `space-y-*` on the parent *or* `mt-*` on children — never both in one component. The codebase currently uses per-child margins almost everywhere (`mt-1` through `mt-20` all appear) which makes rhythm impossible to reason about.

**Never invent a section padding.** Two values exist. If neither fits, the problem is the composition, not the scale.

**Container discipline.** Import `Container`; do not hand-roll `mx-auto max-w-* px-*`. Three files currently bypass it, and on `/support` two sibling sections use different widths so the column visibly jumps mid-scroll. If you need a different width, pass it as a prop.

---

## Typography in practice

**Ask what the text *is*, then pick the token.** Do not pick a size because it looks right — that is how fifteen sizes accumulated.

| The text is | Token | Face |
|---|---|---|
| The page's single most important line | `display` | prose |
| The page title | `title` | prose |
| A section heading | `section` | prose |
| A sentence someone reads | `body` | prose |
| A caption or secondary note | `meta` | prose |
| An instrument label | `micro` | **mono, uppercase** |
| Any number, ID, date, or delta | scale step by context | **mono, tabular** |

**Mono is the brand voice, and it is underused.** It currently appears on 5 elements sitewide. Every number, label, timestamp, ID, badge, metric, and code reference should carry it.

**Heading level is structure; size is a token.** A large heading that is structurally an `<h3>` is a bug. `components/about/ContributionCTA.tsx` currently has an `<h3>` larger than several `<h2>`s.

**Never set line height ad hoc.** It belongs to the scale step.

**Vary how sections open.** All five pages currently run the identical `eyebrow → 5xl heading → grey one-liner` pattern, which is the main reason they blur together. Reserve the eyebrow for instrument contexts.

---

## Motion in practice

Four durations, two curves — defined in `DESIGN.md`. Applying them:

**Ask what changed.** If nothing changed, there is no animation. This removes most candidate animations immediately.

**One hover model everywhere:** border strengthens, surface lifts one tint step, `instant`. Retire `hover:-translate-y-1` — cards that jump are marketing cards, and there are currently two incompatible hover models (4 cards lift, 8 don't).

**Never use bare `transition` or `transition-all`.** Name the property: `transition-colors`, `transition-transform`. `transition` and `transition-all` are the same thing spelled two ways, currently split 25/19 across the codebase.

**Always specify a duration token.** 56 of 80 transitions currently specify none and silently inherit 150ms.

**Scroll-driven work:** throttle through `requestAnimationFrame`. Never call `setState` directly in a scroll handler. `components/support/useChapterProgress.ts` is the reference for the pattern and also for the mistake — it fires two `setState` calls per scroll event with three instances mounted, and one of the two values (`isActive`) is never consumed.

**Prefer real state over scroll position.** A conduit filling because you scrolled is decoration. The same conduit filling because revenue moved is an instrument. Identical code, entirely different meaning — and the second is on-brand.

**Every animation needs a reduced-motion path.** Including SMIL, which CSS cannot stop — gate those elements with `matchMedia`. See `ACCESSIBILITY.md`.

---

## Anti-patterns

Each of these is in the tree right now. Do not add more.

### Cards for records

```
✗  events.map(e => <div className="rounded-2xl border p-6">…</div>)
✓  events.map(e => <LedgerRow key={e.id} {...e} />)
```
Cards isolate; the timeline exists to enable comparison.

### Truncating the record

```
✗  const visibleEvents = events.slice(0, 3);
✓  paginate or virtualize; render all
```
`/journey` shows 3 of 14. The premise is that everything is public.

### Raw color literals

```
✗  className="bg-[#0A0A0A] border-white/[0.06] text-neutral-400"
✓  className="bg-surface-raised border-rule-hairline text-ink-secondary"
```
79 color literals, 2 hexes, and 51 `rgba()` strings currently make the site impossible to retheme.

### Arbitrary sizes

```
✗  className="text-[10px] tracking-wider"
✓  className="text-micro"
```
Three arbitrary sizes were invented because `text-xs` wasn't small enough. `micro` is that size, tokenized.

### Copy-pasting a visual motif

```
✗  the same glow div in six components at three heights and three opacities
✓  <Glow />
```
If a className string appears three times, it is a component. The hero's copy of the glow is also missing `pointer-events-none` and intercepts clicks — exactly the drift that duplication produces.

### Reimplementing a primitive

```
✗  <button className="inline-flex items-center rounded-md bg-emerald-500 px-6 py-3 …">
✓  <Button variant="primary">
```
`components/ui/button.tsx` has 6 variants and zero imports. `/admin` alone reimplements the same style four ways.

### Two equal-weight CTAs

```
✗  [ Watch Live ]  [ View GitHub ]     ← neither leads
✓  [ Watch Live ]   View GitHub →
```
One filled button per viewport.

### Decorative icons

```
✗  <Code2 /> Build — "Real software. Real projects."
✓  32 commits · 9 streams · Day 009
```
An icon illustrating an abstract noun is decoration. Replace the assertion with evidence.

### Hardcoded values in a server component

```
✗  const sessionManifest = { coffee: 12, stream: 3, builders: 1 };
✓  const manifest = await sql`SELECT tier_id, count(*) FROM payments GROUP BY tier_id`;
```
Proximity to a query does not launder a constant.

### Editorialized numbers

```
✗  $0 (just getting started!)     ✗  Only 9 days in 🚀
✓  $0                             ✓  DAY 009
```

### Non-functional controls

```
✗  <button type="button">Sign</button>          ← no handler
✗  <Link href="#">Get in touch</Link>
```
Worse than absent: focusable, reachable, and promising an action it can't perform.

---

## Building a new primitive

Only after the same markup appears **three times**. Two occurrences is a coincidence.

1. Place it in `components/ui/`, kebab-case filename.
2. Use `cva` for variants — follow the existing `button.tsx` structure, which is well-built even though unused.
3. Accept `className` and merge with `cn()` from `lib/utils.ts`.
4. Server Component by default. `"use client"` only if a hook or handler requires it.
5. Tokens only. A primitive containing a raw literal poisons every consumer.
6. Forward `ref` and spread the native element's props.
7. Add it to the inventory list in `DESIGN.md`.

Do not create a primitive with a single call site and speculative variants. `SectionHeading` currently has two props whose branches are never exercised.

---

## Review checklist

Run before declaring UI work done.

### Information
- [ ] Visual weight matches information value
- [ ] Every number traces to a database column
- [ ] Zero and empty states render correctly against an empty database
- [ ] No assertion that a figure could replace
- [ ] Nothing truncated with `slice()`

### System
- [ ] No raw hex, `rgba()`, or arbitrary Tailwind values
- [ ] Type sizes are scale tokens
- [ ] Spacing values are on the scale
- [ ] Radius is `sm`, `md`, or `full`
- [ ] One grey family, one accent
- [ ] `--revenue` used only on real money
- [ ] Existing primitives reused rather than reimplemented

### Form
- [ ] Records are rows, not cards
- [ ] Numbers are mono and tabular
- [ ] One primary action in the viewport
- [ ] Borders separate rather than enclose, unless the object is genuinely independent
- [ ] Container imported, not hand-rolled

### Motion
- [ ] Every animation reports a state change
- [ ] Duration is a token; property is named
- [ ] `prefers-reduced-motion` respected, including SMIL
- [ ] Scroll handlers throttled through `rAF`
- [ ] No counter animating on load

### Accessibility
- [ ] Keyboard-only pass, visible focus throughout
- [ ] One `<h1>`, no skipped levels
- [ ] New colors meet the contrast table
- [ ] Text checked against **the surface it sits on**, not just the page ground — anything that paints its own background creates an unchecked pair. See `ACCESSIBILITY.md`; this rule exists because it has failed twice.
- [ ] `--scrim` used only to dim behind a true overlay. It is not a surface, and using it as one paints the ground black.
- [ ] SVG labelled or `aria-hidden`
- [ ] No focusable control without a handler

### Ship
- [ ] `npx tsc --noEmit` passes
- [ ] `npm run lint` passes
- [ ] Improves one area; app still functional
- [ ] Visible progress a reviewer can see

---

## When the system is wrong

The system is a tool, not scripture. If a rule blocks genuinely better work:

1. State what the rule prevents, with the specific case.
2. Propose the amendment — the general rule, not the exception.
3. Update `DESIGN.md` in the same change.

What is not acceptable is silently working around a rule. A one-off arbitrary value is how fifteen text sizes and eighteen opacity steps got here. Either the rule changes or the work changes.
