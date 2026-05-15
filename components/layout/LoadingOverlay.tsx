import { LoadingIndicator } from "@/components/layout/LoadingIndicator";
import { cn } from "@/lib/utils";

interface LoadingOverlayProps {
    message?: string;
    icon?: React.ReactNode;
    showSkeleton?: boolean;
    action?: React.ReactNode;
    className?: string;
}

export function LoadingOverlay({
    message = "Loading...",
    icon,
    showSkeleton = true,
    action,
    className,
}: LoadingOverlayProps) {
    return (
        <div
            className={cn(
                "absolute inset-0 z-40 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm",
                className
            )}
        >
            <div className="w-full max-w-sm px-6">
                <LoadingIndicator
                    message={message}
                    icon={icon}
                    showSkeletonBackground={showSkeleton}
                    action={action}
                />
            </div>
        </div>
    );
}
