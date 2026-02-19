/**
 * Valibot schemas for MDX frontmatter validation
 * Lightweight (~1KB vs Zod's ~14KB) with excellent TypeScript inference
 */

import * as v from "valibot";

/**
 * LeetCode Solution Frontmatter Schema
 * Validates all required and optional fields for LeetCode solution MDX files
 */
export const LeetCodeFrontmatterSchema = v.object({
    title: v.pipe(v.string(), v.minLength(1, "Title is required")),
    slug: v.pipe(
        v.string(),
        v.minLength(1, "Slug is required"),
        v.regex(
            /^[a-z0-9-]+$/,
            "Slug must be lowercase alphanumeric with hyphens"
        )
    ),
    difficulty: v.picklist(
        ["easy", "medium", "hard"],
        "Difficulty must be easy, medium, or hard"
    ),
    topics: v.array(
        v.pipe(v.string(), v.minLength(1)),
        "Topics must be a non-empty array"
    ),
    datePublished: v.pipe(
        v.string(),
        v.isoDate("Date must be in ISO format (YYYY-MM-DD)")
    ),
    timeComplexity: v.pipe(
        v.string(),
        v.regex(
            /^O\(.+\)$/,
            "Time complexity must be in Big O notation (e.g., O(n))"
        )
    ),
    spaceComplexity: v.pipe(
        v.string(),
        v.regex(
            /^O\(.+\)$/,
            "Space complexity must be in Big O notation (e.g., O(n))"
        )
    ),
    excerpt: v.pipe(
        v.string(),
        v.minLength(1, "Excerpt is required"),
        v.maxLength(200, "Excerpt must be 200 characters or less")
    ),
    relatedProblems: v.optional(v.array(v.string())),
    companies: v.optional(v.array(v.string())),
    hints: v.optional(v.array(v.string())),
});

/**
 * Blog Post Frontmatter Schema
 * Validates all required and optional fields for blog post MDX files
 */
export const BlogFrontmatterSchema = v.object({
    title: v.pipe(v.string(), v.minLength(1, "Title is required")),
    slug: v.pipe(
        v.string(),
        v.minLength(1, "Slug is required"),
        v.regex(
            /^[a-z0-9-]+$/,
            "Slug must be lowercase alphanumeric with hyphens"
        )
    ),
    datePublished: v.pipe(
        v.string(),
        v.isoDate("Date must be in ISO format (YYYY-MM-DD)")
    ),
    updatedAt: v.optional(
        v.pipe(v.string(), v.isoDate("Updated date must be in ISO format"))
    ),
    excerpt: v.pipe(
        v.string(),
        v.minLength(1, "Excerpt is required"),
        v.maxLength(200, "Excerpt must be 200 characters or less")
    ),
    tags: v.optional(
        v.pipe(
            v.array(
                v.pipe(v.string(), v.minLength(1, "Tags must be non-empty"))
            ),
            v.maxLength(3, "At most 3 tags are allowed")
        )
    ),
});

/**
 * TypeScript types inferred from schemas
 * These provide full type safety when working with frontmatter
 */
export type LeetCodeFrontmatter = v.InferOutput<
    typeof LeetCodeFrontmatterSchema
>;
export type BlogFrontmatter = v.InferOutput<typeof BlogFrontmatterSchema>;

/**
 * Validate LeetCode frontmatter with helpful error messages
 * @param data - Unknown data to validate
 * @returns Validated frontmatter or throws descriptive error
 */
export function validateLeetCodeFrontmatter(
    data: unknown
): LeetCodeFrontmatter {
    return v.parse(LeetCodeFrontmatterSchema, data);
}

/**
 * Validate blog post frontmatter with helpful error messages
 * @param data - Unknown data to validate
 * @returns Validated frontmatter or throws descriptive error
 */
export function validateBlogFrontmatter(data: unknown): BlogFrontmatter {
    return v.parse(BlogFrontmatterSchema, data);
}
