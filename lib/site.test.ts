import { describe, expect, test } from "bun:test";
import {
    absoluteUrl,
    buildPageHead,
    DEFAULT_OG_IMAGE_ALT,
    DEFAULT_OG_IMAGE_PATH,
    SITE_NAME,
} from "./site";

describe("buildPageHead", () => {
    const input = {
        title: "Blog",
        description: "Engineering notes.",
        path: "/blog",
    };

    test("points canonical and Open Graph URLs at the page, not the homepage", () => {
        const expected = {
            canonical: absoluteUrl("/blog"),
            openGraphUrl: absoluteUrl("/blog"),
        };
        const head = buildPageHead(input);
        const result = {
            canonical: head.links.find((link) => link.rel === "canonical")
                ?.href,
            openGraphUrl: head.meta.find((tag) => tag.property === "og:url")
                ?.content,
        };

        expect(result).toEqual(expected);
    });

    test("gives social cards the page title and description", () => {
        const expected = {
            openGraph: {
                title: `Blog | ${SITE_NAME}`,
                description: "Engineering notes.",
            },
            twitter: {
                title: `Blog | ${SITE_NAME}`,
                description: "Engineering notes.",
            },
        };
        const head = buildPageHead(input);
        const result = {
            openGraph: {
                title: head.meta.find((tag) => tag.property === "og:title")
                    ?.content,
                description: head.meta.find(
                    (tag) => tag.property === "og:description"
                )?.content,
            },
            twitter: {
                title: head.meta.find((tag) => tag.name === "twitter:title")
                    ?.content,
                description: head.meta.find(
                    (tag) => tag.name === "twitter:description"
                )?.content,
            },
        };

        expect(result).toEqual(expected);
    });

    test("includes the default share image and alt text", () => {
        const expected = {
            ogImage: absoluteUrl(DEFAULT_OG_IMAGE_PATH),
            ogAlt: DEFAULT_OG_IMAGE_ALT,
            twitterImage: absoluteUrl(DEFAULT_OG_IMAGE_PATH),
        };
        const head = buildPageHead(input);
        const result = {
            ogImage: head.meta.find((tag) => tag.property === "og:image")
                ?.content,
            ogAlt: head.meta.find((tag) => tag.property === "og:image:alt")
                ?.content,
            twitterImage: head.meta.find((tag) => tag.name === "twitter:image")
                ?.content,
        };

        expect(result).toEqual(expected);
    });
});
