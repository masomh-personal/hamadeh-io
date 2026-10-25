import type { Route } from "next";
import { FilterList, type FilterOption, PaginationNav } from "@/components/ui";
import type { BlogPostSummary } from "@/lib/content/blog";
import {
    type BlogListingQuery,
    getBlogListing,
    getBlogListingPath,
    type TagCount,
} from "@/lib/blog-listing";
import { BlogPostCard } from "./BlogPostCard";
import { getBlogTagPresentation } from "./blog-tags";

interface BlogListingViewProps {
    posts: BlogPostSummary[];
    tagCounts: TagCount[];
    query: BlogListingQuery;
}

/**
 * Presentational blog list for one filter and page. It holds no state or hooks,
 * so the server renders it as the static fallback and the client wrapper
 * renders it again once the URL's query string is known.
 */
export function BlogListingView({
    posts,
    tagCounts,
    query,
}: BlogListingViewProps): React.ReactElement {
    const listing = getBlogListing(posts, query);
    const tagOptions = tagCounts.map(({ tag, count }): FilterOption => {
        const { text, color, bgColor } = getBlogTagPresentation(tag);
        return { value: tag, label: text, color, bgColor, count };
    });
    const heading = listing.activeTag
        ? getBlogTagPresentation(listing.activeTag).text
        : "All posts";

    return (
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-8">
            <aside className="-mx-6 min-w-0 px-6 lg:sticky lg:top-24 lg:mx-0 lg:max-h-[calc(100dvh-7rem)] lg:self-start lg:overflow-y-auto lg:px-0">
                <FilterList
                    ariaLabel="Filter by topic"
                    options={tagOptions}
                    activeValue={listing.activeTag}
                    totalCount={posts.length}
                    getHref={(tag) => getBlogListingPath({ tag }) as Route}
                />
            </aside>

            <section aria-label="Blog posts" className="min-w-0">
                <p className="text-content-subtle mb-4 font-mono text-xs uppercase tracking-widest">
                    {heading} · {listing.total}{" "}
                    {listing.total === 1 ? "post" : "posts"}
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                    {listing.items.map((post) => (
                        <BlogPostCard key={post.slug} post={post} />
                    ))}
                </div>

                <PaginationNav
                    className="mt-8"
                    currentPage={listing.page}
                    totalPages={listing.totalPages}
                    getPageHref={(page) =>
                        getBlogListingPath({
                            tag: listing.activeTag,
                            page,
                        }) as Route
                    }
                />
            </section>
        </div>
    );
}
