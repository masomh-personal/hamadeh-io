"use client";

import { useSearchParams } from "next/navigation";
import type { BlogListingQuery, TagCount } from "@/lib/blog-listing";
import type { BlogPostSummary } from "@/lib/content/blog";
import { BlogListingView } from "./BlogListingView";

interface BlogListingProps {
    posts: BlogPostSummary[];
    tagCounts: TagCount[];
}

/**
 * Reads the filter and page from the URL on the client so `/blog` itself stays
 * statically generated. Render it inside a Suspense boundary.
 */
export function BlogListing({
    posts,
    tagCounts,
}: BlogListingProps): React.ReactElement {
    const searchParams = useSearchParams();
    const query: BlogListingQuery = {
        tag: searchParams.get("tag"),
        page: searchParams.get("page"),
    };

    return (
        <BlogListingView posts={posts} tagCounts={tagCounts} query={query} />
    );
}
