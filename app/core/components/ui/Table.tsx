import { cn } from "../../utils/cn";

interface Column<T> {
    header: string;
    accessor: (item: T) => React.ReactNode;
    className?: string;
}

interface TableProps<T> {
    data: T[];
    columns: Column<T>[];
    keyExtractor: (item: T) => string | number;
    isLoading?: boolean;
    onRowClick?: (item: T) => void;
}

export function Table<T>({ data, columns, keyExtractor, isLoading, onRowClick }: TableProps<T>) {
    if (isLoading) {
        return (
            <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="animate-pulse p-4 space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-12 bg-gray-100 dark:bg-gray-700 rounded-lg" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                        <tr>
                            {columns.map((col, index) => (
                                <th
                                    key={index}
                                    className={cn(
                                        "px-6 py-4 font-semibold text-gray-900 dark:text-gray-100",
                                        col.className
                                    )}
                                >
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {data.map((item) => (
                            <tr
                                key={keyExtractor(item)}
                                onClick={() => onRowClick?.(item)}
                                className={cn(
                                    "hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors",
                                    onRowClick && "cursor-pointer"
                                )}
                            >
                                {columns.map((col, index) => (
                                    <td
                                        key={index}
                                        className={cn(
                                            "px-6 py-4 text-gray-600 dark:text-gray-300",
                                            col.className
                                        )}
                                    >
                                        {col.accessor(item)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        {data.length === 0 && (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                                >
                                    No data found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
