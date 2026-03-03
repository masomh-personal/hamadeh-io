/**
 * Tests for Find the Index of the First Occurrence in a String
 */

import { describe, expect, test } from "bun:test";
import { strStr } from "./solution";

describe("strStr", () => {
    describe("leetcode examples", () => {
        test('example 1: "sadbutsad" with "sad" returns 0', () => {
            const expected = 0;
            const result = strStr("sadbutsad", "sad");
            expect(result).toBe(expected);
        });

        test('example 2: "leetcode" with "leeto" returns -1', () => {
            const expected = -1;
            const result = strStr("leetcode", "leeto");
            expect(result).toBe(expected);
        });

        test('example 3: "aaaaa" with "bba" returns -1', () => {
            const expected = -1;
            const result = strStr("aaaaa", "bba");
            expect(result).toBe(expected);
        });
    });

    describe("basics", () => {
        test("returns 0 for exact full-string match", () => {
            const expected = 0;
            const result = strStr("abc", "abc");
            expect(result).toBe(expected);
        });

        test("returns -1 when needle is longer than haystack", () => {
            const expected = -1;
            const result = strStr("ab", "abc");
            expect(result).toBe(expected);
        });

        test("returns index when match starts in the middle", () => {
            const expected = 4;
            const result = strStr("mississippi", "issip");
            expect(result).toBe(expected);
        });
    });

    describe("placement and overlap", () => {
        test("finds match at the start", () => {
            const expected = 0;
            const result = strStr("prefixsuffix", "pre");
            expect(result).toBe(expected);
        });

        test("finds match at the end", () => {
            const expectedPrefixSuffix = 3;
            const resultPrefixSuffix = strStr("prefixsuffix", "fix");
            expect(resultPrefixSuffix).toBe(expectedPrefixSuffix);

            const expectedLookAtTheEnd = 9;
            const resultLookAtTheEnd = strStr("lookattheend", "end");
            expect(resultLookAtTheEnd).toBe(expectedLookAtTheEnd);
        });

        test("returns first index when multiple matches exist", () => {
            const expected = 0;
            const result = strStr("abcabcabc", "abc");
            expect(result).toBe(expected);
        });

        test("handles overlapping matches and returns earliest start", () => {
            const expected = 0;
            const result = strStr("aaaaa", "aaa");
            expect(result).toBe(expected);
        });
    });

    describe("deterministic larger cases", () => {
        test("finds a planted needle in a large haystack", () => {
            const haystack = `${"ab".repeat(2_000)}xyz${"cd".repeat(2_000)}`;
            const expected = 4_000;
            const result = strStr(haystack, "xyz");
            expect(result).toBe(expected);
        });

        test("returns -1 for large haystack without target", () => {
            const haystack = "abcdefghijklmnop".repeat(1_000);
            const expected = -1;
            const result = strStr(haystack, "qrstuv");
            expect(result).toBe(expected);
        });
    });

    describe("defensive contract", () => {
        test("does not mutate string inputs", () => {
            const haystack = "immutable-haystack";
            const needle = "table";

            const originalHaystack = haystack.slice();
            const originalNeedle = needle.slice();

            const expected = -1;
            const result = strStr(haystack, needle);
            expect(result).toBe(expected);

            expect(haystack).toBe(originalHaystack);
            expect(needle).toBe(originalNeedle);
        });
    });
});
