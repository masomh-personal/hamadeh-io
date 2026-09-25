# Changelog

Notable changes to hamadeh.io are documented here by release.

## 3.7.1 - 2026-09-24

### Changed

- Reorganized the Cursor agent setup around current Cursor features: two always-on rules, file-scoped rules that point to the detailed docs, on-demand skills for problem, blog, UI component, dependency, and release workflows, and readonly reviewer and security subagents.
- Replaced the persona playbook with `docs/agent-setup.md`, a map of which rule, skill, subagent, or hook handles each kind of request.

### Added

- Added a Cursor `beforeShellExecution` hook that denies agent commands running bare `bun`, preventing the editor from corrupting Bun's shared shims.

### Fixed

- `publish:problem` now refreshes an existing post's frontmatter and code block in place instead of refusing, and builds new posts from an unpublished `solutions/<slug>/problem.md` draft. Scaffolding no longer creates a stub post that fails `content:check`.
- Fixed the writing rule that banned hyphens instead of em dashes, and retargeted PR guidance from a nonexistent `develop` branch to release branches merged into `main`.

## 3.7.0 - 2026-09-05

### Added

- Published the final SOLID part on when applying the principles makes code worse and how to tell earned abstraction from abstraction tax.
- Added a constant-time LRU cache built on a map and a sentinel-bounded doubly linked list, with eviction-order tests and a Medium problem post.

### Changed

- Refreshed Next.js, Oxlint, PostCSS, and type packages, moved Oxfmt to 0.66, and realigned the PostCSS override pin with its dependency range.
- Updated the CI workflow to `actions/checkout` v7 and `actions/cache` v6.

## 3.6.0 - 2026-08-30

### Added

- Published a practical guide to choosing classes for objects with identity, evolving state, and protected invariants.
- Added a from-scratch `AllOne` frequency tracker with average `O(1)` operations, comprehensive tests, and a Hard problem post.

## 3.5.1 - 2026-08-30

### Security

- Upgraded Next.js to 16.3.3 to patch two critical unauthenticated remote code execution vulnerabilities affecting AVIF image optimization and Windows-hosted servers.

### Changed

- Updated Node and React DOM types, Oxfmt, Oxlint, Sharp, and browser compatibility data to their current stable releases.

## 3.5.0 - 2026-08-22

### Added

- Published a practical dependency-security article covering advisory audits, transitive risk, lifecycle scripts, and residual risk.
- Added a tested `O(n)` solution and problem post for Product of Array Except Self.
- Added distinct presentation colors for every blog tag currently in use.

### Changed

- Upgraded Bun to 1.4.0 and refreshed all direct dependencies to their current stable releases.
- Consolidated local checks and Next.js production builds on TypeScript 7.
- Increased blog-tag background opacity and derived backgrounds from each tag color for consistent contrast.
- Updated runtime, TypeScript, and release documentation for the current toolchain.

### Security

- Removed the high-severity `js-yaml` and `nanoid` advisories from the locked dependency graph.
- Verified the lockfile with Bun's advisory audit and blocked dependency-script report.
