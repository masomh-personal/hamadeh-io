import NextLink from "next/link";
import { HiArrowLeft, HiArrowRight, HiBan } from "react-icons/hi";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

interface PaginationNavProps {
    currentPage: number;
    totalPages: number;
    getPageHref: (page: number) => string;
    className?: string;
}

type PageSlot =
    | { type: "page"; page: number }
    | { type: "ellipsis"; key: string };

function getVisiblePages(currentPage: number, totalPages: number): PageSlot[] {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => ({
            type: "page" as const,
            page: i + 1,
        }));
    }

    const slots: PageSlot[] = [{ type: "page", page: 1 }];

    if (currentPage > 3) {
        slots.push({ type: "ellipsis", key: "ellipsis-start" });
    }

    const rangeStart = Math.max(2, currentPage - 1);
    const rangeEnd = Math.min(totalPages - 1, currentPage + 1);

    for (let i = rangeStart; i <= rangeEnd; i++) {
        slots.push({ type: "page", page: i });
    }

    if (currentPage < totalPages - 2) {
        slots.push({ type: "ellipsis", key: "ellipsis-end" });
    }

    slots.push({ type: "page", page: totalPages });

    return slots;
}

export function PaginationNav({
    currentPage,
    totalPages,
    getPageHref,
    className,
}: PaginationNavProps): React.ReactElement | null {
    if (totalPages <= 1) {
        return null;
    }

    const hasPrevious = currentPage > 1;
    const hasNext = currentPage < totalPages;
    const visiblePages = getVisiblePages(currentPage, totalPages);

    const itemBase =
        "inline-flex items-center justify-center rounded-md text-xs font-extrabold transition-colors duration-150";
    const itemSize = "h-8 min-w-7 px-1.5";
    const itemInteractive =
        "hover:bg-slate-700/60 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900";
    const buttonPadding = "px-3.5";
    const disabledDim = "opacity-40";

    return (
        <nav
            aria-label="Pagination"
            className={cn("flex justify-center", className)}
        >
            <ul className="flex items-center gap-1">
                <li className="mr-1.5">
                    <Button
                        href={getPageHref(currentPage - 1)}
                        variant={hasPrevious ? "secondary" : "outline"}
                        size="xs"
                        disabled={!hasPrevious}
                        icon={hasPrevious ? <HiArrowLeft /> : <HiBan />}
                        iconPosition="left"
                        enforceMinWidth={false}
                        className={cn(
                            buttonPadding,
                            !hasPrevious && disabledDim
                        )}
                    >
                        Previous
                    </Button>
                </li>

                {visiblePages.map((slot) => {
                    if (slot.type === "ellipsis") {
                        return (
                            <li
                                key={slot.key}
                                aria-hidden="true"
                                className={cn(
                                    itemBase,
                                    itemSize,
                                    "cursor-default text-slate-500"
                                )}
                            >
                                &hellip;
                            </li>
                        );
                    }

                    const isCurrent = slot.page === currentPage;

                    return (
                        <li key={slot.page}>
                            <NextLink
                                href={getPageHref(slot.page)}
                                aria-current={isCurrent ? "page" : undefined}
                                className={cn(
                                    itemBase,
                                    itemSize,
                                    isCurrent
                                        ? "border border-primary/50 bg-primary/15 text-white shadow-[0_0_0_1px_rgba(56,189,248,0.15)]"
                                        : cn(itemInteractive, "text-slate-400")
                                )}
                            >
                                {slot.page}
                            </NextLink>
                        </li>
                    );
                })}

                <li className="ml-1.5">
                    <Button
                        href={getPageHref(currentPage + 1)}
                        variant={hasNext ? "tertiary" : "outline"}
                        size="xs"
                        disabled={!hasNext}
                        icon={hasNext ? <HiArrowRight /> : <HiBan />}
                        iconPosition="right"
                        enforceMinWidth={false}
                        className={cn(buttonPadding, !hasNext && disabledDim)}
                    >
                        Next
                    </Button>
                </li>
            </ul>
        </nav>
    );
}
