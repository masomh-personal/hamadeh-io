import type { BlogPost } from "@/lib/mdx";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/mdx";

export type BlogPostSummary = Omit<BlogPost, "content" | "filePath">;

/**
 * Content-access boundary for blog data.
 * This keeps page components stable if we move from files to a database.
 */
export async function listPublishedBlogPosts(): Promise<BlogPostSummary[]> {
    const posts = await getAllBlogPosts();

    return posts.map(
        ({ datePublished, excerpt, slug, tags, title, updatedAt }) => ({
            datePublished,
            excerpt,
            slug,
            tags,
            title,
            updatedAt,
        })
    );
}

export async function getPublishedBlogPostBySlug(
    slug: string
): Promise<BlogPost> {
    return getBlogPostBySlug(slug);
}
