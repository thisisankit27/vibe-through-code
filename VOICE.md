# Vibe Through Code — Voice & Content Guide

Rules for every user-facing string, label, and number. Read before writing copy.

---

## The voice

**A working engineer's public logbook, kept with unusual discipline.**

| Is | Is not |
|---|---|
| Precise | Corporate |
| Understated | Modest |
| Instrumented | Gamified |
| Warm at human moments | Sentimental |
| Dry-funny | Jokey |
| Unfinished on purpose | Sloppy |

The tension to hold: **rigorous about data, human about narrative.** Numbers are never editorialized — `$0` is just `$0`, never "$0 (for now!)". Prose can have a voice. That contrast *is* the brand: cold instruments, warm hand.

### If the brand were a person

A backend engineer, five years in, who keeps a paper notebook nobody asked them to keep. They write down what broke and why, in pen, with the date. They are not trying to be a personality; they are trying to be *legible*. Asked how it's going, they tell you the actual number — and if the number is bad they tell you that too, without apologizing for it.

They are not a founder-influencer. They would be embarrassed by a fake viewer count.

---

## Rules

### 1. Present tense, first person singular

"I'm building X." Never "we are pleased to announce." The company is one person and pretending otherwise is the first crack in the premise.

### 2. Declarative and short

`One Livestream. One Commit. One Project at a Time.` is the target rhythm. Short sentences, hard stops, no subordinate clauses.

### 3. Bad news first and plainly

"Revenue: $0. Day 9." No cushioning, no framing, no "just getting started!" The plainness is what makes it credible.

### 4. Never hype

Banned: "excited to share", "game-changing", "revolutionary", "10x", "supercharged", "seamless", "delighted", "thrilled", "journey to greatness", any rocket or fire emoji in product surfaces.

### 5. Labels are terse and technical

`REVENUE`, not "Our Revenue Journey". `ADR`, not "Architecture Decision Record Blog Post". `DAY 009`, not "Day 9 of my amazing adventure".

### 6. Never editorialize a number

The number carries its own meaning. Adding sentiment to it is the fastest way to look like you're managing perception.

| Wrong | Right |
|---|---|
| `$0 (just getting started!)` | `$0` |
| `Only 9 days in 🚀` | `DAY 009` |
| `A promising 32 commits` | `32 commits` |
| `0% — but watch this space` | `0.0000%` |

### 7. No em-dash concatenation of two sentences

`lib/journey.ts` currently composes `${current_goal} — ${current_milestone}`, producing `"Build the Vibe Through Code platform. — Centralize website content."` Two complete sentences joined by a dash. Compose deliberately or keep them separate.

---

## Naming & capitalization

| Element | Style | Example |
|---|---|---|
| Page titles | Title Case | `Journey`, `Projects` |
| Section headings | Sentence case | `Building alongside` |
| Instrument labels | UPPERCASE mono, `tracking-wider` | `REVENUE`, `STREAK`, `DAY` |
| Eyebrows | UPPERCASE, `tracking-eyebrow` | `ENGINEERING JOURNAL` |
| Buttons | Sentence case, verb-first | `Support this session`, `View repository` |
| Event type badges | Single word where possible | `Merged`, `Shipped`, `Deploy`, `ADR` |
| Status | Sentence case | `Active`, `Planned`, `Completed` |

**Product name:** `Vibe Through Code`. Never `VTC` in user-facing copy, never `vibethroughcode` outside URLs.

---

## Number formatting

### Currency — USD everywhere

Decided 2026-07-30. The mission is `$1,000,000`.

| Context | Format |
|---|---|
| Zero | `$0` — never `$0.00`, never `—` |
| Whole dollars | `$49`, `$1,240` |
| Sub-dollar precision | only where genuinely relevant |
| The goal | `$1,000,000` — always full digits, never `$1M` in the counter |
| Progress | `0.0000%` — four decimals, so early progress is visible rather than rounding to `0%` |
| Storage | **cents**, integer |
| Locale | `en-US` |

Legacy to migrate: `total_revenue_paise` (a paise column formatted with `$` and `en-IN` grouping) and the `₹` tier prices. These are migration targets, not patterns.

### Counts

- Day: zero-padded to three — `DAY 009`. Fixed width means the layout never shifts, and it reads as an instrument.
- Everything else: plain integers with thousands separators — `32 commits`, `1,204 viewers`
- Deltas: always signed, always dated — `+6 commits · today`, `+$49 · 2h ago`

### Dates & times

| Context | Format |
|---|---|
| Ledger entries | `2026-07-21` — ISO, mono, sortable |
| With time | `2026-07-21 22:35` |
| Relative (recency only) | `4 hours ago`, `yesterday`. Never beyond 7 days. |
| Prose | `21 July 2026` |
| `dateTime` attribute | valid ISO 8601 only |

`<time dateTime="July 2026">` currently ships on `/projects` and is invalid. If the database holds a coarse value like `"July 2026"`, either store a real date or omit the attribute.

### Zero and empty states

Zero is a designed state with real copy. It is never hidden, padded, or apologized for.

| State | Copy |
|---|---|
| No revenue | `$0` and `0.0000%` |
| No supporters | `No supporters yet.` |
| No events | `Nothing logged yet.` |
| Not live | `Not streaming` |
| Unknown value | `—` |

Never: "Coming soon", "Stay tuned", "Watch this space", "Nothing here yet — but big things are coming!"

**"Coming Soon" is banned entirely.** It currently appears on the homepage for `/projects` and `/journey` — two pages that are fully built, DB-wired, and linked in the navbar. Either the thing exists and you link it, or it isn't mentioned.

---

## Writing a journey event

Events are the primary content type. Each is a ledger entry, not a blog post.

**Title:** what happened, ≤ 60 characters, no marketing.
- Good: `Support page wired to Postgres`
- Bad: `Exciting new Support page is live! 🎉`

**Description:** 1–2 sentences of what and why. 15–35 words. Include the reasoning, because the reasoning is the value.

**Never duplicate a description across events.** Several seeded events currently share identical descriptions verbatim, and two share a title and timestamp. Each entry earns its own words.

**`meta`:** real figures only. `Files 17 / +1063 −1 / Commits 6` is ideal — checkable against a linked PR.

**`href`:** a real, working URL. Five seeded events currently carry the literal placeholder `https://youtube.com/live/...` in production.

**Log failures.** `bug_fix` and `learning_moment` entries are the highest-trust content on the site. Write them with the same care as wins, and don't soften them.

---

## Specific fixes required

Live strings that violate this guide:

| String | Location | Fix |
|---|---|---|
| `Youtube Face` | `components/about/PersonCard.tsx` | → `Founder`. The founder badge is the most credibility-damaging string on the site. |
| `Coming Soon` ×2 | `components/explore/explore.tsx` | Link the real pages |
| `312 people watching. 47 commits.` | `support_tiers.narrative` | Delete. Real viewers for those days are `0`. |
| `The journey is at Day 47.` | `components/support/SystemTerminus.tsx` | Read `site_state.current_day` (currently `9`) |
| `The next stream is tomorrow.` | `components/support/SystemTerminus.tsx` | Real schedule or remove |
| `Payment integration coming soon.` | `components/support/ReceiptPanel.tsx` | Wire Stripe, or state the real alternative |
| `Get in touch` → `href="#"` | `components/about/ContributionCTA.tsx` | Real destination or remove |
| `₹` prices | `support_tiers` | Convert to USD |
| `Human & Engineer` | `people.role` | Fine, but decide if it's the intended public role |
| `KIMI K3` as `Frontend Engineer` | `people` table | Reframe as a "Built with" tooling disclosure — see below |

### The AI contributor

An AI model is currently listed under "Contributors / Building alongside" with the role `Frontend Engineer` and a human-style avatar. Presenting a model as a teammate with a job title reads as padding a team page, which is corrosive for a transparency brand.

**Reframe rather than delete.** A separate "Built with" section, explicitly labelled as tooling, naming what it was actually used for. Disclosing AI collaboration honestly is strongly on-brand and directly serves the stated Responsible AI interest — and almost nobody does it. That is more interesting than a fake teammate.

---

## Metadata copy

Every page needs its own title and description. All five pages currently share the homepage title.

- **Title:** `{Page} — Vibe Through Code`
- **Description:** one sentence, ≤ 155 characters, containing a real number where possible. `Day 9. $0 of $1,000,000. Every project built live.` is better than any adjective.
- **OG image:** generated per page, carrying live day count and revenue — so every share is a status report rather than a logo.
