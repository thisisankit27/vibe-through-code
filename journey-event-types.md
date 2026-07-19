# Journey Event Types — Reference Guide

This document lists every event type that can appear on the Journey timeline, when to use it, and what data to update.

---

## Event Type Catalog

### 1. `livestream`
**When:** Every time you go live on YouTube (or any platform).

**What to update:**
- `data/streams.ts` → prepend to `streamHistory[]`
- `data/streams.ts` → update `latestStream`
- `data/journey.ts` → increment `totalStreams`
- `data/journey.ts` → prepend event to `journey.events[]`

**Meta fields:**
```ts
meta: [
  { label: "Day", value: "5" },
  { label: "Duration", value: "4h 12m" },
  { label: "Viewers", value: "312" },
  { label: "Commits", value: "8" },
  { label: "Revenue", value: "$0" },
]
```

**Badge:** Usually none. Use `"LIVE"` only if the event represents a currently-active stream.

---

### 2. `pr_merge`
**When:** A significant pull request is merged to `main`. Not every PR — only the ones that ship meaningful features, refactors, or fixes.

**What to update:**
- `data/journey.ts` → increment `totalCommits`
- `data/journey.ts` → prepend event to `journey.events[]`

**Meta fields:**
```ts
meta: [
  { label: "Files", value: "14" },
  { label: "+/-", value: "+1,180 / -87" },
  { label: "Reviewers", value: "2" },
  { label: "PR", value: "#89" },
]
```

**href:** Link to the GitHub PR.

---

### 3. `project_start`
**When:** You begin a new project or major initiative.

**What to update:**
- `data/projects.ts` → add new project to `projects[]`
- `data/journey.ts` → prepend event to `journey.events[]`

**Meta fields:**
```ts
meta: [
  { label: "Stack", value: "Next.js + Tailwind" },
  { label: "Repo", value: "GitHub" },
  { label: "ETA", value: "3 weeks" },
]
```

---

### 4. `project_complete`
**When:** A project ships to production, reaches MVP, or is officially marked done.

**What to update:**
- `data/projects.ts` → set `completedOn` date on the project
- `data/projects.ts` → update `project.status` to `"completed"`
- `data/journey.ts` → prepend event to `journey.events[]`

**Meta fields:**
```ts
meta: [
  { label: "Duration", value: "3 weeks" },
  { label: "Commits", value: "142" },
  { label: "Status", value: "Shipped" },
]
```

**Badge:** `"Shipped"`

---

### 5. `website_launch`
**When:** A site, subdomain, or significant page goes live for the first time.

**What to update:**
- `data/journey.ts` → prepend event to `journey.events[]`

**Meta fields:**
```ts
meta: [
  { label: "Stack", value: "Next.js 15" },
  { label: "Deploy", value: "Vercel" },
  { label: "Domain", value: "vibethroughcode.com" },
]
```

**Badge:** `"Launch"`

---

### 6. `revenue`
**When:** You hit a revenue milestone — first dollar, first $100, $1K MRR, $10K MRR, etc.

**What to update:**
- `data/journey.ts` → update `revenue` to the new total
- `data/journey.ts` → prepend event to `journey.events[]`

**Meta fields:**
```ts
meta: [
  { label: "MRR", value: "$1,024" },
  { label: "Customers", value: "34" },
  { label: "Churn", value: "0%" },
  { label: "Source", value: "Stripe" },
]
```

**Badge:** `"Milestone"` or `"First Dollar"` or `"$1K MRR"`

---

### 7. `milestone`
**When:** A generic milestone that doesn't fit other categories — 100 days of streaming, 1,000 commits, first 100 users, etc.

**What to update:**
- `data/journey.ts` → prepend event to `journey.events[]`

**Meta fields:**
```ts
meta: [
  { label: "Metric", value: "100 days" },
  { label: "Started", value: "Jul 15, 2026" },
  { label: "Reached", value: "Oct 23, 2026" },
]
```

**Badge:** The milestone name, e.g. `"100 Days"`, `"1K Commits"`

---

### 8. `community`
**When:** A community-related achievement — featured on HN, hit a follower milestone, Discord grows past a threshold, someone builds something with your code.

**What to update:**
- `data/journey.ts` → prepend event to `journey.events[]`

**Meta fields:**
```ts
meta: [
  { label: "Platform", value: "Hacker News" },
  { label: "Upvotes", value: "247" },
  { label: "Comments", value: "89" },
]
```

---

### 9. `blog_post`
**When:** You publish a significant blog post, article, or written reflection about the journey.

**What to update:**
- `data/journey.ts` → prepend event to `journey.events[]`

**Meta fields:**
```ts
meta: [
  { label: "Read time", value: "8 min" },
  { label: "Topic", value: "Auth Architecture" },
  { label: "Views", value: "1,240" },
]
```

**href:** Link to the blog post.

---

### 10. `bug_fix`
**When:** You fix a particularly nasty or interesting bug that taught you something. Not every bug — only the ones worth documenting.

**What to update:**
- `data/journey.ts` → prepend event to `journey.events[]`

**Meta fields:**
```ts
meta: [
  { label: "Severity", value: "Critical" },
  { label: "Root cause", value: "Race condition" },
  { label: "Time to fix", value: "6 hours" },
]
```

---

### 11. `architecture_decision`
**When:** You make a significant technical decision that shapes the project — choosing a database, switching frameworks, adopting a new pattern.

**What to update:**
- `data/journey.ts` → prepend event to `journey.events[]`

**Meta fields:**
```ts
meta: [
  { label: "Decision", value: "Switch to PostgreSQL" },
  { label: "From", value: "SQLite" },
  { label: "Reason", value: "Concurrent writes" },
]
```

---

### 12. `learning_moment`
**When:** You learn something significant that changes how you build — a new pattern, a hard lesson, a paradigm shift.

**What to update:**
- `data/journey.ts` → prepend event to `journey.events[]`

**Meta fields:**
```ts
meta: [
  { label: "Topic", value: "Server Components" },
  { label: "Source", value: "Next.js docs" },
  { label: "Impact", value: "-40% bundle size" },
]
```

---

### 13. `deployment`
**When:** A major deployment — first prod deploy, migration to new infrastructure, CDN switch, etc.

**What to update:**
- `data/journey.ts` → prepend event to `journey.events[]`

**Meta fields:**
```ts
meta: [
  { label: "Platform", value: "Vercel" },
  { label: "Region", value: "Edge" },
  { label: "Downtime", value: "0s" },
]
```

---

### 14. `partnership`
**When:** You collaborate with another builder, get a sponsorship, or form a business partnership.

**What to update:**
- `data/journey.ts` → prepend event to `journey.events[]`

**Meta fields:**
```ts
meta: [
  { label: "Partner", value: "Stripe" },
  { label: "Type", value: "Integration" },
  { label: "Value", value: "$5K credits" },
]
```

---

### 15. `first_sale`
**When:** The very first paid transaction. Distinct from `revenue` milestones — this is the emotional moment.

**What to update:**
- `data/journey.ts` → update `revenue`
- `data/journey.ts` → prepend event to `journey.events[]`

**Meta fields:**
```ts
meta: [
  { label: "Amount", value: "$29" },
  { label: "Product", value: "Pro Template" },
  { label: "Customer", value: "Anonymous" },
  { label: "Time", value: "Day 23" },
]
```

**Badge:** `"First Dollar"`

---

## Quick Decision Tree

```
Did you go live?                    → livestream
Did you merge a significant PR?     → pr_merge
Did you start a new project?        → project_start
Did you ship a project?             → project_complete
Did a site/page go live?            → website_launch
Did you hit a revenue number?       → revenue
Did you make your first sale ever?  → first_sale
Did you fix a notable bug?          → bug_fix
Did you publish a blog post?        → blog_post
Did you make a big tech decision?   → architecture_decision
Did you learn something worth sharing? → learning_moment
Did you deploy to prod?             → deployment
Did the community do something cool? → community
Did you hit a generic milestone?    → milestone
Did you partner with someone?       → partnership
```

---

## Daily Workflow After a Stream

1. **Update `data/streams.ts`**
   - Prepend new entry to `streamHistory[]`
   - Update `latestStream`

2. **Update `data/journey.ts`**
   - Increment `currentDay`
   - Update `currentGoal` / `currentMilestone`
   - Update `revenue`, `totalCommits`, `totalStreams`
   - Prepend new event(s) to `journey.events[]`

3. **Update `data/projects.ts`** (if applicable)
   - Add milestones to active project
   - Update `completedOn` if project shipped

4. **Build and verify**
   ```bash
   npm run dev
   ```
