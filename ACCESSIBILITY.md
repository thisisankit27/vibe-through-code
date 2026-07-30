# Vibe Through Code — Accessibility Baseline

The minimum every shipped surface meets. Target: **WCAG 2.2 AA.**

A site whose brand is legibility and honesty cannot be unusable with a keyboard. Accessibility here is not compliance overhead — it is the same value as data integrity applied to interaction.

---

## Current state

An audit on 2026-07-30 found:

| Finding | Detail |
|---|---|
| `prefers-reduced-motion` | **0 occurrences** — alongside 51 animated SVG properties, spinning reels, counter-rotating wheels, pinging dots, and infinite SMIL loops |
| Capsule SVG labelling | **0 of 5** have `role="img"` or `aria-label` — the best work on the site is invisible to screen readers |
| Focus patterns | 5 distinct, across 3 mechanisms (`ring`, `border`, `outline`), at 3 opacities |
| Homepage `<h1>` | **absent** — headings start at `<h2>` |
| `/journey` `<h1>` | **absent** — page title is an `<h2>` |
| Heading sizes | 7 `<h2>`s at 4 different sizes; one `<h3>` larger than several `<h2>`s |
| Admin modal | no focus trap, no `role="dialog"`, no `aria-modal`, no Escape-to-close |
| Non-functional controls | `Sign` button has no handler; two links are `href="#"` |
| Hit-target bug | the hero glow div lacks `pointer-events-none` and intercepts clicks |
| `ring-offset` color | references `zinc-950`, which is not the actual page background |

None of these are hard to fix. All are in scope for P0–P2.

---

## Color & contrast

| Content | Minimum |
|---|---|
| Body text, labels | **4.5:1** |
| Large text (≥24px, or ≥19px bold) | **3:1** |
| Icons and graphics conveying meaning | **3:1** |
| Focus indicator against adjacent colors | **3:1** |
| Disabled text | exempt, but must not be the only signal |

### Rules

- **Verify tokens, not instances.** Contrast is a property of the token pair. Check `--ink-secondary` on `--surface-base` once; every use inherits the result.
- **`--accent-dim` is non-text only.** It fails 4.5:1 at text sizes by design. Enforce this in review.
- **Color is never the only signal.** Event type carries a mono label and a glyph, not just a hue. Live status carries text (`● BUILDING`), not just a colored dot. Status pills carry words.
- **Amber and red must be distinguishable** if direction B is chosen — amber occupies the "warning" slot, so failure states need an unambiguous second signal.
- **Test both themes.** If a light/dark pair ships, both are audited.

Note that with the font currently not rendering, measured contrast reflects the fallback face. Re-audit after the font fix.

---

## Keyboard

Everything operable with a pointer is operable with a keyboard.

- **One focus ring token**, visible on every interactive element, never removed without an equivalent replacement. Currently 5 patterns across 3 mechanisms.
- **`:focus-visible`**, not `:focus` — no rings on mouse click.
- **Logical tab order** following visual order. No positive `tabindex`.
- **No keyboard traps.** Dialogs trap focus intentionally, restore it on close, and close on `Escape`.
- **Skip link** to main content as the first focusable element.
- **A control that does nothing must not be focusable.** The `Sign` button is currently reachable, focusable, and inert — worse than absent, because it promises an action.

---

## Semantics

### Headings

- **Exactly one `<h1>` per page**, and it is the page title. Two pages currently have none.
- No skipped levels. Heading level is structural; size is a token. A visually large heading that is structurally an `<h3>` is a bug — currently the case in `components/about/ContributionCTA.tsx`.

### Landmarks

`<header>`, `<nav>`, `<main>`, `<footer>` on every page. `<main>` exists in the layout; the others need auditing.

### Elements

- Links navigate; buttons act. Never a `<div onClick>`.
- `<button type="button">` unless it submits a form.
- Real `<table>` markup for tabular data, with `<th scope>`.
- `<time dateTime>` with valid ISO 8601. `dateTime="July 2026"` is currently invalid.
- Lists for lists. The journey ledger is an ordered list of entries.

### Names

Every interactive element has an accessible name. Icon-only controls take `aria-label`. Links avoid bare "here" or "more".

---

## Motion

The largest current gap.

### Required

```css
@media (prefers-reduced-motion: reduce) {
  /* transitions → 0ms
     continuous loops → stopped
     scroll-driven mechanisms → final state
     animate-ping → static */
}
```

Under reduced motion:

| Element | Behavior |
|---|---|
| Support capsules | render at final state, no scroll response |
| Conduit fill | full, static |
| Film reels, crane, steam | static |
| `animate-ping` live dot | solid, no pulse |
| SMIL `<animate>` | must be disabled — CSS media queries do not stop SMIL, so gate it in the component |
| Hover and focus transitions | instant |
| Scroll reveals | content visible immediately |

**SMIL needs explicit handling.** `CoffeeCapsule` and `FilmCapsule` use `<animate>` elements, which a CSS media query cannot stop. Read the preference with `matchMedia` and omit the elements.

### Other motion rules

- No animation blocks content or delays interaction
- Nothing flashes more than three times per second
- No parallax, no scroll-jacking
- The revenue counter never animates on load — this is a brand rule that happens to also be an accessibility win

---

## Images & SVG

- Meaningful images: descriptive `alt`. Decorative: `alt=""`.
- **Illustrative SVG:** `role="img"` plus `aria-label`. The five capsules need this — they carry narrative meaning, so a label describing what the mechanism represents is required.
- **Purely decorative SVG:** `aria-hidden="true"`. Applies to the glow and the conduit rail.
- **Unique SVG `id`s.** `CoffeeCapsule` uses `id="cup-clip"`, which collides if the component ever renders twice.
- Icons inside labelled controls: `aria-hidden="true"` — the control carries the name.

---

## Forms

- Every input has a visible, associated `<label>`. Placeholders are not labels.
- Errors are announced, tied to the field with `aria-describedby`, and never color-only.
- Required fields marked in text as well as visually.
- Admin's `confirm()`/`alert()` pattern is acceptable for a single-operator tool but should not spread to public surfaces.

---

## Dialogs & overlays

Applies to `ReceiptPanel` and the admin modal:

- `role="dialog"` and `aria-modal="true"`
- Labelled by its heading via `aria-labelledby`
- Focus moves in on open, is trapped, and returns to the trigger on close
- `Escape` closes
- Background content is inert
- Backdrop click should not silently discard in-progress input — admin currently does

---

## Verification

### Per pull request

- [ ] Keyboard-only pass: every control reachable, visible focus throughout
- [ ] One `<h1>`, no skipped levels
- [ ] New colors checked against the contrast table
- [ ] **Text checked against the surface it actually sits on**, not just `--surface-base`. This has now failed twice: a navbar wrongly given `bg-scrim` dropped its links to **1.66:1**, and a tinted badge put `--ink-tertiary` on `--surface-sunk` at **4.44:1**. Verifying tokens against the page ground is necessary but not sufficient — any element that paints its own background creates a new pair that nothing has checked.
- [ ] New animation respects `prefers-reduced-motion`
- [ ] New SVG labelled or hidden
- [ ] No non-functional focusable controls

### Per milestone

- [ ] Screen reader pass on changed pages (VoiceOver, NVDA, or Orca)
- [ ] Full page audit with reduced motion enabled in devtools
- [ ] Lighthouse accessibility ≥ 95 on every route
- [ ] 200% zoom without loss of content or function
- [ ] Both themes audited if a light/dark pair ships

### Mechanical checks

```bash
# reduced-motion handling exists
grep -rn 'prefers-reduced-motion' app components

# SVGs labelled or hidden
grep -rn '<svg' components | grep -vE 'aria-hidden|aria-label|role='

# no div-as-button
grep -rn '<div[^>]*onClick' app components

# no dead links
grep -rn 'href="#"' app components
```

`eslint-plugin-jsx-a11y` is already present via `eslint-config-next`. Confirm its rules are active rather than warning-only, and treat them as errors in CI once CI exists.
