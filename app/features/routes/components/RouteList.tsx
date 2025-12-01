import type { RouteResponse } from "../types";
import { RouteItem } from "./RouteItem";
import { Skeleton } from "../../../core/components/ui/Skeleton";
import { EmptyStateContainer } from "../../../core/components/ui/EmptyState";
import { SectionTitle, SubText } from "../../../core/components/ui/Typography";

interface RouteListProps {
    routes: RouteResponse[];
    isLoading: boolean;
    hasSearched: boolean;
}

export function RouteList({ routes, isLoading, hasSearched }: RouteListProps) {
    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-32 rounded-2xl" />
                ))}
            </div>
        );
    }

    if (routes.length === 0 && hasSearched) {
        return (
            <EmptyStateContainer>
                <SubText>No routes found for your search.</SubText>
            </EmptyStateContainer>
        );
    }

    if (routes.length === 0 && !hasSearched) {
        return (
            <div className="text-center py-12">
                <SubText>Select origin and destination to see available routes.</SubText>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <SectionTitle>Available Routes</SectionTitle>
            {routes.map((route) => (
                <RouteItem key={route.id} route={route} />
            ))}
        </div>
    );
}
