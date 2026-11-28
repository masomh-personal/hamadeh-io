"use client";

import { useSearchParams } from "next/navigation";
import { SearchInput, useListingSearch } from "@/components/ui";
import type { ProblemSummary } from "@/lib/content/problems";
import {
    type DifficultyCount,
    getProblemListingPath,
    type ProblemListingQuery,
} from "@/lib/problem-listing";
import { ProblemListingView } from "./ProblemListingView";

interface ProblemListingProps {
    problems: ProblemSummary[];
    difficultyCounts: DifficultyCount[];
}

/**
 * Reads the filter, search query, and page from the URL on the client so
 * `/problems` itself stays statically generated. Render it inside a Suspense
 * boundary.
 */
export function ProblemListing({
    problems,
    difficultyCounts,
}: ProblemListingProps): React.ReactElement {
    const searchParams = useSearchParams();
    const {
        inputValue,
        rawUrlQuery,
        bodyIndex,
        isSearching,
        handleSearchChange,
        handleSubmitImmediate,
        handleClearSearch,
        ensureBodyIndex,
    } = useListingSearch({
        indexUrl: "/problems/search-index.json",
        filterParam: "difficulty",
        buildSearchPath: (q) => getProblemListingPath({ q }),
    });

    const query: ProblemListingQuery = {
        difficulty: searchParams.get("difficulty"),
        q: rawUrlQuery,
        page: searchParams.get("page"),
    };

    return (
        <ProblemListingView
            problems={problems}
            difficultyCounts={difficultyCounts}
            query={query}
            bodyIndex={bodyIndex}
            isSearching={isSearching}
            onClearSearch={handleClearSearch}
            searchSlot={
                <SearchInput
                    id="problem-search-input"
                    label="Search all code problems"
                    placeholder="Search all problems..."
                    value={inputValue}
                    onValueChange={handleSearchChange}
                    onSubmitImmediate={handleSubmitImmediate}
                    onClear={handleClearSearch}
                    onPrepareIndex={ensureBodyIndex}
                    isSearching={isSearching}
                />
            }
        />
    );
}
