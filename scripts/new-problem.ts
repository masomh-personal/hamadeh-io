#!/usr/bin/env bun

/**
 * Problem scaffolder
 *
 * Supports LeetCode URL/slug input and scaffolds a local solution workspace.
 *
 * Usage:
 *   bun run new:problem https://leetcode.com/problems/two-sum/
 *   bun run new:problem two-sum
 */

import { mkdir, writeFile } from "node:fs/promises";
import { join, resolve, sep } from "node:path";
import * as v from "valibot";

const SLUG_REGEX = /^[a-z0-9-]+$/;
const VALID_IDENTIFIER_REGEX = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
const FETCH_TIMEOUT_MS = 10_000;

const LeetCodeProblemSchema = v.object({
    title: v.pipe(v.string(), v.minLength(1)),
    difficulty: v.picklist(["Easy", "Medium", "Hard"]),
    content: v.string(),
    topicTags: v.array(v.object({ name: v.string() })),
    codeSnippets: v.array(v.object({ lang: v.string(), code: v.string() })),
    sampleTestCase: v.string(),
});

const LeetCodeGraphQLResponseSchema = v.object({
    data: v.optional(
        v.object({
            question: v.nullable(LeetCodeProblemSchema),
        })
    ),
});

type LeetCodeProblem = v.InferOutput<typeof LeetCodeProblemSchema>;

interface ProblemMetadata {
    title: string;
    slug: string;
    source: "leetcode" | "dsa" | "custom";
    difficulty: "easy" | "medium" | "hard";
    timeComplexity: string;
    spaceComplexity: string;
    excerpt: string;
}

function extractSlug(input: string): string {
    const trimmed = input.trim();
    let candidate = trimmed;

    if (trimmed.includes("://")) {
        let parsed: URL;
        try {
            parsed = new URL(trimmed);
        } catch {
            throw new Error(`Invalid URL: "${input}"`);
        }

        const isLeetCodeHost =
            parsed.hostname === "leetcode.com" ||
            parsed.hostname === "www.leetcode.com";
        if (!isLeetCodeHost) {
            throw new Error(
                `Unsupported host "${parsed.hostname}". Expected leetcode.com.`
            );
        }

        const match = /^\/problems\/([^/]+)/.exec(parsed.pathname);
        if (!match?.[1]) {
            throw new Error(
                `Could not extract problem slug from URL: "${input}"`
            );
        }
        candidate = match[1];
    }

    if (!SLUG_REGEX.test(candidate)) {
        throw new Error(
            `Invalid problem slug "${candidate}". Expected lowercase alphanumeric characters and hyphens.`
        );
    }

    return candidate;
}

function resolveContainedDir(baseDir: string, slug: string): string {
    const resolvedBase = resolve(baseDir);
    const targetDir = resolve(resolvedBase, slug);

    if (!targetDir.startsWith(`${resolvedBase}${sep}`)) {
        throw new Error(`Invalid slug path: "${slug}"`);
    }

    return targetDir;
}

async function fetchProblemData(slug: string): Promise<LeetCodeProblem> {
    const query = `
        query getQuestionDetail($titleSlug: String!) {
            question(titleSlug: $titleSlug) {
                title
                difficulty
                content
                topicTags {
                    name
                }
                codeSnippets {
                    lang
                    code
                }
                sampleTestCase
            }
        }
    `;

    const response = await fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "User-Agent": "Mozilla/5.0",
        },
        body: JSON.stringify({
            query,
            variables: { titleSlug: slug },
        }),
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    if (!response.ok) {
        throw new Error(
            `LeetCode API request failed: ${response.status} ${response.statusText}`
        );
    }

    const rawData: unknown = await response.json();
    const parsed = v.parse(LeetCodeGraphQLResponseSchema, rawData);

    if (!parsed.data?.question) {
        throw new Error(
            `Problem not found: ${slug}. Check the slug or URL is correct.`
        );
    }

    return parsed.data.question;
}

function htmlToText(html: string): string {
    return html
        .replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .replace(/\s+/g, " ")
        .trim();
}

function escapeBlockComment(value: string): string {
    return value.replaceAll("*/", "*\\/");
}

function formatLineComment(value: string, indent: string): string {
    return value
        .split(/\r?\n/)
        .map((line) => `${indent}// ${line}`)
        .join("\n");
}

function toSafeIdentifier(slug: string): string {
    const candidate = slug.replaceAll("-", "_");
    return VALID_IDENTIFIER_REGEX.test(candidate) ? candidate : "solve";
}

function createMetadata(
    problem: LeetCodeProblem,
    slug: string
): ProblemMetadata {
    const excerpt = htmlToText(problem.content).slice(0, 200);
    const difficulty = problem.difficulty.toLowerCase() as
        | "easy"
        | "medium"
        | "hard";

    return {
        title: problem.title,
        slug,
        source: "leetcode",
        difficulty,
        timeComplexity: "O(?)",
        spaceComplexity: "O(?)",
        excerpt,
    };
}

function createSolutionFile(problem: LeetCodeProblem): string {
    const tsSnippet = problem.codeSnippets.find((s) => s.lang === "TypeScript");
    const jsSnippet = problem.codeSnippets.find((s) => s.lang === "JavaScript");
    const starterCode = tsSnippet?.code || jsSnippet?.code || "";

    const safeTitle = escapeBlockComment(problem.title);
    const safeTopics = escapeBlockComment(
        problem.topicTags.map((t) => t.name).join(", ")
    );
    const description = escapeBlockComment(htmlToText(problem.content))
        .split("\n")
        .slice(0, 10)
        .join("\n * ");

    return `/**
 * ${safeTitle}
 * Difficulty: ${problem.difficulty}
 * Topics: ${safeTopics}
 *
 * ${description}
 */

${starterCode}

// TODO: Implement your solution here
// Remember to update timeComplexity and spaceComplexity in metadata.json
`;
}

function createTestFile(problem: LeetCodeProblem, slug: string): string {
    const functionName = toSafeIdentifier(slug);
    const safeDocTitle = escapeBlockComment(problem.title);
    const sampleComment = formatLineComment(
        problem.sampleTestCase,
        "            "
    );

    return `/**
 * Tests for ${safeDocTitle}
 */

import { describe, expect, test } from "bun:test";
import { ${functionName} } from "./solution";

describe(${JSON.stringify(problem.title)}, () => {
    describe("Basics", () => {
        test("example test case", () => {
            // TODO: Add test cases based on problem examples
            // Sample test case from LeetCode:
${sampleComment}

            expect(true).toBe(true); // Replace with actual test
        });
    });

    describe("Edge Cases", () => {
        test("handles edge cases", () => {
            // TODO: Add edge case tests
            expect(true).toBe(true); // Replace with actual test
        });
    });
});
`;
}

async function scaffold(input: string): Promise<void> {
    try {
        const slug = extractSlug(input);
        const solutionDir = resolveContainedDir(
            join(process.cwd(), "solutions"),
            slug
        );

        console.log(`Fetching problem data for: ${slug}...`);

        const problem = await fetchProblemData(slug);

        console.log(`Found: ${problem.title} (${problem.difficulty})`);

        await mkdir(solutionDir, { recursive: true });

        const metadata = createMetadata(problem, slug);
        await writeFile(
            join(solutionDir, "metadata.json"),
            JSON.stringify(metadata, null, 4)
        );

        const solutionContent = createSolutionFile(problem);
        await writeFile(join(solutionDir, "solution.ts"), solutionContent);

        const testContent = createTestFile(problem, slug);
        await writeFile(join(solutionDir, "solution.test.ts"), testContent);

        console.log(`\nCreated: solutions/${slug}/`);
        console.log(
            "\nReview starter code in solution.ts before running tests."
        );
        console.log("\nNext steps:");
        console.log(`  1. Implement solution in solutions/${slug}/solution.ts`);
        console.log(`  2. Write tests in solutions/${slug}/solution.test.ts`);
        console.log(`  3. Fill complexity fields in metadata.json`);
        console.log(`  4. Run: bun test solutions/${slug}/solution.test.ts`);
        console.log(`  5. Publish: bun run publish:problem ${slug}`);
    } catch (error) {
        console.error(
            `\nError: ${error instanceof Error ? error.message : String(error)}`
        );
        process.exit(1);
    }
}

const input = process.argv[2];

if (!input) {
    console.error("Usage: bun run new:problem <leetcode-url-or-slug>");
    console.error("\nExamples:");
    console.error(
        "  bun run new:problem https://leetcode.com/problems/two-sum/"
    );
    console.error("  bun run new:problem two-sum");
    process.exit(1);
}

await scaffold(input);
