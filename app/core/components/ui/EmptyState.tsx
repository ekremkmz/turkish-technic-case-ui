import { cn } from "../../utils/cn";

export function EmptyStateContainer({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={cn("text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700", className)}>
            {children}
        </div>
    );
}
