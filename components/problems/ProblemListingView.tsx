import type { Route } from "next";
import { FilterList, type FilterOption, PaginationNav } from "@/components/ui";
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
}

/**
 * Presentational problems list for one filter and page. It holds no state or
 * hooks, so the server renders it as the static fallback and the client
 * wrapper renders it again once the URL's query string is known.
 */
export function ProblemListingView({
    problems,
    difficultyCounts,
    query,
}: ProblemListingViewProps): React.ReactElement {
    const listing = getProblemListing(problems, query);
    const options = difficultyCounts.map(
        ({ difficulty, count }): FilterOption => ({
            value: difficulty,
            count,
            ...getDifficultyPresentation(difficulty),
        })
    );
    const heading = listing.activeDifficulty
        ? getDifficultyPresentation(listing.activeDifficulty).label
        : "All";

    return (
        <div className="mt-6">
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
                <FilterList
                    className="min-w-0 max-w-full"
                    ariaLabel="Filter by difficulty"
                    orientation="row"
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
                <p className="text-content-subtle font-mono text-xs uppercase tracking-widest">
                    {heading} · {listing.total}{" "}
                    {listing.total === 1 ? "problem" : "problems"}
                </p>
            </div>

            <section aria-label="Code problems" className="mt-5">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {listing.items.map((problem) => (
                        <ProblemPostCard key={problem.slug} problem={problem} />
                    ))}
                </div>

                <PaginationNav
                    className="mt-8"
                    currentPage={listing.page}
                    totalPages={listing.totalPages}
                    getPageHref={(page) =>
                        getProblemListingPath({
                            difficulty: listing.activeDifficulty,
                            page,
                        }) as Route
                    }
                />
            </section>
        </div>
    );
}
