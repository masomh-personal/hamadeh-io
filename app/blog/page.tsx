import type { Metadata } from "next";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
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

    return (
        <PageContainer>
            <PageHeader
                title="Blog"
                description="Practical notes from projects I&apos;ve built, decisions I&apos;ve had to make, and lessons learned along the way. I write about engineering fundamentals, modern front-end work, and new tools I&apos;m exploring with a hands-on mindset."
                showDivider
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
                <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
                    {posts.map((post) => (
                        <BlogPostCard key={post.slug} post={post} />
                    ))}
                </div>
            )}
        </PageContainer>
    );
}
