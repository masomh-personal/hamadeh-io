/**
 * Pure blog search indexing and relevance ranking.
 * Used both at build time (to generate `/blog/search-index.json`) and on the
 * client (to filter and rank posts against title, excerpt, tags, and body copy).
 */

export const MAX_SEARCH_QUERY_LENGTH = 100;

export interface SearchableBlogPost {
    slug: string;
    title: string;
    excerpt?: string;
    tags?: string[];
}

export type BlogBodyIndex = Readonly<Record<string, string>>;

/**
 * Strips Markdown syntax into compact, searchable plain text while keeping
 * readable words (including link labels and code identifiers).
 */
export function stripMarkdownForSearch(markdown: string): string {
    return markdown
        .replace(/```[^\n]*\n/g, " ")
        .replace(/```/g, " ")
        .replace(/!\[([^\]]*)\]\([^)]*\)/g, " $1 ")
        .replace(/\[([^\]]+)\]\([^)]*\)/g, " $1 ")
        .replace(/`([^`]+)`/g, " $1 ")
        .replace(/^#{1,6}\s+/gm, " ")
        .replace(/^>\s?/gm, " ")
        .replace(/[*_~]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

/**
 * Normalizes untrusted search input from the URL or input box.
 */
export function normalizeSearchQuery(
    rawQuery: string | null | undefined
): string {
    if (!rawQuery) {
        return "";
    }

    return rawQuery
        .trim()
        .replace(/\s+/g, " ")
        .slice(0, MAX_SEARCH_QUERY_LENGTH);
}

/**
 * Validates the JSON payload fetched from `/blog/search-index.json`.
 */
export function parseBlogBodyIndex(payload: unknown): Record<string, string> {
    if (typeof payload !== "object" || payload === null) {
        return {};
    }

    const index: Record<string, string> = {};
    for (const [slug, value] of Object.entries(payload)) {
        if (typeof value === "string") {
            index[slug] = value;
        }
    }

    return index;
}

/**
 * Filters and ranks posts matching every whitespace-separated term in the query.
 * Matches in titles rank highest, followed by tags, excerpts, and body copy.
 */
export function searchBlogPosts<T extends SearchableBlogPost>(
    posts: readonly T[],
    rawQuery: string,
    bodyIndex?: BlogBodyIndex
): T[] {
    const normalized = normalizeSearchQuery(rawQuery).toLowerCase();
    if (!normalized) {
        return [...posts];
    }

    const terms = normalized.split(" ").filter(Boolean);
    const ranked: { post: T; score: number }[] = [];

    for (const post of posts) {
        const title = post.title.toLowerCase();
        const excerpt = (post.excerpt ?? "").toLowerCase();
        const tags = (post.tags ?? []).join(" ").toLowerCase();
        const body = (bodyIndex?.[post.slug] ?? "").toLowerCase();

        let matchedAllTerms = true;
        let score = 0;

        for (const term of terms) {
            const inTitle = title.includes(term);
            const inTags = tags.includes(term);
            const inExcerpt = excerpt.includes(term);
            const inBody = body.includes(term);

            if (!inTitle && !inTags && !inExcerpt && !inBody) {
                matchedAllTerms = false;
                break;
            }

            if (inTitle) score += 10;
            if (inTags) score += 6;
            if (inExcerpt) score += 4;
            if (inBody) score += 1;
        }

        if (!matchedAllTerms) {
            continue;
        }

        if (terms.length > 1) {
            if (title.includes(normalized)) score += 20;
            if (excerpt.includes(normalized)) score += 8;
            if (body.includes(normalized)) score += 3;
        }

        ranked.push({ post, score });
    }

    return ranked
        .sort(
            (a, b) =>
                b.score - a.score || a.post.title.localeCompare(b.post.title)
        )
        .map(({ post }) => post);
}
