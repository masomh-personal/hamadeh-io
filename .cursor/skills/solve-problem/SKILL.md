---
name: solve-problem
description: Implements a scaffolded coding problem from the author's own approach (pseudocode, a spoken explanation, or partial code), verifies it against the existing tests, and records complexity and reasoning. Use when the user asks to solve or implement a problem in solutions/, shares pseudocode or their thought process for one, or asks to turn their approach into code.
---

# Solve a Problem From the Author's Approach

The author's thinking leads; you implement it. The goal is working code that reflects how they reasoned, not your preferred algorithm.

## 1. Get the approach

- Accept pseudocode, a plain-language explanation, or a partial `solutions/<slug>/solution.ts`.
- If no approach is given, ask for one, or ask permission to propose your own. Do not jump to a solution.
- If `solutions/<slug>/` does not exist, run the `scaffold-problem` skill first.

## 2. Check before coding

- Restate the approach in a few lines so the author can confirm you understood it.
- Name any flaw, missed edge case, or complexity problem directly.
- Never silently swap in a different algorithm. If a meaningfully better approach exists, describe it briefly and ask which to implement.

## 3. Implement

- Write `solutions/<slug>/solution.ts` following the author's approach.
- Match the existing file style (see `solutions/lru-cache/solution.ts`):

```typescript
/**
 * <Title>
 * Difficulty: <Easy | Medium | Hard>
 * Topics: <Topic, Topic>
 *
 * Time: O(...)
 * Space: O(...)
 *
 * <One or two lines summarizing the approach.>
 */
export function name(...): ... {
```

- Keep the export name and signature the tests import. Readable names over clever tricks; `readonly` inputs where the function should not mutate.

## 4. Verify

- Run `env bun test solutions/<slug>/solution.test.ts`.
- The existing tests are the spec. If a test looks wrong, flag it and ask; never edit a test just to make it pass.
- Add tests for edge cases the approach exposed that the suite misses.
- Run `env bun run type-check:tests`.

## 5. Record

- Set `timeComplexity` and `spaceComplexity` in `metadata.json` (Big O format, for example `O(n log n)`).
- Fill `## Approach` and `## Complexity` from the author's reasoning, cleaned up in the voice from `.cursor/rules/blog-writing-consistency.mdc`. It stays their thought process, not yours. Write them in the draft `solutions/<slug>/problem.md`, or in `content/problems/<slug>.md` if the problem is already published.
- Do not copy code into the draft; publishing inserts the tested code.
- If the problem is already published, run `env bun run publish:problem <slug>` so the post's code block matches the new solution.
- Otherwise offer to run the `publish-problem` skill.
