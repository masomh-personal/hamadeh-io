# Architecture Decisions

This document outlines the architectural decisions, patterns, and conventions used in hamadeh.io.

---

## Core Principles

- **YAGNI (You Aren't Gonna Need It):** Build only what's needed now
- **KISS (Keep It Simple, Stupid):** Simple solutions over clever ones
- **Separation of Concerns:** Clear boundaries between layers
- **DRY (Don't Repeat Yourself):** But don't abstract too early
- **Clarity over Cleverness:** Every decision demonstrates maintainable, thoughtful code

---

## Technology Stack Rationale

### TanStack Start 1.0 + Vite 8 (Static Prerendering)

**Why:**

- Transparent, lightweight Vite-based React framework without App Router / RSC runtime overhead
- First-class type-safe file-based routing (`src/routes/`) and Valibot-validated search params (`validateSearch`)
- Static prerendering (`prerender: { enabled: true }`) outputs plain HTML, CSS, and JS to `dist/client/`
- Static hosting on Vercel via `vercel.json` (zero serverless runtime required)

**Patterns:**

- File-based routes live in `src/routes/` (`__root.tsx`, `index.tsx`, `about.tsx`, `blog/`, `problems/`, `components.tsx`, `$.tsx`)
- `scripts/generate-static-assets.ts` precompiles Markdown to Shiki-highlighted HTML into `src/generated/` and writes RSS, sitemap, robots, search indexes, and Satori/Resvg OG PNGs into `public/`
- Route loaders in `src/data/content.ts` read static generated JSON (with Vite `import.meta.glob` per-slug code splitting), so client-side navigation requires zero runtime server RPC calls
- Tailwind CSS v4 runs through `@tailwindcss/vite` (no PostCSS pipeline)

### React 19

**Why:**

- Modern React runtime paired with TanStack Start and Radix UI primitives
- `useSyncExternalStore` keeps static HTML hydration clean on deep-linked query-string routes (`/blog?q=...`, `/problems?difficulty=...`)

**Patterns:**

- Keep components thin and push domain/filtering logic to `lib/`
- Keep Markdown parsing and syntax highlighting strictly build-time (`src/server/markdown.ts`) so zero parser or highlighter JS enters the client bundle

### TypeScript

**Why:**

- Type safety catches errors at compile time
- Better IDE support and autocomplete
- Self-documenting code
- Portfolio showcase of best practices

**Patterns:**

- Strict mode enabled (`strict: true` in `tsconfig.json`)
- Explicit return types for all exported functions
- No `any` types (use `unknown` when needed)
- Narrow types early with type guards
- Use discriminated unions for complex state

#### Type Modeling Convention (Project Standard)

To keep typing consistent and easy to scan:

- Use `interface` for object-shaped contracts (especially component props)
- Use `type` for unions, string literals, aliases, mapped/conditional helpers
- Prefer `ComponentProps<"...">` for DOM wrapper props in UI components
- Keep behavior-specific prop extensions explicit (e.g., `onClick` wrappers)
- Optimize for consistency and readability over strict ideology

**Examples:**

```ts
type BadgeColor = "primary" | "secondary" | "tertiary" | "default";

interface BadgeProps extends React.ComponentProps<"span"> {
    color?: BadgeColor;
}
```

For additional examples and a quick decision guide, see [`docs/typescript-conventions.md`](./typescript-conventions.md).

### Bun

**Why:**

- 25x faster package installation
- Built-in test runner, bundler, package manager
- Instant TypeScript execution
- Production-ready (Vercel supports Bun)

**Runtime policy:**

- Bun is the only supported package manager and local JavaScript runtime.
- `engines.bun` in `package.json` is the single source of truth for which
  versions are supported. `packageManager` pins the exact version CI installs,
  and `scripts/ensure-bun.ts` fails the build if either one is not honored.
  Vercel is exempt from the range because it provisions its own Bun, and the
  range exists for development tooling rather than the production build.
- Scripts that run our own code, and the Next.js CLI, invoke Bun explicitly.
- Oxc's binaries (Oxfmt, Oxlint) are launched through `node_modules/.bin`
  rather than forced onto Bun's runtime with `--bun`. They are native binaries
  behind a thin JS entry point, so the flag bought nothing and coupled the
  formatter to Bun-specific Node-API behavior. `bun run` already resolves
  `node` to Bun inside scripts, so this changes which code runs the launcher,
  not which runtime the repo standardizes on.
- Vercel owns the managed Next.js production runtime independently from the
  repository's local toolchain.

### Oxfmt and Oxlint

**Why:**

- Oxc-powered formatter and linter for fast local and CI feedback
- Oxfmt keeps formatting deterministic across JS, TS, CSS, Markdown, and config files
- Oxlint covers TypeScript, React, and accessibility checks without the ESLint dependency tree
- Smaller audit surface than the previous combined formatter, linter, and health-check setup

**Patterns:**

- Formatter configuration lives in `.oxfmtrc.json`
- Package scripts wrap Oxfmt/Oxlint so hooks and CI use the same commands
- Pre-commit runs the fast TypeScript check.
- `scripts/check-staged.ts` remains available as an explicit staged format/lint command.
- Pre-push and CI run the complete healthcheck and production build.

### Valibot

**Why:**

- Lightweight (~1KB vs Zod's ~14KB)
- Critical for 200KB bundle size target
- 2-10x faster runtime validation
- Tree-shakeable (modular design)
- Better TypeScript inference

**Usage:**

- Validate Markdown frontmatter schemas
- Type-safe content parsing
- Runtime validation at build time

### Markdown for Content

**Why:**

- Version control everything in Git
- Type safety with Valibot schemas
- Zero infrastructure (no database, no CMS)
- Performance (static generation at build time)
- Developer-friendly Markdown authored in Git

**Patterns:**

- All content in `content/` directory
- Frontmatter validated with Valibot schemas
- Static generation for all content pages
- Compiled at build time with `unified`, `remark-gfm`, `@shikijs/rehype` (`github-dark-default`, explicit 5-language allowlist), and custom heading-anchor + copy-code rehype plugins (`src/server/markdown.ts`)

---

## Project Structure

```
hamadeh-io/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout (Server Component)
│   ├── page.tsx           # Homepage (Server Component)
│   ├── problems/         # Code problems (dynamic routes)
│   ├── blog/              # Blog posts (dynamic routes)
│   ├── about/             # Resume/about page
├── components/            # React components
│   ├── ui/                # Project-owned UI wrappers/components
│   ├── layout/            # Header, Footer, Navigation
│   ├── problems/          # Problem-specific components
│   └── blog/              # Blog-specific components
├── lib/                   # Utilities and helpers
│   ├── mdx.ts            # Markdown processing utilities
│   ├── schemas.ts        # Valibot schemas for frontmatter
│   ├── content/          # Published blog and problem loaders
│   ├── site.ts           # Site URL, author constants, page metadata
│   └── utils.ts          # General utilities
├── content/              # Markdown content files
│   ├── problems/        # Code problems
│   ├── blog/            # Blog posts
├── public/              # Static assets
├── scripts/             # Automation scripts
└── docs/                # Documentation (this folder)
```

---

## Component Architecture

### Server Components (Default)

**When to use:**

- Fetching data
- Accessing backend resources
- Keeping sensitive information on server
- Large dependencies that should reduce client bundle

**Example:**

```typescript
// app/problems/[slug]/page.tsx
export default async function ProblemPage({ params }: PageProps) {
    const { slug } = await params;
    const problem = await getPublishedProblemBySlug(slug);

    return <RichMarkdownContent content={problem.content} />;
}
```

### Client Components

**When to use:**

- Interactivity (onClick, onChange, etc.)
- Browser APIs (localStorage, window, etc.)
- React hooks (useState, useEffect, etc.)
- Third-party libraries that require client-side execution

**Example:**

```typescript
'use client';

import { useState } from 'react';

export function ThemeToggle() {
    const [theme, setTheme] = useState('light');

    return (
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            Toggle theme
        </button>
    );
}
```

### Component Organization

- **Co-location:** Keep related components close together
- **One component per file:** Clear file naming (`ComponentName.tsx`)
- **Barrel exports:** Use `index.ts` files sparingly, only for public API
- **Shared components:** Place in `components/ui/` or `components/layout/`
- **Feature-specific:** Place in feature folders (`components/problems/`, `components/blog/`)

---

## Data Fetching Patterns

### Static Generation (SSG)

**All page routes are statically rendered:**

- Code problems
- Blog posts
- About page

**Pattern:**

```typescript
// app/problems/[slug]/page.tsx
interface PageProps {
    params: Promise<{ slug: string }>;
}

// Unknown slugs 404 at the routing layer instead of rendering on demand.
export const dynamicParams = false;

export async function generateStaticParams() {
    const problems = await listPublishedProblems();
    return problems.map((problem) => ({
        slug: problem.slug,
    }));
}

export default async function ProblemPage({ params }: PageProps) {
    const { slug } = await params;
    const problem = await getPublishedProblemBySlug(slug);
    return <RichMarkdownContent content={problem.content} />;
}
```

### Markdown Processing

**Pattern:**

1. Enumerate `.md` files in `content/{blog,problems}` and read them in parallel
2. Parse frontmatter with `@11ty/gray-matter`
3. Validate frontmatter with Valibot schemas (`lib/schemas.ts`)
4. Memoize the parsed corpus in production and expose clean domain types through `lib/content/{blog,problems}.ts`
5. Render Markdown on the server with `react-markdown`, `remark-gfm`, build-time heading anchors, and an explicit 5-language `rehype-highlight` allowlist
6. Generate static pages at build time (`dynamicParams = false`)

**Example:**

```typescript
// lib/content/problems.ts (public boundary used by pages)
const problems = await listPublishedProblems();
const problem = await getPublishedProblemBySlug(slug);
```

---

## Error Handling

### Typed Content Errors

- `lib/mdx.ts` throws `ContentNotFoundError` when a slug does not exist and lets Valibot validation errors throw directly so corrupt frontmatter fails builds loudly.
- Dynamic routes check `isContentNotFoundError(error)` before calling Next.js `notFound()`, rethrowing unexpected errors instead of masking them as 404s.

```typescript
try {
    problem = await getPublishedProblemBySlug(slug);
} catch (error) {
    if (isContentNotFoundError(error)) {
        notFound();
    }
    throw error;
}
```

### Error Boundaries

- Use React error boundaries for client-side errors
- Provide fallback UI for graceful degradation
- Log errors for debugging (development only)

---

## Testing Strategy

### Test Organization

- Keep solution tests beside each `solutions/<slug>/solution.ts`.
- Keep app and library tests beside the module whose behavior they verify.
- Prefer boundary-focused behavior tests over a separate mirrored test tree.

### Test Structure

**Test imports:**

- Tests import `describe`, `expect`, `test`, and other helpers explicitly from
  `bun:test`.
- Always use `test()` instead of `it()` for consistency.

**Pattern:**

```typescript
import { describe, expect, test } from "bun:test";

describe("Feature Name", () => {
    describe("Basics", () => {
        test("should handle normal case", () => {
            const input = "test";
            const expected = "result";
            const result = myFunction(input);

            expect(result).toBe(expected);
        });
    });

    describe("Edge Cases", () => {
        test("should handle empty input", () => {
            const input = "";
            const expected = "";
            const result = myFunction(input);

            expect(result).toBe(expected);
        });
    });

    describe("Stress Tests", () => {
        test("should handle large input", () => {
            const input = "a".repeat(10000);
            const expected = "result";
            const result = myFunction(input);

            expect(result).toBe(expected);
        });
    });
});
```

**Important:**

- Always use `test()` instead of `it()` for consistency
- Use `test.skip()`, `test.only()`, `test.todo()` for test modifiers

### Coverage Policy

- Coverage is reported on every test run through `bunfig.toml`.
- Strict thresholds stay disabled until app and component behavior coverage is broad enough to make the gate meaningful.
- Re-enable thresholds incrementally rather than allowing solution tests to hide app-level gaps.

---

## Performance Optimization

### Bundle Size

**Target:** < 200KB initial bundle

**Strategies:**

- Dynamic imports for syntax highlighting (load only when viewing code)
- Tree-shake syntax highlighting (import specific languages only)
- Code splitting (automatic with Next.js)
- Measure with Lighthouse and browser network tooling before and after performance changes

### Image Optimization

- Use `next/image` for all images
- Provide `width` and `height` to prevent layout shift
- Use appropriate image formats (WebP, AVIF)

### Font Optimization

- Use `next/font` for custom fonts
- Preload critical fonts
- Use system fonts when possible

### Static Generation

- All page routes use static rendering or `generateStaticParams`
- Generate all pages at build time
- Pre-render for instant page loads

---

## Security Considerations

### Input Validation

- Validate all user inputs with Valibot schemas
- Sanitize user-generated content
- Never trust client-side validation alone

### Environment Variables

- Never commit `.env` files
- Use `NEXT_PUBLIC_` prefix only for client-side variables
- Keep API keys server-side only

### Content Security

- No eval() or Function() constructors
- Sanitize Markdown content before allowing untrusted author input

### Response Headers

`vercel.json` sends a Content Security Policy with every response (mirrored locally by `scripts/serve-static.ts`), alongside `nosniff`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`, and `X-Frame-Options: DENY`.

- Everything loads from `'self'`. There are no third-party scripts, fonts, images, or embeds, so adding one means widening the policy on purpose.
- `script-src` allows `'unsafe-inline'` for TanStack Start's scroll-restoration and dehydrated router bootstrap scripts.
- Static assets under `/assets/*` are served with `Cache-Control: public, max-age=31536000, immutable`, and `/blog/rss.xml` explicitly sets `Content-Type: application/rss+xml; charset=utf-8`.

---

## Future Considerations (Phase 2)

### API Routes

- Place in `app/api/` directory
- Use App Router API route handlers
- Validate requests with Valibot
- Rate limiting for public endpoints

### Optional Backend Integration

- Add a backend only when product requirements justify it (auth, write paths, private data)
- Keep data-access logic isolated in `lib/backend/` or provider-specific adapters
- Keep typed boundaries and schema validation at API edges
- Keep secrets server-only and avoid `NEXT_PUBLIC_` for sensitive values

---

## References

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [React Server Components](https://react.dev/reference/rsc/server-components)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [react-markdown Documentation](https://github.com/remarkjs/react-markdown)
