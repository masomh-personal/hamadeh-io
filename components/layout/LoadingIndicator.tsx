import { HiTerminal } from "react-icons/hi";
import { cn } from "@/lib/utils";

interface LoadingIndicatorProps {
    message?: string;
    icon?: React.ReactNode;
    showSkeletonBackground?: boolean;
    className?: string;
}

const skeletonRows = [
    { width: "w-1/3", delay: 0 },
    { width: "w-11/12", delay: 60 },
    { width: "w-4/5", delay: 120 },
    { width: "w-full", delay: 180 },
    { width: "w-3/4", delay: 240 },
    { width: "w-5/6", delay: 300 },
    { width: "w-2/3", delay: 360 },
    { width: "w-10/12", delay: 420 },
];

export function LoadingIndicator({
    message = "Loading...",
    icon,
    showSkeletonBackground = false,
    className,
}: LoadingIndicatorProps): React.ReactElement {
    return (
        <div
            className={cn(
                "surface-card radius-card mx-auto w-fit px-10 py-8 text-center",
                showSkeletonBackground && "relative overflow-hidden",
                className
            )}
        >
            {showSkeletonBackground ? (
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-34"
                >
                    <div className="flex h-full flex-col justify-evenly px-5 py-4">
                        {skeletonRows.map((row) => (
                            <div
                                key={`${row.width}-${row.delay}`}
                                className={cn(
                                    "skeleton-shimmer h-2 rounded",
                                    row.width
                                )}
                                style={{ animationDelay: `${row.delay}ms` }}
                            />
                        ))}
                    </div>
                </div>
            ) : null}
            <div
                className={cn(
                    "relative z-10 flex flex-col items-center justify-center gap-3 text-center",
                    showSkeletonBackground && "px-4 py-3"
                )}
            >
                <span
                    className={cn(
                        showSkeletonBackground &&
                            "drop-shadow-[0_2px_8px_rgba(2,6,23,0.98)]"
                    )}
                >
                    {icon ?? (
                        <HiTerminal
                            className="h-8 w-8 animate-[spin_1.2s_linear_infinite] text-sky-300"
                            aria-hidden="true"
                        />
                    )}
                </span>
                <p
                    className={cn(
                        "font-baloo text-xl font-black uppercase tracking-wide text-white leading-tight",
                        showSkeletonBackground &&
                            "[text-shadow:0_1px_0_rgba(15,23,42,1),0_0_1px_rgba(15,23,42,1),0_4px_14px_rgba(2,6,23,0.98)]"
                    )}
                >
                    {message}
                </p>
            </div>
        </div>
    );
}
