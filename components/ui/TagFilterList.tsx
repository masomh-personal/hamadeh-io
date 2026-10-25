import type { Route } from "next";
import NextLink from "next/link";
import { FaTag } from "react-icons/fa6";
import { cn } from "@/lib/utils";

export interface TagFilterOption {
    /** Raw tag value passed back to `getTagHref`. */
    value: string;
    /** Display label (e.g. uppercased, formatted). */
    label: string;
    /** Foreground hex color for the icon, border, and active text. */
    color: string;
    /** Background hex color (semi-transparent) used when active. */
    bgColor: string;
    /** Number of items that carry this tag. */
    count: number;
}

interface TagFilterListProps {
    tags: TagFilterOption[];
    /** The selected tag value, or `null` when showing everything. */
    activeTag: string | null;
    /** Count shown beside the "All" entry. */
    totalCount: number;
    /** Resolves the destination for a tag, or for "All" when given `null`. */
    getTagHref: (tag: string | null) => Route;
    className?: string;
}

const itemBase =
    "inline-flex shrink-0 snap-start items-center gap-2 rounded-full border px-3 py-2 font-baloo text-xs font-semibold uppercase leading-none tracking-[0.03em] whitespace-nowrap transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 lg:flex lg:w-full lg:justify-between lg:rounded-md";
const itemIdle =
    "border-surface-outline/60 text-content-subtle hover:bg-white/5 hover:text-content lg:border-transparent";

/**
 * Single-select tag filter made of real links, so the selection lives in the
 * URL. A horizontally scrolling row of pills on small screens and a vertical
 * list with counts on large ones. Callers resolve label and color first.
 */
export function TagFilterList({
    tags,
    activeTag,
    totalCount,
    getTagHref,
    className,
}: TagFilterListProps): React.ReactElement | null {
    if (tags.length === 0) {
        return null;
    }

    const isAllActive = activeTag === null;

    return (
        <nav aria-label="Filter by topic" className={className}>
            <ul className="flex snap-x gap-2 overflow-x-auto pb-1 [scrollbar-width:none] lg:flex-col lg:gap-0.5 lg:overflow-visible lg:pb-0">
                <li className="contents">
                    <NextLink
                        href={getTagHref(null)}
                        scroll={false}
                        aria-current={isAllActive ? "true" : undefined}
                        className={cn(
                            itemBase,
                            isAllActive
                                ? "border-white/30 bg-white/10 text-white"
                                : itemIdle
                        )}
                    >
                        All
                        <span className="text-content-subtle font-mono text-[0.65rem]">
                            {totalCount}
                        </span>
                    </NextLink>
                </li>
                {tags.map(({ value, label, color, bgColor, count }) => {
                    const isActive = value === activeTag;

                    return (
                        <li key={value} className="contents">
                            <NextLink
                                href={getTagHref(value)}
                                scroll={false}
                                aria-current={isActive ? "true" : undefined}
                                className={cn(itemBase, !isActive && itemIdle)}
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
                                    <FaTag
                                        aria-hidden="true"
                                        className="h-2.75 w-2.75 shrink-0"
                                        style={{ color }}
                                    />
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
