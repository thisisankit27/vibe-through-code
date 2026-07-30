<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Vibe Through Code — Agent Rules

This file is the index and the non-negotiables. It is deliberately short. Depth lives in the documents linked below and in the `design` skill.

## What this product is

The public instrument panel of a software company being built from $0 to $1,000,000, streamed daily. Not a portfolio, not a blog, not a landing page.

Its credibility rests on one property: **every number on it is real, and you can watch them change.** Decisions that weaken that property are wrong even when they look good.

## The documents

Read the one relevant to your task. Do not guess at rules these files already answer.

| Document | Read when |
|---|---|
| `../PRINCIPLES.md` | Deciding whether to build something at all |
| `../DESIGN.md` | Any visual change — tokens, type, spacing, motion, layout |
| `../VOICE.md` | Writing any user-facing string, label, or number format |
| `../DATA-INTEGRITY.md` | Any change that displays a value |
| `../ACCESSIBILITY.md` | Any interactive element, animation, or color choice |
| `../MIGRATION-CHECKLIST.md` | Cleanup work — check before deleting anything |
| `../.claude/skills/design/SKILL.md` | Building or refactoring a component |

Paths are relative to this file. This app lives one level below the git root; project docs live at the root.

## Hard rules

Violating any of these fails review regardless of how the result looks.

**1. Never invent a number.** No placeholder metrics, no demo values, no illustrative figures in shipping code. If a value has no database column behind it, it does not render. Show `$0` or show nothing. See `../DATA-INTEGRITY.md`.

**2. Tokens only.** No raw hex, no `rgba()`, no arbitrary Tailwind values (`text-[10px]`, `bg-[#0A0A0A]`, `border-white/[0.06]`) in `.tsx`. Every color, size, space, radius and duration resolves to a named token in `app/globals.css`. The sole exception is SVG illustration, which uses the documented SVG token set.

**3. Numbers are monospace and tabular.** Every figure on the site — currency, counts, dates, deltas, percentages — uses the mono face with `tabular-nums`. No exceptions.

**4. Never truncate the record.** No `slice()` on journey events, streams, or projects for display purposes. Paginate or virtualize. The premise is that everything is public.

**5. One primary action per view.** Exactly one filled button in any viewport. Everything else is ruled, ghost, or link.

**6. Motion reports state; it never performs.** If an animation does not communicate a change, remove it. The revenue counter never animates upward on load.

**7. Evidence over assertion.** Do not write copy claiming a quality the data can demonstrate. Replace adjectives with figures.

**8. Prefer removing UI to adding it.** A ruled row beats a card. No decoration without a functional purpose.

**9. Every interactive element is reachable and labelled.** Visible focus ring, keyboard operable, accessible name. Respect `prefers-reduced-motion`. See `../ACCESSIBILITY.md`.

**10. Zero is a designed state.** `$0`, `0 supporters`, `0.0000%` ship with real designs. Being early is an asset, not something to hide or pad.

## Conventions

- **Currency: USD everywhere.** The mission is `$1,000,000`. Store cents. `en-US` formatting. Legacy `total_revenue_paise` and `en-IN` formatters are migration targets, not patterns to copy.
- **File naming: kebab-case** for all new files (`project-card.tsx`). PascalCase files in `components/journey/` and `components/support/` are legacy; do not add more.
- **Components:** default to a Server Component. Add `"use client"` only when a hook or event handler requires it.
- **Data access:** raw SQL tagged templates via `sql` from `lib/db.ts`. There is no ORM — the `drizzle-kit` scripts in `package.json` are vestigial and non-functional.
- **Commits:** `feat:` `fix:` `docs:` `refactor:` per `../CONTRIBUTING.md`.

## Before you finish

- `npx tsc --noEmit` passes
- `npm run lint` passes
- No new raw color literals or arbitrary values
- Every new number traces to a column
- The change improves one area and leaves the app functional
