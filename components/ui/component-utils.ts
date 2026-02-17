export function shouldUseNativeAnchor(href: string): boolean {
    return (
        href.startsWith("#") ||
        href.startsWith("//") ||
        /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(href)
    );
}

export function shouldOpenInNewTab(href: string): boolean {
    return href.startsWith("http") || href.startsWith("//");
}

export function mergeRel(rel: string | undefined): string {
    const parts = new Set((rel ?? "").split(" ").filter(Boolean));
    parts.add("noopener");
    parts.add("noreferrer");
    return Array.from(parts).join(" ");
}
