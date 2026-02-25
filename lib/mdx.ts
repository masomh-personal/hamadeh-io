/**
 * Markdown content processing utilities
 * Reads, parses, and validates content files with frontmatter.
 */

import { readdir, readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import matter from "gray-matter";
import {
    type BlogFrontmatter,
    type ProblemFrontmatter,
    validateBlogFrontmatter,
    validateProblemFrontmatter,
} from "./schemas";

export interface ProblemPost extends ProblemFrontmatter {
    content: string;
    filePath: string;
}
export interface BlogPost extends BlogFrontmatter {
    content: string;
    filePath: string;
}

export async function getAllProblems(): Promise<ProblemPost[]> {
    const contentDir = join(process.cwd(), "content", "problems");
    const posts: ProblemPost[] = [];

    try {
        const files = await findContentFiles(contentDir, [".md"]);

        for (const filePath of files) {
            try {
                const post = await getProblemByPath(filePath);
                posts.push(post);
            } catch (error) {
                console.error(`Error processing ${filePath}:`, error);
            }
        }

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

export async function getProblemBySlug(slug: string): Promise<ProblemPost> {
    const posts = await getAllProblems();
    const post = posts.find((entry) => entry.slug === slug);

    if (!post) {
        throw new Error(`Problem post with slug "${slug}" not found`);
    }

    return post;
}

async function getProblemByPath(filePath: string): Promise<ProblemPost> {
    const fileContents = await readFile(filePath, "utf-8");
    const { data, content } = matter(fileContents);
    const frontmatter = validateProblemFrontmatter(data);

    return {
        ...frontmatter,
        content,
        filePath,
    };
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
    const contentDir = join(process.cwd(), "content", "blog");
    const posts: BlogPost[] = [];

    try {
        const files = await findContentFiles(contentDir, [".md"]);

        for (const filePath of files) {
            try {
                const post = await getBlogPostByPath(filePath);
                posts.push(post);
            } catch (error) {
                console.error(`Error processing ${filePath}:`, error);
            }
        }

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

export async function getBlogPostBySlug(slug: string): Promise<BlogPost> {
    const posts = await getAllBlogPosts();
    const post = posts.find((entry) => entry.slug === slug);

    if (!post) {
        throw new Error(`Blog post with slug "${slug}" not found`);
    }

    return post;
}

async function getBlogPostByPath(filePath: string): Promise<BlogPost> {
    const fileContents = await readFile(filePath, "utf-8");
    const { data, content } = matter(fileContents);
    const frontmatter = validateBlogFrontmatter(data);

    return {
        ...frontmatter,
        content,
        filePath,
    };
}

async function findContentFiles(
    dir: string,
    extensions: string[]
): Promise<string[]> {
    const files: string[] = [];
    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = join(dir, entry.name);

        if (entry.isDirectory()) {
            const subFiles = await findContentFiles(fullPath, extensions);
            files.push(...subFiles);
        } else if (entry.isFile() && extensions.includes(extname(entry.name))) {
            files.push(fullPath);
        }
    }

    return files;
}
