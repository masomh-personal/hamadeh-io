import { useSyncExternalStore } from "react";
import { SearchInput, useListingSearch } from "@/components/ui";
import type { ProblemSummary } from "@/lib/content/problems";
import {
    type DifficultyCount,
    getProblemListingPath,
    type ProblemListingQuery,
} from "@/lib/problem-listing";
import { ProblemListingView } from "./ProblemListingView";

const emptySubscribe = (): (() => void) => () => {};

interface ProblemListingProps {
    problems: ProblemSummary[];
    difficultyCounts: DifficultyCount[];
    search: {
        difficulty?: string;
        q?: string;
        page?: string;
    };
}

export function ProblemListing({
    problems,
    difficultyCounts,
    search,
}: ProblemListingProps): React.ReactElement {
    const isHydrated = useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false
    );
    const activeSearch = isHydrated ? search : {};
    const rawUrlQuery = activeSearch.q ?? null;
    const rawUrlDifficulty = activeSearch.difficulty ?? null;
    const {
        inputValue,
        bodyIndex,
        isSearching,
        handleSearchChange,
        handleSubmitImmediate,
        handleClearSearch,
        ensureBodyIndex,
    } = useListingSearch({
        indexUrl: "/problems/search-index.json",
        rawUrlQuery,
        rawUrlFilter: rawUrlDifficulty,
        buildSearchPath: (q) => getProblemListingPath({ q }),
    });

    const query: ProblemListingQuery = {
        difficulty: rawUrlDifficulty,
        q: rawUrlQuery,
        page: activeSearch.page ?? null,
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
