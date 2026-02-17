"use client";

import { Slot } from "@radix-ui/react-slot";
import NextLink from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import {
    mergeRel,
    shouldOpenInNewTab,
    shouldUseNativeAnchor,
} from "./component-utils";

type LinkVariant = "primary" | "secondary" | "muted";

const variantClasses: Record<LinkVariant, string> = {
    primary:
        "text-primary hover:text-primary-hover hover:underline font-heading font-semibold",
    secondary:
        "text-secondary hover:text-secondary-hover hover:underline font-heading font-semibold",
    muted: "text-muted hover:text-primary transition-colors font-heading font-semibold",
};

export interface ThoughtfulLinkProps extends Omit<ComponentProps<"a">, "href"> {
    href: string;
    variant?: LinkVariant;
    external?: boolean;
    asChild?: boolean;
}

/**
 * Link component for internal (Next.js) and external navigation.
 * Uses Next.js Link for internal routes and anchor tags for external links.
 */
export function Link({
    href,
    variant = "primary",
    external = false,
    asChild = false,
    className,
    children,
    rel,
    ...props
}: ThoughtfulLinkProps): React.ReactElement {
    const classes = cn(
        variantClasses[variant],
        "underline-offset-2",
        className
    );
    const useNativeAnchor = external || shouldUseNativeAnchor(href);
    const openInNewTab = external || shouldOpenInNewTab(href);

    if (asChild) {
        return (
            <Slot className={classes} {...props}>
                {children}
            </Slot>
        );
    }

    if (useNativeAnchor) {
        return (
            <a
                href={href}
                target={openInNewTab ? "_blank" : undefined}
                rel={openInNewTab ? mergeRel(rel) : rel}
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
