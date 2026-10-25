/**
 * Pure filtering and pagination for the blog list. The URL is the source of
 * truth, so everything here treats query values as untrusted and falls back to
 * the unfiltered first page instead of throwing.
 */

import { buildListingPath, paginate } from "./pagination";

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

    const { page, totalPages, items } = paginate(
        matching,
        query.page,
        pageSize
    );

    return { activeTag, page, totalPages, total: matching.length, items };
}

/** Builds the canonical blog URL; page 1 and no tag collapse to `/blog`. */
export function getBlogListingPath({
    tag,
    page,
}: {
    tag?: string | null;
    page?: number;
}): string {
    return buildListingPath("/blog", { tag }, page);
}
