import type { BlogPost } from "@/lib/mdx";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/mdx";

/**
 * Content-access boundary for blog data.
 * This keeps page components stable if we move from files to a database.
 */
export async function listPublishedBlogPosts(): Promise<BlogPost[]> {
    return getAllBlogPosts(false);
}

export async function getPublishedBlogPostBySlug(
    slug: string
): Promise<BlogPost> {
    const post = await getBlogPostBySlug(slug);
    if (post.status === "draft") {
        throw new Error(`Blog post "${slug}" is not published`);
    }
    return post;
}
