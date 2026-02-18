"use client";

import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button, type ThoughtfulButtonProps } from "./Button";

const cardChromeClasses =
    "relative overflow-hidden border-slate-300/95 shadow-[0_10px_26px_rgba(2,6,23,0.32)] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:bg-linear-to-b before:from-white/[0.045] before:to-transparent before:opacity-90 after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:ring-1 after:ring-white/5";
const cardHoverClasses =
    "transition-[box-shadow,border-color,transform] duration-200 ease-out motion-reduce:transition-none hover:-translate-y-px hover:border-slate-200/95 hover:shadow-[0_16px_34px_rgba(2,6,23,0.42)]";
const baseClasses =
    "surface-card radius-card flex h-full flex-col p-3 text-content sm:p-4";
type CardVariant = "default" | "transparent" | "secondary" | "tertiary";
const variantClasses: Record<CardVariant, string> = {
    default: "",
    transparent: "bg-transparent",
    secondary: "surface-card-strong",
    tertiary: "surface-panel",
};
type CardAction = Omit<
    ThoughtfulButtonProps,
    "children" | "variant" | "enforceMinWidth"
> & {
    label: ReactNode;
};

type CardActions = [] | [CardAction] | [CardAction, CardAction];

export interface ThoughtfulCardProps
    extends Omit<ComponentProps<"article">, "children" | "title"> {
    title: ReactNode;
    subtitle?: ReactNode;
    subtitleMaxLength?: number;
    icon?: ReactNode;
    iconClassName?: string;
    actions?: CardActions;
    children: ReactNode;
    variant?: CardVariant;
}

/**
 * Generic Card component with fixed structure:
 * title (+ optional icon), optional subtitle, always-on divider, body content,
 * and optional 0-2 actions.
 */
export function Card({
    title,
    subtitle,
    subtitleMaxLength = 110,
    icon,
    iconClassName,
    actions,
    variant = "default",
    className,
    children,
    ...props
}: ThoughtfulCardProps): React.ReactElement {
    const visibleActions = actions ?? [];
    const hasActions = visibleActions.length;
    const hasTwoActions = visibleActions.length === 2;
    const resolvedSubtitle =
        typeof subtitle === "string" && subtitle.length > subtitleMaxLength
            ? `${subtitle.slice(0, subtitleMaxLength).trimEnd()}...`
            : subtitle;

    return (
        <article
            className={cn(
                baseClasses,
                cardChromeClasses,
                cardHoverClasses,
                variantClasses[variant],
                className
            )}
            {...props}
        >
            <header className="relative z-10 shrink-0">
                <h3 className="font-heading flex items-center gap-1 text-xl font-semibold text-white">
                    {icon ? (
                        <span
                            aria-hidden="true"
                            className={cn(
                                "text-content-muted shrink-0 [&_svg]:h-5 [&_svg]:w-5",
                                iconClassName
                            )}
                        >
                            {icon}
                        </span>
                    ) : null}
                    <span>{title}</span>
                </h3>
                {resolvedSubtitle ? (
                    <p className="text-content-subtle mt-1.5 text-xs leading-relaxed">
                        {resolvedSubtitle}
                    </p>
                ) : null}
            </header>

            <div className="relative z-10 my-2.5 border-b border-surface-outline/80" />

            <div className="text-content relative z-10 flex flex-1 items-center">
                {children}
            </div>

            {hasActions ? (
                <div className="relative z-10 pt-3">
                    <div
                        className={cn(
                            hasTwoActions
                                ? "grid grid-cols-2 gap-2"
                                : "flex w-full"
                        )}
                    >
                        {visibleActions.map((action, index) => {
                            const variantForPosition =
                                hasTwoActions && index === 1
                                    ? "secondary"
                                    : "primary";
                            const {
                                label,
                                className: actionClassName,
                                ...actionProps
                            } = action;

                            return (
                                <Button
                                    key={
                                        typeof label === "string"
                                            ? `${label}-${index}`
                                            : `action-${index}`
                                    }
                                    size="sm"
                                    enforceMinWidth={false}
                                    variant={variantForPosition}
                                    className={cn(
                                        "w-full text-[0.75rem] tracking-[0.038em]",
                                        actionClassName
                                    )}
                                    {...actionProps}
                                >
                                    {label}
                                </Button>
                            );
                        })}
                    </div>
                </div>
            ) : null}
        </article>
    );
}
