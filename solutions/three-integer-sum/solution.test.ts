/**
 * Tests for 3Sum
 *
 * Output order is not guaranteed, so each test sorts triplets and the outer
 * result before comparing.
 */

import { describe, expect, test } from "bun:test";
import { threeSum } from "./solution";

function normalize(triplets: number[][]): number[][] {
    return triplets
        .map((triplet) => [...triplet].sort((a, b) => a - b))
        .sort((a, b) => {
            for (let i = 0; i < a.length; i++) {
                if (a[i] !== b[i]) {
                    return a[i] - b[i];
                }
            }

            return 0;
        });
}

describe("threeSum", () => {
    describe("neetcode examples", () => {
        test("example 1: mixed negatives, zero, and positives", () => {
            const nums = [-1, 0, 1, 2, -1, -4];
            const expected = normalize([
                [-1, -1, 2],
                [-1, 0, 1],
            ]);
            const result = normalize(threeSum(nums));

            expect(result).toEqual(expected);
        });

        test("example 2: no triplet sums to zero", () => {
            const nums = [0, 1, 1];
            const expected: number[][] = [];
            const result = threeSum(nums);

            expect(result).toEqual(expected);
        });

        test("example 3: all zeros produce one unique triplet", () => {
            const nums = [0, 0, 0];
            const expected = [[0, 0, 0]];
            const result = threeSum(nums);

            expect(result).toEqual(expected);
        });
    });

    describe("basics", () => {
        test("returns empty array when input has fewer than three numbers", () => {
            const nums = [0, 0];
            const expected: number[][] = [];
            const result = threeSum(nums);

            expect(result).toEqual(expected);
        });

        test("finds a single triplet in an unsorted input", () => {
            const nums = [3, -2, -1, 4];
            const expected = [[-2, -1, 3]];
            const result = normalize(threeSum(nums));

            expect(result).toEqual(expected);
        });

        test("returns empty array when all numbers are positive", () => {
            const nums = [1, 2, 3, 4, 5];
            const expected: number[][] = [];
            const result = threeSum(nums);

            expect(result).toEqual(expected);
        });

        test("returns empty array when all numbers are negative", () => {
            const nums = [-5, -4, -3, -2, -1];
            const expected: number[][] = [];
            const result = threeSum(nums);

            expect(result).toEqual(expected);
        });
    });

    describe("duplicate handling", () => {
        test("deduplicates repeated zero triplets", () => {
            const nums = [0, 0, 0, 0, 0];
            const expected = [[0, 0, 0]];
            const result = threeSum(nums);

            expect(result).toEqual(expected);
        });

        test("deduplicates repeated negative anchors and pointer values", () => {
            const nums = [-2, -2, 0, 0, 2, 2];
            const expected = [[-2, 0, 2]];
            const result = threeSum(nums);

            expect(result).toEqual(expected);
        });

        test("returns multiple unique triplets from repeated values", () => {
            const nums = [-2, 0, 1, 1, 2];
            const expected = normalize([
                [-2, 0, 2],
                [-2, 1, 1],
            ]);
            const result = normalize(threeSum(nums));

            expect(result).toEqual(expected);
        });
    });

    describe("contract", () => {
        test("does not mutate the input array", () => {
            const nums = [-1, 0, 1, 2, -1, -4];
            const expected = [...nums];

            threeSum(nums);

            expect(nums).toEqual(expected);
        });
    });

    describe("larger inputs", () => {
        test("handles deterministic range with several valid triplets", () => {
            const nums = [-8, -6, -4, -2, 0, 2, 4, 6, 8];
            const expected = normalize([
                [-8, 0, 8],
                [-8, 2, 6],
                [-6, -2, 8],
                [-6, 0, 6],
                [-6, 2, 4],
                [-4, -2, 6],
                [-4, 0, 4],
                [-2, 0, 2],
            ]);
            const result = normalize(threeSum(nums));

            expect(result).toEqual(expected);
        });

        test("handles a large input with duplicates without duplicate triplets", () => {
            const nums = [
                ...Array.from({ length: 100 }, () => -1),
                ...Array.from({ length: 100 }, () => 0),
                ...Array.from({ length: 100 }, () => 1),
            ];
            const expected = normalize([
                [-1, 0, 1],
                [0, 0, 0],
            ]);
            const result = normalize(threeSum(nums));

            expect(result).toEqual(expected);
        });
    });
});
