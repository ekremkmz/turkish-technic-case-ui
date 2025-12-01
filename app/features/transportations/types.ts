export enum TransportationType {
    BUS = "BUS",
    SUBWAY = "SUBWAY",
    UBER = "UBER",
    TAXI = "TAXI",
    FLIGHT = "FLIGHT",
    TRAIN = "TRAIN"
}

export interface CreateTransportationDto {
    type: TransportationType;
    originLocationCode: string;
    destinationLocationCode: string;
}

export interface UpdateTransportationDto {
    id: number;
    type: TransportationType;
    originLocationCode: string;
    destinationLocationCode: string;
}

export interface TransportationResponse {
    id: number;
    type: TransportationType;
    originLocationCode: string;
    destinationLocationCode: string;
}
