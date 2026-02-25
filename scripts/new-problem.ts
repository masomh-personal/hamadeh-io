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
import { join } from "node:path";

interface LeetCodeProblem {
    title: string;
    difficulty: string;
    content: string;
    topicTags: Array<{ name: string }>;
    codeSnippets: Array<{ lang: string; code: string }>;
    sampleTestCase: string;
}

interface ProblemMetadata {
    title: string;
    slug: string;
    source: "leetcode" | "dsa" | "custom";
    difficulty: "easy" | "medium" | "hard";
    datePublished: string;
    timeComplexity: string;
    spaceComplexity: string;
    excerpt: string;
}

function extractSlug(input: string): string {
    const urlMatch = input.match(/leetcode\.com\/problems\/([^/]+)/);
    return urlMatch?.[1] ?? input;
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
    });

    if (!response.ok) {
        throw new Error(
            `LeetCode API request failed: ${response.status} ${response.statusText}`
        );
    }

    const data = await response.json();

    if (!data.data?.question) {
        throw new Error(
            `Problem not found: ${slug}. Check the slug or URL is correct.`
        );
    }

    return data.data.question;
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

function createMetadata(
    problem: LeetCodeProblem,
    slug: string
): ProblemMetadata {
    const excerpt = htmlToText(problem.content).slice(0, 200);

    return {
        title: problem.title,
        slug,
        source: "leetcode",
        difficulty: problem.difficulty.toLowerCase() as
            | "easy"
            | "medium"
            | "hard",
        datePublished: new Date().toISOString().split("T")[0] ?? "",
        timeComplexity: "O(?)",
        spaceComplexity: "O(?)",
        excerpt,
    };
}

function createSolutionFile(problem: LeetCodeProblem): string {
    const tsSnippet = problem.codeSnippets.find((s) => s.lang === "TypeScript");
    const jsSnippet = problem.codeSnippets.find((s) => s.lang === "JavaScript");
    const starterCode = tsSnippet?.code || jsSnippet?.code || "";

    const description = htmlToText(problem.content)
        .split("\n")
        .slice(0, 10)
        .join("\n * ");

    return `/**
 * ${problem.title}
 * Difficulty: ${problem.difficulty}
 * Topics: ${problem.topicTags.map((t) => t.name).join(", ")}
 *
 * ${description}
 */

${starterCode}

// TODO: Implement your solution here
// Remember to update timeComplexity and spaceComplexity in metadata.json
`;
}

function createTestFile(problem: LeetCodeProblem, slug: string): string {
    const functionName = slug.replace(/-/g, "_");

    return `/**
 * Tests for ${problem.title}
 */

import { describe, expect, test } from "bun:test";
import { ${functionName} } from "./solution";

describe("${problem.title}", () => {
    describe("Basics", () => {
        test("example test case", () => {
            // TODO: Add test cases based on problem examples
            // Sample test case from LeetCode:
            // ${problem.sampleTestCase}

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
    const slug = extractSlug(input);

    console.log(`Fetching problem data for: ${slug}...`);

    try {
        const problem = await fetchProblemData(slug);

        console.log(`Found: ${problem.title} (${problem.difficulty})`);

        const solutionDir = join(process.cwd(), "solutions", slug);
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
