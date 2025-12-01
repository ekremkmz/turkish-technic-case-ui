import { useParams } from "react-router";
import { Button } from "../../../core/components/ui/Button";
import { Input } from "../../../core/components/ui/Input";
import { Card } from "../../../core/components/ui/Card";
import { PageTitle } from "../../../core/components/ui/Typography";
import { useLocationForm } from "../hooks/useLocationForm";

export function LocationForm() {
    const { id } = useParams();
    const { formData, isLoading, isEditing, handleSubmit, updateField, navigate } = useLocationForm(id);

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <PageTitle>{isEditing ? "Edit Location" : "New Location"}</PageTitle>

            <Card className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Code"
                            value={formData.code}
                            onChange={(e) => updateField("code", e.target.value.toUpperCase())}
                            placeholder="IST"
                            disabled={isEditing || isLoading}
                            required
                            maxLength={3}
                        />
                        <Input
                            label="Name"
                            value={formData.name}
                            onChange={(e) => updateField("name", e.target.value)}
                            placeholder="Istanbul Airport"
                            disabled={isLoading}
                            required
                        />
                        <Input
                            label="City"
                            value={formData.city}
                            onChange={(e) => updateField("city", e.target.value)}
                            placeholder="Istanbul"
                            disabled={isLoading}
                            required
                        />
                        <Input
                            label="Country"
                            value={formData.country}
                            onChange={(e) => updateField("country", e.target.value)}
                            placeholder="Turkey"
                            disabled={isLoading}
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-3">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => navigate("/locations")}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" isLoading={isLoading}>
                            {isEditing ? "Update Location" : "Create Location"}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
