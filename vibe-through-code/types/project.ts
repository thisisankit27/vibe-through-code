export type ProjectStatus = "active" | "completed" | "planned" | "paused";

export interface Project {
    id: string;
    slug: string;

    title: string;
    description: string;

    status: ProjectStatus;

    repository: string;
    /** Live site or download page. Empty when the project has none. */
    website: string;

    technologies: string[];

    startedOn: string;
}