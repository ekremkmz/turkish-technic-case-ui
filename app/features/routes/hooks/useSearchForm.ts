import { useState, useEffect } from "react";
import { getLocationsList } from "../../../core/services/locationService";
import type { LocationResponse } from "../../locations/types";
import { DayOfWeek } from "../../../core/types/DayOfWeek";

export function useSearchForm(onSearch: (origin: string, destination: string, day: number) => void) {
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [date, setDate] = useState("");
    const [locations, setLocations] = useState<LocationResponse[]>([]);

    useEffect(() => {
        getLocationsList().then(locs => {
            setLocations(locs);
            if (locs.length > 0) {
                setOrigin(locs[0].code);
                setDestination(locs[0].code);
            }
        });
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (origin && destination && date) {
            const selectedDate = new Date(date);
            const day = selectedDate.getDay() as DayOfWeek; // 0 for Sunday, matches DayOfWeek.SUNDAY
            onSearch(origin, destination, day);
        }
    };

    return {
        origin,
        setOrigin,
        destination,
        setDestination,
        date,
        setDate,
        locations,
        handleSubmit,
    };
}
