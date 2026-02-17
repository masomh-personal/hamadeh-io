/**
 * Shared UI link helpers used by wrapper components (for example, Button/Link).
 * Keep routing and anchor safety behavior consistent in one place.
 */
export function shouldUseNativeAnchor(href: string): boolean {
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
