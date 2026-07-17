export type ProjectStatus = "active" | "completed" | "planned";

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