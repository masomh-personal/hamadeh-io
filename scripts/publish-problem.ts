#!/usr/bin/env bun

/**
 * Problem publisher
 *
 * Generates public markdown from a completed local solution.
 *
 * Usage:
 *   bun run publish:problem two-sum
 */

import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import {
    type ProblemFrontmatter,
    validateProblemFrontmatter,
} from "@/lib/schemas";

async function readSolutionFiles(slug: string): Promise<{
    metadata: ProblemFrontmatter;
    solution: string;
}> {
    const solutionDir = join(process.cwd(), "solutions", slug);

    if (!existsSync(solutionDir)) {
        throw new Error(
            `Solution folder not found: solutions/${slug}/\nRun: bun run new:problem ${slug}`
        );
    }

    const metadataPath = join(solutionDir, "metadata.json");
    const solutionPath = join(solutionDir, "solution.ts");

    if (!existsSync(metadataPath)) {
        throw new Error(`metadata.json not found in solutions/${slug}/`);
    }

    if (!existsSync(solutionPath)) {
        throw new Error(`solution.ts not found in solutions/${slug}/`);
    }

    const metadata = validateProblemFrontmatter(
        JSON.parse(await readFile(metadataPath, "utf-8"))
    );
    const solution = await readFile(solutionPath, "utf-8");

    return { metadata, solution };
}

function validateMetadata(
    metadata: ProblemFrontmatter,
    expectedSlug: string
): void {
    const errors: string[] = [];

    if (metadata.slug !== expectedSlug) {
        errors.push(
            `metadata slug "${metadata.slug}" does not match folder slug "${expectedSlug}"`
        );
    }

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

function extractSolutionCode(solution: string): string {
    const lines = solution.split("\n");
    let startIndex = 0;

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

function generateMarkdown(
    metadata: ProblemFrontmatter,
    solution: string
): string {
    const frontmatter = `---
title: ${JSON.stringify(metadata.title)}
slug: ${JSON.stringify(metadata.slug)}
source: ${JSON.stringify(metadata.source)}
difficulty: ${JSON.stringify(metadata.difficulty)}
datePublished: ${JSON.stringify(metadata.datePublished)}
timeComplexity: ${JSON.stringify(metadata.timeComplexity)}
spaceComplexity: ${JSON.stringify(metadata.spaceComplexity)}
excerpt: ${JSON.stringify(metadata.excerpt)}
---`;

    const solutionCode = extractSolutionCode(solution);

    return `${frontmatter}

# Problem

[Write the problem statement in 2-4 concise lines.]

## Approach

[Explain your solution approach briefly.]

## Implementation

\`\`\`typescript
${solutionCode}
\`\`\`

## Complexity

- **Time ${metadata.timeComplexity}:** [add a one-line explanation]
- **Space ${metadata.spaceComplexity}:** [add a one-line explanation]
`;
}

async function publish(slug: string): Promise<void> {
    console.log(`Reading solution files for: ${slug}...`);

    try {
        const { metadata, solution } = await readSolutionFiles(slug);
        validateMetadata(metadata, slug);

        const markdownContent = generateMarkdown(metadata, solution);
        const contentDir = join(process.cwd(), "content", "problems");
        await mkdir(contentDir, { recursive: true });

        const markdownPath = join(contentDir, `${slug}.md`);
        await writeFile(markdownPath, markdownContent);

        console.log(`\nPublished: content/problems/${slug}.md`);
        console.log("\nNext steps:");
        console.log(`  1. Refine content/problems/${slug}.md`);
        console.log(`  2. Preview: http://localhost:3000/problems/${slug}`);
    } catch (error) {
        console.error(
            `\nError: ${error instanceof Error ? error.message : String(error)}`
        );
        process.exit(1);
    }
}

const slug = process.argv[2];

if (!slug) {
    console.error("Usage: bun run publish:problem <slug>");
    console.error("\nExample:");
    console.error("  bun run publish:problem two-sum");
    process.exit(1);
}

await publish(slug);
