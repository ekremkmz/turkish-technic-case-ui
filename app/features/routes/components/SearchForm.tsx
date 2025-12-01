import { Button } from "../../../core/components/ui/Button";
import { Select } from "../../../core/components/ui/Select";
import { Card } from "../../../core/components/ui/Card";
import { useSearchForm } from "../hooks/useSearchForm";

interface SearchFormProps {
    onSearch: (origin: string, destination: string, day: number) => void;
    isLoading?: boolean;
}

export function SearchForm({ onSearch, isLoading }: SearchFormProps) {
    const { origin, setOrigin, destination, setDestination, date, setDate, locations, handleSubmit } = useSearchForm(onSearch);

    const locationOptions = [
        { value: "", label: "Select Location" },
        ...locations.map((loc) => ({ value: loc.code, label: loc.name })),
    ];

    return (
        <Card className="mb-8 p-6">
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                    <div className="md:col-span-4">
                        <Select
                            label="Origin"
                            options={locationOptions}
                            value={origin}
                            onChange={(e) => setOrigin(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                    <div className="md:col-span-4">
                        <Select
                            label="Destination"
                            options={locationOptions}
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                    <div className="md:col-span-2">
                        <div className="w-full">
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 ml-1">
                                Date
                            </label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 shadow-sm hover:border-gray-300 dark:hover:border-gray-600"
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <Button
                            type="submit"
                            className="w-full"
                            isLoading={isLoading}
                            disabled={!origin || !destination || !date}
                        >
                            Search
                        </Button>
                    </div>
                </div>
            </form>
        </Card>
    );
}
