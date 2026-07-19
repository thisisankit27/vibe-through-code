import { JourneyTimelineProps } from "./types";

export const demoJourneyData: JourneyTimelineProps = {
  status: {
    label: "Currently Building",
    message: "Refactoring the auth layer to support OAuth 2.0 + PKCE. Streaming later today.",
    isLive: false,
    meta: [
      { label: "Streak", value: "47 days" },
      { label: "Commits today", value: "12" },
      { label: "Revenue", value: "$847" },
    ],
  },
  events: [
    {
      id: "evt-001",
      type: "revenue",
      title: "First $1,000 Month",
      description:
        "Crossed $1,000 MRR for the first time. 87% from Stripe subscriptions, 13% from one-time template sales.",
      date: "2026-07-15",
      time: "09:14",
      href: "/blog/first-1k-month",
      badge: "Milestone",
      meta: [
        { label: "MRR", value: "$1,024" },
        { label: "Customers", value: "34" },
        { label: "Churn", value: "0%" },
      ],
    },
    {
      id: "evt-002",
      type: "pr_merge",
      title: "Merge: Real-time sync engine",
      description:
        "Shipped the WebSocket-based sync layer. Eliminates 400ms polling latency on the dashboard. 1,200 lines changed across 14 files.",
      date: "2026-07-12",
      time: "18:42",
      href: "https://github.com/vibethroughcode/vtc/pull/89",
      meta: [
        { label: "Files", value: "14" },
        { label: "+/-", value: "+1,180 / -87" },
        { label: "Reviewers", value: "2" },
      ],
    },
    {
      id: "evt-003",
      type: "livestream",
      title: "Live: Building the billing portal",
      description:
        "4-hour build session. Implemented Stripe Customer Portal integration, webhook handlers, and invoice PDF generation. Peak concurrent viewers: 312.",
      date: "2026-07-10",
      time: "14:00",
      href: "https://youtube.com/watch?v=abc123",
      meta: [
        { label: "Duration", value: "4h 12m" },
        { label: "Viewers", value: "312" },
        { label: "Commits", value: "8" },
      ],
    },
    {
      id: "evt-004",
      type: "project_start",
      title: "Project: VTC Analytics",
      description:
        "Kicking off a lightweight analytics module. Goal: understand which features drive revenue without shipping a bloated dashboard.",
      date: "2026-07-08",
      href: "/projects/analytics",
      meta: [
        { label: "Stack", value: "ClickHouse + Next.js" },
        { label: "ETA", value: "3 weeks" },
      ],
    },
    {
      id: "evt-005",
      type: "website_launch",
      title: "vibethroughcode.com goes live",
      description:
        "Public launch of the site. Dark theme, emerald accent, no analytics, no cookies. Just a journal and a mission.",
      date: "2026-07-01",
      badge: "Launch",
      meta: [
        { label: "Stack", value: "Next.js 15" },
        { label: "Deploy", value: "Vercel" },
      ],
    },
  ],
  cta: {
    label: "Explore the full Project Catalog",
    href: "/projects",
  },
};
