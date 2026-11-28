import { test as baseTest } from "@playwright/test";
import { assertNoHorizontalOverflow, expect, test } from "./fixtures";

test.describe("Static pages and machine-readable routes", () => {
    test("renders /about cleanly with no horizontal overflow", async ({
        page,
    }) => {
        await page.goto("/about");

        await expect(
            page.getByRole("heading", { level: 1, name: "About Me" })
        ).toBeVisible();
        await expect(
            page.getByRole("heading", {
                level: 2,
                name: "Professional Snapshot",
            })
        ).toBeVisible();
        await expect(
            page.getByRole("heading", {
                level: 2,
                name: "Experience Highlights",
            })
        ).toBeVisible();

        await assertNoHorizontalOverflow(page);
    });

    test("serves valid RSS XML at /blog/rss.xml", async ({ request }) => {
        const response = await request.get("/blog/rss.xml");
        expect(response.status()).toBe(200);
        expect(response.headers()["content-type"]).toContain(
            "application/rss+xml"
        );

        const body = await response.text();
        expect(body).toContain('<?xml version="1.0" encoding="UTF-8"?>');
        expect(body).toContain("<rss version=");
        expect(body).toContain("<channel>");
        expect(body).toContain("<item>");
    });

    test("serves non-empty JSON search indexes for blog and problems", async ({
        request,
    }) => {
        for (const path of [
            "/blog/search-index.json",
            "/problems/search-index.json",
        ]) {
            const response = await request.get(path);
            expect(response.status()).toBe(200);
            expect(response.headers()["content-type"]).toContain(
                "application/json"
            );

            const payload = (await response.json()) as Record<string, unknown>;
            const entries = Object.entries(payload);
            expect(entries.length).toBeGreaterThan(0);

            for (const [slug, text] of entries.slice(0, 5)) {
                expect(slug.length).toBeGreaterThan(0);
                expect(typeof text).toBe("string");
                expect((text as string).length).toBeGreaterThan(0);
            }
        }
    });

    test("serves valid /robots.txt, /sitemap.xml, OpenGraph images, and security headers", async ({
        request,
    }) => {
        const robots = await request.get("/robots.txt");
        expect(robots.status()).toBe(200);
        const robotsBody = await robots.text();
        expect(robotsBody).toContain("Disallow: /components");
        expect(robotsBody).toContain("Sitemap:");

        const sitemap = await request.get("/sitemap.xml");
        expect(sitemap.status()).toBe(200);
        const sitemapBody = await sitemap.text();
        expect(sitemapBody).toContain("<urlset");
        expect(sitemapBody).toContain("/blog/");
        expect(sitemapBody).toContain("/problems/");

        for (const ogPath of [
            "/opengraph-image.png",
            "/blog/solid-ocp-ai-era-part-2/opengraph-image.png",
            "/problems/lru-cache/opengraph-image.png",
        ]) {
            const og = await request.get(ogPath);
            expect(og.status()).toBe(200);
            expect(og.headers()["content-type"]).toContain("image/png");
        }

        const home = await request.get("/");
        expect(home.headers()["content-security-policy"]).toContain(
            "default-src 'self'"
        );
        expect(home.headers()["x-content-type-options"]).toBe("nosniff");
        expect(home.headers()["x-frame-options"]).toBe("DENY");
    });
});

baseTest.describe("Not Found (404) handling", () => {
    baseTest(
        "renders custom 404 page for unknown routes and navigates back home",
        async ({ page }) => {
            const pageErrors: string[] = [];
            page.on("pageerror", (error) => pageErrors.push(error.message));

            for (const missingPath of [
                "/this-route-does-not-exist",
                "/blog/nonexistent-post-slug",
                "/problems/nonexistent-problem-slug",
            ]) {
                const response = await page.goto(missingPath);
                expect(response?.status()).toBe(404);
                await expect(
                    page.getByRole("heading", { level: 1, name: "404" })
                ).toBeVisible();
                await expect(
                    page.getByRole("heading", {
                        level: 2,
                        name: "Oops! Page Not Found",
                    })
                ).toBeVisible();
                await assertNoHorizontalOverflow(page);
            }

            await page.getByRole("link", { name: "Go Home" }).click();
            await expect(page).toHaveURL(/\/$/);
            expect(pageErrors).toEqual([]);
        }
    );
});
