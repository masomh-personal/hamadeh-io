# MDX Setup: How It Works & Why It's the Best Approach

## What is MDX?

**MDX = Markdown + JSX**

Markdown allows you to write content in a familiar format while keeping content version-controlled and easy to render. It's perfect for technical content like code problem writeups and blog posts.

## How Our MDX Setup Works

### 1. **Content Files** (`content/` directory)

We write content in `.md` files with frontmatter (metadata) at the top:

```md
---
title: "Two Sum"
slug: "two-sum"
source: "leetcode"
difficulty: "easy"
datePublished: "2026-01-15"
---

# Problem

Given an array of integers...

## Solution

```typescript
function twoSum(nums: number[], target: number): number[] {
    // Solution code
}
```
```

### 2. **Frontmatter Validation** (`lib/schemas.ts`)

We use **Valibot** to validate frontmatter at build time:

```typescript
export const ProblemFrontmatterSchema = v.object({
    title: v.pipe(v.string(), v.minLength(1)),
    slug: v.string(),
    difficulty: v.picklist(["easy", "medium", "hard"]),
    // ... more fields
});
```

**Why Valibot?**
- **Lightweight:** ~1KB vs Zod's ~14KB (critical for 200KB bundle target)
- **Fast:** 2-10x faster runtime validation
- **Type-safe:** Full TypeScript inference
- **Tree-shakeable:** Only bundle what you use

### 3. **MDX Processing** (`lib/mdx.ts`)

Our utilities read, parse, and validate MDX files:

```typescript
// Get all problem posts
const solutions = await getAllProblems();

// Get single problem by slug
const solution = await getProblemBySlug("two-sum");
```

**What happens:**
1. Read MDX file from filesystem
2. Parse frontmatter with `gray-matter`
3. Validate frontmatter with Valibot (throws if invalid)
4. Return typed, validated data + content

### 4. **Next.js Configuration** (`next.config.mjs`)

Next.js processes MDX files with syntax highlighting:

```javascript
const withMDX = createMDX({
    options: {
        rehypePlugins: [
            [rehypeHighlight, { languages: ["typescript", "javascript"] }]
        ],
    },
});
```

**Result:** Code blocks are automatically highlighted with Shiki via `rehype-pretty-code`.

### 5. **Usage in Pages**

In Next.js pages, we use the utilities:

```typescript
// app/problems/[slug]/page.tsx
export async function generateStaticParams() {
    const solutions = await getAllProblems();
    return solutions.map((s) => ({ slug: s.slug }));
}

export default async function SolutionPage({ params }) {
    const solution = await getProblemBySlug(params.slug);
    return <SolutionView solution={solution} />;
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

**Example:** If you forget `datePublished` in frontmatter, the build fails with a clear error message.

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

Write in Markdown (simple, familiar):
- No special syntax to learn
- Works in any editor
- Easy to read and write
- Embed React components when needed

**Example:** Need an interactive code editor? Just embed a React component:

```mdx
# Solution

<CodeEditor language="typescript">
{code}
</CodeEditor>
```

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
   - MDX content rendered as React components
   - Code blocks highlighted with syntax highlighting
   - Page is fully static (no runtime processing)

4. **User Visits:**
   - Instant page load (pre-rendered)
   - No API calls
   - Perfect SEO (fully static HTML)

## Error Handling

Our setup handles errors gracefully:

```typescript
// If file doesn't exist
getProblemBySlug("non-existent"); // Throws: "Problem not found"

// If frontmatter is invalid
// Build fails with Valibot error message:
// "Title is required" or "Difficulty must be easy, medium, or hard"
```

**This prevents broken content from making it to production.**

## Summary

**MDX + Valibot + Static Generation = Perfect for Technical Content**

- ✅ Version controlled
- ✅ Type-safe
- ✅ Zero infrastructure
- ✅ Fast performance
- ✅ Developer-friendly
- ✅ Portable
- ✅ Small bundle size

This approach aligns perfectly with our principles: **KISS, YAGNI, and clarity over cleverness.**
