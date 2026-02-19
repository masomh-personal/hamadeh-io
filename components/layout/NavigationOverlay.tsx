"use client";

import { useLinkStatus } from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { LoadingOverlay } from "@/components/layout/LoadingOverlay";

interface NavigationOverlayProps {
    message?: string;
    icon?: React.ReactNode;
    showSkeleton?: boolean;
}

/**
 * Client-side overlay that fires the instant a <Link> click begins navigating.
 * Portals into <main> so header/footer stay interactive.
 * All visual rendering is delegated to LoadingOverlay.
 */
export function NavigationOverlay({
    message = "Loading...",
    icon,
    showSkeleton = false,
}: NavigationOverlayProps): React.ReactElement | null {
    const { pending } = useLinkStatus();
    const [mainEl, setMainEl] = useState<HTMLElement | null>(null);

    useEffect(() => {
        setMainEl(document.getElementById("main-content"));
    }, []);

    if (!(pending && mainEl)) return null;

    return createPortal(
        <LoadingOverlay
            message={message}
            icon={icon}
            showSkeleton={showSkeleton}
            className="opacity-0 animate-[fadeIn_300ms_200ms_forwards]"
        />,
        mainEl
    );
}
