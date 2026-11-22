import { describe, expect, test } from "bun:test";
import {
    createHeadingIdAllocator,
    slugifyHeading,
} from "./RichMarkdownContent";

describe("slugifyHeading", () => {
    describe("Basics", () => {
        test("normalizes headings to lowercase hyphenated slugs", () => {
            const expected = "why-boundaries-matter";
            const result = slugifyHeading("Why Boundaries Matter!");

            expect(result).toBe(expected);
        });
    });

    describe("Edge Cases", () => {
        test("trims leading and trailing hyphens and returns empty for punctuation-only input", () => {
            expect(slugifyHeading(" - Intro - ")).toBe("intro");
            expect(slugifyHeading("— - —")).toBe("");
        });
    });
});

describe("createHeadingIdAllocator", () => {
    test("avoids collisions when explicit numbered headings appear", () => {
        const allocate = createHeadingIdAllocator();
        const expected = ["foo", "foo-1", "foo-2"];
        const result = [allocate("Foo"), allocate("Foo 1"), allocate("Foo")];

        expect(result).toEqual(expected);
    });

    test("returns null when a heading produces no slug", () => {
        const allocate = createHeadingIdAllocator();
        const expected = null;
        const result = allocate("!!!");

        expect(result).toBe(expected);
    });
});
