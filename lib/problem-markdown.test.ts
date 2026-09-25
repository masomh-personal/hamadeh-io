import { describe, expect, test } from "bun:test";
import {
    generateProblemMarkdown,
    renderProblemFrontmatter,
    syncProblemMarkdown,
} from "./problem-markdown";
import type { ProblemFrontmatter } from "./schemas";
import { findTypeScriptFences } from "./solution-code";

const metadata: ProblemFrontmatter = {
    title: "Two Sum",
    slug: "two-sum",
    source: "leetcode",
    difficulty: "easy",
    datePublished: "2026-09-24",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    excerpt: "Find two indices whose values add up to a target.",
};

const solution = `/**
 * Two Sum
 * Difficulty: Easy
 */
export function twoSum(): number[] {
    return [0, 1];
}`;

const testedCode = `export function twoSum(): number[] {
    return [0, 1];
}`;

describe("renderProblemFrontmatter", () => {
    test("renders every metadata field as a quoted value", () => {
        const expected = `---
title: "Two Sum"
slug: "two-sum"
source: "leetcode"
difficulty: "easy"
datePublished: "2026-09-24"
timeComplexity: "O(n)"
spaceComplexity: "O(n)"
excerpt: "Find two indices whose values add up to a target."
---
`;
        const result = renderProblemFrontmatter(metadata);

        expect(result).toBe(expected);
    });
});

describe("generateProblemMarkdown", () => {
    describe("Basics", () => {
        test("uses the template and the tested code without a draft", () => {
            const expected = [testedCode];
            const result = findTypeScriptFences(
                generateProblemMarkdown(metadata, solution)
            );

            expect(result).toEqual(expected);
        });

        test("keeps authored draft sections and fills the stub implementation", () => {
            const draft = `# Problem

Return two indices.

## Implementation

TODO: not implemented yet.

## Complexity

- **Time O(n):** One pass.
`;
            const expected = `${renderProblemFrontmatter(metadata)}
# Problem

Return two indices.

## Implementation

\`\`\`typescript
${testedCode}
\`\`\`

## Complexity

- **Time O(n):** One pass.
`;
            const result = generateProblemMarkdown(metadata, solution, draft);

            expect(result).toBe(expected);
        });
    });

    describe("Edge Cases", () => {
        test("inserts a missing implementation section before complexity", () => {
            const draft = "# Problem\n\nText.\n\n## Complexity\n\nLinear.\n";
            const expected = `${renderProblemFrontmatter(metadata)}
# Problem

Text.

## Implementation

\`\`\`typescript
${testedCode}
\`\`\`

## Complexity

Linear.
`;
            const result = generateProblemMarkdown(metadata, solution, draft);

            expect(result).toBe(expected);
        });

        test("appends an implementation section when the draft has neither heading", () => {
            const draft = "# Problem\n\nText.\n";
            const expected = `${renderProblemFrontmatter(metadata)}
# Problem

Text.

## Implementation

\`\`\`typescript
${testedCode}
\`\`\`
`;
            const result = generateProblemMarkdown(metadata, solution, draft);

            expect(result).toBe(expected);
        });

        test("treats a blank draft like no draft", () => {
            const expected = generateProblemMarkdown(metadata, solution);
            const result = generateProblemMarkdown(metadata, solution, "  \n");

            expect(result).toBe(expected);
        });
    });
});

describe("syncProblemMarkdown", () => {
    const existing = `---
title: "Old Title"
slug: "two-sum"
source: "leetcode"
difficulty: "easy"
datePublished: "2026-01-01"
timeComplexity: "O(n^2)"
spaceComplexity: "O(1)"
excerpt: "Old excerpt."
---

# Problem

Authored statement.

## Implementation

\`\`\`typescript
export function twoSum(): number[] {
    return [];
}
\`\`\`

Prose explaining the code.

## Complexity

- **Time O(n):** Authored analysis.
`;

    describe("Basics", () => {
        test("replaces frontmatter and code while keeping authored sections", () => {
            const expected = `${renderProblemFrontmatter(metadata)}
# Problem

Authored statement.

## Implementation

\`\`\`typescript
${testedCode}
\`\`\`

Prose explaining the code.

## Complexity

- **Time O(n):** Authored analysis.
`;
            const result = syncProblemMarkdown(existing, metadata, solution);

            expect(result).toBe(expected);
        });

        test("is idempotent", () => {
            const expected = syncProblemMarkdown(existing, metadata, solution);
            const result = syncProblemMarkdown(expected, metadata, solution);

            expect(result).toBe(expected);
        });
    });

    describe("Edge Cases", () => {
        test("keeps extra fences outside the implementation section", () => {
            const post = existing.replace(
                "Authored statement.",
                "Authored statement.\n\n```typescript\nconst naive = 1;\n```"
            );
            const expected = ["const naive = 1;", testedCode];
            const result = findTypeScriptFences(
                syncProblemMarkdown(post, metadata, solution)
            );

            expect(result).toEqual(expected);
        });

        test("preserves replacement-pattern characters in code", () => {
            const source = "export const pattern = `$& $1 $$`;";
            const expected = [source];
            const result = findTypeScriptFences(
                syncProblemMarkdown(existing, metadata, source)
            );

            expect(result).toEqual(expected);
        });

        test("throws when the post has no frontmatter", () => {
            const expected = "Post has no frontmatter block to update";
            const result = () =>
                syncProblemMarkdown("# Problem\n", metadata, solution);

            expect(result).toThrow(expected);
        });
    });
});
