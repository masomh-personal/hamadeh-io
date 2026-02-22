"use client";

import { useLinkStatus } from "next/link";
import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { LoadingOverlay } from "@/components/layout/LoadingOverlay";

interface NavigationOverlayProps {
    message?: string;
    icon?: React.ReactNode;
    showSkeleton?: boolean;
}

function emptySubscribe(): () => void {
    return () => {};
}

function getMainContentSnapshot(): HTMLElement | null {
    return document.getElementById("main-content");
}

/**
 * Client-side overlay that fires the instant a <Link> click begins navigating.
 * Portals into <main> so header/footer stay interactive.
 * All visual rendering is delegated to LoadingOverlay.
 * Uses useSyncExternalStore to avoid hydration flash from useEffect(setState, []).
 */
export function NavigationOverlay({
    message = "Loading...",
    icon,
    showSkeleton = true,
}: NavigationOverlayProps): React.ReactElement | null {
    const { pending } = useLinkStatus();
    const mainEl = useSyncExternalStore(
        emptySubscribe,
        getMainContentSnapshot,
        () => null
    );

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
