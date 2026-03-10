import type { Metadata } from "next";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { Link, PaginationNav } from "@/components/ui";
import { listPublishedBlogPosts } from "@/lib/content/blog";

const BLOG_POSTS_PER_PAGE = 9;

interface PageProps {
    searchParams: Promise<{
        page?: string;
    }>;
}

function parsePageNumber(page: string | undefined): number {
    if (!page) {
        return 1;
    }

    const parsedPage = Number(page);

    if (!Number.isInteger(parsedPage) || parsedPage < 1) {
        return 1;
    }

    return parsedPage;
}

function getBlogPageHref(page: number): string {
    if (page <= 1) {
        return "/blog";
    }

    return `/blog?page=${page}`;
}

export const metadata: Metadata = {
    title: "Blog | hamadeh.io",
    description:
        "Engineering notes on software development, CS fundamentals, and practical coding lessons.",
};

export default async function BlogPage({
    searchParams,
}: PageProps): Promise<React.ReactElement> {
    const posts = await listPublishedBlogPosts();
    const resolvedSearchParams = await searchParams;
    const requestedPage = parsePageNumber(resolvedSearchParams.page);
    const totalPages = Math.max(
        1,
        Math.ceil(posts.length / BLOG_POSTS_PER_PAGE)
    );
    const currentPage = Math.min(requestedPage, totalPages);
    const startIndex = (currentPage - 1) * BLOG_POSTS_PER_PAGE;
    const visiblePosts = posts.slice(
        startIndex,
        startIndex + BLOG_POSTS_PER_PAGE
    );

    return (
        <PageContainer>
            <PageHeader
                title="Blog"
                description="Practical notes from projects I&apos;ve built, decisions I&apos;ve had to make, and lessons learned along the way. I write about engineering fundamentals, modern front-end work, and new tools I&apos;m exploring with a hands-on mindset."
                showDivider
            />

            {posts.length === 0 ? (
                <div className="surface-card radius-card p-8">
                    <p className="text-content">
                        No posts published yet. Check back soon.
                    </p>
                    <Link
                        href="/"
                        variant="muted"
                        className="mt-4 inline-block"
                    >
                        Back to Home
                    </Link>
                </div>
            ) : (
                <>
                    <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
                        {visiblePosts.map((post) => (
                            <BlogPostCard key={post.slug} post={post} />
                        ))}
                    </div>

                    <PaginationNav
                        currentPage={currentPage}
                        totalPages={totalPages}
                        getPageHref={getBlogPageHref}
                        className="mt-10"
                    />
                </>
            )}
        </PageContainer>
    );
}
