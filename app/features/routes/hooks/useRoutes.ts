import { useState, useEffect, useCallback } from "react";
import { getRoutes } from "../../../core/services/routeService";
import type { RouteResponse } from "../types";

export function useRoutes() {
    const [routes, setRoutes] = useState<RouteResponse[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const searchRoutes = useCallback(async (origin: string, destination: string, day: number) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getRoutes(origin, destination, day);
            setRoutes(data);
        } catch (err) {
            setError("Failed to fetch routes. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Initial load (optional, or we can wait for user search)
    // useEffect(() => {
    //   searchRoutes("", "");
    // }, [searchRoutes]);

    return {
        routes,
        isLoading,
        error,
        searchRoutes,
    };
}
