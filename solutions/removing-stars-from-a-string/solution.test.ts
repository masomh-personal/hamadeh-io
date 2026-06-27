/**
 * Tests for Removing Stars From a String
 */

import { describe, expect, test } from "bun:test";
import { removeStars } from "./solution";

describe("removeStars", () => {
    describe("LeetCode examples", () => {
        test("example 1: leet**cod*e -> lecoe", () => {
            const expected = "lecoe";
            const result = removeStars("leet**cod*e");
            expect(result).toBe(expected);
        });

        test("example 2: erase***** -> empty string", () => {
            const expected = "";
            const result = removeStars("erase*****");
            expect(result).toBe(expected);
        });
    });

    describe("basics", () => {
        test("no stars returns the original string", () => {
            const expected = "abc";
            const result = removeStars("abc");
            expect(result).toBe(expected);
        });

        test("single star removes the preceding character", () => {
            const expected = "a";
            const result = removeStars("ab*");
            expect(result).toBe(expected);
        });

        test("star at the end of a two-character string leaves one character", () => {
            const expected = "a";
            const result = removeStars("ab*");
            expect(result).toBe(expected);
        });

        test("multiple non-adjacent stars each remove one character", () => {
            // a → [a], b → [a,b], * → pop b → [a], c → [a,c], b → [a,c,b], * → pop b → [a,c]
            const expected = "ac";
            const result = removeStars("ab*cb*");
            expect(result).toBe(expected);
        });

        test("consecutive stars remove multiple preceding characters", () => {
            const expected = "a";
            const result = removeStars("abcd***");
            expect(result).toBe(expected);
        });

        test("all characters removed by stars returns empty string", () => {
            const expected = "";
            const result = removeStars("abc***");
            expect(result).toBe(expected);
        });
    });

    describe("edge cases", () => {
        test("single character no star returns that character", () => {
            const expected = "z";
            const result = removeStars("z");
            expect(result).toBe(expected);
        });

        test("interleaved stars and letters resolve correctly", () => {
            // a -> stack [a]
            // * -> pop a, stack []
            // b -> stack [b]
            // * -> pop b, stack []
            // c -> stack [c]
            // * -> pop c, stack []
            const expected = "";
            const result = removeStars("a*b*c*");
            expect(result).toBe(expected);
        });

        test("stars only affect characters to their left", () => {
            // "de*f" -> d, e removed by *, f stays -> "df"
            const expected = "df";
            const result = removeStars("de*f");
            expect(result).toBe(expected);
        });

        test("stars separated by many characters each remove the nearest left character", () => {
            // "abcde*****" -> removes e, d, c, b, a in order
            const expected = "";
            const result = removeStars("abcde*****");
            expect(result).toBe(expected);
        });
    });

    describe("scale", () => {
        test("large input with no stars returns full string", () => {
            const input = "a".repeat(100_000);
            const expected = input;
            const result = removeStars(input);
            expect(result).toBe(expected);
        });

        test("alternating char and star returns empty string at scale", () => {
            const n = 50_000;
            const input = "a*".repeat(n);
            const expected = "";
            const result = removeStars(input);
            expect(result).toBe(expected);
        });
    });

    describe("contract", () => {
        test("does not mutate the input string", () => {
            const input = "leet**cod*e";
            const copy = input;
            removeStars(input);
            expect(input).toBe(copy);
        });
    });
});
