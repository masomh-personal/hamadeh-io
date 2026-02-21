# ThoughtfulCode

A modern, performance-focused portfolio website showcasing software engineering skills, LeetCode solutions, algorithms, data structures, and technical writing.

**Core Philosophy:** Clarity over cleverness. Every decision demonstrates maintainable, thoughtful code that future engineers can easily understand and extend.

---

## Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Framework** | Next.js 16 (App Router) | Production-ready, excellent docs, perfect for SSG + SEO, React 19 support |
| **React** | React 19 | Server Components, enhanced performance, required for Next.js 16 |
| **Language** | TypeScript | Type safety, best practice, portfolio showcase |
| **Styling** | Tailwind CSS | Utility-first, fast development, great with Next.js |
| **Content** | MDX (@next/mdx) | Markdown + React components, version controlled |
| **Syntax Highlighting** | rehype-pretty-code + Shiki | Editor-grade code blocks for technical content |
| **Frontmatter Parsing** | gray-matter | Extract metadata from MDX files |
| **Frontmatter Validation** | Valibot | Lightweight schema validation (~1KB vs Zod's ~14KB), better performance |
| **Linting & Formatting** | Biome | All-in-one tool (replaces ESLint + Prettier), 25x faster, zero config |
| **Runtime** | Bun v1.3.x | Fast installs, built-in test runner, instant TypeScript, production-ready |
| **BaaS (Phase 2)** | Appwrite | Open source, all-in-one, no lock-in |
| **Deployment** | Appwrite (Sites) | All-in-one with BaaS; deploy from Git, same platform as backend |
| **UI Approach** | Custom wrapper components (`components/ui`) | Design-system control with lightweight dependencies |
| **Icons** | react-icons | Broad icon coverage with tree-shakeable imports |

---

## Getting Started

### Prerequisites

- **Bun** v1.3.x or later ([Install Bun](https://bun.sh/docs/installation))
- **Git** for version control
- **Node.js** 24.x LTS (fallback option if needed)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd thoughtfulcode-app

# Install dependencies
bun install
```

### Development

```bash
# Start development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
# Build for production
bun run build

# Start production server
bun start
```

---

## Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start development server with hot reload |
| `bun run build` | Build production bundle |
| `bun run start` | Start production server |
| `bun run check` | Check both linting and formatting |
| `bun run check:fix` | Fix linting and formatting issues |
| `bun run format` | Format code with Biome |
| `bun run type-check` | Run TypeScript type checking |
| `bun run test` | Run tests with Bun test runner |
| `bun run test:coverage` | Run tests with coverage report |
| `bun run healthcheck` | Run format, type-check, lint (Biome), and React Doctor (React/Next health) |
| `bun run doctor` | Run React Doctor only (verbose; security, performance, correctness, Next.js rules) |
| `bun run doctor:score` | Run React Doctor and output only the 0–100 score |
| `bun run clean` | Remove node_modules and lock files, reinstall |
| `bun run new:solution <url-or-slug>` | Scaffold new LeetCode solution from URL |
| `bun run publish:solution <slug>` | Generate MDX from completed solution |

---

## Testing

### Test Runner

Uses **Bun's built-in test runner** with global test methods (no imports needed):

```typescript
// No imports needed - test, describe, expect are globally available

describe('Feature Name', () => {
    describe('Basics', () => {
        test('should handle normal case', () => {
            const input = 'test';
            const expected = 'result';
            const result = myFunction(input);
            
            expect(result).toBe(expected);
        });
    });
    
    describe('Edge Cases', () => {
        test('should handle empty input', () => {
            // Edge case tests
        });
    });
    
    describe('Stress Tests', () => {
        test('should handle large input', () => {
            // Stress tests
        });
    });
});
```

**Important:** Always use `test()` instead of `it()` for consistency. Test methods are globally available via `types/bun-test.d.ts`.

### Coverage

- **Target:** 85%+ coverage
- **Configuration:** `bunfig.toml`
- **Run:** `bun test --coverage`

---

## Code Quality

### Linting & Formatting

**Biome** handles both linting and formatting:

- **Linting:** TypeScript, React, and best practices rules
- **Formatting:** Prettier-compatible, 4-space indentation
- **Import Organization:** Auto-sorts imports
- **Format on Save:** Configured in `.vscode/settings.json`

**React Doctor** (run via `healthcheck` and in CI) scans for React/Next.js health: security, performance, correctness, architecture, dead code, and framework-specific rules. Outputs a 0–100 score; 75+ is "Great".

### TypeScript

- **Strict Mode:** Enabled
- **Explicit Return Types:** Required for all exported functions
- **Type Checking:** Run `bun run type-check` before committing
- **Typing Convention:** `interface` for object/props contracts, `type` for unions/aliases

### Git Hooks

**Pre-commit (Husky):**
- Type check and lint-staged (Biome on staged files)

**Pre-push (Husky):**
- Full healthcheck (format, type-check, Biome, React Doctor) then build. Push only succeeds if both pass, so `main` stays green.

---

## Project Structure

```text
thoughtfulcode-app/
├── app/                 # Next.js App Router routes and pages
├── components/          # Reusable UI and layout components
│   ├── ui/              # Project-owned design-system wrappers
│   └── layout/          # Header/Footer/navigation
├── content/             # MDX content (leetcode, blog)
├── docs/                # Architecture and styling docs
├── lib/                 # Shared utilities and MDX parsers
├── public/              # Static assets
├── scripts/             # Bun scripts (clean, solution tooling)
├── tests/               # App/component tests + mocks
├── types/               # Global TypeScript test types
├── biome.json           # Biome config
├── bunfig.toml          # Bun test config
├── next.config.mjs      # Next.js config
├── postcss.config.mjs   # PostCSS + Tailwind v4 plugin wiring
├── tsconfig.json        # TypeScript config
└── package.json         # Dependencies and scripts
```

---

## Architecture Decisions

For detailed architecture decisions, patterns, and conventions, see [`docs/architecture.md`](docs/architecture.md).
For TypeScript style conventions and examples, see [`docs/typescript-conventions.md`](docs/typescript-conventions.md).

**Quick Summary:**
- **Next.js 16:** Production-ready, SSG for fast loads, React 19 support
- **Bun:** 25x faster installs, built-in tooling, production-ready
- **Biome:** All-in-one linting/formatting, 25x faster than ESLint
- **Valibot:** Lightweight validation (~1KB vs Zod's ~14KB)
- **MDX:** Version-controlled content, type-safe, zero infrastructure

## Styling Guidelines

For detailed styling conventions, Tailwind CSS patterns, and design guidelines, see [`docs/styling.md`](docs/styling.md).

**Quick Summary:**
- **Utility-First:** Use Tailwind utilities over custom CSS
- **Semantic HTML:** Proper HTML elements before styling
- **Accessibility:** WCAG 2.1 AA compliance, keyboard navigation, screen reader support
- **Dark-Only Theme:** Implemented with CSS variables and Tailwind v4
- **Responsive:** Mobile-first approach with Tailwind breakpoints

---

## Content Structure

### MDX Frontmatter (LeetCode Solutions)

```yaml
---
title: "LeetCode #1: Two Sum"
slug: "two-sum"
difficulty: "easy"
topics: ["arrays", "hash-table"]
datePublished: "2026-01-15"
timeComplexity: "O(n)"
spaceComplexity: "O(n)"
excerpt: "Solving Two Sum with a hash map approach for optimal time complexity"
relatedProblems: ["two-sum-ii", "three-sum"]  # Build knowledge graph
companies: ["google", "amazon"]  # Real-world context
hints: ["think about hash maps", "consider trade-offs"]  # Learning aid
---
```

### MDX Frontmatter (Blog Posts)

```yaml
---
title: "Why I Love TypeScript"
slug: "why-i-love-typescript"
datePublished: "2026-01-18"
updatedAt: "2026-01-18"  # Track revisions
excerpt: "Exploring the benefits of TypeScript for modern web development"
tags: ["typescript", "web-development"]
---
```

---

## Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| **First Contentful Paint** | < 1.5s | Lighthouse |
| **Largest Contentful Paint** | < 2.5s | Lighthouse |
| **Time to Interactive** | < 3.0s | Lighthouse |
| **Cumulative Layout Shift** | < 0.1 | Lighthouse |
| **Bundle Size (Initial)** | < 200KB | `@next/bundle-analyzer` |

**Optimization Strategies:**
- Next.js Image optimization (`next/image`)
- Static generation for all content pages (SSG)
- Dynamic imports for syntax highlighting (load only when viewing code)
- Tree-shake syntax highlighting (import specific languages only)
- Font optimization (`next/font`)
- Lazy loading for below-the-fold components
- Automated Lighthouse audits (`scripts/lighthouse-audit.ts`)

---

## Accessibility

**WCAG 2.1 AA Compliance:**
- Semantic HTML
- Proper heading hierarchy (h1 → h6)
- Alt text for all images
- Sufficient color contrast (4.5:1 minimum)
- Keyboard navigation support
- Focus indicators
- ARIA labels where needed

**Enhanced Features:**
- Skip to main content link
- Reduced motion support (`prefers-reduced-motion`)
- Focus trap for modals (Phase 2)
- Touch-friendly targets (44x44px minimum for mobile)

---

## SEO

- Unique `<title>` for every page
- Meta descriptions (155 characters max)
- Open Graph tags for social sharing
- Twitter Card tags
- Canonical URLs
- Structured data (JSON-LD) for blog posts
- Sitemap.xml (automatic with Next.js)
- robots.txt
- RSS feed for blog content (`app/blog/rss.xml/route.ts`)

---

## Deployment

**Appwrite (BaaS + Sites):**
- **BaaS:** Database, auth, and backend services (same platform as deployment).
- **Sites:** Connect the GitHub repository in Appwrite Console; pushes to `main` trigger automatic build and deploy. Preview deployments for other branches.
- Configure in Appwrite: **Install:** `bun install`, **Build:** `bun run build`, **Output:** `.next`. Set environment variables in the Appwrite project.

**CI (GitHub Actions):**
- On every push and pull request, the CI workflow runs `bun run healthcheck` (format, type-check, Biome, React Doctor) and `bun run build`. Only merge when CI passes so Appwrite Sites never builds broken code.

---

## Development Principles

- **YAGNI:** Build only what's needed now
- **KISS:** Simple solutions over clever ones
- **Separation of Concerns:** Clear boundaries between layers
- **DRY:** But don't abstract too early
- **TypeScript First:** Every function needs explicit return types
- **Test Everything:** 85%+ coverage, organized test structure
- **Document Thoroughly:** JSDoc for all exports
- **Optimize Early:** Lighthouse audits from day one

---

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your values:

```bash
# Unix / macOS / Git Bash
cp .env.local.example .env.local

# Windows (PowerShell)
Copy-Item .env.local.example .env.local

# Windows (cmd)
copy .env.local.example .env.local
```

Use the same variables in **Appwrite Console → Project → Settings → Environment Variables** for deployment.

| Variable | Required | Notes |
|----------|----------|-------|
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical site URL (e.g. https://thoughtfulcode.dev) |
| `NEXT_PUBLIC_SITE_NAME` | Yes | Site/brand name |
| `NEXT_PUBLIC_AUTHOR_NAME` | Yes | Author name |
| `NEXT_PUBLIC_AUTHOR_EMAIL` | Yes | Contact email |
| `NEXT_PUBLIC_GIT_BRANCH` | No | Branch name for footer badge (format: `branch-sha`); empty shows `---` |
| `NEXT_PUBLIC_GIT_SHA` | No | Commit hash; footer shows last 5 chars; empty shows `---` |
| `NEXT_PUBLIC_GIT_FULL_SHA` | No | Full 40-char SHA; enables badge link to specific commit |
| `NEXT_PUBLIC_APPWRITE_ENDPOINT` | Phase 2 | Appwrite API endpoint |
| `NEXT_PUBLIC_APPWRITE_PROJECT_ID` | Phase 2 | Appwrite project ID |
| `APPWRITE_API_KEY` | Phase 2 | Server-only; never expose to client |

---

## Troubleshooting

### Bun Not Found

If `bun` command is not recognized:

```bash
# Install Bun globally via npm
npm install -g bun

# Or use the official installer
curl -fsSL https://bun.sh/install | bash  # macOS/Linux
powershell -c "irm bun.sh/install.ps1 | iex"  # Windows
```

### TypeScript Errors

If you see TypeScript errors after installing dependencies:

```bash
# Clean and reinstall
bun run clean
bun install
```

### Biome Format on Save Not Working

1. Install the **Biome** extension in VS Code/Cursor
2. Ensure `.vscode/settings.json` is committed (it should be)
3. Reload the editor window

### Next.js Build Warnings

If you see Turbopack root warnings, ensure `next.config.mjs` has:

```javascript
turbopack: {
    root: process.cwd(),
}
```

### Git Hooks Not Running

If Husky hooks aren't executing:

```bash
# Reinstall Husky
bun run prepare
chmod +x .husky/pre-commit
chmod +x .husky/pre-push
```

---

## Quick Reference

### Adding New Content

#### LeetCode Solution Workflow

**Step 1: Scaffold a New Solution**

```bash
# From LeetCode URL
bun run new:solution https://leetcode.com/problems/two-sum/

# Or just the slug
bun run new:solution two-sum
```

This creates:
```
solutions/two-sum/
├── solution.ts         # Starter code with problem description
├── solution.test.ts    # Test template
└── metadata.json       # Frontmatter data (auto-filled from LeetCode API)
```

**Step 2: Code Your Solution**

1. Implement your solution in `solutions/two-sum/solution.ts`
2. Write tests in `solutions/two-sum/solution.test.ts`
3. Run tests: `bun test solutions/two-sum/solution.test.ts`
4. Iterate until you're happy with the solution

**Step 3: Update Metadata**

Edit `solutions/two-sum/metadata.json`:
- Update `timeComplexity` (change from `O(?)`)
- Update `spaceComplexity` (change from `O(?)`)
- Optionally add `companies`, `hints`, `relatedProblems`

**Step 4: Publish to MDX**

```bash
bun run publish:solution two-sum
```

This generates `content/leetcode/two-sum.mdx` with:
- Frontmatter from metadata.json
- Your solution code
- Template sections for explanation

**Step 5: Add Explanations**

Edit `content/leetcode/two-sum.mdx` to add:
- Problem description
- Examples
- Approach explanation
- Complexity analysis details
- Key takeaways

**Step 6: Preview & Commit**

```bash
# Preview at http://localhost:3000/leetcode/two-sum
bun run dev

# When ready, commit
git add .
git commit -m "feat: add two-sum solution"
```

---

#### Blog Post Workflow

1. Create Markdown file in `content/blog/[slug].md`
2. Add frontmatter with title, slug, datePublished, tags
3. Write content in Markdown

#### Page Layout Convention

- Wrap route pages with `PageContainer` from `components/layout/PageContainer.tsx`
- Prefer consistent page shell spacing over per-page container classes
- Use route-level `loading.tsx` for async transitions when page rendering can take noticeable time
- For content-heavy detail routes (for example blog or problem detail pages), prefer `prefetch={false}` on list-card links so content loads on explicit user intent (click)

### Common Workflows

**Before Committing:**
```bash
bun run healthcheck  # Format, type-check, Biome check, React Doctor
```

**Before Pushing:**
- Pre-push hook automatically runs type-check and format check
- Ensure all tests pass: `bun test`

**Adding a New Dependency:**
```bash
bun add <package-name>        # Production dependency
bun add -d <package-name>     # Dev dependency
```

**Updating Dependencies:**
```bash
bun update                    # Update all dependencies
bun update <package-name>     # Update specific package
```

---

## Future Improvements

### CSS Linting for Tailwind v4
- [ ] Evaluate Stylelint with `stylelint-config-standard` for proper `@theme` syntax support
- [ ] Consider Prettier with `prettier-plugin-tailwindcss` as alternative formatter
- [ ] Monitor Biome GitHub for native Tailwind v4 `@theme` syntax support
- **Current approach**: Keep Tailwind v4 config CSS-first in `app/globals.css`, with Biome + tests as guardrails

---

## Resources

- **Next.js Documentation:** https://nextjs.org/docs
- **MDX Documentation:** https://mdxjs.com/
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Biome Documentation:** https://biomejs.dev/
- **Valibot Documentation:** https://valibot.dev/
- **Bun Documentation:** https://bun.sh/docs
- **Bun Testing:** https://bun.sh/docs/test

---

## License

Private project
