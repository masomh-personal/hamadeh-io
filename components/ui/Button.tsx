"use client";

import { Slot } from "@radix-ui/react-slot";
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

type ButtonClickEvent = MouseEvent<HTMLButtonElement | HTMLAnchorElement>;

export interface ThoughtfulButtonProps
    extends Omit<ComponentProps<"button">, "children" | "onClick"> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    href?: string;
    children?: React.ReactNode;
    iconSize?: IconSize;
    isLoading?: boolean;
    loadingText?: string;
    loadingIcon?: React.ReactNode;
    asChild?: boolean;
    onClick?: (event: ButtonClickEvent) => void;
}

const baseClasses =
    "rounded-sm font-semibold text-white transition-all duration-200 inline-flex items-center justify-center gap-1 " +
    "[&_svg]:block [&_svg]:shrink-0 " +
    "cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 " +
    "focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900";

function getButtonClasses({
    variant,
    size,
    iconSize,
    isLoading,
    isDisabled,
    className,
}: {
    variant: ButtonVariant;
    size: ButtonSize;
    iconSize: IconSize;
    isLoading: boolean;
    isDisabled: boolean;
    className?: string;
}): string {
    return cn(
        variantClasses[variant],
        sizeClasses[size],
        iconSizeClasses[iconSize],
        baseClasses,
        isLoading && "cursor-wait",
        isDisabled && "pointer-events-none",
        className
    );
}

function getButtonContent({
    isLoading,
    loadingIcon,
    loadingText,
    children,
}: {
    isLoading: boolean;
    loadingIcon?: React.ReactNode;
    loadingText?: string;
    children?: React.ReactNode;
}): React.ReactNode {
    if (!isLoading) {
        return children;
    }

    return (
        <>
            {loadingIcon ?? (
                <span
                    className="h-3.5 w-3.5 animate-spin rounded-full border border-current border-r-transparent"
                    aria-hidden="true"
                />
            )}
            <span>{loadingText ?? "Loading..."}</span>
        </>
    );
}

function getLinkAccessibilityProps({
    isDisabled,
    isLoading,
    onClick,
}: {
    isDisabled: boolean;
    isLoading: boolean;
    onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}): {
    "aria-disabled"?: true;
    "aria-busy"?: true;
    tabIndex?: -1;
    onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
} {
    return {
        "aria-disabled": isDisabled || undefined,
        "aria-busy": isLoading || undefined,
        tabIndex: isDisabled ? -1 : undefined,
        onClick: (event) => {
            if (isDisabled) {
                event.preventDefault();
                return;
            }

            onClick?.(event);
        },
    };
}

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
    type = "button",
    iconSize = "md",
    isLoading = false,
    loadingText,
    loadingIcon,
    children,
    asChild = false,
    ...props
}: ThoughtfulButtonProps): React.ReactElement {
    const isDisabled = Boolean(disabled || isLoading);
    const classes = getButtonClasses({
        variant,
        size,
        iconSize,
        isLoading,
        isDisabled,
        className,
    });
    const content = getButtonContent({
        isLoading,
        loadingIcon,
        loadingText,
        children,
    });
    const linkAccessibilityProps = getLinkAccessibilityProps({
        isDisabled,
        isLoading,
        onClick: (event) =>
            onClick?.(
                event as MouseEvent<HTMLButtonElement | HTMLAnchorElement>
            ),
    });

    if (asChild) {
        return (
            <Slot
                className={classes}
                aria-disabled={isDisabled || undefined}
                aria-busy={isLoading || undefined}
                data-disabled={isDisabled ? "" : undefined}
                onClick={(event: MouseEvent<HTMLElement>) => {
                    if (isDisabled) {
                        event.preventDefault();
                        return;
                    }

                    onClick?.(
                        event as MouseEvent<
                            HTMLButtonElement | HTMLAnchorElement
                        >
                    );
                }}
                {...props}
            >
                {content}
            </Slot>
        );
    }

    if (href && !href.startsWith("http")) {
        return (
            <NextLink
                href={href}
                className={classes}
                {...linkAccessibilityProps}
            >
                {content}
            </NextLink>
        );
    }

    if (href) {
        return (
            <a href={href} className={classes} {...linkAccessibilityProps}>
                {content}
            </a>
        );
    }

    return (
        <button
            type={type}
            className={classes}
            disabled={isDisabled}
            aria-busy={isLoading || undefined}
            onClick={(event: MouseEvent<HTMLButtonElement>) => onClick?.(event)}
            {...props}
        >
            {content}
        </button>
    );
}
