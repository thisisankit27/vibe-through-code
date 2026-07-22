Here's your project operations guide — save it as `OPERATIONS.md` in your repo root:

```markdown
# Vibe Through Code — Operations Guide

Quick reference for environment variables, dependencies, and secret rotation.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS 4 |
| UI | shadcn/ui + Base UI |
| Database | Neon PostgreSQL (serverless) |
| DB Client | `@neondatabase/serverless` |
| Icons | Lucide React |
| Fonts | System / Geist (via Next.js) |

---

## Dependencies

### Production
```bash
npm install next react react-dom tailwindcss @tailwindcss/postcss
npm install @neondatabase/serverless
npm install class-variance-authority clsx tailwind-merge lucide-react
```

### Development
```bash
npm install -D typescript @types/node @types/react @types/react-dom
npm install -D eslint eslint-config-next
npm install -D dotenv tsx
```

---

## Environment Variables

### Local Development (`.env.local`)

Create this file in your project root. **Never commit it.**

```bash
# ── Database ───────────────────────────────────────────────
# Neon PostgreSQL connection string
DATABASE_URL=

# ── Admin Auth ─────────────────────────────────────────────
# Basic Auth password for /admin
ADMIN_PASSWORD=
```

### Production (Vercel Dashboard)

Go to **Project → Settings → Environment Variables** and add:

| Name | Value | Environment |
|------|-------|-------------|
| `DATABASE_URL` | `postgresql://...` | Production |
| `ADMIN_PASSWORD` | `your-very-strong-password` | Production |

**Do NOT add `DATABASE_URL` to Preview or Development** in Vercel unless you want preview deployments hitting your production database.

---

## Database

### Provider
[Neon](https://neon.tech) — PostgreSQL, free tier (500MB).

### Region
AWS Asia Pacific (Singapore) — closest to India.

### Schema Management
There is no ORM migration tool. Schema changes are applied via Neon's **SQL Editor** in the web dashboard.

### Tables
- `events` — Journey timeline entries
- `streams` — Stream history
- `people` — Team / contributors
- `projects` — Project catalog
- `support_tiers` — Support pricing tiers
- `site_state` — Scalar values (current day, streak, revenue, etc.)
- `payments` — Payment records (future)
- `sync_log` — Automation audit log (future)

### Seeding
```bash
npx tsx scripts/seed.ts
```

Requires `DATABASE_URL` in `.env.local` or shell environment.

---

## Admin Panel

### URL
`/admin`

### Password Rotation
1. Update `ADMIN_PASSWORD` in Vercel dashboard
2. Redeploy (or wait for next commit)

---

## Secret Rotation Checklist

### Rotate Database URL
1. Go to Neon dashboard → Project Settings → Reset password
2. Copy new connection string
3. Update `DATABASE_URL` in Vercel dashboard
4. Update `DATABASE_URL` in your local `.env.local`
5. Redeploy

### Rotate Admin Password
1. Update `ADMIN_PASSWORD` in Vercel dashboard
2. Redeploy
3. Close all browser windows to clear cached Basic Auth

### Rotate Neon API Token (if using CLI)
1. Neon dashboard → Tokens → Revoke old token
2. Create new token
3. Update wherever used

---

## Quick Commands

```bash
# Dev server
npm run dev

# Lint
npm run lint

# Seed database
npx tsx scripts/seed.ts

# Type check
npx tsc --noEmit
```

---

## File Locations

| File | Purpose |
|------|---------|
| `.env.local` | Local secrets (gitignored) |
| `lib/db.ts` | Database client singleton |
| `app/admin/actions.ts` | Admin CRUD server actions |
| `app/middleware.ts` | Basic Auth guard |
| `scripts/seed.ts` | One-time data seeding |
| `data/*.ts` | Static data sources (legacy, being phased out) |

---

## Support

- Neon docs: https://neon.tech/docs
- Next.js docs: https://nextjs.org/docs
- `@neondatabase/serverless`: https://github.com/neondatabase/serverless
```

---