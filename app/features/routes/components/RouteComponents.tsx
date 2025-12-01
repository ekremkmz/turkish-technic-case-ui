import { cn } from "../../../core/utils/cn";

export function LocationText({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <span className={cn("font-medium text-gray-700 dark:text-gray-300", className)}>
            {children}
        </span>
    );
}
