# Styling Guidelines

This document outlines styling conventions, design patterns, and Tailwind CSS usage guidelines for ThoughtfulCode.

---

## Core Principles

- **Utility-First:** Use Tailwind utilities over custom CSS
- **Semantic HTML:** Use proper HTML elements before styling
- **Consistency:** Follow established patterns throughout the codebase
- **Accessibility:** Ensure sufficient contrast, keyboard navigation, and screen reader support
- **Performance:** Minimize CSS bundle size, leverage Tailwind's purging

---

## Typography & Fonts

### Font Recommendations

**Headings Font: Inter**
- **Why:** Modern, clean, highly legible at all sizes
- **Characteristics:** Excellent readability, professional appearance, optimized for screens
- **Usage:** All headings (h1-h6)
- **Implementation:** Use `next/font` with Inter from Google Fonts

**Body Font: Inter**
- **Why:** Same font family for consistency, exceptional readability
- **Characteristics:** Neutral, versatile, works beautifully with icons
- **Usage:** All body text, paragraphs, lists
- **Implementation:** Same Inter font family, different weights

**Alternative Heading Font (Optional): Plus Jakarta Sans**
- **Why:** Slightly more distinctive, modern geometric feel
- **Characteristics:** Friendly yet professional, excellent for portfolios
- **Usage:** Can be used for headings if you want more visual distinction
- **Note:** If using, pair with Inter for body text

### Font Implementation

**Using Next.js Font Optimization:**

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={inter.variable}>
            <body className="font-sans">{children}</body>
        </html>
    );
}
```

**Tailwind Configuration:**

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
            },
        },
    },
};

export default config;
```

### Font Weights

**Headings:**
- `h1`: `font-bold` (700)
- `h2`: `font-semibold` (600)
- `h3`: `font-semibold` (600)
- `h4`: `font-medium` (500)
- `h5`: `font-medium` (500)
- `h6`: `font-medium` (500)

**Body:**
- Default: `font-normal` (400)
- Emphasis: `font-medium` (500)
- Strong: `font-semibold` (600)

---

## Color Palette

### Recommended Color Scheme

**Primary: Slate**
- **Rationale:** Professional, neutral, versatile, works beautifully in both light and dark modes
- **Usage:** Primary backgrounds, main text, borders, subtle accents
- **Tailwind Scale:** `slate-50` to `slate-900`
- **Primary Shades:**
    - Light mode: `slate-50` (backgrounds), `slate-900` (text)
    - Dark mode: `slate-900` (backgrounds), `slate-50` (text)
    - Borders: `slate-200` (light), `slate-700` (dark)

**Secondary: Indigo**
- **Rationale:** Modern, tech-forward, professional, excellent contrast with slate
- **Usage:** Links, buttons, interactive elements, highlights, CTAs
- **Tailwind Scale:** `indigo-50` to `indigo-900`
- **Primary Shades:**
    - Interactive: `indigo-600` (default), `indigo-700` (hover)
    - Light backgrounds: `indigo-50`, `indigo-100`
    - Text on light: `indigo-900`
    - Text on dark: `indigo-300`

**Tertiary: Emerald**
- **Rationale:** Fresh, professional accent, excellent for success states, complements slate and indigo
- **Usage:** Success messages, positive indicators, accent highlights, badges
- **Tailwind Scale:** `emerald-50` to `emerald-900`
- **Primary Shades:**
    - Accent: `emerald-500`, `emerald-600`
    - Success: `emerald-600`, `emerald-700`
    - Light backgrounds: `emerald-50`, `emerald-100`
    - Text: `emerald-700` (light mode), `emerald-300` (dark mode)

### Color Implementation

**Tailwind Configuration:**

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f8fafc',   // slate-50
                    100: '#f1f5f9',  // slate-100
                    200: '#e2e8f0',  // slate-200
                    300: '#cbd5e1',  // slate-300
                    400: '#94a3b8',  // slate-400
                    500: '#64748b',  // slate-500
                    600: '#475569',  // slate-600
                    700: '#334155',  // slate-700
                    800: '#1e293b',  // slate-800
                    900: '#0f172a', // slate-900
                },
                secondary: {
                    50: '#eef2ff',   // indigo-50
                    100: '#e0e7ff', // indigo-100
                    200: '#c7d2fe', // indigo-200
                    300: '#a5b4fc', // indigo-300
                    400: '#818cf8', // indigo-400
                    500: '#6366f1', // indigo-500
                    600: '#4f46e5', // indigo-600
                    700: '#4338ca', // indigo-700
                    800: '#3730a3', // indigo-800
                    900: '#312e81', // indigo-900
                },
                tertiary: {
                    50: '#ecfdf5',   // emerald-50
                    100: '#d1fae5', // emerald-100
                    200: '#a7f3d0', // emerald-200
                    300: '#6ee7b7', // emerald-300
                    400: '#34d399', // emerald-400
                    500: '#10b981', // emerald-500
                    600: '#059669', // emerald-600
                    700: '#047857', // emerald-700
                    800: '#065f46', // emerald-800
                    900: '#064e3b', // emerald-900
                },
            },
        },
    },
};

export default config;
```

### Color Usage Patterns

**Light Mode:**
```tsx
// Primary (Slate)
<div className="bg-primary-50 text-primary-900">
<div className="border-primary-200">

// Secondary (Indigo) - Interactive elements
<button className="bg-secondary-600 text-white hover:bg-secondary-700">
<a className="text-secondary-600 hover:text-secondary-700">

// Tertiary (Emerald) - Accents
<span className="bg-tertiary-100 text-tertiary-700">
```

**Dark Mode:**
```tsx
// Primary (Slate)
<div className="bg-primary-900 text-primary-50 dark:bg-primary-900 dark:text-primary-50">
<div className="border-primary-700 dark:border-primary-700">

// Secondary (Indigo)
<button className="bg-secondary-600 text-white hover:bg-secondary-500 dark:bg-secondary-600 dark:hover:bg-secondary-500">
<a className="text-secondary-400 hover:text-secondary-300 dark:text-secondary-400 dark:hover:text-secondary-300">

// Tertiary (Emerald)
<span className="bg-tertiary-900 text-tertiary-300 dark:bg-tertiary-900 dark:text-tertiary-300">
```

### Semantic Colors

**Success:** Use tertiary (emerald) colors
- `bg-tertiary-100 text-tertiary-700` (light)
- `bg-tertiary-900 text-tertiary-300` (dark)

**Error:** Use red (keep standard Tailwind red)
- `bg-red-100 text-red-700` (light)
- `bg-red-900 text-red-300` (dark)

**Warning:** Use yellow/amber (keep standard Tailwind amber)
- `bg-amber-100 text-amber-700` (light)
- `bg-amber-900 text-amber-300` (dark)

**Info:** Use secondary (indigo) colors
- `bg-secondary-100 text-secondary-700` (light)
- `bg-secondary-900 text-secondary-300` (dark)

### Icon Compatibility

**Icons (lucide-react) work beautifully with this palette:**
- Icons use `currentColor` by default, inheriting text color
- Slate provides neutral, professional base
- Indigo provides vibrant, modern accents for interactive icons
- Emerald provides fresh accents for positive/success icons
- All colors maintain excellent contrast for accessibility

**Example:**
```tsx
<button className="flex items-center gap-2 bg-secondary-600 text-white hover:bg-secondary-700">
    <CheckIcon className="w-5 h-5" /> {/* Inherits white color */}
    Save
</button>
```

---

## Tailwind CSS

### Configuration

**File:** `tailwind.config.ts`

**Patterns:**
- Extend theme for custom colors, fonts, spacing
- Use CSS variables for theme values (dark mode support)
- Configure content paths for proper purging

### Utility Classes

**Prefer Tailwind utilities over custom CSS:**

```tsx
// ✅ Good
<div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900">

// ❌ Avoid
<div className="custom-container">
```

**Common Patterns:**
- Layout: `flex`, `grid`, `container`, `mx-auto`
- Spacing: `p-4`, `mt-8`, `space-y-4`
- Typography: `text-lg`, `font-semibold`, `text-gray-900`
- Colors: `bg-white`, `text-gray-600`, `border-gray-200`
- Responsive: `md:flex`, `lg:grid-cols-3`

### Dark Mode

**Implementation:**
- Use `next-themes` for theme management
- CSS variables for theme values
- Tailwind `dark:` modifier for dark mode styles

**Pattern:**
```tsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    Content
</div>
```

### Responsive Design

**Breakpoints:**
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

**Mobile-First Approach:**
```tsx
// Base styles for mobile, then override for larger screens
<div className="flex flex-col md:flex-row lg:grid lg:grid-cols-3">
```

---

## Component Styling

### shadcn/ui Components

**Usage:**
- Copy components from shadcn/ui as needed
- Customize with Tailwind classes
- Maintain component API consistency

**Location:** `components/ui/`

### Custom Components

**Pattern:**
```tsx
// components/leetcode/SolutionCard.tsx
interface SolutionCardProps {
    title: string;
    difficulty: 'easy' | 'medium' | 'hard';
    className?: string;
}

export function SolutionCard({ title, difficulty, className }: SolutionCardProps) {
    return (
        <div className={cn(
            "rounded-lg border p-6 hover:shadow-lg transition-shadow",
            className
        )}>
            <h3 className="text-xl font-semibold">{title}</h3>
            <span className={cn(
                "inline-block px-2 py-1 rounded text-sm",
                difficulty === 'easy' && "bg-green-100 text-green-800",
                difficulty === 'medium' && "bg-yellow-100 text-yellow-800",
                difficulty === 'hard' && "bg-red-100 text-red-800"
            )}>
                {difficulty}
            </span>
        </div>
    );
}
```

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

## Typography

### Font Hierarchy

**Headings:**
- `h1`: `text-4xl md:text-5xl font-bold`
- `h2`: `text-3xl md:text-4xl font-semibold`
- `h3`: `text-2xl md:text-3xl font-semibold`
- `h4`: `text-xl md:text-2xl font-medium`
- `h5`: `text-lg md:text-xl font-medium`
- `h6`: `text-base md:text-lg font-medium`

**Body Text:**
- Default: `text-base` (16px)
- Small: `text-sm` (14px)
- Large: `text-lg` (18px)

### Line Height

- Headings: `leading-tight` or `leading-snug`
- Body: `leading-relaxed` or `leading-normal`
- Code: `leading-normal`

### Font Weights

- `font-normal`: 400
- `font-medium`: 500
- `font-semibold`: 600
- `font-bold`: 700

---

## Colors

### Color Palette

**Primary Colors:**
- Use semantic color names: `primary`, `secondary`, `accent`
- Define in `tailwind.config.ts` with CSS variables for theme support

**Neutral Colors:**
- `gray-50` to `gray-900` for backgrounds and text
- Use `gray-100` to `gray-300` for borders
- Use `gray-600` to `gray-900` for text

**Semantic Colors:**
- Success: `green-500`, `green-600`
- Warning: `yellow-500`, `yellow-600`
- Error: `red-500`, `red-600`
- Info: `blue-500`, `blue-600`

### Color Contrast

**WCAG AA Requirements:**
- Normal text: 4.5:1 contrast ratio
- Large text: 3:1 contrast ratio
- Interactive elements: 3:1 contrast ratio

**Examples:**
```tsx
// ✅ Good contrast
<div className="bg-white text-gray-900">  // High contrast
<div className="bg-gray-100 text-gray-800">  // Good contrast

// ❌ Poor contrast
<div className="bg-gray-200 text-gray-300">  // Low contrast
```

---

## Spacing

### Spacing Scale

**Tailwind spacing scale (4px base):**
- `p-1`: 4px
- `p-2`: 8px
- `p-4`: 16px
- `p-6`: 24px
- `p-8`: 32px
- `p-12`: 48px
- `p-16`: 64px

### Common Patterns

**Container Padding:**
```tsx
<div className="container mx-auto px-4 md:px-6 lg:px-8">
```

**Section Spacing:**
```tsx
<section className="py-12 md:py-16 lg:py-20">
```

**Component Spacing:**
```tsx
<div className="space-y-4">  // Vertical spacing between children
<div className="space-x-4">  // Horizontal spacing between children
```

---

## Layout Patterns

### Container

**Pattern:**
```tsx
<div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
    Content
</div>
```

### Grid Layouts

**Responsive Grid:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {items.map(item => <ItemCard key={item.id} {...item} />)}
</div>
```

### Flexbox Layouts

**Common Patterns:**
```tsx
// Centered content
<div className="flex items-center justify-center min-h-screen">

// Space between
<div className="flex items-center justify-between">

// Stack vertically
<div className="flex flex-col space-y-4">
```

---

## Interactive Elements

### Buttons

**Pattern:**
```tsx
<button className={cn(
    "px-4 py-2 rounded-md font-medium transition-colors",
    "bg-blue-600 text-white hover:bg-blue-700",
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed"
)}>
    Button Text
</button>
```

### Links

**Pattern:**
```tsx
<a className={cn(
    "text-blue-600 hover:text-blue-700 underline",
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
)}>
    Link Text
</a>
```

### Focus States

**Always include focus indicators:**
```tsx
className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
```

---

## Accessibility

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

### ARIA Labels

**Use when semantic HTML isn't sufficient:**
```tsx
<button aria-label="Close dialog">
    <XIcon />
</button>
```

### Keyboard Navigation

**Ensure all interactive elements are keyboard accessible:**
- Use `<button>` or `<a>` tags, not `<div>` with onClick
- Provide visible focus indicators
- Support Tab navigation

### Touch Targets

**Minimum size: 44x44px for mobile:**
```tsx
<button className="min-w-[44px] min-h-[44px] p-2">
    <Icon />
</button>
```

---

## Animation & Transitions

### Transitions

**Use Tailwind transition utilities:**
```tsx
<div className="transition-colors hover:bg-gray-100">
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

## Code Blocks

### Syntax Highlighting

**Styling for code blocks:**
- Use `rehype-highlight` with `highlight.js` themes
- Customize with Tailwind classes
- Ensure sufficient contrast for readability

**Pattern:**
```tsx
<pre className="rounded-lg bg-gray-900 p-4 overflow-x-auto">
    <code className="text-sm text-gray-100">
        {code}
    </code>
</pre>
```

---

## Responsive Images

### Next.js Image Component

**Always use `next/image`:**
```tsx
import Image from 'next/image';

<Image
    src="/images/example.jpg"
    alt="Description"
    width={800}
    height={600}
    className="rounded-lg"
/>
```

### Responsive Sizing

**Use Tailwind classes for responsive images:**
```tsx
<Image
    src="/images/example.jpg"
    alt="Description"
    width={800}
    height={600}
    className="w-full h-auto md:w-1/2 lg:w-1/3"
/>
```

---

## Best Practices

### Do's

✅ Use Tailwind utilities over custom CSS  
✅ Use semantic HTML elements  
✅ Ensure sufficient color contrast  
✅ Include focus indicators  
✅ Use `cn()` for conditional classes  
✅ Mobile-first responsive design  
✅ Use `next/image` for all images  
✅ Test with keyboard navigation  
✅ Test with screen readers  

### Don'ts

❌ Don't use inline styles  
❌ Don't create custom CSS files unless absolutely necessary  
❌ Don't use arbitrary values without documenting why  
❌ Don't skip focus states  
❌ Don't use `<div>` for interactive elements  
❌ Don't ignore mobile touch targets  
❌ Don't use low contrast colors  
❌ Don't forget dark mode styles  

---

## References

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Next.js Image Optimization](https://nextjs.org/docs/pages/api-reference/components/image)
