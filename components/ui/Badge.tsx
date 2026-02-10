"use client";

import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export type BadgeColor = "primary" | "secondary" | "tertiary" | "default";

const colorClasses: Record<BadgeColor, string> = {
    primary: "border-sky-500 text-sky-500 bg-sky-500/10",
    secondary: "border-emerald-500 text-emerald-500 bg-emerald-500/10",
    tertiary: "border-amber-400 text-amber-400 bg-amber-400/10",
    default: "border-slate-500 text-slate-400 bg-slate-500/10",
};

const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
    lg: "px-3 py-1.5 text-base",
} as const;

export interface BadgeProps extends ComponentProps<"span"> {
    color?: BadgeColor;
    size?: keyof typeof sizeClasses;
}

/**
 * Badge component with ThoughtfulCode design system.
 * Rounded square shape: border and text in accent color, background at 10%.
 */
export function Badge({
    color = "default",
    size = "md",
    className,
    children,
    ...props
}: BadgeProps): React.ReactElement {
    return (
        <span
            className={cn(
                "inline-flex items-center rounded-md border font-baloo font-semibold",
                colorClasses[color],
                sizeClasses[size],
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
}
