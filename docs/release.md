# Release Workflow

Use this checklist when moving work from `develop` to `main`.

## Branch Flow

1. Do feature and cleanup work on `develop` or a short-lived branch based on `develop`.
2. Push changes to `develop`.
3. Open a pull request from `develop` to `main`.
4. Merge only after local checks and GitHub Actions are green.
5. Let Vercel promote the merged `main` commit to production.

## Local Pre-PR Checklist

Run these before opening or updating the PR:

```bash
bun audit
bun run healthcheck
bun run build
```

The checks cover:

- `bun audit`: verifies the lockfile has no known dependency advisories.
- `bun run healthcheck`: runs Oxfmt format checking, TypeScript, Oxlint, and tests.
- `bun run build`: verifies the production Next.js build and static generation.

## PR Checklist

Use this as the pull request checklist:

- [ ] Scope is clear and limited to the intended change.
- [ ] `bun audit` passes with no vulnerabilities.
- [ ] `bun run healthcheck` passes locally.
- [ ] `bun run build` passes locally.
- [ ] GitHub Actions are green.
- [ ] Content changes were previewed in the browser when they affect pages, blog posts, or problem posts.
- [ ] Dependency overrides are explained and treated as temporary security pins.
- [ ] No generated build artifacts are committed.

## Dependency Notes

Keep dependency updates small and easy to review. If an override is needed for a transitive
security advisory, document why it exists and remove it once upstream dependencies no longer need
it.

The current quality gate intentionally avoids extra permanent tooling unless it pays for itself.
Use one-off checks like `bunx knip` for cleanup investigations before adding new dev dependencies.
