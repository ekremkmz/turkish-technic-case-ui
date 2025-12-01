import React from "react";
import { cn } from "../../utils/cn";

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: SelectOption[];
    error?: string;
}

export function Select({
    label,
    options,
    error,
    className = "",
    ...props
}: SelectProps) {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 ml-1">
                    {label}
                </label>
            )}
            <div className="relative">
                <select
                    className={cn(
                        "w-full appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
                        "text-gray-900 dark:text-white rounded-xl px-4 py-3 pr-10",
                        "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500",
                        "transition-all duration-200 shadow-sm hover:border-gray-300 dark:hover:border-gray-600",
                        "disabled:opacity-50 disabled:bg-gray-50 dark:disabled:bg-gray-900",
                        error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                        className
                    )}
                    {...props}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 dark:text-gray-400">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
            {error && (
                <p className="mt-1.5 text-sm text-red-600 dark:text-red-400 ml-1 animate-fade-in">
                    {error}
                </p>
            )}
        </div>
    );
}
