import { HiCode, HiXCircle } from "react-icons/hi";
import { cn } from "@/lib/utils";

interface LoadingIndicatorProps {
    message?: string;
    icon?: React.ReactNode;
    onDismiss?: () => void;
    className?: string;
}

export function LoadingIndicator({
    message = "Loading...",
    icon,
    onDismiss,
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
            {onDismiss ? (
                <button
                    type="button"
                    onClick={onDismiss}
                    className="mt-1 flex cursor-pointer items-center gap-1.5 rounded-md border border-red-400/50 bg-red-500/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-red-300 transition-all hover:border-red-400/80 hover:bg-red-500/35 hover:text-red-100 active:scale-95"
                >
                    <HiXCircle className="h-3.5 w-3.5" />
                    Dismiss Overlay
                </button>
            ) : null}
        </div>
    );
}
