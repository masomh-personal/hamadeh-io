---
name: release
description: Prepares a hamadeh.io release to main by choosing the SemVer bump, updating package.json and CHANGELOG.md, running audit, healthcheck, and build, and preparing the release branch and PR. Use when the user asks to cut, prepare, or ship a release, bump the version, or merge work into main.
---

# Release to main

The full checklist lives in `docs/release.md`. This skill is the agent workflow for it.

## Workflow

1. **Scope the release.**
    - `git fetch origin main`, then `git log origin/main..HEAD --oneline` and `git status`.
    - Read the current version with `git show origin/main:package.json`.
2. **Choose the bump**, once per release:
    - Patch: backward-compatible fixes, dependency refreshes, docs or tooling only.
    - Minor: new posts, problems, or features.
    - Major: breaking changes or an explicitly declared major release.
    - If the branch already bumped `package.json` above `main`, do not bump again.
3. **Update files.**
    - Set `version` in `package.json`.
    - Add a `CHANGELOG.md` entry at the top: `## x.y.z - YYYY-MM-DD`, with `### Added`, `### Changed`, `### Fixed`, or `### Security` subsections as needed. Match the tone of existing entries: one sentence per user-visible change, no commit hashes.
4. **Verify.** Run all three and stop on any failure:
    - `env bun audit`
    - `env bun run healthcheck`
    - `env bun run build`
5. **Branch.** If on `main`, propose `git switch -c release/x.y.z`.
6. **Hand off.** Use the `pr-description` skill for the PR title and body.
7. **Stop for approval** before `git commit`, `git push`, or `gh pr create`. Commit messages follow `chore: release version x.y.z` and never include attribution trailers.

## After merge

Vercel promotes the merged `main` commit to production. Remind the user to confirm the production deployment if the release changed pages or content.
