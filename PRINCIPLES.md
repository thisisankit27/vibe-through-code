# Vibe Through Code — Product Principles

How we decide what to build. Read this before designing a feature, not after.

---

## North Star

> The public instrument panel of a software company being built from $0 to $1,000,000.

Every project built live. Every decision logged. Every number real — including the ones that aren't impressive yet.

## What this is not

Being precise about this prevents most bad decisions:

| Not | Because |
|---|---|
| A portfolio | Portfolios are about a person's past. This is about a company's present. |
| A blog | Blogs are about opinions. This is about evidence. |
| A startup landing page | Landing pages sell a product you can buy today. There isn't one yet. |
| A personal website | The subject is the company, not the founder. |
| A dashboard | Dashboards are private tools. This is a published record. |

The closest correct analogies: a flight recorder, an open ledger, a lab notebook kept in public, `git log` with a design system.

---

## The one test

Before building anything, answer:

> **Does this make the journey easier to follow, more valuable to learn from, or cheaper to keep updated?**

If none of the three, it belongs in a later milestone. This test comes from `superficial-roadmap.md` and it has held up — keep using it.

Two supplementary tests that catch different failures:

**The evidence test.** Does this show something true, or assert something flattering? Assertions get cut. `Build. Learn. Share.` is an assertion. `Day 9 · 32 commits · $0` is evidence.

**The Monday/Friday test.** If someone visits Monday and again Friday, will they see that the journey moved? This is the primary success metric for the site. A feature that produces no visible change between visits is a low-priority feature.

---

## Priority order

When principles conflict, higher wins.

1. **Truth** — never ship a number we can't defend
2. **Legibility** — the visitor understands current state in under 10 seconds
3. **Liveness** — the site visibly changes as the journey progresses
4. **Depth** — there is more to find for someone who stays
5. **Sustainability** — the journey can be funded
6. **Polish** — it looks considered

Polish is last on purpose. A beautiful site with an invented metric is worth less than a plain site with an honest one. This ordering is also the order in which trust is built — you cannot skip up the list.

---

## Product philosophy

### Evidence over assertion

Never claim a quality the data can demonstrate. Every adjective on the site is a missed opportunity to show a number. We have a database full of evidence; use it.

### Zero is an asset

Being at Day 9 with $0 revenue is the one thing that can never be recovered later. Most build-in-public projects try to look bigger than they are, which is why few are believed. Showing `$0` and `0.0000%` without flinching buys credibility no amount of polish can.

Design zero states deliberately. They are shipping states, not empty states to hide.

### Failure is premium content

`bug_fix`, `learning_moment` and `architecture_decision` events are the highest-trust content on the site. A visitor who sees us log a bug against ourselves stops evaluating and starts following. Surface failures; never bury them.

### The record is append-only

The journey is never curated, reordered, truncated, or edited to look better. If it happened, it stays. This is the property that makes everything else believable.

### Remove before adding

The site's problem has never been too little UI. Default to deleting a section rather than redesigning it. A page that does one thing clearly beats a page that does four things adequately.

### Real telemetry over placeholder content

An empty state driven by a real query beats a populated state driven by a constant. Wire the data path first, even when it returns nothing interesting.

---

## The visitor journey

From `superficial-roadmap.md`, with the design obligation at each step. Trust → Return is the link that matters most; it is currently the weakest.

| Stage | Should feel | What the site owes them |
|---|---|---|
| Discover | Curiosity | Current state above the fold — live status, day, the counter |
| Orient | Respect | Real numbers, unedited, in under 10 seconds |
| Verify | Trust | Checkable evidence — linked PRs, real diffs, timestamps |
| Explore | Recognition | The full record, failures included |
| Return | Satisfaction | Something visibly different since last visit |
| Participate | Agency | Real contribution paths, never a dead link |
| Support | Generosity | A working way to fund a specific session |
| Recommend | Advocacy | A shareable artifact carrying live telemetry |

Features should move a visitor one step down this path. A feature that serves no step is decoration.

---

## Maturity stages

We are at the end of Stage 1 entering Stage 2. Do not build Stage 5 features yet.

| Stage | Question answered | Status |
|---|---|---|
| 1 Existence | Who are you? | shipped; needs rebuilding as an instrument |
| 2 Credibility | Are you actually building? | **current focus** |
| 3 Storytelling | Can I follow along? | partially built (`/journey`) |
| 4 Education | Can I learn from this? | off-site (Archive) |
| 5 Community | Can I participate? | not started |
| 6 Support | How can I help? | built, not functional — no checkout |
| 7 Transparency | How is it going? | the counter does not exist yet |
| 8 Ecosystem | Bigger than one person? | future |
| 9 Platform | Can others use this? | years away |

Note the ordering violation to watch: Support (6) is visually the most developed page while Credibility (2) and Transparency (7) are the least. Asking for money before establishing trust is the classic mistake. Fix the counter and the record before optimizing the ask.

---

## One capability per milestone

Each release introduces one major thing. Not twenty. This keeps scope communicable on stream and every PR reviewable.

A milestone must: compile, keep the app functional, improve exactly one area, be independently reviewable, and produce visible progress.

---

## Decisions already made

Recorded here so they aren't relitigated each session.

| Decision | Value | Date |
|---|---|---|
| Currency | USD everywhere. Mission is `$1,000,000`. Store cents. | 2026-07-30 |
| Primary site goal | Return visits — make the site feel alive | 2026-07-30 |
| Visual identity direction | **Direction D — The Workbench.** Recency encodes visual temperature: what is happening now is lit, what has happened is recorded. See `DESIGN.md`. | 2026-07-30 |
| — H1 ground polarity | **Resolved: paper.** Validated on the rebuilt Journey page — "exceeded expectations… feels more like a software product than a developer portfolio." Dark ships as a designed theme via `.theme-dark`. | 2026-07-31 |
| — H3 entry container | **Resolved: ruled rows.** Reviewed and approved on Journey. Rows and cards produce byte-identical HTML, so this was a design judgement, not a performance one. `presentation="cards"` remains in `Ledger` as the documented counterfactual. | 2026-07-31 |
| — H2 prose face | **Still open — and untested.** `--face-prose` is still Geist Sans; no serif has been tried. The swap is one line in `globals.css`. Do not record this as settled until a serif has actually been rendered and compared. | under test |
| ORM | None. Raw SQL via `@neondatabase/serverless`. | pre-existing |
| Payments provider | Stripe (follows from USD-first) | 2026-07-30 |
