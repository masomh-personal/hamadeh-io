---
name: scaffold-problem
description: Scaffolds a coding challenge (LeetCode or any URL) into solutions/<slug> with metadata, a stub solution, a real bun:test suite, and an unpublished problem draft, without solving it. Use when the user shares a problem URL and asks to scaffold, set up, or add a problem.
---

# Scaffold a Coding Problem

Do not solve the problem. Solving is the `solve-problem` skill, and only when asked.

## Output

For slug `<slug>`, create all four inside `solutions/<slug>/`:

- `metadata.json`
- `solution.ts`
- `solution.test.ts`
- `problem.md` (the unpublished draft of the post)

Do not create `content/problems/<slug>.md`. Everything in that folder is published, and `content:check` requires it to contain the tested solution verbatim, so a stub there breaks `healthcheck` and the pre-push hook. The `publish-problem` skill builds the post from the draft.

## Workflow

1. **Generate the workspace.**
    - LeetCode URL or slug: run `env bun run new:problem <url>`. It fetches the problem and writes `metadata.json`, `solution.ts`, and `solution.test.ts`.
    - Any other source, or if the fetch fails: create those files by hand, mirroring an existing folder such as `solutions/product-of-array-except-self/`.
2. **Fix `metadata.json`.** Fields must satisfy `ProblemFrontmatterSchema` in `lib/schemas.ts`: `title`, `slug`, `source` (`leetcode` | `dsa` | `custom`), `difficulty` (`easy` | `medium` | `hard`), `datePublished` (`YYYY-MM-DD`), `timeComplexity`, `spaceComplexity`, `excerpt` (200 chars max). The generated excerpt is truncated problem text; rewrite it as one clear sentence. Leave complexity as `O(?)` until solved.
3. **Stub `solution.ts`.** Keep the header comment (title, difficulty, topics). Export the function or class with its final name and signature, a `// TODO` and a defensive placeholder such as `throw new Error("Not implemented")`. No algorithm.
4. **Write `solution.test.ts`.** The generator's test file uses a placeholder import name and `expect(true)`. Replace all of it:
    - Import the real export name.
    - `describe` groups: `Basics` (every official example), `Edge Cases`, `Stress Tests` (a deterministic larger input with a known answer).
    - At least one defensive contract test, such as input non-mutation when relevant.
    - Real expected values, no `test.todo`. Follow the `expected` / `result` / `expect(result)` pattern from the testing rule.
5. **Write the draft `problem.md`.** No frontmatter; `publish:problem` adds it from `metadata.json`. Sections, matching existing posts:
    - `# Problem`, `## Constraints`, `## Examples`
    - `## Approach`: TODO stub
    - `## Implementation`: TODO stub (publishing replaces it with the tested code)
    - `## Complexity`: TODO stub
    - `## Edge Cases Checklist`, `## Test Coverage` (the plan), `## Source` (link)
    - Follow `.cursor/rules/blog-writing-consistency.mdc`. No em dashes.
6. **Verify.**
    - `env bun test solutions/<slug>/solution.test.ts` should fail only because of the placeholder, not because of import or syntax errors.
    - `env bun run type-check:tests` passes.

## Review checklist

- Slug matches across the folder and metadata.
- The export name matches the test import.
- No solution logic slipped in.
- No em dashes in the draft.
