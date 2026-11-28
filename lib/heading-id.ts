export function slugifyHeading(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "");
}

/**
 * Allocates unique heading IDs within a single document render, avoiding
 * collisions even when explicit numbered headings (e.g. "Foo 1") appear.
 */
export function createHeadingIdAllocator(): (text: string) => string | null {
    const usedIds = new Set<string>();

    return (text: string): string | null => {
        const baseSlug = slugifyHeading(text);
        if (!baseSlug) {
            return null;
        }

        let candidate = baseSlug;
        let suffix = 1;
        while (usedIds.has(candidate)) {
            candidate = `${baseSlug}-${suffix}`;
            suffix += 1;
        }

        usedIds.add(candidate);
        return candidate;
    };
}
