import { describe, expect, test } from "bun:test";
import {
    type Difficulty,
    type DifficultyCount,
    getDifficultyCounts,
    getProblemListing,
    getProblemListingPath,
} from "./problem-listing";

interface TestProblem {
    slug: string;
    difficulty: Difficulty;
}

function makeProblems(count: number, difficulty: Difficulty): TestProblem[] {
    return Array.from({ length: count }, (_, i) => ({
        slug: `${difficulty}-${i + 1}`,
        difficulty,
    }));
}

describe("getDifficultyCounts", () => {
    test("lists difficulties easiest first with their counts", () => {
        const problems = [
            ...makeProblems(1, "hard"),
            ...makeProblems(3, "easy"),
            ...makeProblems(2, "medium"),
        ];

        const expected: DifficultyCount[] = [
            { difficulty: "easy", count: 3 },
            { difficulty: "medium", count: 2 },
            { difficulty: "hard", count: 1 },
        ];
        const result = getDifficultyCounts(problems);

        expect(result).toEqual(expected);
    });

    test("omits difficulties that have no problems", () => {
        const expected: DifficultyCount[] = [{ difficulty: "easy", count: 2 }];
        const result = getDifficultyCounts(makeProblems(2, "easy"));

        expect(result).toEqual(expected);
    });
});

describe("getProblemListing", () => {
    const problems = [
        ...makeProblems(14, "easy"),
        ...makeProblems(5, "medium"),
        ...makeProblems(2, "hard"),
    ];

    test("returns the first page of everything by default", () => {
        const result = getProblemListing(problems, {}, 12);

        expect(result.activeDifficulty).toBeNull();
        expect(result.total).toBe(21);
        expect(result.totalPages).toBe(2);
        expect(result.items).toHaveLength(12);
    });

    test("filters by difficulty and paginates the matches", () => {
        const result = getProblemListing(
            problems,
            { difficulty: "easy", page: "2" },
            12
        );

        expect(result.activeDifficulty).toBe("easy");
        expect(result.total).toBe(14);
        expect(result.page).toBe(2);
        expect(result.items).toHaveLength(2);
    });

    test("ignores an unknown difficulty instead of showing an empty list", () => {
        const result = getProblemListing(problems, { difficulty: "nope" }, 12);

        expect(result.activeDifficulty).toBeNull();
        expect(result.total).toBe(21);
    });

    test("ignores a valid difficulty that has no problems", () => {
        const result = getProblemListing(
            makeProblems(3, "easy"),
            { difficulty: "hard" },
            12
        );

        expect(result.activeDifficulty).toBeNull();
        expect(result.total).toBe(3);
    });

    test("clamps an out-of-range page to the last page", () => {
        const result = getProblemListing(problems, { page: "99" }, 12);

        expect(result.page).toBe(2);
    });
});

describe("getProblemListingPath", () => {
    test("collapses the default view to /problems", () => {
        const expected = "/problems";
        const result = getProblemListingPath({ difficulty: null, page: 1 });

        expect(result).toBe(expected);
    });

    test("includes only the parts that differ from the default", () => {
        expect(getProblemListingPath({ difficulty: "hard" })).toBe(
            "/problems?difficulty=hard"
        );
        expect(getProblemListingPath({ page: 2 })).toBe("/problems?page=2");
        expect(getProblemListingPath({ difficulty: "easy", page: 2 })).toBe(
            "/problems?difficulty=easy&page=2"
        );
    });
});
