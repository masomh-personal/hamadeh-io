# Markdown Setup: How It Works

## Why Plain Markdown

Markdown keeps content version-controlled, portable, and easy to review. This
site does not embed JSX in posts, so plain `.md` files are the simpler fit.

## How Our Markdown Setup Works

### 1. **Content Files** (`content/` directory)

We write content in `.md` files with frontmatter (metadata) at the top:

````md
---
title: "Two Sum"
slug: "two-sum"
source: "leetcode"
difficulty: "easy"
---

# Problem

Given an array of integers...

## Solution

```typescript
function twoSum(nums: number[], target: number): number[] {
    // Solution code
}
```
````

````

### 2. **Frontmatter Validation** (`lib/schemas.ts`)

We use **Valibot** to validate frontmatter at build time:

```typescript
export const ProblemFrontmatterSchema = v.object({
    title: v.pipe(v.string(), v.minLength(1)),
    slug: v.string(),
    difficulty: v.picklist(["easy", "medium", "hard"]),
    // ... more fields
});
````

**Why Valibot?**

- **Lightweight:** ~1KB vs Zod's ~14KB (critical for 200KB bundle target)
- **Fast:** 2-10x faster runtime validation
- **Type-safe:** Full TypeScript inference
- **Tree-shakeable:** Only bundle what you use

### 3. **Markdown Processing** (`lib/mdx.ts` & `lib/content/`)

`lib/mdx.ts` reads, parses, and validates the Markdown corpus in parallel with
`@11ty/gray-matter` and Valibot, memoized in production builds. Pages and UI
components consume the published content port in `lib/content/blog.ts` and
`lib/content/problems.ts` (which strips filesystem `filePath` details):

```typescript
// List published problem summaries (content kept off the wire)
const problems = await listPublishedProblems();

// Get a single published problem by slug
const problem = await getPublishedProblemBySlug("two-sum");
```

**What happens:**

1. Enumerate `.md` files in `content/{blog,problems}` and read them in parallel
2. Parse frontmatter with `@11ty/gray-matter`
3. Validate frontmatter with Valibot (throws if invalid)
4. Return typed, validated data + content (throwing `ContentNotFoundError` if a slug is missing)

### 4. **Server Rendering** (`components/markdown/RichMarkdownContent.tsx`)

The server component renders plain Markdown with GFM, build-time heading anchor
links, and server-side syntax highlighting using an explicit 5-language
`highlight.js` allowlist (`bash`, `http`, `javascript`, `json`, `typescript`):

```tsx
<MarkdownAsync
    components={markdownComponents}
    remarkPlugins={REMARK_PLUGINS}
    rehypePlugins={REHYPE_PLUGINS}
>
    {content}
</MarkdownAsync>
```

**Result:** Code blocks are highlighted on the server without shipping a
client-side syntax highlighter, and `scripts/check-content.ts` fails fences
outside the registered language set.

### 5. **Usage in Pages**

In Next.js pages, we use the utilities:

```typescript
// app/problems/[slug]/page.tsx
export async function generateStaticParams() {
    const problems = await listPublishedProblems();
    return problems.map((p) => ({ slug: p.slug }));
}

export default async function ProblemPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const problem = await getPublishedProblemBySlug(slug);
    return <RichMarkdownContent content={problem.content} />;
}
```

## Why This Is the Best Approach

### ✅ **Version Control Everything**

All content is in Git:

- Track changes over time
- Collaborate easily
- Revert mistakes
- See full history

**vs. Database/CMS:**

- Content locked in database
- Harder to track changes
- Requires UI or API to edit

### ✅ **Type Safety**

Valibot schemas ensure:

- Required fields exist
- Data types are correct
- Invalid content fails at build time (not runtime)

**Example:** If you forget `title` in frontmatter, the build fails with a clear error message.

### ✅ **Zero Infrastructure**

No database, no CMS, no API calls:

- Content is just files
- Build-time processing
- Static generation = instant page loads

**vs. Headless CMS:**

- Requires API calls
- Slower page loads
- More complex setup
- Potential downtime

### ✅ **Performance**

Static generation at build time:

- All pages pre-rendered
- Zero runtime data fetching
- Instant page loads
- Perfect for SEO

**vs. Dynamic Content:**

- Runtime database queries
- Slower page loads
- More server resources needed

### ✅ **Developer-Friendly**

Write in plain Markdown (simple, familiar):

- No special JSX syntax to learn
- Works in any editor
- Easy to read, diff, and review
- Interactive behaviors (like copy-code buttons and heading anchors) are attached in `RichMarkdownContent.tsx` without mixing React components into `.md` files

### ✅ **Portable**

Markdown is universal:

- Easy to migrate if needed
- Works with any static site generator
- Can export to other formats (PDF, etc.)

### ✅ **Bundle Size**

Valibot is tiny (~1KB):

- Critical for our 200KB bundle target
- Tree-shakeable (only bundle what you use)
- No heavy validation library

**vs. Zod:**

- ~14KB (7% of our bundle budget!)
- Harder to tree-shake

## Example: Complete Flow

1. **Write Content:**

    ```mdx
    ---
    title: "Two Sum"
    slug: "two-sum"
    difficulty: "easy"
    ---

    # Problem

    ...
    ```

2. **Build Time:**
    - Next.js reads `content/problems/two-sum.md`
    - `getAllProblems()` parses and validates
    - Valibot ensures frontmatter is correct
    - If invalid → build fails with clear error

3. **Static Generation:**
    - Next.js generates `/problems/two-sum` page
    - Markdown content rendered by a Server Component
    - Code blocks highlighted with syntax highlighting
    - Page is fully static (no runtime processing)

4. **User Visits:**
    - Instant page load (pre-rendered)
    - No API calls
    - Perfect SEO (fully static HTML)

## Error Handling

Our setup handles errors gracefully:

```typescript
// If slug does not exist
getPublishedProblemBySlug("non-existent");
// Throws ContentNotFoundError: `Problem post with slug "non-existent" not found`

// If frontmatter is invalid
// Build fails loudly with a Valibot error message:
// "Title is required" or "Difficulty must be easy, medium, or hard"
```

**This prevents broken content from making it to production.**

## Summary

**Markdown + Valibot + Static Generation is a simple fit for technical content.**

- ✅ Version controlled
- ✅ Type-safe
- ✅ Zero infrastructure
- ✅ Fast performance
- ✅ Developer-friendly
- ✅ Portable
- ✅ Small bundle size

This approach aligns perfectly with our principles: **KISS, YAGNI, and clarity over cleverness.**
