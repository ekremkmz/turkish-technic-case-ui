import { useState, useEffect } from "react";
import { getTransportationSchedulesList, deleteTransportationSchedule } from "../../../core/services/transportationScheduleService";
import { getLocationsList } from "../../../core/services/locationService";
import type { TransportationScheduleResponse } from "../types";
import type { LocationResponse } from "../../locations/types";

export function useTransportationScheduleList() {
    const [schedules, setSchedules] = useState<TransportationScheduleResponse[]>([]);
    const [locations, setLocations] = useState<LocationResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [schedulesData, locationsData] = await Promise.all([
                getTransportationSchedulesList(),
                getLocationsList()
            ]);
            setSchedules(schedulesData);
            setLocations(locationsData);
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);



    const deleteSchedule = async (id: number) => {
        if (!confirm("Are you sure you want to delete this schedule?")) return;

        try {
            await deleteTransportationSchedule(id);
            setSchedules(prev => prev.filter(s => s.id !== id));
        } catch (error) {
            console.error("Failed to delete schedule", error);
        }
    };

    return {
        schedules,
        locations,
        isLoading,
        deleteSchedule,
    };
}
