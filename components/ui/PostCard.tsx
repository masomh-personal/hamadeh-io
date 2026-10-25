import type { Route } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { NavigationOverlay } from "@/components/layout/NavigationOverlay";
import { formatReadingTime } from "@/lib/reading-time";
import { cn } from "@/lib/utils";

interface PostCardProps {
    href: Route;
    /** Small icon shown beside the reading time. */
    icon: ReactNode;
    readingTimeMinutes: number;
    title: string;
    excerpt: string;
    /** Shown when a click starts navigating, from inside the link. */
    overlayMessage: string;
    /** Optional right-aligned slot in the meta row, such as a difficulty badge. */
    headerTrailing?: ReactNode;
    /** Optional block pinned to the bottom of the card, such as tag badges. */
    footer?: ReactNode;
    /**
     * Problem titles reserve two lines so cards line up across the grid. Blog
     * titles do not, because their length varies far more.
     */
    titleClassName?: string;
}

/**
 * Shared shell for the blog and problem list cards: an entire card that is one
 * link, with a meta row, title, clamped excerpt, and an optional footer.
 */
export function PostCard({
    href,
    icon,
    readingTimeMinutes,
    title,
    excerpt,
    overlayMessage,
    headerTrailing,
    footer,
    titleClassName,
}: PostCardProps): React.ReactElement {
    return (
        <Link
            href={href}
            prefetch={false}
            className="surface-card radius-card card-chrome card-hover flex h-full flex-col p-4 text-content transition-all sm:p-5"
        >
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5">
                    {icon}
                    <p className="text-content-subtle font-mono text-xs uppercase tracking-wide">
                        {formatReadingTime(readingTimeMinutes)}
                    </p>
                </div>
                {headerTrailing}
            </div>

            <h2
                className={cn(
                    "font-heading mt-2 text-xl font-semibold text-white",
                    titleClassName
                )}
            >
                {title}
            </h2>

            <p className="text-content-subtle mt-2 line-clamp-3 text-sm leading-relaxed">
                {excerpt}
            </p>

            {footer ? <div className="mt-auto pt-4">{footer}</div> : null}
            <NavigationOverlay message={overlayMessage} />
        </Link>
    );
}
