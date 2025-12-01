import { NavLink } from "react-router";
import { cn } from "../../utils/cn";

interface SidebarLinkProps {
    to: string;
    children: React.ReactNode;
}

export function SidebarLink({ to, children }: SidebarLinkProps) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group",
                    isActive
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-sm"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-200"
                )
            }
        >
            {children}
        </NavLink>
    );
}
