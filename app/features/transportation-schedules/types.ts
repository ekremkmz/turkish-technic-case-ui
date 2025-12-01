import type { DayOfWeek } from "~/core/types/DayOfWeek";
import type { TransportationResponse } from "../transportations/types";

export interface TransportationScheduleResponse {
    id: number;
    transportation: TransportationResponse;
    day: DayOfWeek;
}

export interface CreateTransportationScheduleDto {
    transportationId: number;
    day: DayOfWeek;
}
