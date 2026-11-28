import { assertNoHorizontalOverflow, expect, test } from "./fixtures";

test.describe("Homepage", () => {
    test("renders hero, featured writing, featured problems, and has no horizontal overflow", async ({
        page,
    }) => {
        await page.goto("/");

        await expect(
            page.getByRole("heading", { level: 1, name: /Hi! I'm Masom/i })
        ).toBeVisible();
        await expect(
            page.getByRole("heading", { level: 2, name: "Featured Writing" })
        ).toBeVisible();
        await expect(
            page.getByRole("heading", {
                level: 2,
                name: "Featured Code Problems",
            })
        ).toBeVisible();

        const blogCards = page.locator('a[href^="/blog/"]');
        const problemCards = page.locator('a[href^="/problems/"]');
        expect(await blogCards.count()).toBeGreaterThan(0);
        expect(await problemCards.count()).toBeGreaterThan(0);

        await assertNoHorizontalOverflow(page);
    });

    test("primary CTA links navigate cleanly to blog, problems, and about", async ({
        page,
    }) => {
        await page.goto("/");

        await page.getByRole("link", { name: "Read the blog" }).click();
        await expect(page).toHaveURL(/\/blog$/);
        await expect(
            page.getByRole("heading", { level: 1, name: "Blog" })
        ).toBeVisible();

        await page.goto("/");
        await page.getByRole("link", { name: "View Code Problems" }).click();
        await expect(page).toHaveURL(/\/problems$/);
        await expect(
            page.getByRole("heading", { level: 1, name: "Code Problems" })
        ).toBeVisible();

        await page.goto("/");
        await page.getByRole("link", { name: "Learn more about me" }).click();
        await expect(page).toHaveURL(/\/about$/);
        await expect(
            page.getByRole("heading", { level: 1, name: "About Me" })
        ).toBeVisible();
    });

    test("highlights active desktop header nav link across routes", async ({
        page,
        isMobile,
    }) => {
        test.skip(isMobile, "Desktop header nav check");

        const nav = page.locator("header nav");
        for (const [route, label] of [
            ["/blog", "Blog"],
            ["/problems", "Code Problems"],
            ["/components", "Components"],
            ["/about", "About"],
        ] as const) {
            await page.goto(route);
            await expect(
                nav.getByRole("link", { name: label, exact: true })
            ).toHaveAttribute("aria-current", "page");
        }
    });
});
