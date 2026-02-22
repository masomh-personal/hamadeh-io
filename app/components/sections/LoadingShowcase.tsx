"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
    HiChip,
    HiCube,
    HiDatabase,
    HiTerminal,
    HiXCircle,
} from "react-icons/hi";
import { LoadingOverlay } from "@/components/layout/LoadingOverlay";
import { Button } from "@/components/ui";

const AUTODISMISS_SECONDS = 10;

const iconClass = "h-8 w-8 animate-[spin_1.2s_linear_infinite] text-sky-300";

const examples = [
    {
        label: "Compile Build",
        message: "Compiling production build...",
        icon: <HiChip className={iconClass} />,
        skeleton: true,
    },
    {
        label: "Deploy Script",
        message: "Running deployment checks...",
        icon: <HiTerminal className={iconClass} />,
        skeleton: true,
    },
    {
        label: "Catalog Fetch",
        message: "Syncing component catalog...",
        icon: <HiCube className={iconClass} />,
        skeleton: true,
    },
    {
        label: "Data Migration",
        message: "Applying database migration...",
        icon: <HiDatabase className={iconClass} />,
        skeleton: true,
    },
] as const;

const VARIANT_ORDER: Array<"primary" | "secondary" | "tertiary" | "danger"> = [
    "primary",
    "secondary",
    "tertiary",
    "danger",
];

export function LoadingShowcase(): React.ReactElement {
    const [active, setActive] = useState<number | null>(null);
    const [secondsRemaining, setSecondsRemaining] = useState<number | null>(
        null
    );
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const dismiss = useCallback(() => {
        if (timerRef.current) clearTimeout(timerRef.current);
        if (intervalRef.current) clearInterval(intervalRef.current);
        timerRef.current = null;
        intervalRef.current = null;
        setActive(null);
        setSecondsRemaining(null);
    }, []);

    function trigger(index: number) {
        dismiss();
        setActive(index);
        setSecondsRemaining(AUTODISMISS_SECONDS);

        const end = Date.now() + AUTODISMISS_SECONDS * 1000;
        intervalRef.current = setInterval(() => {
            const remaining = Math.max(0, Math.ceil((end - Date.now()) / 1000));
            setSecondsRemaining(remaining);
        }, 1000);

        timerRef.current = setTimeout(dismiss, AUTODISMISS_SECONDS * 1000);
    }

    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    const example = active !== null ? examples[active] : null;

    return (
        <section>
            <h2 className="font-bold text-white">Loading Overlay</h2>
            <p className="text-content-muted mb-4">
                Full-area overlay scoped to the main content region. Supports
                custom messages, icons, and optional skeleton-backed panel
                styling. Click a real-world example to preview for{" "}
                {AUTODISMISS_SECONDS} seconds, or dismiss the test overlay
                early.
            </p>

            <h3 className="border-t border-surface-outline/40 pt-4 font-mono text-sm font-semibold text-slate-300">
                Examples
            </h3>
            <div className="mt-3 flex flex-wrap gap-3">
                {examples.map((p, i) => (
                    <Button
                        key={p.label}
                        variant={VARIANT_ORDER[i % VARIANT_ORDER.length]}
                        size="sm"
                        onClick={() => trigger(i)}
                    >
                        {p.label}
                    </Button>
                ))}
            </div>

            {example ? (
                <LoadingOverlay
                    message={example.message}
                    icon={example.icon}
                    showSkeleton={example.skeleton}
                    topContent={
                        <Button
                            variant="danger-soft"
                            size="sm"
                            iconSize="sm"
                            icon={<HiXCircle />}
                            enforceMinWidth={false}
                            onClick={dismiss}
                            className="mt-2 min-h-7 min-w-0 px-2 py-1 text-[0.6rem] tracking-[0.02em] whitespace-nowrap leading-tight text-center"
                        >
                            Dismiss test overlay
                            {secondsRemaining != null
                                ? ` (${secondsRemaining})`
                                : ""}
                        </Button>
                    }
                />
            ) : null}
        </section>
    );
}
