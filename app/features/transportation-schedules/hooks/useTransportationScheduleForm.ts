import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { createTransportationSchedule } from "../../../core/services/transportationScheduleService";
import { getTransportationsList } from "../../../core/services/transportationService";
import { getLocationsList } from "../../../core/services/locationService";
import { DayOfWeek } from "../../../core/types/DayOfWeek";
import type { CreateTransportationScheduleDto } from "../types";
import type { TransportationResponse } from "../../transportations/types";
import type { LocationResponse } from "../../locations/types";

export function useTransportationScheduleForm() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [transportations, setTransportations] = useState<TransportationResponse[]>([]);
    const [locations, setLocations] = useState<LocationResponse[]>([]);
    const [formData, setFormData] = useState<CreateTransportationScheduleDto>({
        transportationId: 0,
        day: DayOfWeek.MONDAY,
    });

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const [tData, lData] = await Promise.all([
                    getTransportationsList(),
                    getLocationsList()
                ]);
                setTransportations(tData);
                setLocations(lData);
                if (tData.length > 0) {
                    setFormData(prev => ({ ...prev, transportationId: tData[0].id }));
                }
            } catch (error) {
                console.error("Failed to load data", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await createTransportationSchedule(formData);
            navigate("/transportation-schedules");
        } catch (error) {
            console.error("Failed to create schedule", error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateField = (field: keyof CreateTransportationScheduleDto, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return {
        formData,
        isLoading,
        transportations,
        locations,
        handleSubmit,
        updateField,
        navigate,
    };
}
