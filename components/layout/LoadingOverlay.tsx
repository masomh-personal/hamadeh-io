import { HiXCircle } from "react-icons/hi";
import { LoadingIndicator } from "@/components/layout/LoadingIndicator";
import { cn } from "@/lib/utils";

interface LoadingOverlayProps {
    message?: string;
    icon?: React.ReactNode;
    showSkeleton?: boolean;
    onDismiss?: () => void;
    className?: string;
}

const skeletonRows = [
    { width: "w-1/3", delay: 0 },
    { width: "w-full", delay: 60 },
    { width: "w-5/6", delay: 120 },
    { width: "w-2/3", delay: 180 },
];

export function LoadingOverlay({
    message = "Loading...",
    icon,
    showSkeleton = true,
    onDismiss,
    className,
}: LoadingOverlayProps): React.ReactElement {
    return (
        <div
            className={cn(
                "absolute inset-0 z-40 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm",
                className
            )}
        >
            <div className="w-full max-w-sm space-y-3 px-6">
                {onDismiss ? (
                    <div className="flex justify-center">
                        <button
                            type="button"
                            onClick={onDismiss}
                            className="flex cursor-pointer items-center gap-1.5 rounded-md border border-red-400/40 bg-red-500/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-red-300 transition-all hover:border-red-400/70 hover:bg-red-500/25 hover:text-red-200 active:scale-95"
                        >
                            <HiXCircle className="h-3.5 w-3.5" />
                            Dismiss
                        </button>
                    </div>
                ) : null}

                <LoadingIndicator message={message} icon={icon} />

                {showSkeleton ? (
                    <div className="surface-card radius-card overflow-hidden px-5 py-4">
                        <div className="space-y-2">
                            {skeletonRows.map((row) => (
                                <div
                                    key={`${row.width}-${row.delay}`}
                                    className={cn(
                                        "skeleton-shimmer h-2.5 rounded",
                                        row.width
                                    )}
                                    style={{ animationDelay: `${row.delay}ms` }}
                                />
                            ))}
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
