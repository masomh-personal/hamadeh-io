/**
 * Tests for Longest Common Prefix
 */

import { describe, expect, test } from "bun:test";
import { longestCommonPrefix } from "./solution";

describe("longestCommonPrefix", () => {
    test("solves leetcode example 1", () => {
        const strs = ["flower", "flow", "flight"];
        const expected = "fl";
        const result = longestCommonPrefix(strs);
        expect(result).toBe(expected);
    });

    test("solves leetcode example 2", () => {
        const strs = ["dog", "racecar", "car"];
        const expected = "";
        const result = longestCommonPrefix(strs);
        expect(result).toBe(expected);
    });

    test("returns the only string for single-element input", () => {
        const strs = ["alone"];
        const expected = "alone";
        const result = longestCommonPrefix(strs);
        expect(result).toBe(expected);
    });

    test("returns empty when input contains an empty string", () => {
        const strs = ["prefix", "", "pre"];
        const expected = "";
        const result = longestCommonPrefix(strs);
        expect(result).toBe(expected);
    });

    test("returns empty when first characters do not match", () => {
        const strs = ["abc", "xbc", "ybc"];
        const expected = "";
        const result = longestCommonPrefix(strs);
        expect(result).toBe(expected);
    });

    test("returns shortest string when it is a full prefix of others", () => {
        const strs = ["ab", "abc", "abcd", "abxyz"];
        const expected = "ab";
        const result = longestCommonPrefix(strs);
        expect(result).toBe(expected);
    });

    test("returns full string when all strings are identical", () => {
        const strs = ["same", "same", "same"];
        const expected = "same";
        const result = longestCommonPrefix(strs);
        expect(result).toBe(expected);
    });

    test("handles repeated-character strings", () => {
        const strs = ["aaaaa", "aaa", "aaaa", "aa"];
        const expected = "aa";
        const result = longestCommonPrefix(strs);
        expect(result).toBe(expected);
    });

    test("stops exactly at first mismatch after long shared prefix", () => {
        const shared = "a".repeat(100);
        const strs = [`${shared}x-tail`, `${shared}y-tail`, `${shared}z-tail`];
        const expected = shared;
        const result = longestCommonPrefix(strs);
        expect(result).toBe(expected);
    });

    test("handles punctuation-like lower alpha boundaries as plain chars", () => {
        const strs = ["leetcode", "leet", "leets"];
        const expected = "leet";
        const result = longestCommonPrefix(strs);
        expect(result).toBe(expected);
    });

    test("handles many strings with deterministic overlap", () => {
        const strs = Array.from(
            { length: 200 },
            (_, i) => `prefix-common-${i.toString().padStart(3, "0")}`
        );
        const expected = "prefix-common-";
        const result = longestCommonPrefix(strs);
        expect(result).toBe(expected);
    });

    test("handles max-length string patterns within constraints", () => {
        const common = "b".repeat(199);
        const strs = [`${common}x`, `${common}y`, `${common}z`, `${common}w`];
        const expected = common;
        const result = longestCommonPrefix(strs);
        expect(result).toBe(expected);
    });

    test("does not mutate input array", () => {
        const strs = ["interview", "internal", "internet"];
        const before = [...strs];

        const expected = "inter";
        const result = longestCommonPrefix(strs);
        expect(result).toBe(expected);

        const resultInput = strs;
        const expectedInput = before;
        expect(resultInput).toEqual(expectedInput);
    });
});
