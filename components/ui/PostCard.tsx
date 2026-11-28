import type { Route } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { formatReadingTime } from "@/lib/reading-time";
import { cn } from "@/lib/utils";

interface PostCardProps {
    href: Route;
    /** Small icon shown beside the reading time. */
    icon: ReactNode;
    readingTimeMinutes: number;
    title: string;
    excerpt: string;
    /** Optional right-aligned slot in the meta row, such as a difficulty badge. */
    headerTrailing?: ReactNode;
    /** Optional block pinned to the bottom of the card, such as tag badges. */
    footer?: ReactNode;
    /**
     * Problem titles reserve two lines so cards line up across the grid. Blog
     * titles do not, because their length varies far more.
     */
    titleClassName?: string;
    /** Heading level for the card title. Defaults to `h2`. */
    headingAs?: "h2" | "h3";
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
    headerTrailing,
    footer,
    titleClassName,
    headingAs = "h2",
}: PostCardProps): React.ReactElement {
    const Heading = headingAs;

    return (
        <Link
            href={href}
            className="surface-card radius-card card-chrome card-hover group flex h-full flex-col p-4 text-content sm:p-5"
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

            <Heading
                className={cn(
                    "font-heading mt-2 text-xl font-semibold text-white transition-colors duration-200 group-hover:text-sky-200",
                    titleClassName
                )}
            >
                {title}
            </Heading>

            <p className="text-content-subtle mt-2 line-clamp-3 text-sm leading-relaxed">
                {excerpt}
            </p>

            {footer ? <div className="mt-auto pt-4">{footer}</div> : null}
        </Link>
    );
}
