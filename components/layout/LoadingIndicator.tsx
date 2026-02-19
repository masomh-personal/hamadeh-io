import { HiCode } from "react-icons/hi";
import { cn } from "@/lib/utils";

interface LoadingIndicatorProps {
    message?: string;
    icon?: React.ReactNode;
    className?: string;
}

export function LoadingIndicator({
    message = "Loading...",
    icon,
    className,
}: LoadingIndicatorProps): React.ReactElement {
    return (
        <div
            className={cn(
                "surface-card radius-card mx-auto flex w-fit flex-col items-center justify-center gap-3 px-10 py-8",
                className
            )}
        >
            {icon ?? (
                <HiCode
                    className="h-8 w-8 animate-[spin_1.2s_linear_infinite] text-sky-300"
                    aria-hidden="true"
                />
            )}
            <p className="font-baloo text-lg font-bold uppercase tracking-wide text-white">
                {message}
            </p>
        </div>
    );
}
