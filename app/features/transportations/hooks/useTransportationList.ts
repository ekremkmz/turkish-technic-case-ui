import { useState, useEffect } from "react";
import { getTransportationsList, deleteTransportation } from "../../../core/services/transportationService";
import { getLocationsList } from "../../../core/services/locationService";
import type { TransportationResponse } from "../types";
import type { LocationResponse } from "../../locations/types";

export function useTransportationList() {
    const [transportations, setTransportations] = useState<TransportationResponse[]>([]);
    const [locations, setLocations] = useState<LocationResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchTransportations = async () => {
        try {
            const data = await getTransportationsList();
            setTransportations(data);
        } catch (error) {
            console.error("Failed to fetch transportations", error);
        }
    };

    useEffect(() => {
        const init = async () => {
            setIsLoading(true);
            try {
                const [tData, lData] = await Promise.all([
                    getTransportationsList(),
                    getLocationsList()
                ]);
                setTransportations(tData);
                setLocations(lData);
            } catch (error) {
                console.error("Failed to fetch data", error);
            } finally {
                setIsLoading(false);
            }
        };

        init();
    }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this transportation?")) {
            await deleteTransportation(id);
            await fetchTransportations();
        }
    };

    return {
        transportations,
        locations,
        isLoading,
        handleDelete,
    };
}
