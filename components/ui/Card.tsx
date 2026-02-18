"use client";

import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button, type ThoughtfulButtonProps } from "./Button";

const cardChromeClasses = "card-chrome";
const cardHoverClasses = "card-hover";
const cardHoverTransparentClasses = "card-hover-transparent";
const baseClasses =
    "surface-card radius-card flex h-full flex-col p-3 text-content sm:p-4";
type CardVariant = "default" | "transparent" | "secondary" | "tertiary";
const variantClasses: Record<CardVariant, string> = {
    default: "",
    transparent: "bg-transparent",
    secondary: "surface-card-strong",
    tertiary: "surface-panel",
};
type CardActionBase = Omit<
    ThoughtfulButtonProps,
    "children" | "variant" | "enforceMinWidth"
>;

type CardActionWithTextLabel = CardActionBase & {
    label: string;
};

type CardActionWithCustomLabel = CardActionBase & {
    label: ReactNode;
    "aria-label": string;
};

type CardAction = CardActionWithTextLabel | CardActionWithCustomLabel;

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
    subtitleMaxLength = 80,
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
    const subtitleText = typeof subtitle === "string" ? subtitle : undefined;
    const isSubtitleTruncated =
        typeof subtitleText === "string" &&
        subtitleText.length > subtitleMaxLength;
    const resolvedSubtitle = isSubtitleTruncated
        ? `${subtitleText?.slice(0, subtitleMaxLength).trimEnd()}...`
        : subtitle;

    return (
        <article
            className={cn(
                baseClasses,
                cardChromeClasses,
                cardHoverClasses,
                variant === "transparent" && cardHoverTransparentClasses,
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
                    <div className="group/subtitle relative mt-1.5">
                        <p
                            className="text-content-subtle [display:-webkit-box] overflow-hidden text-xs leading-relaxed [-webkit-box-orient:vertical] [-webkit-line-clamp:2]"
                            title={
                                isSubtitleTruncated ? subtitleText : undefined
                            }
                        >
                            {resolvedSubtitle}
                        </p>
                        {isSubtitleTruncated && subtitleText ? (
                            <span
                                role="tooltip"
                                className="surface-panel pointer-events-none absolute top-full left-0 z-20 mt-2 max-w-[18rem] rounded-md border border-slate-400/70 px-2 py-1 text-[0.7rem] leading-snug text-slate-200 opacity-0 shadow-[0_8px_20px_rgba(2,6,23,0.45)] transition-opacity duration-150 group-hover/subtitle:opacity-100"
                            >
                                {subtitleText}
                            </span>
                        ) : null}
                    </div>
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
                                            : `${actionProps["aria-label"]}-${index}`
                                    }
                                    size="sm"
                                    enforceMinWidth={false}
                                    variant={variantForPosition}
                                    className={cn(
                                        "w-full whitespace-nowrap text-center text-[0.75rem] leading-none tracking-[0.038em]",
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
