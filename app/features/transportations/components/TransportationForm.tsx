import { useParams } from "react-router";
import { Button } from "../../../core/components/ui/Button";

import { Select } from "../../../core/components/ui/Select";
import { Card } from "../../../core/components/ui/Card";
import { PageTitle } from "../../../core/components/ui/Typography";
import { useTransportationForm } from "../hooks/useTransportationForm";
import { TransportationType } from "../types";

export function TransportationForm() {
    const { id } = useParams();
    const { formData, isLoading, isEditing, locations, handleSubmit, updateField, navigate } = useTransportationForm(id);

    const typeOptions = Object.values(TransportationType).map(t => ({ value: t, label: t }));

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <PageTitle>{isEditing ? "Edit Transportation" : "New Transportation"}</PageTitle>

            <Card className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                        <Select
                            label="Type"
                            value={formData.type}
                            onChange={(e) => updateField("type", e.target.value as TransportationType)}
                            options={typeOptions}
                            disabled={isLoading}
                        />

                        <Select
                            label="Origin"
                            value={formData.originLocationCode}
                            onChange={(e) => updateField("originLocationCode", e.target.value)}
                            options={locations}
                            disabled={isLoading}
                            required
                        />

                        <Select
                            label="Destination"
                            value={formData.destinationLocationCode}
                            onChange={(e) => updateField("destinationLocationCode", e.target.value)}
                            options={locations}
                            disabled={isLoading}
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-3">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => navigate("/transportations")}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" isLoading={isLoading}>
                            {isEditing ? "Update Transportation" : "Create Transportation"}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
