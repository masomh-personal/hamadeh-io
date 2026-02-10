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
type IconSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
    primary:
        "bg-sky-500 border border-sky-300/40 hover:border-sky-300 hover:bg-sky-400 font-baloo",
    secondary:
        "bg-emerald-500 border border-emerald-300/40 hover:border-emerald-300 hover:bg-emerald-400 font-baloo",
    tertiary:
        "bg-amber-500 border border-amber-300/50 text-slate-900 hover:border-amber-200 hover:bg-amber-400 font-baloo",
    outline:
        "border border-slate-500 bg-slate-900/30 text-slate-200 hover:border-sky-500 hover:bg-sky-950/20 hover:text-sky-400 font-baloo",
    ghost: "border border-transparent bg-transparent text-slate-300 hover:bg-slate-800/40 hover:text-sky-400 font-baloo",
    danger: "bg-red-500 border border-red-300/40 hover:border-red-300 hover:bg-red-400 font-baloo",
    "danger-soft":
        "bg-red-500/20 text-red-400 border border-red-400/30 hover:bg-red-500/30 font-baloo",
};

const sizeClasses: Record<ButtonSize, string> = {
    sm: "text-sm px-3 py-1.5",
    md: "text-base px-4 py-2",
    lg: "text-lg px-5 py-2.5",
};

const iconSizeClasses: Record<IconSize, string> = {
    sm: "[&_svg]:h-3 [&_svg]:w-3",
    md: "[&_svg]:h-3.5 [&_svg]:w-3.5",
    lg: "[&_svg]:h-4 [&_svg]:w-4",
};

export interface ThoughtfulButtonProps
    extends Omit<ComponentProps<"button">, "children"> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    href?: string;
    children?: React.ReactNode;
    onPress?: () => void;
    iconSize?: IconSize;
    isLoading?: boolean;
    loadingText?: string;
    loadingIcon?: React.ReactNode;
}

const baseClasses =
    "rounded-sm font-semibold text-white transition-all duration-200 inline-flex items-center justify-center gap-1 " +
    "[&_svg]:block [&_svg]:shrink-0 " +
    "focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900";

/**
 * Button component with ThoughtfulCode design system.
 * Primary = Sky, Secondary = Emerald, Tertiary = Amber.
 * Pass href to render as a link-style button.
 */
export function Button({
    variant = "primary",
    size = "md",
    className,
    href,
    disabled,
    onClick,
    onPress,
    iconSize = "md",
    isLoading = false,
    loadingText,
    loadingIcon,
    children,
    ...props
}: ThoughtfulButtonProps): React.ReactElement {
    const classes = cn(
        variantClasses[variant],
        sizeClasses[size],
        iconSizeClasses[iconSize],
        baseClasses,
        isLoading && "cursor-wait opacity-80",
        className
    );

    const content = isLoading ? (
        <>
            {loadingIcon ?? (
                <span className="h-3.5 w-3.5 animate-spin rounded-full border border-current border-r-transparent" />
            )}
            <span>{loadingText ?? "Loading..."}</span>
        </>
    ) : (
        children
    );

    if (href && !href.startsWith("http")) {
        return (
            <NextLink href={href} className={classes}>
                {content}
            </NextLink>
        );
    }

    if (href) {
        return (
            <a href={href} className={classes}>
                {content}
            </a>
        );
    }

    return (
        <button
            type="button"
            className={classes}
            disabled={disabled || isLoading}
            onClick={(event: MouseEvent<HTMLButtonElement>) => {
                onClick?.(event);
                onPress?.();
            }}
            {...props}
        >
            {content}
        </button>
    );
}
