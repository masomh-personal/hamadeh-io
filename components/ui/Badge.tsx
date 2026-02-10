"use client";

import { Chip } from "@heroui/react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export type BadgeColor = "primary" | "secondary" | "tertiary" | "default";

const colorMap: Record<BadgeColor, ComponentProps<typeof Chip>["color"]> = {
    primary: "accent",
    secondary: "success",
    tertiary: "warning",
    default: "default",
};

export interface BadgeProps extends Omit<ComponentProps<typeof Chip>, "color"> {
    color?: BadgeColor;
}

/**
 * Badge component using Hero UI Chip with ThoughtfulCode color mapping.
 * primary=Sky, secondary=Emerald, tertiary=Amber per styling.md.
 */
export function Badge({
    color = "default",
    size = "md",
    className,
    ...props
}: BadgeProps): React.ReactElement {
    return (
        <Chip
            color={colorMap[color]}
            size={size}
            variant="secondary"
            className={cn("font-baloo font-semibold", className)}
            {...props}
        />
    );
}
