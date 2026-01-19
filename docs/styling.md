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
- Mobile-first responsive design

---

## 📝 Typography System

### Font Stack

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| **Headings (H1-H3)** | Baloo 2 | 600-800 | Main headings, hero text, CTAs |
| **Body Text** | Plus Jakarta Sans | 400-700 | All body content, paragraphs, lists |
| **Code/Monospace** | Fira Code | 500 | Code blocks, inline code, technical content |

### Typography Scale

| Element | Font | Size | Weight | Line Height | Usage |
|---------|------|------|--------|-------------|-------|
| **Hero / H1** | Baloo 2 | 3-4rem | 800 | 1.1 | Landing page hero |
| **Section H2** | Baloo 2 | 2.5-3rem | 700 | 1.2 | Major sections |
| **Subsection H3** | Baloo 2 | 2-2.25rem | 600 | 1.3 | Subsections |
| **Body Text** | Plus Jakarta Sans | 1rem | 400 | 1.6 | Main content |
| **Body Emphasis** | Plus Jakarta Sans | 1rem | 500-600 | 1.6 | Emphasized text |
| **Small Text** | Plus Jakarta Sans | 0.875rem | 400 | 1.5 | Captions, metadata |
| **Buttons** | Baloo 2 | 1rem | 600 | 1.4 | Primary CTAs |
| **Navigation** | Plus Jakarta Sans | 0.875rem | 700 | 1.4 | Nav links |

### Why This Pairing Works

1. **Baloo 2 for Headings & CTAs:**
   - Friendly, rounded character adds warmth
   - Bold weights create strong hierarchy
   - Excellent at large sizes
   - Distinguishes from generic tech sites

2. **Plus Jakarta Sans for Body:**
   - Modern, geometric sans-serif
   - Excellent readability at all sizes
   - Professional yet approachable
   - Better than Inter for contemporary feel

3. **Fira Code for Code:**
   - Professional, crisp monospace
   - Programming ligatures support
   - Medium weight (500) for better readability
   - Industry standard for code display

### Font Implementation

**Using Next.js Font Optimization:**

```typescript
// app/layout.tsx
import {
    Plus_Jakarta_Sans,
    Baloo_2,
    Fira_Code,
} from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-sans",
    display: "swap",
    weight: ["400", "500", "600", "700"],
});

const baloo2 = Baloo_2({
    subsets: ["latin"],
    variable: "--font-baloo",
    display: "swap",
    weight: ["400", "500", "600", "700", "800"],
});

const firaCode = Fira_Code({
    subsets: ["latin"],
    variable: "--font-mono-fira",
    display: "swap",
    weight: ["400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
    return (
        <html
            lang="en"
            className={`${plusJakartaSans.variable} ${baloo2.variable} ${firaCode.variable}`}
        >
            <body className="min-h-screen antialiased">{children}</body>
        </html>
    );
}
```

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
<button className="rounded-md border-2 border-transparent bg-sky-500 px-6 py-3 font-baloo text-base font-semibold text-white transition-all hover:border-sky-300 hover:bg-sky-400">
  Primary Action
</button>
```

**Secondary Button (Outline):**
```tsx
<button className="rounded-md border-[3px] border-slate-600 bg-transparent px-6 py-3 font-baloo text-base font-semibold text-slate-300 transition-all duration-200 hover:border-sky-500 hover:bg-sky-950/20 hover:text-sky-500 hover:shadow-lg">
  Secondary Action
</button>
```

**Success Button:**
```tsx
<button className="rounded-md border-2 border-transparent bg-emerald-500 px-6 py-3 font-baloo text-base font-semibold text-white transition-all hover:border-emerald-300 hover:bg-emerald-400">
  Success Action
</button>
```

**Text Link:**
```tsx
<a className="font-baloo text-base font-semibold text-sky-500 transition-colors hover:text-sky-400 hover:underline">
  Link Text
</a>
```

### Typography Examples

**Hero Heading:**
```tsx
<h1 className="font-baloo text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white">
  Build Thoughtful Software
</h1>
```

**Section Heading:**
```tsx
<h2 className="font-baloo text-3xl md:text-4xl font-bold leading-tight text-white">
  Section Title
</h2>
```

**Subsection Heading:**
```tsx
<h3 className="font-baloo text-2xl md:text-3xl font-semibold leading-tight text-white">
  Subsection Title
</h3>
```

**Body Text:**
```tsx
<p className="text-base leading-relaxed text-slate-300">
  Your content here with excellent readability.
</p>
```

**Small Text:**
```tsx
<p className="text-sm leading-relaxed text-slate-400">
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
<pre className="overflow-x-auto rounded-md bg-[#282c34]/50 p-4 border-2 border-slate-700">
  <code className="font-mono text-sm text-slate-100">
    {codeContent}
  </code>
</pre>
```

### Cards

**Pattern:**
```tsx
<div className="rounded-md border-2 border-slate-700 bg-slate-800 p-6">
  <h3 className="text-lg font-semibold text-white">Card Title</h3>
  <p className="text-slate-300">Card content</p>
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
--font-sans: var(--font-plus-jakarta-sans), ui-sans-serif, system-ui, sans-serif;
--font-baloo: var(--font-baloo), ui-sans-serif, system-ui, sans-serif;
--font-mono: var(--font-mono-fira), ui-monospace, SFMono-Regular, monospace;
```

---

## ✅ Implementation Rules

### Tailwind-First Approach
1. **Always use Tailwind utility classes** for styling
2. Use custom CSS in `globals.css` only when necessary:
   - Complex animations
   - Global resets
   - Patterns that can't be expressed with utilities
3. **Never use `!important`** - solve specificity through proper architecture
4. Follow DRY: Define reusable patterns using CSS variables and `@layer`

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
- Logo: Baloo 2, Bold (700), `text-xl`
- Navigation: Plus Jakarta Sans, Bold (700), `text-sm`, normal case (not uppercase)
- Hover: Sky 500 for both logo and nav links
- Border: `border-b-2` for emphasis
- Sticky positioning with dark background

**Pattern:**
```tsx
<header className="site-header">
  <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
    <Link className="font-baloo text-xl font-bold text-slate-50 hover:text-sky-500">
      ThoughtfulCode
    </Link>
  </nav>
</header>
```

### Footer
- Copyright: Plus Jakarta Sans, Regular (400), `text-slate-400`
- Social links: Hover to Sky 500
- Border: `border-t-2` for emphasis
- Centered content layout

**Pattern:**
```tsx
<footer className="site-footer">
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
   - Body: Inter → Plus Jakarta Sans (more modern)
   - Headings: Added Baloo 2 for personality
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

- [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) - Body font
- [Baloo 2](https://fonts.google.com/specimen/Baloo+2) - Heading font
- [Fira Code](https://fonts.google.com/specimen/Fira+Code) - Monospace font
- [Tailwind CSS v4](https://tailwindcss.com/) - Utility framework
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/) - Accessibility
- [Next.js Documentation](https://nextjs.org/docs) - Framework
- [shadcn/ui](https://ui.shadcn.com/) - Component library

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
