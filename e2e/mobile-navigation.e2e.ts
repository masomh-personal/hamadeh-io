import { assertNoHorizontalOverflow, expect, test } from "./fixtures";

test.describe("Mobile navigation and responsive layout", () => {
    test.beforeEach(({ isMobile }) => {
        test.skip(!isMobile, "Mobile-only assertions");
    });

    test("opens and closes mobile menu via toggle, outside tap, Escape, and route navigation/history", async ({
        page,
    }) => {
        await page.goto("/");

        const openButton = page.getByRole("button", {
            name: "Open navigation menu",
        });
        const menuPanel = page.locator("#mobile-navigation");

        // Open menu and verify first link receives focus
        await openButton.click();
        await expect(menuPanel).toBeVisible();
        await expect(menuPanel.locator("a[href]").first()).toBeFocused();

        // Close on Escape and return focus to menu toggle button
        await page.keyboard.press("Escape");
        await expect(menuPanel).toBeHidden();
        await expect(openButton).toBeFocused();

        // Open again and close on outside tap
        await openButton.click();
        await expect(menuPanel).toBeVisible();
        await expect(menuPanel.locator("a[href]").first()).toBeFocused();
        await page
            .getByRole("heading", { level: 2, name: "Featured Writing" })
            .tap();
        await expect(menuPanel).toBeHidden();

        // Open, navigate to /blog, and verify menu closes and stays closed on Back/Forward
        await openButton.click();
        await expect(menuPanel).toBeVisible();
        await menuPanel.getByRole("link", { name: "Blog" }).click();
        await expect(page).toHaveURL(/\/blog$/);
        await expect(menuPanel).toBeHidden();

        await page.goBack();
        await expect(page).toHaveURL(/\/$/);
        await expect(menuPanel).toBeHidden();

        await page.goForward();
        await expect(page).toHaveURL(/\/blog$/);
        await expect(menuPanel).toBeHidden();
    });

    test("renders horizontal filter pill rows without page-level horizontal overflow", async ({
        page,
    }) => {
        for (const [route, navLabel] of [
            ["/blog", "Filter by topic"],
            ["/problems", "Filter by difficulty"],
        ] as const) {
            await page.goto(route);

            const filterList = page
                .getByRole("navigation", { name: navLabel })
                .locator("ul");
            await expect(filterList).toBeVisible();
            await expect(filterList).toHaveCSS("overflow-x", "auto");

            await assertNoHorizontalOverflow(page);
        }
    });
});
