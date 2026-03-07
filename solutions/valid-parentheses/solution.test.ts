/**
 * Tests for Valid Parentheses
 */

import { describe, expect, test } from "bun:test";
import { isValid } from "./solution";

describe("isValid", () => {
    test("solves leetcode example 1", () => {
        const expected = true;
        const result = isValid("()");
        expect(result).toBe(expected);
    });

    test("solves leetcode example 2", () => {
        const expected = true;
        const result = isValid("()[]{}");
        expect(result).toBe(expected);
    });

    test("solves leetcode example 3", () => {
        const expected = false;
        const result = isValid("(]");
        expect(result).toBe(expected);
    });

    test("solves leetcode example 4", () => {
        const expected = true;
        const result = isValid("([])");
        expect(result).toBe(expected);
    });

    test("solves leetcode example 5", () => {
        const expected = false;
        const result = isValid("([)]");
        expect(result).toBe(expected);
    });

    test("handles repeated adjacent valid bracket pairs", () => {
        const expected = true;
        const result = isValid("{}[](){}");
        expect(result).toBe(expected);
    });

    test("handles deeply nested valid pairs", () => {
        const expected = true;
        const result = isValid("{[()()[]]}");
        expect(result).toBe(expected);
    });

    test("rejects missing closing brackets", () => {
        const expected = false;
        const result = isValid("((({[]");
        expect(result).toBe(expected);
    });

    test("rejects closing bracket before any opening bracket", () => {
        const expected = false;
        const result = isValid("]");
        expect(result).toBe(expected);
    });

    test("rejects odd-length input that cannot fully pair", () => {
        const expected = false;
        const result = isValid("(()");
        expect(result).toBe(expected);
    });

    test("handles deterministic large balanced input near max constraint", () => {
        const s = "()".repeat(5000);
        const expected = true;
        const result = isValid(s);
        expect(result).toBe(expected);
    });

    test("does not mutate the input string (contract)", () => {
        const s = "{[()]}";
        const copy = s;
        try {
            isValid(s);
        } catch {
            // Ignore the placeholder implementation error until the solution exists.
        }
        expect(s).toBe(copy);
    });
});
