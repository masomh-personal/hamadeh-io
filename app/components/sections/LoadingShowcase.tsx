"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HiDocumentText, HiRefresh } from "react-icons/hi";
import { LoadingOverlay } from "@/components/layout/LoadingOverlay";
import { Button } from "@/components/ui";

const presets = [
    {
        label: "Default",
        message: "Loading...",
        icon: undefined,
        skeleton: false,
    },
    {
        label: "Blog Post",
        message: "Loading post...",
        icon: (
            <HiDocumentText className="h-8 w-8 animate-[spin_1.2s_linear_infinite] text-emerald-400" />
        ),
        skeleton: true,
    },
    {
        label: "Custom Icon",
        message: "Refreshing...",
        icon: (
            <HiRefresh className="h-8 w-8 animate-[spin_1.2s_linear_infinite] text-amber-400" />
        ),
        skeleton: false,
    },
    {
        label: "Long Text",
        message:
            "Hang tight, we're fetching your content and preparing the layout...",
        icon: undefined,
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
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const dismiss = useCallback(() => {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = null;
        setActive(null);
    }, []);

    function trigger(index: number) {
        dismiss();
        setActive(index);
        timerRef.current = setTimeout(dismiss, 10_000);
    }

    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    const preset = active !== null ? presets[active] : null;

    return (
        <section>
            <h2 className="font-bold text-white">Loading Overlay</h2>
            <p className="text-content-muted mb-4">
                Full-area overlay scoped to the main content region. Supports
                custom messages, icons, and optional skeleton shimmer. Click a
                preset to preview for 10 seconds, or dismiss early.
            </p>

            <h3 className="border-t border-surface-outline/40 pt-4 font-mono text-sm font-semibold text-slate-300">
                Presets
            </h3>
            <div className="mt-3 flex flex-wrap gap-3">
                {presets.map((p, i) => (
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

            {preset ? (
                <LoadingOverlay
                    message={preset.message}
                    icon={preset.icon}
                    showSkeleton={preset.skeleton}
                    onDismiss={dismiss}
                />
            ) : null}
        </section>
    );
}
