---
name: performance
description: Measures and improves hamadeh.io performance, including page load, Core Web Vitals, bundle size, build time, and algorithm complexity, starting from a baseline. Use when the user mentions slow pages, performance, Lighthouse, Web Vitals (LCP, CLS, INP), bundle size, build time, or optimizing a hot path.
---

# Performance

## Workflow

1. **Baseline first.** Measure before changing anything:
    - Pages: `env bun run build`, then `env bun run start`, then a browser Lighthouse run or the browser tool's performance metrics against `http://localhost:3000`.
    - Bundle: the route size table printed by `next build`. The target is under 200KB initial JS (`docs/architecture.md`).
    - Algorithms: time and space complexity, plus the stress tests in `solution.test.ts`.
2. **Find the bottleneck.** Target the highest-impact hotspot. Usual suspects here:
    - Client components that could be Server Components.
    - Syntax highlighting languages loaded eagerly.
    - Images without `next/image` dimensions.
    - Fonts not loaded through `next/font`.
3. **Propose** the change with expected impact and tradeoffs, such as memory growth, cache invalidation, or readability cost. Avoid speculative micro-optimizations.
4. **Verify** with the same measurement as the baseline, and report before and after numbers.

## Style

- Keep changes incremental and reversible.
- Preserve readability and correctness. Only trade them away for a measured, meaningful win.
