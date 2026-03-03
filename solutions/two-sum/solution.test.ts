/**
 * Tests for Two Sum
 */

import { describe, expect, test } from "bun:test";
import { twoSum } from "./solution";

describe("twoSum", () => {
    test("solves leetcode example 1", () => {
        const nums = [2, 7, 11, 15];
        const target = 9;
        const expected = [0, 1];
        const result = twoSum(nums, target).sort((a, b) => a - b);

        expect(result).toEqual(expected);
    });

    test("solves leetcode example 2", () => {
        const nums = [3, 2, 4];
        const target = 6;
        const expected = [1, 2];
        const result = twoSum(nums, target).sort((a, b) => a - b);

        expect(result).toEqual(expected);
    });

    test("handles duplicate values correctly", () => {
        const nums = [3, 3];
        const target = 6;
        const expected = [0, 1];
        const result = twoSum(nums, target).sort((a, b) => a - b);

        expect(result).toEqual(expected);
    });

    test("handles negatives and mixed values", () => {
        const nums = [-3, 4, 3, 90];
        const target = 0;
        const expected = [0, 2];
        const result = twoSum(nums, target).sort((a, b) => a - b);

        expect(result).toEqual(expected);
    });

    test("handles zeros and non-unique candidate values", () => {
        const nums = [0, 4, 3, 0];
        const target = 0;
        const expected = [0, 3];
        const result = twoSum(nums, target).sort((a, b) => a - b);

        expect(result).toEqual(expected);
    });

    test("handles another mixed positive/negative case", () => {
        const nums = [10, -2, 8, 5, 3];
        const target = 6;
        const expected = [1, 2];
        const result = twoSum(nums, target).sort((a, b) => a - b);

        expect(result).toEqual(expected);
    });

    test("handles a 1000-element array efficiently", () => {
        const nums = Array.from({ length: 1000 }, (_, index) => index);
        const target = 1997; // unique valid pair: 998 + 999
        const expected = [998, 999];
        const result = twoSum(nums, target).sort((a, b) => a - b);

        expect(result).toEqual(expected);
    });

    test("returns empty array when no pair exists (defensive behavior)", () => {
        const nums = [1, 2, 3, 4];
        const target = 100;
        const expected: number[] = [];
        const result = twoSum(nums, target);

        expect(result).toEqual(expected);
    });
});
