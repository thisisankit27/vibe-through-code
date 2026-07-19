export const latestStream = {
    title: "Day 5 of vibe coding until i make $1,000,000 | Revenue: $0",
    url: "https://youtube.com/live/R8ufSlVFC4Y",
};

// ── NEW ──────────────────────────────────────────────────────
export const streamHistory = [
    {
        id: "stream-005",
        day: 5,
        title: "Day 5 of vibe coding until I make $1,000,000 | Revenue: $0",
        url: "https://youtube.com/live/R8ufSlVFC4Y",
        date: "2026-07-19",
        duration: "4h 00m",
        viewers: 0,
        revenue: 0,
        commits: 12,
        focus: "Centralize website content",
    },
    {
        id: "stream-004",
        day: 4,
        title: "Day 4 of vibe coding until I make $1,000,000 | Revenue: $0",
        url: "https://youtube.com/live/...", // update me
        date: "2026-07-18",
        duration: "3h 45m",
        viewers: 280,
        revenue: 0,
        commits: 9,
        focus: "Design the Journey timeline",
    },
    {
        id: "stream-003",
        day: 3,
        title: "Day 3 of vibe coding until I make $1,000,000 | Revenue: $0",
        url: "https://youtube.com/live/...", // update me
        date: "2026-07-17",
        duration: "4h 10m",
        viewers: 310,
        revenue: 0,
        commits: 11,
        focus: "Build the Projects page",
    },
    {
        id: "stream-002",
        day: 2,
        title: "Day 2 of vibe coding until I make $1,000,000 | Revenue: $0",
        url: "https://youtube.com/live/...", // update me
        date: "2026-07-16",
        duration: "3h 30m",
        viewers: 250,
        revenue: 0,
        commits: 8,
        focus: "Set up Next.js + Tailwind + shadcn/ui",
    },
    {
        id: "stream-001",
        day: 1,
        title: "Day 1 of vibe coding until I make $1,000,000 | Revenue: $0",
        url: "https://youtube.com/live/...", // update me
        date: "2026-07-15",
        duration: "5h 00m",
        viewers: 400,
        revenue: 0,
        commits: 7,
        focus: "Launch vibethroughcode.com",
    },
];

export const streamStats = {
    totalStreams: streamHistory.length,
    totalHours: streamHistory.reduce((acc, s) => {
        const [h, m] = s.duration.replace("h", "").replace("m", "").split(" ").map(Number);
        return acc + h + m / 60;
    }, 0),
    totalViewers: streamHistory.reduce((acc, s) => acc + s.viewers, 0),
    totalCommits: streamHistory.reduce((acc, s) => acc + s.commits, 0),
    avgViewers: Math.round(streamHistory.reduce((acc, s) => acc + s.viewers, 0) / streamHistory.length),
};

export const nextStream = {
    scheduled: false,
    date: null as string | null,
    title: null as string | null,
};