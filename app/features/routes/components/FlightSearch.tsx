import { useState } from "react";
import { SearchForm } from "./SearchForm";
import { RouteList } from "./RouteList";
import { useRoutes } from "../hooks/useRoutes";

export function FlightSearch() {
    const { routes, isLoading, searchRoutes } = useRoutes();
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = (origin: string, destination: string, day: number) => {
        setHasSearched(true);
        searchRoutes(origin, destination, day);
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Find Your Route
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                    Search for the best connections between cities.
                </p>
            </div>

            <SearchForm onSearch={handleSearch} isLoading={isLoading} />

            <RouteList
                routes={routes}
                isLoading={isLoading}
                hasSearched={hasSearched}
            />
        </div>
    );
}
