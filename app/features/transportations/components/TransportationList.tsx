import { Link, useNavigate } from "react-router";
import { Button } from "../../../core/components/ui/Button";
import { Table } from "../../../core/components/ui/Table";
import { PageTitle } from "../../../core/components/ui/Typography";
import { useTransportationList } from "../hooks/useTransportationList";

export function TransportationList() {
    const { transportations, locations, isLoading, handleDelete } = useTransportationList();
    const navigate = useNavigate();

    const onDeleteClick = (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        handleDelete(id);
    };

    const getLocationName = (code: string) => {
        const location = locations.find((l) => l.code === code);
        return location ? location.name : code;
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <PageTitle>Transportations</PageTitle>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Manage transportation connections</p>
                </div>
                <Link to="/transportations/new">
                    <Button>Add Transportation</Button>
                </Link>
            </div>

            <Table
                data={transportations}
                isLoading={isLoading}
                keyExtractor={(item) => item.id}
                onRowClick={(item) => navigate(`/transportations/${item.id}/edit`)}
                columns={[
                    { header: "Type", accessor: (item) => <span className="font-medium">{item.type}</span> },
                    { header: "Origin", accessor: (item) => getLocationName(item.originLocationCode) },
                    { header: "Destination", accessor: (item) => getLocationName(item.destinationLocationCode) },
                    {
                        header: "Actions",
                        className: "text-right",
                        accessor: (item) => (
                            <div className="flex justify-end gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/20"
                                    onClick={(e) => onDeleteClick(item.id, e)}
                                >
                                    Delete
                                </Button>
                            </div>
                        ),
                    },
                ]}
            />
        </div>
    );
}
