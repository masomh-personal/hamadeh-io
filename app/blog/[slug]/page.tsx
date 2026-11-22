import type { Metadata, Route } from "next";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { BlogPostHeader } from "@/components/blog/BlogPostHeader";
import { PageContainer } from "@/components/layout/PageContainer";
import { RichMarkdownContent } from "@/components/markdown/RichMarkdownContent";
import { getRelatedPosts, getSeriesNavigation } from "@/lib/blog-listing";
import {
    getPublishedBlogPostBySlug,
    isContentNotFoundError,
    listPublishedBlogPosts,
} from "@/lib/content/blog";
import { absoluteUrl, AUTHOR_NAME, SITE_NAME } from "@/lib/site";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
    const posts = await listPublishedBlogPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { slug } = await params;

    try {
        const post = await getPublishedBlogPostBySlug(slug);
        const canonicalPath = `/blog/${post.slug}`;

        return {
            title: post.title,
            description: post.excerpt,
            alternates: {
                canonical: canonicalPath,
            },
            openGraph: {
                type: "article",
                url: canonicalPath,
                siteName: SITE_NAME,
                title: post.title,
                description: post.excerpt,
                authors: [AUTHOR_NAME],
                tags: post.tags,
            },
            twitter: {
                card: "summary_large_image",
                title: post.title,
                description: post.excerpt,
            },
        };
    } catch (error) {
        if (!isContentNotFoundError(error)) {
            throw error;
        }
        return {
            title: "Post Not Found",
            robots: {
                index: false,
                follow: false,
            },
        };
    }
}

export default async function BlogPostPage({
    params,
}: PageProps): Promise<React.ReactElement> {
    const { slug } = await params;

    let post: Awaited<ReturnType<typeof getPublishedBlogPostBySlug>>;
    try {
        post = await getPublishedBlogPostBySlug(slug);
    } catch (error) {
        if (isContentNotFoundError(error)) {
            notFound();
        }
        throw error;
    }

    const allPosts = await listPublishedBlogPosts();
    const seriesNav = getSeriesNavigation(allPosts, post);
    const relatedPosts = getRelatedPosts(allPosts, post, 3);
    const wordCount = post.content.trim().split(/\s+/).filter(Boolean).length;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        inLanguage: "en-US",
        wordCount,
        image: absoluteUrl(`/blog/${post.slug}/opengraph-image`),
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
                <RichMarkdownContent content={post.content} />
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
                            <NextLink
                                href={
                                    `/blog/${seriesNav.previous.slug}` as Route
                                }
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
                            </NextLink>
                        ) : (
                            <div />
                        )}
                        {seriesNav.next ? (
                            <NextLink
                                href={`/blog/${seriesNav.next.slug}` as Route}
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
                            </NextLink>
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
