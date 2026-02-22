import { LoadingIndicator } from "@/components/layout/LoadingIndicator";
import { cn } from "@/lib/utils";

interface LoadingOverlayProps {
    message?: string;
    icon?: React.ReactNode;
    showSkeleton?: boolean;
    topContent?: React.ReactNode;
    className?: string;
}

export function LoadingOverlay({
    message = "Loading...",
    icon,
    showSkeleton = true,
    topContent,
    className,
}: LoadingOverlayProps): React.ReactElement {
    return (
        <div
            className={cn(
                "absolute inset-0 z-40 flex flex-col items-center justify-center bg-slate-950/60 backdrop-blur-sm",
                className
            )}
        >
            <div className="w-full max-w-sm px-6">
                {topContent ? (
                    <div className="mb-3 flex justify-center">{topContent}</div>
                ) : null}
                <div>
                    <LoadingIndicator
                        message={message}
                        icon={icon}
                        showSkeletonBackground={showSkeleton}
                    />
                </div>
            </div>
        </div>
    );
}
