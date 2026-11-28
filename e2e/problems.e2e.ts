import { assertNoHorizontalOverflow, expect, test } from "./fixtures";

test.describe("Problems listing and detail pages", () => {
    test("filters problems by difficulty and syncs URL query param", async ({
        page,
    }) => {
        await page.goto("/problems");
        await assertNoHorizontalOverflow(page);

        const filterNav = page.getByRole("navigation", {
            name: "Filter by difficulty",
        });
        const difficultyLink = filterNav
            .locator('a[href*="difficulty="]')
            .first();
        await difficultyLink.click();

        await expect(page).toHaveURL(/\?difficulty=/);
        await expect(difficultyLink).toHaveAttribute("aria-current", "page");

        const problemsSection = page.getByRole("region", {
            name: "Code problems",
        });
        await expect(
            problemsSection.locator('a[href^="/problems/"]').first()
        ).toBeVisible();
    });

    test("searches problems with searching indicator, URL sync, empty state, and clear", async ({
        page,
    }) => {
        await page.goto("/problems");

        const searchInput = page.getByRole("searchbox", {
            name: "Search all code problems",
        });

        await searchInput.fill("lru");
        await expect(
            page.getByRole("status", { name: "Searching" })
        ).toBeVisible();
        await expect(
            page.getByText("Searching problems...").first()
        ).toBeVisible();

        await expect(page).toHaveURL(/\?q=lru/);
        await expect(
            page.getByText(/All problems matching "lru"/i)
        ).toBeVisible();
        await expect(
            page.locator('a[href="/problems/lru-cache"]')
        ).toBeVisible();

        // Empty state + Clear search
        await searchInput.fill("zzzxxyynonexistentproblem999");
        await expect(page).toHaveURL(/\?q=zzzxxyynonexistentproblem999/);
        await expect(page.getByText(/No problems match/i)).toBeVisible();

        await page
            .getByRole("button", { name: "Clear search" })
            .first()
            .click();
        await expect(page).toHaveURL(/\/problems$/);
        await expect(searchInput).toHaveValue("");
    });

    test("supports pagination when multiple problem pages exist", async ({
        page,
    }) => {
        await page.goto("/problems");

        const pagination = page.getByRole("navigation", { name: "Pagination" });
        if ((await pagination.count()) > 0) {
            await pagination.getByRole("link", { name: "Next" }).click();
            await expect(page).toHaveURL(/\?page=2/);
            await expect(
                pagination.getByRole("link", { name: "2", exact: true })
            ).toHaveAttribute("aria-current", "page");
        }

        await assertNoHorizontalOverflow(page);
    });

    test("renders problem detail page and copies solution code via CopyCodeButton", async ({
        page,
        context,
    }) => {
        await context.grantPermissions(["clipboard-read", "clipboard-write"]);
        await page.goto("/problems/lru-cache");

        await expect(
            page.getByRole("heading", { level: 1, name: /LRU Cache/i })
        ).toBeVisible();
        await expect(page.getByText("Time Complexity")).toBeVisible();
        await expect(page.getByText("Space Complexity")).toBeVisible();
        await assertNoHorizontalOverflow(page);

        const copyButton = page
            .getByRole("button", { name: "Copy code" })
            .first();
        await expect(copyButton).toBeVisible();
        await copyButton.click();

        await expect(
            page.getByRole("button", { name: "Copied" }).first()
        ).toBeVisible();
        await expect(
            page.locator('output[aria-live="polite"]').first()
        ).toHaveText("Code copied to clipboard");
    });

    test("hydrates deep-linked ?q= URL and gracefully handles invalid filter/page params", async ({
        page,
    }) => {
        await page.goto("/problems?q=lru");
        const searchInput = page.getByRole("searchbox", {
            name: "Search all code problems",
        });
        await expect(searchInput).toHaveValue("lru");
        await expect(
            page.locator('a[href="/problems/lru-cache"]')
        ).toBeVisible();

        await page.goto("/problems?difficulty=impossible&page=-1");
        await expect(
            page.getByRole("heading", { level: 1, name: "Code Problems" })
        ).toBeVisible();
        await expect(
            page.locator('a[href^="/problems/"]').first()
        ).toBeVisible();
    });
});
