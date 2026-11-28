import {
    createFileRoute,
    Link as RouterLink,
    notFound,
} from "@tanstack/react-router";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { BlogPostHeader } from "@/components/blog/BlogPostHeader";
import { PageContainer } from "@/components/layout/PageContainer";
import { RichMarkdownContent } from "@/components/markdown/RichMarkdownContent";
import { absoluteUrl, AUTHOR_NAME, buildPageHead } from "@/lib/site";
import { hasBlogSlug, loadBlogDetailData } from "@/src/data/content";
import { NotFoundContent } from "../__root";

export const Route = createFileRoute("/blog/$slug")({
    beforeLoad: ({ params }) => {
        if (!hasBlogSlug(params.slug)) {
            throw notFound();
        }
    },
    loader: ({ params }) => loadBlogDetailData(params.slug),
    head: ({ loaderData }) => {
        if (!loaderData) {
            return {};
        }
        const { post } = loaderData;
        return buildPageHead({
            title: post.title,
            description: post.excerpt,
            path: `/blog/${post.slug}`,
            ogImage: `/blog/${post.slug}/opengraph-image.png`,
            ogAlt: post.title,
            ogType: "article",
        });
    },
    component: BlogPostPage,
});

function BlogPostPage(): React.ReactElement {
    const data = Route.useLoaderData();
    if (!data) {
        return <NotFoundContent />;
    }
    const { post, html, wordCount, seriesNav, relatedPosts } = data;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        inLanguage: "en-US",
        wordCount,
        image: absoluteUrl(`/blog/${post.slug}/opengraph-image.png`),
        author: {
            "@type": "Person",
            name: AUTHOR_NAME,
        },
        publisher: {
            "@type": "Person",
            name: AUTHOR_NAME,
        },
        mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
        url: absoluteUrl(`/blog/${post.slug}`),
        keywords: post.tags,
    };

    return (
        <PageContainer>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
                }}
            />
            <article className="surface-card radius-card card-chrome p-6 md:p-10">
                <BlogPostHeader post={post} />
                <RichMarkdownContent html={html} />
            </article>

            {seriesNav ? (
                <nav
                    aria-label={`${seriesNav.series} series navigation`}
                    className="surface-card radius-card mt-6 p-5 md:p-6"
                >
                    <p className="text-content-subtle font-mono text-xs uppercase tracking-widest">
                        Series: {seriesNav.series} · Part{" "}
                        {seriesNav.currentIndex + 1} of {seriesNav.total}
                    </p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {seriesNav.previous ? (
                            <RouterLink
                                to="/blog/$slug"
                                params={{ slug: seriesNav.previous.slug }}
                                className="group flex flex-col rounded-lg border border-surface-outline/60 p-3.5 transition-colors hover:border-primary/60 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                            >
                                <span className="text-content-subtle inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide">
                                    <HiArrowLeft
                                        aria-hidden="true"
                                        className="h-3.5 w-3.5"
                                    />
                                    Previous
                                </span>
                                <span className="font-heading mt-1 text-sm font-semibold text-white group-hover:text-primary">
                                    {seriesNav.previous.title}
                                </span>
                            </RouterLink>
                        ) : (
                            <div />
                        )}
                        {seriesNav.next ? (
                            <RouterLink
                                to="/blog/$slug"
                                params={{ slug: seriesNav.next.slug }}
                                className="group flex flex-col rounded-lg border border-surface-outline/60 p-3.5 text-right transition-colors hover:border-primary/60 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                            >
                                <span className="text-content-subtle inline-flex items-center justify-end gap-1.5 font-mono text-xs uppercase tracking-wide">
                                    Next
                                    <HiArrowRight
                                        aria-hidden="true"
                                        className="h-3.5 w-3.5"
                                    />
                                </span>
                                <span className="font-heading mt-1 text-sm font-semibold text-white group-hover:text-primary">
                                    {seriesNav.next.title}
                                </span>
                            </RouterLink>
                        ) : null}
                    </div>
                </nav>
            ) : null}

            {relatedPosts.length > 0 ? (
                <section aria-label="Related posts" className="mt-8">
                    <h2 className="font-bold text-white">Related Posts</h2>
                    <div className="mt-4 grid gap-4 md:grid-cols-3">
                        {relatedPosts.map((related) => (
                            <BlogPostCard
                                key={related.slug}
                                post={related}
                                headingAs="h3"
                            />
                        ))}
                    </div>
                </section>
            ) : null}
        </PageContainer>
    );
}
