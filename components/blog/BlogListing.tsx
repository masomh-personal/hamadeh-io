"use client";

import { useSearchParams } from "next/navigation";
import { SearchInput, useListingSearch } from "@/components/ui";
import {
    type BlogListingQuery,
    getBlogListingPath,
    type TagCount,
} from "@/lib/blog-listing";
import type { BlogPostSummary } from "@/lib/content/blog";
import { BlogListingView } from "./BlogListingView";

interface BlogListingProps {
    posts: BlogPostSummary[];
    tagCounts: TagCount[];
}

/**
 * Reads the filter, search query, and page from the URL on the client so
 * `/blog` itself stays statically generated. Render it inside a Suspense
 * boundary.
 */
export function BlogListing({
    posts,
    tagCounts,
}: BlogListingProps): React.ReactElement {
    const searchParams = useSearchParams();
    const {
        inputValue,
        rawUrlQuery,
        bodyIndex,
        isSearching,
        handleSearchChange,
        handleSubmitImmediate,
        handleClearSearch,
        ensureBodyIndex,
    } = useListingSearch({
        indexUrl: "/blog/search-index.json",
        filterParam: "tag",
        buildSearchPath: (q) => getBlogListingPath({ q }),
    });

    const query: BlogListingQuery = {
        tag: searchParams.get("tag"),
        q: rawUrlQuery,
        page: searchParams.get("page"),
    };

    return (
        <BlogListingView
            posts={posts}
            tagCounts={tagCounts}
            query={query}
            bodyIndex={bodyIndex}
            isSearching={isSearching}
            onClearSearch={handleClearSearch}
            searchSlot={
                <SearchInput
                    id="blog-search-input"
                    label="Search all blog posts"
                    placeholder="Search all posts..."
                    value={inputValue}
                    onValueChange={handleSearchChange}
                    onSubmitImmediate={handleSubmitImmediate}
                    onClear={handleClearSearch}
                    onPrepareIndex={ensureBodyIndex}
                    isSearching={isSearching}
                />
            }
        />
    );
}
