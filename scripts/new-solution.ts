#!/usr/bin/env bun

/**
 * LeetCode Solution Scaffolder
 *
 * Fetches problem metadata from LeetCode's GraphQL API and scaffolds
 * a solution folder with starter files.
 *
 * Usage:
 *   bun run new:solution https://leetcode.com/problems/two-sum/
 *   bun run new:solution two-sum
 */

import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

interface LeetCodeProblem {
    title: string;
    difficulty: string;
    content: string;
    topicTags: Array<{ name: string; slug: string }>;
    codeSnippets: Array<{ lang: string; code: string }>;
    sampleTestCase: string;
}

interface ProblemMetadata {
    title: string;
    slug: string;
    difficulty: "easy" | "medium" | "hard";
    topics: string[];
    datePublished: string;
    timeComplexity: string;
    spaceComplexity: string;
    excerpt: string;
    relatedProblems: string[];
    companies: string[];
    hints: string[];
}

/**
 * Extract slug from LeetCode URL or return as-is if already a slug
 */
function extractSlug(input: string): string {
    const urlMatch = input.match(/leetcode\.com\/problems\/([^/]+)/);
    return urlMatch ? urlMatch[1] : input;
}

/**
 * Fetch problem data from LeetCode GraphQL API
 */
async function fetchProblemData(slug: string): Promise<LeetCodeProblem> {
    const query = `
        query getQuestionDetail($titleSlug: String!) {
            question(titleSlug: $titleSlug) {
                title
                difficulty
                content
                topicTags {
                    name
                    slug
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

/**
 * Convert HTML content to plain text (basic conversion)
 */
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

/**
 * Create metadata.json for the solution
 */
function createMetadata(
    problem: LeetCodeProblem,
    slug: string
): ProblemMetadata {
    const excerpt = htmlToText(problem.content).slice(0, 200);

    return {
        title: problem.title,
        slug,
        difficulty: problem.difficulty.toLowerCase() as
            | "easy"
            | "medium"
            | "hard",
        topics: problem.topicTags.map((tag) => tag.slug),
        datePublished: new Date().toISOString().split("T")[0],
        timeComplexity: "O(?)", // User will fill in
        spaceComplexity: "O(?)", // User will fill in
        excerpt,
        relatedProblems: [],
        companies: [],
        hints: [],
    };
}

/**
 * Create solution.ts starter file
 */
function createSolutionFile(problem: LeetCodeProblem, _slug: string): string {
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

/**
 * Create solution.test.ts starter file
 */
function createTestFile(problem: LeetCodeProblem, slug: string): string {
    const functionName = slug.replace(/-/g, "_");

    return `/**
 * Tests for ${problem.title}
 */

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

/**
 * Main scaffolding function
 */
async function scaffold(input: string): Promise<void> {
    const slug = extractSlug(input);

    console.log(`📥 Fetching problem data for: ${slug}...`);

    try {
        const problem = await fetchProblemData(slug);

        console.log(`✅ Found: ${problem.title} (${problem.difficulty})`);
        console.log(
            `📚 Topics: ${problem.topicTags.map((t) => t.name).join(", ")}`
        );

        // Create solution directory
        const solutionDir = join(process.cwd(), "solutions", slug);
        await mkdir(solutionDir, { recursive: true });

        // Create metadata.json
        const metadata = createMetadata(problem, slug);
        await writeFile(
            join(solutionDir, "metadata.json"),
            JSON.stringify(metadata, null, 4)
        );

        // Create solution.ts
        const solutionContent = createSolutionFile(problem, slug);
        await writeFile(join(solutionDir, "solution.ts"), solutionContent);

        // Create solution.test.ts
        const testContent = createTestFile(problem, slug);
        await writeFile(join(solutionDir, "solution.test.ts"), testContent);

        console.log(
            `\n✨ Successfully scaffolded solution at: solutions/${slug}/`
        );
        console.log(`\n📝 Next steps:`);
        console.log(
            `   1. Implement your solution in solutions/${slug}/solution.ts`
        );
        console.log(`   2. Write tests in solutions/${slug}/solution.test.ts`);
        console.log(
            `   3. Update timeComplexity and spaceComplexity in metadata.json`
        );
        console.log(`   4. Run: bun test solutions/${slug}/solution.test.ts`);
        console.log(`   5. When ready: bun run publish:solution ${slug}`);
    } catch (error) {
        console.error(
            `\n❌ Error: ${error instanceof Error ? error.message : String(error)}`
        );
        process.exit(1);
    }
}

// CLI entry point
const input = process.argv[2];

if (!input) {
    console.error("Usage: bun run new:solution <leetcode-url-or-slug>");
    console.error("\nExamples:");
    console.error(
        "  bun run new:solution https://leetcode.com/problems/two-sum/"
    );
    console.error("  bun run new:solution two-sum");
    process.exit(1);
}

await scaffold(input);
