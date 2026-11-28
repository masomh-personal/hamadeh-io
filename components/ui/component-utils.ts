/**
 * Shared UI link helpers used by wrapper components (for example, Button/Link).
 * Keep routing and anchor safety behavior consistent in one place.
 */
export function shouldUseNativeAnchor(href: string | undefined): boolean {
    if (!href) {
        return false;
    }

    const value = href.trim().toLowerCase();

    return (
        value.startsWith("#") ||
        value.startsWith("//") ||
        /^[a-z][a-z\d+\-.]*:/.test(value)
    );
}

/**
 * Returns true when a URL should open in a new browser tab/window.
 */
export function shouldOpenInNewTab(href: string | undefined): boolean {
    if (!href) {
        return false;
    }

    const value = href.trim().toLowerCase();
    return value.startsWith("http") || value.startsWith("//");
}

/**
 * Ensures safe external link rel tokens are always present.
 */
export function mergeRel(rel: string | undefined): string {
    const parts = new Set((rel ?? "").split(" ").filter(Boolean));
    parts.add("noopener");
    parts.add("noreferrer");
    return Array.from(parts).join(" ");
}

export interface ParsedInternalHref {
    to: string;
    search?: Record<string, string | number>;
    hash?: string;
}

/**
 * Splits an internal href (e.g. `/blog?tag=solid&page=2#top`) into TanStack
 * Router's `to`, `search`, and `hash` props so query strings are never encoded
 * into the pathname. Numeric-only values are passed as numbers so TanStack
 * Router serializes `?page=2` rather than `?page=%222%22`.
 */
export function parseInternalHref(href: string): ParsedInternalHref {
    const parsed = new URL(href, "http://local.invalid");
    const searchEntries = Array.from(parsed.searchParams.entries()).map(
        ([key, value]) =>
            [key, /^\d+$/.test(value) ? Number(value) : value] as const
    );
    const search =
        searchEntries.length > 0
            ? Object.fromEntries(searchEntries)
            : undefined;
    const hash = parsed.hash ? parsed.hash.slice(1) : undefined;

    return {
        to: parsed.pathname,
        search,
        hash,
    };
}
