#!/usr/bin/env bun

/**
 * Problem publisher
 *
 * Publishes a completed local solution to content/problems/<slug>.md.
 *
 * - No post yet: builds one from the unpublished draft at
 *   solutions/<slug>/problem.md when it exists, otherwise from a template.
 * - Post exists: refreshes only its frontmatter (from metadata.json) and the
 *   implementation code block (from solution.ts). Authored sections are kept.
 * - --force: rebuilds the post from the draft or template, discarding edits.
 *
 * Usage:
 *   bun run publish:problem two-sum
 *   bun run publish:problem two-sum --force
 */

import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import {
    generateProblemMarkdown,
    syncProblemMarkdown,
} from "@/lib/problem-markdown";
import {
    type ProblemFrontmatter,
    validateProblemFrontmatter,
} from "@/lib/schemas";

async function readSolutionFiles(slug: string): Promise<{
    metadata: ProblemFrontmatter;
    solution: string;
    draft: string | undefined;
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
    const draftPath = join(solutionDir, "problem.md");
    const draft = existsSync(draftPath)
        ? await readFile(draftPath, "utf-8")
        : undefined;

    return { metadata, solution, draft };
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

async function publish(slug: string, force: boolean): Promise<void> {
    console.log(`Reading solution files for: ${slug}...`);

    try {
        const { metadata, solution, draft } = await readSolutionFiles(slug);
        validateMetadata(metadata, slug);

        const contentDir = join(process.cwd(), "content", "problems");
        const markdownPath = join(contentDir, `${slug}.md`);

        if (existsSync(markdownPath) && !force) {
            const existing = await readFile(markdownPath, "utf-8");
            await writeFile(
                markdownPath,
                syncProblemMarkdown(existing, metadata, solution)
            );

            console.log(
                `\nUpdated frontmatter and implementation in content/problems/${slug}.md`
            );
            console.log("Authored sections were left unchanged.");
            return;
        }

        await mkdir(contentDir, { recursive: true });
        await writeFile(
            markdownPath,
            generateProblemMarkdown(metadata, solution, draft)
        );

        console.log(`\nPublished: content/problems/${slug}.md`);
        console.log("\nNext steps:");

        if (draft !== undefined) {
            console.log(
                `  1. Delete solutions/${slug}/problem.md; the post is now the source of truth`
            );
        } else {
            console.log(`  1. Refine content/problems/${slug}.md`);
        }

        console.log(`  2. Preview: http://localhost:3000/problems/${slug}`);
    } catch (error) {
        console.error(
            `\nError: ${error instanceof Error ? error.message : String(error)}`
        );
        process.exit(1);
    }
}

const args = process.argv.slice(2);
const force = args.includes("--force");
const slug = args.find((arg) => !arg.startsWith("--"));

if (!slug) {
    console.error("Usage: bun run publish:problem <slug> [--force]");
    console.error("\nExample:");
    console.error("  bun run publish:problem two-sum");
    process.exit(1);
}

await publish(slug, force);
