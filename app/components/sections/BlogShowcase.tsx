import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { BlogPostHeader } from "@/components/blog/BlogPostHeader";

type ShowcaseBlogPost = Parameters<typeof BlogPostCard>[0]["post"];

const publishedBlogPost: ShowcaseBlogPost = {
    title: "Building the Blog Foundation (Markdown + Shiki)",
    slug: "building-blog-foundation-markdown-shiki",
    datePublished: "2026-02-18",
    excerpt:
        "How I designed a clean blog architecture with Markdown-first content, premium syntax highlighting, and room to scale.",
    tags: ["engineering", "nextjs", "markdown"],
    content: "Sample markdown content for component showcase.",
    filePath: "content/blog/building-blog-foundation-markdown-shiki.md",
};

const secondaryBlogPost: ShowcaseBlogPost = {
    title: "Async Patterns in Modern TypeScript Services",
    slug: "async-patterns-modern-typescript-services",
    datePublished: "2026-02-20",
    excerpt:
        "Article exploring cancellation, timeouts, and error boundaries in async workflows.",
    tags: ["typescript", "backend", "async"],
    content: "Secondary showcase content.",
    filePath: "content/blog/async-patterns-modern-typescript-services.md",
};

export function BlogShowcase(): React.ReactElement {
    return (
        <section>
            <h2 className="font-bold text-white">Blog</h2>
            <p className="text-content-muted mb-6">
                Blog-specific components for list cards and post headers,
                including metadata states.
            </p>

            <div className="space-y-8">
                <div>
                    <h3 className="text-content-subtle mb-3 font-mono text-sm">
                        BlogPostCard examples
                    </h3>
                    <div className="grid gap-4 lg:grid-cols-2">
                        <BlogPostCard post={publishedBlogPost} />
                        <BlogPostCard post={secondaryBlogPost} />
                    </div>
                </div>

                <div>
                    <h3 className="text-content-subtle mb-3 font-mono text-sm">
                        BlogPostHeader examples
                    </h3>
                    <div className="space-y-4">
                        <BlogPostHeader post={publishedBlogPost} />
                        <BlogPostHeader post={secondaryBlogPost} />
                    </div>
                </div>
            </div>
        </section>
    );
}
