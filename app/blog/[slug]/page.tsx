import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostHeader } from "@/components/blog/BlogPostHeader";
import { PageContainer } from "@/components/layout/PageContainer";
import { MDXContent } from "@/components/mdx/MDXContent";
import {
    getPublishedBlogPostBySlug,
    listPublishedBlogPosts,
} from "@/lib/content/blog";

interface PageProps {
    params: Promise<{ slug: string }>;
}

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

        return {
            title: `${post.title} | ThoughtfulCode`,
            description: post.excerpt,
        };
    } catch {
        return {
            title: "Post Not Found | ThoughtfulCode",
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
    } catch {
        notFound();
    }

    return (
        <PageContainer>
            <article>
                <BlogPostHeader post={post} />
                <MDXContent content={post.content} />
            </article>
        </PageContainer>
    );
}
