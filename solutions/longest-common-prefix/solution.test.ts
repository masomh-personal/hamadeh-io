/**
 * Tests for Longest Common Prefix
 */

import { describe, expect, test } from "bun:test";
import { longestCommonPrefix } from "./solution";

describe("longestCommonPrefix", () => {
    test("solves leetcode example 1", () => {
        const strs = ["flower", "flow", "flight"];
        expect(longestCommonPrefix(strs)).toBe("fl");
    });

    test("solves leetcode example 2", () => {
        const strs = ["dog", "racecar", "car"];
        expect(longestCommonPrefix(strs)).toBe("");
    });

    test("returns the only string for single-element input", () => {
        const strs = ["alone"];
        expect(longestCommonPrefix(strs)).toBe("alone");
    });

    test("returns empty when input contains an empty string", () => {
        const strs = ["prefix", "", "pre"];
        expect(longestCommonPrefix(strs)).toBe("");
    });

    test("returns empty when first characters do not match", () => {
        const strs = ["abc", "xbc", "ybc"];
        expect(longestCommonPrefix(strs)).toBe("");
    });

    test("returns shortest string when it is a full prefix of others", () => {
        const strs = ["ab", "abc", "abcd", "abxyz"];
        expect(longestCommonPrefix(strs)).toBe("ab");
    });

    test("returns full string when all strings are identical", () => {
        const strs = ["same", "same", "same"];
        expect(longestCommonPrefix(strs)).toBe("same");
    });

    test("handles repeated-character strings", () => {
        const strs = ["aaaaa", "aaa", "aaaa", "aa"];
        expect(longestCommonPrefix(strs)).toBe("aa");
    });

    test("stops exactly at first mismatch after long shared prefix", () => {
        const shared = "a".repeat(100);
        const strs = [`${shared}x-tail`, `${shared}y-tail`, `${shared}z-tail`];
        expect(longestCommonPrefix(strs)).toBe(shared);
    });

    test("handles punctuation-like lower alpha boundaries as plain chars", () => {
        const strs = ["leetcode", "leet", "leets"];
        expect(longestCommonPrefix(strs)).toBe("leet");
    });

    test("handles many strings with deterministic overlap", () => {
        const strs = Array.from(
            { length: 200 },
            (_, i) => `prefix-common-${i.toString().padStart(3, "0")}`
        );
        expect(longestCommonPrefix(strs)).toBe("prefix-common-");
    });

    test("handles max-length string patterns within constraints", () => {
        const common = "b".repeat(199);
        const strs = [`${common}x`, `${common}y`, `${common}z`, `${common}w`];
        expect(longestCommonPrefix(strs)).toBe(common);
    });

    test("does not mutate input array", () => {
        const strs = ["interview", "internal", "internet"];
        const before = [...strs];

        longestCommonPrefix(strs);

        expect(strs).toEqual(before);
    });
});
