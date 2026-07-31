# Vibe Through Code — Migration Checklist

Inventory of cleanup work identified in the 2026-07-30 audit.

Each item was verified against the tree at the time of writing; re-verify before acting, since files move.

> **M1 (Truth Pass) landed 2026-07-30.** Items it closed are marked `[x]`. Everything still `[ ]` is open. Sections §1 and §2 are complete except where noted; §3–§9 are largely untouched by design.

### Discovered during M1 — the live DB had drifted from the seed files

Worth knowing before working from `data/*.ts`, which is now materially stale:

| | Seed files say | Live DB says |
|---|---|---|
| `current_day` | 9 | **16** |
| `streak_days` | 9 | **16** |
| `total_commits` | 32 | **50** |
| `total_streams` | 16 | 16 (only **9** `streams` rows exist) |
| events | 14 | **25** |
| tier prices | ₹919 / ₹2199 / ₹4999 | **₹99 / ₹299 / ₹999** |
| `current_goal` | "Build the Vibe Through Code platform." | "Build Family Knowledge Vault" |

Also confirmed: **the `payments`, `sync_log` and `supporters` tables do not exist.** Live tables are `events`, `people`, `projects`, `site_state`, `streams`, `support_tiers`. Any figure sourced from `payments` is therefore provably zero, which is why the support manifest renders its zero state rather than a number.

Paths are relative to the Next.js app directory (`vibe-through-code/`) unless marked **[root]**.

---

## How to use this

Work top to bottom within a section. Sections are ordered by risk, not effort.

Legend: **[verified]** confirmed by inspection · **[verify]** reported, confirm before acting · **[decision]** needs a human call

---

## 1. Data integrity — P0

Full detail in `DATA-INTEGRITY.md`. Summarized here for tracking.

- [x] **[verified]** Remove `"312 people watching. 47 commits."` from `support_tiers.narrative` (DB) and `data/support2.ts`. Real viewers for those days are `0`.
- [x] **[verified]** Replace hardcoded `"Day 47"` in `components/support/SystemTerminus.tsx` with `site_state.current_day` (live value is `16`). Two pages showed different day counts.
- [x] **[verified]** Remove `sessionManifest = { coffee: 12, stream: 3, builders: 1 }` from `app/support/page.tsx`. No payment system exists.
- [x] **[verified]** Remove `"The next stream is tomorrow."` from `SystemTerminus.tsx` or bind to a real schedule.
- [x] **[verified]** Zero the invented `viewers` values (400/250/310/280) in the `streams` table and `data/streams.ts`.
- [x] **[verified]** Delete `components/journey/demo-data.ts` — contains `$847`, `$1,024 MRR`, `34 customers`, `0% churn`, a fake PR URL. Unreferenced, one import from shipping.
- [ ] **[verified]** Replace 5 placeholder `https://youtube.com/live/...` URLs in the `events` table and `data/journey.ts` (one carries a `// update me` comment).
- [ ] **[verified]** De-duplicate seeded event content — several events share descriptions verbatim; `evt-008` and `evt-006` share a title *and* timestamp. **Not addressed in M1** — needs real per-event copy, which only the operator can write. Now more visible since all 25 events render.
- [x] **[verified]** Remove `events.slice(0, 3)` in `components/journey/JourneyTimeline.tsx` — renders 3 of 14.

**Verification:** run the empty-database test in `DATA-INTEGRITY.md`. Every number should read `0` or `—`.

---

## 2. Broken and dead-end UI — P0

- [x] **[verified]** `components/explore/explore.tsx` — two cards read `"Coming Soon"` and link to `"#"` for `/projects` and `/journey`, which are built, DB-wired, and in the navbar. Worst trust defect on the site. (This section is slated for removal in P2; fix or remove now.)
- [x] **[decision]** ~~`components/about/person-card.tsx` — founder badge reads `"Youtube Face"`. → `Founder`.~~ **Not a defect. Closed 2026-07-31 as intended copy.** It was read as leftover placeholder text, changed to `Founder`, and changed back the same day at the operator's direction: `Founder` asserts an employment status that is not true, and this site does not get to be loose about claims. The badge is a credit for who is on camera. Rendered as `YouTube Face` in the source — the CSS uppercases it, so the display is unchanged while assistive tech gets the correct brand name. `person.role` renders beneath it either way, so the real role from the record is never replaced by the badge.

  *Lesson for this document: "looks like placeholder text" is a hypothesis, not a finding. Copy that reads oddly may be deliberate, and the operator is the only one who knows. Mark it `[decision]`, not `[verified]`.*
- [x] **[verified]** `components/about/contribution-cta.tsx` — `"Get in touch"` is `href="#"`. No email or contact form exists anywhere in the codebase. **Also marked done on 2026-07-30 without being done.** Resolved 2026-07-31 by *removing* the button: a site whose premise is verifiability cannot ship an affordance that pretends to have a destination. Returns as a `mailto:` when a real address exists.
- [x] **[verified]** `components/support/SystemTerminus.tsx` — the `Sign` button has no `onClick` and the input is uncontrolled. The site's only capture element silently does nothing.
- [x] **[verified]** `app/page.tsx` — homepage has **no `<h1>`**; `SectionHeading` hardcodes `<h2>`.
- [x] **[verified]** `components/journey/JourneyTimeline.tsx` — page title is an `<h2>`; `/journey` has no `<h1>`.
- [x] **[verified]** `app/page.tsx:13-20` — the entire hero is skipped when no project has `status='active'`. The front door is conditional on a database row.
- [x] **[verified]** `components/ui/section-heading.tsx` — the `\n` in `site.hero.title` never renders (plain `<p>`, no `whitespace-pre-line`), collapsing the three-beat tagline into one line.
- [x] **[verified]** `components/hero/hero.tsx` — the glow div lacks `pointer-events-none` and intercepts clicks.
- [ ] **[verified]** `components/project/project-card.tsx` — `<time dateTime="July 2026">` is not a valid datetime value.
- [ ] **[verified]** `components/hero/hero.tsx` — "View GitHub" points at the personal profile while every other GitHub link points at the project repo. **[decision]** which is intended.

---

## 3. Dead code — safe to delete

All confirmed by grep: zero importers.

- [x] **[verified]** `components/hero/hero-buttons.tsx` — **0 bytes**, empty file, never imported
- [x] **[verified]** `components/support/TerminalCommitBar.tsx` — 62 lines, not imported, not exported from `components/support/index.ts`. Abandoned earlier CTA treatment.
- [x] **[verified]** `components/journey/demo-data.ts` — see §1
- [x] **[verified]** `.hero-grid` class in `app/globals.css` — defined, zero usages. Contains the only two gradients in the codebase.
- [ ] **[verified]** `--font-heading` in `app/globals.css` — zero usages. No longer broken as of M1, but still unreferenced.
- [x] ~~`--font-geist-sans` in `app/layout.tsx` — published, zero consumers~~ — **resolved in M1**: `--font-sans` now maps to it, so it has a consumer and Geist renders. Do not delete.
- [x] **[verified]** `getStatusLabel()` in `components/project/project-card.tsx` — defined, unused, duplicates `capitalize()` from `lib/utils.ts`. **Deleted 2026-07-31**, along with `getStatusColor()` beside it.
- [ ] **[verified]** `isActive` in `components/support/useChapterProgress.ts` — computed and returned, never consumed. Removing it halves the scroll re-render rate.
- [x] **[verified]** `~40 of 65` color variables in `app/globals.css` — `bg-card`, `bg-popover`, `bg-accent`, all `chart-*`, the entire 9-variable `sidebar-*` block, plus their `.dark` twins. Zero references.
- [x] **[verified]** The `.dark` class block (32 variables) — never applied to any element.
- [x] **[verified]** `SectionHeading` — the `eyebrow` prop branch and the `centered={false}` branch are never exercised (one call site, which omits `eyebrow`). **Deleted 2026-07-31** — the M3 homepage rebuild removed its last call site, leaving zero. `components/ui/status-badge.tsx` was found in the same state and deleted with it.
- [ ] **[verify]** `@import "shadcn/tailwind.css"` in `globals.css` — 629 lines, 24 utilities, reportedly zero used. Confirm before removing.
- [ ] **[verify]** `tw-animate-css` dependency — reportedly contributes zero used utilities.

### Deliberate exception

- [x] **[decision]** `components/ui/button.tsx` — 6 variants × 9 sizes, **zero imports**. Do **not** delete. It is well-built and is the intended foundation; the fix is to trim it to 4 variants / 3 sizes and *adopt* it. See `DESIGN.md`.

---

## 4. Duplicated design systems

The core visual debt. Do not resolve by hand — resolve by building the token layer first (P1), then migrating.

- [x] **[verified]** **Three page blacks** → one `--surface-base`. `#050505` (`globals.css:139`), `#0A0A0A` (8 uses across 6 files), unused `--background`.
- [x] **[verified]** **Two grey families** → one. `neutral` (72 uses, 13 files) and `zinc` (22 uses, 7 files). They collide inside `components/about/PersonCard.tsx` and across `/about`.
- [x] **[verified]** **18 white-opacity steps in 2 notations** → three rule tokens. 11 Tailwind (`/5`, `/10`, `/[0.06]`…) + 7 raw `rgba`.
- [x] **[verified]** **Three greens** → one. `emerald-400`, `emerald-500`, and `rgba(0,230,118)` (Material Green A400, 6 uses in the support SVGs — visibly a different green from the Tailwind emeralds beside it).
- [ ] **[verified]** **Three card systems** → one row primitive plus one card primitive. Opaque zinc + `border-white/10` + hover-lift (4 instances); glass `border-white/[0.06]` + `bg-white/[0.02]` (8); glass controls `/[0.08]` + `/[0.03]` (13).
- [x] **[verified]** **11 single-use accent hues** in `components/journey/JourneyEvent.tsx` → 3 semantic colors plus glyphs.
- [x] **[verified]** **Four status palettes** that don't agree — `JourneyEvent`, `project-card`, `status-badge`, and an inline reimplementation in `current-project.tsx`. **Collapsed 2026-07-31** into one `ProjectStatusTag` (`components/project/project-status.tsx`), consumed by both `project-card` and `current-project`; `status-badge` deleted; `JourneyEvent` was already replaced by `EventGlyph` in the ledger rebuild. State is carried by dot fill rather than by hue, so only `active` spends the accent.
- [x] **[verified]** **The glow motif duplicated 6×** at 3 heights and 3 opacities → one `Glow` primitive.
- [x] **[verified]** **15 text sizes** (incl. `text-[10px]`, `text-[11px]`, `text-[0.8rem]`) → 6 scale tokens.
- [x] **[verified]** **7 radii** (3 for cards alone) → `sm` / `md` / `full`.
- [ ] **[verified]** **6 section paddings** across 11 sections (only 2 agree) → 2.
- [ ] **[verified]** **4 container widths** → 3, all via `Container`. `JourneyTimeline` and `app/admin/page.tsx` bypass it; `/support` visibly jumps width mid-scroll.
- [x] **[verified]** **10 motion durations** → 4 tokens. 56 of 80 transitions specify none.
- [ ] **[verified]** **`transition` vs `transition-all`** — same thing, two spellings, split 25/19.
- [ ] **[verified]** **5 focus patterns across 3 mechanisms** → one ring token. One references `ring-offset-zinc-950`, which is not the page background.
- [ ] **[verified]** **Two card hover models** — 4 cards lift, 8 don't.
- [x] **[verified]** **The entire shadcn token layer is bypassed** — 36 references, all inside the unused `button.tsx`; `body { background: #050505 }` overrides the one base rule that consumed a token.

---

## 5. Broken configuration

- [x] **[verified] Fix the font wiring — highest value, lowest effort on this list.** `app/globals.css:10` declares `--font-sans: var(--font-sans)` (self-referential, invalid) while `app/layout.tsx:9` publishes `--font-geist-sans`, which nothing reads. **Geist Sans is downloaded on every page load and renders zero glyphs — the site displays in the browser default sans-serif.** One line. Changes every character on the site. Blocks all type decisions.
- [ ] **[verified]** `package.json` declares `db:push` and `db:studio` via `drizzle-kit`. **Drizzle is not installed** (confirmed absent from `node_modules`), there is no `drizzle.config.ts`, no schema file. Both scripts fail. **[decision]** either install Drizzle or remove the scripts and commit a real `schema.sql`.
- [ ] **[verified]** `next.config.ts` is untouched boilerplate — no security headers, no `images` config, no redirects.
- [ ] **[verified]** No `.github/workflows/` — no CI, no lint gate, no type-check gate. The lint rule in `DESIGN.md` needs somewhere to run.
- [ ] Missing: `sitemap.ts`, `robots.txt`, `manifest.json`, OG image, per-page metadata. All five pages share the homepage `<title>`.

### Admin security

- [x] **[verified]** `middleware.ts` matcher is `["/admin/:path*"]`. In path-to-regexp, `:path*` means *zero or more* segments, so bare `/admin` should match — but this is security-critical and must be confirmed empirically rather than reasoned about: `curl -I https://<host>/admin` should return `401`. **Confirmed 2026-07-31** against a local `next start` (production mode, so the `NODE_ENV === "development"` bypass is inactive): bare `/admin` returns `401`. Re-confirm against the deployed host, since this was a local check.

  *Correction to the strategy document: this was listed there as a probable unauthenticated-admin risk. On inspection the matcher is most likely correct. The confirmed issues are the three below.*

- [ ] **[verified]** Auth is bypassed entirely when `NODE_ENV === "development"` unless `FORCE_ADMIN_AUTH` is set. Intentional, but worth a second look given `.env.local` sits beside a production database URL.
- [ ] **[verified]** `atob(authValue)` is unguarded — a malformed `Authorization: Basic !!!` header throws inside middleware.
- [ ] **[verified]** Credentials compared with `===` rather than a timing-safe comparison. Minor, but it is a password check.
- [x] **[verified]** `app/admin/actions.ts` writes `revenue` and `is_live` but `getFormFields("streams")` omitted both, so neither could be set from the UI. **Fixed** — added `revenue` (number) and `isLive` (boolean) fields, plus an `isFounder` boolean for people, plus a checkbox renderer and submit-time numeric coercion.

- [x] **[verified] snake_case / camelCase mismatch — silent data loss on every edit.** Found while fixing the above, and worse than it. The `get*` actions used `SELECT *`, returning snake_case keys, while every write action reads camelCase (`data.isLive`, `data.isFounder`, `data.startedOn`). Those keys were therefore `undefined`, so the `?? false` / `?? null` fallbacks fired and **saving an otherwise-untouched row wiped the column**:

  | Column | Verified effect of any edit |
  |---|---|
  | `people.is_founder` | `true` → `false` — would have blanked the `/about` founder card |
  | `projects.started_on` | `2026-07-26` → `null` — breaks `/projects` ordering and the displayed date |
  | `streams.is_live` | → `false` |

  It also explains why the admin people table rendered `—` in the `isFounder` column for every row. **Fixed** by normalising all six reads through a `camelize()` helper in `actions.ts`, so one naming convention holds end to end. Verified against live rows: `ankit` now round-trips `is_founder = true` and project `2` retains `started_on`.

---

## 6. Placeholder assets

- [x] **[verified]** Delete `create-next-app` leftovers from `public/`: `next.svg`, `vercel.svg`, `globe.svg`, `window.svg`, `file.svg`. All unreferenced. **5 of 9 files in `public/`.**
- [ ] **[verified]** `app/favicon.ico` is still Next's default.
- [ ] **[verified]** `public/logo.png` is a 95KB unoptimized PNG. No SVG logo, no favicon variants.
- [ ] **[verified]** `add-event.py` defaults new contributor avatars to `/images/avatar-default.png`, which does not exist.
- [ ] Missing: OG image. Every share of this site currently renders as a bare link.

---

## 7. Obsolete tooling

- [x] **[verified]** `lib/streams.ts` and the `streams` table on the public site — **removed 2026-07-31**. The whole table fed exactly one thing: a single `url` for one link, while carrying nine columns nothing rendered. It had also drifted — its newest row was day 9 while the events record was at day 16, so the homepage "latest stream" link pointed eight days and seven streams into the past. The link now reads the newest `type='livestream'` event. Admin retains its CRUD tab; **the table itself can be dropped whenever you want** — nothing public reads it.

- [ ] **[verified]** `repo_tree.py` — `ROOT` is hardcoded to a Windows path (`C:\Users\thisi\OneDrive\...`). Cannot run on this machine. No argument parsing, no `__main__` guard. A personal convenience script; delete.
- [ ] **[verified]** `add-event.py` — 321 lines. Writes events by regex-splicing `data/*.ts` files **that the site no longer reads** (the site reads Postgres). Also points at `data/people.ts`, which does not exist — the file is `data/people2.ts` — so the contributor path exits with an error. Fully superseded by `/admin`. `PLATFORM_EVOLUTION_ROADMAP.md` calls for updating it to write to the DB; deleting is the better call.
- [ ] **[verified]** `data/*.ts` are labelled "legacy, being phased out" in **[root]** `OPERATIONS.md`, but `data/site.ts` is still the live source for the entire hero and Explore grid. **[decision]** finish the migration: move `site.ts` content into `site_state` or accept it as permanent config and relabel.
- [ ] **[verified]** `data/people2.ts` and `data/support2.ts` re-declare interfaces already in `types/`. The `2` suffix is unexplained; no `people.ts` or `support.ts` exists.
- [ ] **[verified]** Type definitions are split across three locations: `types/`, `components/journey/types.ts`, and inlined in `data/*2.ts`.
- [ ] **[verified]** `components/project/current-project.tsx` re-declares a local `LatestStream` interface instead of importing from `lib/streams.ts`.

---

## 8. Documentation debt

- [ ] **[verified]** `README.md` (app-level) is **100% `create-next-app` boilerplate** — on a repo whose brand is transparency, and the first thing a contributor reads.
- [ ] **[verified]** **[root]** `OPERATIONS.md` is a pasted LLM response — it opens with `"Here's your project operations guide — save it as OPERATIONS.md in your repo root:"` followed by an unclosed ` ```markdown ` fence wrapping the entire document.
- [ ] **[verified]** **[root]** `OPERATIONS.md` documents `ADMIN_PASSWORD` but not `ADMIN_USER`, which the middleware also requires. It lists the file as `app/middleware.ts`; the real path is the app root.
- [ ] **[verified]** **[root]** `OPERATIONS.md` lists Fonts as "System / Geist" — accurate only by accident, given the font bug.
- [ ] **[verified]** **[root]** `README.md` declares a tech stack (Spring Boot, Java, MongoDB, Redis, Kubernetes, LangChain) bearing almost no relation to what is built (Next.js, Neon Postgres, Tailwind). **[decision]** aspirational roadmap or current stack — label it clearly either way.
- [ ] **[verified]** **[root]** `PLATFORM_EVOLUTION_ROADMAP.md` holds the only DB schema, **written in SQLite dialect** (`DATETIME`, `AUTOINCREMENT`, `BOOLEAN DEFAULT FALSE`) while the database is Postgres. Nothing keeps it in sync with the live schema.
- [ ] Add a data-integrity line to `.github/pull_request_template.md`: *does every new number trace to a column?*

---

## 9. Performance & accessibility

Full detail in `ACCESSIBILITY.md`.

- [ ] **[verified]** `components/support/useChapterProgress.ts` — no `rAF` throttle. Two `setState` calls per scroll event × 3 mounted instances, each re-rendering an SVG subtree of up to 20 animated elements. Three forced reflows per tick. The site's most expensive runtime path.
- [ ] **[verified]** `prefers-reduced-motion` — **zero occurrences** sitewide, alongside 51 animated SVG properties and infinite SMIL loops.
- [ ] **[verified]** No capsule SVG has `role="img"` or `aria-label` — the best work on the site is invisible to screen readers.
- [ ] **[verified]** `CoffeeCapsule.tsx` uses a non-unique SVG `id="cup-clip"` — collides if rendered twice.
- [ ] **[verified]** `components/support/BlueprintSchematic.tsx` hardcodes a 4-element threshold array indexed by `builderBenefits.length` — breaks if the benefit count changes.
- [ ] **[verified]** `0.1s linear` transitions on scroll-driven properties fight the scroll position, adding lag rather than smoothing.
- [ ] **[verified]** `/support` has no empty or error state — if `support_tiers` returns nothing, the page renders a header and nothing else.
- [ ] **[verified]** `lib/db.ts` throws at module import if `DATABASE_URL` is unset. With every page `force-dynamic`, the whole site 500s rather than degrading.
- [ ] **[verified]** Admin modal: no focus trap, no `role="dialog"`, no Escape-to-close; backdrop click discards in-progress edits.
- [ ] **[verified]** `app/admin/page.tsx` — `data` and every row typed `any`; `confirm()`/`alert()` for destructive actions; `colSpan={99}`; no validation on the JSON textareas.

---

## Suggested sequencing

Do not work through this document linearly. Fold it into the roadmap:

| Milestone | Sections |
|---|---|
| **M1** Truth pass | §1, §2, §5 font fix, §6 |
| **M2** Token layer | §4 (all), §5 remaining |
| **M3** Primitives | §3, §4 card/hover consolidation |
| **M4** Ledger | §1 slice removal, §9 |
| **M5** Housekeeping | §7, §8 |

§3 deletions are safe at any point but are cheapest to verify *after* the token layer lands, since some dead code will be replaced rather than removed.
