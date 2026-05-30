/**
 * Tests for Trapping Rain Water
 *
 * Water trapped above each bar is bounded by the tallest bar to its left and
 * the tallest bar to its right. These tests pin down that behavior across
 * baseline examples, edge cases, and larger deterministic inputs.
 */

import { describe, expect, test } from "bun:test";
import { trap } from "./solution";

describe("trap", () => {
    describe("leetcode examples", () => {
        test("example 1: classic mixed elevation map", () => {
            const height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
            const expected = 6;
            const result = trap(height);

            expect(result).toBe(expected);
        });

        test("example 2: rising then falling wall", () => {
            const height = [4, 2, 0, 3, 2, 5];
            const expected = 9;
            const result = trap(height);

            expect(result).toBe(expected);
        });
    });

    describe("basics", () => {
        test("empty input traps nothing", () => {
            const height: number[] = [];
            const expected = 0;
            const result = trap(height);

            expect(result).toBe(expected);
        });

        test("single bar traps nothing", () => {
            const height = [5];
            const expected = 0;
            const result = trap(height);

            expect(result).toBe(expected);
        });

        test("two bars have no interior to hold water", () => {
            const height = [5, 5];
            const expected = 0;
            const result = trap(height);

            expect(result).toBe(expected);
        });

        test("a single dip between two equal walls", () => {
            const height = [2, 0, 2];
            const expected = 2;
            const result = trap(height);

            expect(result).toBe(expected);
        });

        test("a single dip bounded by the shorter wall", () => {
            const height = [3, 0, 1];
            const expected = 1;
            const result = trap(height);

            expect(result).toBe(expected);
        });
    });

    describe("monotonic shapes hold no water", () => {
        test("strictly increasing", () => {
            const height = [1, 2, 3, 4, 5];
            const expected = 0;
            const result = trap(height);

            expect(result).toBe(expected);
        });

        test("strictly decreasing", () => {
            const height = [5, 4, 3, 2, 1];
            const expected = 0;
            const result = trap(height);

            expect(result).toBe(expected);
        });

        test("all equal bars", () => {
            const height = [3, 3, 3, 3];
            const expected = 0;
            const result = trap(height);

            expect(result).toBe(expected);
        });

        test("all zero bars", () => {
            const height = [0, 0, 0, 0];
            const expected = 0;
            const result = trap(height);

            expect(result).toBe(expected);
        });
    });

    describe("shapes", () => {
        test("symmetric bowl", () => {
            const height = [5, 0, 0, 0, 5];
            const expected = 15;
            const result = trap(height);

            expect(result).toBe(expected);
        });

        test("plateau floor between tall walls", () => {
            const height = [4, 1, 1, 1, 4];
            const expected = 9;
            const result = trap(height);

            expect(result).toBe(expected);
        });

        test("tallest peak in the middle splits two basins", () => {
            const height = [2, 0, 5, 0, 3];
            const expected = 5;
            const result = trap(height);

            expect(result).toBe(expected);
        });

        test("leading zeros before the first wall trap nothing on the left", () => {
            const height = [0, 0, 3, 0, 2];
            const expected = 2;
            const result = trap(height);

            expect(result).toBe(expected);
        });
    });

    describe("contract", () => {
        test("does not mutate the input array", () => {
            const height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
            const expected = [...height];

            trap(height);

            expect(height).toEqual(expected);
        });
    });

    describe("larger inputs", () => {
        test("repeated bowl pattern accumulates across basins", () => {
            const height = [3, 0, 3, 0, 3, 0, 3];
            const expected = 9;
            const result = trap(height);

            expect(result).toBe(expected);
        });

        test("deep central reservoir bounded by the shorter side", () => {
            const height = [6, 1, 1, 1, 1, 1, 4];
            const expected = 15;
            const result = trap(height);

            expect(result).toBe(expected);
        });

        test("wide flat valley with a tall rim", () => {
            const width = 50;
            const height = [10, ...Array.from({ length: width }, () => 0), 10];
            const expected = width * 10;
            const result = trap(height);

            expect(result).toBe(expected);
        });
    });
});
