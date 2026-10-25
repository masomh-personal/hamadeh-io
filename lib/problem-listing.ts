/**
 * Pure filtering and pagination for the code problems list. The URL is the
 * source of truth, so query values are treated as untrusted and fall back to
 * the unfiltered first page instead of throwing.
 */

import { buildListingPath, paginate } from "./pagination";

export const PROBLEM_PAGE_SIZE = 12;

/** Display order for the filter, easiest first. */
export const DIFFICULTIES = ["easy", "medium", "hard"] as const;

export type Difficulty = (typeof DIFFICULTIES)[number];

interface HasDifficulty {
    difficulty: Difficulty;
}

export interface DifficultyCount {
    difficulty: Difficulty;
    count: number;
}

export interface ProblemListingQuery {
    difficulty?: string | null;
    page?: string | null;
}

export interface ProblemListing<T> {
    activeDifficulty: Difficulty | null;
    page: number;
    totalPages: number;
    total: number;
    items: T[];
}

export function isDifficulty(
    value: string | null | undefined
): value is Difficulty {
    return DIFFICULTIES.some((difficulty) => difficulty === value);
}

/** Difficulties that have at least one problem, in display order. */
export function getDifficultyCounts(
    problems: readonly HasDifficulty[]
): DifficultyCount[] {
    return DIFFICULTIES.map((difficulty) => ({
        difficulty,
        count: problems.filter((problem) => problem.difficulty === difficulty)
            .length,
    })).filter(({ count }) => count > 0);
}

export function getProblemListing<T extends HasDifficulty>(
    problems: readonly T[],
    query: ProblemListingQuery,
    pageSize: number = PROBLEM_PAGE_SIZE
): ProblemListing<T> {
    const requested = isDifficulty(query.difficulty) ? query.difficulty : null;
    // A difficulty with no problems would render an empty list, so ignore it.
    const activeDifficulty =
        requested && problems.some((p) => p.difficulty === requested)
            ? requested
            : null;
    const matching = activeDifficulty
        ? problems.filter((problem) => problem.difficulty === activeDifficulty)
        : [...problems];

    const { page, totalPages, items } = paginate(
        matching,
        query.page,
        pageSize
    );

    return {
        activeDifficulty,
        page,
        totalPages,
        total: matching.length,
        items,
    };
}

/** Builds the canonical problems URL; page 1 and no filter collapse to `/problems`. */
export function getProblemListingPath({
    difficulty,
    page,
}: {
    difficulty?: Difficulty | null;
    page?: number;
}): string {
    return buildListingPath("/problems", { difficulty }, page);
}
