export interface LocationResponse {
    code: string;
    name: string;
    country: string;
    city: string;
}

export interface CreateLocationDto {
    code: string;
    name: string;
    country: string;
    city: string;
}

export interface UpdateLocationDto {
    code: string;
    name: string;
    country: string;
    city: string;
}
