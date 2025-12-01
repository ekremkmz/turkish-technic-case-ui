import { Link, useNavigate } from "react-router";
import { Button } from "../../../core/components/ui/Button";
import { Table } from "../../../core/components/ui/Table";
import { PageTitle } from "../../../core/components/ui/Typography";
import { useLocationList } from "../hooks/useLocationList";

export function LocationList() {
    const { locations, isLoading, handleDelete } = useLocationList();
    const navigate = useNavigate();

    const onDeleteClick = (code: string, e: React.MouseEvent) => {
        e.stopPropagation();
        handleDelete(code);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <PageTitle>Locations</PageTitle>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your flight locations</p>
                </div>
                <Link to="/locations/new">
                    <Button>Add Location</Button>
                </Link>
            </div>

            <Table
                data={locations}
                isLoading={isLoading}
                keyExtractor={(item) => item.code}
                onRowClick={(item) => navigate(`/locations/${item.code}/edit`)}
                columns={[
                    { header: "Code", accessor: (item) => <span className="font-mono font-bold">{item.code}</span> },
                    { header: "Name", accessor: (item) => item.name },
                    { header: "City", accessor: (item) => item.city },
                    { header: "Country", accessor: (item) => item.country },
                    {
                        header: "Actions",
                        className: "text-right",
                        accessor: (item) => (
                            <div className="flex justify-end gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/20"
                                    onClick={(e) => onDeleteClick(item.code, e)}
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
