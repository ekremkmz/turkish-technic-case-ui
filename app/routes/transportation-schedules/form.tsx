import { MainLayout } from "~/core/components/layout/MainLayout";
import { TransportationScheduleForm } from "../../features/transportation-schedules/components/TransportationScheduleForm";

export default function TransportationScheduleFormPage() {
    return <MainLayout>
        <TransportationScheduleForm />
    </MainLayout>;
}
