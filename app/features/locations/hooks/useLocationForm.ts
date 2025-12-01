import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { createLocation, getLocation, updateLocation } from "../../../core/services/locationService";
import type { CreateLocationDto } from "../types";

export function useLocationForm(id?: string) {
    const navigate = useNavigate();
    const isEditing = !!id;
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<CreateLocationDto>({
        code: "",
        name: "",
        city: "",
        country: "",
    });

    useEffect(() => {
        if (isEditing && id) {
            const fetchLocation = async () => {
                const location = await getLocation(id);
                if (location) {
                    setFormData(location);
                }
            };
            fetchLocation();
        }
    }, [isEditing, id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (isEditing && id) {
                await updateLocation(id, formData);
            } else {
                await createLocation(formData);
            }
            navigate("/locations");
        } catch (error) {
            console.error("Failed to save location", error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateField = (field: keyof CreateLocationDto, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return {
        formData,
        isLoading,
        isEditing,
        handleSubmit,
        updateField,
        navigate, // Exposing navigate for cancel button
    };
}
