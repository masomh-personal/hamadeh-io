/**
 * Pure filtering, searching, and pagination for the code problems list. The URL
 * is the source of truth, so query values are treated as untrusted and fall
 * back to the unfiltered first page instead of throwing.
 */

import {
    type BlogBodyIndex,
    normalizeSearchQuery,
    searchBlogPosts,
} from "./blog-search";
import { buildListingPath, paginate } from "./pagination";

export const PROBLEM_PAGE_SIZE = 12;

/** Display order for the filter, easiest first. */
export const DIFFICULTIES = ["easy", "medium", "hard"] as const;

export type Difficulty = (typeof DIFFICULTIES)[number];

interface HasDifficulty {
    difficulty: Difficulty;
    slug?: string;
    title?: string;
    excerpt?: string;
    source?: string;
    timeComplexity?: string;
    spaceComplexity?: string;
}

export interface DifficultyCount {
    difficulty: Difficulty;
    count: number;
}

export interface ProblemListingQuery {
    difficulty?: string | null;
    q?: string | null;
    page?: string | null;
}

export interface ProblemListing<T> {
    activeDifficulty: Difficulty | null;
    searchQuery: string;
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
    pageSize: number = PROBLEM_PAGE_SIZE,
    bodyIndex?: BlogBodyIndex
): ProblemListing<T> {
    const searchQuery = normalizeSearchQuery(query.q);

    if (searchQuery) {
        const searchable = problems.map((problem) => ({
            problem,
            slug: problem.slug ?? "",
            title: problem.title ?? "",
            excerpt: problem.excerpt,
            tags: [
                problem.difficulty,
                problem.source,
                problem.timeComplexity,
                problem.spaceComplexity,
            ].filter((value): value is string => Boolean(value)),
        }));
        const matching = searchBlogPosts(
            searchable,
            searchQuery,
            bodyIndex
        ).map((entry) => entry.problem);
        const { page, totalPages, items } = paginate(
            matching,
            query.page,
            pageSize
        );

        return {
            activeDifficulty: null,
            searchQuery,
            page,
            totalPages,
            total: matching.length,
            items,
        };
    }

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
        searchQuery: "",
        page,
        totalPages,
        total: matching.length,
        items,
    };
}

/** Builds the canonical problems URL; page 1 and no filters collapse to `/problems`. */
export function getProblemListingPath({
    difficulty,
    q,
    page,
}: {
    difficulty?: Difficulty | null;
    q?: string | null;
    page?: number;
}): string {
    const normalizedQuery = normalizeSearchQuery(q);
    if (normalizedQuery) {
        return buildListingPath("/problems", { q: normalizedQuery }, page);
    }

    return buildListingPath("/problems", { difficulty }, page);
}
