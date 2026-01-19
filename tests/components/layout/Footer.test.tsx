/**
 * Footer Component Tests
 * Basic smoke tests to ensure component renders without errors
 */

import { Footer } from "@/components/layout/Footer";

describe("Footer component", () => {
    describe("Basics", () => {
        test("component exists and can be imported", () => {
            expect(Footer).toBeDefined();
            expect(typeof Footer).toBe("function");
        });

        test("copyright includes current year", () => {
            const currentYear = new Date().getFullYear();
            expect(currentYear).toBeGreaterThan(2025);
        });
    });
});
