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
| **Syntax Highlighting** | rehype-highlight + highlight.js | Beautiful code blocks for technical content |
| **Frontmatter Parsing** | gray-matter | Extract metadata from MDX files |
| **Frontmatter Validation** | Valibot | Lightweight schema validation (~1KB vs Zod's ~14KB), better performance |
| **Linting & Formatting** | Biome | All-in-one tool (replaces ESLint + Prettier), 25x faster, zero config |
| **Runtime** | Bun v1.3.x | Fast installs, built-in test runner, instant TypeScript, production-ready |
| **BaaS (Phase 2)** | Appwrite | Open source, all-in-one, no lock-in |
| **Deployment** | Vercel | Zero-config, global CDN, automatic HTTPS |
| **Component Library** | shadcn/ui | Copy-paste components, Tailwind-based, customizable |
| **Icons** | lucide-react | Beautiful, tree-shakeable, TypeScript support |
| **Theme Management** | next-themes | Dark mode with system preference support |

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
| `bun run lint` | Check linting rules (Biome) |
| `bun run lint:fix` | Fix linting and formatting issues |
| `bun run format` | Format code with Biome |
| `bun run check` | Check both linting and formatting |
| `bun run type-check` | Run TypeScript type checking |
| `bun run test` | Run tests with Bun test runner |
| `bun run test:coverage` | Run tests with coverage report |
| `bun run healthcheck` | Run type-check, lint, and format checks |
| `bun run clean` | Remove node_modules and lock files, reinstall |

---

## Testing

### Test Runner

Uses **Bun's built-in test runner** with the same structure as Vitest:

```typescript
import { describe, it, expect } from 'bun:test';

describe('Feature Name', () => {
    describe('Basics', () => {
        it('should handle normal case', () => {
            const input = 'test';
            const expected = 'result';
            const result = myFunction(input);
            
            expect(result).toBe(expected);
        });
    });
    
    describe('Edge Cases', () => {
        // Edge case tests
    });
    
    describe('Stress Tests', () => {
        // Stress tests
    });
});
```

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

### TypeScript

- **Strict Mode:** Enabled
- **Explicit Return Types:** Required for all exported functions
- **Type Checking:** Run `bun run type-check` before committing

### Git Hooks

**Pre-commit (Husky):**
- Formats and lints staged files with Biome

**Pre-push (Husky):**
- Type checking (`tsc --noEmit`)
- Comprehensive check (linting + formatting)

---

## Project Structure

```
thoughtfulcode-app/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── leetcode/         # LeetCode solutions
│   ├── blog/              # Blog posts
│   ├── about/             # Resume/about page
│   └── api/               # API routes (Phase 2)
├── components/            # React components
│   ├── ui/                # shadcn/ui components
│   ├── layout/            # Header, Footer, Navigation
│   ├── leetcode/          # Solution-specific components
│   └── blog/              # Blog-specific components
├── lib/                   # Utilities and helpers
│   ├── mdx.ts            # MDX processing utilities
│   ├── schemas.ts        # Valibot schemas for frontmatter validation
│   ├── utils.ts          # General utilities
│   └── constants.ts      # App constants
├── content/              # MDX content files
│   ├── leetcode/        # LeetCode solutions
│   ├── blog/            # Blog posts
│   └── about/           # Resume/about content
├── public/              # Static assets
│   ├── images/
│   ├── resume.pdf
│   └── favicon.ico
├── scripts/             # Automation scripts
│   └── clean.mjs       # Cross-platform clean script
├── tests/               # Test files
│   ├── unit/
│   └── integration/
├── .vscode/            # Editor settings (format on save)
├── .husky/             # Git hooks
├── biome.json          # Biome linting & formatting config
├── bunfig.toml         # Bun configuration (test coverage)
├── next.config.mjs     # Next.js config
├── tailwind.config.ts  # Tailwind config
├── tsconfig.json       # TypeScript config
└── package.json        # Dependencies and scripts
```

---

## Architecture Decisions

### Why Next.js 16?

- **Production-Ready:** 10+ years of battle-testing, comprehensive documentation
- **Perfect for Portfolio:** SSG (Static Site Generation) for fast loads, excellent SEO
- **React 19 Support:** Server Components, enhanced performance, Turbopack bundler
- **Deployment:** Zero-config Vercel deployment with global CDN

### Why Bun?

- **Performance:** 25x faster package installation, faster builds
- **Built-in Tooling:** Test runner, bundler, package manager in one
- **Instant TypeScript:** No transpilation step needed
- **Production Ready:** Vercel supports Bun for Next.js deployments

**Easy Fallback:** All scripts work with both Bun and Node.js. Switch to `npm` commands if needed.

### Why Biome?

- **All-in-One:** Replaces ESLint + Prettier in a single tool
- **Performance:** 25x faster than ESLint, written in Rust
- **Zero Config:** Works out of the box with sensible defaults
- **Better DX:** Clear error messages, faster feedback loops
- **Production Ready:** Used by Astro, Remix, and other major projects

### Why Valibot?

- **Bundle Size:** ~1KB vs Zod's ~14KB (critical for 200KB bundle target)
- **Performance:** 2-10x faster runtime validation
- **Tree-Shakeable:** Modular design, only bundle what you use
- **TypeScript Native:** Better type inference

### Why MDX for Content?

- **Version Control:** Everything in Git—track changes, collaborate, revert easily
- **Type Safety:** Frontmatter validated with Valibot schemas
- **Zero Infrastructure:** No database, no CMS, no API calls
- **Performance:** Static generation at build time = instant page loads
- **Developer-Friendly:** Write in Markdown, embed React components when needed

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
status: "published"  # "published" | "draft"
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

**Vercel (Recommended):**
1. Connect GitHub repository
2. Automatic deployments on push to `main`
3. Preview deployments for pull requests
4. Environment variables in Vercel dashboard
5. Custom domain setup

**Build Command:** `bun run build`  
**Output Directory:** `.next`  
**Runtime:** Bun (Vercel supports Bun for Next.js deployments). Fallback to Node.js 24.x LTS available if needed.

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

```bash
# .env.local (Phase 1 - No secrets needed)
NEXT_PUBLIC_SITE_URL=https://thoughtfulcode.dev
NEXT_PUBLIC_SITE_NAME=ThoughtfulCode
NEXT_PUBLIC_AUTHOR_NAME=Masom
NEXT_PUBLIC_AUTHOR_EMAIL=contact@thoughtfulcode.dev

# .env.local (Phase 2 - Appwrite)
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-project-id
APPWRITE_API_KEY=your-api-key
```

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

**LeetCode Solution:**
1. Create MDX file in `content/leetcode/[slug].mdx`
2. Add frontmatter with required fields (see Content Structure section)
3. Write solution with code blocks and explanations
4. Build and verify: `bun run build`

**Blog Post:**
1. Create MDX file in `content/blog/[slug].mdx`
2. Add frontmatter with title, slug, datePublished, tags
3. Write content in Markdown
4. Set `status: "published"` when ready

### Common Workflows

**Before Committing:**
```bash
bun run healthcheck  # Runs type-check, lint, and format check
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

## Resources

- **Next.js Documentation:** https://nextjs.org/docs
- **MDX Documentation:** https://mdxjs.com/
- **Tailwind CSS:** https://tailwindcss.com/docs
- **shadcn/ui:** https://ui.shadcn.com/
- **Biome Documentation:** https://biomejs.dev/
- **Valibot Documentation:** https://valibot.dev/
- **Bun Documentation:** https://bun.sh/docs
- **Bun Testing:** https://bun.sh/docs/test
- **next-themes:** https://github.com/pacocoursey/next-themes

---

## License

Private project
