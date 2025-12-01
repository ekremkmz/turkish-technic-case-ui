import type { RouteResponse } from "../types";
import { Card } from "../../../core/components/ui/Card";
import { LocationText } from "./RouteComponents";
import { Button } from "../../../core/components/ui/Button";

interface RouteItemProps {
    route: RouteResponse;
}

export function RouteItem({ route }: RouteItemProps) {
    return (
        <Card className="hover:shadow-md transition-shadow duration-200 group">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        {route.preTransportation && (
                            <>
                                <LocationText>{route.preTransportation.fromName}</LocationText>
                                <span className="mx-2 text-xs text-gray-400">({route.preTransportation.type})</span>
                                <span className="mx-2">→</span>
                            </>
                        )}
                        <LocationText>{route.flight.fromCode}</LocationText>
                        <span className="mx-2">→</span>
                        <LocationText>{route.flight.toCode}</LocationText>
                        {route.postTransportation && (
                            <>
                                <span className="mx-2">→</span>
                                <LocationText>{route.postTransportation.toName}</LocationText>
                                <span className="mx-2 text-xs text-gray-400">({route.postTransportation.type})</span>
                            </>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-between w-full md:w-auto md:flex-col md:items-end gap-2">
                    <Button variant="soft" size="sm" className="rounded-lg">
                        Select
                    </Button>
                </div>
            </div>
        </Card>
    );
}
