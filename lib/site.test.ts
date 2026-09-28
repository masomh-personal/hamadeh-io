import { describe, expect, test } from "bun:test";
import { DEFAULT_OG_IMAGE_ALT, SITE_NAME, staticPageMetadata } from "./site";

describe("staticPageMetadata", () => {
    const input = {
        title: "Blog",
        description: "Engineering notes.",
        path: "/blog",
    };

    test("points canonical and Open Graph URLs at the page, not the homepage", () => {
        const expected = { canonical: "/blog", openGraphUrl: "/blog" };
        const metadata = staticPageMetadata(input);
        const result = {
            canonical: metadata.alternates?.canonical,
            openGraphUrl: metadata.openGraph?.url,
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
        const metadata = staticPageMetadata(input);
        const result = {
            openGraph: {
                title: metadata.openGraph?.title,
                description: metadata.openGraph?.description,
            },
            twitter: {
                title: metadata.twitter?.title,
                description: metadata.twitter?.description,
            },
        };

        expect(result).toEqual(expected);
    });

    test("keeps the default share image that overriding openGraph would drop", () => {
        const expected = [
            { url: "/opengraph-image", alt: DEFAULT_OG_IMAGE_ALT },
        ];
        const metadata = staticPageMetadata(input);
        const result = {
            openGraph: metadata.openGraph?.images,
            twitter: metadata.twitter?.images,
        };

        expect(result).toEqual({ openGraph: expected, twitter: expected });
    });
});
