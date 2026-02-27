/**
 * Tests for Valid Palindrome
 */

import { describe, expect, test } from "bun:test";
import { isPalindrome } from "./solution";

describe("isPalindrome", () => {
    describe("leetcode examples", () => {
        test("example 1: handles punctuation and casing", () => {
            const s = "A man, a plan, a canal: Panama";

            expect(isPalindrome(s)).toBe(true);
        });

        test("example 2: returns false for a non-palindrome phrase", () => {
            const s = "race a car";

            expect(isPalindrome(s)).toBe(false);
        });

        test("example 3: single non-alphanumeric counts as empty", () => {
            const s = " ";

            expect(isPalindrome(s)).toBe(true);
        });
    });

    describe("basics", () => {
        test("returns true for a simple palindrome", () => {
            expect(isPalindrome("abba")).toBe(true);
        });

        test("returns false for a simple non-palindrome", () => {
            expect(isPalindrome("abca")).toBe(false);
        });

        test("is case-insensitive", () => {
            expect(isPalindrome("RaceCar")).toBe(true);
        });
    });

    describe("edge cases", () => {
        test("returns true for an empty string", () => {
            expect(isPalindrome("")).toBe(true);
        });

        test("returns true when all characters are filtered out", () => {
            expect(isPalindrome(".,:;!?")).toBe(true);
        });

        test("handles digits as alphanumeric characters", () => {
            expect(isPalindrome("1221")).toBe(true);
        });

        test("handles mixed letters and digits", () => {
            expect(isPalindrome("1a2a1")).toBe(true);
        });

        test("returns false when mixed letters and digits are not symmetric", () => {
            expect(isPalindrome("1a2b1")).toBe(false);
        });
    });

    describe("input integrity", () => {
        test("does not mutate the input string", () => {
            const s = "No 'x' in Nixon";
            const original = s;

            void isPalindrome(s);

            expect(s).toBe(original);
        });
    });
});
