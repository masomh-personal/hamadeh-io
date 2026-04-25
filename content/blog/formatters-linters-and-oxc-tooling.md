---
title: "Formatters, Linters, and Why Oxc Feels Like the Right Direction"
slug: "formatters-linters-and-oxc-tooling"
datePublished: "2026-04-17"
excerpt: "Formatters and linters reduce code review noise, catch real mistakes, and make teams faster. Oxfmt and Oxlint push that workflow toward simpler, faster defaults."
tags: ["engineering", "tooling", "typescript"]
---

Tooling is easy to dismiss until it is missing.

Nobody wants to spend a code review arguing about quote style, import order, line wrapping, or whether a React hook dependency looks suspicious. Those comments are low-value. They take attention away from the work that matters: correctness, behavior, readability, accessibility, and maintainability.

That is why formatters and linters matter.

A formatter makes code look consistent without asking every developer to hold the full style guide in their head. A linter catches patterns that are likely to be wrong, risky, or harder to maintain. Together, they turn a lot of subjective review feedback into fast, repeatable checks.

The goal is not to make the codebase feel controlled for its own sake. The goal is to remove friction so people can focus on better questions.

## Formatters Protect Attention

A good formatter is boring in the best way.

It should make the codebase feel like one person wrote it, even when many people did. It should handle the small choices automatically: indentation, wrapping, spacing, trailing commas, object layout, Markdown lists, JSON files, and CSS blocks.

That consistency pays off in a few practical ways:

- Reviews get smaller because style churn disappears.
- Diffs become easier to scan because formatting is predictable.
- New contributors move faster because the project decides style for them.
- Refactors are less noisy because the formatter normalizes the output.

Prettier became popular because it made this tradeoff clear. Stop debating formatting. Let the tool decide. That was, and still is, a valuable idea.

But formatter speed starts to matter once the formatter runs everywhere: on save, before commit, in CI, and across large Markdown or TypeScript-heavy projects. Slow tools teach people to skip checks. Fast tools disappear into the workflow.

That is where Oxfmt is interesting.

## Linters Catch Different Problems

Formatting answers, "Does this code look consistent?"

Linting answers, "Is this code suspicious?"

Those are different jobs. A linter should catch unused variables, unsafe patterns, missing React considerations, accessibility problems, import issues, and framework-specific mistakes. It should also give clear output so a developer can fix the issue without decoding a wall of configuration.

ESLint has been the default answer for a long time because its ecosystem is enormous. That ecosystem is still its biggest strength. If a project needs a niche plugin or a very specific custom rule setup, ESLint may still be the best fit.

The tradeoff is weight. ESLint setups can become large, slow, and dependency-heavy. That cost is not always a problem, but it is still a cost.

Oxlint takes a different path. It is built on the Oxc compiler stack and focuses on high-signal checks with a fast native implementation. The Oxc docs describe it as 50 to 100 times faster than ESLint in their benchmarks, with broad support for TypeScript, React, Jest, Vitest, import, Unicorn, and jsx-a11y style rules. It also supports type-aware linting and multi-file analysis for checks that need more project context.

That combination is compelling for a modern TypeScript app. You get fast feedback, useful defaults, and fewer moving parts.

## Why Oxfmt Stands Out

Oxfmt is the formatter side of the same ecosystem. It is built for the JavaScript and TypeScript world, but its file support is broad: JavaScript, TypeScript, JSX, TSX, JSON, YAML, TOML, HTML, CSS, Markdown, MDX, GraphQL, Vue, Angular, and more.

That matters because real projects are not just `.ts` files. A portfolio site like this one has React components, Markdown posts, JSON metadata, CSS, docs, config files, and CI files. One formatter that can cover most of that surface is easier to reason about than a stack of formatters and plugins.

The part I like most is that Oxfmt is trying to keep the migration story practical. It follows Prettier-style conventions closely, includes migration commands, and the docs say it passes Prettier's JavaScript and TypeScript conformance tests. That lowers the cost of switching because the goal is not to invent a new style. The goal is to keep the familiar style and make it faster.

Oxfmt also includes features that often require extra Prettier plugins:

- Import sorting.
- Tailwind CSS class sorting.
- `package.json` field sorting.
- Embedded formatting for things like CSS-in-JS and GraphQL.

Those are not flashy features, but they remove small pieces of toolchain glue. Fewer plugins means fewer version mismatches, fewer config files, and fewer security advisories from dependency trees that only exist to keep formatting working.

## Why Not Just Use Biome?

Biome is a good tool. It helped push the ecosystem toward faster formatting and simpler all-in-one defaults. For many projects, Biome is still a strong choice.

The reason Oxc feels like the better direction for this project is the shape of the tradeoff.

Oxfmt gives us fast, Prettier-compatible formatting across the files we care about. Oxlint gives us fast linting with React, accessibility, TypeScript, and Next.js checks. The two tools do not need a large ESLint tree. They also fit the way this project is already structured: Bun scripts, Husky hooks, GitHub Actions, and a small set of explicit quality gates.

Biome's all-in-one model is attractive, but Oxc's split model is clean too. Formatting and linting are separate jobs. Keeping them separate makes the scripts easy to read:

```bash
bun run format:check
bun run check
bun run type-check
bun test
```

That is not complicated. It is visible. It is easy to run locally and easy to mirror in CI.

## The Real Win Is Trust

The best tooling setup is the one developers trust enough to run often.

If formatting is fast, it can run on save. If linting is fast, it can run before every commit. If CI checks are clear, failures feel actionable instead of annoying. That creates a feedback loop where quality checks become part of the work instead of a separate ceremony at the end.

For this project, the tooling goal is simple:

- Format consistently with Oxfmt.
- Catch common mistakes with Oxlint.
- Use TypeScript for deeper type guarantees.
- Run tests for behavior.
- Audit dependencies before release.
- Build the app before merging to `main`.

No one tool owns quality. The system works because each tool has a clear job.

## Wrap Up

Formatters and linters are not about making code feel polished after the fact. They are about protecting engineering attention while the work is happening.

Prettier proved how valuable automatic formatting can be. Biome showed that faster, simpler tooling could change the developer experience. Oxfmt and Oxlint feel like the next practical step: familiar formatting, strong lint coverage, fast feedback, and less dependency weight.

That is why I like Oxc for this portfolio project. It keeps the workflow small, fast, and explicit. The checks are easy to run, easy to explain, and hard to ignore.

That is what good tooling should do.

## Sources

- [Oxfmt documentation](https://oxc.rs/docs/guide/usage/formatter.html)
- [Oxlint documentation](https://oxc.rs/docs/guide/usage/linter.html)
- [Oxfmt beta announcement](https://oxc.rs/blog/2026-02-24-oxfmt-beta.html)
