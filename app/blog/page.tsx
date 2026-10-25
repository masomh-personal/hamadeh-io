import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogListing } from "@/components/blog/BlogListing";
import { BlogListingView } from "@/components/blog/BlogListingView";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { Link } from "@/components/ui";
import { getTagCounts } from "@/lib/blog-listing";
import { listPublishedBlogPosts } from "@/lib/content/blog";
import { staticPageMetadata } from "@/lib/site";

export const metadata: Metadata = staticPageMetadata({
    title: "Blog",
    description:
        "Engineering notes on software development, CS fundamentals, and practical coding lessons.",
    path: "/blog",
});

export default async function BlogPage(): Promise<React.ReactElement> {
    const posts = await listPublishedBlogPosts();
    const tagCounts = getTagCounts(posts);

    return (
        <PageContainer>
            <PageHeader
                title="Blog"
                description="Practical notes from projects I've built, decisions I've had to make, and lessons learned along the way. I write about engineering fundamentals, modern front-end work, and new tools I'm exploring with a hands-on mindset."
                showDivider
                className="mb-3"
            />

            {posts.length === 0 ? (
                <div className="surface-card radius-card p-8">
                    <p className="text-content">
                        No posts published yet. Check back soon.
                    </p>
                    <Link
                        href="/"
                        variant="muted"
                        className="mt-4 inline-block"
                    >
                        Back to Home
                    </Link>
                </div>
            ) : (
                <Suspense
                    fallback={
                        <BlogListingView
                            posts={posts}
                            tagCounts={tagCounts}
                            query={{}}
                        />
                    }
                >
                    <BlogListing posts={posts} tagCounts={tagCounts} />
                </Suspense>
            )}
        </PageContainer>
    );
}
