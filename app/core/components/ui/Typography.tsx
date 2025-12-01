import { cn } from "../../utils/cn";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    className?: string;
    as?: any;
}

export function SectionTitle({ children, className, as: Component = "h2", ...props }: TypographyProps) {
    return (
        <Component className={cn("text-lg font-semibold text-gray-900 dark:text-white mb-4", className)} {...props}>
            {children}
        </Component>
    );
}

export function SubText({ children, className, as: Component = "p", ...props }: TypographyProps) {
    return (
        <Component className={cn("text-gray-500 dark:text-gray-400", className)} {...props}>
            {children}
        </Component>
    );
}

export function PageTitle({ children, className, as: Component = "h1", ...props }: TypographyProps) {
    return (
        <Component className={cn("text-2xl font-bold text-gray-900 dark:text-white", className)} {...props}>
            {children}
        </Component>
    );
}
