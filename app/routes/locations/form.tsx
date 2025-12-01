import { MainLayout } from "../../core/components/layout/MainLayout";
import { LocationForm as LocationFormComponent } from "../../features/locations/components/LocationForm";

export default function LocationForm() {
    return (
        <MainLayout>
            <LocationFormComponent />
        </MainLayout>
    );
}
