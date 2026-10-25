import { describe, expect, test } from "bun:test";
import {
    getBlogListing,
    getBlogListingPath,
    getTagCounts,
} from "./blog-listing";

interface TestPost {
    slug: string;
    tags?: string[];
}

function makePosts(count: number, tags: string[] = []): TestPost[] {
    return Array.from({ length: count }, (_, i) => ({
        slug: `post-${i + 1}`,
        tags,
    }));
}

describe("getTagCounts", () => {
    test("orders by count descending, then alphabetically", () => {
        const posts: TestPost[] = [
            { slug: "a", tags: ["dsa", "ai"] },
            { slug: "b", tags: ["ai"] },
            { slug: "c", tags: ["bun"] },
        ];

        const expected = [
            { tag: "ai", count: 2 },
            { tag: "bun", count: 1 },
            { tag: "dsa", count: 1 },
        ];
        const result = getTagCounts(posts);

        expect(result).toEqual(expected);
    });

    test("counts a post once per tag and tolerates missing tags", () => {
        const posts: TestPost[] = [
            { slug: "a", tags: ["ai", "ai"] },
            { slug: "b" },
        ];

        const expected = [{ tag: "ai", count: 1 }];
        const result = getTagCounts(posts);

        expect(result).toEqual(expected);
    });
});

describe("getBlogListing", () => {
    test("returns the first page of all posts by default", () => {
        const posts = makePosts(30);

        const result = getBlogListing(posts, {}, 12);

        expect(result.page).toBe(1);
        expect(result.totalPages).toBe(3);
        expect(result.total).toBe(30);
        expect(result.items.map((p) => p.slug)).toEqual(
            posts.slice(0, 12).map((p) => p.slug)
        );
    });

    test("returns the requested page, with a short final page", () => {
        const posts = makePosts(30);

        const result = getBlogListing(posts, { page: "3" }, 12);

        expect(result.page).toBe(3);
        expect(result.items).toHaveLength(6);
    });

    test("filters by a known tag and paginates the matches", () => {
        const posts = [...makePosts(5, ["dsa"]), ...makePosts(20, ["ai"])];

        const result = getBlogListing(posts, { tag: "dsa" }, 3);

        expect(result.activeTag).toBe("dsa");
        expect(result.total).toBe(5);
        expect(result.totalPages).toBe(2);
        expect(result.items).toHaveLength(3);
    });

    test("ignores an unknown tag instead of showing an empty list", () => {
        const posts = makePosts(4, ["ai"]);

        const result = getBlogListing(posts, { tag: "nope" }, 12);

        expect(result.activeTag).toBeNull();
        expect(result.total).toBe(4);
    });

    test("clamps out-of-range and malformed pages", () => {
        const posts = makePosts(30);

        expect(getBlogListing(posts, { page: "99" }, 12).page).toBe(3);
        expect(getBlogListing(posts, { page: "0" }, 12).page).toBe(1);
        expect(getBlogListing(posts, { page: "-4" }, 12).page).toBe(1);
        expect(getBlogListing(posts, { page: "abc" }, 12).page).toBe(1);
        expect(getBlogListing(posts, { page: null }, 12).page).toBe(1);
    });

    test("returns one empty page when there are no posts", () => {
        const result = getBlogListing([], {}, 12);

        expect(result.page).toBe(1);
        expect(result.totalPages).toBe(1);
        expect(result.items).toEqual([]);
    });
});

describe("getBlogListingPath", () => {
    test("collapses the default view to /blog", () => {
        const expected = "/blog";
        const result = getBlogListingPath({ tag: null, page: 1 });

        expect(result).toBe(expected);
    });

    test("includes only the parts that differ from the default", () => {
        expect(getBlogListingPath({ tag: "dsa" })).toBe("/blog?tag=dsa");
        expect(getBlogListingPath({ page: 2 })).toBe("/blog?page=2");
        expect(getBlogListingPath({ tag: "system-design", page: 3 })).toBe(
            "/blog?tag=system-design&page=3"
        );
    });
});
