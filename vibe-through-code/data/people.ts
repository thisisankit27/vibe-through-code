export interface Person {
    id: string;
    name: string;
    role: string;
    bio: string;
    avatar: string;
    github?: string;
    linkedin?: string;
    website?: string;
    isFounder: boolean;
}

export const people: Person[] = [
    {
        id: "ankit",
        name: "Ankit Srivastava",
        role: "Human & Engineer",
        bio: "Building software in public, one livestream at a time. Passionate about clean architecture, responsible AI, and documenting every step of the journey from $0 to $1,000,000.",
        avatar: "/images/avatar-ankit.jpeg",
        github: "https://github.com/thisisankit27",
        linkedin: "https://linkedin.com/in/thisisankit27",
        website: "https://vibethroughcode.com",
        isFounder: true,
    },
    {
        id: "contributor-1",
        name: "KIMI K3",
        role: "Frontend Engineer",
        bio: "Building accessible UI components and contributing to the design system.",
        avatar: "/images/avatar-kimi-k3.png",
        website: "https://www.kimi.com/",
        isFounder: false,
    },
];