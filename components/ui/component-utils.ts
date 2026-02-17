/**
 * Shared UI link helpers used by wrapper components (for example, Button/Link).
 * Keep routing and anchor safety behavior consistent in one place.
 */
export function shouldUseNativeAnchor(href: string): boolean {
    return (
        href.startsWith("#") ||
        href.startsWith("//") ||
        /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(href)
    );
}

/**
 * Returns true when a URL should open in a new browser tab/window.
 */
export function shouldOpenInNewTab(href: string): boolean {
    return href.startsWith("http") || href.startsWith("//");
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
