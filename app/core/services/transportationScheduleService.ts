import { api } from "../utils/api";
import type { CreateTransportationScheduleDto, TransportationScheduleResponse } from "../../features/transportation-schedules/types";

export const getTransportationSchedulesList = async (): Promise<TransportationScheduleResponse[]> => {
    return api<TransportationScheduleResponse[]>("/v1/transportation-schedule/all");
};

export const createTransportationSchedule = async (data: CreateTransportationScheduleDto): Promise<TransportationScheduleResponse> => {
    return api<TransportationScheduleResponse>("/v1/transportation-schedule", {
        method: "POST",
        body: JSON.stringify(data),
    });
};

export const deleteTransportationSchedule = async (id: number): Promise<void> => {
    return api<void>(`/v1/transportation-schedule?id=${id}`, {
        method: "DELETE",
    });
};
