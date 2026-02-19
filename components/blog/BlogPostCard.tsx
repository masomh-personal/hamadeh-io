import Link from "next/link";
import { formatPublishedDate } from "@/lib/date";
import type { BlogPost } from "@/lib/mdx";

interface BlogPostCardProps {
    post: BlogPost;
}

export function BlogPostCard({ post }: BlogPostCardProps): React.ReactElement {
    return (
        <Link
            href={`/blog/${post.slug}`}
            className="surface-card radius-card card-chrome card-hover block h-full p-4 text-content transition-all sm:p-5"
        >
            <div className="flex items-center justify-between gap-3">
                <p className="text-content-subtle text-xs uppercase tracking-wide">
                    {formatPublishedDate(post.datePublished)}
                </p>
                {post.status === "draft" ? (
                    <span className="rounded border border-amber-500/40 bg-amber-500/10 px-2 py-1 text-xs font-medium uppercase tracking-wide text-amber-300">
                        Draft
                    </span>
                ) : null}
            </div>

            <h2 className="font-heading mt-2 text-xl font-semibold text-white">
                {post.title}
            </h2>

            <div className="my-3 border-b border-surface-outline/80" />

            <p className="text-content-subtle text-sm leading-relaxed">
                {post.excerpt}
            </p>

            {post.tags && post.tags.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.slice(0, 4).map((tag) => (
                        <span
                            key={tag}
                            className="rounded bg-slate-800 px-2 py-1 text-[0.68rem] uppercase tracking-wide text-slate-300"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            ) : null}

            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-sky-300">
                Read post
            </p>
        </Link>
    );
}
