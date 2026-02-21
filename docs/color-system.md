# Color System - The Tailwind Way

This document explains hamadeh.io's color system and how to maintain consistency across all components.

## 🎯 Philosophy: Tailwind-First + DRY

**Core Principle:** Use Tailwind's custom color system defined in `@theme`. Never hardcode color values like `text-sky-500` or `bg-indigo-400` directly in components.

---

## 🎨 How It Works

### Step 1: Define Semantic Colors in `@theme`

**Location:** `app/globals.css`

```css
@theme {
    /* Custom Semantic Colors - Use these in Tailwind classes! */
    --color-primary: var(--color-sky-500);       /* Primary accent (links, active states) */
    --color-primary-hover: var(--color-sky-400); /* Primary hover state */
    --color-secondary: var(--color-emerald-500); /* Secondary accent (success, positive) */
    --color-tertiary: var(--color-amber-400);    /* Tertiary accent (highlights, badges) */
    --color-muted: var(--color-slate-400);       /* Muted text (inactive, secondary) */
}
```

### Step 2: Use Semantic Colors in Components

```tsx
// ✅ CORRECT - Uses semantic color names
<Link className="text-primary hover:text-primary-hover">
<button className="bg-secondary hover:bg-secondary/90">
<span className="text-muted">

// ❌ WRONG - Hardcoded colors
<Link className="text-sky-500 hover:text-sky-400">
<button className="bg-emerald-500">
```

---

## 📖 Available Semantic Colors

| Tailwind Class | Use Case | Example |
|----------------|----------|---------|
| `text-primary` | Active links, primary actions | Navigation active state |
| `hover:text-primary` | Hover states for links/buttons | Logo, nav links |
| `bg-primary` | Primary buttons, highlights | CTA buttons |
| `border-primary` | Primary borders | Active input fields |
| `text-secondary` | Success states, positive feedback | Success messages |
| `bg-secondary` | Secondary actions | Secondary buttons |
| `text-tertiary` | Highlights, special emphasis | Badges, labels |
| `text-muted` | Inactive/secondary text | Unselected nav links, captions |
| `hover:text-muted` | Subtle hover effects | Footer icons |

---

## 🔄 Changing Colors (One Place!)

Want to change from Sky Blue to Purple? Just update **ONE line**:

**Before:**
```css
--color-primary: var(--color-sky-500);
```

**After:**
```css
--color-primary: var(--color-indigo-500);
```

**Result:** Every instance of `text-primary`, `bg-primary`, `border-primary`, `hover:text-primary` throughout the **entire site** becomes purple! 🎉

---

## ✅ Best Practices

### DO:
- ✅ Use semantic color names: `text-primary`, `bg-secondary`, `text-muted`
- ✅ Use all Tailwind variants: `hover:`, `focus:`, `active:`, `disabled:`
- ✅ Use opacity modifiers: `bg-primary/90`, `text-muted/50`
- ✅ Change colors in `@theme` section only

### DON'T:
- ❌ Hardcode specific colors: `text-sky-500`, `bg-indigo-400`
- ❌ Use hex values in components: `text-[#0ea5e9]`
- ❌ Create custom CSS classes for colors (use Tailwind)
- ❌ Mix semantic and hardcoded colors in the same component

---

## 🎨 Color Palette Reference

Your pre-configured color palettes (defined in `@theme`):

| Palette | Variants | Primary Use |
|---------|----------|-------------|
| **Sky** | 400, 500, 600, 950 | Current primary accent |
| **Emerald** | 400, 500, 600 | Success states, positive |
| **Amber** | 400, 500, 600 | Highlights, warnings |
| **Indigo** | 300-900 | Alternative primary |
| **Slate** | 50-950 | Neutrals, backgrounds |

**To use a different palette:** Change the semantic color mapping in `@theme`.

---

## 📝 Real-World Examples

### Example 1: Navigation Link

```tsx
// Header.tsx
<Link
    className={`
        flex items-center gap-1 text-sm font-bold transition-colors
        ${isActive ? "text-primary" : "text-muted hover:text-primary"}
    `}
>
    <HomeIcon className="h-4 w-4" />
    Home
</Link>
```

**Result:**
- Active link: Uses primary color
- Inactive link: Uses muted color, changes to primary on hover
- **Change primary color once** → All links update automatically

---

### Example 2: Button with States

```tsx
// Button component
<button
    className="
        bg-primary text-white
        hover:bg-primary-hover
        focus:ring-2 focus:ring-primary
        disabled:bg-primary/50
        transition-all
    "
>
    Get Started
</button>
```

**All variants use semantic colors!**

---

### Example 3: Social Icons

```tsx
// Footer.tsx
<a
    href="https://github.com/..."
    className="text-muted transition-colors hover:text-primary"
>
    <GitHubIcon />
</a>
```

**Result:** Icon is muted by default, becomes primary color on hover.

---

## 🚀 Adding New Components

When creating new components, follow this workflow:

### Step 1: Identify Color Needs

Ask yourself:
- Is this a primary action? → Use `primary`
- Is this secondary/success? → Use `secondary`
- Is this muted/inactive? → Use `muted`
- Is this a special emphasis? → Use `tertiary`

### Step 2: Use Tailwind Classes

```tsx
// New component
export function Card() {
    return (
        <div className="rounded-lg border border-slate-700 bg-slate-900">
            <h3 className="text-lg font-bold text-primary">Title</h3>
            <p className="text-muted">Description text</p>
            <button className="bg-secondary text-white hover:bg-secondary/90">
                Action
            </button>
        </div>
    );
}
```

### Step 3: Test Color Changes

1. Change `--color-primary` in `globals.css`
2. Reload app
3. Verify your component updates correctly

---

## 🎨 Multiple Theme Support (Future)

If you want to add multiple color schemes:

```css
@theme {
    /* Default */
    --color-primary: var(--color-sky-500);
}

/* Add theme variants in @layer base */
@layer base {
    .theme-ocean {
        --color-primary: var(--color-cyan-500);
    }

    .theme-forest {
        --color-primary: var(--color-emerald-500);
    }

    .theme-sunset {
        --color-primary: var(--color-orange-500);
    }
}
```

**Toggle themes:**
```tsx
<html className="theme-ocean">
```

All `text-primary`, `bg-primary`, etc. update automatically! 🌈

---

## 🔍 Common Patterns

### Pattern 1: Active/Inactive State

```tsx
<Link className={isActive ? "text-primary" : "text-muted hover:text-primary"}>
```

### Pattern 2: Button Variants

```tsx
// Primary button
<button className="bg-primary text-white hover:bg-primary-hover">

// Secondary button
<button className="bg-secondary text-white hover:bg-secondary/90">

// Outline button
<button className="border-2 border-primary text-primary hover:bg-primary hover:text-white">
```

### Pattern 3: Icon Hover

```tsx
<Icon className="text-muted hover:text-primary transition-colors" />
```

### Pattern 4: Disabled States

```tsx
<button className="bg-primary disabled:bg-primary/50 disabled:cursor-not-allowed">
```

---

## ⚠️ Migration Guide

If you find hardcoded colors in existing components, migrate them:

**Before:**
```tsx
<Link className="text-sky-500 hover:text-sky-400">
```

**After:**
```tsx
<Link className="text-primary hover:text-primary-hover">
```

**Benefits:**
- ✅ Easier to change colors site-wide
- ✅ Better IntelliSense
- ✅ Cleaner, more semantic code

---

## 📚 Summary: Quick Reference

| Instead of... | Use... |
|---------------|--------|
| `text-sky-500` | `text-primary` |
| `text-sky-400` | `text-primary-hover` |
| `bg-emerald-500` | `bg-secondary` |
| `text-amber-400` | `text-tertiary` |
| `text-slate-400` | `text-muted` |
| `hover:text-sky-400` | `hover:text-primary` |
| `bg-indigo-500` | `bg-primary` (after changing theme) |

---

## 🎯 Key Takeaways

1. **Never hardcode colors** - Always use semantic names
2. **One source of truth** - Change colors in `@theme` only
3. **Tailwind-first** - Use Tailwind utilities, avoid custom CSS classes
4. **Think semantically** - primary, secondary, tertiary, muted
5. **DRY principle** - Define once, use everywhere

---

## 🔧 Tools

- **VS Code Extension:** [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
  - Provides autocomplete for `text-primary`, `bg-secondary`, etc.
  - Shows color previews in editor

- **Check your colors:** Open `app/globals.css` → `@theme` section

---

**Last Updated:** 2026-01-20  
**Maintainer:** hamadeh.io  
**Follow this guide for ALL future components!** ✅
