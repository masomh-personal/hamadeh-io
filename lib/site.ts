const DEFAULT_SITE_URL = "https://hamadeh.io";

function readPublicEnv(key: string): string | undefined {
    const viteEnv =
        typeof import.meta !== "undefined" &&
        "env" in import.meta &&
        import.meta.env
            ? (import.meta.env as Record<string, string | undefined>)
            : undefined;

    return (
        viteEnv?.[`VITE_${key}`] ??
        process.env[`VITE_${key}`] ??
        process.env[`NEXT_PUBLIC_${key}`]
    );
}

function resolveSiteUrl(value: string | undefined): URL {
    if (!value) {
        return new URL(DEFAULT_SITE_URL);
    }

    let parsed: URL;
    try {
        parsed = new URL(value);
    } catch {
        throw new Error(
            `VITE_SITE_URL must be an absolute URL, received "${value}"`
        );
    }

    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
        throw new Error(
            `VITE_SITE_URL must use http: or https:, received "${value}"`
        );
    }

    return new URL(parsed.origin);
}

export const SITE_URL = resolveSiteUrl(readPublicEnv("SITE_URL"));
export const SITE_NAME = readPublicEnv("SITE_NAME")?.trim() || "hamadeh.io";
export const AUTHOR_NAME =
    readPublicEnv("AUTHOR_NAME")?.trim() || "Masom Hamadeh";
export const AUTHOR_EMAIL =
    readPublicEnv("AUTHOR_EMAIL")?.trim() || "masom@hamadeh.io";

export const SITE_DESCRIPTION =
    "Personal portfolio and engineering notebook of Masom Hamadeh — software engineering notes, system design, and tested code problems.";

export const DEFAULT_OG_IMAGE_ALT = `${AUTHOR_NAME} — software engineering notes and tested code problems`;
export const DEFAULT_OG_IMAGE_PATH = "/opengraph-image.png";

/**
 * Builds an absolute URL using the configured public site origin.
 */
export function absoluteUrl(path: string): string {
    return new URL(path, SITE_URL).toString();
}

export interface HeadTag {
    title?: string;
    name?: string;
    property?: string;
    content?: string;
    charSet?: string;
}

export interface HeadLink {
    rel: string;
    href: string;
    type?: string;
    title?: string;
}

export interface PageHeadResult {
    meta: HeadTag[];
    links: HeadLink[];
}

interface PageHeadInput {
    title: string;
    description: string;
    path: string;
    ogImage?: string;
    ogAlt?: string;
    ogType?: "website" | "article";
    noIndex?: boolean;
}

/**
 * Builds TanStack Router `head()` metadata for a page.
 */
export function buildPageHead({
    title,
    description,
    path,
    ogImage = DEFAULT_OG_IMAGE_PATH,
    ogAlt = DEFAULT_OG_IMAGE_ALT,
    ogType = "website",
    noIndex = false,
}: PageHeadInput): PageHeadResult {
    const fullTitle = title.includes(SITE_NAME)
        ? title
        : `${title} | ${SITE_NAME}`;
    const canonical = absoluteUrl(path);
    const ogImageUrl = absoluteUrl(ogImage);

    const meta: HeadTag[] = [
        { title: fullTitle },
        { name: "description", content: description },
        { property: "og:type", content: ogType },
        { property: "og:url", content: canonical },
        { property: "og:site_name", content: SITE_NAME },
        { property: "og:title", content: fullTitle },
        { property: "og:description", content: description },
        { property: "og:image", content: ogImageUrl },
        { property: "og:image:alt", content: ogAlt },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: fullTitle },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: ogImageUrl },
    ];

    if (noIndex) {
        meta.push({ name: "robots", content: "noindex, nofollow" });
    }

    return {
        meta,
        links: [{ rel: "canonical", href: canonical }],
    };
}
