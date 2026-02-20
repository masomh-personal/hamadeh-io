import { HiXCircle } from "react-icons/hi";
import { LoadingIndicator } from "@/components/layout/LoadingIndicator";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

interface LoadingOverlayProps {
    message?: string;
    icon?: React.ReactNode;
    showSkeleton?: boolean;
    onDismiss?: () => void;
    /** Seconds until auto-dismiss; when provided, shown in the dismiss button (e.g. "Dismiss Overlay (5)") */
    secondsRemaining?: number | null;
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
    showSkeleton = false,
    onDismiss,
    secondsRemaining,
    className,
}: LoadingOverlayProps): React.ReactElement {
    return (
        <div
            className={cn(
                "absolute inset-0 z-40 flex flex-col items-center justify-center bg-slate-950/60 backdrop-blur-sm",
                className
            )}
        >
            <div className="w-full max-w-sm space-y-3 px-6">
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

            {onDismiss ? (
                <Button
                    variant="danger-soft"
                    size="sm"
                    iconSize="sm"
                    onClick={onDismiss}
                    className="mt-4"
                >
                    <HiXCircle />
                    Dismiss Overlay
                    {secondsRemaining != null ? ` (${secondsRemaining})` : ""}
                </Button>
            ) : null}
        </div>
    );
}
