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
    const { datePublished, title, excerpt, tags = [] } = post;

    return (
        <header className="mb-8">
            <div className="text-content-subtle font-mono mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs uppercase tracking-wide">
                <span>Published {formatPublishedDate(datePublished)}</span>
            </div>

            <h1 className="font-heading text-xl font-extrabold tracking-tight text-white md:text-2xl lg:text-3xl">
                {title}
            </h1>

            <p className="text-content-muted mt-3 max-w-3xl text-base leading-relaxed md:text-lg">
                {excerpt}
            </p>

            {tags.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                    {tags.map((tag) => {
                        const tagPresentation = getBlogTagPresentation(tag);

                        return (
                            <Badge
                                key={tag}
                                text={tagPresentation.text}
                                size="sm"
                                tone={tagPresentation.tone}
                                variant={tagPresentation.variant}
                                className="font-baloo font-normal"
                            />
                        );
                    })}
                </div>
            ) : null}

            <hr className="mt-6 border-surface-outline/60" />
        </header>
    );
}
