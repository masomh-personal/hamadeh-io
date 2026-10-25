/**
 * Pure filtering and pagination for the blog list. The URL is the source of
 * truth, so everything here treats query values as untrusted and falls back to
 * the unfiltered first page instead of throwing.
 */

export const BLOG_PAGE_SIZE = 12;

interface Tagged {
    tags?: string[];
}

export interface TagCount {
    tag: string;
    count: number;
}

export interface BlogListingQuery {
    tag?: string | null;
    page?: string | null;
}

export interface BlogListing<T> {
    activeTag: string | null;
    page: number;
    totalPages: number;
    total: number;
    items: T[];
}

/** Tags ordered by how many posts use them, then alphabetically. */
export function getTagCounts(posts: readonly Tagged[]): TagCount[] {
    const counts = new Map<string, number>();

    for (const post of posts) {
        for (const tag of new Set(post.tags ?? [])) {
            counts.set(tag, (counts.get(tag) ?? 0) + 1);
        }
    }

    return [...counts]
        .map(([tag, count]) => ({ tag, count }))
        .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function getBlogListing<T extends Tagged>(
    posts: readonly T[],
    query: BlogListingQuery,
    pageSize: number = BLOG_PAGE_SIZE
): BlogListing<T> {
    const knownTags = new Set(posts.flatMap((post) => post.tags ?? []));
    const activeTag = query.tag && knownTags.has(query.tag) ? query.tag : null;
    const matching = activeTag
        ? posts.filter((post) => post.tags?.includes(activeTag))
        : [...posts];

    const totalPages = Math.max(1, Math.ceil(matching.length / pageSize));
    const requestedPage = Number.parseInt(query.page ?? "", 10);
    const page = Number.isNaN(requestedPage)
        ? 1
        : Math.min(Math.max(requestedPage, 1), totalPages);
    const start = (page - 1) * pageSize;

    return {
        activeTag,
        page,
        totalPages,
        total: matching.length,
        items: matching.slice(start, start + pageSize),
    };
}

/** Builds the canonical blog URL; page 1 and no tag collapse to `/blog`. */
export function getBlogListingPath({
    tag,
    page,
}: {
    tag?: string | null;
    page?: number;
}): string {
    const params = new URLSearchParams();

    if (tag) {
        params.set("tag", tag);
    }
    if (page !== undefined && page > 1) {
        params.set("page", String(page));
    }

    const query = params.toString();
    return query ? `/blog?${query}` : "/blog";
}
