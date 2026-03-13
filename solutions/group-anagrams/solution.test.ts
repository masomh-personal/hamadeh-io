/**
 * Tests for Group Anagrams
 *
 * Output order is not guaranteed, so each test sorts both the inner groups
 * and the outer array before comparing.
 */

import { describe, expect, test } from "bun:test";
import { groupAnagrams } from "./solution";

function normalize(groups: string[][]): string[][] {
    return groups
        .map((group) => [...group].sort())
        .sort((a, b) => a[0].localeCompare(b[0]));
}

describe("groupAnagrams", () => {
    describe("leetcode examples", () => {
        test("example 1: mixed anagram groups", () => {
            const strs = ["eat", "tea", "tan", "ate", "nat", "bat"];
            const expected = normalize([
                ["bat"],
                ["nat", "tan"],
                ["ate", "eat", "tea"],
            ]);
            const result = normalize(groupAnagrams(strs));

            expect(result).toEqual(expected);
        });

        test("example 2: single empty string", () => {
            const strs = [""];
            const expected = normalize([[""]]);
            const result = normalize(groupAnagrams(strs));

            expect(result).toEqual(expected);
        });

        test("example 3: single character string", () => {
            const strs = ["a"];
            const expected = normalize([["a"]]);
            const result = normalize(groupAnagrams(strs));

            expect(result).toEqual(expected);
        });
    });

    describe("basics", () => {
        test("all strings are anagrams of each other", () => {
            const strs = ["abc", "bca", "cab", "cba"];
            const expected = normalize([["abc", "bca", "cab", "cba"]]);
            const result = normalize(groupAnagrams(strs));

            expect(result).toEqual(expected);
        });

        test("no strings are anagrams of each other (all singletons)", () => {
            const strs = ["abc", "def", "ghi"];
            const expected = normalize([["abc"], ["def"], ["ghi"]]);
            const result = normalize(groupAnagrams(strs));

            expect(result).toEqual(expected);
        });

        test("single string in input", () => {
            const strs = ["hello"];
            const expected = normalize([["hello"]]);
            const result = normalize(groupAnagrams(strs));

            expect(result).toEqual(expected);
        });
    });

    describe("edge cases", () => {
        test("multiple empty strings group together", () => {
            const strs = ["", "", "a"];
            const expected = normalize([["", ""], ["a"]]);
            const result = normalize(groupAnagrams(strs));

            expect(result).toEqual(expected);
        });

        test("strings of different lengths are never grouped together", () => {
            const strs = ["a", "aa", "aaa"];
            const expected = normalize([["a"], ["aa"], ["aaa"]]);
            const result = normalize(groupAnagrams(strs));

            expect(result).toEqual(expected);
        });

        test("repeated characters handled correctly", () => {
            const strs = ["aab", "baa", "aba", "xyz"];
            const expected = normalize([["aab", "baa", "aba"], ["xyz"]]);
            const result = normalize(groupAnagrams(strs));

            expect(result).toEqual(expected);
        });

        test("single-character strings group correctly", () => {
            const strs = ["a", "b", "a", "c", "b"];
            const expected = normalize([["a", "a"], ["b", "b"], ["c"]]);
            const result = normalize(groupAnagrams(strs));

            expect(result).toEqual(expected);
        });
    });

    describe("contract", () => {
        test("does not mutate the input array", () => {
            const strs = ["eat", "tea", "tan", "ate", "nat", "bat"];
            const original = [...strs];

            groupAnagrams(strs);

            expect(strs).toEqual(original);
        });
    });

    describe("larger inputs", () => {
        test("large array with a known anagram group at the end", () => {
            const unique = Array.from({ length: 500 }, (_, i) => `word${i}`);
            const strs = [...unique, "listen", "silent"];
            const result = groupAnagrams(strs);

            const listenGroup = result
                .find((group) => group.includes("listen"))
                ?.sort();

            expect(listenGroup).toEqual(["listen", "silent"]);
        });

        test("all strings are the same word (one group)", () => {
            const strs = Array.from({ length: 1000 }, () => "abc");
            const result = groupAnagrams(strs);

            expect(result).toHaveLength(1);
            expect(result[0]).toHaveLength(1000);
        });
    });
});
