import { assertNoHorizontalOverflow, expect, test } from "./fixtures";

test.describe("Reduced motion accessibility", () => {
    test.use({ reducedMotion: "reduce" });

    test("honors prefers-reduced-motion and disables motion-reduce animations", async ({
        page,
    }) => {
        await page.goto("/components");

        const prefersReduced = await page.evaluate(
            () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
        );
        expect(prefersReduced).toBe(true);

        await page.getByRole("tab", { name: /Search/i }).click();

        // The terminal searching icon uses motion-reduce:animate-none
        const terminalAnimationName = await page
            .getByRole("status", { name: "Searching" })
            .nth(1)
            .locator("svg")
            .evaluate((el) => window.getComputedStyle(el).animationName);
        expect(terminalAnimationName).toBe("none");

        await assertNoHorizontalOverflow(page);
    });

    test("renders core routes cleanly under reduced motion", async ({
        page,
    }) => {
        for (const route of ["/", "/blog", "/problems", "/about"]) {
            await page.goto(route);
            await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
            await assertNoHorizontalOverflow(page);
        }
    });
});
