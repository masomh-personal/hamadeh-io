"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type LinkVariant = "primary" | "secondary" | "muted";

const variantClasses: Record<LinkVariant, string> = {
    primary:
        "text-sky-500 hover:text-sky-400 hover:underline font-baloo font-semibold",
    secondary:
        "text-emerald-500 hover:text-emerald-400 hover:underline font-baloo font-semibold",
    muted: "text-slate-400 hover:text-sky-500 transition-colors font-baloo font-semibold",
};

export interface ThoughtfulLinkProps extends Omit<ComponentProps<"a">, "href"> {
    href: string;
    variant?: LinkVariant;
    external?: boolean;
}

/**
 * Link component for internal (Next.js) and external navigation.
 * Uses Next.js Link for internal routes and anchor tags for external links.
 */
export function Link({
    href,
    variant = "primary",
    external = false,
    className,
    children,
    ...props
}: ThoughtfulLinkProps): React.ReactElement {
    const classes = cn(
        variantClasses[variant],
        "underline-offset-2",
        className
    );

    if (external || href.startsWith("http") || href.startsWith("//")) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={classes}
                {...props}
            >
                {children}
            </a>
        );
    }

    return (
        <NextLink href={href} className={classes} {...props}>
            {children}
        </NextLink>
    );
}
