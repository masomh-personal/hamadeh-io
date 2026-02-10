"use client";

import { Link as HeroLink } from "@heroui/react";
import NextLink from "next/link";
import { cn } from "@/lib/utils";

type LinkVariant = "primary" | "secondary" | "muted";

const variantClasses: Record<LinkVariant, string> = {
    primary:
        "text-sky-500 hover:text-sky-400 hover:underline font-baloo font-semibold",
    secondary:
        "text-emerald-500 hover:text-emerald-400 hover:underline font-baloo font-semibold",
    muted: "text-slate-400 hover:text-sky-500 transition-colors font-baloo font-semibold",
};

export interface ThoughtfulLinkProps
    extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
    href: string;
    variant?: LinkVariant;
    external?: boolean;
}

/**
 * Link component for internal (Next.js) and external navigation.
 * Uses Next.js Link for internal routes, Hero UI Link for external.
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
            <HeroLink
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={classes}
            >
                {children}
            </HeroLink>
        );
    }

    return (
        <NextLink href={href} className={classes} {...props}>
            {children}
        </NextLink>
    );
}
