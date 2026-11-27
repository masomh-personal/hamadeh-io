import { describe, expect, test } from "bun:test";
import {
    assertUniqueBlogTagColors,
    BLOG_TAG_COLOR_MAP,
} from "@/components/blog/blog-tags";
import {
    getBlogListing,
    getBlogListingPath,
    getRelatedPosts,
    getSeriesNavigation,
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

    test("searches across all posts by title and body copy and clears the active tag", () => {
        const posts = [
            {
                slug: "timeouts",
                title: "Timeouts and Circuit Breakers",
                tags: ["system-design"],
            },
            {
                slug: "users",
                title: "Build for Users",
                tags: ["engineering"],
            },
        ];
        const bodyIndex = {
            timeouts: "Use exponential backoff with jitter.",
            users: "Focus on user trust and speed.",
        };
        const expectedSlugs = ["timeouts"];
        const result = getBlogListing(
            posts,
            { tag: "engineering", q: "jitter" },
            12,
            bodyIndex
        );

        expect(result.activeTag).toBeNull();
        expect(result.searchQuery).toBe("jitter");
        expect(result.items.map((post) => post.slug)).toEqual(expectedSlugs);
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

    test("encodes search queries and omits tag when searching", () => {
        const expected = "/blog?q=circuit+breaker&page=2";
        const result = getBlogListingPath({
            tag: "dsa",
            q: "  circuit   breaker ",
            page: 2,
        });

        expect(result).toBe(expected);
    });
});

describe("getSeriesNavigation", () => {
    const seriesPosts = [
        {
            slug: "part-2",
            title: "Part 2",
            series: "SOLID",
            seriesOrder: 2,
        },
        {
            slug: "part-1",
            title: "Part 1",
            series: "SOLID",
            seriesOrder: 1,
        },
        {
            slug: "part-3",
            title: "Part 3",
            series: "SOLID",
            seriesOrder: 3,
        },
        {
            slug: "standalone",
            title: "Standalone",
        },
    ];

    test("returns ordered previous and next posts for a middle entry", () => {
        const expected = {
            series: "SOLID",
            currentIndex: 1,
            total: 3,
            previousSlug: "part-1",
            nextSlug: "part-3",
        };
        const result = getSeriesNavigation(seriesPosts, seriesPosts[0]!);

        expect(result?.series).toBe(expected.series);
        expect(result?.currentIndex).toBe(expected.currentIndex);
        expect(result?.total).toBe(expected.total);
        expect(result?.previous?.slug).toBe(expected.previousSlug);
        expect(result?.next?.slug).toBe(expected.nextSlug);
    });

    test("returns null for standalone posts", () => {
        const expected = null;
        const result = getSeriesNavigation(seriesPosts, seriesPosts[3]!);

        expect(result).toBe(expected);
    });

    test("returns null previous on the first part and null next on the last part", () => {
        const first = getSeriesNavigation(seriesPosts, seriesPosts[1]!);
        const last = getSeriesNavigation(seriesPosts, seriesPosts[2]!);

        expect(first?.previous).toBeNull();
        expect(first?.next?.slug).toBe("part-2");
        expect(last?.previous?.slug).toBe("part-2");
        expect(last?.next).toBeNull();
    });

    test("returns null when a series has only one post", () => {
        const solo = [{ slug: "only", title: "Only", series: "Solo" }];
        const expected = null;
        const result = getSeriesNavigation(solo, solo[0]!);

        expect(result).toBe(expected);
    });

    test("falls back to title order when seriesOrder is omitted", () => {
        const unordered = [
            { slug: "b", title: "B", series: "Notes" },
            { slug: "a", title: "A", series: "Notes" },
        ];
        const expected = "b";
        const result = getSeriesNavigation(unordered, unordered[1]!)?.next
            ?.slug;

        expect(result).toBe(expected);
    });
});

describe("getRelatedPosts", () => {
    const posts = [
        {
            slug: "current",
            title: "Current",
            tags: ["ai", "engineering", "solid"],
            series: "SOLID",
        },
        {
            slug: "same-series",
            title: "Same Series",
            tags: ["ai", "engineering", "solid"],
            series: "SOLID",
        },
        {
            slug: "high-overlap",
            title: "High Overlap",
            tags: ["ai", "engineering"],
        },
        {
            slug: "low-overlap-b",
            title: "Z Low Overlap",
            tags: ["ai"],
        },
        {
            slug: "low-overlap-a",
            title: "A Low Overlap",
            tags: ["ai"],
        },
        {
            slug: "unrelated",
            title: "Unrelated",
            tags: ["bun"],
        },
    ];

    test("ranks by shared tags, breaks ties alphabetically, and excludes current and same-series posts", () => {
        const expected = ["high-overlap", "low-overlap-a", "low-overlap-b"];
        const result = getRelatedPosts(posts, posts[0]!, 3).map(
            (post) => post.slug
        );

        expect(result).toEqual(expected);
    });

    test("returns empty array when current has no tags or limit is non-positive", () => {
        const untagged = { slug: "none", title: "None" };

        expect(getRelatedPosts(posts, untagged, 3)).toEqual([]);
        expect(getRelatedPosts(posts, posts[0]!, 0)).toEqual([]);
    });
});

describe("BLOG_TAG_COLOR_MAP", () => {
    test("assigns a unique color to every registered blog tag", () => {
        const result = () => assertUniqueBlogTagColors(BLOG_TAG_COLOR_MAP);

        expect(result).not.toThrow();
    });
});
