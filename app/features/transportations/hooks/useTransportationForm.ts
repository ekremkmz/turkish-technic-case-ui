import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { createTransportation, getTransportation, updateTransportation } from "../../../core/services/transportationService";
import { getLocationsList } from "../../../core/services/locationService";
import { TransportationType, type CreateTransportationDto } from "../types";

export function useTransportationForm(id?: string) {
    const navigate = useNavigate();
    const isEditing = !!id;
    const [isLoading, setIsLoading] = useState(false);
    const [locations, setLocations] = useState<{ value: string; label: string }[]>([]);
    const [formData, setFormData] = useState<CreateTransportationDto>({
        type: TransportationType.BUS,
        originLocationCode: "",
        destinationLocationCode: "",
    });

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                // Fetch locations and transportation in parallel if editing
                const promises: [Promise<any>, Promise<any>?] = [getLocationsList()];
                if (isEditing && id) {
                    promises.push(getTransportation(Number(id)));
                }

                const [locs, transportation] = await Promise.all(promises);

                setLocations(locs.map((l: any) => ({ value: l.code, label: `${l.name} (${l.code})` })));

                if (transportation) {
                    setFormData({
                        type: transportation.type,
                        originLocationCode: transportation.originLocationCode || "",
                        destinationLocationCode: transportation.destinationLocationCode || "",
                    });
                } else if (locs.length > 0) {
                    setFormData(prev => ({
                        ...prev,
                        originLocationCode: locs[0].code,
                        destinationLocationCode: locs[0].code
                    }));
                }
            } catch (error) {
                console.error("Failed to load data", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, [isEditing, id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (isEditing && id) {
                await updateTransportation(Number(id), { id: Number(id), ...formData });
            } else {
                await createTransportation(formData);
            }
            navigate("/transportations");
        } catch (error) {
            console.error("Failed to save transportation", error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateField = (field: keyof CreateTransportationDto, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return {
        formData,
        isLoading,
        isEditing,
        locations,
        handleSubmit,
        updateField,
        navigate,
    };
}
