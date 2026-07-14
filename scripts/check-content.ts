#!/usr/bin/env bun

import { getAllBlogPosts, getAllProblems } from "@/lib/mdx";

async function checkContent(): Promise<void> {
    const [posts, problems] = await Promise.all([
        getAllBlogPosts(),
        getAllProblems(),
    ]);

    console.log(
        `Content check passed: ${posts.length} blog posts and ${problems.length} problems`
    );
}

try {
    await checkContent();
} catch (error) {
    console.error(
        `Content check failed: ${error instanceof Error ? error.message : String(error)}`
    );
    process.exit(1);
}
