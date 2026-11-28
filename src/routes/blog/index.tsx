import { createFileRoute } from "@tanstack/react-router";
import * as v from "valibot";
import { BlogListing } from "@/components/blog/BlogListing";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { Link } from "@/components/ui";
import { buildPageHead } from "@/lib/site";
import { loadBlogListingData } from "@/src/data/content";

const BlogSearchSchema = v.object({
    tag: v.optional(v.string()),
    q: v.optional(v.string()),
    page: v.optional(
        v.pipe(
            v.union([v.number(), v.string()]),
            v.transform((val) => Number(val)),
            v.number(),
            v.finite()
        )
    ),
});

export const Route = createFileRoute("/blog/")({
    validateSearch: (search) => {
        const parsed = v.safeParse(BlogSearchSchema, search);
        return parsed.success ? parsed.output : {};
    },
    loader: () => loadBlogListingData(),
    head: () =>
        buildPageHead({
            title: "Blog",
            description:
                "Engineering notes on software development, CS fundamentals, and practical coding lessons.",
            path: "/blog",
        }),
    component: BlogPage,
});

function BlogPage(): React.ReactElement {
    const { posts, tagCounts } = Route.useLoaderData();
    const search = Route.useSearch();

    return (
        <PageContainer>
            <PageHeader
                title="Blog"
                description="Practical notes from projects I've built, decisions I've had to make, and lessons learned along the way. I write about engineering fundamentals, modern front-end work, and new tools I'm exploring with a hands-on mindset."
                showDivider
                className="mb-3"
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
                <BlogListing
                    posts={posts}
                    tagCounts={tagCounts}
                    search={{
                        tag: search.tag,
                        q: search.q,
                        page:
                            search.page !== undefined
                                ? String(search.page)
                                : undefined,
                    }}
                />
            )}
        </PageContainer>
    );
}
