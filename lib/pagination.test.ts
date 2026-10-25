import { describe, expect, test } from "bun:test";
import { buildListingPath, paginate } from "./pagination";

const items = Array.from({ length: 30 }, (_, i) => i + 1);

describe("paginate", () => {
    test("returns the requested page of items", () => {
        const result = paginate(items, "2", 12);

        expect(result.page).toBe(2);
        expect(result.totalPages).toBe(3);
        expect(result.items).toEqual(items.slice(12, 24));
    });

    test("returns a short final page", () => {
        const result = paginate(items, "3", 12);

        expect(result.items).toHaveLength(6);
    });

    test("falls back to the first page for missing or malformed input", () => {
        expect(paginate(items, null, 12).page).toBe(1);
        expect(paginate(items, undefined, 12).page).toBe(1);
        expect(paginate(items, "abc", 12).page).toBe(1);
        expect(paginate(items, "0", 12).page).toBe(1);
        expect(paginate(items, "-4", 12).page).toBe(1);
    });

    test("clamps a page past the end to the last page", () => {
        const result = paginate(items, "99", 12);

        expect(result.page).toBe(3);
    });

    test("returns one empty page for no items", () => {
        const result = paginate([], null, 12);

        expect(result).toEqual({ page: 1, totalPages: 1, items: [] });
    });
});

describe("buildListingPath", () => {
    test("collapses the default view to the base path", () => {
        const expected = "/blog";
        const result = buildListingPath("/blog", { tag: null }, 1);

        expect(result).toBe(expected);
    });

    test("includes only the filters and page that differ from the default", () => {
        expect(buildListingPath("/blog", { tag: "dsa" })).toBe("/blog?tag=dsa");
        expect(buildListingPath("/blog", {}, 2)).toBe("/blog?page=2");
        expect(buildListingPath("/problems", { difficulty: "hard" }, 3)).toBe(
            "/problems?difficulty=hard&page=3"
        );
    });
});
