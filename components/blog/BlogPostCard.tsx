import Link from "next/link";
import { HiArrowRight, HiDocumentText } from "react-icons/hi";
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

            <div className="mt-5 flex justify-center border-t border-surface-outline/70 pt-3">
                <span className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-sky-200">
                    Read Post
                    <HiArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
            </div>
        </Link>
    );
}
