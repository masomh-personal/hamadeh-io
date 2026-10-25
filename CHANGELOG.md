# Changelog

Notable changes to hamadeh.io are documented here by release.

## 3.9.1 - 2026-10-25

### Changed

- Documented that every merge to `main` ends with a `vX.Y.Z` tag on the merge commit and a GitHub release marked Latest, with the exact commands in the `release` skill and a matching step and checklist item in `docs/release.md`.

## 3.9.0 - 2026-10-25

### Added

- Posts and problems now show a calculated reading time, estimated from the Markdown body with code blocks weighted separately from prose, so nothing has to be written by hand.

### Changed

- Removed post dates everywhere: the frontmatter fields, the cards and headers, the RSS feed, the sitemap, and the structured data. Blog and problem lists now sort alphabetically by title.
- Redesigned the blog list with a sticky topic sidebar that shows a count per tag, collapsing into a scrolling row of pills on small screens, and paginated it 12 posts per page with the existing pagination component. The selected topic and page live in the URL, so filtered views are shareable and `/blog` stays statically generated.
- Refreshed React to 19.3.1, the Radix slot and tabs primitives, Oxlint to 1.89, PostCSS to 8.5.31, and the Bun and Node type packages.
- Gave Code Problems the same treatment: difficulty pills tinted with the LeetCode colors and a count per level, 12 problems per page with the existing pagination component, and the selection kept in the URL so `/problems` stays statically generated.
- Renamed the Engage team to Commerce on the home and About pages.
- Simplified the post and problem cards by dropping the divider lines and call-to-action row and clamping excerpts to three lines.
- Replaced the Markdown reading time regex with a single-pass line scanner that also handles indented and unclosed code fences.

### Fixed

- Open Graph chips on problem cards no longer share a React key when time and space complexity match, and card actions no longer key on their list position.

### Security

- Upgraded Next.js to 16.4.3, which resolves the advisories open against 16.3.6, including two critical remote code execution issues in image optimization and `use cache`, a denial of service in Server Actions, and several cache poisoning and information disclosure issues.
- Updated `source-map-js` to 1.2.2 for an event-loop denial of service advisory.
- Added a temporary `postcss-selector-parser` override to `^7.1.6`. `@tailwindcss/typography` 0.5.20, already the latest release, pins the vulnerable 6.0.10 exactly. The compiled CSS is byte-for-byte identical with the override. Remove it once typography ships a patched range.

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
