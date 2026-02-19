import { HiCode } from "react-icons/hi";
import { cn } from "@/lib/utils";

interface LoadingIndicatorProps {
    message?: string;
    className?: string;
    iconClassName?: string;
    messageClassName?: string;
}

export function LoadingIndicator({
    message = "Loading...",
    className,
    iconClassName,
    messageClassName,
}: LoadingIndicatorProps): React.ReactElement {
    return (
        <div
            className={cn(
                "surface-card radius-card flex items-center gap-3 px-5 py-4",
                className
            )}
        >
            <HiCode
                className={cn(
                    "h-5 w-5 animate-[spin_1.2s_linear_infinite] text-sky-300",
                    iconClassName
                )}
                aria-hidden="true"
            />
            <p
                className={cn(
                    "text-content text-sm font-medium",
                    messageClassName
                )}
            >
                {message}
            </p>
        </div>
    );
}
