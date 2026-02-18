import { formatPublishedDate } from "@/lib/date";
import type { BlogPost } from "@/lib/mdx";

interface BlogPostHeaderProps {
    post: BlogPost;
}

export function BlogPostHeader({
    post,
}: BlogPostHeaderProps): React.ReactElement {
    return (
        <header className="mb-10 border-b border-slate-700/80 pb-8">
            <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-400">
                <span>Published {formatPublishedDate(post.datePublished)}</span>
                {post.updatedAt ? (
                    <span>Updated {formatPublishedDate(post.updatedAt)}</span>
                ) : null}
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                {post.title}
            </h1>
            <p className="text-content mt-4 max-w-3xl text-lg">
                {post.excerpt}
            </p>
            {post.tags && post.tags.length > 0 ? (
                <div className="mt-5 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-300"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            ) : null}
        </header>
    );
}
