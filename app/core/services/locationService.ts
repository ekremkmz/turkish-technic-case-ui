import { api } from "../utils/api";
import type { CreateLocationDto, UpdateLocationDto, LocationResponse } from "../../features/locations/types";

export const getLocationsList = async (): Promise<LocationResponse[]> => {
    return api<LocationResponse[]>("/v1/location/all");
};

export const getLocation = async (code: string): Promise<LocationResponse | undefined> => {
    return api<LocationResponse>(`/v1/location?id=${code}`);
};

export const createLocation = async (data: CreateLocationDto): Promise<LocationResponse> => {
    return api<LocationResponse>("/v1/location", {
        method: "POST",
        body: JSON.stringify(data),
    });
};

export const updateLocation = async (code: string, data: UpdateLocationDto): Promise<LocationResponse> => {
    return api<LocationResponse>("/v1/location", {
        method: "PUT",
        body: JSON.stringify(data),
    });
};

export const deleteLocation = async (code: string): Promise<void> => {
    return api<void>(`/v1/location/${code}`, {
        method: "DELETE",
    });
};
