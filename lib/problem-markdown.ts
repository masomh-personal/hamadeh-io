/**
 * Builds and updates published problem posts from a solution workspace.
 *
 * `metadata.json` owns the frontmatter and `solution.ts` owns the code block.
 * Everything else in a post (statement, approach, analysis) is authored by
 * hand, so updates touch only those two regions.
 */

import type { ProblemFrontmatter } from "./schemas";
import { stripSolutionHeaderComment } from "./solution-code";

const FRONTMATTER = /^---\r?\n[\s\S]*?\r?\n---[ \t]*(?:\r?\n|$)/;
const IMPLEMENTATION_HEADING = /^## Implementation[ \t]*$/m;
const COMPLEXITY_HEADING = /^## Complexity[ \t]*$/m;
const NEXT_SECTION = /^## /m;
const TYPESCRIPT_FENCE = /^```(?:typescript|ts)[ \t]*\r?\n[\s\S]*?^```[ \t]*$/m;

export function renderProblemFrontmatter(metadata: ProblemFrontmatter): string {
    return `---
title: ${JSON.stringify(metadata.title)}
slug: ${JSON.stringify(metadata.slug)}
source: ${JSON.stringify(metadata.source)}
difficulty: ${JSON.stringify(metadata.difficulty)}
datePublished: ${JSON.stringify(metadata.datePublished)}
timeComplexity: ${JSON.stringify(metadata.timeComplexity)}
spaceComplexity: ${JSON.stringify(metadata.spaceComplexity)}
excerpt: ${JSON.stringify(metadata.excerpt)}
---
`;
}

function renderFence(solutionSource: string): string {
    return `\`\`\`typescript\n${stripSolutionHeaderComment(solutionSource)}\n\`\`\``;
}

/**
 * Puts the tested code in the post's `## Implementation` section.
 *
 * An existing TypeScript fence in that section is replaced and the prose around
 * it is kept. A section without a fence is a scaffold stub, so its body is
 * replaced. A missing section is inserted before `## Complexity`, or appended.
 */
export function withImplementation(
    markdown: string,
    solutionSource: string
): string {
    const fence = renderFence(solutionSource);
    const heading = IMPLEMENTATION_HEADING.exec(markdown);

    if (!heading) {
        const section = `## Implementation\n\n${fence}\n\n`;
        const complexity = COMPLEXITY_HEADING.exec(markdown);

        if (complexity) {
            return (
                markdown.slice(0, complexity.index) +
                section +
                markdown.slice(complexity.index)
            );
        }

        return `${markdown.trimEnd()}\n\n${section.trimEnd()}\n`;
    }

    const bodyStart = heading.index + heading[0].length;
    const nextSection = NEXT_SECTION.exec(markdown.slice(bodyStart));
    const bodyEnd = nextSection
        ? bodyStart + nextSection.index
        : markdown.length;
    const body = markdown.slice(bodyStart, bodyEnd);
    const existingFence = TYPESCRIPT_FENCE.exec(body);

    const updatedBody = existingFence
        ? body.slice(0, existingFence.index) +
          fence +
          body.slice(existingFence.index + existingFence[0].length)
        : `\n\n${fence}\n${nextSection ? "\n" : ""}`;

    return markdown.slice(0, bodyStart) + updatedBody + markdown.slice(bodyEnd);
}

/**
 * Creates a new post. A draft (`solutions/<slug>/problem.md`) supplies the
 * authored sections; without one, a minimal template is used.
 */
export function generateProblemMarkdown(
    metadata: ProblemFrontmatter,
    solutionSource: string,
    draft?: string
): string {
    const frontmatter = renderProblemFrontmatter(metadata);

    if (draft !== undefined && draft.trim() !== "") {
        const draftBody = draft.replace(FRONTMATTER, "").trim();
        return withImplementation(
            `${frontmatter}\n${draftBody}\n`,
            solutionSource
        );
    }

    return `${frontmatter}
# Problem

[Write the problem statement in 2-4 concise lines.]

## Approach

[Explain your solution approach briefly.]

## Implementation

${renderFence(solutionSource)}

## Complexity

- **Time ${metadata.timeComplexity}:** [add a one-line explanation]
- **Space ${metadata.spaceComplexity}:** [add a one-line explanation]
`;
}

/**
 * Refreshes an existing post's frontmatter and implementation from the
 * workspace while leaving every authored section untouched.
 */
export function syncProblemMarkdown(
    existing: string,
    metadata: ProblemFrontmatter,
    solutionSource: string
): string {
    const frontmatter = FRONTMATTER.exec(existing);

    if (!frontmatter) {
        throw new Error("Post has no frontmatter block to update");
    }

    const body = existing.slice(frontmatter[0].length);

    return withImplementation(
        renderProblemFrontmatter(metadata) + body,
        solutionSource
    );
}
