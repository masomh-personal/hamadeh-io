---
name: publish-problem
description: Turns a solved problem in solutions/<slug> into a finished post in content/problems, or refreshes an existing post after the solution changes, then validates and previews it. Use when the user asks to publish, finish, update, or write up a solved problem.
---

# Publish a Solved Problem

## Preconditions

- `solutions/<slug>/solution.ts` is implemented and `env bun test solutions/<slug>/solution.test.ts` passes.
- `metadata.json` has real `timeComplexity` and `spaceComplexity` values (not `O(?)`).

## Workflow

1. **Run `env bun run publish:problem <slug>`.** It is safe to run at any point:
    - No post yet: it builds `content/problems/<slug>.md` from the draft at `solutions/<slug>/problem.md` (or a template if there is no draft) and inserts the tested code under `## Implementation`.
    - Post exists: it refreshes only the frontmatter (from `metadata.json`) and the implementation code block (from `solution.ts`). Authored sections stay as they are.
    - Never pass `--force` without explicit approval. It rebuilds the post from the draft or template and discards edits made in the post.
2. **Delete the draft** `solutions/<slug>/problem.md` after a first publish. The post is now the source of truth.
3. **Finish the write-up** in the post. Match the section order of existing posts (see `content/problems/product-of-array-except-self.md`):
    - `# Problem`, `## Constraints`, `## Examples`
    - `## Approach`: keep the author's reasoning if `solve-problem` already wrote it
    - `## Implementation`: prose around the code block is fine; the script only replaces the block itself
    - `## Complexity`: one line explaining each bound, matching the frontmatter
    - `## Edge Cases Checklist`, `## Test Coverage` (what the suite actually covers), `## Source`
4. **Follow the voice rules** in `.cursor/rules/blog-writing-consistency.mdc`. No em dashes. Keep the excerpt specific and under 200 characters; edit it in `metadata.json`, because publishing overwrites the post's frontmatter.
5. **Validate.** Run `env bun run content:check`. It fails if the post's code has drifted from `solution.ts`; rerun the publish command to fix that.
6. **Preview.** Start `env bun run dev` in the background, open `http://localhost:3000/problems/<slug>` with the browser tool, and check that the page renders, code is highlighted, and nothing overflows on a narrow viewport.
