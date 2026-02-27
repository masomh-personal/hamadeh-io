/**
 * Tests for Reverse String
 */

import { describe, expect, test } from "bun:test";
import { reverseString } from "./solution";

describe("reverseString", () => {
    describe("leetcode examples", () => {
        test("example 1 reverses ['h','e','l','l','o']", () => {
            const chars = ["h", "e", "l", "l", "o"];

            reverseString(chars);

            expect(chars).toEqual(["o", "l", "l", "e", "h"]);
        });

        test("example 2 reverses ['H','a','n','n','a','h']", () => {
            const chars = ["H", "a", "n", "n", "a", "h"];

            reverseString(chars);

            expect(chars).toEqual(["h", "a", "n", "n", "a", "H"]);
        });
    });

    describe("basics", () => {
        test("handles an empty array", () => {
            const chars: string[] = [];

            reverseString(chars);

            expect(chars).toEqual([]);
        });

        test("handles a single character", () => {
            const chars = ["x"];

            reverseString(chars);

            expect(chars).toEqual(["x"]);
        });

        test("handles two characters", () => {
            const chars = ["a", "b"];

            reverseString(chars);

            expect(chars).toEqual(["b", "a"]);
        });
    });

    describe("edge cases", () => {
        test("handles odd-length arrays", () => {
            const chars = ["a", "b", "c", "d", "e"];

            reverseString(chars);

            expect(chars).toEqual(["e", "d", "c", "b", "a"]);
        });

        test("handles even-length arrays", () => {
            const chars = ["a", "b", "c", "d"];

            reverseString(chars);

            expect(chars).toEqual(["d", "c", "b", "a"]);
        });

        test("handles repeated characters", () => {
            const chars = ["a", "a", "b", "b", "a"];

            reverseString(chars);

            expect(chars).toEqual(["a", "b", "b", "a", "a"]);
        });
    });

    describe("in-place behavior", () => {
        test("mutates the same array reference", () => {
            const chars = ["r", "e", "v", "e", "r", "s", "e"];
            const sameReference = chars;

            reverseString(chars);

            expect(chars).toBe(sameReference);
            expect(chars).toEqual(["e", "s", "r", "e", "v", "e", "r"]);
        });
    });

    describe("performance", () => {
        test("handles a large array efficiently", () => {
            const chars = Array.from({ length: 50_000 }, (_, index) =>
                String(index % 10)
            );
            const expected = [...chars].reverse();

            reverseString(chars);

            expect(chars).toEqual(expected);
        });
    });
});
