export type ProjectType = "swe" | "ai-ml" | "cs"

export interface Project {
    id: number;
    title: string;
    description: string;
    href: string;
    date: string;
    authors?: string[];
    tags?: string[];
    category: string;
}
