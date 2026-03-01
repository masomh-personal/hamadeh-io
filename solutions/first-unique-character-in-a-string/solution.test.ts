/**
 * Tests for First Unique Character in a String
 */

import { describe, expect, test } from "bun:test";
import { firstUniqChar } from "./solution";

describe("firstUniqChar", () => {
    describe("leetcode examples", () => {
        test('example 1: "leetcode" returns 0', () => {
            expect(firstUniqChar("leetcode")).toBe(0);
        });

        test('example 2: "loveleetcode" returns 2', () => {
            expect(firstUniqChar("loveleetcode")).toBe(2);
        });

        test('example 3: "aabb" returns -1', () => {
            expect(firstUniqChar("aabb")).toBe(-1);
        });
    });

    describe("basics", () => {
        test("returns -1 for an empty string", () => {
            expect(firstUniqChar("")).toBe(-1);
        });

        test("returns 0 for a single-character string", () => {
            expect(firstUniqChar("z")).toBe(0);
        });

        test("returns 0 when the first character is unique", () => {
            expect(firstUniqChar("zabcab")).toBe(0);
        });

        test("returns the only unique character at the end", () => {
            expect(firstUniqChar("aabbccd")).toBe(6);
        });
    });

    describe("frequency behavior", () => {
        test("skips repeated prefix characters to find first unique", () => {
            expect(firstUniqChar("aabbc")).toBe(4);
        });

        test("returns -1 when every character repeats", () => {
            expect(firstUniqChar("aabbccddeeff")).toBe(-1);
        });

        test("handles repeated runs and isolated unique in middle", () => {
            expect(firstUniqChar("aaabcccdd")).toBe(3);
        });

        test("handles alternating repeats with one later unique", () => {
            expect(firstUniqChar("ababcdcdex")).toBe(8);
        });
    });

    describe("position edge cases", () => {
        test("unique at the beginning", () => {
            expect(firstUniqChar("zaabbcc")).toBe(0);
        });

        test("no unique character in the middle-shaped case", () => {
            expect(firstUniqChar("aabccbdd")).toBe(-1);
        });

        test("unique at the final index", () => {
            expect(firstUniqChar("aabbccdde")).toBe(8);
        });
    });

    describe("larger deterministic inputs", () => {
        test("returns -1 for a large all-duplicated string", () => {
            const s = "abcdefghijklmnopqrstuvwxyz".repeat(2_000);
            expect(firstUniqChar(s)).toBe(-1);
        });

        test("returns -1 when appended char is already duplicated in large input", () => {
            const prefix = "abcdefghijklmnopqrstuvwxyz".repeat(2_000);
            const s = `${prefix}k`;
            expect(firstUniqChar(s)).toBe(-1);
        });

        test("finds unique at the end of a large lowercase string", () => {
            const prefix = "abcdefghijklmnoprstuvwxyz".repeat(2_000);
            const s = `${prefix}q`;
            expect(firstUniqChar(s)).toBe(s.length - 1);
        });

        test("finds earliest unique when many later uniques also exist", () => {
            const s = `${"aabbccddeeffgghhiijj".repeat(300)}xyz`;
            expect(firstUniqChar(s)).toBe(s.length - 3);
        });
    });
});
