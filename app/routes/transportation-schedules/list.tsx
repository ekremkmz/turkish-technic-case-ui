import { MainLayout } from "~/core/components/layout/MainLayout";
import { TransportationScheduleList } from "../../features/transportation-schedules/components/TransportationScheduleList";

export default function TransportationSchedulesListPage() {
    return <MainLayout>
        <TransportationScheduleList />
    </MainLayout>;
}
