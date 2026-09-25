# Agent Setup

How the Cursor agent is configured for this repo. Everything lives in `.cursor/` and is picked automatically from the prompt and the files in context, so there is nothing to `@`-mention for routine work.

## How routing works

- **Rules** (`.cursor/rules/*.mdc`) are constraints. They are either always included or attached when matching files are in context.
- **Skills** (`.cursor/skills/<name>/SKILL.md`) are step-by-step workflows. The agent loads one when the request matches its description. You can also force one with `/name`.
- **Subagents** (`.cursor/agents/*.md`) run in a separate readonly context and return only their findings. The agent delegates to them when the request matches their description, or you can ask by name.
- **Hooks** (`.cursor/hooks.json`) run code on agent events and can block actions deterministically.

## Rules

| Rule                       | Loads                             | Covers                                                                            |
| -------------------------- | --------------------------------- | --------------------------------------------------------------------------------- |
| `core-standards`           | Always                            | Engineering defaults, Bun and `env bun`, repo hygiene, versioning, no attribution |
| `solid-principles`         | Always                            | Pragmatic SOLID guidance                                                          |
| `typescript-react-next`    | `*.ts`, `*.tsx`                   | Typing, Server Components, App Router                                             |
| `styling-tailwind`         | `app/`, `components/` TSX and CSS | Tokens, `cn`, mobile-first                                                        |
| `ui-library-policy`        | `components/ui`, `app/components` | Wrapper-first components and the showcase                                         |
| `testing-strategy`         | `*.test.ts(x)`                    | Suite structure and `expected` / `result` assertions                              |
| `blog-writing-consistency` | `content/**/*.md`                 | Voice, structure, and punctuation for posts                                       |

## Skills

| Request                                             | Skill                    |
| --------------------------------------------------- | ------------------------ |
| Share a problem URL to set up                       | `scaffold-problem`       |
| Solve a problem from your pseudocode or explanation | `solve-problem`          |
| Finish and publish a problem write-up               | `publish-problem`        |
| Write a blog post                                   | `new-blog-post`          |
| Add or change a reusable UI component               | `add-ui-component`       |
| Plan a feature, refactor, or migration              | `architecture-planning`  |
| Investigate slow pages, bundle size, or Web Vitals  | `performance`            |
| Update dependencies or handle Dependabot            | `dependency-maintenance` |
| Cut a release to `main`                             | `release`                |
| Write a PR title and description                    | `pr-description`         |

The problem workflow chains: `scaffold-problem`, then `solve-problem`, then `publish-problem`. Scaffolding never solves.

## Subagents

- `reviewer`: reviews the branch against `origin/main` for bugs, regressions, test gaps, and release hygiene.
- `security-auditor`: reviews Markdown rendering, schema boundaries, dependencies and overrides, and environment variables.

Both are readonly and inherit the parent model.

## Hooks

- `beforeShellExecution` runs `scripts/hooks/require-env-bun.ts` and denies agent commands that launch `bun` or `bunx` without `env`. The reason is in the Tooling section of `core-standards`. Remove the hook and that rule together once Bun stops trusting `argv[0]` for its shims.

## Maintaining this setup

- Add a rule only after the agent repeats the same mistake. Keep rules short and point to `docs/` instead of copying them.
- Put multi-step procedures in skills, not rules.
- Write descriptions with the words you actually type, since descriptions drive automatic selection.
- Update this file when rules, skills, subagents, or hooks change.
