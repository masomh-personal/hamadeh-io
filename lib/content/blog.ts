import type { BlogPost } from "@/lib/mdx";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/mdx";

/**
 * Content-access boundary for blog data.
 * This keeps page components stable if we move from files to a database.
 */
export async function listPublishedBlogPosts(): Promise<BlogPost[]> {
    return getAllBlogPosts();
}

export async function getPublishedBlogPostBySlug(
    slug: string
): Promise<BlogPost> {
    return getBlogPostBySlug(slug);
}
