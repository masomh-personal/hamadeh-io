import { assertNoHorizontalOverflow, expect, test } from "./fixtures";

test.describe("Blog listing and post pages", () => {
    test("filters posts by topic tag and syncs URL query param", async ({
        page,
    }) => {
        await page.goto("/blog");
        await assertNoHorizontalOverflow(page);

        const filterNav = page.getByRole("navigation", {
            name: "Filter by topic",
        });
        const firstTopic = filterNav.locator('a[href*="tag="]').first();
        await expect(firstTopic).toBeVisible();
        const href = await firstTopic.getAttribute("href");
        expect(href).toBeTruthy();

        await firstTopic.click();
        await expect(page).toHaveURL(/\?tag=/);
        await expect(firstTopic).toHaveAttribute("aria-current", "page");

        const postsSection = page.getByRole("region", { name: "Blog posts" });
        await expect(
            postsSection.locator('a[href^="/blog/"]').first()
        ).toBeVisible();
    });

    test("searches by title and body copy with debounce, searching indicator, URL sync, empty state, and clear", async ({
        page,
    }) => {
        await page.goto("/blog");

        const searchInput = page.getByRole("searchbox", {
            name: "Search all blog posts",
        });

        // Search by title / body keyword: verify searching indicator appears after debounce,
        // then URL ?q= syncs and matching results render.
        await searchInput.fill("circuit");

        await expect(
            page.getByRole("status", { name: "Searching" })
        ).toBeVisible();
        await expect(
            page.getByText("Searching posts...").first()
        ).toBeVisible();

        await expect(page).toHaveURL(/\?q=circuit/);
        await expect(
            page.getByRole("status", { name: "Searching" })
        ).toBeHidden();
        await expect(
            page.getByText(/All posts matching "circuit"/i)
        ).toBeVisible();
        await expect(page.locator('a[href^="/blog/"]').first()).toBeVisible();

        // Body-copy search: query a phrase that appears in article body copy
        await searchInput.fill("exponential backoff");
        await expect(page).toHaveURL(/\?q=exponential/);
        await expect(page.locator('a[href^="/blog/"]').first()).toBeVisible();

        // Empty state + Clear search button
        await searchInput.fill("zzzxxyynonexistentquery999");
        await expect(page).toHaveURL(/\?q=zzzxxyynonexistentquery999/);
        await expect(page.getByText(/No posts match/i)).toBeVisible();

        await page
            .getByRole("button", { name: "Clear search" })
            .first()
            .click();
        await expect(page).toHaveURL(/\/blog$/);
        await expect(searchInput).toHaveValue("");
        await expect(page.getByText(/All posts ·/i)).toBeVisible();
    });

    test("supports pagination across blog pages", async ({ page }) => {
        await page.goto("/blog");

        const pagination = page.getByRole("navigation", { name: "Pagination" });
        await expect(pagination).toBeVisible();

        await pagination.getByRole("link", { name: "Next" }).click();
        await expect(page).toHaveURL(/\?page=2/);
        await expect(
            pagination.getByRole("link", { name: "2", exact: true })
        ).toHaveAttribute("aria-current", "page");

        await assertNoHorizontalOverflow(page);
    });

    test("renders blog post with series navigation, related posts, and heading anchor links", async ({
        page,
    }) => {
        // Multi-part SOLID series post has both Previous and Next links.
        await page.goto("/blog/solid-ocp-ai-era-part-2");

        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        await assertNoHorizontalOverflow(page);

        // Heading anchor link updates URL hash
        const anchorLink = page
            .locator('article h2 a[href^="#"], article h3 a[href^="#"]')
            .first();
        const anchorHref = await anchorLink.getAttribute("href");
        expect(anchorHref).toMatch(/^#.+/);
        await anchorLink.click();
        await expect(page).toHaveURL(new RegExp(`${anchorHref}$`));

        // Related posts section
        const relatedSection = page.getByRole("region", {
            name: "Related posts",
        });
        await expect(relatedSection).toBeVisible();
        expect(
            await relatedSection.locator('a[href^="/blog/"]').count()
        ).toBeGreaterThan(0);

        // Series navigation (Previous and Next)
        const seriesNav = page.getByRole("navigation", {
            name: /series navigation/i,
        });
        await expect(seriesNav).toBeVisible();
        await expect(seriesNav.getByText("Previous")).toBeVisible();
        await expect(seriesNav.getByText("Next")).toBeVisible();

        await seriesNav.locator('a[href^="/blog/"]').last().click();
        await expect(page).toHaveURL(/\/blog\/solid-lsp-ai-era-part-3$/);
    });

    test("hydrates deep-linked ?q= URL, clears search when switching topic, and handles invalid query params", async ({
        page,
    }) => {
        // Cold load with ?q= hydrates input and filtered list
        await page.goto("/blog?q=circuit");
        const searchInput = page.getByRole("searchbox", {
            name: "Search all blog posts",
        });
        await expect(searchInput).toHaveValue("circuit");
        await expect(
            page.getByText(/All posts matching "circuit"/i)
        ).toBeVisible();

        // Clicking a topic filter while searching switches to tag mode and clears search input
        const firstTopic = page
            .getByRole("navigation", { name: "Filter by topic" })
            .locator('a[href*="tag="]')
            .first();
        await firstTopic.click();
        await expect(page).toHaveURL(/\?tag=/);
        await expect(searchInput).toHaveValue("");

        // Invalid tag and out-of-range page gracefully fall back without crashing
        await page.goto("/blog?tag=does-not-exist&page=999");
        await expect(
            page.getByRole("heading", { level: 1, name: "Blog" })
        ).toBeVisible();
        await expect(page.locator('a[href^="/blog/"]').first()).toBeVisible();
    });
});
