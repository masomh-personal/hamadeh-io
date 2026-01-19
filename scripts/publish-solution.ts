#!/usr/bin/env bun

/**
 * LeetCode Solution Publisher
 *
 * Generates MDX file from a completed solution in the solutions/ folder.
 *
 * Usage:
 *   bun run publish:solution two-sum
 */

import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

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
 * Read solution files from solutions/ folder
 */
async function readSolutionFiles(slug: string): Promise<{
    metadata: ProblemMetadata;
    solution: string;
    tests: string;
}> {
    const solutionDir = join(process.cwd(), "solutions", slug);

    if (!existsSync(solutionDir)) {
        throw new Error(
            `Solution folder not found: solutions/${slug}/\nRun: bun run new:solution ${slug}`
        );
    }

    const metadataPath = join(solutionDir, "metadata.json");
    const solutionPath = join(solutionDir, "solution.ts");
    const testsPath = join(solutionDir, "solution.test.ts");

    if (!existsSync(metadataPath)) {
        throw new Error(`metadata.json not found in solutions/${slug}/`);
    }

    if (!existsSync(solutionPath)) {
        throw new Error(`solution.ts not found in solutions/${slug}/`);
    }

    const metadata: ProblemMetadata = JSON.parse(
        await readFile(metadataPath, "utf-8")
    );
    const solution = await readFile(solutionPath, "utf-8");
    const tests = existsSync(testsPath)
        ? await readFile(testsPath, "utf-8")
        : "";

    return { metadata, solution, tests };
}

/**
 * Validate metadata has required fields filled in
 */
function validateMetadata(metadata: ProblemMetadata): void {
    const errors: string[] = [];

    if (metadata.timeComplexity === "O(?)") {
        errors.push("timeComplexity is not filled in (still O(?))");
    }

    if (metadata.spaceComplexity === "O(?)") {
        errors.push("spaceComplexity is not filled in (still O(?))");
    }

    if (errors.length > 0) {
        throw new Error(
            `Please update metadata.json:\n  - ${errors.join("\n  - ")}`
        );
    }
}

/**
 * Extract solution code (remove comments and imports for cleaner MDX)
 */
function extractSolutionCode(solution: string): string {
    // Remove the initial comment block
    const lines = solution.split("\n");
    let startIndex = 0;

    // Skip initial comment block
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line?.trim().startsWith("/**")) {
            while (i < lines.length && !lines[i]?.includes("*/")) {
                i++;
            }
            startIndex = i + 1;
            break;
        }
    }

    return lines.slice(startIndex).join("\n").trim();
}

/**
 * Generate MDX content
 */
function generateMDX(metadata: ProblemMetadata, solution: string): string {
    const frontmatter = `---
title: "${metadata.title}"
slug: "${metadata.slug}"
difficulty: "${metadata.difficulty}"
topics: [${metadata.topics.map((t) => `"${t}"`).join(", ")}]
datePublished: "${metadata.datePublished}"
timeComplexity: "${metadata.timeComplexity}"
spaceComplexity: "${metadata.spaceComplexity}"
excerpt: "${metadata.excerpt}"
relatedProblems: [${metadata.relatedProblems.map((p) => `"${p}"`).join(", ")}]
companies: [${metadata.companies.map((c) => `"${c}"`).join(", ")}]
hints: [${metadata.hints.map((h) => `"${h}"`).join(", ")}]
---`;

    const solutionCode = extractSolutionCode(solution);

    return `${frontmatter}

# Problem

[Add problem description here]

## Examples

**Example 1:**

\`\`\`
Input: [add input]
Output: [add output]
Explanation: [add explanation]
\`\`\`

## Solution

### Approach

[Explain your approach here]

### Implementation

\`\`\`typescript
${solutionCode}
\`\`\`

### Complexity Analysis

**Time Complexity:** ${metadata.timeComplexity}

[Explain time complexity]

**Space Complexity:** ${metadata.spaceComplexity}

[Explain space complexity]

## Key Takeaways

- [Add key insight 1]
- [Add key insight 2]
- [Add key insight 3]
`;
}

/**
 * Main publish function
 */
async function publish(slug: string): Promise<void> {
    console.log(`📖 Reading solution files for: ${slug}...`);

    try {
        const { metadata, solution } = await readSolutionFiles(slug);

        console.log(`✅ Found: ${metadata.title} (${metadata.difficulty})`);

        // Validate metadata
        console.log(`🔍 Validating metadata...`);
        validateMetadata(metadata);

        // Generate MDX
        console.log(`📝 Generating MDX...`);
        const mdxContent = generateMDX(metadata, solution);

        // Ensure content directory exists
        const contentDir = join(process.cwd(), "content", "leetcode");
        await mkdir(contentDir, { recursive: true });

        // Write MDX file
        const mdxPath = join(contentDir, `${slug}.mdx`);
        await writeFile(mdxPath, mdxContent);

        console.log(
            `\n✨ Successfully published to: content/leetcode/${slug}.mdx`
        );
        console.log(`\n📝 Next steps:`);
        console.log(`   1. Edit content/leetcode/${slug}.mdx to add:`);
        console.log(`      - Problem description`);
        console.log(`      - Examples`);
        console.log(`      - Approach explanation`);
        console.log(`      - Complexity analysis details`);
        console.log(`      - Key takeaways`);
        console.log(`   2. Preview: http://localhost:3000/leetcode/${slug}`);
        console.log(`   3. Commit when ready!`);
    } catch (error) {
        console.error(
            `\n❌ Error: ${error instanceof Error ? error.message : String(error)}`
        );
        process.exit(1);
    }
}

// CLI entry point
const slug = process.argv[2];

if (!slug) {
    console.error("Usage: bun run publish:solution <slug>");
    console.error("\nExample:");
    console.error("  bun run publish:solution two-sum");
    process.exit(1);
}

await publish(slug);
