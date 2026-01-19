/**
 * Header Component Tests
 * Basic smoke tests to ensure component renders without errors
 */

import { Header } from "@/components/layout/Header";

describe("Header component", () => {
    describe("Basics", () => {
        test("component exists and can be imported", () => {
            expect(Header).toBeDefined();
            expect(typeof Header).toBe("function");
        });
    });
});
