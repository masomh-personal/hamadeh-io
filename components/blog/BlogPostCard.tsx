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
            className="surface-card radius-card card-hover block p-5 transition-all"
        >
            <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-content-subtle text-sm">
                    {formatPublishedDate(post.datePublished)}
                </p>
                {post.status === "draft" ? (
                    <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-2 py-1 text-xs font-medium text-amber-300">
                        Draft
                    </span>
                ) : null}
            </div>
            <h2 className="text-xl font-semibold text-white">{post.title}</h2>
            <p className="text-content-muted mt-3">{post.excerpt}</p>
            {post.tags && post.tags.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.slice(0, 4).map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-300"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            ) : null}
        </Link>
    );
}
