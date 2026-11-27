import type { Route } from "next";
import {
    Button,
    FilterList,
    type FilterOption,
    PaginationNav,
} from "@/components/ui";
import type { BlogBodyIndex } from "@/lib/blog-search";
import type { ProblemSummary } from "@/lib/content/problems";
import {
    type DifficultyCount,
    getProblemListing,
    getProblemListingPath,
    isDifficulty,
    type ProblemListingQuery,
} from "@/lib/problem-listing";
import { getDifficultyPresentation } from "./difficulty-filter";
import { ProblemPostCard } from "./ProblemPostCard";

interface ProblemListingViewProps {
    problems: ProblemSummary[];
    difficultyCounts: DifficultyCount[];
    query: ProblemListingQuery;
    bodyIndex?: BlogBodyIndex;
    searchSlot?: React.ReactNode;
    onClearSearch?: () => void;
}

/**
 * Presentational problems list for one filter/search and page. Mirrors the
 * `/blog` left-sidebar layout and holds no state or hooks so the server renders
 * it as the static fallback.
 */
export function ProblemListingView({
    problems,
    difficultyCounts,
    query,
    bodyIndex,
    searchSlot,
    onClearSearch,
}: ProblemListingViewProps): React.ReactElement {
    const listing = getProblemListing(problems, query, undefined, bodyIndex);
    const options = difficultyCounts.map(
        ({ difficulty, count }): FilterOption => ({
            value: difficulty,
            count,
            ...getDifficultyPresentation(difficulty),
        })
    );
    const heading = listing.searchQuery
        ? `All problems matching "${listing.searchQuery}"`
        : listing.activeDifficulty
          ? getDifficultyPresentation(listing.activeDifficulty).label
          : "All problems";

    return (
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-8">
            <aside className="-mx-6 min-w-0 px-6 lg:sticky lg:top-24 lg:mx-0 lg:max-h-[calc(100dvh-7rem)] lg:self-start lg:overflow-y-auto lg:px-0">
                {searchSlot ? <div className="mb-3">{searchSlot}</div> : null}
                <FilterList
                    ariaLabel="Filter by difficulty"
                    marker="dot"
                    options={options}
                    activeValue={listing.activeDifficulty}
                    totalCount={problems.length}
                    getHref={(value) =>
                        getProblemListingPath({
                            difficulty: isDifficulty(value) ? value : null,
                        }) as Route
                    }
                />
            </aside>

            <section aria-label="Code problems" className="min-w-0">
                <p
                    aria-live="polite"
                    className="text-content-subtle mb-4 font-mono text-xs uppercase tracking-widest"
                >
                    {heading} · {listing.total}{" "}
                    {listing.total === 1 ? "problem" : "problems"}
                </p>

                {listing.items.length === 0 ? (
                    <div className="surface-card radius-card p-8">
                        <p className="text-content">
                            No problems match{" "}
                            <span className="font-semibold text-white">
                                &ldquo;{listing.searchQuery}&rdquo;
                            </span>
                            .
                        </p>
                        <p className="text-content-subtle mt-1 text-sm">
                            Try a different keyword or browse by difficulty on
                            the left.
                        </p>
                        <div className="mt-4">
                            {onClearSearch ? (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={onClearSearch}
                                >
                                    Clear search
                                </Button>
                            ) : (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    href={"/problems" as Route}
                                >
                                    Clear search
                                </Button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                        {listing.items.map((problem) => (
                            <ProblemPostCard
                                key={problem.slug}
                                problem={problem}
                            />
                        ))}
                    </div>
                )}

                <PaginationNav
                    className="mt-8"
                    currentPage={listing.page}
                    totalPages={listing.totalPages}
                    getPageHref={(page) =>
                        getProblemListingPath({
                            difficulty: listing.activeDifficulty,
                            q: listing.searchQuery || null,
                            page,
                        }) as Route
                    }
                />
            </section>
        </div>
    );
}
