import { cn } from "../../utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export function Input({ label, error, className, ...props }: InputProps) {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 ml-1">
                    {label}
                </label>
            )}
            <input
                className={cn(
                    "w-full appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
                    "text-gray-900 dark:text-white rounded-xl px-4 py-3",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500",
                    "transition-all duration-200 shadow-sm hover:border-gray-300 dark:hover:border-gray-600",
                    "disabled:opacity-50 disabled:bg-gray-50 dark:disabled:bg-gray-900",
                    error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                    className
                )}
                {...props}
            />
            {error && (
                <p className="mt-1.5 text-sm text-red-600 dark:text-red-400 ml-1 animate-fade-in">
                    {error}
                </p>
            )}
        </div>
    );
}
