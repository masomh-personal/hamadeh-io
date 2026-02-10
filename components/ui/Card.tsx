"use client";

import { Card as HeroCard } from "@heroui/react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const baseClasses = "rounded-md border-2 border-slate-700 bg-slate-800 p-6";

export type ThoughtfulCardProps = ComponentProps<typeof HeroCard>;

/**
 * Card component using Hero UI with ThoughtfulCode design system.
 * Dark slate background, slate-700 borders per styling.md.
 * Use Card.Header, Card.Title, Card.Description, Card.Content, Card.Footer.
 */
export const Card = Object.assign(
    function Card({
        variant = "default",
        className,
        ...props
    }: ThoughtfulCardProps): React.ReactElement {
        return (
            <HeroCard
                variant={variant}
                className={cn(baseClasses, className)}
                {...props}
            />
        );
    },
    {
        Header: HeroCard.Header,
        Title: HeroCard.Title,
        Description: HeroCard.Description,
        Content: HeroCard.Content,
        Footer: HeroCard.Footer,
    }
);
