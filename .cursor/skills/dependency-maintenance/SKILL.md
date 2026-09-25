---
name: dependency-maintenance
description: Runs routine dependency maintenance for hamadeh.io with Bun, covering outdated packages, Dependabot PRs, security advisories, and override pins, then verifies and records the changes. Use when the user asks to update, refresh, or upgrade dependencies, handle Dependabot PRs, fix a bun audit advisory, or review package overrides.
---

# Dependency Maintenance

Dependabot opens grouped weekly PRs (`bun-minor-and-patch`, `bun-major`, `github-actions-all`); see `.github/dependabot.yml`. This skill covers those PRs and manual refreshes.

## Workflow

1. **Survey.**
    - `env bun outdated`
    - `env bun audit`
    - `gh pr list --label dependencies` for open Dependabot PRs
2. **Minor and patch updates:** apply them as one batch with `env bun update`, and keep `package.json` ranges as caret ranges.
3. **Major updates:** handle one package at a time.
    - Read the changelog or migration guide first.
    - For Next.js, use the `next-upgrade` skill.
    - For TypeScript, check `docs/typescript-conventions.md`, which covers TypeScript 7 compatibility notes.
    - For Oxlint and Oxfmt, run `env bun run check` and `env bun run format:check` and review any new diagnostics rather than blanket-fixing them.
4. **Review overrides.** `package.json` pins `postcss` and `sharp` as temporary security overrides.
    - For each one, run `env bun why <pkg>` to see whether upstream dependencies now resolve a patched version on their own.
    - Remove any override that is no longer needed. Keep the ones that are, and record why in the changelog.
5. **Keep the toolchain aligned.** If Bun itself changes, update `packageManager` and `engines.bun` together. CI reads `packageManager`, and `scripts/ensure-bun.ts` enforces both.
6. **Verify.**
    - `env bun install --frozen-lockfile` succeeds.
    - `env bun audit`
    - `env bun run healthcheck`
    - `env bun run build`
7. **Record** the changes in `CHANGELOG.md` under `### Changed` or `### Security`, naming the notable packages and versions. Use the `release` skill for the version bump.

## Guardrails

- Do not add new dependencies as part of maintenance.
- Never delete `bun.lock` to "fix" a resolution. Investigate with `env bun why` instead.
- Stop for approval before committing, pushing, or merging Dependabot PRs.
