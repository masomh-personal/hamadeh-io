# Changelog

Notable changes to hamadeh.io are documented here by release.

## 3.8.0 - 2026-09-28

### Added

- Added Validate Binary Search Tree as a Medium problem solved two ways, a bottom-up recursive range check and a top-down iterative DFS with an explicit stack of bounds, with every test run against both.
- Published a post on recursion versus iteration on trees and what the call stack is really holding for you.

### Changed

- Refreshed Next.js to 16.3.6, React to 19.3.0, Valibot to 1.5.0, Tailwind Merge to 3.7.0, Oxlint to 1.85, Oxfmt to 0.70, and the type packages, and moved the Bun pin to 1.4.2.
- Enabled typed routes, so links are checked against real routes during CI type-checking.
- Brought the architecture, styling, and color docs back in line with the code.
- Turned off the `AGENTS.md` and `CLAUDE.md` files `next dev` now generates for AI agents, since agent guidance already lives in the Cursor rules and `docs/agent-setup.md`.

### Fixed

- The About, Blog, and Code Problems pages now share their own title, description, and URL on social cards instead of the homepage's.
- The 404 page renders on the server with its own title and no longer points its canonical tag at the homepage, and unknown post and problem slugs return 404 at routing.
- Resolved two React warnings raised by the new Oxlint release, including a ref written during render on the blog list.

### Security

- Added a same-origin Content Security Policy header to every response.
- Removed the PostCSS and Sharp overrides now that upstream ranges resolve versions with no known advisories.

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
