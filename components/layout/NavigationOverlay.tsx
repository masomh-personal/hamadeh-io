"use client";

import { useLinkStatus } from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { LoadingIndicator } from "@/components/layout/LoadingIndicator";
import { cn } from "@/lib/utils";

interface NavigationOverlayProps {
    message?: string;
    icon?: React.ReactNode;
    showSkeleton?: boolean;
}

const skeletonRows = [
    { width: "w-1/3", delay: 0 },
    { width: "w-full", delay: 60 },
    { width: "w-5/6", delay: 120 },
    { width: "w-2/3", delay: 180 },
];

export function NavigationOverlay({
    message = "Loading...",
    icon,
    showSkeleton = true,
}: NavigationOverlayProps): React.ReactElement | null {
    const { pending } = useLinkStatus();
    const [mainEl, setMainEl] = useState<HTMLElement | null>(null);

    useEffect(() => {
        setMainEl(document.getElementById("main-content"));
    }, []);

    if (!(pending && mainEl)) return null;

    const overlay = (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-slate-950/60 opacity-0 backdrop-blur-sm animate-[fadeIn_300ms_200ms_forwards]">
            <div className="w-full max-w-md space-y-3 px-6">
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

    return createPortal(overlay, mainEl);
}
