import { LoadingIndicator } from "@/components/layout/LoadingIndicator";
import { cn } from "@/lib/utils";

interface LoadingOverlayProps {
    message?: string;
    showSkeleton?: boolean;
    prominent?: boolean;
    className?: string;
}

export function LoadingOverlay({
    message = "Loading...",
    showSkeleton = true,
    prominent = false,
    className,
}: LoadingOverlayProps): React.ReactElement {
    const skeletonLineWidths = ["w-1/3", "w-full", "w-5/6", "w-11/12", "w-2/3"];

    return (
        <div
            className={cn(
                "fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm",
                className
            )}
        >
            <div className="w-full max-w-xl space-y-3 px-6">
                <LoadingIndicator
                    message={message}
                    className={cn("px-6 py-5", prominent && "px-7 py-6")}
                    iconClassName={cn(prominent && "h-6 w-6")}
                    messageClassName={cn(prominent && "text-lg font-semibold")}
                />

                {showSkeleton ? (
                    <div className="surface-card radius-card p-5">
                        <div className="space-y-3">
                            {skeletonLineWidths.map((widthClass, index) => (
                                <div
                                    key={widthClass}
                                    className={cn(
                                        "h-4 rounded bg-slate-700/45 motion-safe:animate-pulse",
                                        widthClass
                                    )}
                                    style={{
                                        animationDelay: `${index * 140}ms`,
                                        animationDuration: "1.4s",
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
