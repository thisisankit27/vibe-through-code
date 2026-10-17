export type ProjectStatus = "active" | "completed" | "planned" | "paused";

export interface Project {
    id: string;
    slug: string;

    title: string;
    description: string;

    status: ProjectStatus;

    repository: string;

    technologies: string[];

    startedOn: string;
}