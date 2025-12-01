import { Button } from "../../../core/components/ui/Button";
import { Select } from "../../../core/components/ui/Select";
import { Card } from "../../../core/components/ui/Card";
import { PageTitle } from "../../../core/components/ui/Typography";
import { useTransportationScheduleForm } from "../hooks/useTransportationScheduleForm";
import { DayOfWeek } from "../../../core/types/DayOfWeek";

export function TransportationScheduleForm() {
    const { formData,
        isLoading,
        transportations,
        locations,
        handleSubmit,
        updateField,
        navigate
    } = useTransportationScheduleForm();

    const getLocationName = (code: string) => {
        const location = locations.find((l) => l.code === code);
        return location ? location.name : code;
    };

    const transportationOptions = transportations.map(t => ({
        value: t.id.toString(),
        label: `${getLocationName(t.originLocationCode)} → ${getLocationName(t.destinationLocationCode)} (${t.type})`
    }));

    const dayOptions = [
        { value: DayOfWeek.MONDAY.toString(), label: "Monday" },
        { value: DayOfWeek.TUESDAY.toString(), label: "Tuesday" },
        { value: DayOfWeek.WEDNESDAY.toString(), label: "Wednesday" },
        { value: DayOfWeek.THURSDAY.toString(), label: "Thursday" },
        { value: DayOfWeek.FRIDAY.toString(), label: "Friday" },
        { value: DayOfWeek.SATURDAY.toString(), label: "Saturday" },
        { value: DayOfWeek.SUNDAY.toString(), label: "Sunday" },
    ];

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <PageTitle>New Schedule</PageTitle>

            <Card className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                        <Select
                            label="Transportation"
                            value={formData.transportationId.toString()}
                            onChange={(e) => updateField("transportationId", Number(e.target.value))}
                            options={transportationOptions}
                            disabled={isLoading}
                            required
                        />

                        <Select
                            label="Day of Week"
                            value={formData.day.toString()}
                            onChange={(e) => updateField("day", Number(e.target.value))}
                            options={dayOptions}
                            disabled={isLoading}
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-3">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => navigate("/transportation-schedules")}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" isLoading={isLoading}>
                            Create Schedule
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
