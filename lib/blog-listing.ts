/**
 * Pure filtering and pagination for the blog list. The URL is the source of
 * truth, so everything here treats query values as untrusted and falls back to
 * the unfiltered first page instead of throwing.
 */

import {
    type BlogBodyIndex,
    normalizeSearchQuery,
    type SearchableBlogPost,
    searchBlogPosts,
} from "./blog-search";
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
    q?: string | null;
    page?: string | null;
}

export interface BlogListing<T> {
    activeTag: string | null;
    searchQuery: string;
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

export function getBlogListing<T extends Tagged & Partial<SearchableBlogPost>>(
    posts: readonly T[],
    query: BlogListingQuery,
    pageSize: number = BLOG_PAGE_SIZE,
    bodyIndex?: BlogBodyIndex
): BlogListing<T> {
    const searchQuery = normalizeSearchQuery(query.q);

    if (searchQuery) {
        const searchable = posts.map((post) => ({
            post,
            slug: post.slug ?? "",
            title: post.title ?? "",
            excerpt: post.excerpt,
            tags: post.tags,
        }));
        const matching = searchBlogPosts(
            searchable,
            searchQuery,
            bodyIndex
        ).map((entry) => entry.post);
        const { page, totalPages, items } = paginate(
            matching,
            query.page,
            pageSize
        );

        return {
            activeTag: null,
            searchQuery,
            page,
            totalPages,
            total: matching.length,
            items,
        };
    }

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

    return {
        activeTag,
        searchQuery: "",
        page,
        totalPages,
        total: matching.length,
        items,
    };
}

/** Builds the canonical blog URL; page 1 and no filters collapse to `/blog`. */
export function getBlogListingPath({
    tag,
    q,
    page,
}: {
    tag?: string | null;
    q?: string | null;
    page?: number;
}): string {
    const normalizedQuery = normalizeSearchQuery(q);
    if (normalizedQuery) {
        return buildListingPath("/blog", { q: normalizedQuery }, page);
    }

    return buildListingPath("/blog", { tag }, page);
}

interface SeriesEntry {
    slug: string;
    title: string;
    series?: string;
    seriesOrder?: number;
}

export interface SeriesNavigation<T extends SeriesEntry> {
    series: string;
    currentIndex: number;
    total: number;
    previous: T | null;
    next: T | null;
}

/**
 * Resolves previous/next navigation for a post belonging to a multi-part series.
 */
export function getSeriesNavigation<T extends SeriesEntry>(
    posts: readonly T[],
    current: T
): SeriesNavigation<T> | null {
    if (!current.series) {
        return null;
    }

    const members = posts
        .filter((post) => post.series === current.series)
        .sort(
            (a, b) =>
                (a.seriesOrder ?? Number.MAX_SAFE_INTEGER) -
                    (b.seriesOrder ?? Number.MAX_SAFE_INTEGER) ||
                a.title.localeCompare(b.title)
        );

    const currentIndex = members.findIndex(
        (post) => post.slug === current.slug
    );
    if (currentIndex === -1 || members.length <= 1) {
        return null;
    }

    return {
        series: current.series,
        currentIndex,
        total: members.length,
        previous: currentIndex > 0 ? (members[currentIndex - 1] ?? null) : null,
        next:
            currentIndex < members.length - 1
                ? (members[currentIndex + 1] ?? null)
                : null,
    };
}

interface RelatablePost {
    slug: string;
    title: string;
    tags?: string[];
    series?: string;
}

/**
 * Picks up to `limit` related posts ranked by shared tag count, excluding the
 * current post and posts in the same series (which already have series nav).
 */
export function getRelatedPosts<T extends RelatablePost>(
    posts: readonly T[],
    current: T,
    limit = 3
): T[] {
    const currentTags = new Set(current.tags ?? []);
    if (currentTags.size === 0 || limit <= 0) {
        return [];
    }

    return posts
        .filter((candidate) => {
            if (candidate.slug === current.slug) return false;
            if (current.series && candidate.series === current.series) {
                return false;
            }
            return true;
        })
        .map((candidate) => {
            let sharedTags = 0;
            for (const tag of new Set(candidate.tags ?? [])) {
                if (currentTags.has(tag)) {
                    sharedTags += 1;
                }
            }
            return { candidate, sharedTags };
        })
        .filter(({ sharedTags }) => sharedTags > 0)
        .sort(
            (a, b) =>
                b.sharedTags - a.sharedTags ||
                a.candidate.title.localeCompare(b.candidate.title)
        )
        .slice(0, limit)
        .map(({ candidate }) => candidate);
}
