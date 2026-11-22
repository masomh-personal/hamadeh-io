/**
 * Tests for First Missing Positive
 */

import { describe, expect, test } from "bun:test";
import { firstMissingPositive } from "./solution";

describe("First Missing Positive", () => {
    describe("Basics", () => {
        test("solves LeetCode example 1: [1, 2, 0]", () => {
            const expected = 3;
            const result = firstMissingPositive([1, 2, 0]);

            expect(result).toBe(expected);
        });

        test("solves LeetCode example 2: [3, 4, -1, 1]", () => {
            const expected = 2;
            const result = firstMissingPositive([3, 4, -1, 1]);

            expect(result).toBe(expected);
        });

        test("solves LeetCode example 3: [7, 8, 9, 11, 12]", () => {
            const expected = 1;
            const result = firstMissingPositive([7, 8, 9, 11, 12]);

            expect(result).toBe(expected);
        });

        test("returns n + 1 when all values from 1 to n are present", () => {
            const expected = 5;
            const result = firstMissingPositive([1, 2, 3, 4]);

            expect(result).toBe(expected);
        });
    });

    describe("Edge Cases", () => {
        test("returns 2 for single element [1]", () => {
            const expected = 2;
            const result = firstMissingPositive([1]);

            expect(result).toBe(expected);
        });

        test("returns 1 for single element [2]", () => {
            const expected = 1;
            const result = firstMissingPositive([2]);

            expect(result).toBe(expected);
        });

        test("returns 1 for single zero [0]", () => {
            const expected = 1;
            const result = firstMissingPositive([0]);

            expect(result).toBe(expected);
        });

        test("returns 1 when all values are negative or zero", () => {
            const expected = 1;
            const result = firstMissingPositive([-3, -2, -1, 0]);

            expect(result).toBe(expected);
        });

        test("handles duplicate positive values without infinite loops or skipping", () => {
            const expected = 2;
            const result = firstMissingPositive([1, 1]);

            expect(result).toBe(expected);
        });

        test("handles mixed duplicates and out-of-range values", () => {
            const expected = 3;
            const result = firstMissingPositive([2, 2, 1, 1, 100, -100, 4]);

            expect(result).toBe(expected);
        });

        test("handles 32-bit signed integer extremes", () => {
            const expected = 2;
            const result = firstMissingPositive([-2147483648, 2147483647, 1]);

            expect(result).toBe(expected);
        });

        test("handles reverse-sorted array with one gap", () => {
            const expected = 3;
            const result = firstMissingPositive([5, 4, 2, 1]);

            expect(result).toBe(expected);
        });

        test("returns 1 when all values exceed array length", () => {
            const expected = 1;
            const result = firstMissingPositive([5, 6, 7]);

            expect(result).toBe(expected);
        });
    });

    describe("Stress Tests", () => {
        test("handles 100,000 elements in reverse order with no gaps", () => {
            const size = 100_000;
            const nums = Array.from({ length: size }, (_, i) => size - i);
            const expected = size + 1;
            const result = firstMissingPositive(nums);

            expect(result).toBe(expected);
        });

        test("finds a single missing value in the middle of 100,000 elements", () => {
            const size = 100_000;
            const missing = 50_001;
            const nums = Array.from({ length: size }, (_, i) => {
                const value = i + 1;
                return value === missing ? -1 : value;
            });
            const expected = missing;
            const result = firstMissingPositive(nums);

            expect(result).toBe(expected);
        });
    });

    describe("Contract", () => {
        test("is deterministic across repeated calls with equivalent inputs", () => {
            const input = [3, 4, -1, 1, 2, 2, 7];
            const firstResult = firstMissingPositive([...input]);
            const secondResult = firstMissingPositive([...input]);

            expect(firstResult).toBe(5);
            expect(secondResult).toBe(firstResult);
        });
    });
});
