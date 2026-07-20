export const journey = {
    currentDay: 8,
    currentGoal: "Build the Vibe Through Code platform.",
    currentMilestone: "Centralize website content.",

    // ── NEW ──────────────────────────────────────────────────
    startDate: "2026-07-13",
    revenue: 0,
    streak: 8,
    totalCommits: 25,
    totalStreams: 8,
    isLive: false,

    // Events feed the <JourneyTimeline /> directly.
    // Prepend new events at the top (newest first).
    events: [
        {
            id: "evt-20260720-pr_-457",
            type: "pr_merge" as const,
            title: "feat: About Page of Vibe Through Code Platform",
            description:
                "Shipped the About page. Data-driven cards with emerald glow, hover lift, and status badges.",
            date: "2026-07-20",
            time: "21:46",
            href: "https://github.com/thisisankit27/vibe-through-code/pull/9",
            meta: [
                { label: "Files", value: "7" },
                { label: "+/-", value: "+273 / -0" },
                { label: "Commits", value: "3" },
            ]
        },
        {
            id: "evt-20260720-liv-789",
            type: "livestream" as const,
            title: "KIMI K3 AI | Day 8 of vibe coding with Until I Make $1,000,000",
            description:
                "Centralizing all website content into a single data layer. Refactoring the About page to consume real static data.",
            date: "2026-07-20",
            time: "19:10",
            href: "https://youtube.com/live/a_QMcfKXG6Y",
            badge: "Ended",
            meta: [
                { label: "Day", value: "8" },
                { label: "Revenue", value: "$0" },
                { label: "Commits", value: "3" },
            ]
        },
        {
            id: "evt-20260720-blo-432",
            type: "blog_post" as const,
            title: "Thinking Like a Senior Engineer",
            description:
                "Lessons learned while designing the Knowledge Assistant project.",
            date: "2026-07-20",
            time: "03:50",
            href: "https://archive.vibethroughcode.com/stage-1/Engineering%20Mindset/week-1-AI-Assistant/#pr-3-discussion-chunking-engine",
            meta: [
                { label: "Read Time", value: "8min" },
                { label: "Topic", value: "Engineering Mindset" },
                { label: "Stage", value: "Stage 1, Week 1, PR 4" },
            ]
        },
        {
            id: "evt-008",
            type: "pr_merge" as const,
            title: "Merge: Journey page with real data",
            description:
                "Shipped the Journey page. Data-driven cards with emerald glow, hover lift, and status badges. All project metadata now lives in /data/journey.ts.",
            date: "2026-07-19",
            time: "23:47",
            href: "https://github.com/thisisankit27/vibe-through-code/pull/6",
            meta: [
                { label: "Files", value: "12" },
                { label: "+/-", value: "+1,171 / -4" },
                { label: "Reviewers", value: "0" },
            ],
        },
        {
            id: "evt-007",
            type: "livestream" as const,
            title: "KIMI K3 AI | Day 7 of vibe coding with Until I Make $1,000,000",
            description:
                "Centralizing all website content into a single data layer. Refactoring the Journey page to consume real static data.",
            date: "2026-07-19",
            time: "21:00",
            href: "https://youtube.com/live/PaWCxpe1USQ",
            meta: [
                { label: "Day", value: "7" },
                { label: "Revenue", value: "$0" },
                { label: "Commits", value: "3" },
            ],
        },
        {
            id: "evt-006",
            type: "pr_merge" as const,
            title: "Merge: Journey page with real data",
            description:
                "Shipped the Journey page. Data-driven cards with emerald glow, hover lift, and status badges. All project metadata now lives in /data/journey.ts.",
            date: "2026-07-19",
            time: "23:47",
            href: "https://github.com/thisisankit27/vibe-through-code/pull/5",
            meta: [
                { label: "Files", value: "3" },
                { label: "+/-", value: "+120 / -0" },
                { label: "Reviewers", value: "0" },
            ],
        },
        {
            id: "evt-005",
            type: "livestream" as const,
            title: "KIMI K3 AI | Day 6 of vibe coding with Until I Make $1,000,000",
            description:
                "Centralizing all website content into a single data layer. Refactoring the Project Catalog page to consume real static data.",
            date: "2026-07-18",
            time: "20:00",
            href: "https://youtube.com/live/Mn1gB_S8RgA",
            meta: [
                { label: "Day", value: "6" },
                { label: "Revenue", value: "$0" },
                { label: "Commits", value: "3" },
            ],
        },
        {
            id: "evt-004",
            type: "livestream" as const,
            title: "Day 5 of vibe coding until I make $1,000,000",
            description:
                "Centralizing all website content into a single data layer. Refactoring the Journey page to consume real static data instead of hard-coded demo props.",
            date: "2026-07-19",
            time: "20:00",
            href: "https://youtube.com/live/R8ufSlVFC4Y",
            meta: [
                { label: "Day", value: "5" },
                { label: "Revenue", value: "$0" },
                { label: "Commits", value: "12" },
            ],
        },
        {
            id: "evt-003",
            type: "pr_merge" as const,
            title: "Merge: Projects page with real data",
            description:
                "Shipped the Projects catalog page. Data-driven cards with emerald glow, hover lift, and status badges. All project metadata now lives in /data/projects.ts.",
            date: "2026-07-18",
            time: "17:30",
            href: "https://github.com/thisisankit27/vibe-through-code/pull/4",
            meta: [
                { label: "Files", value: "8" },
                { label: "+/-", value: "+420 / -31" },
                { label: "Reviewers", value: "1" },
            ],
        },
        {
            id: "evt-002",
            type: "livestream" as const,
            title: "Day 4: Designing the Journey timeline",
            description:
                "Pair-programmed the Journey page UX with an AI product designer. Settled on a vertical timeline with type-specific nodes, meta grids, and an emerald glow treatment.",
            date: "2026-07-18",
            time: "14:00",
            href: "https://youtube.com/live/...", // update me
            meta: [
                { label: "Day", value: "4" },
                { label: "Revenue", value: "$0" },
                { label: "Commits", value: "9" },
            ],
        },
        {
            id: "evt-001",
            type: "website_launch" as const,
            title: "vibethroughcode.com goes live",
            description:
                "Public launch of the site. Dark theme, emerald accent, no analytics, no cookies. Just a journal and a mission.",
            date: "2026-07-15",
            badge: "Launch",
            meta: [
                { label: "Stack", value: "Next.js 15" },
                { label: "Deploy", value: "Vercel" },
            ],
        },
        {
            id: "evt-000",
            type: "project_start" as const,
            title: "Project: Vibe Through Code Platform",
            description:
                "Kicking off the public platform that documents every project, livestream, and engineering lesson on the journey to $1,000,000.",
            date: "2026-07-15",
            href: "/projects/vibe-through-code",
            meta: [
                { label: "Stack", value: "Next.js + Tailwind" },
                { label: "Repo", value: "GitHub" },
            ],
        },
    ],
};