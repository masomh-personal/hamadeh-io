import type { Metadata } from "next";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { Link } from "@/components/ui";
import { listPublishedBlogPosts } from "@/lib/content/blog";

export const metadata: Metadata = {
    title: "Blog | ThoughtfulCode",
    description:
        "Engineering notes on software development, CS fundamentals, and practical coding lessons.",
};

export default async function BlogPage(): Promise<React.ReactElement> {
    const posts = await listPublishedBlogPosts();

    return (
        <div className="mx-auto max-w-6xl px-6 py-8 md:py-10">
            <header className="mb-8">
                <h1 className="font-extrabold text-white">Blog</h1>
                <p className="text-content mt-3 max-w-3xl md:text-lg">
                    Writing about engineering decisions, problem solving, and
                    lessons learned while building software.
                </p>
            </header>

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
        </div>
    );
}
