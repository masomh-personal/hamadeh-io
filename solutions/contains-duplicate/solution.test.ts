/**
 * Tests for Contains Duplicate
 */

import { describe, expect, test } from "bun:test";
import { containsDuplicate } from "./solution";

describe("containsDuplicate", () => {
    describe("leetcode examples", () => {
        test("example 1 returns true when a duplicate exists", () => {
            const nums = [1, 2, 3, 1];
            const expected = true;

            const result = containsDuplicate(nums);
            expect(result).toBe(expected);
        });

        test("example 2 returns false when all elements are distinct", () => {
            const nums = [1, 2, 3, 4];
            const expected = false;

            const result = containsDuplicate(nums);
            expect(result).toBe(expected);
        });

        test("example 3 returns true with multiple repeated values", () => {
            const nums = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2];
            const expected = true;

            const result = containsDuplicate(nums);
            expect(result).toBe(expected);
        });
    });

    describe("basics", () => {
        test("returns false for an empty array", () => {
            const nums: number[] = [];
            const expected = false;

            const result = containsDuplicate(nums);
            expect(result).toBe(expected);
        });

        test("returns false for a single-element array", () => {
            const nums = [42];
            const expected = false;

            const result = containsDuplicate(nums);
            expect(result).toBe(expected);
        });

        test("returns true for two equal values", () => {
            const nums = [7, 7];
            const expected = true;

            const result = containsDuplicate(nums);
            expect(result).toBe(expected);
        });

        test("returns false for two different values", () => {
            const nums = [7, 8];
            const expected = false;

            const result = containsDuplicate(nums);
            expect(result).toBe(expected);
        });
    });

    describe("edge cases", () => {
        test("handles negative numbers", () => {
            const nums = [-1, -2, -3, -1];
            const expected = true;

            const result = containsDuplicate(nums);
            expect(result).toBe(expected);
        });

        test("handles zero values", () => {
            const nums = [0, 5, 0];
            const expected = true;

            const result = containsDuplicate(nums);
            expect(result).toBe(expected);
        });

        test("detects duplicate values far apart", () => {
            const nums = [10, 20, 30, 40, 50, 10];
            const expected = true;

            const result = containsDuplicate(nums);
            expect(result).toBe(expected);
        });

        test("returns false when values are unique but unsorted", () => {
            const nums = [9, 1, 8, 2, 7, 3, 6, 4, 5];
            const expected = false;

            const result = containsDuplicate(nums);
            expect(result).toBe(expected);
        });
    });

    describe("larger inputs", () => {
        test("returns false for a large array of unique values", () => {
            const nums = Array.from({ length: 10_000 }, (_, index) => index);
            const expected = false;

            const result = containsDuplicate(nums);
            expect(result).toBe(expected);
        });

        test("returns true for a large array with one duplicate", () => {
            const nums = Array.from({ length: 10_000 }, (_, index) => index);
            nums.push(1234);
            const expected = true;

            const result = containsDuplicate(nums);
            expect(result).toBe(expected);
        });
    });

    describe("input integrity", () => {
        test("does not mutate the input array", () => {
            const nums = [3, 1, 2, 3];
            const original = [...nums];
            const expected = true;

            const result = containsDuplicate(nums);
            expect(result).toBe(expected);

            const resultInput = nums;
            const expectedInput = original;
            expect(resultInput).toEqual(expectedInput);
        });
    });
});
