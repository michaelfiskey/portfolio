import axios from "axios";
import type { Project, ProjectType } from "../types/project";

interface GetProjectParams {
    type: ProjectType
}

export async function getProjects({ type }: GetProjectParams): Promise<Project[]> {
    try {
        const response = await axios.get<Project[]>(import.meta.env.VITE_API_URL + "/project", {
            params: { type }
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message ?? error.message ?? "There was an error retrieving projects.";
            throw new Error(message);
        }
        throw new Error("An unexpected error occurred.");
    }
}