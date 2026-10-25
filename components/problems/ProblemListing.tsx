"use client";

import { useSearchParams } from "next/navigation";
import type { ProblemSummary } from "@/lib/content/problems";
import type {
    DifficultyCount,
    ProblemListingQuery,
} from "@/lib/problem-listing";
import { ProblemListingView } from "./ProblemListingView";

interface ProblemListingProps {
    problems: ProblemSummary[];
    difficultyCounts: DifficultyCount[];
}

/**
 * Reads the filter and page from the URL on the client so `/problems` itself
 * stays statically generated. Render it inside a Suspense boundary.
 */
export function ProblemListing({
    problems,
    difficultyCounts,
}: ProblemListingProps): React.ReactElement {
    const searchParams = useSearchParams();
    const query: ProblemListingQuery = {
        difficulty: searchParams.get("difficulty"),
        page: searchParams.get("page"),
    };

    return (
        <ProblemListingView
            problems={problems}
            difficultyCounts={difficultyCounts}
            query={query}
        />
    );
}
