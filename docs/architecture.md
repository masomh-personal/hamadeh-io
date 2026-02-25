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

### Next.js 16 (App Router)

**Why:**
- Production-ready with 10+ years of battle-testing
- Excellent documentation and community support
- Perfect for SSG (Static Site Generation) - fast loads, excellent SEO
- React 19 support with Server Components
- Turbopack bundler for faster builds
- Zero-config Vercel deployment

**Patterns:**
- Use App Router for all routes (`app/` directory)
- Leverage Server Components by default
- Use Client Components (`'use client'`) only when needed (interactivity, hooks, browser APIs)
- Static generation for all content pages (SSG)

### React 19

**Why:**
- Required for Next.js 16
- Server Components for better performance
- Enhanced performance optimizations
- Better developer experience

**Patterns:**
- Prefer Server Components
- Use Client Components sparingly
- Leverage React 19 features (use hook, Server Actions)

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

### Bun v1.3.x

**Why:**
- 25x faster package installation
- Built-in test runner, bundler, package manager
- Instant TypeScript execution
- Production-ready (Vercel supports Bun)

**Fallback:**
- All scripts work with both Bun and Node.js
- Easy switch to `npm` commands if needed
- Node.js 24.x LTS as production fallback

### Biome

**Why:**
- All-in-one tool (replaces ESLint + Prettier)
- 25x faster than ESLint (written in Rust)
- Zero config with sensible defaults
- Better developer experience

**Patterns:**
- Single configuration file (`biome.json`)
- Format on save enabled in VS Code/Cursor
- Pre-commit hooks for automatic formatting

### Valibot

**Why:**
- Lightweight (~1KB vs Zod's ~14KB)
- Critical for 200KB bundle size target
- 2-10x faster runtime validation
- Tree-shakeable (modular design)
- Better TypeScript inference

**Usage:**
- Validate MDX frontmatter schemas
- Type-safe content parsing
- Runtime validation at build time

### MDX for Content

**Why:**
- Version control everything in Git
- Type safety with Valibot schemas
- Zero infrastructure (no database, no CMS)
- Performance (static generation at build time)
- Developer-friendly (Markdown + React components)

**Patterns:**
- All content in `content/` directory
- Frontmatter validated with Valibot schemas
- Static generation for all content pages
- React components embedded when needed

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
│   └── api/               # API routes (Phase 2)
├── components/            # React components
│   ├── ui/                # Project-owned UI wrappers/components
│   ├── layout/            # Header, Footer, Navigation
│   ├── problems/          # Problem-specific components
│   └── blog/              # Blog-specific components
├── lib/                   # Utilities and helpers
│   ├── mdx.ts            # MDX processing utilities
│   ├── schemas.ts        # Valibot schemas for frontmatter
│   ├── utils.ts          # General utilities
│   └── constants.ts      # App constants
├── content/              # MDX content files
│   ├── problems/        # Code problems
│   ├── blog/            # Blog posts
│   └── about/           # Resume/about content
├── public/              # Static assets
├── scripts/             # Automation scripts
├── tests/               # Test files
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
export default async function ProblemPage({ params }: Props) {
    const solution = await getProblemBySlug(params.slug);
    
    return <SolutionView solution={solution} />;
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
- **Feature-specific:** Place in feature folders (`components/leetcode/`, `components/blog/`)

---

## Data Fetching Patterns

### Static Generation (SSG)

**All content pages use SSG:**
- Code problems
- Blog posts
- About page

**Pattern:**
```typescript
// app/problems/[slug]/page.tsx
export async function generateStaticParams() {
    const solutions = await getAllProblems();
    return solutions.map((solution) => ({
        slug: solution.slug,
    }));
}

export default async function ProblemPage({ params }: Props) {
    const solution = await getProblemBySlug(params.slug);
    return <SolutionView solution={solution} />;
}
```

### MDX Processing

**Pattern:**
1. Read MDX files from `content/` directory
2. Parse frontmatter with `gray-matter`
3. Validate frontmatter with Valibot schemas
4. Process MDX content with `@next/mdx`
5. Generate static pages at build time

**Example:**
```typescript
// lib/mdx.ts
import matter from 'gray-matter';
import { parse } from 'valibot';
import { problemFrontmatterSchema } from './schemas';

export async function getProblemBySlug(slug: string): Promise<ProblemPost> {
    const filePath = path.join(process.cwd(), 'content', 'problems', `${slug}.md`);
    const fileContents = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Validate frontmatter
    const frontmatter = parse(problemFrontmatterSchema, data);
    
    return {
        ...frontmatter,
        content,
    };
}
```

---

## Error Handling

### Type-Safe Errors

**Pattern:**
```typescript
type Result<T, E = Error> = 
    | { success: true; data: T }
    | { success: false; error: E };

export async function getProblemBySlug(
    slug: string
): Promise<Result<ProblemPost, 'NOT_FOUND' | 'INVALID_FORMAT'>> {
    try {
        const solution = await readSolutionFile(slug);
        return { success: true, data: solution };
    } catch (error) {
        if (error.code === 'ENOENT') {
            return { success: false, error: 'NOT_FOUND' };
        }
        return { success: false, error: 'INVALID_FORMAT' };
    }
}
```

### Error Boundaries

- Use React error boundaries for client-side errors
- Provide fallback UI for graceful degradation
- Log errors for debugging (development only)

---

## Testing Strategy

### Test Organization

```
tests/
├── unit/              # Pure function tests
│   ├── lib/
│   └── utils/
└── integration/       # Component and page tests
    ├── components/
    └── app/
```

### Test Structure

**Global Test Types:**
- Test methods (`test`, `describe`, `expect`, etc.) are globally available
- No need to import from `'bun:test'` in test files
- Type definitions in `types/bun-test.d.ts` provide IntelliSense

**Pattern:**
```typescript
// No imports needed - test methods are globally available

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
            const input = '';
            const expected = '';
            const result = myFunction(input);
            
            expect(result).toBe(expected);
        });
    });
    
    describe('Stress Tests', () => {
        test('should handle large input', () => {
            const input = 'a'.repeat(10000);
            const expected = 'result';
            const result = myFunction(input);
            
            expect(result).toBe(expected);
        });
    });
});
```

**Important:**
- Always use `test()` instead of `it()` for consistency
- `it()` is not available as a global (enforced by project preference)
- Use `test.skip()`, `test.only()`, `test.todo()` for test modifiers

### Coverage Targets

- **Lines:** 85%+
- **Functions:** 85%+
- **Statements:** 85%+
- Configured in `bunfig.toml`

---

## Performance Optimization

### Bundle Size

**Target:** < 200KB initial bundle

**Strategies:**
- Dynamic imports for syntax highlighting (load only when viewing code)
- Tree-shake syntax highlighting (import specific languages only)
- Code splitting (automatic with Next.js)
- Monitor with `@next/bundle-analyzer`

### Image Optimization

- Use `next/image` for all images
- Provide `width` and `height` to prevent layout shift
- Use appropriate image formats (WebP, AVIF)

### Font Optimization

- Use `next/font` for custom fonts
- Preload critical fonts
- Use system fonts when possible

### Static Generation

- All content pages use SSG (no runtime data fetching)
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
- Sanitize MDX content if allowing user input (Phase 2)
- Use Content Security Policy headers (Vercel handles this)

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
- [MDX Documentation](https://mdxjs.com/)
