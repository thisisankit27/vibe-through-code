export interface SupportTier {
    id: string;
    title: string;
    price: number;
    currency: string;
    frequency?: string;
    label: string;
    description: string;
    narrative: string[];
}

export interface BuilderBenefit {
    id: string;
    label: string;
    description: string;
}

export interface SessionManifest {
    coffee: number;
    stream: number;
    builders: number;
}

export const supportTiers: SupportTier[] = [
    {
        id: "coffee",
        title: "Support a Coffee",
        price: 99,
        currency: "₹",
        label: "Fuel a session",
        description: "Fuel one of the building sessions.",
        narrative: [
            "Three hours of uninterrupted architecture.",
            "One bug fixed. One stream kept alive.",
            "Your coffee becomes commits.",
        ],
    },
    {
        id: "stream",
        title: "Support Today's Stream",
        price: 299,
        currency: "₹",
        label: "Keep the camera rolling",
        description: "Help keep today's livestream running.",
        narrative: [
            "Today's session: refactoring the auth layer.",
            "312 people watching. 47 commits.",
            "Your support keeps the camera rolling.",
        ],
    },
    {
        id: "builder",
        title: "Become a Builder",
        price: 999,
        currency: "₹",
        frequency: "/month",
        label: "Build the journey together",
        description: "You are not subscribing. You are architecting.",
        narrative: [
            "Vote on the next project.",
            "Join the design review.",
            "Build the blueprint.",
        ],
    },
];

export const builderBenefits: BuilderBenefit[] = [
    { id: "priority", label: "PRIORITY QUEUE", description: "Early project access" },
    { id: "comm", label: "COMM CHANNEL", description: "Builder community / Discord" },
    { id: "review", label: "DESIGN REVIEW", description: "Monthly architecture sessions" },
    { id: "pipeline", label: "FEATURE PIPELINE", description: "Vote on upcoming projects" },
];

export const sessionManifest: SessionManifest = {
    coffee: 12,
    stream: 3,
    builders: 1,
};