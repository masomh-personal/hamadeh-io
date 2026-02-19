import Link from "next/link";
import { HiArrowRight, HiDocumentText } from "react-icons/hi";
import { Badge } from "@/components/ui";
import { formatPublishedDate } from "@/lib/date";
import type { BlogPost } from "@/lib/mdx";
import { getBlogTagPresentation } from "./blog-tags";

interface BlogPostCardProps {
    post: BlogPost;
}

export function BlogPostCard({ post }: BlogPostCardProps): React.ReactElement {
    const tags = post.tags ?? [];

    return (
        <Link
            href={`/blog/${post.slug}`}
            prefetch={false}
            className="surface-card radius-card card-chrome card-hover flex h-full flex-col p-4 text-content transition-all sm:p-5"
        >
            <div className="flex items-center gap-3">
                <p className="text-content-subtle font-mono text-xs uppercase tracking-wide">
                    {formatPublishedDate(post.datePublished)}
                </p>
            </div>

            <h2 className="font-heading mt-2 flex items-start gap-1 text-xl font-semibold text-white">
                <span className="mt-1 shrink-0 text-sky-300 [&_svg]:h-5 [&_svg]:w-5">
                    <HiDocumentText aria-hidden="true" />
                </span>
                <span>{post.title}</span>
            </h2>

            <div className="my-3 border-b border-surface-outline/80" />

            <p className="text-content-subtle text-sm leading-relaxed">
                {post.excerpt}
            </p>

            <div className="mt-auto pt-5">
                {tags.length > 0 ? (
                    <div className="flex flex-wrap gap-x-2 gap-y-2.5 pb-4">
                        {tags.map((tag) => {
                            const { text, tone, variant } =
                                getBlogTagPresentation(tag);

                            return (
                                <Badge
                                    key={tag}
                                    text={text}
                                    size="sm"
                                    tone={tone}
                                    variant={variant}
                                    className="font-baloo font-normal"
                                />
                            );
                        })}
                    </div>
                ) : null}

                <div className="flex justify-center border-t border-surface-outline/70 pt-4">
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-sky-200">
                        Read Post
                        <HiArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                </div>
            </div>
        </Link>
    );
}
