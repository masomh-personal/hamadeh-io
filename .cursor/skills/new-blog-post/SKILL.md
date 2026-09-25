---
name: new-blog-post
description: Drafts or adds a blog post in content/blog with valid frontmatter, registered tags, the site's writing voice, validation, and a browser preview. Use when the user asks to write, draft, add, or publish a blog post or article.
---

# New Blog Post

## Workflow

1. **Clarify the angle** if it isn't given: the core idea, the audience takeaway, and any prior posts in a series to reference (for example, the SOLID in the AI Era parts).
2. **Create `content/blog/<slug>.md`.** Frontmatter must satisfy `BlogFrontmatterSchema` in `lib/schemas.ts`:

```yaml
---
title: "Human Title"
slug: "kebab-case-slug"
datePublished: "YYYY-MM-DD"
excerpt: "Specific, outcome-oriented summary under 200 characters."
tags: ["engineering", "typescript"]
---
```

`slug` matches the filename and uses only lowercase letters, digits, and hyphens. `updatedAt` (`YYYY-MM-DD`) is optional and only for real revisions. At most 3 tags.

3. **Register tags.** Every tag should exist in `BLOG_TAG_COLOR_MAP` in `components/blog/blog-tags.ts`. Prefer existing tags. For a genuinely new tag, add an entry with a hex color not already in the map, because a runtime check rejects duplicate colors.
4. **Write the post** following `.cursor/rules/blog-writing-consistency.mdc`: short intro, practical headings, roughly 700 to 1000 words unless asked otherwise, a "Wrap Up" section, and no em dashes. Frame it as learning notes, not interview prep.
5. **Validate.** Run `env bun run content:check`. If you touched `blog-tags.ts`, also run `env bun run type-check` and `env bun test`.
6. **Preview.** Start `env bun run dev` in the background, open `http://localhost:3000/blog/<slug>` with the browser tool, and check that the headings, code blocks, and tag colors render correctly on a narrow viewport.
