import { Badge } from "@/components/ui";
import { formatPublishedDate } from "@/lib/date";
import type { BlogPost } from "@/lib/mdx";
import { getBlogTagPresentation } from "./blog-tags";

interface BlogPostHeaderProps {
    post: BlogPost;
}

export function BlogPostHeader({
    post,
}: BlogPostHeaderProps): React.ReactElement {
    const tags = post.tags ?? [];

    return (
        <header className="surface-card radius-card card-chrome mb-10 p-6 md:p-7">
            <div className="text-content-subtle mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs uppercase tracking-wide">
                <span>Published {formatPublishedDate(post.datePublished)}</span>
                {post.updatedAt ? (
                    <span>Updated {formatPublishedDate(post.updatedAt)}</span>
                ) : null}
            </div>

            <h1 className="font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                {post.title}
            </h1>

            <p className="text-content mt-4 max-w-3xl text-base leading-relaxed md:text-lg">
                {post.excerpt}
            </p>

            <div className="my-4 border-b border-surface-outline/80" />

            {tags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => {
                        const tagPresentation = getBlogTagPresentation(tag);

                        return (
                            <Badge
                                key={tag}
                                text={tagPresentation.text}
                                size="sm"
                                tone="solid"
                                variant={tagPresentation.variant}
                            />
                        );
                    })}
                </div>
            ) : null}
        </header>
    );
}
