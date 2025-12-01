import { MainLayout } from "../../core/components/layout/MainLayout";
import { TransportationList as TransportationListComponent } from "../../features/transportations/components/TransportationList";

export default function TransportationList() {
    return (
        <MainLayout>
            <TransportationListComponent />
        </MainLayout>
    );
}
