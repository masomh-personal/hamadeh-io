/**
 * Tests for Length of Last Word
 */

import { describe, expect, test } from "bun:test";
import { lengthOfLastWord } from "./solution";

describe("lengthOfLastWord", () => {
    test("solves leetcode example 1", () => {
        const expected = 5;
        const result = lengthOfLastWord("Hello World");
        expect(result).toBe(expected);
    });

    test("solves leetcode example 2 - trailing spaces", () => {
        const expected = 4;
        const result = lengthOfLastWord("   fly me   to   the moon  ");
        expect(result).toBe(expected);
    });

    test("solves leetcode example 3 - no trailing spaces", () => {
        const expected = 6;
        const result = lengthOfLastWord("luffy is still joyboy");
        expect(result).toBe(expected);
    });

    test("handles single trailing space", () => {
        const expected = 4;
        const result = lengthOfLastWord("word ");
        expect(result).toBe(expected);
    });

    test("handles multiple trailing spaces", () => {
        const expected = 4;
        const result = lengthOfLastWord("word    ");
        expect(result).toBe(expected);
    });

    test("handles leading spaces before single word", () => {
        const expected = 5;
        const result = lengthOfLastWord("   hello");
        expect(result).toBe(expected);
    });

    test("handles single word with no spaces", () => {
        const expected = 5;
        const result = lengthOfLastWord("world");
        expect(result).toBe(expected);
    });

    test("handles single-character word", () => {
        const expected = 1;
        const result = lengthOfLastWord("a");
        expect(result).toBe(expected);
    });

    test("handles single-character word with surrounding spaces", () => {
        const expected = 1;
        const result = lengthOfLastWord("  z  ");
        expect(result).toBe(expected);
    });

    test("handles two words with multiple spaces between them", () => {
        const expected = 3;
        const result = lengthOfLastWord("foo     bar");
        expect(result).toBe(expected);
    });

    test("handles last word being much shorter than earlier words", () => {
        const expected = 2;
        const result = lengthOfLastWord("superlongword   hi");
        expect(result).toBe(expected);
    });

    test("handles last word being much longer than earlier words", () => {
        const expected = 17;
        const result = lengthOfLastWord("hi superlongwordhere");
        expect(result).toBe(expected);
    });

    test("handles deterministic large input near max constraint", () => {
        // Build: "a ".repeat(4999) + "bbb" -> last word is "bbb" of length 3
        const prefix = "a ".repeat(4999);
        const s = `${prefix}bbb`;
        const expected = 3;
        const result = lengthOfLastWord(s);
        expect(result).toBe(expected);
    });

    test("handles single long word at max length", () => {
        const s = "z".repeat(10000);
        const expected = 10000;
        const result = lengthOfLastWord(s);
        expect(result).toBe(expected);
    });

    test("does not mutate the input string (contract)", () => {
        const s = "immutable input check";
        const copy = s;
        lengthOfLastWord(s);
        // strings in JS are immutable by value; verifying same reference is fine
        expect(s).toBe(copy);
    });
});
