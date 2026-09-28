import type { Metadata } from "next";

const DEFAULT_SITE_URL = "https://hamadeh.io";

function resolveSiteUrl(value: string | undefined): URL {
    if (!value) {
        return new URL(DEFAULT_SITE_URL);
    }

    try {
        return new URL(value);
    } catch {
        throw new Error(
            `NEXT_PUBLIC_SITE_URL must be an absolute URL, received "${value}"`
        );
    }
}

export const SITE_URL = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
export const SITE_NAME =
    process.env.NEXT_PUBLIC_SITE_NAME?.trim() || "hamadeh.io";
export const AUTHOR_NAME =
    process.env.NEXT_PUBLIC_AUTHOR_NAME?.trim() || "Masom Hamadeh";
export const AUTHOR_EMAIL =
    process.env.NEXT_PUBLIC_AUTHOR_EMAIL?.trim() || "masom@hamadeh.io";

export const DEFAULT_OG_IMAGE_ALT = `${AUTHOR_NAME} — software engineering notes and tested code problems`;

/** Served by `app/opengraph-image.tsx`. */
const DEFAULT_OG_IMAGE = { url: "/opengraph-image", alt: DEFAULT_OG_IMAGE_ALT };

/**
 * Builds an absolute URL using the configured public site origin.
 */
export function absoluteUrl(path: string): string {
    return new URL(path, SITE_URL).toString();
}

interface StaticPageMetadataInput {
    title: string;
    description: string;
    path: string;
}

/**
 * Builds metadata for a top-level static page.
 *
 * Next.js replaces `openGraph` and `twitter` wholesale rather than merging
 * them, so a page that sets only `title` and `canonical` inherits the root
 * layout's homepage card, URL included. Setting them also drops the root
 * file-based image, so the default image is listed explicitly.
 */
export function staticPageMetadata({
    title,
    description,
    path,
}: StaticPageMetadataInput): Metadata {
    const socialTitle = `${title} | ${SITE_NAME}`;

    return {
        title,
        description,
        alternates: {
            canonical: path,
        },
        openGraph: {
            type: "website",
            url: path,
            siteName: SITE_NAME,
            title: socialTitle,
            description,
            images: [DEFAULT_OG_IMAGE],
        },
        twitter: {
            card: "summary_large_image",
            title: socialTitle,
            description,
            images: [DEFAULT_OG_IMAGE],
        },
    };
}
