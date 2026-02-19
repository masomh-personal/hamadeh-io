"use client";

import { useLinkStatus } from "next/link";
import { createPortal } from "react-dom";
import { LoadingIndicator } from "@/components/layout/LoadingIndicator";
import { cn } from "@/lib/utils";

interface NavigationOverlayProps {
    message?: string;
    prominent?: boolean;
    showSkeleton?: boolean;
}

const skeletonLineWidths = ["w-1/3", "w-full", "w-5/6", "w-11/12", "w-2/3"];

/**
 * Client-side overlay that fires the instant a <Link> click begins navigating.
 * Must be rendered as a child of next/link's <Link>.
 */
export function NavigationOverlay({
    message = "Loading...",
    prominent = false,
    showSkeleton = true,
}: NavigationOverlayProps): React.ReactElement | null {
    const { pending } = useLinkStatus();

    if (!pending) return null;

    const overlay = (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 opacity-0 backdrop-blur-sm animate-[fadeIn_300ms_200ms_forwards]">
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

    return createPortal(overlay, document.body);
}
