import type { Route } from "../../+types/root";
import { MainLayout } from "../../core/components/layout/MainLayout";
import { FlightSearch } from "../../features/routes/components/FlightSearch";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "FlightApp - Search Routes" },
    { name: "description", content: "Search for the best flight routes" },
  ];
}

export default function Home() {
  return (
    <MainLayout>
      <FlightSearch />
    </MainLayout>
  );
}
