/**
 * Tests for Reverse String
 */

import { describe, expect, test } from "bun:test";
import { reverseString } from "./solution";

describe("reverseString", () => {
    describe("leetcode examples", () => {
        test("example 1 reverses ['h','e','l','l','o']", () => {
            const chars = ["h", "e", "l", "l", "o"];
            const expected = ["o", "l", "l", "e", "h"];

            reverseString(chars);

            const result = chars;
            expect(result).toEqual(expected);
        });

        test("example 2 reverses ['H','a','n','n','a','h']", () => {
            const chars = ["H", "a", "n", "n", "a", "h"];
            const expected = ["h", "a", "n", "n", "a", "H"];

            reverseString(chars);

            const result = chars;
            expect(result).toEqual(expected);
        });
    });

    describe("basics", () => {
        test("handles an empty array", () => {
            const chars: string[] = [];
            const expected: string[] = [];

            reverseString(chars);

            const result = chars;
            expect(result).toEqual(expected);
        });

        test("handles a single character", () => {
            const chars = ["x"];
            const expected = ["x"];

            reverseString(chars);

            const result = chars;
            expect(result).toEqual(expected);
        });

        test("handles two characters", () => {
            const chars = ["a", "b"];
            const expected = ["b", "a"];

            reverseString(chars);

            const result = chars;
            expect(result).toEqual(expected);
        });
    });

    describe("edge cases", () => {
        test("handles odd-length arrays", () => {
            const chars = ["a", "b", "c", "d", "e"];
            const expected = ["e", "d", "c", "b", "a"];

            reverseString(chars);

            const result = chars;
            expect(result).toEqual(expected);
        });

        test("handles even-length arrays", () => {
            const chars = ["a", "b", "c", "d"];
            const expected = ["d", "c", "b", "a"];

            reverseString(chars);

            const result = chars;
            expect(result).toEqual(expected);
        });

        test("handles repeated characters", () => {
            const chars = ["a", "a", "b", "b", "a"];
            const expected = ["a", "b", "b", "a", "a"];

            reverseString(chars);

            const result = chars;
            expect(result).toEqual(expected);
        });
    });

    describe("in-place behavior", () => {
        test("mutates the same array reference", () => {
            const chars = ["r", "e", "v", "e", "r", "s", "e"];
            const sameReference = chars;
            const expectedReference = sameReference;
            const expectedChars = ["e", "s", "r", "e", "v", "e", "r"];

            reverseString(chars);

            const resultReference = chars;
            expect(resultReference).toBe(expectedReference);

            const resultChars = chars;
            expect(resultChars).toEqual(expectedChars);
        });
    });

    describe("performance", () => {
        test("handles a large array efficiently", () => {
            const chars = Array.from({ length: 50_000 }, (_, index) =>
                String(index % 10)
            );
            const expected = [...chars].reverse();

            reverseString(chars);

            const result = chars;
            expect(result).toEqual(expected);
        });
    });
});
