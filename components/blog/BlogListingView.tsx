import type { Route } from "next";
import { LoadingIndicator } from "@/components/layout/LoadingIndicator";
import {
    Button,
    FilterList,
    type FilterOption,
    PaginationNav,
} from "@/components/ui";
import {
    type BlogListingQuery,
    getBlogListing,
    getBlogListingPath,
    type TagCount,
} from "@/lib/blog-listing";
import type { BlogBodyIndex } from "@/lib/blog-search";
import type { BlogPostSummary } from "@/lib/content/blog";
import { BlogPostCard } from "./BlogPostCard";
import { getBlogTagPresentation } from "./blog-tags";

interface BlogListingViewProps {
    posts: BlogPostSummary[];
    tagCounts: TagCount[];
    query: BlogListingQuery;
    bodyIndex?: BlogBodyIndex;
    isSearching?: boolean;
    searchSlot?: React.ReactNode;
    onClearSearch?: () => void;
}

/**
 * Presentational blog list for one filter/search and page. It holds no state
 * or hooks, so the server renders it as the static fallback and the client
 * wrapper renders it again once the URL's query string is known.
 */
export function BlogListingView({
    posts,
    tagCounts,
    query,
    bodyIndex,
    isSearching = false,
    searchSlot,
    onClearSearch,
}: BlogListingViewProps): React.ReactElement {
    const listing = getBlogListing(posts, query, undefined, bodyIndex);
    const tagOptions = tagCounts.map(({ tag, count }): FilterOption => {
        const { text, color, bgColor } = getBlogTagPresentation(tag);
        return { value: tag, label: text, color, bgColor, count };
    });
    const heading = listing.searchQuery
        ? `All posts matching "${listing.searchQuery}"`
        : listing.activeTag
          ? getBlogTagPresentation(listing.activeTag).text
          : "All posts";

    return (
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-8">
            <aside className="-mx-6 min-w-0 px-6 lg:sticky lg:top-24 lg:-mx-1.5 lg:max-h-[calc(100dvh-7rem)] lg:self-start lg:overflow-y-auto lg:px-1.5 lg:py-1">
                {searchSlot ? <div className="mb-3">{searchSlot}</div> : null}
                <FilterList
                    ariaLabel="Filter by topic"
                    options={tagOptions}
                    activeValue={listing.activeTag}
                    totalCount={posts.length}
                    getHref={(tag) => getBlogListingPath({ tag }) as Route}
                />
            </aside>

            <section
                aria-label="Blog posts"
                aria-busy={isSearching || undefined}
                className="min-w-0"
            >
                <p
                    aria-live="polite"
                    className="text-content-subtle mb-4 font-mono text-xs uppercase tracking-widest"
                >
                    {isSearching
                        ? "Searching posts..."
                        : `${heading} · ${listing.total} ${listing.total === 1 ? "post" : "posts"}`}
                </p>

                {isSearching ? (
                    <LoadingIndicator
                        message="Searching posts..."
                        showSkeletonBackground
                        className="animate-panel-in w-full py-14"
                    />
                ) : listing.items.length === 0 ? (
                    <div className="surface-card radius-card animate-reveal p-8">
                        <p className="text-content">
                            No posts match{" "}
                            <span className="font-semibold text-white">
                                &ldquo;{listing.searchQuery}&rdquo;
                            </span>
                            .
                        </p>
                        <p className="text-content-subtle mt-1 text-sm">
                            Try a different keyword or browse by topic on the
                            left.
                        </p>
                        <div className="mt-4">
                            {onClearSearch ? (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={onClearSearch}
                                >
                                    Clear search
                                </Button>
                            ) : (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    href={"/blog" as Route}
                                >
                                    Clear search
                                </Button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div
                        key={`${listing.activeTag ?? "all"}-${listing.searchQuery}-${listing.page}`}
                        className="grid gap-4 md:grid-cols-2"
                    >
                        {listing.items.map((post, index) => (
                            <div
                                key={post.slug}
                                className="animate-reveal h-full"
                                style={{
                                    animationDelay: `${Math.min(index, 5) * 25}ms`,
                                }}
                            >
                                <BlogPostCard post={post} />
                            </div>
                        ))}
                    </div>
                )}

                {!isSearching ? (
                    <PaginationNav
                        className="mt-8"
                        currentPage={listing.page}
                        totalPages={listing.totalPages}
                        getPageHref={(page) =>
                            getBlogListingPath({
                                tag: listing.activeTag,
                                q: listing.searchQuery || null,
                                page,
                            }) as Route
                        }
                    />
                ) : null}
            </section>
        </div>
    );
}
