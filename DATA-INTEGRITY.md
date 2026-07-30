# Vibe Through Code — Data Integrity

The rules governing what may appear on screen as a fact.

This is the most important document in the repository. Every other quality problem is recoverable. This one is not.

---

## Why this exists

The product's entire value proposition is *every number here is real*. The premise is "every success and every mistake is public."

A site making that claim while displaying a hardcoded viewer count is not slightly flawed — it is disproven. One visitor viewing source ends the premise permanently, and no amount of subsequent honesty repairs it. The asymmetry is total: fabricated numbers gain almost nothing and risk everything.

An audit on 2026-07-30 found five live fabrications. They are listed below not as a shaming exercise but because **a rule without a violation registry gets re-violated.**

---

## The rule

> **If a value has no database column behind it, it does not render.**

No placeholders. No demo values. No "illustrative" figures. No "we'll wire it later." Show the real number, show `$0`, or show nothing.

### Corollaries

**Zero is always shippable.** `$0`, `0 supporters`, `0.0000%` are correct, credible, designed states. There is never a reason to invent a number, because zero is always available and always more persuasive than a fake.

**Wire the query before you style the component.** A component that renders an empty real result is further along than one that renders a beautiful constant. The constant is technical debt that looks like progress.

**Hardcoding in a server component is still hardcoding.** `builderBenefits` and `sessionManifest` currently live as literals inside `app/support/page.tsx` while every other value on that page comes from the database. Proximity to a query does not launder a constant.

**Unused fake data is still a liability.** `components/journey/demo-data.ts` is imported nowhere and contains `$847` revenue, `$1,024 MRR`, `34 customers`, `0% churn`. One careless import ships all of it. Delete rather than quarantine.

---

## What may and may not be hardcoded

| May be hardcoded | Must come from the database |
|---|---|
| Static prose and headings | Any count, total, or amount |
| Button and nav labels | Revenue, in any form |
| Instrument label text (`REVENUE`) | Day number, streak, commit counts |
| Legal and footer text | Viewer counts, watch time |
| Empty-state copy | Supporter counts |
| Design tokens | Live/streaming status |
| Route paths | Dates and timestamps of real events |
| Event *type* taxonomy | Prices |
| Icon and glyph mappings | Anything with a unit or a `%` |

Simple test: **does it have a unit, or would it change tomorrow?** Then it comes from a query.

---

## Current violations

Ordered by risk. All are P0 — they precede any design work.

### 1. Fabricated live metrics in support copy

**Location:** `support_tiers.narrative` (database), seeded from `data/support2.ts`
**String:** `"Today's session: refactoring the auth layer. 312 people watching. 47 commits."`
**Reality:** real `viewers` for days 5–9 are all `0`. The named work doesn't match `site_state.current_goal` either.
**Risk:** highest on the site. It is *narrative* copy, so it reads as a live report rather than an example.
**Fix:** rewrite without invented figures, or bind to real stream data.

### 2. Contradictory day count

**Location:** `components/support/SystemTerminus.tsx`
**String:** `"The journey is at Day 47. The next stream is tomorrow."`
**Reality:** `site_state.current_day` is `9`. `/journey` displays Day 9 on the same site.
**Risk:** self-contradicting within one session. Two pages, two different day counts.
**Fix:** read `site_state.current_day`. Remove the stream claim or bind it to a real schedule.

### 3. Invented supporter counts, rendered as meters

**Location:** `app/support/page.tsx` — `sessionManifest = { coffee: 12, stream: 3, builders: 1 }`
**Reality:** there is no payment integration. Zero supporters exist.
**Risk:** invented social proof, given visual authority by 10-segment progress meters.
**Fix:** remove until the `payments` table has rows. Then derive by query.

### 4. Invented viewer counts in the database

**Location:** `streams` table, seeded from `data/streams.ts` — days 1–4 hold `400`, `250`, `310`, `280`
**Reality:** invented. Days 5–9 correctly hold `0`.
**Risk:** currently not rendered, but the column is one component away from being surfaced.
**Fix:** set to `0` or to real values from YouTube.

### 5. Fabricated financials in unused code

**Location:** `components/journey/demo-data.ts`
**Contents:** `$847` revenue, a `"First $1,000 Month"` event, `$1,024 MRR`, `34 customers`, `0% churn`, `312` viewers, a fake PR URL
**Risk:** unreferenced today. Catastrophic if imported.
**Fix:** delete the file.

### Related

- **Placeholder URLs in production:** five seeded events carry the literal `https://youtube.com/live/...` (one with a `// update me` comment).
- **Duplicate seeded content:** several events share descriptions verbatim; two share a title and timestamp.
- **Truncated record:** `/journey` renders `events.slice(0, 3)` — 3 of 14. Not a fabrication, but it violates "everything is public" and is the same category of harm: the record misrepresenting itself.

---

## Currency integrity

USD everywhere as of 2026-07-30. Mixed currency is a data-integrity problem, not a formatting one — a figure whose unit is ambiguous is not a fact.

Current state:

| Issue | Location |
|---|---|
| `total_revenue_paise` rendered with a `$` sign | `lib/journey.ts` |
| `en-IN` digit grouping on a dollar figure | `lib/journey.ts` |
| Tier prices in `₹` | `support_tiers`, `/support` |
| Mission stated in `$` | everywhere |

**Target:** store integer cents in a column named for its unit (`total_revenue_cents`). Format with `en-US`. One currency symbol sitewide. Convert tier prices to USD.

---

## Verification

### Per pull request

- [ ] Every new number traces to a column — name it in the PR description
- [ ] No new hardcoded counts, totals, or amounts
- [ ] Zero and empty states render correctly with an empty database
- [ ] No `TODO`, `FIXME`, or placeholder text in shipped strings
- [ ] Any new URL resolves

### Mechanical checks

```bash
# known fabricated values
grep -rE '\b(312|847|1,024|Day 47)\b' app components data

# placeholder URLs
grep -rn 'youtube.com/live/\.\.\.' app components data scripts

# truncated record
grep -rn 'slice(0,' app components

# dead links
grep -rn 'href="#"' app components
```

All four should return nothing.

### The empty-database test

The strongest available test, and it should be run before each milestone:

1. Point `DATABASE_URL` at an empty database with the schema but no rows
2. Load every page

**Every number should read `0` or `—`. Nothing should read `12`, `312`, or `47`.** Any figure that survives an empty database is hardcoded.

This test would have caught all five violations above.

---

## When a real number is unavailable

Ranked. Pick the highest option that applies.

1. **Show zero.** Almost always correct and almost always more persuasive than the alternative.
2. **Show `—`.** For genuinely unknown values, as distinct from zero.
3. **Omit the element.** If neither zero nor unknown makes sense, the element isn't ready.
4. **Ship the component behind a flag,** rendering only when the query returns data.

Never: invent a plausible value, use a "realistic" example, or leave a placeholder with an intention to fix it later. Placeholders ship.
