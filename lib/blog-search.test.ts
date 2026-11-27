import { describe, expect, test } from "bun:test";
import {
    MAX_SEARCH_QUERY_LENGTH,
    normalizeSearchQuery,
    parseBlogBodyIndex,
    searchBlogPosts,
    stripMarkdownForSearch,
} from "./blog-search";

describe("stripMarkdownForSearch", () => {
    test("removes markdown syntax while preserving readable text and code identifiers", () => {
        const markdown = [
            "## Slow Is Worse Than Down",
            "",
            "Check [Idempotency](/blog/idempotency-makes-api-retries-safe) and `Retry-After`.",
            "",
            "```typescript",
            "const limit = 100;",
            "```",
            "",
            "> **Tip:** always set timeouts.",
        ].join("\n");

        const expected =
            "Slow Is Worse Than Down Check Idempotency and Retry-After . const limit = 100; Tip: always set timeouts.";
        const result = stripMarkdownForSearch(markdown);

        expect(result).toBe(expected);
    });
});

describe("normalizeSearchQuery", () => {
    test("trims and collapses whitespace", () => {
        const expected = "circuit breaker";
        const result = normalizeSearchQuery("   circuit   breaker  ");

        expect(result).toBe(expected);
    });

    test("handles empty input and caps excessively long queries", () => {
        const emptyExpected = "";
        const emptyResult = normalizeSearchQuery(null);
        expect(emptyResult).toBe(emptyExpected);

        const longInput = "a".repeat(MAX_SEARCH_QUERY_LENGTH + 50);
        const result = normalizeSearchQuery(longInput);
        expect(result.length).toBe(MAX_SEARCH_QUERY_LENGTH);
    });
});

describe("parseBlogBodyIndex", () => {
    test("keeps valid string entries and ignores malformed values", () => {
        const payload = {
            "post-a": "plain text body",
            "post-b": 123,
            "post-c": null,
        };
        const expected = { "post-a": "plain text body" };
        const result = parseBlogBodyIndex(payload);

        expect(result).toEqual(expected);
    });

    test("returns an empty object for non-object payloads", () => {
        const expected = {};
        const result = parseBlogBodyIndex("not-an-object");

        expect(result).toEqual(expected);
    });
});

describe("searchBlogPosts", () => {
    const posts = [
        {
            slug: "timeouts",
            title: "Timeouts, Rate Limits, and Circuit Breakers",
            excerpt: "How systems stay upright when dependencies get slow.",
            tags: ["system-design", "backend"],
        },
        {
            slug: "caching",
            title: "Caching and Data Partitioning",
            excerpt: "Strategies for write-through and eviction.",
            tags: ["system-design"],
        },
        {
            slug: "users",
            title: "Build for Users, Not for Your Diff",
            excerpt: "Decide what to build from the user's seat.",
            tags: ["engineering"],
        },
    ];

    const bodyIndex = {
        timeouts:
            "Use token bucket rate limiting and exponential backoff with jitter.",
        caching:
            "A cache timeout or TTL expiration prevents stale reads over time.",
        users: "Shipping a reliable CSV export beats a half-baked engine.",
    };

    test("ranks title matches ahead of body copy matches", () => {
        const expected = ["timeouts", "caching"];
        const result = searchBlogPosts(posts, "timeout", bodyIndex).map(
            (post) => post.slug
        );

        expect(result).toEqual(expected);
    });

    test("matches terms that only appear in body copy", () => {
        const expected = ["timeouts"];
        const result = searchBlogPosts(
            posts,
            "exponential jitter",
            bodyIndex
        ).map((post) => post.slug);

        expect(result).toEqual(expected);
    });

    test("requires all search terms to match across title, excerpt, tags, or body", () => {
        const expected = ["users"];
        const result = searchBlogPosts(posts, "users csv", bodyIndex).map(
            (post) => post.slug
        );

        expect(result).toEqual(expected);
    });

    test("returns all posts unchanged when the query is blank", () => {
        const expected = ["timeouts", "caching", "users"];
        const result = searchBlogPosts(posts, "   ", bodyIndex).map(
            (post) => post.slug
        );

        expect(result).toEqual(expected);
    });

    test("still matches titles and excerpts before the body index loads", () => {
        const expected = ["timeouts"];
        const result = searchBlogPosts(posts, "circuit").map(
            (post) => post.slug
        );

        expect(result).toEqual(expected);
    });
});
