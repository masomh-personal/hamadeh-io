/**
 * Tests for Add Binary
 */

import { describe, expect, test } from "bun:test";
import { addBinary } from "./solution";

describe("addBinary", () => {
    test("solves leetcode example 1: 11 + 1 = 100", () => {
        const a = "11";
        const b = "1";
        const expected = "100";
        const result = addBinary(a, b);

        expect(result).toBe(expected);
    });

    test("solves leetcode example 2: 1010 + 1011 = 10101", () => {
        const a = "1010";
        const b = "1011";
        const expected = "10101";
        const result = addBinary(a, b);

        expect(result).toBe(expected);
    });

    test("handles adding two zeros", () => {
        const a = "0";
        const b = "0";
        const expected = "0";
        const result = addBinary(a, b);

        expect(result).toBe(expected);
    });

    test("handles one operand being zero", () => {
        const a = "1101";
        const b = "0";
        const expected = "1101";
        const result = addBinary(a, b);

        expect(result).toBe(expected);
    });

    test("handles carry that propagates across all bits", () => {
        // 1111 + 1 = 10000
        const a = "1111";
        const b = "1";
        const expected = "10000";
        const result = addBinary(a, b);

        expect(result).toBe(expected);
    });

    test("handles inputs of very different lengths", () => {
        // 1 + 111 = 1000
        const a = "1";
        const b = "111";
        const expected = "1000";
        const result = addBinary(a, b);

        expect(result).toBe(expected);
    });

    test("handles single-bit inputs: 1 + 1 = 10", () => {
        const a = "1";
        const b = "1";
        const expected = "10";
        const result = addBinary(a, b);

        expect(result).toBe(expected);
    });

    test("does not mutate the input strings", () => {
        const a = "1010";
        const b = "1011";
        const aCopy = a;
        const bCopy = b;

        addBinary(a, b);

        expect(a).toBe(aCopy);
        expect(b).toBe(bCopy);
    });

    test("handles large inputs deterministically", () => {
        // 30-bit all-ones + 1 = 1 followed by 30 zeros
        const a = "1".repeat(30);
        const b = "1";
        const expected = `1${"0".repeat(30)}`;
        const result = addBinary(a, b);

        expect(result).toBe(expected);
    });
});
