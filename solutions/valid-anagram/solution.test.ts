/**
 * Tests for Valid Anagram
 */

import { describe, expect, test } from "bun:test";
import { isAnagram } from "./solution";

describe("isAnagram", () => {
    describe("leetcode examples", () => {
        test("example 1 returns true for anagrams", () => {
            const s = "anagram";
            const t = "nagaram";

            expect(isAnagram(s, t)).toBe(true);
        });

        test("example 2 returns false for non-anagrams", () => {
            const s = "rat";
            const t = "car";

            expect(isAnagram(s, t)).toBe(false);
        });
    });

    describe("basics", () => {
        test("returns true for identical strings", () => {
            const s = "abc";
            const t = "abc";

            expect(isAnagram(s, t)).toBe(true);
        });

        test("returns true for two empty strings", () => {
            const s = "";
            const t = "";

            expect(isAnagram(s, t)).toBe(true);
        });

        test("returns false when only one string is empty", () => {
            const s = "a";
            const t = "";

            expect(isAnagram(s, t)).toBe(false);
        });

        test("returns false when lengths differ", () => {
            const s = "ab";
            const t = "abc";

            expect(isAnagram(s, t)).toBe(false);
        });
    });

    describe("frequency validation", () => {
        test("returns true when repeated character frequencies match", () => {
            const s = "aabbcc";
            const t = "abcabc";

            expect(isAnagram(s, t)).toBe(true);
        });

        test("returns false when repeated character frequencies differ", () => {
            const s = "aacc";
            const t = "ccac";

            expect(isAnagram(s, t)).toBe(false);
        });

        test("returns false when strings share most characters but one differs", () => {
            const s = "listen";
            const t = "listel";

            expect(isAnagram(s, t)).toBe(false);
        });

        test("handles many repeated occurrences of one character", () => {
            const s = "zzzzzzzzzz";
            const t = "zzzzzzzzzz";

            expect(isAnagram(s, t)).toBe(true);
        });
    });

    describe("ordering and character-set behavior", () => {
        test("returns true for reverse-order anagrams", () => {
            const s = "abcdef";
            const t = "fedcba";

            expect(isAnagram(s, t)).toBe(true);
        });

        test("treats case differences as different characters", () => {
            const s = "a";
            const t = "A";

            expect(isAnagram(s, t)).toBe(false);
        });
    });

    describe("larger inputs", () => {
        test("returns true for a large deterministic anagram pair", () => {
            const s = `${"abcde".repeat(2000)}xyz`;
            const t = `${"edcba".repeat(2000)}zyx`;

            expect(isAnagram(s, t)).toBe(true);
        });

        test("returns false for a large pair with one frequency mismatch", () => {
            const s = `${"abcde".repeat(2000)}xyz`;
            const t = `${"edcba".repeat(2000)}xya`;

            expect(isAnagram(s, t)).toBe(false);
        });
    });
});
