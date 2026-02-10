"use client";

import NextLink from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant =
    | "primary"
    | "secondary"
    | "tertiary"
    | "outline"
    | "ghost"
    | "danger"
    | "danger-soft";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
    primary:
        "bg-sky-500 border-2 border-sky-400/30 hover:border-sky-300 hover:bg-sky-400 font-baloo",
    secondary:
        "border-[3px] border-slate-600 bg-transparent text-slate-300 hover:border-sky-500 hover:bg-sky-950/20 hover:text-sky-500 hover:shadow-lg font-baloo",
    tertiary:
        "bg-emerald-500 border-2 border-emerald-400/30 hover:border-emerald-300 hover:bg-emerald-400 font-baloo",
    outline:
        "border-[3px] border-slate-600 bg-transparent text-slate-300 hover:border-sky-500 hover:bg-sky-950/20 hover:text-sky-500 font-baloo",
    ghost: "bg-transparent text-slate-400 hover:bg-slate-800 hover:text-sky-500 font-baloo",
    danger: "bg-red-500 border-2 border-red-400/30 hover:border-red-400 hover:bg-red-400 font-baloo",
    "danger-soft":
        "bg-red-500/20 text-red-400 border border-red-400/30 hover:bg-red-500/30 font-baloo",
};

const sizeClasses: Record<ButtonSize, string> = {
    sm: "text-sm px-4 py-2",
    md: "text-base px-6 py-3",
    lg: "text-lg px-8 py-4",
};

export interface ThoughtfulButtonProps
    extends Omit<ComponentProps<"button">, "children"> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    href?: string;
    children?: React.ReactNode;
    onPress?: () => void;
}

const baseClasses =
    "rounded-sm font-semibold text-white transition-all duration-200 inline-flex items-center justify-center gap-0.5 " +
    "[&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 " +
    "focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900";

/**
 * Button component with ThoughtfulCode design system overrides.
 * Primary = Sky, Secondary = Outline slate, Tertiary = Emerald.
 * Pass href to render as Next.js Link.
 */
export function Button({
    variant = "primary",
    size = "md",
    className,
    href,
    onClick,
    onPress,
    children,
    ...props
}: ThoughtfulButtonProps): React.ReactElement {
    const classes = cn(
        variantClasses[variant],
        sizeClasses[size],
        baseClasses,
        className
    );

    if (href && !href.startsWith("http")) {
        return (
            <NextLink href={href} className={classes}>
                {children}
            </NextLink>
        );
    }

    if (href) {
        return (
            <a href={href} className={classes}>
                {children}
            </a>
        );
    }

    return (
        <button
            type="button"
            className={classes}
            onClick={(event: MouseEvent<HTMLButtonElement>) => {
                onClick?.(event);
                onPress?.();
            }}
            {...props}
        >
            {children}
        </button>
    );
}
