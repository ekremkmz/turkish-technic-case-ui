import { api } from "../utils/api";
import { type CreateTransportationDto, type UpdateTransportationDto, type TransportationResponse } from "../../features/transportations/types";

export const getTransportationsList = async (): Promise<TransportationResponse[]> => {
    return api<TransportationResponse[]>("/v1/transportation/all");
};

export const getTransportation = async (id: number): Promise<TransportationResponse | undefined> => {
    return api<TransportationResponse>(`/v1/transportation?id=${id}`);
};

export const createTransportation = async (data: CreateTransportationDto): Promise<TransportationResponse> => {
    return api<TransportationResponse>("/v1/transportation", {
        method: "POST",
        body: JSON.stringify(data),
    });
};

export const updateTransportation = async (id: number, data: UpdateTransportationDto): Promise<TransportationResponse> => {
    return api<TransportationResponse>("/v1/transportation", {
        method: "PUT",
        body: JSON.stringify(data),
    });
};

export const deleteTransportation = async (id: number): Promise<void> => {
    return api<void>(`/v1/transportation/${id}`, {
        method: "DELETE",
    });
};
