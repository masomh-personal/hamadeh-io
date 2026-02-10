"use client";

import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const baseClasses = "rounded-md border-2 border-slate-600 bg-slate-800 p-5";
const variantClasses = {
    default: "",
    transparent: "bg-transparent",
    secondary: "bg-slate-800/90",
    tertiary: "bg-slate-700/70 border-slate-500",
} as const;

export interface ThoughtfulCardProps extends ComponentProps<"div"> {
    variant?: keyof typeof variantClasses;
}
type CardHeaderProps = ComponentProps<"div">;
type CardTitleProps = ComponentProps<"h3">;
type CardDescriptionProps = ComponentProps<"p">;
type CardContentProps = ComponentProps<"div">;
type CardFooterProps = ComponentProps<"div">;

/**
 * Card component with ThoughtfulCode design system.
 * Dark slate background and medium slate borders.
 * Use Card.Header, Card.Title, Card.Description, Card.Content, Card.Footer.
 */
export const Card = Object.assign(
    function Card({
        variant = "default",
        className,
        ...props
    }: ThoughtfulCardProps): React.ReactElement {
        return (
            <div
                className={cn(baseClasses, variantClasses[variant], className)}
                {...props}
            />
        );
    },
    {
        Header: function CardHeader({
            className,
            ...props
        }: CardHeaderProps): React.ReactElement {
            return <div className={cn("pb-3", className)} {...props} />;
        },
        Title: function CardTitle({
            className,
            ...props
        }: CardTitleProps): React.ReactElement {
            return (
                <h3
                    className={cn(
                        "text-xl font-semibold text-slate-100",
                        className
                    )}
                    {...props}
                />
            );
        },
        Description: function CardDescription({
            className,
            ...props
        }: CardDescriptionProps): React.ReactElement {
            return <p className={cn("text-slate-400", className)} {...props} />;
        },
        Content: function CardContent({
            className,
            ...props
        }: CardContentProps): React.ReactElement {
            return (
                <div
                    className={cn("pt-1 text-slate-300", className)}
                    {...props}
                />
            );
        },
        Footer: function CardFooter({
            className,
            ...props
        }: CardFooterProps): React.ReactElement {
            return (
                <div
                    className={cn("pt-3 text-slate-300", className)}
                    {...props}
                />
            );
        },
    }
);
