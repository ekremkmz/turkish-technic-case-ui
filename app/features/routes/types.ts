export interface PreTransportation {
    fromName: string;
    type: string;
}

export interface Flight {
    fromName: string;
    fromCode: string;
    toName: string;
    toCode: string;
}

export interface PostTransportation {
    toName: string;
    type: string;
}

export interface RouteResponse {
    id: string;
    preTransportation?: PreTransportation;
    flight: Flight;
    postTransportation?: PostTransportation;
}

export interface RouteCriteriaDto {
    from: string;
    to: string;
    day: number;
}

export interface SearchParams {
    origin: string;
    destination: string;
    day: number;
}
