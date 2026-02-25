/**
 * Tests for Two Sum
 */

import { describe, expect, test } from "bun:test";
import { twoSum } from "./solution";

describe("twoSum", () => {
    test("solves leetcode example 1", () => {
        const nums = [2, 7, 11, 15];
        const target = 9;
        const result = twoSum(nums, target);

        expect(result.sort((a, b) => a - b)).toEqual([0, 1]);
    });

    test("solves leetcode example 2", () => {
        const nums = [3, 2, 4];
        const target = 6;
        const result = twoSum(nums, target);

        expect(result.sort((a, b) => a - b)).toEqual([1, 2]);
    });

    test("handles duplicate values correctly", () => {
        const nums = [3, 3];
        const target = 6;
        const result = twoSum(nums, target);

        expect(result.sort((a, b) => a - b)).toEqual([0, 1]);
    });

    test("handles negatives and mixed values", () => {
        const nums = [-3, 4, 3, 90];
        const target = 0;
        const result = twoSum(nums, target);

        expect(result.sort((a, b) => a - b)).toEqual([0, 2]);
    });

    test("handles zeros and non-unique candidate values", () => {
        const nums = [0, 4, 3, 0];
        const target = 0;
        const result = twoSum(nums, target);

        expect(result.sort((a, b) => a - b)).toEqual([0, 3]);
    });

    test("handles another mixed positive/negative case", () => {
        const nums = [10, -2, 8, 5, 3];
        const target = 6;
        const result = twoSum(nums, target);

        expect(result.sort((a, b) => a - b)).toEqual([1, 2]);
    });

    test("returns empty array when no pair exists (defensive behavior)", () => {
        const nums = [1, 2, 3, 4];
        const target = 100;
        const result = twoSum(nums, target);

        expect(result).toEqual([]);
    });
});
