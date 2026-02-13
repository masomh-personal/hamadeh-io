/**
 * Tests for Two Sum
 */

import { twoSum } from "./solution";

describe("Two Sum", () => {
    describe("Basics", () => {
        test("throws until implementation is added", () => {
            expect(() => twoSum([2, 7, 11, 15], 9)).toThrow(
                "Not implemented yet."
            );
        });
    });

    describe("Edge Cases", () => {
        test("throws for placeholder edge-case call", () => {
            expect(() => twoSum([3, 3], 6)).toThrow("Not implemented yet.");
        });
    });
});
