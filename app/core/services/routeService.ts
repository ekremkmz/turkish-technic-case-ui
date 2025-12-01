import { api } from "../utils/api";
import type { RouteResponse } from "../../features/routes/types";

export const getRoutes = async (origin?: string, destination?: string, day?: number): Promise<RouteResponse[]> => {
    const params = new URLSearchParams();
    if (origin) params.append("from", origin);
    if (destination) params.append("to", destination);
    if (day) params.append("day", day.toString());

    return api<RouteResponse[]>(`/v1/route/search?${params.toString()}`);
};
