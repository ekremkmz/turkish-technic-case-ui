import { useState, useEffect } from "react";
import { getLocationsList, deleteLocation } from "../../../core/services/locationService";
import type { LocationResponse } from "../types";

export function useLocationList() {
    const [locations, setLocations] = useState<LocationResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchLocations = async () => {
        setIsLoading(true);
        try {
            const data = await getLocationsList();
            setLocations(data);
        } catch (error) {
            console.error("Failed to fetch locations", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLocations();
    }, []);

    const handleDelete = async (code: string) => {
        if (window.confirm("Are you sure you want to delete this location?")) {
            await deleteLocation(code);
            fetchLocations();
        }
    };

    return {
        locations,
        isLoading,
        handleDelete,
    };
}
