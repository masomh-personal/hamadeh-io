import type { Metadata } from "next";
import { BlogClientSection } from "@/components/blog/BlogClientSection";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { Link } from "@/components/ui";
import { listPublishedBlogPosts } from "@/lib/content/blog";

export const metadata: Metadata = {
    title: "Blog | hamadeh.io",
    description:
        "Engineering notes on software development, CS fundamentals, and practical coding lessons.",
};

export default async function BlogPage(): Promise<React.ReactElement> {
    const posts = await listPublishedBlogPosts();
    const allTags = [...new Set(posts.flatMap((p) => p.tags ?? []))].sort();

    return (
        <PageContainer>
            <PageHeader
                title="Blog"
                description="Practical notes from projects I&apos;ve built, decisions I&apos;ve had to make, and lessons learned along the way. I write about engineering fundamentals, modern front-end work, and new tools I&apos;m exploring with a hands-on mindset."
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
                <BlogClientSection posts={posts} allTags={allTags} />
            )}
        </PageContainer>
    );
}
