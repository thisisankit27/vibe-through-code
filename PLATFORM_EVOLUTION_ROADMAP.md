# Vibe Through Code — Platform Evolution Roadmap

> **Status:** Planning Phase  
> **Last Updated:** 2026-07-22  
> **Goal:** Transform the static data-driven site into a living, auto-updating platform with real payments.

---

## Table of Contents

1. [Phase 0: Foundation — Database Layer](#phase-0-foundation--database-layer)
2. [Phase 1: Automation — GitHub & YouTube Sync](#phase-1-automation--github--youtube-sync)
3. [Phase 2: Commerce — Payment Gateway Integration](#phase-2-commerce--payment-gateway-integration)
4. [Phase 3: Polish — Real-Time & Edge Cases](#phase-3-polish--real-time--edge-cases)
5. [Appendix: API Reference & Schema](#appendix-api-reference--schema)

---

## Phase 0: Foundation — Database Layer

### 0.1 Why a Database?

Currently, every page consumes static `.ts` files (`journey.ts`, `streams.ts`, `people.ts`, etc.). This works for manual updates but blocks:

- **Automation** — no machine can write TypeScript at 6 AM.
- **Concurrency** — two scripts editing the same file = merge hell.
- **Analytics** — no query layer for "total revenue this month" or "most active stream day."
- **Payments** — transactional data belongs in a database, not a Git-tracked file.

### 0.2 Choice: SQLite → PostgreSQL Migration Path

| Stage | Tool | When |
|-------|------|------|
| **Now** | SQLite + Drizzle ORM | Zero infra, single file, stays in repo |
| **Later** | PostgreSQL (Neon/Supabase) | When concurrent writes, real-time features, or team scaling is needed |

**Rationale:** Drizzle ORM abstracts the dialect. Migration from SQLite to Postgres is a connection-string change.

### 0.3 Schema Design

```sql
-- Core tables

CREATE TABLE events (
    id            TEXT PRIMARY KEY,           -- evt-YYYYMMDD-type-###
    type          TEXT NOT NULL,              -- livestream, pr_merge, blog_post, ...
    title         TEXT NOT NULL,
    description   TEXT NOT NULL,
    date          DATE NOT NULL,
    time          TEXT,                       -- HH:MM
    href          TEXT,                       -- external URL
    badge         TEXT,                       -- "Launch", "Ended", etc.
    meta          JSON,                       -- [{ label, value }, ...]
    source        TEXT DEFAULT 'manual',      -- manual | github | youtube
    created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE streams (
    id            TEXT PRIMARY KEY,           -- stream-###
    day           INTEGER NOT NULL,
    title         TEXT NOT NULL,
    url           TEXT NOT NULL,
    date          DATE NOT NULL,
    duration      TEXT,                       -- "2h 04m"
    viewers       INTEGER DEFAULT 0,
    revenue       INTEGER DEFAULT 0,          -- stored in smallest currency unit (paise)
    commits       INTEGER DEFAULT 0,
    focus         TEXT,
    is_live       BOOLEAN DEFAULT FALSE,
    created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE people (
    id            TEXT PRIMARY KEY,
    name          TEXT NOT NULL,
    role          TEXT NOT NULL,
    bio           TEXT NOT NULL,
    avatar        TEXT,
    github        TEXT,
    linkedin      TEXT,
    website       TEXT,
    is_founder    BOOLEAN DEFAULT FALSE,
    created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
    id            TEXT PRIMARY KEY,
    slug          TEXT NOT NULL UNIQUE,
    title         TEXT NOT NULL,
    description   TEXT NOT NULL,
    status        TEXT NOT NULL,              -- active | planned | completed
    repository    TEXT,
    technologies  JSON,                       -- ["Next.js", "TypeScript", ...]
    started_on    TEXT,
    completed_on  TEXT
);

CREATE TABLE support_tiers (
    id            TEXT PRIMARY KEY,           -- coffee | stream | builder
    title         TEXT NOT NULL,
    price         INTEGER NOT NULL,           -- in paise (₹99 = 9900)
    currency      TEXT NOT NULL DEFAULT 'INR',
    frequency     TEXT,                       -- "/month" or NULL
    label         TEXT NOT NULL,
    description   TEXT NOT NULL,
    narrative     JSON                        -- ["line 1", "line 2", "line 3"]
);

CREATE TABLE payments (
    id            TEXT PRIMARY KEY,           -- razorpay/stripe order ID
    tier_id       TEXT NOT NULL REFERENCES support_tiers(id),
    amount        INTEGER NOT NULL,             -- in paise
    currency      TEXT NOT NULL,
    status        TEXT NOT NULL,              -- created | authorized | captured | failed | refunded
    provider      TEXT NOT NULL,              -- razorpay | stripe
    provider_ref  TEXT,                       -- payment intent / order ID from provider
    payer_name    TEXT,
    payer_email   TEXT,
    payer_contact TEXT,
    metadata      JSON,                       -- raw webhook payload (sanitized)
    created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at    DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sync_log (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    source        TEXT NOT NULL,              -- github | youtube
    sync_type     TEXT NOT NULL,              -- pr | stream | commit
    items_found   INTEGER DEFAULT 0,
    items_inserted INTEGER DEFAULT 0,
    items_updated INTEGER DEFAULT 0,
    status        TEXT NOT NULL,              -- success | partial | failed
    error_message TEXT,
    started_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed_at  DATETIME
);

CREATE TABLE site_state (
    key           TEXT PRIMARY KEY,
    value         TEXT NOT NULL,
    updated_at    DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Seed initial state
INSERT INTO site_state (key, value) VALUES
    ('current_day', '9'),
    ('current_goal', 'Build the Vibe Through Code platform.'),
    ('current_milestone', 'Centralize website content.'),
    ('total_revenue_paise', '0'),
    ('streak_days', '9'),
    ('total_commits', '32'),
    ('total_streams', '9'),
    ('is_live', 'false');
```

### 0.4 Migration Strategy

1. **Write a seed script** that parses existing `.ts` files and inserts into SQLite.
2. **Update `add-event.py`** to write to DB instead of string-munging `.ts` files.
3. **Gradually replace** static imports in components with `db.query()` calls.
4. **Keep `.ts` files** as read-only backup until Phase 1 is stable.

### 0.5 Effort Estimate

| Task | Time |
|------|------|
| Schema design & Drizzle setup | 30 min |
| Seed script (port existing data) | 45 min |
| Update `add-event.py` → `add-event.ts` | 30 min |
| Replace static imports in pages | 1.5 hr |
| Testing & type alignment | 30 min |
| **Total** | **~3.5 hours** |

---

## Phase 1: Automation — GitHub & YouTube Sync

### 1.1 The Problem

Manually adding every PR merge and livestream to `journey.ts` is friction. The site should document itself.

### 1.2 Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CRON TRIGGER                            │
│              Vercel Cron (2×/day) or GitHub Actions             │
└─────────────────────────────┬───────────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              ▼                               ▼
    ┌─────────────────┐           ┌─────────────────┐
    │  GitHub API       │           │  YouTube Data API │
    │  GET /repos/.../  │           │  GET /search?     │
    │  pulls?state=closed│          │  eventType=live   │
    │  GET /repos/.../  │           │  GET /videos?     │
    │  commits?since=...│           │  id=...           │
    └────────┬──────────┘           └────────┬──────────┘
             │                               │
             └───────────────┬───────────────┘
                             ▼
                    ┌─────────────────┐
                    │  Normalizer       │
                    │  (map API → Event)│
                    └────────┬──────────┘
                             ▼
                    ┌─────────────────┐
                    │  Upsert Engine    │
                    │  idempotent by    │
                    │  PR# / videoId    │
                    └────────┬──────────┘
                             ▼
                    ┌─────────────────┐
                    │  SQLite DB        │
                    │  (events, streams)│
                    └────────┬──────────┘
                             ▼
                    ┌─────────────────┐
                    │  Next.js ISR      │
                    │  revalidatePath   │
                    │  ('/journey')     │
                    └─────────────────┘
```

### 1.3 GitHub Sync — PR Merges & Commits

**Endpoint:** `GET /repos/{owner}/{repo}/pulls?state=closed&sort=updated&direction=desc`

**Filter:** `merged_at != null && merged_at > last_sync_time`

**Mapping:**

| GitHub Field | Event Field |
|-------------|-------------|
| `number` | `meta["PR"]` |
| `title` | `title` |
| `body` (first 200 chars) | `description` |
| `merged_at` | `date` |
| `html_url` | `href` |
| `changed_files` | `meta["Files"]` |
| `additions` / `deletions` | `meta["+/-"]` |
| `commits` | `meta["Commits"]` |

**Commit sync (for `totalCommits` counter):**
- `GET /repos/{owner}/{repo}/commits?since={last_sync}`
- Count and update `site_state.total_commits`.

### 1.4 YouTube Sync — Livestreams

**Endpoint:** `GET /youtube/v3/search?channelId={CHANNEL_ID}&eventType=live&part=snippet`

**For completed streams:**
- `GET /youtube/v3/search?channelId={CHANNEL_ID}&eventType=completed&publishedAfter={last_sync}`
- Then `GET /youtube/v3/videos?id={videoId}&part=contentDetails,statistics` for duration, view count.

**Mapping:**

| YouTube Field | Stream Field |
|--------------|--------------|
| `snippet.title` | `title` |
| `id.videoId` | `url` (https://youtube.com/live/{id}) |
| `snippet.publishedAt` | `date` |
| `contentDetails.duration` | `duration` (ISO 8601 → "2h 04m") |
| `statistics.viewCount` | `viewers` |
| `liveStreamingDetails.concurrentViewers` | `viewers` (if live) |

**Live detection:**
- If `search?eventType=live` returns results → `site_state.is_live = true`.
- Else → `is_live = false`.

### 1.5 Cron Schedule

| Time (UTC) | Task | Why |
|-----------|------|-----|
| **06:00** | Full sync (GitHub PRs + YouTube streams) | Morning update before most traffic |
| **18:00** | Full sync | Evening update, catches afternoon activity |
| **Every 5 min** (on page load) | Live status check | Cached 5 min, lightweight YouTube call |

**Implementation:**
- **Vercel Cron Jobs** (Pro plan for >2/day, or use GitHub Actions for unlimited).
- **Route handler:** `app/api/cron/sync/route.ts` — idempotent, guarded by `CRON_SECRET`.

### 1.6 Idempotency & Deduplication

```typescript
// Pseudo-code for upsert
const eventId = `evt-${date.replace(/-/g, '')}-pr-${pr.number}`;

await db.insert(events)
  .values({ id: eventId, ...mappedData })
  .onConflictDoUpdate({
    target: events.id,
    set: { ...mappedData, updated_at: new Date() }
  });
```

**Key strategy:**
- PR events keyed by `evt-{date}-pr-{number}`
- Stream events keyed by `stream-{day}` (auto-increment day from DB)
- If a PR title is edited, the update overwrites.

### 1.7 Effort Estimate

| Task | Time |
|------|------|
| GitHub API client + PR mapper | 45 min |
| YouTube API client + stream mapper | 45 min |
| Upsert engine with deduplication | 30 min |
| Cron route + secret auth | 20 min |
| ISR revalidation on sync | 15 min |
| Error handling & sync_log | 30 min |
| Testing (mock APIs, edge cases) | 45 min |
| **Total** | **~4 hours** |

---

## Phase 2: Commerce — Payment Gateway Integration

### 2.1 Requirements

| Requirement | Detail |
|------------|--------|
| **Indian users** | UPI (GPay, PhonePe, Paytm), Cards, Netbanking |
| **International users** | Cards (Visa, Mastercard, Amex), Apple Pay, Google Pay |
| **UX** | "Tap and pay" — minimal friction, no redirect if possible |
| **Cost** | Zero monthly fees, pay-only-on-earn |
| **Compliance** | Auto GST invoices, TDS handling if needed |

### 2.2 Decision: Razorpay (Primary) + Stripe (International Fallback)

| Factor | Razorpay | Stripe |
|--------|----------|--------|
| UPI Intent (direct app open) | ✅ Best-in-class | ⚠️ Via Stripe India, less smooth |
| Indian compliance (GST, TDS) | ✅ Auto-handled | ⚠️ Manual setup |
| International cards | ⚠️ Supported but weaker | ✅ Native, 135+ countries |
| Developer experience | Good | Excellent |
| Setup time | 30 min | 45 min |
| Commission (India) | 2% + GST | 2% + GST |
| Commission (Intl) | 3% + GST | 2.9% + 30¢ |

**Strategy:**
- **Phase 2A:** Razorpay for all tiers (₹99, ₹299, ₹999). Covers 90% of expected audience.
- **Phase 2B:** Add Stripe for USD/EUR payments if international traffic grows.

### 2.3 Razorpay Integration Flow

```
User clicks "Support" → Frontend requests order from /api/payment/create
                                    │
                                    ▼
                    ┌─────────────────────────────┐
                    │  POST /api/payment/create     │
                    │  • amount: 9900 (₹99 in paise)│
                    │  • currency: "INR"            │
                    │  • receipt: "coffee-{uuid}"   │
                    │  • notes: { tier: "coffee" }   │
                    └─────────────┬───────────────┘
                                  │
                                  ▼
                    ┌─────────────────────────────┐
                    │  Razorpay Order API           │
                    │  Returns: order_id, amount,   │
                    │  currency, key_id               │
                    └─────────────┬───────────────┘
                                  │
                                  ▼
                    ┌─────────────────────────────┐
                    │  Razorpay Checkout (hosted)   │
                    │  or UPI Intent (direct app)   │
                    │  User pays → Razorpay redirects │
                    │  to success URL with signature  │
                    └─────────────┬───────────────┘
                                  │
                                  ▼
                    ┌─────────────────────────────┐
                    │  POST /api/payment/verify       │
                    │  • Verify signature (HMAC)      │
                    │  • Update payments table        │
                    │  • Update site_state.revenue    │
                    │  • Create journey event (revenue)│
                    │  • Revalidate /journey          │
                    └─────────────────────────────┘
```

### 2.4 Webhook Handling

**Endpoint:** `POST /api/webhooks/razorpay`

**Events to handle:**

| Event | Action |
|-------|--------|
| `payment.captured` | Mark payment as `captured`, update revenue, emit event |
| `payment.failed` | Log failure, optional retry email |
| `refund.processed` | Mark payment as `refunded`, decrement revenue |

**Security:**
- Verify webhook signature using Razorpay secret.
- Idempotency: check `payments.id` before inserting.

### 2.5 UI Updates

| Component | Change |
|-----------|--------|
| `ReceiptPanel.tsx` | Replace placeholder with Razorpay Checkout trigger |
| `SupportChapter.tsx` | "Support this session — ₹99" button calls `/api/payment/create` |
| `JourneyTimeline.tsx` | Auto-show revenue events from `payments` table |
| `CurrentStatus.tsx` | Show "Today's revenue: ₹X" from live `site_state` |

### 2.6 Pricing & Commission Reality

| Tier | Price | Gateway Fee (2% + GST) | You Receive |
|------|-------|------------------------|-------------|
| Coffee | ₹99 | ₹2.36 | **₹96.64** |
| Stream | ₹299 | ₹7.06 | **₹291.94** |
| Builder | ₹999/mo | ₹23.58 | **₹975.42** |

**Annual projection (conservative):**
- 50 coffees/month + 10 streams/month + 5 builders = ₹15,435/month
- After fees: ~₹15,050/month = **₹1,80,600/year**
- GST registration required once you cross ₹20L/year turnover.

### 2.7 Effort Estimate

| Task | Time |
|------|------|
| Razorpay account + KYC | 1 day (async, not coding) |
| `/api/payment/create` route | 30 min |
| `/api/payment/verify` route | 30 min |
| Webhook handler + signature verify | 45 min |
| Frontend Checkout integration | 1 hr |
| UPI Intent flow (optional polish) | 1 hr |
| Receipt email / success page | 30 min |
| Testing (test mode, webhooks) | 1 hr |
| **Total coding** | **~5 hours** |
| **Total wall time** | **~2 days** (including KYC) |

---

## Phase 3: Polish — Real-Time & Edge Cases

### 3.1 Live Stream Detection

**Problem:** Cron runs twice daily. If you go live at 10 AM, the site shows `isLive: false` until 6 PM.

**Solution:**

```typescript
// app/api/live-status/route.ts
export async function GET() {
  const cached = await redis.get('live-status'); // or in-memory, 5-min TTL
  if (cached) return Response.json(JSON.parse(cached));

  const live = await youtube.search.list({
    channelId: CHANNEL_ID,
    eventType: 'live',
    part: 'snippet',
  });

  const isLive = live.data.items?.length > 0;
  const result = { isLive, url: isLive ? `https://youtube.com/live/${live.data.items[0].id.videoId}` : null };

  await redis.set('live-status', JSON.stringify(result), 'EX', 300); // 5 min cache
  return Response.json(result);
}
```

**Frontend:** Poll this endpoint every 60 seconds when `isLive === false`, every 10 seconds when `isLive === true`.

### 3.2 Revenue Counter Animation

When a payment succeeds:
1. Webhook updates DB.
2. Server-sent event or polling updates frontend.
3. Number rolls up with a spring animation.

### 3.3 Supporter Wall

New table:

```sql
CREATE TABLE supporters (
    id          TEXT PRIMARY KEY,
    name        TEXT,
    tier_id     TEXT REFERENCES support_tiers(id),
    amount      INTEGER,
    message     TEXT,
    is_public   BOOLEAN DEFAULT TRUE,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

Show on `/support` or `/journey` as a scrolling ticker.

### 3.4 Error Resilience

| Failure | Fallback |
|---------|----------|
| GitHub API rate-limited | Skip sync, retry next cron |
| YouTube API down | Use last-known `isLive` state |
| Razorpay webhook missed | Manual reconciliation via dashboard |
| DB locked (SQLite) | Queue writes, retry with backoff |

### 3.5 Effort Estimate

| Task | Time |
|------|------|
| Live status endpoint + polling | 1 hr |
| Revenue animation | 30 min |
| Supporter wall | 1 hr |
| Error boundaries & fallbacks | 1 hr |
| Monitoring (simple dashboard) | 1 hr |
| **Total** | **~4.5 hours** |

---

## Appendix: API Reference & Schema

### A.1 Internal API Routes

| Route | Method | Auth | Description |
|-------|--------|------|-------------|
| `/api/cron/sync` | POST | `CRON_SECRET` | Full GitHub + YouTube sync |
| `/api/payment/create` | POST | — | Create Razorpay order |
| `/api/payment/verify` | POST | — | Verify payment signature |
| `/api/webhooks/razorpay` | POST | Webhook secret | Handle Razorpay events |
| `/api/live-status` | GET | — | Check if currently streaming |
| `/api/events` | GET | — | Public: list journey events |
| `/api/streams` | GET | — | Public: list stream history |

### A.2 Environment Variables

```bash
# Database
DATABASE_URL="file:./vibe.db"           # SQLite
# DATABASE_URL="postgresql://..."      # Postgres (future)

# GitHub
GITHUB_TOKEN="ghp_xxxxxxxxxxxxxxxx"
GITHUB_REPO="thisisankit27/vibe-through-code"

# YouTube
YOUTUBE_API_KEY="AIzaSyxxxxxxxxxxxxxxxx"
YOUTUBE_CHANNEL_ID="UCxxxxxxxxxxxxxxxx"

# Razorpay
RAZORPAY_KEY_ID="rzp_test_xxxxxxxx"
RAZORPAY_KEY_SECRET="xxxxxxxxxxxxxxxx"
RAZORPAY_WEBHOOK_SECRET="whsec_xxxxxxxx"

# Cron
CRON_SECRET="cron-secret-xxxxxxxx"

# App
NEXT_PUBLIC_SITE_URL="https://vibethroughcode.com"
```

### A.3 Migration Checklist

- [ ] Phase 0: DB schema created, data seeded
- [ ] Phase 0: `add-event.py` retired, `add-event.ts` operational
- [ ] Phase 0: All pages read from DB, no static `.ts` imports
- [ ] Phase 1: GitHub sync tested with closed PRs
- [ ] Phase 1: YouTube sync tested with past streams
- [ ] Phase 1: Cron scheduled and logging to `sync_log`
- [ ] Phase 2: Razorpay KYC approved
- [ ] Phase 2: Test payment successful in live mode (₹1)
- [ ] Phase 2: Webhook verified and updating revenue
- [ ] Phase 2: Receipt email sending
- [ ] Phase 3: Live status accurate within 5 minutes
- [ ] Phase 3: Error handling graceful under all failure modes

### A.4 Total Effort Summary

| Phase | Coding Time | Wall Time | Blockers |
|-------|------------|-----------|----------|
| 0. Database | 3.5 hrs | 1 day | None |
| 1. Automation | 4 hrs | 2 days | YouTube API quota, GitHub token |
| 2. Payments | 5 hrs | 2–3 days | Razorpay KYC (1–2 business days) |
| 3. Polish | 4.5 hrs | 2 days | None |
| **Total** | **~17 hrs** | **~1 week** | **KYC is the only external dependency** |

---

## Notes

- **Start with Phase 0 + Phase 2A (Razorpay)** in parallel. Payments are the revenue lever; automation is the time-saver.
- **Defer Stripe** until you have >10% international traffic.
- **SQLite is fine** until you need concurrent writes (multiple simultaneous payments). Razorpay webhooks are fast but sequential enough for SQLite. If payments spike, migrate to Postgres.
- **The `add-event.py` script** should be preserved as `add-event-legacy.py` for emergency manual overrides.

---

*Document version: 1.0*  
*Next review: After Phase 0 completion*
