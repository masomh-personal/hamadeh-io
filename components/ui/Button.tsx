"use client";

import { type ButtonProps, Button as HeroButton } from "@heroui/react";
import NextLink from "next/link";
import { cn } from "@/lib/utils";

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary:
        "bg-sky-500 border-2 border-transparent hover:border-sky-300 hover:bg-sky-400 font-baloo",
    secondary:
        "border-[3px] border-slate-600 bg-transparent text-slate-300 hover:border-sky-500 hover:bg-sky-950/20 hover:text-sky-400 font-baloo",
    tertiary:
        "bg-emerald-500 border-2 border-transparent hover:border-emerald-300 hover:bg-emerald-400 font-baloo",
    outline:
        "border-[3px] border-slate-600 bg-transparent text-slate-300 hover:border-sky-500 hover:bg-sky-950/20 hover:text-sky-400 font-baloo",
    ghost: "bg-transparent text-slate-400 hover:bg-slate-800 hover:text-sky-500 font-baloo",
    danger: "bg-red-500 border-2 border-transparent hover:border-red-400 hover:bg-red-400 font-baloo",
    "danger-soft":
        "bg-red-500/20 text-red-400 border border-red-400/30 hover:bg-red-500/30 font-baloo",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
    sm: "text-sm px-4 py-2",
    md: "text-base px-6 py-3",
    lg: "text-lg px-8 py-4",
};

export interface ThoughtfulButtonProps
    extends Omit<ButtonProps, "href" | "children"> {
    variant?: ButtonProps["variant"];
    size?: ButtonProps["size"];
    href?: string;
    children?: React.ReactNode;
}

const baseClasses =
    "rounded-md font-semibold text-white transition-all duration-200 inline-flex items-center justify-center gap-2 " +
    "focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900";

/**
 * Button component using Hero UI with ThoughtfulCode design system overrides.
 * Primary = Sky, Secondary = Outline slate, Tertiary = Emerald.
 * Pass href to render as Next.js Link.
 */
export function Button({
    variant = "primary",
    size = "md",
    className,
    href,
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

    return (
        <HeroButton
            variant={variant}
            size={size}
            className={classes}
            {...props}
        >
            {children}
        </HeroButton>
    );
}
