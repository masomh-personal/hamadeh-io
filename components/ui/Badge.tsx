import type { ComponentProps, ReactNode } from "react";
import { FaTag } from "react-icons/fa6";
import { cn } from "@/lib/utils";

type BadgeStyle =
    | "primary"
    | "secondary"
    | "tertiary"
    | "brand"
    | "error"
    | "tag-primary"
    | "tag-secondary"
    | "tag-tertiary"
    | "tag-brand"
    | "tag-error"
    | "leetcode-easy"
    | "leetcode-medium"
    | "leetcode-hard";
type BadgeTone = "soft" | "outline" | "solid";

const colorClassesByTone = {
    soft: {
        primary: "border-sky-500/80 text-sky-300 bg-sky-500/12",
        secondary: "border-emerald-500/80 text-emerald-300 bg-emerald-500/12",
        tertiary: "border-amber-400/85 text-amber-300 bg-amber-400/14",
        brand: "border-slate-500/80 text-slate-300 bg-slate-500/12",
        error: "border-rose-500/80 text-rose-300 bg-rose-500/12",
        "tag-primary":
            "border-sky-400/70 text-sky-200 bg-sky-500/8 shadow-[inset_0_0_0_1px_rgba(56,189,248,0.16)]",
        "tag-secondary":
            "border-emerald-400/70 text-emerald-200 bg-emerald-500/8 shadow-[inset_0_0_0_1px_rgba(16,185,129,0.16)]",
        "tag-tertiary":
            "border-amber-400/70 text-amber-200 bg-amber-500/8 shadow-[inset_0_0_0_1px_rgba(245,158,11,0.16)]",
        "tag-brand":
            "border-slate-400/70 text-slate-200 bg-slate-400/8 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.16)]",
        "tag-error":
            "border-rose-400/70 text-rose-200 bg-rose-500/8 shadow-[inset_0_0_0_1px_rgba(244,63,94,0.16)]",
        "leetcode-easy": "border-[#00B8A3]/80 text-[#00D3BC] bg-[#00B8A3]/14",
        "leetcode-medium": "border-[#FFC01E]/80 text-[#FFD35E] bg-[#FFC01E]/14",
        "leetcode-hard": "border-[#FF375F]/80 text-[#FF6B88] bg-[#FF375F]/14",
    },
    outline: {
        primary: "border-sky-500/90 text-sky-300 bg-transparent",
        secondary: "border-emerald-500/90 text-emerald-300 bg-transparent",
        tertiary: "border-amber-400/95 text-amber-300 bg-transparent",
        brand: "border-slate-500/90 text-slate-300 bg-transparent",
        error: "border-rose-500/90 text-rose-300 bg-transparent",
        "tag-primary":
            "border-sky-400/80 text-sky-200 bg-transparent shadow-[inset_0_0_0_1px_rgba(56,189,248,0.1)]",
        "tag-secondary":
            "border-emerald-400/80 text-emerald-200 bg-transparent shadow-[inset_0_0_0_1px_rgba(16,185,129,0.1)]",
        "tag-tertiary":
            "border-amber-400/80 text-amber-200 bg-transparent shadow-[inset_0_0_0_1px_rgba(245,158,11,0.1)]",
        "tag-brand":
            "border-slate-400/80 text-slate-200 bg-transparent shadow-[inset_0_0_0_1px_rgba(148,163,184,0.1)]",
        "tag-error":
            "border-rose-400/80 text-rose-200 bg-transparent shadow-[inset_0_0_0_1px_rgba(244,63,94,0.1)]",
        "leetcode-easy": "border-[#00B8A3]/90 text-[#00D3BC] bg-transparent",
        "leetcode-medium": "border-[#FFC01E]/90 text-[#FFD35E] bg-transparent",
        "leetcode-hard": "border-[#FF375F]/90 text-[#FF6B88] bg-transparent",
    },
    solid: {
        primary: "border-sky-300/70 bg-sky-500/90 text-slate-950",
        secondary: "border-emerald-300/70 bg-emerald-500/90 text-slate-950",
        tertiary: "border-amber-200/75 bg-amber-400/95 text-slate-950",
        brand: "border-slate-300/70 bg-slate-500/90 text-slate-950",
        error: "border-rose-200/75 bg-rose-500/90 text-white",
        "tag-primary": "border-sky-300/70 bg-sky-500/90 text-slate-950",
        "tag-secondary":
            "border-emerald-300/70 bg-emerald-500/90 text-slate-950",
        "tag-tertiary": "border-amber-300/70 bg-amber-500/90 text-slate-950",
        "tag-brand": "border-slate-300/70 bg-slate-500/90 text-slate-950",
        "tag-error": "border-rose-300/70 bg-rose-500/90 text-white",
        "leetcode-easy": "border-[#6FF3DF]/65 bg-[#00B8A3] text-slate-950",
        "leetcode-medium": "border-[#FFE08C]/65 bg-[#FFC01E] text-slate-950",
        "leetcode-hard": "border-[#FF9DB2]/65 bg-[#FF375F] text-white",
    },
} as const satisfies Record<BadgeTone, Record<BadgeStyle, string>>;

const sizeClasses = {
    sm: "px-2.5 py-1 text-[0.6875rem] leading-[1.1]",
    md: "px-3 py-1.5 text-xs leading-[1.1]",
    lg: "px-3.5 py-2 text-sm leading-[1.1]",
} as const;

const iconSizeClasses = {
    sm: "h-3.5 w-3.5 [&_svg]:h-3.5 [&_svg]:w-3.5 [&_svg]:block",
    md: "h-3.5 w-3.5 [&_svg]:h-3.5 [&_svg]:w-3.5 [&_svg]:block",
    lg: "h-3.5 w-3.5 [&_svg]:h-3.5 [&_svg]:w-3.5 [&_svg]:block",
} as const;

const tagIconSizeClasses = {
    sm: "h-[0.6875rem] w-[0.6875rem] [&_svg]:h-[0.6875rem] [&_svg]:w-[0.6875rem] [&_svg]:block",
    md: "h-3 w-3 [&_svg]:h-3 [&_svg]:w-3 [&_svg]:block",
    lg: "h-[0.8125rem] w-[0.8125rem] [&_svg]:h-[0.8125rem] [&_svg]:w-[0.8125rem] [&_svg]:block",
} as const;

const tagPaddingClasses = {
    sm: "px-2 py-1.5",
    md: "px-2.5 py-1.5",
    lg: "px-3 py-2",
} as const;

export interface BadgeProps extends Omit<ComponentProps<"span">, "children"> {
    text: string;
    icon?: ReactNode;
    iconPosition?: "left" | "right";
    variant?: BadgeStyle;
    tone?: BadgeTone;
    size?: keyof typeof sizeClasses;
}

/**
 * Badge component with hamadeh.io design system.
 */
export function Badge({
    text,
    icon,
    iconPosition = "left",
    variant = "brand",
    tone = "soft",
    size = "md",
    className,
    ...props
}: BadgeProps): React.ReactElement {
    const resolvedToneClasses = colorClassesByTone[tone][variant];
    const isTagVariant = variant.startsWith("tag-");
    const tagPrefix = isTagVariant ? (
        <span
            aria-hidden="true"
            className={cn(
                "inline-flex shrink-0 self-center items-center justify-center leading-none opacity-90",
                tagIconSizeClasses[size]
            )}
        >
            <FaTag />
        </span>
    ) : null;
    const iconElement = icon ? (
        <span
            aria-hidden="true"
            className={cn(
                "inline-flex shrink-0 items-center justify-center leading-none",
                iconSizeClasses[size]
            )}
        >
            {icon}
        </span>
    ) : null;

    return (
        <span
            className={cn(
                "inline-flex items-center rounded-md border font-baloo font-semibold uppercase tracking-[0.03em] whitespace-nowrap",
                isTagVariant ? "gap-[0.28rem]" : "gap-1",
                resolvedToneClasses,
                sizeClasses[size],
                isTagVariant && tagPaddingClasses[size],
                className
            )}
            {...props}
        >
            {tagPrefix}
            {iconElement && iconPosition === "left" ? iconElement : null}
            <span
                className={cn(
                    isTagVariant ? "leading-[1.05]" : "leading-[1.1]"
                )}
            >
                {text}
            </span>
            {iconElement && iconPosition === "right" ? iconElement : null}
        </span>
    );
}
