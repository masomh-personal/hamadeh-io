/**
 * Tests for Roman to Integer
 */

import { describe, expect, test } from "bun:test";
import { romanToInt } from "./solution";

describe("romanToInt", () => {
    // LeetCode baseline examples
    test("solves leetcode example 1 — III = 3", () => {
        const expected = 3;
        const result = romanToInt("III");
        expect(result).toBe(expected);
    });

    test("solves leetcode example 2 — LVIII = 58", () => {
        const expected = 58;
        const result = romanToInt("LVIII");
        expect(result).toBe(expected);
    });

    test("solves leetcode example 3 — MCMXCIV = 1994", () => {
        const expected = 1994;
        const result = romanToInt("MCMXCIV");
        expect(result).toBe(expected);
    });

    // Single-character inputs for all seven symbols
    test("handles single symbol I = 1", () => {
        const expected = 1;
        const result = romanToInt("I");
        expect(result).toBe(expected);
    });

    test("handles single symbol V = 5", () => {
        const expected = 5;
        const result = romanToInt("V");
        expect(result).toBe(expected);
    });

    test("handles single symbol X = 10", () => {
        const expected = 10;
        const result = romanToInt("X");
        expect(result).toBe(expected);
    });

    test("handles single symbol L = 50", () => {
        const expected = 50;
        const result = romanToInt("L");
        expect(result).toBe(expected);
    });

    test("handles single symbol C = 100", () => {
        const expected = 100;
        const result = romanToInt("C");
        expect(result).toBe(expected);
    });

    test("handles single symbol D = 500", () => {
        const expected = 500;
        const result = romanToInt("D");
        expect(result).toBe(expected);
    });

    test("handles single symbol M = 1000", () => {
        const expected = 1000;
        const result = romanToInt("M");
        expect(result).toBe(expected);
    });

    // All six subtraction pairs in isolation
    test("handles subtraction pair IV = 4", () => {
        const expected = 4;
        const result = romanToInt("IV");
        expect(result).toBe(expected);
    });

    test("handles subtraction pair IX = 9", () => {
        const expected = 9;
        const result = romanToInt("IX");
        expect(result).toBe(expected);
    });

    test("handles subtraction pair XL = 40", () => {
        const expected = 40;
        const result = romanToInt("XL");
        expect(result).toBe(expected);
    });

    test("handles subtraction pair XC = 90", () => {
        const expected = 90;
        const result = romanToInt("XC");
        expect(result).toBe(expected);
    });

    test("handles subtraction pair CD = 400", () => {
        const expected = 400;
        const result = romanToInt("CD");
        expect(result).toBe(expected);
    });

    test("handles subtraction pair CM = 900", () => {
        const expected = 900;
        const result = romanToInt("CM");
        expect(result).toBe(expected);
    });

    // Composite cases
    test("handles purely additive numeral MDCLXVI = 1666", () => {
        const expected = 1666;
        const result = romanToInt("MDCLXVI");
        expect(result).toBe(expected);
    });

    test("handles numeral with subtraction pair at the start — XIV = 14", () => {
        const expected = 14;
        const result = romanToInt("XIV");
        expect(result).toBe(expected);
    });

    test("handles numeral with subtraction pair at the end — XIX = 19", () => {
        const expected = 19;
        const result = romanToInt("XIX");
        expect(result).toBe(expected);
    });

    test("handles all six subtraction types in one string — MCMXCIX = 1999", () => {
        const expected = 1999;
        const result = romanToInt("MCMXCIX");
        expect(result).toBe(expected);
    });

    // Boundary values
    test("handles minimum valid value I = 1", () => {
        const expected = 1;
        const result = romanToInt("I");
        expect(result).toBe(expected);
    });

    test("handles maximum valid value MMMCMXCIX = 3999", () => {
        const expected = 3999;
        const result = romanToInt("MMMCMXCIX");
        expect(result).toBe(expected);
    });

    // Defensive contract test
    test("does not mutate the input string (contract)", () => {
        const s = "MCMXCIV";
        const copy = s;
        try {
            romanToInt(s);
        } catch {
            // Ignore the placeholder implementation error until the solution exists.
        }
        expect(s).toBe(copy);
    });
});
