# Color System - Quick Reference

This document explains how to change the site's color scheme in one place.

## 🎨 Changing Colors (DRY Approach)

All colors are centralized in `app/globals.css`. To change the entire site's color scheme, you only need to update **one place**!

---

## Where to Change Colors

### Location: `app/globals.css`

```css
@layer base {
    :root {
        /* Change these 3 variables to update the entire site */
        --accent: var(--color-sky-500);      /* Primary: Links, active states, hover effects */
        --muted-foreground: var(--color-slate-400);  /* Inactive: Unselected links, secondary text */
        --secondary: var(--color-emerald-500);  /* Success states, positive indicators */
        --tertiary: var(--color-amber-400);    /* Highlights, badges, special emphasis */
    }
}
```

---

## Example: Changing from Sky Blue to Purple

**Before:**
```css
--accent: var(--color-sky-500);  /* #0ea5e9 (Sky Blue) */
```

**After:**
```css
--accent: var(--color-indigo-500);  /* #6366f1 (Purple) */
```

**Result:** All links, active states, and hover effects throughout the entire site will now be purple! 🎉

---

## What Updates Automatically

When you change `--accent`, these update automatically:

### Header:
- ✅ Logo hover color
- ✅ Active navigation link color
- ✅ Navigation link hover color
- ✅ Mobile menu button hover color

### Footer:
- ✅ Social icon hover color

### Future Components:
- ✅ Any component using `.text-accent`, `.hover-accent`, `.nav-link-active`, or `.nav-link-inactive`

---

## Available Color Palettes

You have these color palettes pre-configured in `globals.css`:

| Color | Variable | Hex Code | Use Case |
|-------|----------|----------|----------|
| **Sky Blue** | `--color-sky-500` | `#0ea5e9` | Current primary |
| **Emerald** | `--color-emerald-500` | `#10b981` | Success states |
| **Amber** | `--color-amber-400` | `#fbbf24` | Highlights |
| **Indigo** | `--color-indigo-500` | `#6366f1` | Alternative primary |
| **Slate** | `--color-slate-400` | `#94a3b8` | Muted/inactive |

---

## Utility Classes (Use These in Components)

Instead of hardcoding colors like `text-sky-500`, use these utility classes:

| Class | Purpose | Updates When You Change |
|-------|---------|-------------------------|
| `.text-accent` | Primary accent color | `--accent` |
| `.text-muted` | Muted/secondary text | `--muted-foreground` |
| `.hover-accent` | Adds hover effect to accent color | `--accent` |
| `.nav-link-active` | Active navigation link styling | `--accent` |
| `.nav-link-inactive` | Inactive navigation link styling | `--muted-foreground` + `--accent` on hover |

---

## How to Add New Utility Classes

If you need a new reusable color pattern:

**Step 1:** Add to `globals.css`:
```css
/* Button Primary */
.btn-primary {
    background-color: var(--accent);
    color: var(--accent-foreground);
}

.btn-primary:hover {
    background-color: var(--accent);
    opacity: 0.9;
}
```

**Step 2:** Use in components:
```tsx
<button className="btn-primary">Click me</button>
```

**Step 3:** Color updates automatically when you change `--accent`! 🎯

---

## ⚠️ What NOT to Do

**❌ DON'T hardcode Tailwind colors:**
```tsx
// BAD - hardcoded sky-500
<Link className="text-sky-500 hover:text-sky-400">
```

**✅ DO use utility classes:**
```tsx
// GOOD - uses CSS variable
<Link className="text-accent hover-accent">
```

---

## Testing Color Changes

1. Update `--accent` in `globals.css`
2. Reload the app
3. Check Header, Footer, and any interactive elements
4. All colors should update automatically!

---

## Benefits of This Approach

✅ **DRY** - Change color once, updates everywhere  
✅ **Maintainable** - Clear single source of truth  
✅ **Scalable** - Easy to add new themes or dark mode variants  
✅ **Type-safe** - No magic strings scattered throughout components  
✅ **Consistent** - Impossible to have mismatched colors

---

## Future: Multiple Themes

If you want to support multiple color schemes (e.g., "Ocean", "Forest", "Sunset"), you can define theme classes:

```css
/* Default theme */
:root {
    --accent: var(--color-sky-500);
}

/* Ocean theme */
.theme-ocean {
    --accent: var(--color-cyan-500);
}

/* Forest theme */
.theme-forest {
    --accent: var(--color-emerald-500);
}
```

Then toggle themes by adding the class to `<html>`:
```tsx
<html className="theme-ocean">
```

All utility classes will automatically use the new colors! 🌈
