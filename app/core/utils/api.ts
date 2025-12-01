import { eventBus, EVENTS } from "./eventBus";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export async function api<T>(path: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${BASE_URL}${path}`, {
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
        ...options,
    });

    if (!response.ok) {
        let errorMessage = `API Error: ${response.statusText}`;
        try {
            const errorBody = await response.json();
            if (errorBody && errorBody.message) {
                errorMessage = errorBody.message;
            }
        } catch (e) {
            // Failed to parse error body, use default message
        }

        eventBus.emit(EVENTS.SHOW_TOAST, {
            message: errorMessage,
            type: "error"
        });

        throw new Error(errorMessage);
    }

    // Handle empty response for DELETE or 204
    if (response.status === 204 || response.headers.get("content-length") === "0") {
        return {} as T;
    }

    return response.json();
}
