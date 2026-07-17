import { Project } from "@/types/project";

export const projects: Project[] = [
    {
        id: "vibe-through-code",

        slug: "vibe-through-code",

        title: "Vibe Through Code Platform",

        description:
            "Building the public platform that documents every project, livestream, and engineering lesson on the journey to $1,000,000.",

        status: "active",

        repository: "https://github.com/thisisankit27/vibe-through-code",

        technologies: [
            "Next.js",
            "TypeScript",
            "Tailwind CSS",
            "shadcn/ui",
        ],

        startedOn: "July 2026",
    },
];

export const currentProject = projects.find(
    (project) => project.status === "active"
);