/**
 * Tests for Count Primes
 */

import { describe, expect, test } from "bun:test";
import { countPrimes } from "./solution";

describe("Count Primes", () => {
    describe("Basics", () => {
        test("solves leetcode example 1", () => {
            const expected = 4;
            const result = countPrimes(10);
            expect(result).toBe(expected);
        });

        test("solves leetcode example 2", () => {
            const expected = 0;
            const result = countPrimes(0);
            expect(result).toBe(expected);
        });

        test("solves leetcode example 3", () => {
            const expected = 0;
            const result = countPrimes(1);
            expect(result).toBe(expected);
        });

        test("counts primes below 100", () => {
            const expected = 25;
            const result = countPrimes(100);
            expect(result).toBe(expected);
        });
    });

    describe("Edge Cases", () => {
        test("returns 0 for n = 2 because the bound is exclusive", () => {
            const expected = 0;
            const result = countPrimes(2);
            expect(result).toBe(expected);
        });

        test("returns 1 for n = 3 (only 2 is below 3)", () => {
            const expected = 1;
            const result = countPrimes(3);
            expect(result).toBe(expected);
        });

        test("excludes n itself when n is prime", () => {
            const expected = 7;
            const result = countPrimes(19);
            expect(result).toBe(expected);
        });

        test("includes the largest prime below n when n is composite", () => {
            const expected = 9;
            const result = countPrimes(24);
            expect(result).toBe(expected);
        });

        test("handles perfect squares of primes (49 = 7 * 7)", () => {
            const expected = 15;
            const result = countPrimes(50);
            expect(result).toBe(expected);
        });

        test("does not count the composite prime square 49 itself", () => {
            const expected = 15;
            const result = countPrimes(49);
            expect(result).toBe(expected);
        });
    });

    describe("Stress Tests", () => {
        test("counts primes below 1,000", () => {
            const expected = 168;
            const result = countPrimes(1_000);
            expect(result).toBe(expected);
        });

        test("counts primes below 1,000,000", () => {
            const expected = 78_498;
            const result = countPrimes(1_000_000);
            expect(result).toBe(expected);
        });

        test("counts primes below the max constraint of 5,000,000", () => {
            const expected = 348_513;
            const result = countPrimes(5_000_000);
            expect(result).toBe(expected);
        });
    });

    describe("Contract", () => {
        test("is deterministic across repeated calls", () => {
            const expected = countPrimes(10_000);
            const result = countPrimes(10_000);
            expect(result).toBe(expected);
        });
    });
});
