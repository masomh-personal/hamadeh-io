import type { Route } from "next";
import NextLink from "next/link";
import { FaTag } from "react-icons/fa6";
import { cn } from "@/lib/utils";

export interface FilterOption {
    /** Raw value passed back to `getHref`. */
    value: string;
    /** Display label (e.g. uppercased, formatted). */
    label: string;
    /** Foreground hex color for the marker, border, and active text. */
    color: string;
    /** Background hex color (semi-transparent) used when active. */
    bgColor: string;
    /** Number of items that match this option. */
    count: number;
}

interface FilterListProps {
    options: FilterOption[];
    /** The selected option value, or `null` when showing everything. */
    activeValue: string | null;
    /** Count shown beside the "All" entry. */
    totalCount: number;
    /** Resolves the destination for an option, or for "All" when given `null`. */
    getHref: (value: string | null) => Route;
    /** Accessible name for the navigation landmark. */
    ariaLabel: string;
    /**
     * `responsive` scrolls a row of pills on small screens and stacks a list
     * with counts from `lg` up. `row` scrolls on the smallest screens and wraps
     * from `sm` up, for short lists that do not need a sidebar.
     */
    orientation?: "responsive" | "row";
    /** Leading mark on each option: a tag icon or a plain dot. */
    marker?: "tag" | "dot";
    className?: string;
}

const itemBase =
    "inline-flex shrink-0 snap-start items-center gap-2 rounded-full border px-3 py-2 font-baloo text-xs font-semibold uppercase leading-none tracking-[0.03em] whitespace-nowrap transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900";
const itemIdle =
    "border-surface-outline/60 text-content-subtle hover:bg-white/5 hover:text-content";

/**
 * Single-select filter made of real links, so the selection lives in the URL.
 * Callers resolve label and color first.
 */
export function FilterList({
    options,
    activeValue,
    totalCount,
    getHref,
    ariaLabel,
    orientation = "responsive",
    marker = "tag",
    className,
}: FilterListProps): React.ReactElement | null {
    if (options.length === 0) {
        return null;
    }

    const isStacked = orientation === "responsive";
    const isAllActive = activeValue === null;
    const itemLayout = isStacked
        ? "lg:flex lg:w-full lg:justify-between lg:rounded-md"
        : undefined;
    const idleLayout = isStacked ? "lg:border-transparent" : undefined;

    return (
        <nav aria-label={ariaLabel} className={className}>
            <ul
                className={cn(
                    "flex gap-2",
                    isStacked
                        ? "snap-x overflow-x-auto pb-1 [scrollbar-width:none] lg:flex-col lg:gap-0.5 lg:overflow-visible lg:pb-0"
                        : "snap-x overflow-x-auto pb-1 [scrollbar-width:none] sm:flex-wrap sm:overflow-visible sm:pb-0"
                )}
            >
                <li className="contents">
                    <NextLink
                        href={getHref(null)}
                        scroll={false}
                        aria-current={isAllActive ? "true" : undefined}
                        className={cn(
                            itemBase,
                            itemLayout,
                            isAllActive
                                ? "border-white/30 bg-white/10 text-white"
                                : cn(itemIdle, idleLayout)
                        )}
                    >
                        All
                        <span className="text-content-subtle font-mono text-[0.65rem]">
                            {totalCount}
                        </span>
                    </NextLink>
                </li>
                {options.map(({ value, label, color, bgColor, count }) => {
                    const isActive = value === activeValue;

                    return (
                        <li key={value} className="contents">
                            <NextLink
                                href={getHref(value)}
                                scroll={false}
                                aria-current={isActive ? "true" : undefined}
                                className={cn(
                                    itemBase,
                                    itemLayout,
                                    !isActive && cn(itemIdle, idleLayout)
                                )}
                                style={
                                    isActive
                                        ? {
                                              borderColor: color,
                                              color,
                                              backgroundColor: bgColor,
                                          }
                                        : undefined
                                }
                            >
                                <span className="inline-flex items-center gap-1.5">
                                    {marker === "tag" ? (
                                        <FaTag
                                            aria-hidden="true"
                                            className="h-2.75 w-2.75 shrink-0"
                                            style={{ color }}
                                        />
                                    ) : (
                                        <span
                                            aria-hidden="true"
                                            className="size-2 shrink-0 rounded-full"
                                            style={{ backgroundColor: color }}
                                        />
                                    )}
                                    {label}
                                </span>
                                <span className="font-mono text-[0.65rem] opacity-70">
                                    {count}
                                </span>
                            </NextLink>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
