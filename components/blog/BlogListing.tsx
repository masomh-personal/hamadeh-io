import { useSyncExternalStore } from "react";
import { SearchInput, useListingSearch } from "@/components/ui";
import {
    type BlogListingQuery,
    getBlogListingPath,
    type TagCount,
} from "@/lib/blog-listing";
import type { BlogPostSummary } from "@/lib/content/blog";
import { BlogListingView } from "./BlogListingView";

const emptySubscribe = (): (() => void) => () => {};

interface BlogListingProps {
    posts: BlogPostSummary[];
    tagCounts: TagCount[];
    search: {
        tag?: string;
        q?: string;
        page?: string;
    };
}

export function BlogListing({
    posts,
    tagCounts,
    search,
}: BlogListingProps): React.ReactElement {
    // Match the prerendered static HTML on the initial hydration pass so
    // deep-linked query strings (?q=, ?tag=, ?page=) never cause a hydration
    // mismatch, then immediately apply the URL search params on the client.
    const isHydrated = useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false
    );
    const activeSearch = isHydrated ? search : {};
    const rawUrlQuery = activeSearch.q ?? null;
    const rawUrlTag = activeSearch.tag ?? null;
    const {
        inputValue,
        bodyIndex,
        isSearching,
        handleSearchChange,
        handleSubmitImmediate,
        handleClearSearch,
        ensureBodyIndex,
    } = useListingSearch({
        indexUrl: "/blog/search-index.json",
        rawUrlQuery,
        rawUrlFilter: rawUrlTag,
        buildSearchPath: (q) => getBlogListingPath({ q }),
    });

    const query: BlogListingQuery = {
        tag: rawUrlTag,
        q: rawUrlQuery,
        page: activeSearch.page ?? null,
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
