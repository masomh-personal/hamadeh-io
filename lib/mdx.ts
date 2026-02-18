/**
 * MDX processing utilities
 * Reads, parses, and validates MDX files with frontmatter
 */

import { readdir, readFile } from "node:fs/promises";
import { basename, extname, join } from "node:path";
import matter from "gray-matter";
import {
    type BlogFrontmatter,
    type LeetCodeFrontmatter,
    validateBlogFrontmatter,
    validateLeetCodeFrontmatter,
} from "./schemas";

/**
 * LeetCode Solution with parsed content
 */
export interface LeetCodeSolution extends LeetCodeFrontmatter {
    content: string;
    filePath: string;
}

/**
 * Blog Post with parsed content
 */
export interface BlogPost extends BlogFrontmatter {
    content: string;
    filePath: string;
}

/**
 * Get all LeetCode solutions from the content directory
 * @returns Array of parsed and validated solutions, sorted by date (newest first)
 */
export async function getAllSolutions(): Promise<LeetCodeSolution[]> {
    const contentDir = join(process.cwd(), "content", "leetcode");
    const solutions: LeetCodeSolution[] = [];

    try {
        // Recursively find all .mdx files
        const files = await findContentFiles(contentDir, [".mdx"]);

        for (const filePath of files) {
            try {
                const solution = await getSolutionByPath(filePath);
                solutions.push(solution);
            } catch (error) {
                // Log error but continue processing other files
                console.error(`Error processing ${filePath}:`, error);
            }
        }

        // Sort by date published (newest first)
        return solutions.sort((a, b) => {
            const dateA = new Date(a.datePublished).getTime();
            const dateB = new Date(b.datePublished).getTime();
            return dateB - dateA;
        });
    } catch (error) {
        // If content directory doesn't exist, return empty array
        if ((error as NodeJS.ErrnoException).code === "ENOENT") {
            return [];
        }
        throw error;
    }
}

/**
 * Get a single LeetCode solution by slug
 * @param slug - The slug of the solution (e.g., "two-sum")
 * @returns The parsed and validated solution
 * @throws Error if solution not found or invalid
 */
export async function getSolutionBySlug(
    slug: string
): Promise<LeetCodeSolution> {
    const contentDir = join(process.cwd(), "content", "leetcode");
    const files = await findContentFiles(contentDir, [".mdx"]);

    // Find file matching slug exactly (avoid partial-match collisions)
    const filePath = files.find((path) => getSlugFromFilePath(path) === slug);

    if (!filePath) {
        throw new Error(`Solution with slug "${slug}" not found`);
    }

    return getSolutionByPath(filePath);
}

/**
 * Get a single LeetCode solution by file path
 * @param filePath - Full path to the MDX file
 * @returns The parsed and validated solution
 * @throws Error if file is invalid or frontmatter validation fails
 */
async function getSolutionByPath(filePath: string): Promise<LeetCodeSolution> {
    const fileContents = await readFile(filePath, "utf-8");
    const { data, content } = matter(fileContents);

    // Validate frontmatter with Valibot
    const frontmatter = validateLeetCodeFrontmatter(data);

    return {
        ...frontmatter,
        content,
        filePath,
    };
}

/**
 * Get all blog posts from the content directory
 * @param includeDrafts - Whether to include draft posts (default: false)
 * @returns Array of parsed and validated blog posts, sorted by date (newest first)
 */
export async function getAllBlogPosts(
    includeDrafts = false
): Promise<BlogPost[]> {
    const contentDir = join(process.cwd(), "content", "blog");
    const posts: BlogPost[] = [];

    try {
        // Blog content is Markdown-only for now
        const files = await findContentFiles(contentDir, [".md"]);

        for (const filePath of files) {
            try {
                const post = await getBlogPostByPath(filePath);

                // Filter out drafts unless explicitly included
                if (!includeDrafts && post.status === "draft") {
                    continue;
                }

                posts.push(post);
            } catch (error) {
                console.error(`Error processing ${filePath}:`, error);
            }
        }

        // Sort by date published (newest first)
        return posts.sort((a, b) => {
            const dateA = new Date(a.datePublished).getTime();
            const dateB = new Date(b.datePublished).getTime();
            return dateB - dateA;
        });
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code === "ENOENT") {
            return [];
        }
        throw error;
    }
}

/**
 * Get a single blog post by slug
 * @param slug - The slug of the post (e.g., "why-i-love-typescript")
 * @returns The parsed and validated blog post
 * @throws Error if post not found or invalid
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost> {
    const contentDir = join(process.cwd(), "content", "blog");
    const files = await findContentFiles(contentDir, [".md"]);

    const filePath = files.find((path) => getSlugFromFilePath(path) === slug);

    if (!filePath) {
        throw new Error(`Blog post with slug "${slug}" not found`);
    }

    return getBlogPostByPath(filePath);
}

/**
 * Get a single blog post by file path
 * @param filePath - Full path to the MDX file
 * @returns The parsed and validated blog post
 * @throws Error if file is invalid or frontmatter validation fails
 */
async function getBlogPostByPath(filePath: string): Promise<BlogPost> {
    const fileContents = await readFile(filePath, "utf-8");
    const { data, content } = matter(fileContents);

    // Validate frontmatter with Valibot
    const frontmatter = validateBlogFrontmatter(data);

    return {
        ...frontmatter,
        content,
        filePath,
    };
}

/**
 * Recursively find content files in a directory by extension
 * @param dir - Directory to search
 * @param extensions - File extensions to include (e.g., [".mdx"])
 * @returns Array of full file paths
 */
async function findContentFiles(
    dir: string,
    extensions: string[]
): Promise<string[]> {
    const files: string[] = [];
    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = join(dir, entry.name);

        if (entry.isDirectory()) {
            // Recursively search subdirectories
            const subFiles = await findContentFiles(fullPath, extensions);
            files.push(...subFiles);
        } else if (entry.isFile() && extensions.includes(extname(entry.name))) {
            files.push(fullPath);
        }
    }

    return files;
}

/**
 * Extract content slug from file path
 * @param filePath - Full path to content file
 * @returns Filename without extension
 */
function getSlugFromFilePath(filePath: string): string {
    return basename(filePath, extname(filePath));
}
