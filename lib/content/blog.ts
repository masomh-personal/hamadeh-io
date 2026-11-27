import {
    type BlogPost,
    getAllBlogPosts,
    getBlogPostBySlug,
    isContentNotFoundError,
} from "@/lib/mdx";
import { stripMarkdownForSearch } from "@/lib/blog-search";

export type PublishedBlogPost = Omit<BlogPost, "filePath">;
export type BlogPostSummary = Omit<PublishedBlogPost, "content">;

export { isContentNotFoundError };

/**
 * Content-access boundary for blog data.
 * Keeps page and UI components decoupled from filesystem details like filePath.
 */
export async function listPublishedBlogPosts(): Promise<BlogPostSummary[]> {
    const posts = await getAllBlogPosts();

    return posts.map(
        ({
            excerpt,
            featured,
            readingTimeMinutes,
            series,
            seriesOrder,
            slug,
            tags,
            title,
        }) => ({
            excerpt,
            featured,
            readingTimeMinutes,
            series,
            seriesOrder,
            slug,
            tags,
            title,
        })
    );
}

export async function getPublishedBlogPostBySlug(
    slug: string
): Promise<PublishedBlogPost> {
    const { filePath: _filePath, ...post } = await getBlogPostBySlug(slug);
    return post;
}

/**
 * Builds a slug-to-plain-text map for static client-side body copy search.
 */
export async function listBlogSearchIndex(): Promise<Record<string, string>> {
    const posts = await getAllBlogPosts();
    const index: Record<string, string> = {};

    for (const post of posts) {
        index[post.slug] = stripMarkdownForSearch(post.content);
    }

    return index;
}
