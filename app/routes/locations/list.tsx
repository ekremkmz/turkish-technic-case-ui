import { MainLayout } from "../../core/components/layout/MainLayout";
import { LocationList as LocationListComponent } from "../../features/locations/components/LocationList";

export default function LocationList() {
    return (
        <MainLayout>
            <LocationListComponent />
        </MainLayout>
    );
}
