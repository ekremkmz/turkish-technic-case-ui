import { Link } from "react-router";
import { Button } from "../../../core/components/ui/Button";
import { Table } from "../../../core/components/ui/Table";
import { PageTitle } from "../../../core/components/ui/Typography";
import { useTransportationScheduleList } from "../hooks/useTransportationScheduleList";
import { DayOfWeek } from "../../../core/types/DayOfWeek";

export function TransportationScheduleList() {
    const { schedules, locations, isLoading, deleteSchedule } = useTransportationScheduleList();

    const getLocationName = (code: string) => {
        const location = locations.find((l) => l.code === code);
        return location ? location.name : code;
    };

    const getDayName = (day: DayOfWeek) => {
        const dayNames: Record<DayOfWeek, string> = {
            [DayOfWeek.SUNDAY]: "Sunday",
            [DayOfWeek.MONDAY]: "Monday",
            [DayOfWeek.TUESDAY]: "Tuesday",
            [DayOfWeek.WEDNESDAY]: "Wednesday",
            [DayOfWeek.THURSDAY]: "Thursday",
            [DayOfWeek.FRIDAY]: "Friday",
            [DayOfWeek.SATURDAY]: "Saturday",
        };
        return dayNames[day] || "Unknown";
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <PageTitle>Transportation Schedules</PageTitle>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Manage weekly schedules</p>
                </div>
                <Link to="/transportation-schedules/new">
                    <Button>Add Schedule</Button>
                </Link>
            </div>

            <Table
                data={schedules}
                isLoading={isLoading}
                keyExtractor={(item) => `${item.transportation.id}-${item.day}`}
                columns={[
                    {
                        header: "Transportation",
                        accessor: (item) => (
                            <span>
                                {getLocationName(item.transportation.originLocationCode)} → {getLocationName(item.transportation.destinationLocationCode)}
                                <span className="text-gray-400 text-sm ml-2">({item.transportation.type})</span>
                            </span>
                        )
                    },
                    { header: "Day", accessor: (item) => getDayName(item.day) },
                    {
                        header: "Actions",
                        className: "text-right",
                        accessor: (item) => (
                            <div className="flex justify-end gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/20"
                                    onClick={() => deleteSchedule(item.id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        ),
                    },
                ]}
            />
        </div>
    );
}
