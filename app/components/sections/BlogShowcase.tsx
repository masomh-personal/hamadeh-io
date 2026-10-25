import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { BlogPostHeader } from "@/components/blog/BlogPostHeader";
import { getBlogTagPresentation } from "@/components/blog/blog-tags";
import { FilterList, type FilterOption } from "@/components/ui";
import type { BlogPost } from "@/lib/mdx";

type ShowcaseBlogPost = BlogPost;

const publishedBlogPost: ShowcaseBlogPost = {
    title: "Building the Blog Foundation (Markdown + Syntax Highlighting)",
    slug: "building-blog-foundation-markdown-shiki",
    readingTimeMinutes: 5,
    excerpt:
        "How I designed a clean blog architecture with Markdown-first content, server-side syntax highlighting, and room to scale.",
    tags: ["engineering", "nextjs", "markdown"],
    content: "Sample markdown content for component showcase.",
    filePath: "content/blog/building-this-blog.md",
};

const secondaryBlogPost: ShowcaseBlogPost = {
    title: "Async Patterns in Modern TypeScript Services",
    slug: "async-patterns-modern-typescript-services",
    readingTimeMinutes: 4,
    excerpt:
        "Article exploring cancellation, timeouts, and error boundaries in async workflows.",
    tags: ["typescript", "backend", "async"],
    content: "Secondary showcase content.",
    filePath: "content/blog/async-patterns-modern-typescript-services.md",
};

const showcaseTagOptions: FilterOption[] = [
    ["dsa", 6],
    ["system-design", 6],
    ["typescript", 6],
    ["solid", 5],
].map(([tag, count]) => {
    const { text, color, bgColor } = getBlogTagPresentation(String(tag));
    return {
        value: String(tag),
        label: text,
        color,
        bgColor,
        count: Number(count),
    };
});

const showcaseDifficultyOptions: FilterOption[] = [
    {
        value: "easy",
        label: "Easy",
        color: "#00D3BC",
        bgColor: "#00D3BC2E",
        count: 14,
    },
    {
        value: "medium",
        label: "Medium",
        color: "#FFD35E",
        bgColor: "#FFD35E2E",
        count: 6,
    },
    {
        value: "hard",
        label: "Hard",
        color: "#FF6B88",
        bgColor: "#FF6B882E",
        count: 2,
    },
];

export function BlogShowcase() {
    return (
        <section>
            <h2 className="font-bold text-white">Blog</h2>
            <p className="text-content-muted mb-4">
                Blog-specific components for list cards and post headers,
                including metadata states.
            </p>

            <div className="space-y-8">
                <div>
                    <h3 className="text-content-subtle mb-3 border-t border-surface-outline/40 pt-4 font-mono text-sm">
                        BlogPostCard examples
                    </h3>
                    <div className="grid gap-4 lg:grid-cols-2">
                        <BlogPostCard post={publishedBlogPost} />
                        <BlogPostCard post={secondaryBlogPost} />
                    </div>
                </div>

                <div>
                    <h3 className="text-content-subtle mb-3 border-t border-surface-outline/40 pt-4 font-mono text-sm">
                        FilterList, responsive (pills below lg, list with counts
                        at lg)
                    </h3>
                    <FilterList
                        ariaLabel="Showcase topic filter"
                        options={showcaseTagOptions}
                        activeValue="dsa"
                        totalCount={30}
                        getHref={() => "#"}
                    />
                </div>

                <div>
                    <h3 className="text-content-subtle mb-3 border-t border-surface-outline/40 pt-4 font-mono text-sm">
                        FilterList, row with dot markers
                    </h3>
                    <FilterList
                        ariaLabel="Showcase difficulty filter"
                        orientation="row"
                        marker="dot"
                        options={showcaseDifficultyOptions}
                        activeValue="medium"
                        totalCount={22}
                        getHref={() => "#"}
                    />
                </div>

                <div>
                    <h3 className="text-content-subtle mb-3 border-t border-surface-outline/40 pt-4 font-mono text-sm">
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
