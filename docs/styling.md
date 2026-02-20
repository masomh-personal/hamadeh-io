# ThoughtfulCode - Styling Guide
## Official Design System & Implementation Reference

This document is the single source of truth for all styling decisions in ThoughtfulCode. Always reference this guide before making design changes.

---

## 🎯 Design Philosophy

**Core Principles:**
- Clean, modern aesthetic with personality
- Dark-only theme for focused, professional look
- Strong visual hierarchy through typography
- Vibrant but tasteful accent colors
- Generous whitespace and breathing room
- Accessibility and readability first
- Utility-first approach with Tailwind CSS
- Hybrid strategy: keep repetitive typography/surface tokens in `app/globals.css`
- Mobile-first responsive design

---

## 🧩 Hybrid Tailwind Approach (Current)

Use this decision tree:

1. Start with plain Tailwind utilities in the component.
2. If a pattern repeats 3+ times, promote it to a semantic utility in `app/globals.css`.
3. Keep layout and per-instance spacing inline in JSX.
4. Keep semantic utilities small and token-based (color, border, radius, shadow, text tone).

Current semantic utilities:

| Category | Utility | Purpose |
|---|---|---|
| Text | `text-content` | Primary readable content text |
| Text | `text-content-muted` | Secondary/supporting text |
| Text | `text-content-subtle` | Low-emphasis metadata text |
| Surface | `surface-card` | Standard card shell (border + background) |
| Surface | `surface-card-strong` | Higher contrast card shell |
| Surface | `surface-panel` | Inner panel shell |
| Surface | `surface-outline` | Border-only shell |
| Shape | `radius-card` | Standard card corner radius |
| Elevation | `shadow-elevated` | Reusable elevated shadow |

Example pattern:

```tsx
<section className="surface-card radius-card p-6 md:p-8">
  <h2 className="font-bold text-white">Section title</h2>
  <p className="text-content-muted mt-2">Supporting copy</p>
</section>
```

Why this works:
- Keeps Tailwind fast and local for page-specific structure.
- Prevents long-term drift in repeated visual tokens.
- Makes global style tuning one-file changes.

**Layout components (Header, Footer):** Styles are colocated in the component using Tailwind classes instead of global CSS. This follows DRY and keeps components self-contained. Use `border-(--border)` and `bg-(--background)` to reference theme variables.

---

## 🗺️ Token & Layer Decision Guide

When deciding where a style belongs, use this order:

1. `@theme` for design tokens that should map to Tailwind utilities.
2. `@layer base` for global element defaults and app-wide CSS variables.
3. `@layer utilities` for small, reusable semantic utility classes built from tokens.
4. Component JSX classes for local layout/spacing and one-off composition.

### Quick Rules

- Put it in `@theme` when you want reusable utility classes like `text-primary`, `bg-secondary`, `border-tertiary`.
- Put it in `@layer base` when you are styling HTML tags directly (`body`, `h1-h6`, `a`, `button`) or setting root vars (`--background`, `--foreground`, `--accent`).
- Put it in `@layer utilities` when a semantic pattern repeats (for example `surface-card`, `text-content-muted`, `radius-card`).
- Keep page/component-specific spacing and structure in JSX (`grid`, `flex`, `gap-*`, `p-*`, `m-*`).

### Repo Examples

- `@theme` token example: `--color-primary`, `--color-secondary`, `--color-muted` (enables `text-primary`, `text-secondary`, `text-muted`).
- `@layer base` example: `body { background-color: var(--background); }`.
- `@layer base` example: `:root { --accent: ...; --secondary: ...; --tertiary: ...; }`.
- `@layer utilities` example: `.surface-card`, `.text-content-muted`, `.shadow-elevated`.
- Component usage example: `Link` variants use semantic classes (`text-primary`, `text-secondary`, `text-muted`) instead of raw palette classes.

### Why this structure

- Token updates stay centralized, so palette changes are low-risk.
- Base styles stay predictable across all pages.
- Utility classes stay semantic and composable.
- Components stay clean, DRY, and easy to refactor.

---

## 📝 Typography System

Current decision (active):

| Role | Font | Notes |
|------|------|-------|
| **Headings / Links / Buttons** | Quicksand | Friendly, clear visual identity |
| **Body Text** | Lexend | Readable for long-form content |
| **Code / Monospace** | No change (current mono stack) | Re-evaluate during CodeBlock work |
| **Accent (optional)** | Baloo 2 (`font-baloo`) | One-off decorative or brand accents |

Implementation notes:
- Fonts are loaded with `next/font/google` using `display: "swap"` and limited weights/subsets.
- Global defaults in `globals.css`:
  - `body` -> Lexend
  - `h1-h6`, `a`, `button` -> Quicksand
- One-off font utilities are exposed for experimentation:
  - `font-baloo`, `font-plus-jakarta`, `font-inter`, `font-manrope`, `font-open-sans`, `font-source-sans`.

---

## 🎨 Color Palette

### Dark Theme (Default & Only)

**Background:**
- Main: `#171717` (Neutral gray, not blue-tinted)
- Cards/Elevated: `slate-800` (`#1e293b`)
- Borders: `slate-700` (`#334155`)

**Text:**
- Primary: `slate-50` (`#f8fafc`)
- Secondary: `slate-400` (`#94a3b8`)
- Muted: `slate-500` (`#64748b`)

**Accent Colors:**

| Accent | Color | Hex | Usage |
|--------|-------|-----|-------|
| **Primary** | Sky 500 | `#0ea5e9` | Links, primary buttons, interactive elements |
| **Secondary** | Emerald 500 | `#10b981` | Success states, secondary actions |
| **Tertiary** | Amber 400 | `#fbbf24` | Highlights, badges, special emphasis |

**Color Usage Guidelines:**
- Primary (Sky): Main CTAs, links, active states
- Secondary (Emerald): Success messages, positive indicators
- Tertiary (Amber): Warnings, highlights, special callouts
- Use sparingly - let dark background and white text dominate

### Hover States

**Buttons:**
- Default: Base color (500) with transparent border (2px)
- Hover: Lighter background (400) + light border (300)
- Text: White throughout
- Example: `bg-sky-500 border-2 border-transparent hover:bg-sky-400 hover:border-sky-300`

**Links:**
- Default: Base color (500)
- Hover: Slightly lighter (400) with underline
- Example: `text-sky-500 hover:text-sky-400 hover:underline`

**Navigation:**
- Default: `text-slate-400`
- Hover: `text-sky-500`
- Active: `text-sky-500`

---

## 🎭 Component Patterns

### Buttons

**Primary Button:**
```tsx
<button className="rounded-md border-2 border-transparent bg-sky-500 px-6 py-3 font-heading text-base font-semibold text-white transition-all hover:border-sky-300 hover:bg-sky-400">
  Primary Action
</button>
```

**Secondary Button (Outline):**
```tsx
<button className="rounded-md border-[3px] border-slate-600 bg-transparent px-6 py-3 font-heading text-base font-semibold text-slate-300 transition-all duration-200 hover:border-sky-500 hover:bg-sky-950/20 hover:text-sky-500 hover:shadow-lg">
  Secondary Action
</button>
```

**Success Button:**
```tsx
<button className="rounded-md border-2 border-transparent bg-emerald-500 px-6 py-3 font-heading text-base font-semibold text-white transition-all hover:border-emerald-300 hover:bg-emerald-400">
  Success Action
</button>
```

**Text Link:**
```tsx
<a className="font-heading text-base font-semibold text-sky-500 transition-colors hover:text-sky-400 hover:underline">
  Link Text
</a>
```

### Typography Examples

**Hero Heading:**
```tsx
<h1 className="font-extrabold leading-tight tracking-tight text-white">
  Build Thoughtful Software
</h1>
```

**Section Heading:**
```tsx
<h2 className="font-bold leading-tight text-white">
  Section Title
</h2>
```

**Subsection Heading:**
```tsx
<h3 className="font-semibold leading-tight text-white">
  Subsection Title
</h3>
```

**Body Text:**
```tsx
<p className="text-content">
  Your content here with excellent readability.
</p>
```

**Small Text:**
```tsx
<p className="text-content-muted text-sm">
  Captions, metadata, and secondary information.
</p>
```

### Code Blocks

**Inline Code:**
```tsx
<code className="rounded-md bg-slate-800 px-2 py-1 font-mono text-sm text-slate-100">
  const example = true;
</code>
```

**Code Block:**
```tsx
<pre className="surface-outline overflow-x-auto rounded-md bg-[#282c34]/50 p-4">
  <code className="font-mono text-sm text-slate-100">
    {codeContent}
  </code>
</pre>
```

### Cards

**Pattern:**
```tsx
<div className="surface-card radius-card p-6">
  <h3 className="text-lg font-semibold text-white">Card Title</h3>
  <p className="text-content">Card content</p>
</div>
```

---

## 📐 Spacing & Layout

### Section Spacing
- Large sections: `py-20 md:py-24 lg:py-32`
- Medium sections: `py-12 md:py-16 lg:py-20`
- Small sections: `py-8 md:py-12`

### Content Width
- Max width: `max-w-6xl` (1152px)
- Padding: `px-4 sm:px-6 lg:px-8`

### Typography Spacing
- Heading margin bottom: `mb-6 md:mb-8`
- Paragraph margin bottom: `mb-6`
- List spacing: `space-y-2`

### Border Styling
- Standard borders: `border-2` (increased from default 1px)
- Thick borders (emphasis): `border-[3px]`
- Border radius: `rounded-md` (0.375rem) - reduced from `rounded-lg`

### Container Pattern
```tsx
<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
  Content
</div>
```

---

## 🎨 CSS Variables (globals.css)

### Theme Colors
```css
:root {
  --background: #171717;
  --foreground: var(--color-slate-50);
  --muted: var(--color-slate-800);
  --muted-foreground: var(--color-slate-400);
  --border: var(--color-slate-700);
  --accent: var(--color-sky-500);
  --accent-foreground: white;
  --secondary: var(--color-emerald-500);
  --secondary-foreground: white;
  --tertiary: var(--color-amber-400);
  --tertiary-foreground: white;
}
```

### Font Variables
```css
--font-sans: var(--font-body-gf), ui-sans-serif, system-ui, sans-serif;
--font-heading: var(--font-heading-gf), ui-sans-serif, system-ui, sans-serif;
--font-baloo: var(--font-accent-gf), ui-sans-serif, system-ui, sans-serif;
--font-mono: var(--font-mono-fira), ui-monospace, SFMono-Regular, monospace;
```

---

## ✅ Implementation Rules

### Tailwind-First Approach
1. **Always use Tailwind utility classes** for styling
2. Use semantic utilities in `globals.css` for repeated token combos (text tone, surface, radius, shadow)
3. Keep layout/spacing inline in JSX (`grid`, `flex`, `gap`, `p-*`, `m-*`)
4. Keep semantic utilities small and composable (do not create large “component CSS” classes)
5. Use custom CSS outside `@layer` only for global concerns (resets, prose, third-party overrides)
6. **Never use `!important`** - solve specificity through proper architecture

### Design Tokens
- Define colors, spacing, typography in `globals.css` using CSS variables
- Reference variables in Tailwind config when needed
- Keep all design decisions centralized

### Before Making Changes
1. Discuss and agree on approach first
2. Consider reusability and maintainability
3. Test in dark theme (our only theme)
4. Verify contrast ratios for accessibility

### Class Name Utilities

**Use `cn()` utility for conditional classes:**

```tsx
import { cn } from '@/lib/utils';

<div className={cn(
    "base-classes",
    condition && "conditional-classes",
    className // Allow prop override
)}>
```

---

## 🚀 Component-Specific Guidelines

### Header
- Logo: Quicksand, Bold (700), `text-xl`
- Navigation: Quicksand, Bold (700), `text-sm`, normal case (not uppercase)
- Hover: Sky 500 for both logo and nav links
- Border: `border-b border-(--border)` (1px, theme color)
- Sticky positioning with dark background

**Pattern:**
```tsx
<header className="sticky top-0 z-50 w-full border-b border-(--border) bg-(--background)">
  <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
    <Link className="font-heading text-xl font-bold text-slate-50 hover:text-sky-500">
      ThoughtfulCode
    </Link>
  </nav>
</header>
```

### Footer
- Copyright: Lexend, Regular (400), `text-content-muted`
- Social links: Hover to Sky 500
- Border: `border-t border-(--border)` (1px, theme color)
- Centered content layout

**Pattern:**
```tsx
<footer className="w-full border-t border-(--border) bg-(--background)">
  <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
    <p className="text-slate-400">Content</p>
  </div>
</footer>
```

### Cards
- Background: `bg-slate-800`
- Border: `border-2 border-slate-700`
- Border radius: `rounded-md`
- Padding: `p-6` or `p-8`

### Code Blocks
- Background: `bg-[#282c34]/50` (subtle blue-gray with 50% transparency)
- Border: `border-2 border-slate-700`
- Font weight: `font-medium` (500) for better readability
- Border radius: `rounded-md`

---

## 📊 Accessibility

### Contrast Ratios (WCAG AA)
- Normal text: Minimum 4.5:1
- Large text (18px+): Minimum 3:1
- UI components: Minimum 3:1

### Current Palette Compliance
- ✅ Sky 500 on dark background: Excellent contrast
- ✅ Emerald 500 on dark background: Excellent contrast
- ✅ Amber 400 on dark background: Good contrast
- ✅ Slate 50 text on dark background: Excellent contrast

### Focus States

**Always include visible focus states:**
```tsx
className="focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900"
```

### Semantic HTML

**Use proper HTML elements:**
```tsx
// ✅ Good
<nav>
    <ul>
        <li><a href="/">Home</a></li>
    </ul>
</nav>

// ❌ Avoid
<div className="nav">
    <div className="nav-item">Home</div>
</div>
```

### Keyboard Navigation
- Use `<button>` or `<a>` tags, not `<div>` with onClick
- Provide visible focus indicators
- Support Tab navigation
- Ensure all interactive elements are keyboard accessible

### Touch Targets

**Minimum size: 44x44px for mobile:**
```tsx
<button className="min-w-[44px] min-h-[44px] p-2">
    <Icon />
</button>
```

---

## 🎯 Design Decisions Log

### Recent Changes (January 2026)

1. **Fonts:**
   - Body: Lexend as the default body font
   - Headings/links/buttons: Quicksand for identity and hierarchy
   - Baloo 2 retained only as optional accent utility (`font-baloo`)
   - Code: JetBrains Mono → Fira Code (crisper)

2. **Colors:**
   - Primary: Cyan 400 → Sky 500 (better contrast)
   - Secondary: Emerald 400 → Emerald 500 (consistency)
   - Tertiary: Purple 500 → Amber 400 (warmth)
   - Background: Kept neutral gray (#171717)

3. **Borders:**
   - Increased all borders from 1px to 2px
   - Emphasis borders: 3px
   - Reduced border radius slightly (lg → md)

4. **Hover Effects:**
   - Buttons: Lighter background + light border on hover (Supabase-style)
   - Text stays white throughout
   - Links: Slightly lighter with underline

5. **Navigation:**
   - Removed uppercase styling
   - Reduced font size to text-sm
   - Kept bold weight (700)

6. **Theme:**
   - Removed light mode support
   - Dark-only theme for focused, professional look
   - Removed `next-themes` dependency

---

## 📱 Responsive Design

### Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Mobile-First Approach
```tsx
// Base styles for mobile, then override for larger screens
<div className="flex flex-col md:flex-row lg:grid lg:grid-cols-3">
```

### Responsive Typography
```tsx
<h1 className="text-4xl md:text-5xl lg:text-6xl">
```

---

## 🎬 Animation & Transitions

### Transitions

**Use Tailwind transition utilities:**
```tsx
<div className="transition-colors hover:bg-slate-800">
<div className="transition-all duration-200 ease-in-out">
```

### Reduced Motion

**Respect `prefers-reduced-motion`:**
```tsx
<div className="transition-transform motion-reduce:transition-none">
```

### Common Transitions
- Colors: `transition-colors`
- Opacity: `transition-opacity`
- Transform: `transition-transform`
- All: `transition-all`

---

## ✅ Best Practices

### Do's

✅ Use Tailwind utilities over custom CSS  
✅ Use semantic HTML elements  
✅ Ensure sufficient color contrast (WCAG AA minimum)  
✅ Include focus indicators on all interactive elements  
✅ Use `cn()` for conditional classes  
✅ Mobile-first responsive design  
✅ Use `next/image` for all images  
✅ Test with keyboard navigation  
✅ Test with screen readers  
✅ Follow the established color palette  
✅ Use CSS variables for theme values  
✅ Keep components focused and reusable  

### Don'ts

❌ Don't use inline styles  
❌ Don't create custom CSS files unless absolutely necessary  
❌ Don't use arbitrary values without documenting why  
❌ Don't skip focus states  
❌ Don't use `<div>` for interactive elements  
❌ Don't ignore mobile touch targets (44x44px minimum)  
❌ Don't use low contrast colors  
❌ Don't use `!important` - solve specificity properly  
❌ Don't add light mode support - we're dark-only  
❌ Don't deviate from the established design system  

---

## 📚 Resources

- [Lexend](https://fonts.google.com/specimen/Lexend) - Body font
- [Quicksand](https://fonts.google.com/specimen/Quicksand) - Headings / links / buttons
- [Baloo 2](https://fonts.google.com/specimen/Baloo+2) - Optional accent font
- [Fira Code](https://fonts.google.com/specimen/Fira+Code) - Monospace font
- [Tailwind CSS v4](https://tailwindcss.com/) - Utility framework
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/) - Accessibility
- [Next.js Documentation](https://nextjs.org/docs) - Framework

---

## 🔄 Maintenance

### When to Update This Guide
- After finalizing any design system changes
- When adding new component patterns
- After accessibility audits
- When updating color palette
- After typography refinements

### Version History
- **v1.0** (Jan 2026): Initial comprehensive styling guide with finalized color palette, typography system, and dark-only theme

---

*This is the single source of truth for all styling decisions in ThoughtfulCode. Always reference this guide before making design changes.*
