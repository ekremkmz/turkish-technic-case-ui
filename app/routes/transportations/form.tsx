import { MainLayout } from "../../core/components/layout/MainLayout";
import { TransportationForm as TransportationFormComponent } from "../../features/transportations/components/TransportationForm";

export default function TransportationForm() {
    return (
        <MainLayout>
            <TransportationFormComponent />
        </MainLayout>
    );
}
