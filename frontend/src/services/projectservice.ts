import axios from "axios";
import type { Project, ProjectType } from "../types/project";
import { API_ROUTES } from "../constants/routes";
import { ERRORS } from "../constants/errors";
interface GetProjectParams {
    type: ProjectType
}

export async function getProjects({ type }: GetProjectParams): Promise<Project[]> {
    try {
        const response = await axios.get<Project[]>(import.meta.env.VITE_API_URL + API_ROUTES.PROJECTS.ROOT, {
            params: { type }
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message ?? error.message ?? ERRORS.PROJECTS.RETRIEVAL;
            throw new Error(message);
        }
        throw new Error(ERRORS.UNEXPECTED);
    }
}